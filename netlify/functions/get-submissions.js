const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' }

  try {
    let query = supabase
      .from('submissions')
      .select('*')
      .order('submitted_at', { ascending: false })

    const condition = event.queryStringParameters?.condition
    if (condition) query = query.eq('condition_id', condition)

    const { data, error } = await query
    if (error) throw error

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ total: data.length, submissions: data }),
    }
  } catch (err) {
    console.error('get-submissions error:', err)
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) }
  }
}
