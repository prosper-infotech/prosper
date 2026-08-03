import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Breadcrumb({ title, parent }) {
  return (
    <section className="relative bg-gradient-to-br from-navy via-primary to-primary-dark text-white overflow-hidden">
      <div className="pointer-events-none absolute -top-20 -right-16 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-20"
      >
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white drop-shadow-md">{title}</h1>
        <nav className="mt-3 text-sm text-ink-300">
          <Link to="/" className="hover:text-gold">
            Home
          </Link>
          {parent && (
            <>
              <span className="mx-2">/</span>
              <span>{parent}</span>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-white">{title}</span>
        </nav>
      </motion.div>
    </section>
  )
}
