import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

export default function AuthPage() {
  const [tab, setTab]           = useState('login')   // 'login' | 'signup' | 'reset'
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [success, setSuccess]   = useState('')

  const { signIn, signUp, resetPassword } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setSuccess('')

    if (tab === 'signup' && password !== confirm) {
      setError('Passwords do not match.'); return
    }
    if (password.length < 6 && tab !== 'reset') {
      setError('Password must be at least 6 characters.'); return
    }

    setLoading(true)
    try {
      if (tab === 'login') {
        const { error } = await signIn(email, password)
        if (error) { setError(error.message); return }
        navigate('/dashboard')
      } else if (tab === 'signup') {
        const { error } = await signUp(email, password)
        if (error) { setError(error.message); return }
        setSuccess('Account created! Check your email to confirm, then log in.')
        setTab('login')
      } else if (tab === 'reset') {
        const { error } = await resetPassword(email)
        if (error) { setError(error.message); return }
        setSuccess('Password reset link sent — check your email.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link to="/" className="auth-logo">
          <svg width="32" height="32" viewBox="0 0 38 38" fill="none">
            <rect width="38" height="38" rx="10" fill="#0A9B8C"/>
            <path d="M15.5 9h7v6.5H29v7h-6.5V29h-7v-6.5H9v-7h6.5z" fill="#fff"/>
          </svg>
          <span>Great<strong>Doctors</strong> USA</span>
        </Link>

        {/* Tabs */}
        {tab !== 'reset' && (
          <div className="auth-tabs">
            {['login', 'signup'].map(t => (
              <button
                key={t}
                className={`auth-tab ${tab === t ? 'active' : ''}`}
                onClick={() => { setTab(t); setError(''); setSuccess('') }}
              >
                {t === 'login' ? 'Log In' : 'Create Account'}
              </button>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="auth-title">
              {tab === 'login' ? 'Welcome back' : tab === 'signup' ? 'Create your account' : 'Reset password'}
            </h2>
            <p className="auth-sub">
              {tab === 'login'
                ? 'Log in to view your consultation history.'
                : tab === 'signup'
                ? 'Track all your consultations in one place.'
                : 'Enter your email and we\'ll send a reset link.'}
            </p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-field">
                <label>Email address</label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              {tab !== 'reset' && (
                <div className="auth-field">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              )}

              {tab === 'signup' && (
                <div className="auth-field">
                  <label>Confirm password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    required
                  />
                </div>
              )}

              {error && (
                <motion.p className="auth-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  ⚠ {error}
                </motion.p>
              )}
              {success && (
                <motion.p className="auth-success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  ✓ {success}
                </motion.p>
              )}

              <button type="submit" className="btn-primary auth-submit" disabled={loading}>
                {loading ? <span className="auth-spinner" /> : (
                  tab === 'login' ? 'Log In' : tab === 'signup' ? 'Create Account' : 'Send Reset Link'
                )}
              </button>

              {tab === 'login' && (
                <button type="button" className="auth-forgot" onClick={() => { setTab('reset'); setError(''); setSuccess('') }}>
                  Forgot password?
                </button>
              )}
              {tab === 'reset' && (
                <button type="button" className="auth-forgot" onClick={() => { setTab('login'); setError(''); setSuccess('') }}>
                  ← Back to log in
                </button>
              )}
            </form>
          </motion.div>
        </AnimatePresence>

        <p className="auth-footer">
          By continuing you agree to our <Link to="/contact">Privacy Policy</Link> and <Link to="/contact">Terms of Use</Link>.
          All health information is HIPAA-encrypted.
        </p>
      </motion.div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          background: var(--sky);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .auth-card {
          background: white;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 48px 44px;
          max-width: 420px;
          width: 100%;
          box-shadow: var(--shadow-md);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .auth-logo {
          display: flex; align-items: center; gap: 10px;
          font-family: var(--font-serif);
          font-size: 1.1rem;
          color: var(--navy);
          text-decoration: none;
        }
        .auth-logo strong { color: var(--teal); font-weight: 700; }
        .auth-tabs {
          display: flex;
          background: var(--sky);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 4px;
          gap: 4px;
        }
        .auth-tab {
          flex: 1;
          padding: 8px;
          border-radius: calc(var(--radius-md) - 2px);
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--muted);
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        .auth-tab.active {
          background: white;
          color: var(--navy);
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .auth-title {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: var(--navy);
          font-weight: 400;
          letter-spacing: -0.02em;
        }
        .auth-sub { font-size: 0.85rem; color: var(--muted); margin-top: 4px; }
        .auth-form { display: flex; flex-direction: column; gap: 14px; }
        .auth-field { display: flex; flex-direction: column; gap: 6px; }
        .auth-field label { font-size: 0.82rem; font-weight: 600; color: var(--ink); }
        .auth-field input {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          padding: 11px 14px;
          border: 1.5px solid var(--border);
          border-radius: var(--radius-md);
          outline: none;
          transition: border-color 0.2s;
          color: var(--ink);
        }
        .auth-field input:focus {
          border-color: var(--teal);
          box-shadow: 0 0 0 3px rgba(10,155,140,0.1);
        }
        .auth-error { font-size: 0.8rem; color: #e53e3e; font-weight: 500; }
        .auth-success { font-size: 0.8rem; color: #22c55e; font-weight: 500; }
        .auth-submit { width: 100%; justify-content: center; padding: 13px; margin-top: 4px; }
        .auth-forgot {
          font-size: 0.8rem; color: var(--teal); background: none; border: none;
          cursor: pointer; text-align: center; font-family: var(--font-sans);
        }
        .auth-forgot:hover { text-decoration: underline; }
        .auth-spinner {
          width: 18px; height: 18px;
          border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: authSpin 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes authSpin { to { transform: rotate(360deg); } }
        .auth-footer {
          font-size: 0.72rem;
          color: var(--muted);
          text-align: center;
          line-height: 1.6;
          border-top: 1px solid var(--border);
          padding-top: 16px;
        }
        .auth-footer a { color: var(--teal); }
        @media (max-width: 480px) {
          .auth-card { padding: 32px 24px; }
        }
      `}</style>
    </div>
  )
}
