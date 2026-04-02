import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const reviews = [
  {
    name: 'Jessica T.',
    location: 'Arlington, TX',
    rating: 5,
    text: 'I needed treatment fast and didn\'t want to deal with a $200 urgent care visit. Great Doctors got me a prescription sent to my CVS in under 3 hours. Incredible.',
    condition: 'UTI Treatment',
    initials: 'JT',
  },
  {
    name: 'Marcus R.',
    location: 'Dallas, TX',
    rating: 5,
    text: 'Nervous about getting tested but the whole process was so discreet and judgment-free. The doctor was thorough, explained everything, and I had my prescription by evening.',
    condition: 'Sexual Health',
    initials: 'MR',
  },
  {
    name: 'Aisha K.',
    location: 'Fort Worth, TX',
    rating: 5,
    text: 'No insurance and was dreading the cost. $39.99 total for a real doctor consultation and treatment plan? I\'m never going to a walk-in clinic again.',
    condition: 'BV Treatment',
    initials: 'AK',
  },
  {
    name: 'David L.',
    location: 'Irving, TX',
    rating: 4,
    text: 'Fast, professional, and affordable. The doctor actually reviewed my symptoms carefully before prescribing. Felt genuinely cared for, not just processed.',
    condition: 'Prescription Refill',
    initials: 'DL',
  },
  {
    name: 'Samantha W.',
    location: 'Arlington, TX',
    rating: 5,
    text: 'I was anxious about discussing my condition but the questionnaire was private and easy. Had my treatment plan in two hours. 10/10 would recommend.',
    condition: 'Anxiety Treatment',
    initials: 'SW',
  },
  {
    name: 'Carlos M.',
    location: 'Dallas, TX',
    rating: 5,
    text: 'Used it for a dental infection on a Sunday night. My regular dentist couldn\'t see me. Got antibiotics prescribed within 90 minutes. Life-saver.',
    condition: 'Dental Infection',
    initials: 'CM',
  },
]

function Stars({ count }) {
  return (
    <div className="stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < count ? '#F59E0B' : 'none'} stroke="#F59E0B" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)

  return (
    <section className="testimonials" ref={ref}>
      <div className="container">
        <motion.div
          className="testimonials__header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Patient Reviews</span>
          <div className="testimonials__header-row">
            <h2 className="section-title">Real patients.<br />Real results.</h2>
            <div className="testimonials__rating">
              <Stars count={5} />
              <span className="testimonials__rating-num">4.2 / 5</span>
              <span className="testimonials__rating-total">from 984+ verified reviews</span>
            </div>
          </div>
        </motion.div>

        <div className="testimonials__grid">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              className="review-card"
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.09, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="review-card__top">
                <Stars count={review.rating} />
                <span className="review-card__condition">{review.condition}</span>
              </div>
              <p className="review-card__text">"{review.text}"</p>
              <div className="review-card__author">
                <div className="review-card__avatar">{review.initials}</div>
                <div>
                  <p className="review-card__name">{review.name}</p>
                  <p className="review-card__location">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="testimonials__trustpilot"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#00B67A">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span>Rated <strong>Excellent</strong> on Trustpilot · 984+ verified patient reviews</span>
        </motion.div>
      </div>

      <style>{`
        .testimonials {
          padding: 100px 0;
          background: var(--off-white);
        }
        .testimonials__header {
          margin-bottom: 52px;
        }
        .testimonials__header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .testimonials__rating {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .stars { display: flex; gap: 2px; }
        .testimonials__rating-num {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: var(--navy);
        }
        .testimonials__rating-total {
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .testimonials__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .review-card {
          background: white;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: var(--transition);
        }
        .review-card:hover {
          box-shadow: var(--shadow-sm);
          transform: translateY(-2px);
        }
        .review-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .review-card__condition {
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: var(--teal);
          background: rgba(0,180,216,0.08);
          padding: 3px 10px;
          border-radius: 100px;
        }
        .review-card__text {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.72;
          flex: 1;
        }
        .review-card__author {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-top: 14px;
          border-top: 1px solid var(--border);
        }
        .review-card__avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--surface);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--navy);
          flex-shrink: 0;
        }
        .review-card__name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .review-card__location {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .testimonials__trustpilot {
          margin-top: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .testimonials__trustpilot strong { color: var(--text-primary); }

        @media (max-width: 900px) {
          .testimonials__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .testimonials__grid { grid-template-columns: 1fr; }
          .testimonials__header-row { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  )
}
