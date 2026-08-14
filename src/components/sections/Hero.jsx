import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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
    title: 'Transform Logistics With AI-Powered Visibility',
    highlightWords: ['AI-Powered', 'Visibility'],
  },
  {
    image: slideDockAi,
    alt: 'AI and drone-powered dock and yard automation',
    title: 'AI-Powered Yard & Dock Automation',
    highlightWords: ['AI-Powered', 'Automation'],
  },
  {
    image: slideRfidWarehouse,
    alt: 'RFID-powered warehouse inventory tracking',
    title: 'RFID-Driven Warehouse Intelligence',
    highlightWords: ['RFID-Driven', 'Intelligence'],
  },
  {
    image: slideIotYard,
    alt: 'IoT-connected yard and trailer tracking network',
    title: 'End-to-End IoT Yard Tracking',
    highlightWords: ['End-to-End', 'IoT'],
  },
  {
    image: slideDockMonitoring,
    alt: 'Smart dock door status monitoring inside a warehouse',
    title: 'DockVision AI — AI-Powered Dock Door Monitoring Solution',
    highlightWords: ['DockVision', 'AI-Powered'],
  },
  {
    image: slideDistributionCenter,
    alt: 'Aerial view of a large distribution center with IoT-tracked dock doors',
    title: 'Enterprise-Scale Distribution Center Visibility',
    highlightWords: ['Enterprise-Scale', 'Visibility'],
  },
  {
    image: slideFleetGps,
    alt: 'GPS-tracked truck on the highway with live telemetry',
    title: 'GPS & Fleet Tracking, Anywhere On The Road',
    highlightWords: ['GPS', 'Fleet Tracking'],
  },
]

export default function Hero() {
  const [active, setActive] = useState(0)

  const goPrev = () => setActive((i) => (i - 1 + SLIDES.length) % SLIDES.length)
  const goNext = () => setActive((i) => (i + 1) % SLIDES.length)

  const slide = SLIDES[active]

  return (
    <section className="relative overflow-hidden bg-navy">
      <AnimatePresence mode="wait">
        <motion.div
          key={`slide-${active}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            <img src={slide.image} alt={slide.alt} className="block w-full h-auto" />

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

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[max(16%,72px)] bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 z-10 flex h-[max(10%,56px)] flex-col items-center justify-center gap-1.5 px-6">
              <AnimatedText
                as="h1"
                scroll={false}
                text={slide.title}
                highlightWords={slide.highlightWords}
                className="text-xs sm:text-sm lg:text-base xl:text-lg font-heading font-bold leading-tight text-white text-center [text-shadow:0_2px_10px_rgba(0,0,0,0.9)]"
              />
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
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
