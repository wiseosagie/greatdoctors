import { Link } from 'react-router-dom'

export default function PrivacyPolicyPage() {
  return (
    <div className="legal-page">
      <div className="legal-page__hero">
        <div className="container">
          <span className="section-label">Legal</span>
          <h1 className="legal-page__title">Privacy Policy</h1>
          <p className="legal-page__meta">Effective Date: April 29, 2026 &nbsp;·&nbsp; Last Updated: April 29, 2026</p>
        </div>
      </div>

      <div className="container legal-page__body">
        <section className="legal-section">
          <h2>1. Information We Collect</h2>
          <p>We collect information to provide you with better healthcare savings and services. This falls into three categories:</p>
          <ul>
            <li><strong>Information You Provide:</strong> This includes your name, email address, date of birth, zip code, and details regarding your prescriptions or health interests.</li>
            <li><strong>Automated Information:</strong> When you use our platform, we automatically collect your IP address, browser type, and device identifiers via cookies and similar technologies.</li>
            <li><strong>Health-Related Information:</strong> If you use our services to find coupons or book appointments, we may collect information about the medications you search for or the providers you visit.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>2. How We Use Your Information</h2>
          <p>Great Doctors USA LLC uses your data to:</p>
          <ul>
            <li>Provide and improve our price-comparison tools.</li>
            <li>Deliver personalized health content and discount alerts.</li>
            <li>Process transactions and communicate with healthcare providers.</li>
            <li>Ensure the security and integrity of our platform.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. How We Share Your Information</h2>
          <p>We do <strong>not</strong> sell your medical history to third parties for their own marketing. However, we may share data with:</p>
          <ul>
            <li><strong>Service Providers:</strong> Companies that help us host our site, analyze data, or process payments.</li>
            <li><strong>Healthcare Partners:</strong> Pharmacies or providers necessary to fulfill a discount or appointment.</li>
            <li><strong>Legal Compliance:</strong> When required by law to comply with a subpoena or similar legal process.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. Your Privacy Rights &amp; Choices</h2>
          <p>Depending on your location (such as California under the CCPA/CPRA), you may have the following rights:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of the data we hold about you.</li>
            <li><strong>Deletion:</strong> Request that we delete your personal information.</li>
            <li><strong>Opt-Out:</strong> You can opt-out of personalized advertising and marketing emails at any time via your account settings.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. Security Measures</h2>
          <p>We implement physical, technical, and administrative safeguards designed to protect your information. While we strive for "bank-grade" security, please note that no method of transmission over the internet is <strong>100% secure</strong>.</p>
        </section>

        <div className="legal-page__contact">
          <p>Questions about this policy? <Link to="/contact">Contact us</Link>.</p>
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
