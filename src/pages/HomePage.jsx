import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'

function WeightLossSpotlight() {
  const navigate = useNavigate()
  return (
    <section className="wls">
      <div className="container wls__inner">
        {/* Left — text */}
        <motion.div
          className="wls__text"
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="wls__eyebrow">
            <span className="wls__eyebrow-dot" />
            Now Available · GLP-1 & GLP-2 Therapy
          </span>
          <h2 className="wls__title">
            Medical weight loss —<br />
            <span className="wls__title-accent">delivered to your door.</span>
          </h2>
          <p className="wls__sub">
            Prescription-strength semaglutide prescribed by licensed Texas providers.
            No office visit. Lose up to <strong>15–20% body weight</strong> in 6 months.
          </p>
          <ul className="wls__bullets">
            {[
              'Weekly injection — simple self-administered pen',
              'Dramatically reduces appetite and cravings',
              'GLP-1 or GLP-2 — provider selects what\'s right for you',
              'Starting from $149.99/mo — no insurance needed',
            ].map(b => (
              <li key={b}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00B4D8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20,6 9,17 4,12"/>
                </svg>
                {b}
              </li>
            ))}
          </ul>
          <div className="wls__actions">
            <button className="wls__cta-primary" onClick={() => navigate('/weight-loss')}>
              See the Program
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
              </svg>
            </button>
            <button className="wls__cta-ghost" onClick={() => navigate('/consult/weightloss')}>
              Start Assessment
            </button>
          </div>
        </motion.div>

        {/* Right — pricing cards */}
        <motion.div
          className="wls__cards"
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {[
            { type: 'GLP-1', from: '$149.99', desc: 'Appetite suppression + metabolism', color: '#1E6FBF', months: 6 },
            { type: 'GLP-2', from: '$249.99', desc: 'GLP-1 benefits + gut health', color: '#00B4D8', months: 6, featured: true },
          ].map((card) => (
            <div
              key={card.type}
              className={`wls__card ${card.featured ? 'wls__card--featured' : ''}`}
              style={{ '--wc': card.color }}
            >
              {card.featured && <span className="wls__card-badge">Most Popular</span>}
              <span className="wls__card-type" style={{ color: card.color }}>{card.type}</span>
              <p className="wls__card-desc">{card.desc}</p>
              <div className="wls__card-price">
                <span className="wls__card-from">From</span>
                <span className="wls__card-amount" style={{ color: card.color }}>{card.from}</span>
                <span className="wls__card-mo">/mo</span>
              </div>
              <span className="wls__card-cycle">{card.months}-month program</span>
              <button
                className="wls__card-cta"
                style={{ background: card.color }}
                onClick={() => navigate('/weight-loss')}
              >
                Learn More
              </button>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .wls {
          background: linear-gradient(135deg, #0A2463 0%, #1a3a7a 100%);
          padding: 90px 0;
          overflow: hidden;
        }
        .wls__inner {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 64px;
          align-items: center;
        }
        .wls__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #00B4D8;
          margin-bottom: 20px;
        }
        .wls__eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #00B4D8;
          animation: wlsPulse 2s infinite;
        }
        @keyframes wlsPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:.4; transform:scale(1.6); }
        }
        .wls__title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 3.5vw, 2.9rem);
          font-weight: 400;
          color: white;
          line-height: 1.18;
          letter-spacing: -0.02em;
          margin: 0 0 18px;
        }
        .wls__title-accent {
          color: #00B4D8;
          font-style: italic;
        }
        .wls__sub {
          font-size: 1rem;
          color: rgba(255,255,255,0.68);
          line-height: 1.72;
          margin: 0 0 28px;
          max-width: 500px;
        }
        .wls__sub strong { color: white; font-weight: 600; }
        .wls__bullets {
          list-style: none;
          padding: 0; margin: 0 0 36px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .wls__bullets li {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 0.875rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.5;
        }
        .wls__bullets li svg { flex-shrink: 0; margin-top: 1px; }
        .wls__actions { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; }
        .wls__cta-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #00B4D8, #0096c7);
          color: white; border: none; border-radius: 100px;
          font-family: var(--font-sans); font-size: 0.9rem; font-weight: 700;
          padding: 13px 26px; cursor: pointer;
          box-shadow: 0 4px 20px rgba(0,180,216,0.35);
          transition: all 0.22s ease;
        }
        .wls__cta-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,180,216,0.45); }
        .wls__cta-ghost {
          font-family: var(--font-sans); font-size: 0.88rem; font-weight: 500;
          color: rgba(255,255,255,0.65); background: transparent;
          border: 1.5px solid rgba(255,255,255,0.2); border-radius: 100px;
          padding: 12px 22px; cursor: pointer; transition: all 0.2s;
        }
        .wls__cta-ghost:hover { color: white; border-color: rgba(255,255,255,0.5); }

        /* Cards */
        .wls__cards {
          display: flex; flex-direction: column; gap: 16px;
        }
        .wls__card {
          position: relative;
          background: rgba(255,255,255,0.07);
          border: 1.5px solid rgba(255,255,255,0.12);
          border-radius: 18px;
          padding: 24px 26px;
          backdrop-filter: blur(12px);
          transition: all 0.25s;
        }
        .wls__card:hover { background: rgba(255,255,255,0.11); transform: translateY(-2px); }
        .wls__card--featured {
          border-color: #00B4D8;
          background: rgba(0,180,216,0.1);
          box-shadow: 0 8px 32px rgba(0,180,216,0.2);
        }
        .wls__card-badge {
          position: absolute; top: -11px; right: 20px;
          background: #00B4D8; color: white;
          font-size: 0.68rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.06em;
          padding: 3px 12px; border-radius: 99px;
        }
        .wls__card-type {
          font-size: 1.1rem; font-weight: 800;
          letter-spacing: -0.01em; display: block; margin-bottom: 4px;
        }
        .wls__card-desc {
          font-size: 0.8rem; color: rgba(255,255,255,0.55);
          margin: 0 0 14px; line-height: 1.5;
        }
        .wls__card-price {
          display: flex; align-items: baseline; gap: 4px; margin-bottom: 4px;
        }
        .wls__card-from { font-size: 0.75rem; color: rgba(255,255,255,0.45); }
        .wls__card-amount { font-size: 1.8rem; font-weight: 800; letter-spacing: -0.03em; line-height: 1; }
        .wls__card-mo { font-size: 0.85rem; color: rgba(255,255,255,0.45); }
        .wls__card-cycle {
          font-size: 0.75rem; color: rgba(255,255,255,0.4);
          display: block; margin-bottom: 18px;
        }
        .wls__card-cta {
          width: 100%; padding: 10px;
          color: white; border: none; border-radius: 10px;
          font-family: var(--font-sans); font-size: 0.82rem; font-weight: 700;
          cursor: pointer; transition: opacity 0.2s;
        }
        .wls__card-cta:hover { opacity: 0.85; }

        @media (max-width: 960px) {
          .wls__inner { grid-template-columns: 1fr; gap: 48px; }
          .wls__cards { flex-direction: row; }
          .wls__card { flex: 1; }
        }
        @media (max-width: 600px) {
          .wls__cards { flex-direction: column; }
          .wls { padding: 60px 0; }
        }
      `}</style>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <WeightLossSpotlight />
      <HowItWorks />
      <Testimonials />
    </>
  )
}
