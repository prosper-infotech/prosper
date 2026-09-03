import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronDown,
  Warehouse,
  Boxes,
  Truck,
  Radio,
  Tag,
  Cpu,
  Eye,
  Users,
  Gauge,
  ShieldCheck,
  Lock,
  Cloud,
} from 'lucide-react'
import Button from '../components/ui/Button'
import SectionHeading from '../components/ui/SectionHeading'
import ServiceCard from '../components/ui/ServiceCard'
import StatCounter from '../components/ui/StatCounter'
import ClientShowcase from '../components/ui/ClientShowcase'
import { SHOW_CLIENTS } from '../data/clients'
import CTABand from '../components/ui/CTABand'
import Reveal from '../components/motion/Reveal'
import { NAV } from '../data/navigation'
import { REGIONS, WHY_CHOOSE } from '../data/company'
import { FLAG_COMPONENTS } from '../components/ui/RegionFlags'
import useDocumentTitle from '../hooks/useDocumentTitle'
import visionAISuiteImg from '../assets/new homepage image.png'
import wmsImg from '../assets/prosper wms.png'
import dockVisionImg from '../assets/dock vision.png'
import gateVisionImg from '../assets/gate vision ai.png'
import containerVisionImg from '../assets/container vision ai.png'
import forkliftVisionImg from '../assets/forklift vision ai.png'
import assetTrackingImg from '../assets/asset tracking.png'
import as400Img from '../assets/as400.png'
import videoAttendanceImg from '../assets/video based system.png'

const HERO_WORDS = ['Warehouse', 'Yard', 'Fleet', 'Container', 'Forklift']

const PRODUCTS = [
  {
    name: 'WMS',
    img: wmsImg,
    desc: 'RFID-powered receiving, put-away, picking, packing and dispatch, with real-time inventory across every warehouse.',
    to: '/lp/wms',
  },
  {
    name: 'DockVision',
    img: dockVisionImg,
    desc: 'AI cameras monitor every dock door, confirming safe loading and unloading without manual checks.',
    to: '/products/software#dockvision-ai',
  },
  {
    name: 'GateVision',
    img: gateVisionImg,
    desc: 'AI cameras and OCR automate gate check-in, container scanning and access control — no manual logging.',
    to: '/solutions/gate-yard-dock-vision-ai',
  },
  {
    name: 'ContainerVision',
    img: containerVisionImg,
    desc: 'AI cameras, OCR and GPS/RTK automate gate, yard and reach-stacker workflows — gate to departure.',
    to: '/lp/ai-powered-cfs',
  },
  {
    name: 'Forklift',
    img: forkliftVisionImg,
    desc: '8MP cameras, 3D depth sensing and Edge AI mounted on your forklifts confirm every pallet and location.',
    to: '/lp/forklift-vision-ai',
  },
  {
    name: 'Asset Tracking',
    img: assetTrackingImg,
    desc: 'RFID, GPS, BLE and LoRaWAN trackers feed one live dashboard, across the yard, warehouse and road.',
    to: '/lp/asset-tracking',
  },
  {
    name: 'AS400',
    img: as400Img,
    desc: 'RPG/RPGLE development, 24x7 support and modernization for the legacy systems your operation runs on.',
    to: '/lp/as400-development',
  },
  {
    name: 'Video Attendance',
    img: videoAttendanceImg,
    desc: 'Facial-recognition check-in replaces manual logs and buddy-punching with a live, auditable attendance record.',
    to: '/products/software#video-attendance',
  },
]

const TRUST_ITEMS = [
  { icon: Eye, label: 'Real-Time Visibility' },
  { icon: Gauge, label: 'Operational Efficiency' },
  { icon: ShieldCheck, label: 'Safety & Compliance' },
  { icon: Lock, label: 'Scalable & Secure' },
  { icon: Cloud, label: 'Cloud & Edge Ready' },
]

const solutions = NAV.find((item) => item.label === 'Solutions').children
const industries = NAV.find((item) => item.label === 'Industries').children

const HOME_ICONS = {
  'Warehouse Solutions': Warehouse,
  'Yard Solutions': Boxes,
  'Fleet Management': Truck,
  'RFID & GPS Solutions': Radio,
  'Asset Tracking': Tag,
  'Industrial IoT': Cpu,
  'AI & Computer Vision': Eye,
  'Workforce Management': Users,
}

const featuredSolutions = solutions.filter((s) => HOME_ICONS[s.label])

// Placeholder figures — replace with verified numbers before launch.
const STATS = [
  { value: '15+', label: 'Years of Engineering Experience' },
  { value: '500+', label: 'Devices Deployed' },
  { value: '50+', label: 'Enterprise Clients' },
  { value: '24/7', label: 'Support Coverage' },
]

export default function Home() {
  useDocumentTitle(
    'Prosper Infotech | AI-Powered RFID, GPS & IoT Logistics Solutions',
    'IoT, RFID, GPS, and AI-powered visibility for warehouses, yards, and fleets — real-time tracking, asset visibility, and logistics automation from Prosper Infotech.'
  )

  const [wordIndex, setWordIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % HERO_WORDS.length), 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fffdf6] to-[#fff8dc] pt-14 pb-16">
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
                <span className="relative block overflow-hidden" style={{ height: '1.15em' }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={HERO_WORDS[wordIndex]}
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      exit={{ y: '-100%', opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 text-gold-dark"
                    >
                      {HERO_WORDS[wordIndex]} Operations
                    </motion.span>
                  </AnimatePresence>
                </span>
                with our
                <br />
                AI+EdgeBox Platform
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 text-base text-ink-600 max-w-lg">
                We help transform warehouses, yards, fleets and container terminals by enhancing
                efficiency, capacity and real-time visibility across every operation.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  href="https://calendly.com/prosperinfotech-sales/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="hover:scale-105"
                >
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
      </section>

      <section className="bg-navy border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-9 grid gap-y-4 grid-cols-2 md:grid-cols-5">
          {TRUST_ITEMS.map(({ icon: Icon, label }, i) => (
            <div
              key={label}
              className={`flex items-center justify-center gap-2 text-center md:justify-start md:px-4 ${
                i > 0 ? 'md:border-l md:border-white/10' : ''
              }`}
            >
              <Icon className="h-4.5 w-4.5 shrink-0 text-gold" />
              <span className="text-xs font-semibold text-white">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-12">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest border-b-2 border-gold-dark pb-2 inline-block">
              Our Platform
            </span>
            <h2 className="mt-3 text-3xl md:text-[38px] md:leading-[44px] md:whitespace-nowrap">
              One AI platform. Every operation, automated.
            </h2>
            <p className="mt-3 max-w-2xl text-ink-600 text-lg">
              Purpose-built products, engineered on AI, computer vision and RFID/GPS — each
              solving one part of your operation end to end.
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
                  Tell us about your warehouse, yard or terminal and we&rsquo;ll map the right
                  products to your operation — free consultation, no obligation.
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

      <section className="relative bg-surface-alt overflow-hidden">
        <div className="pointer-events-none absolute top-1/2 left-0 h-72 w-72 -translate-x-1/3 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              <div className="relative">
                <div className="pointer-events-none absolute -inset-3 rounded-2xl border border-gold/20" />
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/aU3I6Tw6S5I?autoplay=1&mute=1&playsinline=1"
                    title="About Prosper Infotech"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15} className="flex flex-col gap-5">
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-[38px] md:leading-[44px]">
                Engineering AI, IoT &amp; Logistics Solutions for Real-World Operations
              </h2>
              <p className="text-ink-600 text-lg">
                For more than a decade, Prosper Infotech has been designing, developing,
                integrating, and supporting technology solutions for logistics, warehousing,
                transportation, CFS/container terminals, manufacturing, and enterprise
                operations.
              </p>
              <p className="text-ink-600 text-lg">
                Our engineering teams across the USA, India, and Japan bring together deep
                expertise in Artificial Intelligence, Computer Vision, OCR, RFID, GPS/RTK,
                Industrial IoT, Edge Computing, cloud platforms, and enterprise software
                development.
              </p>
              <p className="text-ink-600 text-lg">
                From intelligent gates and yards to warehouses, docks, forklifts, containers,
                assets, and legacy enterprise systems, we help customers connect physical
                operations with real-time digital intelligence.
              </p>
              <Button to="/about" variant="primary-dark" className="self-start mt-2">
                Learn more about us
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-16">
          <SectionHeading title="Global Engineering. Local Accountability." className="mb-12" />
          <div className="grid gap-6 sm:grid-cols-3">
            {REGIONS.map(({ flagKey, country, description }, i) => {
              const Flag = FLAG_COMPONENTS[flagKey]
              return (
                <Reveal key={country} delay={i * 0.1}>
                  <div className="h-full flex items-start gap-4 rounded-2xl border border-ink-300 bg-white p-6 shadow-sm hover:-translate-y-1.5 hover:shadow-[0_0_50px_-8px_rgba(247,221,0,0.35),0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-300">
                    <Flag />
                    <div>
                      <h3 className="font-heading font-bold text-lg text-primary">{country}</h3>
                      <p className="mt-1.5 text-sm text-ink-600">{description}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <Reveal className="mt-12">
            <div className="rounded-2xl bg-gradient-to-b from-primary-dark to-navy border border-white/10 shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {WHY_CHOOSE.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.title}
                      className={`flex flex-col items-center text-center gap-3 px-6 py-10 ${
                        i > 0 ? 'lg:border-l lg:border-white/10' : ''
                      }`}
                    >
                      <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold/60 text-gold">
                        <Icon className="h-7 w-7" />
                      </span>
                      <h3 className="font-heading font-bold text-lg text-white">{item.title}</h3>
                      <p className="text-sm text-white/70">{item.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy py-14 overflow-hidden">
        <p className="text-center text-xs md:text-sm font-semibold uppercase tracking-widest text-ink-300 mb-8 px-6">
          Industries We Work With
        </p>
        <div
          className="relative overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <div className="flex w-max animate-marquee items-center gap-12 md:gap-16">
            {[...industries, ...industries].map((industry, i) => (
              <span key={i} className="flex items-center gap-12 md:gap-16 whitespace-nowrap">
                <span className="text-lg md:text-xl font-heading font-semibold text-white/70">
                  {industry.label}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-gold/50" />
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <SectionHeading eyebrow="What we do" title="Solutions built for your operation" />
        <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {featuredSolutions.map((s, i) => (
            <Reveal key={s.path} delay={(i % 4) * 0.08}>
              <ServiceCard
                icon={HOME_ICONS[s.label]}
                title={s.label}
                description={s.description}
                to={s.path}
              />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Button to="/solutions" variant="primary-dark">
            View all Solutions
          </Button>
        </Reveal>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-primary-dark via-navy to-[#081a3d] px-8 py-14 md:px-16 md:py-16">
              <div className="pointer-events-none absolute -top-24 -right-16 h-[420px] w-[420px] rounded-full bg-gold/25 blur-[110px]" />
              <div className="pointer-events-none absolute top-1/2 left-1/3 h-[320px] w-[320px] -translate-y-1/2 rounded-full bg-gold-dark/15 blur-[100px]" />
              <div className="pointer-events-none absolute -bottom-28 -left-20 h-[380px] w-[380px] rounded-full bg-[#3a5a99]/40 blur-[110px]" />

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
                  {STATS.map((stat) => (
                    <div key={stat.label}>
                      <StatCounter value={stat.value} label={stat.label} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {SHOW_CLIENTS && (
        <section className="max-w-5xl mx-auto px-6 py-20">
          <SectionHeading eyebrow="Trusted by" title="Clients who rely on us" />
          <div className="mt-12">
            <ClientShowcase />
          </div>
        </section>
      )}

      <CTABand
        title="Ready to get accurate, real-time visibility?"
        description="Talk to our team about RFID, GPS, and IoT solutions built for your operation."
      />
    </>
  )
}
