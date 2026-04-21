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
  weightloss:   14999,
  booking:      100,
}

module.exports = async function (context, req) {
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
  const { conditionId, conditionName, amount, patientName, successUrl, cancelUrl } = req.body || {}

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
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: chargeAmount,
          product_data: {
            name: conditionName || 'Medical Consultation',
            description: patientName ? `Patient: ${patientName}` : 'Great Doctors USA',
          },
        },
        quantity: 1,
      }],
      success_url: successUrl,
      cancel_url: cancelUrl,
    })

    context.res = {
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ url: session.url }),
    }
  } catch (err) {
    context.res = {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message }),
    }
  }
}
