import { Link } from 'react-router-dom'

export default function HipaaPage() {
  return (
    <div className="legal-page">
      <div className="legal-page__hero">
        <div className="container">
          <span className="section-label">Legal</span>
          <h1 className="legal-page__title">Notice of Privacy Practices</h1>
          <p className="legal-page__meta">Great Doctors USA LLC &nbsp;·&nbsp; HIPAA Notice</p>
        </div>
      </div>

      <div className="container legal-page__body">
        <p className="legal-page__intro">
          At <strong>Great Doctors USA LLC</strong>, we are committed to protecting your health information. This notice is provided in accordance with the Health Insurance Portability and Accountability Act (HIPAA).
        </p>

        <section className="legal-section">
          <h2>I. Our Pledge Regarding Your Health Information</h2>
          <p>We understand that information about you and your health is personal. We create a record of the care and services you receive to provide quality care and comply with legal requirements. This notice applies to all of the records of your care generated or maintained by Great Doctors USA LLC.</p>
        </section>

        <section className="legal-section">
          <h2>II. How We May Use and Disclose Your Information</h2>
          <p>We may use and disclose your Protected Health Information (PHI) for the following purposes:</p>
          <ul>
            <li><strong>For Treatment:</strong> We may use your PHI to provide, coordinate, or manage your health care and related services. For example, sharing information with a specialist or your primary care physician.</li>
            <li><strong>For Payment:</strong> We may use and disclose PHI so that the treatment and services you receive may be billed to and payment may be collected from you, an insurance company, or a third party.</li>
            <li><strong>For Health Care Operations:</strong> We may use and disclose PHI for our internal operations, such as quality assessment, employee reviews, and business planning.</li>
            <li><strong>As Required by Law:</strong> We will disclose PHI when required to do so by federal, state, or local law (e.g., reporting public health risks or responding to a court order).</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>III. Your Rights Regarding Your PHI</h2>
          <p>You have the following rights regarding the health information we maintain about you:</p>
          <div className="hipaa-table">
            <div className="hipaa-table__row hipaa-table__row--header">
              <div className="hipaa-table__cell">Right</div>
              <div className="hipaa-table__cell">Description</div>
            </div>
            <div className="hipaa-table__row">
              <div className="hipaa-table__cell"><strong>Right to Inspect</strong></div>
              <div className="hipaa-table__cell">You have the right to inspect and copy your medical and billing records.</div>
            </div>
            <div className="hipaa-table__row">
              <div className="hipaa-table__cell"><strong>Right to Amend</strong></div>
              <div className="hipaa-table__cell">If you feel the information we have is incorrect, you may ask us to amend it.</div>
            </div>
            <div className="hipaa-table__row">
              <div className="hipaa-table__cell"><strong>Right to an Accounting</strong></div>
              <div className="hipaa-table__cell">You may request a list of certain disclosures we've made of your PHI.</div>
            </div>
            <div className="hipaa-table__row">
              <div className="hipaa-table__cell"><strong>Right to Request Restrictions</strong></div>
              <div className="hipaa-table__cell">You may request a restriction on how we use or disclose your PHI.</div>
            </div>
            <div className="hipaa-table__row">
              <div className="hipaa-table__cell"><strong>Right to Confidentiality</strong></div>
              <div className="hipaa-table__cell">You may request that we communicate with you in a specific way (e.g., home phone only).</div>
            </div>
          </div>
        </section>

        <section className="legal-section">
          <h2>IV. Changes to This Notice</h2>
          <p>We reserve the right to change this notice. We reserve the right to make the revised or changed notice effective for health information we already have about you as well as any information we receive in the future. We will post a copy of the current notice on our website.</p>
        </section>

        <section className="legal-section">
          <h2>V. Complaints</h2>
          <p>If you believe your privacy rights have been violated, you may file a complaint with Great Doctors USA LLC or with the Secretary of the Department of Health and Human Services. <strong>You will not be penalized for filing a complaint.</strong></p>
        </section>

        <div className="legal-page__contact">
          <p>To file a complaint or ask questions about your PHI, <Link to="/contact">contact us</Link>.</p>
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
          gap: 10px;
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
        .hipaa-table {
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
          margin-top: 16px;
        }
        .hipaa-table__row {
          display: grid;
          grid-template-columns: 220px 1fr;
        }
        .hipaa-table__row + .hipaa-table__row {
          border-top: 1px solid var(--border);
        }
        .hipaa-table__row--header {
          background: var(--navy);
        }
        .hipaa-table__row--header .hipaa-table__cell {
          color: rgba(255,255,255,0.7);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .hipaa-table__cell {
          padding: 14px 20px;
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .hipaa-table__cell:first-child {
          border-right: 1px solid var(--border);
          background: rgba(10,155,140,0.04);
        }
        .hipaa-table__row--header .hipaa-table__cell:first-child {
          background: transparent;
          border-right-color: rgba(255,255,255,0.1);
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

        @media (max-width: 600px) {
          .hipaa-table__row { grid-template-columns: 1fr; }
          .hipaa-table__cell:first-child { border-right: none; border-bottom: 1px solid var(--border); }
        }
      `}</style>
    </div>
  )
}
