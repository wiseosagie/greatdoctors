import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const CARD_STYLE = {
  style: {
    base: {
      fontSize: '16px',
      fontFamily: 'Inter, system-ui, sans-serif',
      color: '#0d2136',
      '::placeholder': { color: '#9ba3af' },
    },
    invalid: { color: '#e53e3e' },
  },
}

function CheckoutForm({ onSuccess, onBack, condition, amount, clientSecret }) {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setProcessing(true)
    setError('')

    const card = elements.getElement(CardElement)
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      { payment_method: { card } }
    )

    if (confirmError) {
      setError(confirmError.message)
      setProcessing(false)
      return
    }

    if (paymentIntent?.status === 'succeeded') {
      onSuccess(paymentIntent.id)
    }
    setProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="payment-summary">
        <div className="payment-summary__row">
          <span>Consultation — {condition.name}</span>
          <span className="payment-summary__amount">${(amount / 100).toFixed(2)}</span>
        </div>
        <div className="payment-summary__row payment-summary__row--total">
          <span>Total due today</span>
          <span className="payment-summary__total">${(amount / 100).toFixed(2)}</span>
        </div>
      </div>

      <div className="payment-card-wrap">
        <label className="payment-card-label">Card Details</label>
        <div className="payment-card-box">
          <CardElement options={CARD_STYLE} />
        </div>
      </div>

      {error && <p className="payment-error">⚠ {error}</p>}

      <div className="payment-actions">
        <button type="button" className="btn-outline" onClick={onBack}>← Back</button>
        <button type="submit" className="btn-primary payment-submit" disabled={!stripe || processing}>
          {processing ? <span className="payment-spinner" /> : (
            <>
              Pay ${(amount / 100).toFixed(2)} & Submit
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </>
          )}
        </button>
      </div>

      <p className="payment-secure">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        Secured by Stripe · 256-bit SSL encryption
      </p>

      <style>{`
        .payment-form { display: flex; flex-direction: column; gap: 20px; }
        .payment-summary {
          background: var(--off-white);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 16px 20px;
          display: flex; flex-direction: column; gap: 8px;
        }
        .payment-summary__row {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 0.875rem; color: var(--text-secondary);
        }
        .payment-summary__row--total {
          padding-top: 8px;
          border-top: 1px solid var(--border);
          font-weight: 700; color: var(--navy);
        }
        .payment-summary__amount { font-weight: 600; color: var(--teal); }
        .payment-summary__total { font-size: 1.1rem; color: var(--teal); }
        .payment-card-wrap { display: flex; flex-direction: column; gap: 8px; }
        .payment-card-label { font-size: 0.82rem; font-weight: 600; color: var(--ink); }
        .payment-card-box {
          padding: 14px 16px;
          border: 1.5px solid var(--border);
          border-radius: var(--radius-md);
          background: white;
          transition: border-color 0.2s;
        }
        .payment-card-box:focus-within {
          border-color: var(--teal);
          box-shadow: 0 0 0 3px rgba(10,155,140,0.1);
        }
        .payment-error { font-size: 0.82rem; color: #e53e3e; font-weight: 500; }
        .payment-actions {
          display: flex; gap: 12px; justify-content: flex-end;
          padding-top: 8px;
        }
        .payment-submit { min-width: 200px; justify-content: center; padding: 13px 28px; }
        .payment-spinner {
          width: 18px; height: 18px;
          border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: white; border-radius: 50%;
          animation: paySpin 0.7s linear infinite; display: inline-block;
        }
        @keyframes paySpin { to { transform: rotate(360deg); } }
        .payment-secure {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.75rem; color: var(--text-muted);
          justify-content: center;
        }
      `}</style>
    </form>
  )
}

export default function PaymentStep({ condition, amount, onSuccess, onBack }) {
  const [clientSecret, setClientSecret] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const initPayment = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conditionId: condition.id,
          conditionName: condition.name,
          amount,
        }),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); setLoading(false); return }
      setClientSecret(data.clientSecret)
    } catch (err) {
      setError('Unable to connect to payment service. Please try again.')
    }
    setLoading(false)
  }

  if (!clientSecret) {
    return (
      <div className="payment-init">
        <div className="payment-init__icon">💳</div>
        <h3 className="payment-init__title">Complete Your Payment</h3>
        <p className="payment-init__sub">
          Your consultation fee is <strong>${(amount / 100).toFixed(2)}</strong>.<br />
          Payment is required to submit your consultation.
        </p>
        {error && <p className="payment-init__error">⚠ {error}</p>}
        <div className="payment-init__actions">
          <button className="btn-outline" onClick={onBack}>← Back</button>
          <button className="btn-primary" onClick={initPayment} disabled={loading}>
            {loading ? <span className="payment-init__spinner" /> : 'Proceed to Payment →'}
          </button>
        </div>
        <style>{`
          .payment-init {
            display: flex; flex-direction: column; align-items: center;
            text-align: center; gap: 14px; padding: 24px 0;
          }
          .payment-init__icon { font-size: 2.5rem; }
          .payment-init__title {
            font-family: var(--font-serif); font-size: 1.6rem;
            color: var(--navy); font-weight: 400;
          }
          .payment-init__sub { font-size: 0.9rem; color: var(--muted); line-height: 1.6; }
          .payment-init__sub strong { color: var(--teal); font-size: 1.05rem; }
          .payment-init__actions { display: flex; gap: 12px; margin-top: 8px; }
          .payment-init__error { font-size: 0.82rem; color: #e53e3e; font-weight: 500; }
          .payment-init__spinner {
            width: 18px; height: 18px;
            border: 2.5px solid rgba(255,255,255,0.3);
            border-top-color: white; border-radius: 50%;
            animation: initSpin 0.7s linear infinite; display: inline-block;
          }
          @keyframes initSpin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    )
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm
        onSuccess={onSuccess}
        onBack={onBack}
        condition={condition}
        amount={amount}
        clientSecret={clientSecret}
      />
    </Elements>
  )
}
