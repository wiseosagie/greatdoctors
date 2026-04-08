import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase, ADMIN_EMAIL } from '../lib/supabase'

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

function AdminLoginGate({ onUnlock }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (authError) { setError(authError.message); return }
    if (data.user?.email !== ADMIN_EMAIL) {
      await supabase.auth.signOut()
      setError('Access denied. Admin account only.')
      return
    }
    onUnlock(data.user)
  }

  return (
    <div className="admin-gate">
      <motion.div
        className="admin-gate__card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="admin-gate__icon">🔐</div>
        <h2 className="admin-gate__title">Admin Access</h2>
        <p className="admin-gate__sub">Sign in with your admin account</p>

        <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="email"
            className="admin-gate__input"
            placeholder="Email address"
            value={email}
            onChange={e => { setEmail(e.target.value); setError('') }}
            required
            autoFocus
          />
          <input
            type="password"
            className={`admin-gate__input ${error ? 'error' : ''}`}
            placeholder="Password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError('') }}
            required
          />
          {error && (
            <motion.p className="admin-gate__error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              ⚠ {error}
            </motion.p>
          )}
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? <span className="admin-gate__spinner" /> : 'Sign In'}
          </button>
        </form>
      </motion.div>

      <style>{`
        .admin-gate {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--sky);
          padding: 24px;
        }
        .admin-gate__card {
          background: white;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 48px 40px;
          max-width: 380px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          text-align: center;
          box-shadow: var(--shadow-md);
        }
        .admin-gate__icon { font-size: 2.5rem; }
        .admin-gate__title {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          color: var(--navy);
          font-weight: 400;
        }
        .admin-gate__sub { font-size: 0.875rem; color: var(--muted); }
        .admin-gate__input {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          width: 100%;
          padding: 12px 14px;
          border: 1.5px solid var(--border);
          border-radius: var(--radius-md);
          outline: none;
          transition: border-color 0.2s;
          color: var(--ink);
        }
        .admin-gate__input:focus { border-color: var(--teal); box-shadow: 0 0 0 3px rgba(10,155,140,0.1); }
        .admin-gate__input.error { border-color: #e53e3e; }
        .admin-gate__error { font-size: 0.8rem; color: #e53e3e; font-weight: 500; }
        .admin-gate__spinner {
          width: 18px; height: 18px;
          border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: white; border-radius: 50%;
          animation: adminGateSpin 0.7s linear infinite; display: inline-block;
        }
        @keyframes adminGateSpin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}


function SubmissionDrawer({ sub, onClose }) {
  const pi = sub.patient_info || {}
  const patientRows = [
    { label: 'First Name', value: pi.firstName },
    { label: 'Last Name', value: pi.lastName },
    { label: 'Phone', value: pi.phone },
    { label: 'Email', value: pi.email },
    { label: 'Date of Birth', value: pi.dob },
    { label: 'Biological Sex', value: pi.gender },
  ].filter(r => r.value)

  return (
    <motion.div
      className="drawer-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="drawer"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="drawer__header">
          <div>
            <p className="drawer__id">#{sub.id}</p>
            <h3 className="drawer__title">{CONDITION_LABELS[sub.condition_id] || sub.condition}</h3>
            <p className="drawer__date">{new Date(sub.submitted_at).toLocaleString()}</p>
          </div>
          <button className="drawer__close" onClick={onClose}>✕</button>
        </div>

        <div className="drawer__body">
          {patientRows.length > 0 && (
            <>
              <p className="drawer__section-label">Patient Info</p>
              {patientRows.map(r => (
                <div key={r.label} className="drawer__row drawer__row--patient">
                  <span className="drawer__key">{r.label}</span>
                  <span className="drawer__val">{r.value}</span>
                </div>
              ))}
              <p className="drawer__section-label" style={{ marginTop: 16 }}>Consultation Answers</p>
            </>
          )}
          {sub.answers && Object.entries(sub.answers)
            .filter(([k]) => !['first_name','last_name','phone','email','dob','gender','terms'].includes(k))
            .length > 0
            ? Object.entries(sub.answers)
                .filter(([k]) => !['first_name','last_name','phone','email','dob','gender','terms'].includes(k))
                .map(([k, v]) => {
                  const display = Array.isArray(v) ? v.join(', ')
                    : typeof v === 'object' && v !== null ? Object.values(v).filter(Boolean).join(' – ')
                    : String(v || '—')
                  return (
                    <div key={k} className="drawer__row">
                      <span className="drawer__key">{k.replace(/_/g, ' ')}</span>
                      <span className="drawer__val">{display}</span>
                    </div>
                  )
                })
            : <p className="drawer__empty-answers">No answers recorded.</p>
          }
        </div>

        <div className="drawer__footer">
          <button
            className={`admin__reviewed-btn admin__reviewed-btn--lg ${sub.reviewed ? 'confirmed' : ''}`}
            onClick={(e) => toggleReviewed(e, sub)}
          >
            {sub.reviewed ? '✅ Mark as Pending' : '🕐 Mark as Reviewed'}
          </button>
          <button
            className="btn-outline"
            onClick={() => {
              const blob = new Blob([JSON.stringify(sub, null, 2)], { type: 'application/json' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url; a.download = `${sub.id}.json`; a.click()
              URL.revokeObjectURL(url)
            }}
          >
            ⬇ Download JSON
          </button>
          <button
            className="btn-outline"
            onClick={() => {
              const patientSection = patientRows.map(r => `${r.label.toUpperCase()}: ${r.value}`).join('\n')
              const answerLines = sub.answers
                ? Object.entries(sub.answers)
                    .filter(([k]) => !['first_name','last_name','phone','email','dob','gender','terms'].includes(k))
                    .map(([k, v]) => {
                      const display = Array.isArray(v) ? v.join(', ')
                        : typeof v === 'object' && v !== null ? Object.values(v).filter(Boolean).join(' – ')
                        : String(v || '—')
                      return `${k.replace(/_/g,' ').toUpperCase()}: ${display}`
                    }).join('\n')
                : '(none)'
              const txt = [
                'PATIENT SUBMISSION',
                `ID: ${sub.id}`,
                `Condition: ${sub.condition}`,
                `Submitted: ${new Date(sub.submitted_at).toLocaleString()}`,
                '--- PATIENT INFO ---',
                patientSection,
                '--- ANSWERS ---',
                answerLines,
              ].join('\n')
              const blob = new Blob([txt], { type: 'text/plain' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url; a.download = `${sub.id}.txt`; a.click()
              URL.revokeObjectURL(url)
            }}
          >
            ⬇ Download TXT
          </button>
        </div>
      </motion.div>

      <style>{`
        .drawer-overlay {
          position: fixed; inset: 0; z-index: 2000;
          background: rgba(13,33,54,0.4);
          backdrop-filter: blur(4px);
        }
        .drawer {
          position: absolute; top: 0; right: 0; bottom: 0;
          width: min(520px, 100vw);
          background: white;
          display: flex; flex-direction: column;
          box-shadow: -8px 0 40px rgba(10,155,140,0.12);
        }
        .drawer__header {
          display: flex; align-items: flex-start; justify-content: space-between;
          padding: 28px 28px 20px;
          border-bottom: 1px solid var(--border);
        }
        .drawer__id { font-size: 0.72rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
        .drawer__title { font-family: var(--font-serif); font-size: 1.3rem; color: var(--navy); font-weight: 400; margin-bottom: 4px; }
        .drawer__date { font-size: 0.78rem; color: var(--muted); }
        .drawer__close {
          background: var(--sky); border: 1px solid var(--border); border-radius: 50%;
          width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; cursor: pointer; flex-shrink: 0; transition: background 0.2s;
        }
        .drawer__close:hover { background: var(--teal-l); }
        .drawer__body {
          flex: 1; overflow-y: auto; padding: 20px 28px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .drawer__row {
          display: grid; grid-template-columns: 160px 1fr; gap: 12px;
          padding: 10px 14px; background: var(--sky);
          border-radius: var(--radius-sm); border: 1px solid var(--border);
          font-size: 0.85rem;
        }
        .drawer__key { font-weight: 600; color: var(--navy); text-transform: capitalize; }
        .drawer__val { color: var(--muted); }
        .drawer__section-label {
          font-size: 0.68rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.1em; color: var(--teal); margin-bottom: 4px;
        }
        .drawer__row--patient { background: #f0faf9; border-color: var(--teal-l); }
        .drawer__empty-answers { font-size: 0.82rem; color: var(--muted); font-style: italic; padding: 8px 0; }
        .drawer__footer {
          padding: 20px 28px; border-top: 1px solid var(--border);
          display: flex; gap: 10px;
        }
      `}</style>
    </motion.div>
  )
}

export default function AdminPage() {
  const [adminUser, setAdminUser] = useState(null)
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')
  const [reviewFilter, setReviewFilter] = useState('all') // 'all' | 'pending' | 'reviewed'
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  useEffect(() => {
    if (!adminUser) return
    setLoading(true)
    supabase
      .from('submissions')
      .select('*')
      .order('submitted_at', { ascending: false })
      .then(({ data, error: err }) => {
        if (err) { setError(err.message) }
        else { setSubmissions(data || []) }
        setLoading(false)
      })
  }, [adminUser])

  const toggleReviewed = async (e, sub) => {
    e.stopPropagation()
    const newVal = !sub.reviewed
    // Optimistic UI update first
    setSubmissions(prev => prev.map(s => s.id === sub.id ? { ...s, reviewed: newVal } : s))
    if (selected?.id === sub.id) setSelected(prev => ({ ...prev, reviewed: newVal }))
    // Persist to Supabase
    const { error: updateError } = await supabase
      .from('submissions')
      .update({ reviewed: newVal })
      .eq('id', sub.id)
    if (updateError) {
      // Revert on failure
      setSubmissions(prev => prev.map(s => s.id === sub.id ? { ...s, reviewed: !newVal } : s))
      if (selected?.id === sub.id) setSelected(prev => ({ ...prev, reviewed: !newVal }))
      alert(`Could not save: ${updateError.message}`)
    }
  }

  if (!adminUser) return <AdminLoginGate onUnlock={(user) => setAdminUser(user)} />

  const conditions = [...new Set(submissions.map(s => s.condition_id))]

  const filtered = submissions.filter(s => {
    const matchesCondition = filter === 'all' || s.condition_id === filter
    const matchesReview = reviewFilter === 'all' || (reviewFilter === 'reviewed' ? s.reviewed : !s.reviewed)
    const pi = s.patient_info || {}
    const searchStr = search.toLowerCase()
    const matchesSearch = !search ||
      (s.condition || '').toLowerCase().includes(searchStr) ||
      (s.id || '').toLowerCase().includes(searchStr) ||
      `${pi.firstName || ''} ${pi.lastName || ''}`.toLowerCase().includes(searchStr) ||
      (pi.phone || '').includes(search) ||
      (pi.email || '').toLowerCase().includes(searchStr)
    const subDate = new Date(s.submitted_at)
    const matchesFrom = !dateFrom || subDate >= new Date(dateFrom)
    const matchesTo = !dateTo || subDate <= new Date(dateTo + 'T23:59:59')
    return matchesCondition && matchesReview && matchesSearch && matchesFrom && matchesTo
  })

  const downloadAll = () => {
    const blob = new Blob([JSON.stringify(submissions, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `all-submissions-${Date.now()}.json`; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="admin">
      <div className="admin__topbar">
        <div className="container admin__topbar-inner">
          <div className="admin__topbar-brand">
            <span>🏥</span>
            <div>
              <h1 className="admin__topbar-title">Admin Dashboard</h1>
              <p className="admin__topbar-sub">Patient Consultation Submissions</p>
            </div>
          </div>
          <div className="admin__topbar-actions">
            <span className="admin__total-badge">{submissions.length} total</span>
            <button className="btn-outline" onClick={downloadAll} style={{ fontSize: '0.8rem', padding: '8px 16px' }}>
              ⬇ Export All JSON
            </button>
            <button className="btn-outline" onClick={async () => { await supabase.auth.signOut(); setAdminUser(null) }} style={{ fontSize: '0.8rem', padding: '8px 16px' }}>
              Lock
            </button>
          </div>
        </div>
      </div>

      <div className="container admin__body">
        {/* Stats row */}
        <div className="admin__stats">
          {[
            { label: 'Total Submissions', value: submissions.length, icon: '📋' },
            { label: 'Conditions Covered', value: conditions.length, icon: '🔬' },
            { label: 'Today', value: submissions.filter(s => new Date(s.submitted_at).toDateString() === new Date().toDateString()).length, icon: '📅' },
            { label: 'This Week', value: submissions.filter(s => (Date.now() - new Date(s.submitted_at)) < 7 * 86400000).length, icon: '📈' },
          ].map(stat => (
            <div key={stat.label} className="admin__stat">
              <span className="admin__stat-icon">{stat.icon}</span>
              <span className="admin__stat-value">{stat.value}</span>
              <span className="admin__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="admin__filters">
          <div className="admin__filters-row">
            <input
              className="admin__search"
              placeholder="Search by name, email, phone..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="admin__date-range">
              <label>From</label>
              <input type="date" className="admin__date-input" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
              <label>To</label>
              <input type="date" className="admin__date-input" value={dateTo} onChange={e => setDateTo(e.target.value)} />
              {(dateFrom || dateTo) && (
                <button className="admin__date-clear" onClick={() => { setDateFrom(''); setDateTo('') }}>✕ Clear</button>
              )}
            </div>
          </div>
          <div className="admin__filter-tabs">
            <button className={`admin__filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Conditions</button>
            {conditions.map(c => (
              <button key={c} className={`admin__filter-tab ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>
                {CONDITION_LABELS[c] || c}
              </button>
            ))}
          </div>
          <div className="admin__filter-tabs">
            {[['all', '📋 All'], ['pending', '🕐 Pending Review'], ['reviewed', '✅ Reviewed']].map(([val, label]) => (
              <button key={val} className={`admin__filter-tab ${reviewFilter === val ? 'active' : ''}`} onClick={() => setReviewFilter(val)}>
                {label} {val !== 'all' && <span className="admin__filter-count">
                  {val === 'pending' ? submissions.filter(s => !s.reviewed).length : submissions.filter(s => s.reviewed).length}
                </span>}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="admin__loading">
            <div className="admin__spinner" />
            <p>Loading submissions...</p>
          </div>
        ) : error ? (
          <div className="admin__error-state">
            <p>⚠ Error loading submissions: {error}</p>
            <p style={{ fontSize: '0.82rem', marginTop: 8, color: 'var(--muted)' }}>
              No submissions have been received yet, or the function is unavailable locally.
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="admin__empty">
            <span style={{ fontSize: '3rem' }}>📭</span>
            <p>No submissions yet</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
              {submissions.length === 0
                ? 'Submissions will appear here once patients complete the consultation form.'
                : 'No results match your current filter.'}
            </p>
          </div>
        ) : (
          <div className="admin__table-wrap">
            <table className="admin__table">
              <thead>
                <tr>
                  <th>Submitted</th>
                  <th>Patient</th>
                  <th>Condition</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((sub, i) => {
                  const pi = sub.patient_info || {}
                  const fullName = [pi.firstName, pi.lastName].filter(Boolean).join(' ') || '—'
                  return (
                  <motion.tr
                    key={sub.id}
                    className={`admin__table-row ${sub.reviewed ? 'admin__table-row--reviewed' : ''}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => setSelected(sub)}
                  >
                    <td className="admin__td-date">
                      <span>{new Date(sub.submitted_at).toLocaleDateString()}</span>
                      <span className="admin__td-time">{new Date(sub.submitted_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </td>
                    <td>
                      <span className="admin__td-patient">{fullName}</span>
                      {pi.email && <span className="admin__td-email">{pi.email}</span>}
                    </td>
                    <td>
                      <span className="admin__condition-badge">
                        {CONDITION_LABELS[sub.condition_id] || sub.condition}
                      </span>
                    </td>
                    <td className="admin__td-phone">{pi.phone || '—'}</td>
                    <td>
                      <button
                        className={`admin__reviewed-btn ${sub.reviewed ? 'confirmed' : ''}`}
                        onClick={(e) => toggleReviewed(e, sub)}
                        title={sub.reviewed ? 'Mark as pending' : 'Mark as reviewed'}
                      >
                        {sub.reviewed ? '✅ Reviewed' : '🕐 Pending'}
                      </button>
                    </td>
                    <td>
                      <button className="admin__view-btn">View →</button>
                    </td>
                  </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && <SubmissionDrawer sub={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      <style>{`
        .admin {
          min-height: 100vh;
          background: var(--sky);
        }
        .admin__topbar {
          background: var(--navy);
          padding: 70px 0 0;
        }
        .admin__topbar-inner {
          display: flex; align-items: center; justify-content: space-between;
          padding-bottom: 20px; flex-wrap: wrap; gap: 16px;
        }
        .admin__topbar-brand { display: flex; align-items: center; gap: 14px; font-size: 1.5rem; }
        .admin__topbar-title {
          font-family: var(--font-serif); font-size: 1.4rem; color: white; font-weight: 400;
        }
        .admin__topbar-sub { font-size: 0.78rem; color: rgba(255,255,255,0.5); }
        .admin__topbar-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .admin__topbar-actions .btn-outline {
          border-color: rgba(255,255,255,0.2); color: rgba(255,255,255,0.7);
        }
        .admin__topbar-actions .btn-outline:hover {
          background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.5); color: white;
        }
        .admin__total-badge {
          background: var(--teal); color: white; font-size: 0.75rem; font-weight: 600;
          padding: 4px 12px; border-radius: 99px;
        }

        .admin__body { padding-top: 32px; padding-bottom: 60px; }

        .admin__stats {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 28px;
        }
        .admin__stat {
          background: white; border: 1px solid var(--border); border-radius: var(--radius-md);
          padding: 20px; display: flex; flex-direction: column; gap: 4px;
          transition: box-shadow 0.2s;
        }
        .admin__stat:hover { box-shadow: var(--shadow-sm); }
        .admin__stat-icon { font-size: 1.2rem; }
        .admin__stat-value { font-family: var(--font-serif); font-size: 2rem; color: var(--navy); letter-spacing: -0.03em; line-height: 1; }
        .admin__stat-label { font-size: 0.78rem; color: var(--muted); }

        .admin__filters { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; }
        .admin__filters-row { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
        .admin__search {
          font-family: var(--font-sans); font-size: 0.875rem;
          padding: 11px 16px; border: 1.5px solid var(--border);
          border-radius: var(--radius-md); background: white; outline: none;
          max-width: 280px; transition: border-color 0.2s; flex: 1;
        }
        .admin__search:focus { border-color: var(--teal); box-shadow: 0 0 0 3px rgba(10,155,140,0.1); }
        .admin__date-range {
          display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
        }
        .admin__date-range label { font-size: 0.78rem; font-weight: 600; color: var(--muted); }
        .admin__date-input {
          font-family: var(--font-sans); font-size: 0.82rem;
          padding: 8px 12px; border: 1.5px solid var(--border);
          border-radius: var(--radius-md); background: white; outline: none;
          transition: border-color 0.2s; color: var(--ink);
        }
        .admin__date-input:focus { border-color: var(--teal); }
        .admin__date-clear {
          font-family: var(--font-sans); font-size: 0.78rem; font-weight: 500;
          color: #e53e3e; background: #fff5f5; border: 1px solid #fcd5d5;
          border-radius: 99px; padding: 5px 12px; cursor: pointer;
          transition: all 0.15s;
        }
        .admin__date-clear:hover { background: #ffe4e4; }
        .admin__filter-tabs { display: flex; gap: 6px; flex-wrap: wrap; }
        .admin__filter-tab {
          font-family: var(--font-sans); font-size: 0.8rem; font-weight: 500;
          padding: 6px 14px; border-radius: 99px; cursor: pointer;
          background: white; border: 1px solid var(--border); color: var(--muted);
          transition: all 0.15s; display: flex; align-items: center; gap: 6px;
        }
        .admin__filter-tab:hover { border-color: var(--teal); color: var(--teal); }
        .admin__filter-tab.active { background: var(--teal); border-color: var(--teal); color: white; }
        .admin__filter-count {
          background: rgba(255,255,255,0.25); border-radius: 99px;
          padding: 1px 7px; font-size: 0.72rem; font-weight: 700;
        }
        .admin__filter-tab:not(.active) .admin__filter-count {
          background: var(--teal-l); color: var(--teal);
        }
        .admin__reviewed-btn {
          font-family: var(--font-sans); font-size: 0.75rem; font-weight: 600;
          padding: 5px 12px; border-radius: 99px; cursor: pointer;
          border: 1.5px solid var(--border); background: var(--sky);
          color: var(--muted); transition: all 0.18s; white-space: nowrap;
        }
        .admin__reviewed-btn:hover { border-color: var(--teal); color: var(--teal-d); background: var(--teal-l); }
        .admin__reviewed-btn.confirmed { background: #ecfdf5; border-color: #6ee7b7; color: #065f46; }
        .admin__reviewed-btn.confirmed:hover { background: #d1fae5; }
        .admin__reviewed-btn--lg { font-size: 0.85rem; padding: 9px 18px; }
        .admin__table-row--reviewed { opacity: 0.65; }
        .admin__table-row--reviewed:hover { opacity: 1; }

        .admin__table-wrap {
          background: white; border: 1px solid var(--border);
          border-radius: var(--radius-lg); overflow: hidden;
        }
        .admin__table { width: 100%; border-collapse: collapse; }
        .admin__table thead tr {
          background: var(--sky); border-bottom: 1px solid var(--border);
        }
        .admin__table th {
          padding: 12px 16px; text-align: left;
          font-size: 0.72rem; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.08em; color: var(--muted);
        }
        .admin__table-row {
          border-bottom: 1px solid var(--border); cursor: pointer;
          transition: background 0.15s;
        }
        .admin__table-row:last-child { border-bottom: none; }
        .admin__table-row:hover { background: var(--teal-l); }
        .admin__table td { padding: 14px 16px; vertical-align: middle; }
        .admin__td-date { display: flex; flex-direction: column; gap: 2px; }
        .admin__td-date span { font-size: 0.875rem; color: var(--ink); font-weight: 500; }
        .admin__td-time { font-size: 0.75rem !important; color: var(--muted) !important; font-weight: 400 !important; }
        .admin__condition-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--teal-l); color: var(--teal-d);
          font-size: 0.78rem; font-weight: 600;
          padding: 4px 12px; border-radius: 99px;
        }
        .admin__td-patient { display: block; font-size: 0.875rem; color: var(--ink); font-weight: 500; }
        .admin__td-email { display: block; font-size: 0.72rem; color: var(--muted); }
        .admin__td-phone { font-size: 0.85rem; color: var(--ink); font-family: monospace; }
        .admin__view-btn {
          font-family: var(--font-sans); font-size: 0.8rem; font-weight: 600;
          color: var(--teal); background: none; border: none; cursor: pointer;
          padding: 6px 10px; border-radius: var(--radius-sm);
          transition: background 0.15s;
        }
        .admin__view-btn:hover { background: var(--teal-l); }

        .admin__loading, .admin__empty, .admin__error-state {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 12px; padding: 80px 24px; text-align: center;
          background: white; border: 1px solid var(--border); border-radius: var(--radius-lg);
          color: var(--muted);
        }
        .admin__spinner {
          width: 32px; height: 32px;
          border: 3px solid var(--teal-l);
          border-top-color: var(--teal);
          border-radius: 50%;
          animation: adminSpin 0.7s linear infinite;
        }
        @keyframes adminSpin { to { transform: rotate(360deg); } }

        @media (max-width: 900px) {
          .admin__stats { grid-template-columns: repeat(2,1fr); }
          .admin__table-wrap { overflow-x: auto; }
        }
        @media (max-width: 600px) {
          .admin__stats { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  )
}
