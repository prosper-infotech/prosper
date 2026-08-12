import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../ui/Button'
import AnimatedText from '../motion/AnimatedText'
import heroBg from '../../assets/home-hero-bg.jpg'
import slideDockAi from '../../assets/hero-slide-dock-ai.jpg'
import slideRfidWarehouse from '../../assets/hero-slide-rfid-warehouse.jpg'
import slideIotYard from '../../assets/hero-slide-iot-yard.jpg'
import slideDockMonitoring from '../../assets/hero-slide-dock-monitoring.jpg'
import slideDistributionCenter from '../../assets/hero-slide-distribution-center.jpg'
import slideFleetGps from '../../assets/hero-slide-fleet-gps.jpg'

// Slide 0 is the original hero — its image, copy, and layout are unchanged.
const SLIDES = [
  {
    image: heroBg,
    alt: 'Prosper Infotech AI-powered warehouse and logistics visibility platform',
    eyebrow: 'IoT · RFID · GPS · AI',
    title: 'Transform Logistics With AI-Powered Visibility',
    highlightWords: ['AI-Powered', 'Visibility'],
    subtitle:
      'AI, OCR, RFID, GPS, and edge intelligence — real-time visibility for your yard, warehouse, and fleet.',
  },
  {
    image: slideDockAi,
    alt: 'AI and drone-powered dock and yard automation',
    eyebrow: 'AI & Drone Visibility',
    title: 'AI-Powered Yard & Dock Automation',
    highlightWords: ['AI-Powered', 'Automation'],
    subtitle:
      'Drones, sensors, and AI track every trailer, dock door, and asset across your yard in real time.',
  },
  {
    image: slideRfidWarehouse,
    alt: 'RFID-powered warehouse inventory tracking',
    eyebrow: 'RFID Warehouse Intelligence',
    title: 'RFID-Driven Warehouse Intelligence',
    highlightWords: ['RFID-Driven', 'Intelligence'],
    subtitle: 'Scan, track, and count every pallet automatically — no manual audits, no guesswork.',
  },
  {
    image: slideIotYard,
    alt: 'IoT-connected yard and trailer tracking network',
    eyebrow: 'Connected Yard',
    title: 'End-to-End IoT Yard Tracking',
    highlightWords: ['End-to-End', 'IoT'],
    subtitle: 'WiFi and IoT sensors keep every trailer and asset visible the moment it enters your yard.',
  },
  {
    image: slideDockMonitoring,
    alt: 'Smart dock door status monitoring inside a warehouse',
    eyebrow: 'Dock Operations',
    title: 'Smart Dock Door & Operations Monitoring',
    highlightWords: ['Smart', 'Monitoring'],
    subtitle: 'Live dock status, automated alerts, and real-time dashboards right on the floor.',
  },
  {
    image: slideDistributionCenter,
    alt: 'Aerial view of a large distribution center with IoT-tracked dock doors',
    eyebrow: 'Enterprise Scale',
    title: 'Enterprise-Scale Distribution Center Visibility',
    highlightWords: ['Enterprise-Scale', 'Visibility'],
    subtitle: 'Monitor hundreds of dock doors and trailers across your entire network from one platform.',
  },
  {
    image: slideFleetGps,
    alt: 'GPS-tracked truck on the highway with live telemetry',
    eyebrow: 'GPS Fleet Tracking',
    title: 'GPS & Fleet Tracking, Anywhere On The Road',
    highlightWords: ['GPS', 'Fleet Tracking'],
    subtitle: 'Live location, speed, and condition data for every vehicle — wherever the road takes it.',
  },
]

const AUTOPLAY_MS = 6000

export default function Hero() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [paused])

  const slide = SLIDES[active]

  return (
    <section
      className="relative h-[85vh] min-h-[560px] max-h-[820px] lg:h-[720px] lg:min-h-0 lg:max-h-none overflow-hidden bg-navy"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync">
        <motion.img
          key={`blur-${active}`}
          src={slide.image}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="hidden lg:block absolute inset-0 h-full w-full object-cover scale-110 blur-2xl"
        />
      </AnimatePresence>

      <AnimatePresence mode="sync">
        <motion.img
          key={`sharp-${active}`}
          src={slide.image}
          alt={slide.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="absolute inset-0 h-full w-full object-cover lg:object-contain object-center"
        />
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-black/70 via-black/25 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

      <AnimatePresence mode="wait">
        {active === 0 ? (
          <motion.div
            key="text-0"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-0 h-[30%] z-10 flex flex-col items-center justify-start pt-24 lg:pt-28 gap-3 px-6 text-center"
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              {slide.eyebrow}
            </span>
            <AnimatedText
              as="h1"
              scroll={false}
              text={slide.title}
              highlightWords={slide.highlightWords}
              className="text-3xl md:text-4xl xl:text-5xl font-heading font-bold leading-tight text-white drop-shadow-md"
            />
            <p className="hidden sm:block text-white/85 text-base lg:text-lg max-w-2xl">
              {slide.subtitle}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={`text-${active}`}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-[24%] bottom-[24%] z-10 flex flex-col items-center justify-center gap-3 px-6 text-center"
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              {slide.eyebrow}
            </span>
            <AnimatedText
              as="h1"
              scroll={false}
              text={slide.title}
              highlightWords={slide.highlightWords}
              className="text-3xl md:text-4xl xl:text-5xl font-heading font-bold leading-tight text-white drop-shadow-md"
            />
            <p className="hidden sm:block text-white/85 text-base lg:text-lg max-w-2xl">
              {slide.subtitle}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 h-[24%] z-10 flex flex-col items-center justify-center gap-4 px-6"
      >
        <div className="flex items-center justify-center gap-4">
          <Button to="/contact" variant="primary-dark">
            Book a demo
          </Button>
          <Button to="/solutions" variant="outline">
            Explore solutions
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show slide ${i + 1}`}
              className="p-2 -m-2"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'w-6 bg-gold' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
