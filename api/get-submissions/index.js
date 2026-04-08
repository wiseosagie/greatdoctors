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

  try {
    let query = supabase
      .from('submissions')
      .select('*')
      .order('submitted_at', { ascending: false })

    const condition = req.query?.condition
    if (condition) query = query.eq('condition_id', condition)

    const { data, error } = await query
    if (error) throw error

    context.res.status = 200
    context.res.body = JSON.stringify({ total: data.length, submissions: data })
  } catch (err) {
    context.log.error('get-submissions error:', err)
    context.res.status = 500
    context.res.body = JSON.stringify({ error: err.message })
  }
}
