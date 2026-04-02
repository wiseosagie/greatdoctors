import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { QUESTIONS } from '../data/questions'
import ConsultationWizard from '../components/ConsultationWizard'

export default function ConsultationPage() {
  const { conditionId } = useParams()
  const navigate = useNavigate()
  const condition = QUESTIONS[conditionId]

  if (!condition) {
    return (
      <div style={{ padding: '160px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)', marginBottom: 12 }}>
          Condition not found
        </h2>
        <Link to="/services" className="btn-primary" style={{ display: 'inline-flex', marginTop: 8 }}>
          View All Services
        </Link>
      </div>
    )
  }

  return (
    <div className="consult-page">
      {/* Header strip */}
      <div className="consult-page__header" style={{ '--cond-color': condition.color }}>
        <div className="container consult-page__header-inner">
          <Link to="/services" className="consult-page__back">
            ← Back to Services
          </Link>
          <div className="consult-page__meta">
            <span className="consult-page__emoji">{condition.icon}</span>
            <div>
              <p className="consult-page__price-label">Visit fee</p>
              <p className="consult-page__price">{condition.price}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container consult-page__body">
        {/* Left — intro + doctor */}
        <motion.aside
          className="consult-page__aside"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="consult-page__condition-card" style={{ '--cond-color': condition.color }}>
            <span className="consult-page__condition-icon">{condition.icon}</span>
            <h1 className="consult-page__condition-name">{condition.name}</h1>
            <p className="consult-page__condition-intro">{condition.intro}</p>
            <div className="consult-page__condition-price">
              <span>Total visit fee:</span>
              <strong>{condition.price}</strong>
            </div>
          </div>

          {/* Doctor card */}
          <div className="consult-page__doctor">
            <div className="consult-page__doctor-avatar">EO</div>
            <div>
              <p className="consult-page__doctor-name">Dr. Evbu Osunde, MD</p>
              <p className="consult-page__doctor-role">Board-Certified Physician</p>
              <span className="consult-page__doctor-status">
                <span className="consult-page__online-dot" /> Reviewing patients
              </span>
            </div>
          </div>

          {/* Trust signals */}
          <div className="consult-page__trust">
            {[
              { icon: '🔒', text: 'HIPAA-encrypted & private' },
              { icon: '⚡', text: 'Same-day response' },
              { icon: '💊', text: 'Sent to your pharmacy' },
              { icon: '✅', text: 'No insurance needed' },
            ].map(t => (
              <div key={t.text} className="consult-page__trust-item">
                <span>{t.icon}</span>
                <span>{t.text}</span>
              </div>
            ))}
          </div>
        </motion.aside>

        {/* Right — wizard */}
        <motion.div
          className="consult-page__form"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <ConsultationWizard condition={condition} />
        </motion.div>
      </div>

      <style>{`
        .consult-page {
          min-height: 100vh;
          background: var(--off-white, #F4F8FF);
          padding-bottom: 80px;
        }
        .consult-page__header {
          background: white;
          border-bottom: 1px solid var(--border);
          padding: 80px 0 0;
        }
        .consult-page__header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 20px;
        }
        .consult-page__back {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--muted);
          display: flex; align-items: center; gap: 4px;
          transition: color 0.2s;
        }
        .consult-page__back:hover { color: var(--teal); }
        .consult-page__meta {
          display: flex; align-items: center; gap: 12px;
        }
        .consult-page__emoji { font-size: 1.8rem; }
        .consult-page__price-label { font-size: 0.72rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.07em; }
        .consult-page__price { font-family: var(--font-serif); font-size: 1.5rem; color: var(--cond-color, var(--teal)); }

        .consult-page__body {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 40px;
          padding-top: 40px;
          align-items: start;
        }

        /* Aside */
        .consult-page__aside {
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: sticky;
          top: 80px;
        }
        .consult-page__condition-card {
          background: white;
          border: 1px solid var(--border);
          border-top: 3px solid var(--cond-color, var(--teal));
          border-radius: var(--radius-lg);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .consult-page__condition-icon { font-size: 2rem; }
        .consult-page__condition-name {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--navy);
          font-weight: 400;
          letter-spacing: -0.01em;
        }
        .consult-page__condition-intro {
          font-size: 0.82rem;
          color: var(--muted);
          line-height: 1.65;
        }
        .consult-page__condition-price {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 10px;
          border-top: 1px solid var(--border);
          font-size: 0.82rem;
          color: var(--muted);
        }
        .consult-page__condition-price strong {
          font-size: 1.1rem;
          color: var(--cond-color, var(--teal));
          font-family: var(--font-serif);
        }

        .consult-page__doctor {
          background: white;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 18px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .consult-page__doctor-avatar {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--teal), #0ecebe);
          color: white;
          font-family: var(--font-serif);
          font-size: 1rem;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .consult-page__doctor-name { font-size: 0.875rem; font-weight: 600; color: var(--navy); }
        .consult-page__doctor-role { font-size: 0.72rem; color: var(--muted); margin-bottom: 4px; }
        .consult-page__doctor-status {
          display: flex; align-items: center; gap: 5px;
          font-size: 0.72rem; font-weight: 500; color: #22c55e;
        }
        .consult-page__online-dot {
          width: 6px; height: 6px;
          border-radius: 50%; background: #22c55e;
          animation: onPulse 2s infinite;
        }
        @keyframes onPulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:.5;transform:scale(1.5);} }

        .consult-page__trust {
          background: white;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .consult-page__trust-item {
          display: flex; gap: 10px; align-items: center;
          font-size: 0.8rem; color: var(--muted);
        }

        /* Form card */
        .consult-page__form {
          background: white;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 40px;
          box-shadow: var(--shadow-sm);
        }

        @media (max-width: 900px) {
          .consult-page__body { grid-template-columns: 1fr; }
          .consult-page__aside { position: static; }
        }
        @media (max-width: 600px) {
          .consult-page__form { padding: 24px 18px; }
        }
      `}</style>
    </div>
  )
}
