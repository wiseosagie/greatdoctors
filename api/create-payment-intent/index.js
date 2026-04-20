const Stripe = require('stripe')

const CONDITION_PRICES = {
  uti:          2999,
  dental:       2999,
  ear:          2999,
  sinus:        2999,
  stds:         3999,
  hairloss:     3999,
  anxiety:      4999,
  acne:         3999,
  eczema:       3999,
  fungal:       3999,
  backpain:     4999,
  gerd:         4999,
  thyroid:      4999,
  hypertension: 4999,
  insomnia:     4999,
  birthcontrol: 3999,
  weightloss:   14999, // Month 1 GLP-1 default
}

module.exports = async function (context, req) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    context.res = {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    }
    return
  }

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
  const { conditionId, conditionName, amount, email } = req.body || {}

  if (!conditionId) {
    context.res = {
      status: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'conditionId is required' }),
    }
    return
  }

  const chargeAmount = amount || CONDITION_PRICES[conditionId] || 4999

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: chargeAmount,
      currency: 'usd',
      payment_method_types: ['card'],
      description: `Great Doctors USA — ${conditionName || conditionId}`,
      receipt_email: email || undefined,
      metadata: { conditionId, conditionName: conditionName || conditionId },
    })

    context.res = {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    }
  } catch (err) {
    context.res = {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message }),
    }
  }
}
