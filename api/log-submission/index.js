const { createClient } = require('@supabase/supabase-js')
const { sendMail } = require('../shared/mailer')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

module.exports = async function (context, req) {
  context.res = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  }

  if (req.method === 'OPTIONS') {
    context.res.status = 200
    context.res.body = ''
    return
  }

  if (req.method !== 'POST') {
    context.res.status = 405
    context.res.body = JSON.stringify({ error: 'Method not allowed' })
    return
  }

  try {
    const { condition, conditionId, answers, userId } = req.body
    const id = `${conditionId}-${Date.now()}`

    const patientInfo = {
      firstName: answers?.first_name || '',
      lastName:  answers?.last_name  || '',
      phone:     answers?.phone      || '',
      email:     answers?.email      || '',
      dob:       answers?.dob        || '',
      gender:    answers?.gender     || '',
    }

    const { error } = await supabase.from('submissions').insert({
      id,
      user_id:      userId || null,
      condition,
      condition_id: conditionId,
      patient_info: patientInfo,
      answers,
    })

    if (error) throw error

    // Send intake notification email (non-blocking — don't fail submission if email fails)
    sendMail({
      subject: `New Patient Intake — ${condition} — ${patientInfo.firstName} ${patientInfo.lastName}`,
      html: buildIntakeEmail({ id, condition, patientInfo, answers }),
    }).catch(err => context.log.error('Email send failed:', err))

    context.res.status = 200
    context.res.body = JSON.stringify({
      success: true,
      submissionId: id,
      message: 'Consultation submitted. Dr. Osunde will review your case.',
    })
  } catch (err) {
    context.log.error('Submission error:', err)
    context.res.status = 500
    context.res.body = JSON.stringify({ error: err.message })
  }
}

function buildIntakeEmail({ id, condition, patientInfo, answers }) {
  const { firstName, lastName, phone, email, dob, gender } = patientInfo

  const answerRows = Object.entries(answers || {})
    .filter(([key]) => !['first_name', 'last_name', 'phone', 'email', 'dob', 'gender'].includes(key))
    .map(([key, val]) => `
      <tr>
        <td style="padding:8px 12px;background:#f8f9fa;font-weight:600;color:#1a1a2e;width:40%;border-bottom:1px solid #e9ecef;">${formatKey(key)}</td>
        <td style="padding:8px 12px;color:#444;border-bottom:1px solid #e9ecef;">${val || '—'}</td>
      </tr>`)
    .join('')

  return `
    <div style="font-family:sans-serif;max-width:640px;margin:0 auto;background:#fff;border:1px solid #e9ecef;border-radius:8px;overflow:hidden;">
      <div style="background:#0a1628;padding:24px 32px;">
        <h1 style="color:#fff;margin:0;font-size:20px;">New Patient Intake</h1>
        <p style="color:#00b4d8;margin:4px 0 0;font-size:14px;">${condition} — Submission ID: ${id}</p>
      </div>

      <div style="padding:24px 32px;">
        <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:0.06em;color:#888;margin:0 0 12px;">Patient Information</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
          <tr>
            <td style="padding:8px 12px;background:#f8f9fa;font-weight:600;color:#1a1a2e;width:40%;border-bottom:1px solid #e9ecef;">Full Name</td>
            <td style="padding:8px 12px;color:#444;border-bottom:1px solid #e9ecef;">${firstName} ${lastName}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;background:#f8f9fa;font-weight:600;color:#1a1a2e;border-bottom:1px solid #e9ecef;">Phone</td>
            <td style="padding:8px 12px;color:#444;border-bottom:1px solid #e9ecef;">${phone || '—'}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;background:#f8f9fa;font-weight:600;color:#1a1a2e;border-bottom:1px solid #e9ecef;">Email</td>
            <td style="padding:8px 12px;color:#444;border-bottom:1px solid #e9ecef;">${email || '—'}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;background:#f8f9fa;font-weight:600;color:#1a1a2e;border-bottom:1px solid #e9ecef;">Date of Birth</td>
            <td style="padding:8px 12px;color:#444;border-bottom:1px solid #e9ecef;">${dob || '—'}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;background:#f8f9fa;font-weight:600;color:#1a1a2e;">Biological Sex</td>
            <td style="padding:8px 12px;color:#444;">${gender || '—'}</td>
          </tr>
        </table>

        <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:0.06em;color:#888;margin:0 0 12px;">Medical Questionnaire</h2>
        <table style="width:100%;border-collapse:collapse;">
          ${answerRows}
        </table>
      </div>

      <div style="background:#f8f9fa;padding:16px 32px;border-top:1px solid #e9ecef;">
        <p style="margin:0;font-size:12px;color:#888;">Great Doctors USA · intake@greatdoctorsusa.health · HIPAA-compliant</p>
      </div>
    </div>`
}

function formatKey(key) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}
