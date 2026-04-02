import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    number: '01',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: 'Answer Health Questions',
    desc: 'Complete a short, secure health questionnaire about your symptoms and medical history — from your phone or computer, in minutes.',
    detail: 'No waiting room. No scheduling. Available 24/7.',
  },
  {
    number: '02',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    title: 'Doctor Reviews & Prescribes',
    desc: 'A board-certified physician reviews your information personally. If it\'s safe to treat, they craft a personalized treatment plan for you.',
    detail: 'Same-day response guaranteed during business hours.',
  },
  {
    number: '03',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: 'Pick Up at Your Pharmacy',
    desc: 'Your prescription is sent electronically to the pharmacy of your choice. Pick up same-day, or have lab work ordered to a nearby facility.',
    detail: 'Works with CVS, Walgreens, Walmart, and thousands more.',
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" className="hiw" ref={ref}>
      <div className="container">
        <motion.div
          className="hiw__header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label">Simple Process</span>
          <h2 className="section-title">From symptoms to<br />prescription in hours</h2>
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            No commute. No waiting rooms. No surprise bills. Just fast, affordable care from doctors who actually review your case.
          </p>
        </motion.div>

        <div className="hiw__steps">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="hiw__step"
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="hiw__step-num">{step.number}</div>
              <div className="hiw__step-icon">{step.icon}</div>
              <h3 className="hiw__step-title">{step.title}</h3>
              <p className="hiw__step-desc">{step.desc}</p>
              <p className="hiw__step-detail">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {step.detail}
              </p>
              {i < steps.length - 1 && <div className="hiw__connector" />}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="hiw__cta-bar"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <div className="hiw__cta-text">
            <strong>Ready to start?</strong> Most patients receive their treatment plan the same day.
          </div>
          <a href="#services" className="btn-primary">View Services & Pricing</a>
        </motion.div>
      </div>

      <style>{`
        .hiw {
          padding: 100px 0;
          background: var(--off-white);
          position: relative;
          overflow: hidden;
        }
        .hiw::before {
          content: '';
          position: absolute;
          top: -200px;
          right: -200px;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,180,216,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .hiw__header {
          max-width: 600px;
          margin-bottom: 64px;
        }
        .hiw__steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          position: relative;
        }
        .hiw__step {
          background: white;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 36px 28px;
          position: relative;
          transition: var(--transition);
          overflow: hidden;
        }
        .hiw__step::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--teal), var(--blue));
          opacity: 0;
          transition: opacity 0.3s;
        }
        .hiw__step:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }
        .hiw__step:hover::before { opacity: 1; }

        .hiw__step-num {
          font-family: var(--font-serif);
          font-size: 4rem;
          font-weight: 400;
          color: rgba(10, 36, 99, 0.07);
          position: absolute;
          top: 16px;
          right: 24px;
          line-height: 1;
          letter-spacing: -0.04em;
        }
        .hiw__step-icon {
          width: 56px;
          height: 56px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--navy);
          margin-bottom: 20px;
        }
        .hiw__step-title {
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--navy);
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }
        .hiw__step-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 16px;
        }
        .hiw__step-detail {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--teal);
        }
        .hiw__connector {
          display: none;
        }
        .hiw__cta-bar {
          margin-top: 48px;
          background: white;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 24px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .hiw__cta-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }
        .hiw__cta-text strong { color: var(--navy); }

        @media (max-width: 768px) {
          .hiw__steps { grid-template-columns: 1fr; }
          .hiw__cta-bar { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  )
}
