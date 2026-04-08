import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { SERVICE_TO_QUESTION_MAP } from '../data/questions'

const categories = [
  {
    id: 'sexual',
    label: 'Sexual Health',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    color: '#1E6FBF',
    services: [
      { name: 'Chlamydia Treatment', price: '$39.99' },
      { name: 'Gonorrhea Treatment', price: '$39.99' },
      { name: 'Syphilis Treatment', price: '$39.99' },
      { name: 'Genital Herpes Treatment', price: '$39.99' },
      { name: 'Bacterial Vaginosis (BV)', price: '$39.99' },
      { name: 'Trichomonas Treatment', price: '$39.99' },
      { name: 'Pelvic Inflammatory Disease', price: '$49.99' },
      { name: 'Epididymitis Treatment', price: '$49.99' },
      { name: 'Genital Warts Treatment', price: '$49.99' },
      { name: 'Common STD Combo Plan', price: '$59.99' },
    ],
  },
  {
    id: 'urgent',
    label: 'Urgent Care',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    color: '#00B4D8',
    services: [
      { name: 'UTI Treatment', price: '$29.99' },
      { name: 'Dental Infections', price: '$29.99' },
      { name: 'Ear Infections', price: '$29.99' },
      { name: 'Upper Respiratory Infections', price: '$29.99' },
      { name: 'Strep Throat', price: '$29.99' },
      { name: 'Asthma (stable patients)', price: '$39.99' },
      { name: 'Prescription Refills', price: '$29.99' },
    ],
  },
  {
    id: 'weightloss',
    label: 'Weight Loss',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/><path d="M18 2l4 4-4 4"/>
      </svg>
    ),
    color: '#0A9B8C',
    services: [
      { name: 'Weight Loss Medications', price: 'From $149.99/mo' },
    ],
  },
  {
    id: 'mens',
    label: "Men's Health",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    color: '#0A2463',
    services: [
      { name: 'Hair Loss Treatment', price: '$39.99' },
      { name: "General Men's Health", price: '$39.99' },
    ],
  },
  {
    id: 'mental',
    label: 'Mental Health',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12c0 1.66 1.34 3 3 3s3-1.34 3-3V6a3 3 0 0 0-6 0v6z"/><path d="M6 10.3a4 4 0 0 0 12 0"/>
        <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    color: '#1E6FBF',
    services: [
      { name: 'General Anxiety Treatment', price: '$49.99' },
    ],
  },
  {
    id: 'labs',
    label: 'Lab Tests',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5V2"/><path d="M8.5 2h7"/><path d="M14.5 16h-5"/>
      </svg>
    ),
    color: '#00B4D8',
    services: [
      { name: 'Affordable STD Panel', price: 'From $39' },
      { name: 'General Health Panel', price: 'From $29' },
      { name: 'Custom Lab Orders', price: 'Varies' },
    ],
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState('all')
  const navigate = useNavigate()

  const handleServiceClick = (serviceName) => {
    if (serviceName === 'Weight Loss Medications') {
      navigate('/weight-loss')
      return
    }
    const conditionId = SERVICE_TO_QUESTION_MAP[serviceName]
    if (conditionId) {
      navigate(`/consult/${conditionId}`)
    } else {
      navigate('/contact')
    }
  }

  const allServices = categories.flatMap(c => c.services.map(s => ({ ...s, color: c.color })))
  const current = active === 'all'
    ? { services: allServices, color: '#0A2463' }
    : categories.find(c => c.id === active)

  return (
    <section id="services" className="services" ref={ref}>
      <div className="container">
        <motion.div
          className="services__header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">What We Treat</span>
          <h2 className="section-title">Affordable care for the<br />conditions that matter most</h2>
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            Serving patients in Arlington, Dallas, and across Texas. No referrals, no insurance — just straight-forward flat-rate pricing.
          </p>
        </motion.div>

        <div className="services__tabs">
          <motion.button
            className={`services__tab ${active === 'all' ? 'active' : ''}`}
            onClick={() => setActive('all')}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{ '--tab-color': '#0A2463' }}
          >
            <span className="services__tab-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
              </svg>
            </span>
            All Services
          </motion.button>
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              className={`services__tab ${active === cat.id ? 'active' : ''}`}
              onClick={() => setActive(cat.id)}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.06 }}
              style={{ '--tab-color': cat.color }}
            >
              <span className="services__tab-icon">{cat.icon}</span>
              {cat.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="services__grid"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {current.services.map((svc, i) => (
              <motion.div
                key={svc.name}
                className="service-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => handleServiceClick(svc.name)}
                style={{ cursor: 'pointer' }}
              >
                <div className="service-card__dot" style={{ background: svc.color || current.color }} />
                <div className="service-card__info">
                  <span className="service-card__name">{svc.name}</span>
                  <span className="service-card__price">{svc.price}</span>
                </div>
                <button
                  className="service-card__cta"
                  onClick={() => handleServiceClick(svc.name)}
                >
                  Start Visit
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
                  </svg>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="services__note"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          Prices shown are the full visit fee — no hidden charges, no insurance billing. If we cannot safely treat your condition, you pay nothing.
        </motion.div>
      </div>

      <style>{`
        .services {
          padding: 100px 0;
          background: white;
        }
        .services__header {
          max-width: 660px;
          margin-bottom: 48px;
        }
        .services__tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .services__tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 500;
          background: var(--surface);
          color: var(--text-secondary);
          border: 1.5px solid transparent;
          transition: var(--transition);
          cursor: pointer;
        }
        .services__tab:hover {
          background: var(--off-white);
          color: var(--navy);
          border-color: var(--border);
        }
        .services__tab.active {
          background: white;
          color: var(--tab-color);
          border-color: var(--tab-color);
          box-shadow: 0 2px 12px rgba(10,36,99,0.08);
        }
        .services__tab-icon {
          color: currentColor;
          display: flex;
        }
        .services__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 12px;
        }
        .service-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: var(--off-white);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 16px 20px;
          transition: var(--transition);
          cursor: pointer;
        }
        .service-card:hover {
          background: white;
          border-color: var(--blue);
          box-shadow: var(--shadow-sm);
          transform: translateX(3px);
        }
        .service-card__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .service-card__info {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .service-card__name {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-primary);
        }
        .service-card__price {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--teal);
          white-space: nowrap;
        }
        .service-card__cta {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--blue);
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .service-card:hover .service-card__cta { opacity: 1; }
        .services__note {
          margin-top: 24px;
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.6;
        }
        .services__note svg { flex-shrink: 0; margin-top: 1px; }

        @media (max-width: 600px) {
          .services__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
