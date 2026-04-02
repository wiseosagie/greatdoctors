import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const Logo = () => (
  <svg width="36" height="36" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="38" rx="10" fill="#0A9B8C"/>
    <path d="M15.5 9h7v6.5H29v7h-6.5V29h-7v-6.5H9v-7h6.5z" fill="#fff"/>
  </svg>
)

const navLinks = [
  { label: 'Home',        to: '/' },
  { label: 'Services',    to: '/services' },
  { label: 'Our Team',    to: '/team' },
  { label: 'Contact',     to: '/contact' },
]

export default function Navbar() {
  const { user, signOut } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container navbar__inner">
          <Link to="/" className="navbar__brand">
            <Logo />
            <span className="navbar__brand-text">
              Great<strong>Doctors</strong> USA
            </span>
          </Link>

          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="navbar__actions">
            <a href="tel:8886137454" className="navbar__phone">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
              </svg>
              (888) 613-7454
            </a>
            {user ? (
              <Link to="/dashboard" className="navbar__dashboard-link">
                My Visits
              </Link>
            ) : (
              <Link to="/auth" className="navbar__dashboard-link">
                Log In
              </Link>
            )}
            <Link to="/services" className="btn-primary navbar__cta">
              Start a Visit — $49.99
            </Link>
          </div>

          <button
            className="navbar__burger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={menuOpen ? 'open' : ''} />
            <span className={menuOpen ? 'open' : ''} />
            <span className={menuOpen ? 'open' : ''} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map((link, i) => (
              <motion.div key={link.to}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `mobile-menu__link ${isActive ? 'mobile-menu__link--active' : ''}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
            <Link
              to="/services"
              className="btn-primary"
              style={{ marginTop: '12px', justifyContent: 'center' }}
              onClick={() => setMenuOpen(false)}
            >
              Start a Visit — $29.99
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: 14px 0;
          transition: all 0.3s ease;
        }
        .navbar--scrolled {
          background: rgba(250,252,255,0.92);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid var(--border);
          padding: 10px 0;
          box-shadow: 0 4px 24px rgba(10,155,140,0.08);
        }
        .navbar__inner {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .navbar__brand {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .navbar__brand-text {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          color: var(--navy);
          letter-spacing: -0.01em;
        }
        .navbar__brand-text strong { font-weight: 700; color: var(--teal); }

        /* show brand name white on top of dark hero */
        .navbar:not(.navbar--scrolled) .navbar__brand-text { color: #fff; }
        .navbar:not(.navbar--scrolled) .navbar__brand-text strong { color: #5DECD8; }

        .navbar__links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin-left: auto;
        }
        .navbar__link {
          font-size: 0.85rem;
          font-weight: 400;
          color: rgba(255,255,255,0.78);
          padding: 8px 14px;
          border-radius: 99px;
          letter-spacing: 0.01em;
          transition: var(--transition);
        }
        .navbar--scrolled .navbar__link { color: var(--muted); }
        .navbar__link:hover,
        .navbar__link--active {
          color: var(--teal) !important;
          background: var(--teal-l);
        }
        .navbar:not(.navbar--scrolled) .navbar__link:hover,
        .navbar:not(.navbar--scrolled) .navbar__link--active {
          background: rgba(10,155,140,0.18);
          color: #5DECD8 !important;
        }

        .navbar__actions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
        }
        .navbar__phone {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 500;
          color: rgba(255,255,255,0.65);
          transition: var(--transition);
        }
        .navbar--scrolled .navbar__phone { color: var(--muted); }
        .navbar__phone:hover { color: var(--teal); }
        .navbar__cta { font-size: 0.8rem; padding: 9px 18px; }
        .navbar__dashboard-link {
          font-size: 0.8rem; font-weight: 500;
          color: rgba(255,255,255,0.75);
          padding: 8px 14px; border-radius: 99px;
          border: 1px solid rgba(255,255,255,0.2);
          transition: var(--transition);
        }
        .navbar--scrolled .navbar__dashboard-link {
          color: var(--muted);
          border-color: var(--border);
        }
        .navbar__dashboard-link:hover { color: var(--teal); border-color: var(--teal); }

        .navbar__burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          padding: 4px;
          margin-left: auto;
        }
        .navbar__burger span {
          display: block;
          width: 22px;
          height: 2px;
          background: white;
          border-radius: 2px;
          transition: var(--transition);
        }
        .navbar--scrolled .navbar__burger span { background: var(--navy); }
        .navbar__burger span.open:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .navbar__burger span.open:nth-child(2) { opacity: 0; }
        .navbar__burger span.open:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

        .mobile-menu {
          position: fixed;
          top: 65px; left: 0; right: 0;
          z-index: 999;
          background: var(--white);
          border-bottom: 1px solid var(--border);
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          box-shadow: 0 8px 32px rgba(10,155,140,0.1);
        }
        .mobile-menu__link {
          font-size: 1rem;
          font-weight: 400;
          color: var(--ink);
          padding: 12px 8px;
          border-bottom: 1px solid var(--border);
          display: block;
        }
        .mobile-menu__link--active { color: var(--teal); font-weight: 600; }

        @media (max-width: 900px) {
          .navbar__links, .navbar__actions { display: none; }
          .navbar__burger { display: flex; }
        }
      `}</style>
    </>
  )
}
