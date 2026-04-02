import { motion } from 'framer-motion'

const stats = [
  { value: '4.2★', label: '984+ patient reviews' },
  { value: '$29', label: 'Starting price' },
  { value: 'Same Day', label: 'Prescription turnaround' },
  { value: 'No Insurance', label: 'Required — ever' },
]

export default function Hero() {
  return (
    <section className="hero">
      {/* ── Video Background ── */}
      <div className="hero__video-wrap">
        <video
          className="hero__video"
          src="/exam_room.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Inward vignette: dark at all 4 edges, transparent at center */}
        <div className="hero__vignette" />
        {/* Dark overlay to ensure text legibility */}
        <div className="hero__overlay" />
        {/* Bottom fade into site background */}
        <div className="hero__bottom-fade" />
      </div>

      {/* ── Centered Content ── */}
      <div className="hero__body">
        <div className="container">
          <div className="hero__center">
            <motion.span
              className="hero__badge"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="hero__badge-dot" />
              Arlington & Dallas, TX · HIPAA Compliant
            </motion.span>

            <motion.h1
              className="hero__title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Care without
              <br />
              <em>barriers.</em>
            </motion.h1>

            <motion.p
              className="hero__sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
            >
              Board-certified doctors. No appointment. No insurance needed.<br />
              Get a personalized treatment plan sent to your pharmacy — today.
            </motion.p>

            <motion.div
              className="hero__price-tag"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.7 }}
            >
              Visits starting at <strong>$29.99</strong> · No copay · No surprise bills
            </motion.div>

            <motion.div
              className="hero__ctas"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.7 }}
            >
              <a href="/services" className="btn-primary hero__cta-main">
                Start a Visit
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
                </svg>
              </a>
              <a href="/how-it-works" className="btn-outline hero__cta-sec">
                See How It Works
              </a>
            </motion.div>

            <motion.p
              className="hero__trust"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              If we can't help, you pay nothing · 100% satisfaction guarantee
            </motion.p>
          </div>
        </div>

        {/* Stats bar */}
        <div className="container">
          <motion.div
            className="hero__stats"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="hero__stat"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.07 }}
              >
                <span className="hero__stat-val">{s.value}</span>
                <span className="hero__stat-lbl">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* ── Video ── */
        .hero__video-wrap {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero__video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Inward vignette — dark on all edges, clear in the middle */
        .hero__vignette {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 70% at 50% 50%,
              transparent 0%,
              rgba(13,33,54,0.55) 55%,
              rgba(13,33,54,0.88) 80%,
              rgba(13,33,54,0.97) 100%
            );
        }

        /* Extra dark layer for text readability */
        .hero__overlay {
          position: absolute;
          inset: 0;
          background: rgba(13,33,54,0.38);
        }

        /* Smooth blend into page background at the very bottom */
        .hero__bottom-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 220px;
          background: linear-gradient(to bottom, transparent 0%, var(--white) 100%);
        }

        /* ── Content ── */
        .hero__body {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 100vh;
          padding: 100px 0 80px;
          gap: 0;
        }

        .hero__center {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 720px;
          margin: 0 auto;
          padding-bottom: 60px;
        }

        .hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(10,155,140,0.18);
          border: 1px solid rgba(10,155,140,0.45);
          color: #5DECD8;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 7px 16px;
          border-radius: 100px;
          margin-bottom: 28px;
        }
        .hero__badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #5DECD8;
          animation: heroPulse 2s infinite;
        }
        @keyframes heroPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.5; transform:scale(1.5); }
        }

        .hero__title {
          font-family: var(--font-serif);
          font-size: clamp(3.2rem, 7vw, 5.5rem);
          font-weight: 400;
          color: #fff;
          line-height: 1.04;
          letter-spacing: -0.03em;
          margin-bottom: 22px;
        }
        .hero__title em {
          font-style: italic;
          color: #5DECD8;
        }

        .hero__sub {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.72);
          line-height: 1.78;
          margin-bottom: 28px;
        }

        .hero__price-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, var(--navy), var(--navy-m));
          color: rgba(255,255,255,0.82);
          font-size: 0.88rem;
          font-weight: 400;
          padding: 10px 22px;
          border-radius: 99px;
          margin-bottom: 30px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .hero__price-tag strong {
          color: #5DECD8;
          font-size: 1rem;
          font-weight: 600;
        }

        .hero__ctas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 22px;
        }
        .hero__cta-main {
          font-size: 0.95rem;
          padding: 13px 30px;
        }
        .hero__cta-sec {
          border-color: rgba(255,255,255,0.30);
          color: rgba(255,255,255,0.88);
        }
        .hero__cta-sec:hover {
          background: rgba(255,255,255,0.10);
          border-color: rgba(255,255,255,0.60);
          color: #fff;
        }

        .hero__trust {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.45);
        }
        .hero__trust svg { color: #5DECD8; }

        /* Stats */
        .hero__stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--radius-lg);
          overflow: hidden;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          margin-top: 0;
        }
        .hero__stat {
          padding: 22px 28px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          border-right: 1px solid rgba(255,255,255,0.08);
          transition: background 0.2s;
        }
        .hero__stat:last-child { border-right: none; }
        .hero__stat:hover { background: rgba(255,255,255,0.08); }
        .hero__stat-val {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .hero__stat-lbl {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.48);
          line-height: 1.4;
          margin-top: 4px;
        }

        @media (max-width: 768px) {
          .hero__stats { grid-template-columns: repeat(2, 1fr); }
          .hero__stat:nth-child(2) { border-right: none; }
          .hero__stat:nth-child(3), .hero__stat:nth-child(4) {
            border-top: 1px solid rgba(255,255,255,0.08);
          }
        }
        @media (max-width: 480px) {
          .hero__title { font-size: 2.8rem; }
          .hero__stats { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </section>
  )
}
