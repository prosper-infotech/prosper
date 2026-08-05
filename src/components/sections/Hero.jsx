import { motion } from 'framer-motion'
import Button from '../ui/Button'
import AnimatedText from '../motion/AnimatedText'
import heroBg from '../../assets/hero-bg.jpg'

export default function Hero() {
  return (
    <section
      className="relative text-white overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-navy/70 via-primary/50 to-primary-dark/70" />
      <div className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-primary-dark/60 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-4xl mx-auto px-6 py-28 md:py-36 text-center flex flex-col items-center gap-6"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gold text-sm font-semibold uppercase tracking-widest drop-shadow-sm"
        >
          IoT &middot; RFID &middot; GPS &middot; AI
        </motion.span>
        <AnimatedText
          as="h1"
          scroll={false}
          text="Streamline Your Logistics With AI-Powered Precision"
          className="text-4xl md:text-5xl font-heading font-bold leading-tight text-white drop-shadow-md"
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-ink-300 max-w-2xl drop-shadow-md"
        >
          RFID, GPS, IoT, and computer vision &mdash; built into one platform, so your yard,
          warehouse, and fleet run on real-time data instead of guesswork.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-2"
        >
          <Button to="/contact" variant="primary">
            Book a demo
          </Button>
          <Button to="/solutions" variant="outline">
            Explore solutions
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
