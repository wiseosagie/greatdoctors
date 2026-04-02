const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  }

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' }
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) }

  try {
    const payload = JSON.parse(event.body)
    const { condition, conditionId, answers, userId } = payload
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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        submissionId: id,
        message: 'Consultation submitted. Dr. Osunde will review your case.',
      }),
    }
  } catch (err) {
    console.error('Submission error:', err)
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) }
  }
}
