import { Link } from 'react-router-dom'

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="38" rx="10" fill="#0A9B8C"/>
    <path d="M15.5 9h7v6.5H29v7h-6.5V29h-7v-6.5H9v-7h6.5z" fill="#fff"/>
  </svg>
)

const links = {
  Services: [
    { label: 'Sexual Health',  to: '/services?tab=sexual' },
    { label: 'Urgent Care',    to: '/services?tab=urgent' },
    { label: "Men's Health",   to: '/services?tab=mens' },
    { label: 'Mental Health',  to: '/services?tab=mental' },
    { label: 'Lab Tests',      to: '/services?tab=labs' },
  ],
  Company: [
    { label: 'How It Works',   to: '/' },
    { label: 'Our Team',       to: '/team' },
    { label: 'Contact Us',     to: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy',       to: '/privacy-policy' },
    { label: 'Terms & Conditions',   to: '/terms' },
    { label: 'HIPAA Notice',         to: '/hipaa' },
    { label: 'Refund Policy',        to: '/refund-policy' },
  ],
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <Logo />
              <span className="footer__logo-text">Great<strong>Doctors</strong> USA</span>
            </Link>
            <p className="footer__tagline">
              Care without barriers. Affordable online doctor visits for patients in Arlington, Dallas, and across Texas.
            </p>
            <div className="footer__badges">
              <span className="footer__badge">HIPAA Compliant</span>
              <span className="footer__badge">No Insurance Required</span>
              <span className="footer__badge">TX Licensed Physicians</span>
            </div>
            <a href="tel:8886137454" className="footer__phone">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6z"/>
              </svg>
              (888) 613-7454
            </a>
          </div>

          <div className="footer__nav">
            {Object.entries(links).map(([group, items]) => (
              <div key={group} className="footer__nav-col">
                <h4 className="footer__nav-heading">{group}</h4>
                <ul className="footer__nav-list">
                  {items.map(item => (
                    <li key={item.label}>
                      <Link to={item.to} className="footer__nav-link">{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} Great Doctors USA. All rights reserved. Serving Arlington, Dallas, and the DFW Metroplex.
          </p>
          <p className="footer__disclaimer">
            Great Doctors USA is a telemedicine platform. Services are provided by licensed physicians. Not for emergency medical situations — call 911 if you are experiencing a medical emergency.
          </p>
          <p className="footer__disclaimer">
            <strong style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>Pharmacy Notice:</strong> Great Doctors USA does not dispense or ship medication directly to patients. Upon approval, prescriptions are sent electronically to a pharmacy of your choice. Patients are responsible for picking up their medication at their selected pharmacy.
          </p>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--navy);
          padding: 72px 0 32px;
          position: relative;
          overflow: hidden;
        }
        .footer::before {
          content: '';
          position: absolute;
          top: -200px;
          right: -200px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,180,216,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .footer__top {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 72px;
          margin-bottom: 56px;
          padding-bottom: 56px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .footer__logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }
        .footer__logo-text {
          font-size: 1.1rem;
          font-weight: 400;
          color: white;
          letter-spacing: -0.02em;
        }
        .footer__logo-text strong { font-weight: 700; }
        .footer__tagline {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.55);
          line-height: 1.7;
          max-width: 340px;
          margin-bottom: 20px;
        }
        .footer__badges {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .footer__badge {
          font-size: 0.72rem;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 4px 10px;
          border-radius: 100px;
        }
        .footer__phone {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--teal);
          transition: color 0.2s;
        }
        .footer__phone:hover { color: var(--teal-light); }
        .footer__nav {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        .footer__nav-heading {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.4);
          margin-bottom: 16px;
        }
        .footer__nav-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .footer__nav-link {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.6);
          transition: color 0.2s;
        }
        .footer__nav-link:hover { color: white; }
        .footer__bottom {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer__copy {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.4);
        }
        .footer__disclaimer {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.25);
          line-height: 1.6;
          max-width: 700px;
        }

        @media (max-width: 900px) {
          .footer__top { grid-template-columns: 1fr; gap: 40px; }
        }
        @media (max-width: 600px) {
          .footer__nav { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </footer>
  )
}
