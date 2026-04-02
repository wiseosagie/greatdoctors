import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const CONDITION_LABELS = {
  dental: '🦷 Dental Infection',
  stds: '🔬 STD Treatment',
  sinus: '🤧 Sinus / Allergies',
  anxiety: '🧠 Depression & Anxiety',
  ear: '👂 Ear Infection',
  uti: '💧 UTI Treatment',
  weightloss: '⚖️ Weight Loss',
  hairloss: '💈 Hair Loss',
  insomnia: '😴 Insomnia',
  hypertension: '❤️ Hypertension',
  birthcontrol: '🩺 Birth Control',
  acne: '🧴 Acne Treatment',
  eczema: '🩹 Eczema & Rashes',
  fungal: '🔬 Fungal Infections',
  backpain: '🦴 Back Pain',
  gerd: '🔥 Acid Reflux / GERD',
  thyroid: '🧬 Thyroid Management',
}

function SubmissionDrawer({ sub, onClose }) {
  return (
    <motion.div
      className="dash-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="dash-drawer"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="dash-drawer__header">
          <div>
            <p className="dash-drawer__id">#{sub.id}</p>
            <h3 className="dash-drawer__title">{CONDITION_LABELS[sub.condition_id] || sub.condition}</h3>
            <p className="dash-drawer__date">{new Date(sub.submitted_at).toLocaleString()}</p>
          </div>
          <button className="dash-drawer__close" onClick={onClose}>✕</button>
        </div>

        <div className="dash-drawer__body">
          {sub.patient_info && Object.keys(sub.patient_info).length > 0 && (
            <>
              <p className="dash-drawer__section">Patient Info</p>
              {Object.entries(sub.patient_info).filter(([,v]) => v).map(([k, v]) => (
                <div key={k} className="dash-drawer__row dash-drawer__row--patient">
                  <span className="dash-drawer__key">{k.replace(/_/g,' ')}</span>
                  <span className="dash-drawer__val">{v}</span>
                </div>
              ))}
              <p className="dash-drawer__section" style={{ marginTop: 16 }}>Answers</p>
            </>
          )}
          {sub.answers && Object.entries(sub.answers)
            .filter(([k]) => !['first_name','last_name','phone','email','dob','gender','terms'].includes(k))
            .map(([k, v]) => {
              const display = Array.isArray(v) ? v.join(', ')
                : typeof v === 'object' && v !== null ? Object.values(v).join(' – ')
                : String(v || '—')
              return (
                <div key={k} className="dash-drawer__row">
                  <span className="dash-drawer__key">{k.replace(/_/g,' ')}</span>
                  <span className="dash-drawer__val">{display}</span>
                </div>
              )
            })}
        </div>

        <div className="dash-drawer__footer">
          <Link to="/services" className="btn-primary" style={{ fontSize: '0.85rem' }}>
            Start New Visit
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function PatientDashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading]         = useState(true)
  const [selected, setSelected]       = useState(null)

  useEffect(() => {
    if (!user) { navigate('/auth'); return }
    supabase
      .from('submissions')
      .select('*')
      .eq('user_id', user.id)
      .order('submitted_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error) setSubmissions(data || [])
        setLoading(false)
      })
  }, [user, navigate])

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="dash">
      <div className="dash__header">
        <div className="container dash__header-inner">
          <div>
            <h1 className="dash__title">My Consultations</h1>
            <p className="dash__sub">{user?.email}</p>
          </div>
          <div className="dash__header-actions">
            <Link to="/services" className="btn-primary" style={{ fontSize: '0.82rem', padding: '9px 18px' }}>
              + New Visit
            </Link>
            <button className="btn-outline" style={{ fontSize: '0.82rem', padding: '9px 18px' }} onClick={handleSignOut}>
              Log Out
            </button>
          </div>
        </div>
      </div>

      <div className="container dash__body">
        {loading ? (
          <div className="dash__empty">
            <div className="dash__spinner" />
            <p>Loading your consultations...</p>
          </div>
        ) : submissions.length === 0 ? (
          <motion.div
            className="dash__empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span style={{ fontSize: '3rem' }}>🏥</span>
            <p style={{ fontSize: '1.1rem', color: 'var(--navy)', fontFamily: 'var(--font-serif)' }}>No consultations yet</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
              Your consultation history will appear here after your first visit.
            </p>
            <Link to="/services" className="btn-primary" style={{ marginTop: 8 }}>
              Browse Services
            </Link>
          </motion.div>
        ) : (
          <div className="dash__grid">
            {submissions.map((sub, i) => (
              <motion.div
                key={sub.id}
                className="dash__card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(sub)}
              >
                <div className="dash__card-top">
                  <span className="dash__card-badge">
                    {CONDITION_LABELS[sub.condition_id] || sub.condition}
                  </span>
                  <span className="dash__card-status">Submitted</span>
                </div>
                <p className="dash__card-date">
                  {new Date(sub.submitted_at).toLocaleDateString('en-US', {
                    month: 'long', day: 'numeric', year: 'numeric'
                  })}
                </p>
                <p className="dash__card-id">ID: {sub.id}</p>
                <div className="dash__card-footer">
                  <span className="dash__card-link">View details →</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && <SubmissionDrawer sub={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      <style>{`
        .dash {
          min-height: 100vh;
          background: var(--sky);
          padding-bottom: 60px;
        }
        .dash__header {
          background: var(--navy);
          padding: 80px 0 0;
        }
        .dash__header-inner {
          display: flex; align-items: center; justify-content: space-between;
          padding-bottom: 24px; flex-wrap: wrap; gap: 16px;
        }
        .dash__title {
          font-family: var(--font-serif);
          font-size: 1.6rem; color: white; font-weight: 400;
        }
        .dash__sub { font-size: 0.8rem; color: rgba(255,255,255,0.5); margin-top: 2px; }
        .dash__header-actions { display: flex; gap: 10px; }
        .dash__header-actions .btn-outline {
          border-color: rgba(255,255,255,0.25); color: rgba(255,255,255,0.7);
        }
        .dash__header-actions .btn-outline:hover {
          background: rgba(255,255,255,0.08); color: white;
        }
        .dash__body { padding-top: 32px; }
        .dash__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }
        .dash__card {
          background: white; border: 1px solid var(--border);
          border-radius: var(--radius-lg); padding: 20px;
          cursor: pointer; transition: box-shadow 0.2s, transform 0.2s;
          display: flex; flex-direction: column; gap: 8px;
        }
        .dash__card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
        .dash__card-top { display: flex; align-items: center; justify-content: space-between; }
        .dash__card-badge {
          font-size: 0.78rem; font-weight: 600;
          background: var(--teal-l); color: var(--teal-d);
          padding: 4px 10px; border-radius: 99px;
        }
        .dash__card-status {
          font-size: 0.72rem; color: #22c55e; font-weight: 600;
          background: #f0fdf4; padding: 3px 8px; border-radius: 99px;
        }
        .dash__card-date { font-size: 0.9rem; color: var(--ink); font-weight: 500; }
        .dash__card-id { font-size: 0.72rem; color: var(--muted); font-family: monospace; }
        .dash__card-footer { margin-top: auto; padding-top: 8px; border-top: 1px solid var(--border); }
        .dash__card-link { font-size: 0.8rem; color: var(--teal); font-weight: 600; }
        .dash__empty {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; gap: 12px; padding: 80px 24px;
          text-align: center; background: white;
          border: 1px solid var(--border); border-radius: var(--radius-lg);
          color: var(--muted);
        }
        .dash__spinner {
          width: 32px; height: 32px;
          border: 3px solid var(--teal-l); border-top-color: var(--teal);
          border-radius: 50%; animation: dashSpin 0.7s linear infinite;
        }
        @keyframes dashSpin { to { transform: rotate(360deg); } }

        /* Drawer */
        .dash-overlay {
          position: fixed; inset: 0; z-index: 2000;
          background: rgba(13,33,54,0.4); backdrop-filter: blur(4px);
        }
        .dash-drawer {
          position: absolute; top: 0; right: 0; bottom: 0;
          width: min(500px, 100vw);
          background: white; display: flex; flex-direction: column;
          box-shadow: -8px 0 40px rgba(10,155,140,0.12);
        }
        .dash-drawer__header {
          display: flex; align-items: flex-start; justify-content: space-between;
          padding: 28px 28px 20px; border-bottom: 1px solid var(--border);
        }
        .dash-drawer__id { font-size: 0.72rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
        .dash-drawer__title { font-family: var(--font-serif); font-size: 1.2rem; color: var(--navy); font-weight: 400; margin-bottom: 4px; }
        .dash-drawer__date { font-size: 0.78rem; color: var(--muted); }
        .dash-drawer__close {
          background: var(--sky); border: 1px solid var(--border); border-radius: 50%;
          width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; cursor: pointer; flex-shrink: 0;
        }
        .dash-drawer__body {
          flex: 1; overflow-y: auto; padding: 20px 28px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .dash-drawer__section {
          font-size: 0.68rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.1em; color: var(--teal); margin-bottom: 2px;
        }
        .dash-drawer__row {
          display: grid; grid-template-columns: 140px 1fr; gap: 10px;
          padding: 9px 12px; background: var(--sky);
          border-radius: var(--radius-sm); border: 1px solid var(--border);
          font-size: 0.82rem;
        }
        .dash-drawer__row--patient { background: #f0faf9; border-color: var(--teal-l); }
        .dash-drawer__key { font-weight: 600; color: var(--navy); text-transform: capitalize; }
        .dash-drawer__val { color: var(--muted); }
        .dash-drawer__footer {
          padding: 20px 28px; border-top: 1px solid var(--border);
        }
      `}</style>
    </div>
  )
}
