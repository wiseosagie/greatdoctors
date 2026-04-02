import { motion } from 'framer-motion'
import Contact from '../components/Contact'

export default function ContactPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container page-hero__inner">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.span>
          <motion.h1
            className="section-title page-hero__title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            Questions? We're here.
          </motion.h1>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Reach our team in Arlington & Dallas — or call us directly at (888) 613-7454.
          </motion.p>
        </div>
      </div>
      <Contact />

      <style>{`
        .page-hero {
          padding: 130px 0 64px;
          background: var(--white);
          border-bottom: 1px solid var(--border);
        }
        .page-hero__inner { max-width: 700px; }
        .page-hero__title { margin-bottom: 16px; }
      `}</style>
    </>
  )
}
