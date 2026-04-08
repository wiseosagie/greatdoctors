import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

const GLP1_TIERS = [
  { month: 1, label: 'Month 1', dose: 'Starting dose', price: '$149.99' },
  { month: 2, label: 'Month 2', dose: 'Titration phase', price: '$199.99' },
  { month: 3, label: 'Month 3', dose: 'Titration phase', price: '$249.99' },
  { month: 4, label: 'Month 4', dose: 'Maintenance dose', price: '$299.99' },
  { month: 5, label: 'Month 5', dose: 'Maintenance dose', price: '$349.99' },
  { month: 6, label: 'Month 6', dose: 'Full therapeutic dose', price: '$399.99' },
]

const GLP2_TIERS = [
  { month: 1, label: 'Month 1', dose: 'Starting dose', price: '$249.99' },
  { month: 2, label: 'Month 2', dose: 'Titration phase', price: '$299.99' },
  { month: 3, label: 'Month 3', dose: 'Titration phase', price: '$349.99' },
  { month: 4, label: 'Month 4', dose: 'Maintenance dose', price: '$399.99' },
  { month: 5, label: 'Month 5', dose: 'Maintenance dose', price: '$449.99' },
  { month: 6, label: 'Month 6', dose: 'Full therapeutic dose', price: '$499.99' },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Complete Your Intake',
    desc: 'Answer our secure medical questionnaire about your health history, goals, and current medications.',
  },
  {
    step: '02',
    title: 'Provider Review',
    desc: 'A licensed Texas provider reviews your intake within hours and determines which GLP medication is right for you.',
  },
  {
    step: '03',
    title: 'Prescription Sent',
    desc: 'If approved, your prescription is sent to a compounding pharmacy. Medication ships directly to your door.',
  },
  {
    step: '04',
    title: 'Ongoing Support',
    desc: 'Monthly check-ins, dose adjustments, and provider messaging — all included at no extra cost.',
  },
]

const FAQS = [
  {
    q: 'Am I a good candidate for GLP-1 or GLP-2 therapy?',
    a: 'Most adults with a BMI ≥ 27 with a weight-related condition, or BMI ≥ 30, qualify. Our provider will evaluate your full health history during the intake process.',
  },
  {
    q: 'What is the difference between GLP-1 and GLP-2?',
    a: 'GLP-1 agonists (like semaglutide) reduce appetite and slow gastric emptying. GLP-2 additionally targets gut health and nutrient absorption, making it ideal for patients with digestive concerns alongside weight loss goals.',
  },
  {
    q: 'How long until I see results?',
    a: 'Most patients notice appetite suppression within the first 2–4 weeks. Meaningful weight loss typically becomes visible by months 2–3 as doses increase.',
  },
  {
    q: 'Are there side effects?',
    a: 'Common side effects include mild nausea, constipation, or fatigue — especially early in treatment. These typically improve as your body adjusts. Your provider will guide you through each dose increase.',
  },
  {
    q: 'Is this the same as Ozempic or Wegovy?',
    a: 'Our compounded medications use the same active ingredient (semaglutide) as brand-name GLP-1 drugs but are prepared by licensed U.S. compounding pharmacies, making them significantly more affordable.',
  },
  {
    q: 'What if I have a history of thyroid cancer or pancreatitis?',
    a: 'Patients with a personal or family history of medullary thyroid carcinoma, MEN2 syndrome, pancreatitis, or active organ disease are not candidates for GLP therapy. Our intake will screen for these contraindications automatically.',
  },
]

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function PricingCard({ type, tiers, color, accentBg, featured }) {
  const navigate = useNavigate()
  return (
    <div className={`wl-pricing-card ${featured ? 'wl-pricing-card--featured' : ''}`} style={{ '--card-color': color }}>
      {featured && <div className="wl-pricing-badge">Most Popular</div>}
      <div className="wl-pricing-card__header" style={{ background: accentBg }}>
        <span className="wl-pricing-card__label">{type}</span>
        <div className="wl-pricing-card__from">
          <span className="wl-pricing-card__from-label">Starting from</span>
          <span className="wl-pricing-card__from-price">{tiers[0].price}<span>/mo</span></span>
        </div>
      </div>
      <div className="wl-pricing-card__tiers">
        {tiers.map((tier) => (
          <div key={tier.month} className="wl-pricing-tier">
            <div className="wl-pricing-tier__left">
              <span className="wl-pricing-tier__month">{tier.label}</span>
              <span className="wl-pricing-tier__dose">{tier.dose}</span>
            </div>
            <span className="wl-pricing-tier__price" style={{ color }}>{tier.price}</span>
          </div>
        ))}
      </div>
      <button
        className="wl-pricing-card__cta"
        style={{ background: color }}
        onClick={() => navigate('/consult/weightloss')}
      >
        Start {type} Program
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
        </svg>
      </button>
    </div>
  )
}

export default function WeightLossPage() {
  const navigate = useNavigate()

  return (
    <div className="wl-page">

      {/* ── Hero ── */}
      <section className="wl-hero">
        <div className="wl-hero__bg" aria-hidden="true" />
        <div className="container wl-hero__inner">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ color: '#00B4D8' }}
          >
            Medical Weight Loss
          </motion.span>
          <motion.h1
            className="wl-hero__title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.75 }}
          >
            Lose weight with<br />
            <span className="wl-hero__title--accent">clinically proven GLP therapy</span>
          </motion.h1>
          <motion.p
            className="wl-hero__subtitle"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.65 }}
          >
            Prescription-strength GLP-1 and GLP-2 medications prescribed by licensed Texas providers.
            No office visits. No insurance needed. Medication delivered to your door.
          </motion.p>
          <motion.div
            className="wl-hero__actions"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <button className="wl-btn wl-btn--primary" onClick={() => navigate('/consult/weightloss')}>
              Start My Assessment — Free
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
              </svg>
            </button>
            <a href="#pricing" className="wl-btn wl-btn--ghost">View Pricing</a>
          </motion.div>
          <motion.div
            className="wl-hero__badges"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            {['Licensed Texas Providers', 'Ships to Your Door', 'No Insurance Required', 'Same-Day Review'].map(b => (
              <span key={b} className="wl-badge">{b}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <FadeIn>
        <div className="wl-stats">
          <div className="container wl-stats__inner">
            {[
              { value: '15–20%', label: 'Avg. body weight lost' },
              { value: '6 mo', label: 'Full treatment cycle' },
              { value: '24 hr', label: 'Provider review time' },
              { value: '$0', label: 'Office visit fee' },
            ].map(s => (
              <div key={s.label} className="wl-stat">
                <span className="wl-stat__value">{s.value}</span>
                <span className="wl-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* ── GLP-1 vs GLP-2 ── */}
      <section className="wl-compare">
        <div className="container">
          <FadeIn>
            <span className="section-label">Understanding Your Options</span>
            <h2 className="section-title" style={{ marginTop: 8 }}>GLP-1 vs GLP-2 — What's the difference?</h2>
            <p className="section-subtitle" style={{ marginTop: 12, maxWidth: 620 }}>
              Both medications are weekly injections that dramatically reduce appetite and promote fat loss —
              but they work through complementary mechanisms.
            </p>
          </FadeIn>

          <div className="wl-compare__grid">
            {[
              {
                type: 'GLP-1',
                tagline: 'Appetite + Metabolism',
                color: '#1E6FBF',
                bg: 'rgba(30,111,191,0.05)',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/>
                  </svg>
                ),
                points: [
                  'Reduces hunger hormones significantly',
                  'Slows gastric emptying — you stay fuller longer',
                  'Improves blood sugar regulation',
                  'Clinically proven 15–20% body weight reduction',
                  'Best for: general weight loss, prediabetes, insulin resistance',
                ],
              },
              {
                type: 'GLP-2',
                tagline: 'Appetite + Gut Health',
                color: '#00B4D8',
                bg: 'rgba(0,180,216,0.05)',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                ),
                points: [
                  'All benefits of GLP-1, plus gut-targeted action',
                  'Improves intestinal barrier and nutrient absorption',
                  'Reduces inflammation in the digestive tract',
                  'Ideal for patients with IBS, reflux, or leaky gut',
                  'Best for: weight loss with digestive health concerns',
                ],
              },
            ].map((item, i) => (
              <FadeIn key={item.type} delay={i * 0.12}>
                <div className="wl-compare-card" style={{ '--cc': item.color, background: item.bg, borderColor: `${item.color}22` }}>
                  <div className="wl-compare-card__head">
                    <span className="wl-compare-card__icon" style={{ color: item.color }}>{item.icon}</span>
                    <div>
                      <h3 className="wl-compare-card__type" style={{ color: item.color }}>{item.type}</h3>
                      <span className="wl-compare-card__tagline">{item.tagline}</span>
                    </div>
                  </div>
                  <ul className="wl-compare-card__list">
                    {item.points.map(p => (
                      <li key={p}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20,6 9,17 4,12"/>
                        </svg>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="wl-how">
        <div className="container">
          <FadeIn>
            <span className="section-label">The Process</span>
            <h2 className="section-title" style={{ marginTop: 8 }}>How it works</h2>
          </FadeIn>
          <div className="wl-how__steps">
            {HOW_IT_WORKS.map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.1}>
                <div className="wl-how-step">
                  <span className="wl-how-step__num">{item.step}</span>
                  <h3 className="wl-how-step__title">{item.title}</h3>
                  <p className="wl-how-step__desc">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="wl-pricing" id="pricing">
        <div className="container">
          <FadeIn>
            <span className="section-label">Transparent Pricing</span>
            <h2 className="section-title" style={{ marginTop: 8 }}>Simple monthly pricing</h2>
            <p className="section-subtitle" style={{ marginTop: 12, maxWidth: 580 }}>
              Doses increase gradually over 6 months to maximize results and minimize side effects.
              No hidden fees — price includes provider review, prescription, and check-ins.
            </p>
          </FadeIn>
          <div className="wl-pricing__grid">
            <FadeIn delay={0.05}>
              <PricingCard
                type="GLP-1"
                tiers={GLP1_TIERS}
                color="#1E6FBF"
                accentBg="linear-gradient(135deg, #0A2463 0%, #1E6FBF 100%)"
              />
            </FadeIn>
            <FadeIn delay={0.15}>
              <PricingCard
                type="GLP-2"
                tiers={GLP2_TIERS}
                color="#00B4D8"
                accentBg="linear-gradient(135deg, #0A2463 0%, #00B4D8 100%)"
                featured
              />
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <p className="wl-pricing__note">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Medication cost is separate and fulfilled by a licensed U.S. compounding pharmacy. Prices subject to change based on current pharmacy rates.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Safety / Who Qualifies ── */}
      <section className="wl-safety">
        <div className="container wl-safety__inner">
          <FadeIn className="wl-safety__text">
            <span className="section-label">Safety First</span>
            <h2 className="section-title" style={{ marginTop: 8 }}>Who qualifies?</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginTop: 16 }}>
              GLP therapy is appropriate for adults who meet one or more of the following:
            </p>
            <ul className="wl-safety__list">
              {[
                'BMI ≥ 30 (obesity)',
                'BMI ≥ 27 with a weight-related condition (type 2 diabetes, hypertension, high cholesterol)',
                'Prior unsuccessful weight loss attempts with diet and exercise alone',
                'No contraindicated medical history (see below)',
              ].map(item => (
                <li key={item}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00B4D8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20,6 9,17 4,12"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <div className="wl-safety__contraindications">
              <h4>Not eligible if you have:</h4>
              <ul>
                {[
                  'Personal or family history of medullary thyroid carcinoma (MTC)',
                  'Multiple Endocrine Neoplasia syndrome type 2 (MEN2)',
                  'History of pancreatitis',
                  'Active serious organ disease (kidney, liver, heart failure)',
                  'Current pregnancy or breastfeeding',
                ].map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.15} className="wl-safety__cta-box">
            <div className="wl-cta-box">
              <h3>Ready to get started?</h3>
              <p>Complete your free intake. A provider will review it within 24 hours.</p>
              <button className="wl-btn wl-btn--primary" onClick={() => navigate('/consult/weightloss')}>
                Begin My Assessment
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
                </svg>
              </button>
              <div className="wl-cta-box__features">
                {['No office visit', 'Same-day review', 'Cancel anytime'].map(f => (
                  <span key={f}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00B4D8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="wl-faq">
        <div className="container">
          <FadeIn>
            <span className="section-label">Common Questions</span>
            <h2 className="section-title" style={{ marginTop: 8 }}>Frequently asked questions</h2>
          </FadeIn>
          <div className="wl-faq__grid">
            {FAQS.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="wl-faq-item">
                  <h4 className="wl-faq-item__q">{faq.q}</h4>
                  <p className="wl-faq-item__a">{faq.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <FadeIn>
        <section className="wl-bottom-cta">
          <div className="container wl-bottom-cta__inner">
            <h2>Start your transformation today.</h2>
            <p>Licensed Texas providers. Medication to your door. No insurance required.</p>
            <button className="wl-btn wl-btn--primary wl-btn--lg" onClick={() => navigate('/consult/weightloss')}>
              Get My Prescription — From $149.99/mo
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
              </svg>
            </button>
          </div>
        </section>
      </FadeIn>

      <style>{`
        /* ── Page base ── */
        .wl-page { background: var(--white); }

        /* ── Hero ── */
        .wl-hero {
          position: relative;
          padding: 130px 0 90px;
          overflow: hidden;
        }
        .wl-hero__bg {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #0A2463 0%, #1a3a7a 55%, #0d3060 100%);
        }
        .wl-hero__inner {
          position: relative; z-index: 1;
          max-width: 780px;
        }
        .wl-hero__title {
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          font-weight: 800;
          color: white;
          line-height: 1.15;
          margin: 12px 0 20px;
          letter-spacing: -0.02em;
        }
        .wl-hero__title--accent {
          background: linear-gradient(90deg, #00B4D8, #48e4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .wl-hero__subtitle {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.78);
          line-height: 1.7;
          max-width: 580px;
          margin-bottom: 36px;
        }
        .wl-hero__actions {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }
        .wl-hero__badges {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .wl-badge {
          font-size: 0.78rem;
          font-weight: 500;
          color: rgba(255,255,255,0.7);
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 100px;
          padding: 5px 14px;
        }

        /* ── Buttons ── */
        .wl-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.22s ease;
          white-space: nowrap;
          text-decoration: none;
          font-size: 0.92rem;
          padding: 13px 26px;
        }
        .wl-btn--primary {
          background: linear-gradient(135deg, #00B4D8, #0096c7);
          color: white;
          border: none;
          box-shadow: 0 4px 20px rgba(0,180,216,0.35);
        }
        .wl-btn--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(0,180,216,0.45);
        }
        .wl-btn--ghost {
          background: transparent;
          color: rgba(255,255,255,0.8);
          border: 1.5px solid rgba(255,255,255,0.25);
        }
        .wl-btn--ghost:hover {
          background: rgba(255,255,255,0.08);
          color: white;
          border-color: rgba(255,255,255,0.45);
        }
        .wl-btn--lg { font-size: 1rem; padding: 16px 32px; }

        /* ── Stats ── */
        .wl-stats {
          background: var(--navy);
          padding: 0;
        }
        .wl-stats__inner {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .wl-stat {
          padding: 32px 24px;
          text-align: center;
          border-right: 1px solid rgba(255,255,255,0.08);
        }
        .wl-stat:last-child { border-right: none; }
        .wl-stat__value {
          display: block;
          font-size: 2rem;
          font-weight: 800;
          color: #00B4D8;
          letter-spacing: -0.02em;
        }
        .wl-stat__label {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.55);
          margin-top: 4px;
          display: block;
        }

        /* ── Compare ── */
        .wl-compare { padding: 90px 0; background: var(--off-white); }
        .wl-compare__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-top: 48px;
        }
        .wl-compare-card {
          border-radius: 18px;
          border: 1.5px solid;
          padding: 36px 32px;
        }
        .wl-compare-card__head {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 28px;
        }
        .wl-compare-card__icon { display: flex; }
        .wl-compare-card__type {
          font-size: 1.4rem;
          font-weight: 800;
          line-height: 1;
          margin: 0 0 4px;
        }
        .wl-compare-card__tagline {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .wl-compare-card__list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .wl-compare-card__list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }
        .wl-compare-card__list li svg { flex-shrink: 0; margin-top: 2px; }

        /* ── How it works ── */
        .wl-how { padding: 90px 0; background: white; }
        .wl-how__steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-top: 52px;
        }
        .wl-how-step {
          position: relative;
          padding: 28px 24px;
          background: var(--off-white);
          border: 1px solid var(--border);
          border-radius: 16px;
        }
        .wl-how-step__num {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--border);
          letter-spacing: -0.04em;
          line-height: 1;
          display: block;
          margin-bottom: 16px;
        }
        .wl-how-step__title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--navy);
          margin: 0 0 10px;
        }
        .wl-how-step__desc {
          font-size: 0.855rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0;
        }

        /* ── Pricing ── */
        .wl-pricing { padding: 90px 0; background: var(--off-white); }
        .wl-pricing__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          margin-top: 52px;
          align-items: start;
        }
        .wl-pricing-card {
          background: white;
          border-radius: 20px;
          border: 1.5px solid var(--border);
          overflow: hidden;
          position: relative;
          transition: box-shadow 0.25s;
        }
        .wl-pricing-card:hover {
          box-shadow: 0 12px 40px rgba(10,36,99,0.12);
        }
        .wl-pricing-card--featured {
          border-color: var(--card-color);
          box-shadow: 0 8px 30px rgba(0,180,216,0.15);
        }
        .wl-pricing-badge {
          position: absolute;
          top: 16px; right: 16px;
          background: white;
          color: #00B4D8;
          font-size: 0.72rem;
          font-weight: 700;
          border-radius: 100px;
          padding: 4px 12px;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }
        .wl-pricing-card__header {
          padding: 28px 28px 24px;
          color: white;
        }
        .wl-pricing-card__label {
          font-size: 1.1rem;
          font-weight: 800;
          display: block;
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }
        .wl-pricing-card__from { display: flex; flex-direction: column; }
        .wl-pricing-card__from-label {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.65);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .wl-pricing-card__from-price {
          font-size: 2rem;
          font-weight: 800;
          line-height: 1.1;
        }
        .wl-pricing-card__from-price span {
          font-size: 1rem;
          font-weight: 500;
          color: rgba(255,255,255,0.7);
        }
        .wl-pricing-card__tiers { padding: 8px 28px 4px; }
        .wl-pricing-tier {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
          border-bottom: 1px solid var(--border);
        }
        .wl-pricing-tier:last-child { border-bottom: none; }
        .wl-pricing-tier__left { display: flex; flex-direction: column; gap: 2px; }
        .wl-pricing-tier__month { font-size: 0.875rem; font-weight: 600; color: var(--text-primary); }
        .wl-pricing-tier__dose { font-size: 0.775rem; color: var(--text-muted); }
        .wl-pricing-tier__price { font-size: 0.95rem; font-weight: 700; }
        .wl-pricing-card__cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: calc(100% - 56px);
          margin: 20px 28px 24px;
          padding: 14px;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.22s ease;
        }
        .wl-pricing-card__cta:hover { opacity: 0.9; transform: translateY(-1px); }
        .wl-pricing__note {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-top: 24px;
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.6;
        }
        .wl-pricing__note svg { flex-shrink: 0; margin-top: 1px; }

        /* ── Safety ── */
        .wl-safety { padding: 90px 0; background: white; }
        .wl-safety__inner {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 60px;
          align-items: start;
        }
        .wl-safety__list {
          list-style: none;
          padding: 0;
          margin: 20px 0 28px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .wl-safety__list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }
        .wl-safety__list li svg { flex-shrink: 0; margin-top: 2px; }
        .wl-safety__contraindications {
          background: #fff8f8;
          border: 1px solid #ffd5d5;
          border-radius: 12px;
          padding: 20px 24px;
        }
        .wl-safety__contraindications h4 {
          font-size: 0.82rem;
          font-weight: 700;
          color: #c0392b;
          margin: 0 0 12px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .wl-safety__contraindications ul {
          padding: 0 0 0 16px;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .wl-safety__contraindications li {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .wl-cta-box {
          background: linear-gradient(135deg, #0A2463 0%, #1E6FBF 100%);
          border-radius: 20px;
          padding: 40px 36px;
          color: white;
          position: sticky;
          top: 100px;
        }
        .wl-cta-box h3 {
          font-size: 1.4rem;
          font-weight: 800;
          margin: 0 0 10px;
          color: white;
        }
        .wl-cta-box p {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.72);
          line-height: 1.6;
          margin: 0 0 28px;
        }
        .wl-cta-box .wl-btn--primary { width: 100%; justify-content: center; }
        .wl-cta-box__features {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 20px;
        }
        .wl-cta-box__features span {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: rgba(255,255,255,0.65);
        }

        /* ── FAQ ── */
        .wl-faq { padding: 90px 0; background: var(--off-white); }
        .wl-faq__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 52px;
        }
        .wl-faq-item {
          background: white;
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 28px 28px;
        }
        .wl-faq-item__q {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--navy);
          margin: 0 0 12px;
          line-height: 1.4;
        }
        .wl-faq-item__a {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0;
        }

        /* ── Bottom CTA ── */
        .wl-bottom-cta {
          padding: 90px 0;
          background: linear-gradient(135deg, #0A2463 0%, #1a3a7a 100%);
          text-align: center;
        }
        .wl-bottom-cta__inner { max-width: 620px; margin: 0 auto; }
        .wl-bottom-cta h2 {
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 800;
          color: white;
          margin: 0 0 16px;
          letter-spacing: -0.02em;
        }
        .wl-bottom-cta p {
          font-size: 1rem;
          color: rgba(255,255,255,0.68);
          margin: 0 0 36px;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .wl-stats__inner { grid-template-columns: repeat(2, 1fr); }
          .wl-stat { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
          .wl-compare__grid { grid-template-columns: 1fr; }
          .wl-how__steps { grid-template-columns: 1fr 1fr; }
          .wl-pricing__grid { grid-template-columns: 1fr; }
          .wl-safety__inner { grid-template-columns: 1fr; }
          .wl-safety__cta-box { order: -1; }
          .wl-faq__grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .wl-hero { padding: 100px 0 60px; }
          .wl-how__steps { grid-template-columns: 1fr; }
          .wl-stats__inner { grid-template-columns: repeat(2, 1fr); }
          .wl-hero__actions { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </div>
  )
}
