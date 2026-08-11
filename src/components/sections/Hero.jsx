import { motion } from 'framer-motion'
import Button from '../ui/Button'
import AnimatedText from '../motion/AnimatedText'
import heroBg from '../../assets/home-hero-bg.jpg'

export default function Hero() {
  return (
    <section className="relative h-[85vh] min-h-[560px] max-h-[820px] overflow-hidden bg-navy">
      <img
        src={heroBg}
        alt="Prosper Infotech AI-powered warehouse and logistics visibility platform"
        className="absolute inset-0 h-full w-full object-contain object-center"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-black/70 via-black/25 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 top-0 h-[30%] z-10 flex flex-col items-center justify-start pt-24 lg:pt-28 gap-3 px-6 text-center"
      >
        <span className="text-gold text-sm font-semibold uppercase tracking-widest">
          IoT &middot; RFID &middot; GPS &middot; AI
        </span>
        <AnimatedText
          as="h1"
          scroll={false}
          text="Transform Logistics With AI-Powered Visibility"
          highlightWords={['AI-Powered', 'Visibility']}
          className="text-3xl md:text-4xl xl:text-5xl font-heading font-bold leading-tight text-white drop-shadow-md"
        />
        <p className="hidden sm:block text-white/85 text-base lg:text-lg max-w-2xl">
          AI, OCR, RFID, GPS, and edge intelligence &mdash; real-time visibility for your yard,
          warehouse, and fleet.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 h-[24%] z-10 flex items-center justify-center gap-4 px-6"
      >
        <Button to="/contact" variant="primary-dark">
          Book a demo
        </Button>
        <Button to="/solutions" variant="outline">
          Explore solutions
        </Button>
      </motion.div>
    </section>
  )
}
