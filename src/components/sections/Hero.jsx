import { motion } from 'framer-motion'
import { Brain, ScanText, Radio, Satellite } from 'lucide-react'
import Button from '../ui/Button'
import AnimatedText from '../motion/AnimatedText'
import heroSide from '../../assets/home-hero-side.jpg'

const CAPABILITIES = [
  { icon: Brain, label: 'AI & Edge Intelligence' },
  { icon: ScanText, label: 'OCR & Computer Vision' },
  { icon: Radio, label: 'RFID Automation' },
  { icon: Satellite, label: 'GPS Tracking' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="pointer-events-none absolute top-1/4 right-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-5"
        >
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
            className="text-4xl xl:text-5xl font-heading font-bold leading-tight text-primary"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-ink-600 text-lg"
          >
            AI, OCR, RFID, GPS, and edge intelligence &mdash; all working together to give your
            yard, warehouse, and fleet real-time visibility instead of guesswork.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
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
            className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-5"
          >
            {CAPABILITIES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-start gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-primary">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span className="text-xs font-semibold text-ink-700 leading-tight">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block"
        >
          <div className="relative overflow-hidden rounded-2xl border border-ink-300 shadow-[0_25px_60px_-15px_rgba(20,52,109,0.35)]">
            <img
              src={heroSide}
              alt="Prosper Infotech AI-powered warehouse and port visibility platform"
              className="w-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
