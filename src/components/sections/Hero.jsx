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
    <section className="relative overflow-hidden min-h-[640px] lg:min-h-[720px] flex items-center">
      <img
        src={heroBanner}
        alt="Prosper Infotech AI-powered warehouse and port visibility platform"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 900px 700px at 22% 40%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.5) 55%, rgba(255,255,255,0.15) 75%, rgba(255,255,255,0) 90%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-xl flex flex-col gap-5 px-6 lg:pl-12 xl:pl-20 py-16 lg:py-0"
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
    </section>
  )
}
