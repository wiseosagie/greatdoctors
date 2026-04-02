import { motion } from 'framer-motion'
import Services from '../components/Services'
import Pricing from '../components/Pricing'

export default function ServicesPage() {
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
            What We Treat
          </motion.span>
          <motion.h1
            className="section-title page-hero__title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            Affordable care for every condition
          </motion.h1>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Serving Arlington, Dallas, and across Texas. No insurance required — just honest flat-rate pricing.
          </motion.p>
        </div>
      </div>
      <Services />
      <Pricing />

      <style>{`
        .page-hero {
          padding: 130px 0 64px;
          background: var(--white);
          border-bottom: 1px solid var(--border);
        }
        .page-hero__inner {
          max-width: 700px;
        }
        .page-hero__title {
          margin-bottom: 16px;
        }
      `}</style>
    </>
  )
}
