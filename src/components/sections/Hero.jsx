import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '../ui/Button'
import AnimatedText from '../motion/AnimatedText'
import slideAiVisionIot from '../../assets/hero-slide-ai-vision-iot.jpg'
import slideDockAi from '../../assets/hero-slide-dock-ai.jpg'
import slideRfidWarehouse from '../../assets/hero-slide-rfid-warehouse.jpg'
import slideIotYard from '../../assets/hero-slide-iot-yard.jpg'
import slideDockMonitoring from '../../assets/hero-slide-dock-monitoring.jpg'
import slideDistributionCenter from '../../assets/hero-slide-distribution-center.jpg'
import slideFleetGps from '../../assets/hero-slide-fleet-gps.jpg'

const SLIDES = [
  {
    image: slideAiVisionIot,
    alt: 'AI-powered DockVision, YardVision, ForkliftVision, and ContainerVision system across a distribution center',
    layout: 'natural',
    title: 'Transform Logistics With AI-Powered Visibility',
    highlightWords: ['AI-Powered', 'Visibility'],
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
    title: 'DockVision AI — AI-Powered Dock Door Monitoring Solution',
    highlightWords: ['DockVision', 'AI-Powered'],
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

export default function Hero() {
  const [active, setActive] = useState(0)

  const goPrev = () => setActive((i) => (i - 1 + SLIDES.length) % SLIDES.length)
  const goNext = () => setActive((i) => (i + 1) % SLIDES.length)

  const slide = SLIDES[active]
  const isNatural = slide.layout === 'natural'

  const arrows = (
    <>
      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous slide"
        className="group absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 lg:h-11 lg:w-11 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/55"
      >
        <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label="Next slide"
        className="group absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 lg:h-11 lg:w-11 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/55"
      >
        <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6" />
      </button>
    </>
  )

  const dots = (
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
  )

  if (isNatural) {
    return (
      <section className="relative overflow-hidden bg-navy">
        <AnimatePresence mode="wait">
          <motion.div
            key={`natural-${active}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Desktop: full image, natural aspect, no crop */}
            <div className="relative hidden lg:block">
              <img src={slide.image} alt={slide.alt} className="block w-full h-auto" />
              {arrows}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

              <div className="absolute inset-x-0 top-[24%] bottom-[24%] z-10 flex flex-col items-center justify-center gap-3 px-14 sm:px-16 lg:px-20 text-center">
                <AnimatedText
                  as="h1"
                  scroll={false}
                  text={slide.title}
                  highlightWords={slide.highlightWords}
                  className="text-3xl md:text-4xl xl:text-5xl font-heading font-bold leading-tight text-white [text-shadow:0_4px_24px_rgba(0,0,0,0.9)]"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 z-10 flex h-[24%] flex-col items-center justify-center gap-4 px-6">
                <div className="flex items-center justify-center gap-4">
                  <Button to="/contact#contact-form" variant="primary-dark">
                    Book a demo
                  </Button>
                  <Button to="/solutions" variant="outline">
                    Explore solutions
                  </Button>
                </div>
                {dots}
              </div>
            </div>

            {/* Mobile/tablet: same fixed-height cropped pattern as every other slide */}
            <div className="relative h-[82vh] min-h-[560px] max-h-[760px] lg:hidden overflow-hidden">
              <img
                src={slide.image}
                alt={slide.alt}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/20" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-black/70 via-black/25 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 top-[20%] bottom-[20%] z-[5] bg-gradient-to-b from-transparent via-black/40 to-transparent" />

              {arrows}

              <div className="absolute inset-x-0 top-[24%] bottom-[24%] z-10 flex flex-col items-center justify-center gap-3 px-14 sm:px-16 text-center">
                <AnimatedText
                  as="h1"
                  scroll={false}
                  text={slide.title}
                  highlightWords={slide.highlightWords}
                  className="text-3xl md:text-4xl font-heading font-bold leading-tight text-white [text-shadow:0_4px_24px_rgba(0,0,0,0.9)]"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 h-[24%] z-10 flex flex-col items-center justify-center gap-4 px-6">
                <div className="flex items-center justify-center gap-4">
                  <Button to="/contact#contact-form" variant="primary-dark">
                    Book a demo
                  </Button>
                  <Button to="/solutions" variant="outline">
                    Explore solutions
                  </Button>
                </div>
                {dots}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
    )
  }

  return (
    <section className="relative h-[82vh] min-h-[560px] max-h-[760px] lg:h-auto lg:min-h-0 lg:max-h-none overflow-hidden bg-navy">
      <img src={slideAiVisionIot} alt="" aria-hidden="true" className="invisible hidden lg:block w-full h-auto" />
      <AnimatePresence mode="sync">
        <motion.img
          key={`sharp-${active}`}
          src={slide.image}
          alt={slide.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-black/20" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-black/70 via-black/25 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-[20%] bottom-[20%] z-[5] bg-gradient-to-b from-transparent via-black/40 to-transparent" />

      {arrows}

      <AnimatePresence mode="wait">
        <motion.div
          key={`text-${active}`}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 top-[24%] bottom-[24%] z-10 flex flex-col items-center justify-center gap-3 px-14 sm:px-16 lg:px-20 text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-gold text-sm font-semibold uppercase tracking-widest [text-shadow:0_2px_10px_rgba(0,0,0,0.9)]"
          >
            {slide.eyebrow}
          </motion.span>
          <AnimatedText
            as="h1"
            scroll={false}
            text={slide.title}
            highlightWords={slide.highlightWords}
            className="text-3xl md:text-4xl xl:text-5xl font-heading font-bold leading-tight text-white [text-shadow:0_4px_24px_rgba(0,0,0,0.9)]"
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden sm:block text-white text-base lg:text-lg max-w-2xl [text-shadow:0_2px_14px_rgba(0,0,0,0.9)]"
          >
            {slide.subtitle}
          </motion.p>
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 h-[24%] z-10 flex flex-col items-center justify-center gap-4 px-6"
      >
        <div className="flex items-center justify-center gap-4">
          <Button to="/contact#contact-form" variant="primary-dark">
            Book a demo
          </Button>
          <Button to="/solutions" variant="outline">
            Explore solutions
          </Button>
        </div>
        {dots}
      </motion.div>
    </section>
  )
}
