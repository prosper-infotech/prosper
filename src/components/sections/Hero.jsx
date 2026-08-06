import { motion } from 'framer-motion'
import { Brain, ScanText, Radio, Satellite } from 'lucide-react'
import Button from '../ui/Button'
import AnimatedText from '../motion/AnimatedText'
import heroBanner from '../../assets/hero-banner.jpg'

const CAPABILITIES = [
  { icon: Brain, label: 'AI & Edge Intelligence' },
  { icon: ScanText, label: 'OCR & Computer Vision' },
  { icon: Radio, label: 'RFID Automation' },
  { icon: Satellite, label: 'GPS Tracking' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 pt-16 md:pt-24 pb-10 text-center flex flex-col items-center gap-6">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-primary text-sm font-semibold uppercase tracking-widest"
        >
          IoT &middot; RFID &middot; GPS &middot; AI
        </motion.span>

        <AnimatedText
          as="h1"
          scroll={false}
          text="Transform Logistics With AI-Powered Visibility"
          highlightWords={['AI-Powered', 'Visibility']}
          className="text-4xl md:text-5xl font-heading font-bold leading-tight text-primary"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-ink-600 text-lg max-w-2xl"
        >
          AI, OCR, RFID, GPS, and edge intelligence &mdash; all working together to give your
          yard, warehouse, and fleet real-time visibility instead of guesswork.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button to="/contact" variant="primary-dark">
            Book a demo
          </Button>
          <Button to="/solutions" variant="outline-dark">
            Explore solutions
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-2 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          {CAPABILITIES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-primary">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <span className="text-xs font-semibold text-ink-700">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-7xl mx-auto px-6 pb-16 md:pb-24"
      >
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={heroBanner}
            alt="Prosper Infotech AI-powered warehouse and port visibility platform"
            className="w-full h-auto"
          />
        </div>
      </motion.div>
    </section>
  )
}
