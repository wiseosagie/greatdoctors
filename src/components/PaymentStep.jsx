import { useState } from 'react'

export default function PaymentStep({ condition, amount, patientName, answers, userId, onBack }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheckout = async () => {
    setLoading(true)
    setError('')

    localStorage.setItem('gd_pending_submission', JSON.stringify({
      conditionId: condition.id,
      conditionName: condition.name,
      answers,
      patientName,
      amount,
      userId: userId || null,
      timestamp: Date.now(),
    }))

    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conditionId: condition.id,
          conditionName: condition.name,
          amount,
          patientName,
          successUrl: `${window.location.origin}/consult/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/consult/${condition.id}`,
        }),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); setLoading(false); return }
      window.location.href = data.url
    } catch {
      setError('Unable to connect to payment service. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="checkout-wrap">
      <div className="checkout-summary">
        <div className="checkout-summary__row">
          <span>Consultation — {condition.name}</span>
          <span className="checkout-summary__amount">${(amount / 100).toFixed(2)}</span>
        </div>
        <div className="checkout-summary__row checkout-summary__row--total">
          <span>Total due today</span>
          <span className="checkout-summary__total">${(amount / 100).toFixed(2)}</span>
        </div>
      </div>

      {error && <p className="checkout-error">⚠ {error}</p>}

      <div className="checkout-actions">
        <button type="button" className="btn-outline" onClick={onBack}>← Back</button>
        <button className="btn-primary checkout-btn" onClick={handleCheckout} disabled={loading}>
          {loading ? <span className="checkout-spinner" /> : 'Continue to Payment →'}
        </button>
      </div>

      <p className="checkout-secure">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        You'll be redirected to Stripe's secure payment page
      </p>

      <style>{`
        .checkout-wrap { display: flex; flex-direction: column; gap: 20px; }
        .checkout-summary {
          background: var(--off-white);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 16px 20px;
          display: flex; flex-direction: column; gap: 8px;
        }
        .checkout-summary__row {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 0.875rem; color: var(--text-secondary);
        }
        .checkout-summary__row--total {
          padding-top: 8px;
          border-top: 1px solid var(--border);
          font-weight: 700; color: var(--navy);
        }
        .checkout-summary__amount { font-weight: 600; color: var(--teal); }
        .checkout-summary__total { font-size: 1.1rem; color: var(--teal); }
        .checkout-error { font-size: 0.82rem; color: #e53e3e; font-weight: 500; }
        .checkout-actions {
          display: flex; gap: 12px; justify-content: flex-end; padding-top: 8px;
        }
        .checkout-btn { min-width: 200px; justify-content: center; }
        .checkout-spinner {
          width: 18px; height: 18px;
          border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: white; border-radius: 50%;
          animation: checkSpin 0.7s linear infinite; display: inline-block;
        }
        @keyframes checkSpin { to { transform: rotate(360deg); } }
        .checkout-secure {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.75rem; color: var(--text-muted);
          justify-content: center;
        }
      `}</style>
    </div>
  )
}
