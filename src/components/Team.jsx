import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const credentials = [
  { label: 'Board-Certified', sub: 'Licensed Physician' },
  { label: 'Background Checked', sub: 'Verified & screened' },
  { label: 'HIPAA Trained', sub: 'Data protected' },
  { label: 'TX Licensed', sub: 'State-certified' },
]

export default function Team() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="team" className="team" ref={ref}>
      <div className="container">
        <motion.div
          className="team__header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Our Physician</span>
          <h2 className="section-title">The doctor behind<br />your care</h2>
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            Every patient is personally reviewed by Dr. Evbu Osunde — a licensed, board-certified physician
            based in Texas. Available nights and weekends.
          </p>
        </motion.div>

        <div className="team__credentials">
          {credentials.map((c, i) => (
            <motion.div
              key={c.label}
              className="team__credential"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.07 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <div>
                <span className="team__credential-label">{c.label}</span>
                <span className="team__credential-sub">{c.sub}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dr. Evbu Osunde — featured card */}
        <motion.div
          className="doctor-feature"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="doctor-feature__img-wrap">
            <div className="doctor-feature__img-bg" />
            <div className="doctor-feature__initials">EO</div>
            <div className="doctor-feature__badge">
              <span className="doctor-feature__badge-dot" />
              Accepting Patients
            </div>
          </div>

          <div className="doctor-feature__body">
            <span className="section-label" style={{ marginBottom: 12 }}>Lead Physician</span>
            <h3 className="doctor-feature__name">Dr. Evbu Osunde, MD</h3>
            <p className="doctor-feature__role">Board-Certified Physician · Arlington & Dallas, TX</p>

            <p className="doctor-feature__bio">
              Dr. Evbu Osunde is a board-certified physician dedicated to making quality healthcare accessible
              to everyone in the DFW area. With a commitment to evidence-based medicine and compassionate
              care, Dr. Osunde reviews each patient's case personally — ensuring you receive a treatment
              plan that's right for you.
            </p>

            <p className="doctor-feature__bio" style={{ marginTop: 14 }}>
              Specializing in sexual health, urgent care, and general telemedicine, Dr. Osunde believes that
              cost and convenience should never be a barrier to getting the care you need.
            </p>

            <div className="doctor-feature__specialties">
              {['Sexual Health', 'Urgent Care', 'Men\'s Health', 'Mental Health', 'General Telemedicine'].map(s => (
                <span key={s} className="doctor-feature__tag">{s}</span>
              ))}
            </div>

            <a href="/contact" className="btn-primary" style={{ marginTop: 24, alignSelf: 'flex-start' }}>
              Start a Visit with Dr. Osunde
            </a>
          </div>
        </motion.div>
      </div>

      <style>{`
        .team {
          padding: 100px 0;
          background: var(--white);
        }
        .team__header {
          max-width: 600px;
          margin-bottom: 40px;
        }
        .team__credentials {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 56px;
        }
        .team__credential {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px;
          background: var(--teal-l);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
        }
        .team__credential div { display: flex; flex-direction: column; }
        .team__credential-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--navy);
        }
        .team__credential-sub {
          font-size: 0.72rem;
          color: var(--muted);
        }

        /* Featured doctor card */
        .doctor-feature {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 60px;
          align-items: center;
          background: var(--sky);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          padding: 0;
        }
        .doctor-feature__img-wrap {
          position: relative;
          height: 480px;
          background: linear-gradient(160deg, var(--teal-m) 0%, var(--teal-l) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .doctor-feature__img-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 60% 30%, rgba(10,155,140,0.25) 0%, transparent 60%),
            radial-gradient(ellipse at 30% 80%, rgba(10,155,140,0.15) 0%, transparent 50%);
        }
        .doctor-feature__initials {
          font-family: var(--font-serif);
          font-size: 7rem;
          color: rgba(10,155,140,0.25);
          letter-spacing: -0.04em;
          user-select: none;
          position: relative;
          z-index: 1;
        }
        .doctor-feature__badge {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 7px;
          background: white;
          border: 1px solid var(--border);
          border-radius: 99px;
          padding: 8px 18px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--teal);
          white-space: nowrap;
          box-shadow: var(--shadow-sm);
          z-index: 2;
        }
        .doctor-feature__badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          animation: drPulse 2s infinite;
        }
        @keyframes drPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.5; transform:scale(1.5); }
        }

        .doctor-feature__body {
          padding: 48px 48px 48px 0;
          display: flex;
          flex-direction: column;
        }
        .doctor-feature__name {
          font-family: var(--font-serif);
          font-size: 2.4rem;
          font-weight: 400;
          color: var(--navy);
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 8px;
        }
        .doctor-feature__role {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--teal);
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-bottom: 22px;
        }
        .doctor-feature__bio {
          font-size: 0.9rem;
          color: var(--muted);
          line-height: 1.78;
        }
        .doctor-feature__specialties {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 20px;
        }
        .doctor-feature__tag {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--teal);
          background: var(--teal-l);
          border: 1px solid var(--border-m);
          padding: 5px 12px;
          border-radius: 99px;
        }

        @media (max-width: 900px) {
          .doctor-feature {
            grid-template-columns: 1fr;
          }
          .doctor-feature__img-wrap { height: 280px; }
          .doctor-feature__body { padding: 32px; }
        }
      `}</style>
    </section>
  )
}
