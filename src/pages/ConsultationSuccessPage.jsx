import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

export default function ConsultationSuccessPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [status, setStatus] = useState('loading')
  const [data, setData] = useState(null)

  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    const raw = localStorage.getItem('gd_pending_submission')
    if (!raw || !sessionId) { setStatus('error'); return }

    const pending = JSON.parse(raw)
    setData(pending)

    const { conditionId, conditionName, answers, amount } = pending

    const patientInfo = {
      firstName: answers?.first_name || answers?.name || '',
      lastName:  answers?.last_name  || '',
      phone:     answers?.phone      || '',
      email:     answers?.email      || '',
      dob:       answers?.dob        || '',
      gender:    answers?.gender     || '',
    }

    fetch('/api/log-submission', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        condition:       conditionName,
        conditionId,
        answers,
        userId:          user?.id || pending.userId || null,
        paymentIntentId: sessionId,
        paymentStatus:   'paid',
        amountPaid:      amount ? `$${(amount / 100).toFixed(2)}` : null,
      }),
    }).then(() => {
      localStorage.removeItem('gd_pending_submission')
      setStatus('success')
    }).catch(() => {
      setStatus('success') // show success even if API call fails
    })
  }, [sessionId])

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>Confirming your payment…</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '40px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}>Something went wrong</h2>
        <p style={{ color: 'var(--muted)', maxWidth: 400 }}>
          If your payment completed, your booking is confirmed. Please contact us if you need assistance.
        </p>
        <button className="btn-primary" onClick={() => navigate('/')}>Return to Home</button>
      </div>
    )
  }

  const patientEmail = data?.answers?.email || ''
  const isLoggedIn = !!user
  const accountUrl = patientEmail
    ? `/auth?email=${encodeURIComponent(patientEmail)}&mode=signup`
    : '/auth?mode=signup'

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 24px' }}>
      <motion.div
        className="success"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div className="success__icon" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </motion.div>

        <h2 className="success__title">You're all set!</h2>
        <p className="success__sub">Your consultation has been received and payment confirmed.</p>
        <p className="success__sub">
          One of our doctors will personally review your case and send your treatment plan within <strong>2 to 4 hours</strong> during business hours.
        </p>

        <div className="success__steps">
          {[
            { icon: '🔒', text: 'Your responses are encrypted and stored securely' },
            { icon: '👨‍⚕️', text: 'One of our doctors reviews your case personally' },
            { icon: '💊', text: 'Your treatment plan is sent within 2 to 4 hours' },
            { icon: '✅', text: 'Pick up your medication — same day in most cases' },
          ].map((s, i) => (
            <motion.div key={s.text} className="success__step" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
              <span className="success__step-emoji">{s.icon}</span>
              <span>{s.text}</span>
            </motion.div>
          ))}
        </div>

        {isLoggedIn ? (
          <motion.div className="success__actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <button className="btn-primary" onClick={() => navigate('/dashboard')}>
              View My Visits
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
              </svg>
            </button>
            <a href="/" className="btn-outline">Back to Home</a>
          </motion.div>
        ) : (
          <motion.div className="success__account-prompt" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <div className="success__account-prompt__inner">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              <div>
                <p className="success__account-prompt__title">Skip the form on your next visit</p>
                <p className="success__account-prompt__sub">Create a free account and your personal details will be saved — no re-entering next time.</p>
              </div>
            </div>
            <div className="success__account-prompt__actions">
              <button className="btn-primary success__account-btn" onClick={() => navigate(accountUrl)}>
                Create Free Account
              </button>
            </div>
            <div style={{ marginTop: 12 }}>
              <a href="/" className="success__account-skip">Return to Home</a>
            </div>
          </motion.div>
        )}
      </motion.div>

      <style>{`
        .success {
          max-width: 420px; margin: 0 auto;
          padding: 2rem 1.5rem; text-align: center;
        }
        .success__icon { display: flex; justify-content: center; margin-bottom: 1.25rem; }
        .success__title { font-size: 22px; font-weight: 500; margin: 0 0 8px; }
        .success__sub { font-size: 16px; line-height: 1.7; color: var(--text-muted); margin: 0 0 8px; }
        .success__sub strong { font-weight: 500; color: var(--text); }
        .success__steps {
          border: 0.5px solid var(--border); border-radius: 8px;
          overflow: hidden; margin: 1.25rem 0 1.5rem; text-align: left;
        }
        .success__step {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 14px; font-size: 16px; line-height: 1.7;
          color: var(--text-muted); border-bottom: 0.5px solid var(--border);
        }
        .success__step:last-child { border-bottom: none; }
        .success__step-emoji { font-size: 18px; flex-shrink: 0; }
        .success__actions {
          display: flex; gap: 12px; flex-wrap: wrap;
          justify-content: center; margin-top: 8px;
        }
        .success__account-prompt {
          background: var(--surface); border-radius: 8px;
          padding: 14px 16px; text-align: left;
        }
        .success__account-prompt__inner {
          display: flex; gap: 10px; align-items: flex-start; margin-bottom: 10px;
        }
        .success__account-prompt__title { margin: 0 0 4px; font-size: 16px; font-weight: 500; color: var(--text); }
        .success__account-prompt__sub { margin: 0; font-size: 16px; line-height: 1.7; color: var(--text-muted); }
        .success__account-prompt__actions { margin-top: 10px; }
        .success__account-btn { display: block; width: 100%; box-sizing: border-box; text-align: center; }
        .success__account-skip {
          display: inline-block; font-size: 16px; color: var(--text-muted);
          text-decoration: none; border-bottom: 0.5px solid var(--border);
        }
        .success__account-skip:hover { color: var(--navy); }
      `}</style>
    </div>
  )
}
