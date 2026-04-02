import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const plans = [
  {
    name: 'Common Conditions',
    price: '$29.99',
    desc: 'Most common infections and refills — fast, affordable treatment.',
    badge: null,
    color: 'var(--blue)',
    items: [
      'UTI Treatment',
      'Ear Infections',
      'Dental Infections',
      'Strep / Upper Respiratory',
      'Prescription Refills',
      'General Consultations',
    ],
  },
  {
    name: 'Sexual Health',
    price: '$39.99',
    desc: 'Discreet, private STI treatment with same-day pharmacy send.',
    badge: 'Most Popular',
    color: 'var(--teal)',
    items: [
      'Chlamydia Treatment',
      'Gonorrhea Treatment',
      'Syphilis Treatment',
      'Herpes Treatment',
      'Bacterial Vaginosis',
      'Trichomonas',
    ],
  },
  {
    name: 'Complex Care',
    price: '$49.99',
    desc: 'Advanced treatments requiring more thorough evaluation.',
    badge: null,
    color: 'var(--navy)',
    items: [
      'Epididymitis',
      'Genital Warts',
      'Pelvic Inflammatory Disease',
      'Mycoplasma / Ureaplasma',
      'Urethritis',
      'Anxiety Treatment',
    ],
  },
  {
    name: 'Combo STD Plan',
    price: '$59.99',
    desc: 'Comprehensive multi-STI treatment bundle — maximum coverage.',
    badge: 'Best Value',
    color: 'var(--blue)',
    items: [
      'Multi-STI Coverage',
      'Includes Chlamydia + Gonorrhea',
      'Extended Treatment Protocol',
      'Full Pharmacy Send',
      'Follow-up Consultation',
      'Priority Review',
    ],
  },
]

const guarantees = [
  { label: 'No Insurance Required', icon: '🚫' },
  { label: '100% Satisfaction Guarantee', icon: '✓' },
  { label: 'Pay Nothing If We Can\'t Help', icon: '$' },
  { label: 'HIPAA Compliant & Private', icon: '🔒' },
]

export default function Pricing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="pricing" className="pricing" ref={ref}>
      <div className="container">
        <motion.div
          className="pricing__header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Transparent Pricing</span>
          <h2 className="section-title">Flat rates. No surprises.<br />No insurance needed.</h2>
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            Every price you see is the complete visit cost. No copays, no deductibles, no hidden fees.
          </p>
        </motion.div>

        <div className="pricing__grid">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`pricing-card ${plan.badge === 'Most Popular' ? 'pricing-card--featured' : ''}`}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {plan.badge && (
                <div className="pricing-card__badge" style={{ background: plan.color }}>
                  {plan.badge}
                </div>
              )}
              <div className="pricing-card__top" style={{ '--plan-color': plan.color }}>
                <h3 className="pricing-card__name">{plan.name}</h3>
                <div className="pricing-card__price">
                  <span className="pricing-card__amount">{plan.price}</span>
                  <span className="pricing-card__per">/ visit</span>
                </div>
                <p className="pricing-card__desc">{plan.desc}</p>
              </div>

              <ul className="pricing-card__list">
                {plan.items.map((item) => (
                  <li key={item} className="pricing-card__item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: plan.color }}>
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <a href="#services" className={`pricing-card__btn ${plan.badge === 'Most Popular' ? 'btn-primary' : 'btn-outline'}`}>
                Start Visit
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="pricing__guarantees"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          {guarantees.map((g) => (
            <div key={g.label} className="pricing__guarantee">
              <span className="pricing__guarantee-icon">{g.icon}</span>
              <span>{g.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .pricing {
          padding: 100px 0;
          background: var(--off-white);
          position: relative;
          overflow: hidden;
        }
        .pricing::after {
          content: '';
          position: absolute;
          bottom: -300px;
          left: -300px;
          width: 700px;
          height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(10,36,99,0.04) 0%, transparent 70%);
          pointer-events: none;
        }
        .pricing__header {
          max-width: 600px;
          margin-bottom: 56px;
        }
        .pricing__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          align-items: start;
        }
        .pricing-card {
          background: white;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px;
          position: relative;
          transition: box-shadow 0.3s;
        }
        .pricing-card:hover { box-shadow: var(--shadow-md); }
        .pricing-card--featured {
          border-color: var(--teal);
          box-shadow: 0 0 0 2px rgba(0,180,216,0.15), var(--shadow-md);
        }
        .pricing-card__badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: white;
          padding: 4px 14px;
          border-radius: 100px;
          white-space: nowrap;
        }
        .pricing-card__top {
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border);
        }
        .pricing-card__name {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 10px;
        }
        .pricing-card__price {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 10px;
        }
        .pricing-card__amount {
          font-family: var(--font-serif);
          font-size: 2.4rem;
          font-weight: 400;
          color: var(--plan-color, var(--navy));
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .pricing-card__per {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .pricing-card__desc {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .pricing-card__list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 24px;
        }
        .pricing-card__item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .pricing-card__btn {
          display: block;
          text-align: center;
          padding: 12px;
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
          font-weight: 600;
          transition: var(--transition);
        }

        .pricing__guarantees {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 40px;
          padding: 20px 24px;
          background: white;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          justify-content: center;
        }
        .pricing__guarantee {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-secondary);
          padding: 6px 14px;
          background: var(--off-white);
          border-radius: 100px;
        }
        .pricing__guarantee-icon {
          font-size: 0.9rem;
        }

        @media (max-width: 1100px) {
          .pricing__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .pricing__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
