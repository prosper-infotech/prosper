import { motion } from 'framer-motion'
import { Brain, ScanText, Radio, Satellite, Camera } from 'lucide-react'
import Button from '../ui/Button'
import AnimatedText from '../motion/AnimatedText'
import heroBg from '../../assets/hero-bg.jpg'

const CAPABILITIES = [
  { icon: Brain, label: 'AI & Edge Intelligence' },
  { icon: ScanText, label: 'OCR & Computer Vision' },
  { icon: Radio, label: 'RFID Automation' },
  { icon: Satellite, label: 'GPS Tracking' },
]

const BADGES = [
  { icon: Brain, label: 'AI Yard Intelligence', style: { top: '8%', left: '6%' } },
  { icon: Camera, label: 'Camera Vision', style: { top: '4%', right: '10%' } },
  { icon: Radio, label: 'RFID Tracking', style: { bottom: '32%', left: '2%' } },
  { icon: Satellite, label: 'GPS Tracking', style: { bottom: '10%', right: '4%' } },
]

function Badge({ icon: Icon, label, style }) {
  return (
    <div className="absolute hidden md:flex flex-col items-center gap-1.5" style={style}>
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-lg ring-2 ring-gold/60">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-primary shadow-md whitespace-nowrap">
        {label}
      </span>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 grid gap-12 lg:grid-cols-2 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6"
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
            className="text-4xl md:text-5xl font-heading font-bold leading-tight text-primary"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-ink-600 text-lg max-w-xl"
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
            className="mt-2 flex flex-wrap gap-x-6 gap-y-4"
          >
            {CAPABILITIES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-primary">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span className="text-xs font-semibold text-ink-700 max-w-[6rem] leading-tight">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <img src={heroBg} alt="Prosper Infotech AI-powered yard visibility" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
          </div>
          {BADGES.map((badge) => (
            <Badge key={badge.label} {...badge} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
