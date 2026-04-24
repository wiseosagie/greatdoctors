import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const faqs = [
  {
    q: 'Do I need insurance to use Great Doctors USA?',
    a: 'No. Our flat-rate pricing means you pay only the visit fee shown — no insurance, no copays, no deductibles. What you see is what you pay.',
  },
  {
    q: 'How quickly will I receive my treatment plan?',
    a: 'During business hours, we guarantee a same-day response. Most patients receive their prescription within 2–4 hours of submitting their questionnaire.',
  },
  {
    q: 'Which pharmacies can you send prescriptions to?',
    a: 'We send electronic prescriptions to any pharmacy in the US — CVS, Walgreens, Walmart, Kroger, H-E-B, and thousands of independent pharmacies.',
  },
  {
    q: 'Is my health information kept private?',
    a: 'Absolutely. We are fully HIPAA-compliant and never share or sell your personal medical information. All communications are encrypted.',
  },
  {
    q: 'What if you can\'t treat my condition?',
    a: 'If our physicians determine they cannot safely treat your condition through telemedicine, there is no charge — period. We\'ll also direct you to the right local resource.',
  },
  {
    q: 'Are you available nights and weekends?',
    a: 'Yes. We serve patients in Arlington, Dallas, and across Texas evenings and weekends — exactly when traditional offices are closed.',
  },
]

function FaqItem({ q, a, i, inView }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      className={`faq-item ${open ? 'open' : ''}`}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + i * 0.07 }}
    >
      <button className="faq-item__q" onClick={() => setOpen(!open)}>
        {q}
        <span className="faq-item__icon">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <motion.p
          className="faq-item__a"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {a}
        </motion.p>
      )}
    </motion.div>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong.')
      }
      setSent(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container contact__layout">
        {/* Left: FAQ */}
        <div className="contact__faqs">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">FAQ</span>
            <h2 className="section-title" style={{ marginBottom: 32 }}>Common questions<br />answered</h2>
          </motion.div>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} i={i} inView={inView} />
            ))}
          </div>
        </div>

        {/* Right: Contact Form */}
        <motion.div
          className="contact__form-wrap"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="contact__info">
            <span className="section-label">Get In Touch</span>
            <h3 className="contact__form-title">Questions? We're here.</h3>
            <p className="contact__form-sub">Reach out to our team in Arlington & Dallas. Or call us directly.</p>

            <div className="contact__details">
              <a href="tel:8886137454" className="contact__detail">
                <div className="contact__detail-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6z"/>
                  </svg>
                </div>
                <div>
                  <p className="contact__detail-label">Phone</p>
                  <p className="contact__detail-value">(888) 613-7454</p>
                </div>
              </a>

              <div className="contact__detail">
                <div className="contact__detail-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className="contact__detail-label">Serving</p>
                  <p className="contact__detail-value">Arlington & Dallas, TX</p>
                </div>
              </div>

              <div className="contact__detail">
                <div className="contact__detail-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <p className="contact__detail-label">Hours</p>
                  <p className="contact__detail-value">Mon–Sun, including evenings</p>
                </div>
              </div>
            </div>
          </div>

          {sent ? (
            <motion.div
              className="contact__success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <h4>Message received!</h4>
              <p>We'll get back to you within a few hours.</p>
            </motion.div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="phone">Phone (optional)</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="(817) 000-0000"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="jane@email.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="message">How can we help?</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us about your question or concern..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>
              {error && (
                <p style={{ color: '#c0392b', fontSize: '0.85rem', textAlign: 'center', margin: 0 }}>{error}</p>
              )}
              <button type="submit" className="btn-primary" disabled={submitting} style={{ width: '100%', justifyContent: 'center', padding: '15px', opacity: submitting ? 0.7 : 1 }}>
                {submitting ? 'Sending…' : 'Send Message'}
              </button>
              <p className="contact__privacy">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                Your information is encrypted and never shared.
              </p>
            </form>
          )}
        </motion.div>
      </div>

      <style>{`
        .contact {
          padding: 100px 0;
          background: white;
        }
        .contact__layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: start;
        }
        .faq-list {
          display: flex;
          flex-direction: column;
        }
        .faq-item {
          border-bottom: 1px solid var(--border);
        }
        .faq-item__q {
          width: 100%;
          text-align: left;
          background: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 18px 0;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-primary);
          cursor: pointer;
          transition: color 0.2s;
        }
        .faq-item__q:hover { color: var(--navy); }
        .faq-item.open .faq-item__q { color: var(--navy); }
        .faq-item__icon {
          font-size: 1.2rem;
          font-weight: 300;
          color: var(--teal);
          flex-shrink: 0;
          line-height: 1;
        }
        .faq-item__a {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.7;
          padding-bottom: 18px;
        }

        .contact__form-wrap {
          background: var(--off-white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 36px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .contact__form-title {
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--navy);
          letter-spacing: -0.02em;
          margin: 8px 0;
        }
        .contact__form-sub {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
        .contact__details {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 16px;
        }
        .contact__detail {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }
        .contact__detail-icon {
          width: 40px;
          height: 40px;
          background: white;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--navy);
          flex-shrink: 0;
        }
        .contact__detail-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: var(--text-muted);
          font-weight: 500;
        }
        .contact__detail-value {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--navy);
        }
        a.contact__detail .contact__detail-value:hover { color: var(--teal); }

        .contact__form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-field label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .form-field input,
        .form-field textarea {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          padding: 12px 14px;
          background: white;
          border: 1.5px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          transition: border-color 0.2s;
          resize: none;
        }
        .form-field input:focus,
        .form-field textarea:focus {
          outline: none;
          border-color: var(--teal);
          box-shadow: 0 0 0 3px rgba(0,180,216,0.12);
        }
        .contact__privacy {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          color: var(--text-muted);
          justify-content: center;
        }
        .contact__success {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 40px 20px;
          text-align: center;
        }
        .contact__success h4 {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--navy);
        }
        .contact__success p {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        @media (max-width: 900px) {
          .contact__layout { grid-template-columns: 1fr; gap: 48px; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
