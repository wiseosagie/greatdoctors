import { Link } from 'react-router-dom'

export default function RefundPolicyPage() {
  return (
    <div className="legal-page">
      <div className="legal-page__hero">
        <div className="container">
          <span className="section-label">Legal</span>
          <h1 className="legal-page__title">Refund Policy</h1>
          <p className="legal-page__meta">Last Updated: April 29, 2026</p>
        </div>
      </div>

      <div className="container legal-page__body">
        <p className="legal-page__intro">
          At <strong>Great Doctors USA LLC</strong>, we are committed to providing high-quality healthcare services. We understand that circumstances change, and we want to ensure our refund process is clear and fair.
        </p>

        <section className="legal-section">
          <h2>1. Telehealth Consultations</h2>
          <ul>
            <li><strong>Completed Visits:</strong> Once a consultation with a healthcare provider has been completed (via video, phone, or chat), the service is considered rendered. <strong>Refunds are not provided for completed visits</strong>, regardless of whether a prescription was issued.</li>
            <li><strong>No-Shows &amp; Late Cancellations:</strong> If you fail to attend your scheduled appointment or cancel within <strong>2 hours</strong> of the appointment time, you may be charged a non-refundable "No-Show" fee or forfeit the full cost of the visit.</li>
            <li><strong>Provider Cancellations:</strong> If a provider is unable to join the consultation or if Great Doctors USA LLC must cancel your appointment, a full refund will be issued to your original payment method.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>2. Prescription Medications &amp; Pharmacy Pickups</h2>
          <p>Great Doctors USA LLC is not a pharmacy.</p>
          <ul>
            <li><strong>At the Pharmacy:</strong> Any payments made directly to a pharmacy for medication are subject to that pharmacy's individual return policy. Most pharmacies cannot accept returns on prescription medications once they have left the premises.</li>
            <li><strong>Mail Order:</strong> For medications delivered via mail-order partners, refunds are only issued if the medication is damaged or the incorrect item was shipped.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. Lab Tests &amp; Diagnostic Services</h2>
          <ul>
            <li><strong>Unused Kits:</strong> If you ordered a lab kit but have not yet used it or sent it to the lab, you may be eligible for a refund minus a shipping and handling fee, provided the request is made within <strong>30 days</strong> of purchase.</li>
            <li><strong>Processed Tests:</strong> Once a lab sample has been received and processing has begun, no refunds can be issued.</li>
          </ul>
        </section>

        <div className="legal-page__contact">
          <p>Need help with a refund request? <Link to="/contact">Contact our support team</Link>.</p>
        </div>
      </div>

      <style>{`
        .legal-page__hero {
          padding: 120px 0 56px;
          background: var(--navy);
        }
        .legal-page__title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: white;
          letter-spacing: -0.03em;
          margin: 12px 0 16px;
        }
        .legal-page__meta {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.45);
        }
        .legal-page__body {
          padding-top: 64px;
          padding-bottom: 100px;
          max-width: 780px;
        }
        .legal-page__intro {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.75;
          margin-bottom: 48px;
          padding: 20px 24px;
          background: var(--off-white);
          border-radius: var(--radius-md);
          border-left: 3px solid var(--navy);
        }
        .legal-section {
          margin-bottom: 48px;
        }
        .legal-section h2 {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 12px;
          padding-bottom: 10px;
          border-bottom: 2px solid var(--teal);
          display: inline-block;
        }
        .legal-section p {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.75;
          margin-bottom: 12px;
        }
        .legal-section ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .legal-section ul li {
          font-size: 0.925rem;
          color: var(--text-secondary);
          line-height: 1.7;
          padding-left: 20px;
          position: relative;
        }
        .legal-section ul li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 10px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--teal);
        }
        .legal-page__contact {
          margin-top: 64px;
          padding: 24px 28px;
          background: var(--off-white);
          border-left: 3px solid var(--teal);
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .legal-page__contact a {
          color: var(--teal);
          font-weight: 600;
        }
        .legal-page__contact a:hover { text-decoration: underline; }
      `}</style>
    </div>
  )
}
