import { Link } from 'react-router-dom'

export default function TermsPage() {
  return (
    <div className="legal-page">
      <div className="legal-page__hero">
        <div className="container">
          <span className="section-label">Legal</span>
          <h1 className="legal-page__title">Terms of Use</h1>
          <p className="legal-page__meta">Last Updated: April 29, 2026</p>
        </div>
      </div>

      <div className="container legal-page__body">
        <p className="legal-page__intro">
          Welcome to <strong>Great Doctors USA LLC</strong> ("Great Doctors," "we," "us," or "our"). By accessing or using our website, mobile application, or any of our services (collectively, the "Services"), you agree to be bound by these Terms of Use.
        </p>

        <section className="legal-section">
          <h2>1. Not Medical Advice</h2>
          <p><strong>Great Doctors USA LLC is not a healthcare provider.</strong> The content provided through our Services—including text, graphics, images, and pricing information—is for <strong>informational purposes only</strong>.</p>
          <ul>
            <li>Our Services do not constitute the practice of medicine, nursing, or other professional healthcare services.</li>
            <li><strong>Always seek the advice of your physician</strong> or other qualified health provider with any questions you may have regarding a medical condition.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>2. We Are Not an Insurance Product</h2>
          <p>Great Doctors provides access to discounts and pricing transparency. <strong>We are not insurance.</strong></p>
          <ul>
            <li>Our discount cards and coupons cannot be used in conjunction with any federal or state-funded program (such as Medicare or Medicaid).</li>
            <li>You are responsible for paying the entire cost of the service or prescription at the point of sale after the discount is applied.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. Use of Services</h2>
          <p>To use certain features of our Services, you may be required to create an account. You agree to:</p>
          <ul>
            <li>Provide accurate, current, and complete information.</li>
            <li>Maintain the security of your password and accept all risks of unauthorized access.</li>
            <li>Notify us immediately if you discover or suspect any security breaches.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. Pricing and Information Accuracy</h2>
          <p>While we strive to provide the most accurate pricing data for prescriptions and doctor visits:</p>
          <ul>
            <li><strong>Prices are subject to change.</strong> The final price is determined by the provider (pharmacy or clinic) at the time of purchase.</li>
            <li>We do not warrant that the prices displayed will be the lowest price available in your area.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. Prohibited Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Services for any commercial purpose without our express written consent.</li>
            <li>Use any robot, spider, or other automated means to scrape data.</li>
            <li>Attempt to circumvent any content-filtering techniques we employ.</li>
            <li>Use our Services for any illegal or unauthorized purpose.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>6. Intellectual Property</h2>
          <p>All content, logos, and software used on the Services are the property of Great Doctors USA LLC or our licensors and are protected by copyright, trademark, and other intellectual property laws. You are granted a limited, non-exclusive license to access the Services for personal, non-commercial use.</p>
        </section>

        <section className="legal-section">
          <h2>7. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, Great Doctors USA LLC shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Services.</p>
        </section>

        <section className="legal-section">
          <h2>8. Privacy Policy</h2>
          <p>Your privacy is important to us. Please refer to our <Link to="/privacy-policy">Privacy Policy</Link> to understand how we collect, use, and disclose your personal information and Protected Health Information (PHI).</p>
        </section>

        <section className="legal-section">
          <h2>9. Modifications to Terms</h2>
          <p>We reserve the right to change or modify these Terms at any time. If we make changes, we will notify you by revising the "Last Updated" date at the top of this page. Your continued use of the Services confirms your acceptance of the revised Terms.</p>
        </section>

        <section className="legal-section">
          <h2>10. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of the State of Texas, without regard to conflict of law principles.</p>
        </section>

        <div className="legal-page__contact">
          <p>Questions about these Terms? <Link to="/contact">Contact us</Link>.</p>
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
        .legal-page__intro a { color: var(--teal); font-weight: 600; }
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
        .legal-section p a { color: var(--teal); font-weight: 600; }
        .legal-section p a:hover { text-decoration: underline; }
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
