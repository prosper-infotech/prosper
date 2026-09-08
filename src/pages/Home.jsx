import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ChevronDown, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Button from '../components/ui/Button'
import Reveal from '../components/motion/Reveal'
import useDocumentTitle from '../hooks/useDocumentTitle'
import wmsImg from '../assets/prosper wms.png'
import containerVisionImg from '../assets/container vision ai.png'
import gateVisionImg from '../assets/gate vision ai.png'
import videoAttendanceImg from '../assets/video based system.png'
import dockVisionImg from '../assets/dock vision.png'
import forkliftVisionImg from '../assets/forklift vision ai.png'
import assetTrackingImg from '../assets/asset tracking.png'
import as400Img from '../assets/as400.png'
import visionAISuiteImg from '../assets/new homepage image.png'
import ctaSuiteImg from '../assets/Ready to streamlime.png'
import heroSlideAiVisionIot from '../assets/hero-slide-ai-vision-iot.jpg'
import heroSlideRfidWarehouse from '../assets/hero-slide-rfid-driven-warehouse.jpg'
import heroSlideDockMonitoring from '../assets/hero-slide-dock-monitoring.jpg'
import heroSlideCfs from '../assets/hero-slide-cfs.jpg'
import heroSlideForklift from '../assets/hero-slide-forklift.jpg'
import heroSlideAssetTracking from '../assets/hero-slide-asset-tracking.jpg'

const HERO_SLIDES = [
  {
    image: heroSlideAiVisionIot,
    alt: 'AI-powered DockVision, YardVision, ForkliftVision, and ContainerVision system across a distribution center',
    eyebrow: 'AI-Powered Visibility',
    title: 'Transform Logistics With AI-Powered Visibility',
    subtitle: 'GateVision, YardVision, DockVision, ForkliftVision and ContainerVision AI connected across your operation.',
  },
  {
    image: heroSlideRfidWarehouse,
    alt: 'RFID-powered warehouse inventory tracking with real-time rack location and pallet detection',
    eyebrow: 'RFID Warehouse Intelligence',
    title: 'RFID-Driven Warehouse Intelligence',
    subtitle: 'Scan, track, and count every pallet automatically — no manual audits, no guesswork.',
  },
  {
    image: heroSlideDockMonitoring,
    alt: 'Smart dock door status monitoring inside a warehouse',
    eyebrow: 'Dock Operations',
    title: 'DockVision AI — AI-Powered Dock Door Monitoring',
    subtitle: 'Live dock status, automated alerts, and real-time dashboards right on the floor.',
  },
  {
    image: heroSlideCfs,
    alt: 'AI-powered CFS and container terminal automation with OCR and GPS tracking',
    eyebrow: 'Container Terminal Automation',
    title: 'AI-Powered CFS & Container Terminal Automation',
    subtitle: 'Smart container visibility from gate arrival to yard movement.',
  },
  {
    image: heroSlideForklift,
    alt: 'ForkliftVision AI sensor module automating pallet pickup in a warehouse',
    eyebrow: 'AI-Powered Warehouse Automation',
    title: 'ForkliftVision AI',
    subtitle: 'Automate pallet pickup, putaway, staging, and trailer loading with OCR, 3D depth sensing, and Edge AI.',
  },
  {
    image: heroSlideAssetTracking,
    alt: 'RFID, GPS, BLE and LoRaWAN asset tracking system architecture with a live fleet dashboard',
    eyebrow: 'Asset & Fleet Tracking',
    title: 'Know Where Every Asset Is, Always',
    subtitle: 'RFID, GPS, BLE, and LoRaWAN trackers feed one live dashboard — across the yard, the warehouse, and the road.',
  },
]

const PRODUCTS = [
  {
    name: 'ContainerVision',
    tag: 'Container Terminals',
    img: containerVisionImg,
    desc: 'AI cameras, OCR and GPS/RTK automate gate, yard and reach-stacker workflows — gate to departure.',
    to: '/products/software/containervision-ai',
  },
  {
    name: 'Forklift',
    tag: 'Pallet & Location',
    img: forkliftVisionImg,
    desc: '8MP cameras, 3D depth sensing and Edge AI mounted on your forklifts confirm every pallet and location.',
    to: '/solutions/ai-computer-vision',
  },
  {
    name: 'WMS',
    tag: 'Warehouse',
    img: wmsImg,
    desc: 'RFID-powered receiving, put-away, picking, packing and dispatch, with real-time inventory across every warehouse.',
    to: '/products/software/wms',
  },
  {
    name: 'Asset Tracking',
    tag: 'RFID & GPS',
    img: assetTrackingImg,
    desc: 'RFID, GPS, BLE and LoRaWAN trackers feed one live dashboard, across the yard, warehouse and road.',
    to: '/products/software/asset-tracking',
  },
  {
    name: 'GateVision',
    tag: 'Gate & OCR',
    img: gateVisionImg,
    desc: 'AI cameras and OCR automate gate check-in, container scanning and access control — no manual logging.',
    to: '/solutions/gate-yard-dock-vision-ai',
  },
  {
    name: 'DockVision',
    tag: 'Dock & Loading',
    img: dockVisionImg,
    desc: 'AI cameras monitor every dock door, confirming safe loading and unloading without manual checks.',
    to: '/products/software/dockvision-ai',
  },
  {
    name: 'Video Attendance',
    tag: 'Workforce',
    img: videoAttendanceImg,
    desc: 'Facial-recognition check-in replaces manual logs and buddy-punching with a live, auditable attendance record.',
    to: '/products/software/video-attendance',
  },
  {
    name: 'AS400',
    tag: 'IBM i / AS400',
    img: as400Img,
    desc: 'RPG/RPGLE development, 24x7 support and modernization for the legacy systems your operation runs on.',
    to: '/ibm-i-as400',
  },
]

function AnimatedStat({ value, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const numeric = parseInt(value.match(/^\d+/)?.[0] ?? '0', 10)
  const suffix = value.replace(/^\d+/, '')
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1200
    const start = performance.now()
    let frame
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setCount(Math.round(numeric * progress))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, numeric])

  return (
    <div ref={ref}>
      <div className="text-4xl md:text-5xl font-extrabold text-white">
        {count}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-white/70">{label}</div>
    </div>
  )
}

export default function Home() {
  useDocumentTitle(
    'Prosper Infotech | AI-Powered RFID, GPS & IoT Logistics Solutions',
    'IoT, RFID, GPS, and AI-powered visibility for warehouses, yards, and fleets — real-time tracking, asset visibility, and logistics automation from Prosper Infotech.'
  )

  const totalHeroSlides = HERO_SLIDES.length + 1
  const [activeSlide, setActiveSlide] = useState(0)
  const [heroHover, setHeroHover] = useState(false)
  useEffect(() => {
    if (heroHover) return
    const timer = setTimeout(() => setActiveSlide((i) => (i + 1) % totalHeroSlides), 6000)
    return () => clearTimeout(timer)
  }, [activeSlide, heroHover, totalHeroSlides])
  const goPrevSlide = () => setActiveSlide((i) => (i - 1 + totalHeroSlides) % totalHeroSlides)
  const goNextSlide = () => setActiveSlide((i) => (i + 1) % totalHeroSlides)

  return (
    <div className="bg-gradient-to-b from-[#fffdf6] to-[#fff8dc]">
      {/* Hero */}
      <div className="relative" onMouseEnter={() => setHeroHover(true)} onMouseLeave={() => setHeroHover(false)}>
        <AnimatePresence mode="wait">
          {activeSlide === 0 ? (
            <motion.section
              key="hero-slide-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden pt-6 pb-10"
            >
              <motion.div
                className="pointer-events-none absolute top-[-120px] right-[-80px] h-[480px] w-[480px] rounded-full bg-gold/20 blur-3xl"
                animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center gap-10">
                <div className="md:flex-1">
                  <Reveal>
                    <span className="inline-flex items-center gap-2 rounded-full bg-gold/25 border border-gold-dark/40 px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-widest text-primary-dark">
                      AI-Powered Logistics Platform
                    </span>
                  </Reveal>
                  <Reveal delay={0.08}>
                    <h1 className="mt-5 text-2xl sm:text-3xl md:text-[27px] lg:text-[42px] font-extrabold leading-tight tracking-tight">
                      Automate and
                      <br />
                      Optimize Your
                      <br />
                      <span className="text-gold-dark">Logistic Operations</span>
                      <br />
                      with our
                      <br />
                      AI+EdgeBox Platform
                    </h1>
                  </Reveal>
                  <Reveal delay={0.16}>
                    <p className="mt-5 text-base text-ink-600 max-w-lg">
                      We help transform warehouses, yards, fleets and container terminals by enhancing efficiency, capacity and real-time visibility across every operation.
                    </p>
                  </Reveal>
                  <Reveal delay={0.24}>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <Button href="https://calendly.com/prosperinfotech-sales/30min" target="_blank" rel="noopener noreferrer" variant="primary" className="hover:scale-105">
                        Book a Demo
                      </Button>
                      <Button to="/solutions" variant="outline-dark" className="hover:scale-105">
                        Learn More
                      </Button>
                    </div>
                  </Reveal>
                </div>

                <Reveal delay={0.2} className="md:w-[350px] md:shrink-0 lg:w-[660px]">
                  <img
                    src={visionAISuiteImg}
                    alt="Prosper Vision AI suite: GateVision, YardVision, DockVision, ContainerVision and ForkliftVision AI connected across a warehouse, yard and container terminal"
                    className="w-full"
                  />
                </Reveal>
              </div>
            </motion.section>
          ) : (
            <motion.section
              key={`hero-slide-${activeSlide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden aspect-[1920/823]"
            >
              <img
                src={HERO_SLIDES[activeSlide - 1].image}
                alt={HERO_SLIDES[activeSlide - 1].alt}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-black/40 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-6 text-center">
                <span className="text-gold text-sm font-semibold uppercase tracking-widest [text-shadow:0_2px_10px_rgba(0,0,0,0.9)]">
                  {HERO_SLIDES[activeSlide - 1].eyebrow}
                </span>
                <h2 className="max-w-3xl text-3xl md:text-4xl xl:text-5xl font-heading font-bold leading-tight text-white [text-shadow:0_4px_24px_rgba(0,0,0,0.9)]">
                  {HERO_SLIDES[activeSlide - 1].title}
                </h2>
                <p className="max-w-2xl text-white text-base lg:text-lg [text-shadow:0_2px_14px_rgba(0,0,0,0.9)]">
                  {HERO_SLIDES[activeSlide - 1].subtitle}
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-4">
                  <Button href="https://calendly.com/prosperinfotech-sales/30min" target="_blank" rel="noopener noreferrer" variant="primary-dark">
                    Book a Demo
                  </Button>
                  <Button to="/solutions" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <div className="relative max-w-7xl mx-auto px-6 flex items-center justify-center gap-4 py-4">
          <button
            type="button"
            onClick={goPrevSlide}
            aria-label="Previous slide"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/20 text-primary transition-colors hover:bg-primary hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalHeroSlides }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveSlide(i)}
                aria-label={`Show slide ${i + 1}`}
                className="p-1.5 -m-1.5"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === activeSlide ? 'w-6 bg-gold-dark' : 'w-1.5 bg-primary/20 hover:bg-primary/40'
                  }`}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={goNextSlide}
            aria-label="Next slide"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/20 text-primary transition-colors hover:bg-primary hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Product suite */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-12">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest border-b-2 border-gold-dark pb-2 inline-block">
              Our Platform
            </span>
            <h2 className="mt-3 text-3xl md:text-[38px] md:leading-[44px] md:whitespace-nowrap">One AI platform. Every operation, automated.</h2>
            <p className="mt-3 max-w-2xl text-ink-600 text-lg">
              Five purpose-built products, engineered on AI, computer vision and RFID/GPS &mdash; each solving one part of your operation end to end.
            </p>
          </Reveal>

          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 0.08}>
                <Link
                  to={p.to}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-gold-dark/25 bg-gradient-to-br from-[#fffdf0] to-[#fff6d6] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(20,52,109,0.25)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[22px] font-extrabold leading-tight">
                      <span className="text-gold-dark">Prosper</span> {p.name}
                    </h3>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/20 text-primary transition-all duration-200 group-hover:-rotate-45 group-hover:bg-primary group-hover:text-gold">
                      <ChevronDown className="h-4 w-4 -rotate-90" />
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-ink-600 max-w-[85%]">{p.desc}</p>
                  <div className="relative mt-4 flex flex-1 items-end justify-center pt-4">
                    <div className="pointer-events-none absolute bottom-[-10%] left-1/2 h-[220px] w-[220px] -translate-x-1/2 rounded-full bg-gold/35 blur-3xl" />
                    <img
                      src={p.img}
                      alt={`Isometric render representing Prosper ${p.name}`}
                      className="relative w-full max-w-[230px] drop-shadow-[0_14px_18px_rgba(20,52,109,0.18)] transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}

            <Reveal delay={0.24}>
              <div className="flex h-full flex-col rounded-[22px] bg-gradient-to-br from-primary to-primary-dark p-6 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(20,52,109,0.5)]">
                <h3 className="text-[22px] font-extrabold leading-tight">Not sure where to start?</h3>
                <p className="mt-2 text-sm text-white/75">
                  Tell us about your warehouse, yard or terminal and we&rsquo;ll map the right products to your operation &mdash; free consultation, no obligation.
                </p>
                <Button
                  href="https://calendly.com/prosperinfotech-sales/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="mt-6 self-start"
                >
                  Talk to an engineer
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Solutions gallery */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid gap-14 lg:grid-cols-[1fr_0.85fr] items-center">
          <Reveal>
            <span className="text-primary text-sm font-semibold uppercase tracking-widest border-b-2 border-gold-dark pb-2 inline-block">
              Our Solutions
            </span>
            <h2 className="mt-6 text-3xl md:text-[42px] md:leading-[1.22] font-extrabold">
              Our solutions are engineered to transform your operations into AI-smart workflows
            </h2>
            <p className="mt-6 text-lg text-ink-600 max-w-md">
              Harness the power of our AI platform &mdash; built on <b className="text-ink-900 font-bold">computer vision, RFID and GPS</b> &mdash; for solutions that are comprehensive and tailored to your operation.
            </p>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <Button to="/solutions" variant="outline-dark">
                Discover Our Solutions
              </Button>
              <Button href="https://calendly.com/prosperinfotech-sales/30min" target="_blank" rel="noopener noreferrer" variant="primary">
                Book a Demo
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative mx-auto w-full max-w-[400px] aspect-[4/5]">
              <div className="absolute inset-0 rounded-[26px] bg-gradient-to-br from-primary to-primary-dark shadow-[0_30px_60px_-22px_rgba(20,52,109,0.3)]" style={{ transform: 'rotate(8deg) translate(26px, -6px)' }} />
              <div className="absolute inset-0 rounded-[26px] bg-gradient-to-br from-[#ffe94d] to-gold-dark shadow-[0_30px_60px_-22px_rgba(20,52,109,0.3)]" style={{ transform: 'rotate(4deg) translate(13px, -3px)' }} />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3.5 rounded-[26px] border-2 border-dashed border-primary/30 bg-gradient-to-br from-[#fffdf3] to-[#fff1c4] p-8 text-center shadow-[0_30px_60px_-22px_rgba(20,52,109,0.3)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-11 w-11 text-ink-500 opacity-45">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span className="text-sm font-bold text-primary">Solutions gallery</span>
                <small className="text-xs text-ink-500">Real site &mdash; drop in operation photos here</small>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-primary-dark via-navy to-[#081a3d] px-8 py-14 md:px-16 md:py-16">
              <motion.div
                className="pointer-events-none absolute -top-24 -right-16 h-[420px] w-[420px] rounded-full bg-gold/25 blur-[110px]"
                animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="pointer-events-none absolute top-1/2 left-1/3 h-[320px] w-[320px] -translate-y-1/2 rounded-full bg-gold-dark/15 blur-[100px]" />
              <motion.div
                className="pointer-events-none absolute -bottom-28 -left-20 h-[380px] w-[380px] rounded-full bg-[#3a5a99]/40 blur-[110px]"
                animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              />

              <div className="relative grid gap-12 lg:grid-cols-[1fr_1fr] items-center">
                <h2 className="text-4xl md:text-[44px] font-extrabold leading-[1.15] text-white">
                  Driving
                  <br />
                  Real Efficiency &amp;
                  <br />
                  Building
                  <br />
                  Lasting Value
                </h2>

                <div className="grid grid-cols-2 gap-x-10 gap-y-10">
                  {[
                    ['15+', 'Years of Engineering Experience'],
                    ['500+', 'Devices Deployed'],
                    ['50+', 'Enterprise Clients'],
                    ['24/7', 'Support Coverage'],
                  ].map(([value, label]) => (
                    <AnimatedStat key={label} value={value} label={label} />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#fffdf0] via-[#fff3c4] to-[#ffe58a] px-8 py-12 md:px-14 md:py-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-center">
              <div>
                <h2 className="text-3xl md:text-[40px] font-extrabold leading-tight text-primary">
                  Ready to Streamline
                  <br />
                  Your Operations?
                </h2>
                <p className="mt-4 max-w-md text-lg text-ink-600">
                  We&rsquo;re here to help transform your operations with a bespoke solution, engineered to address your unique warehouse, yard, fleet and terminal challenges.
                </p>
                <a
                  href="https://calendly.com/prosperinfotech-sales/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-primary-dark"
                >
                  Book A Demo
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <motion.img
                src={ctaSuiteImg}
                alt="Prosper Vision AI suite connected across a warehouse, gate, yard, container terminal and AS400 modernization services"
                className="w-full"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
