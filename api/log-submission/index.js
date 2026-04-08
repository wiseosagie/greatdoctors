const { createClient } = require('@supabase/supabase-js')

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
