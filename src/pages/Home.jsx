import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronDown,
  ArrowRight,
  Phone,
  MapPin,
  Menu,
  X,
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
import WhatsAppButton from '../components/layout/WhatsAppButton'
import FloatingCallButton from '../components/layout/FloatingCallButton'
import { SHOW_CLIENTS } from '../data/clients'
import CTABand from '../components/ui/CTABand'
import Reveal from '../components/motion/Reveal'
import { NAV } from '../data/navigation'
import { SOCIAL_LINKS } from '../data/socialLinks'
import { OFFICES } from '../data/offices'
import { REGIONS, WHY_CHOOSE } from '../data/company'
import { FLAG_COMPONENTS } from '../components/ui/RegionFlags'
import useDocumentTitle from '../hooks/useDocumentTitle'
import useAnalyticsPageView from '../hooks/useAnalyticsPageView'
import useScrollToHash from '../hooks/useScrollToHash'
import logo from '../assets/logo-light.png'
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

const NAV_ITEMS = NAV.filter((item) => !item.hideFromNav && item.path !== '/' && item.label !== 'Industries').map(
  (item) => (item.label === 'Resources' ? { ...item, label: 'Company' } : item)
)

function NavDropdown({ item, align }) {
  const groups = item.children
  const hasNestedGroups = groups.some((group) => group.children)

  return (
    <div
      className={`invisible absolute top-full z-50 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 ${
        align === 'right' ? 'right-0' : 'left-1/2 -translate-x-1/2'
      }`}
    >
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-primary-dark to-[#081a3d] p-8 shadow-[0_32px_64px_-16px_rgba(8,26,61,0.5)]">
        {hasNestedGroups ? (
          <div
            className="grid gap-x-14 gap-y-1"
            style={{ gridTemplateColumns: `repeat(${groups.length}, minmax(190px, 1fr))` }}
          >
            {groups.map((group) => (
              <div key={group.path}>
                <Link
                  to={group.path}
                  className="mb-4 block text-xs font-bold uppercase tracking-widest text-white/40 hover:text-gold"
                >
                  {group.label}
                </Link>
                <ul className="flex flex-col gap-3">
                  {(group.children ?? []).map((child) => (
                    <li key={child.path}>
                      <Link to={child.path} className="block text-sm font-medium text-white/90 hover:text-gold">
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="grid gap-x-10 gap-y-1"
            style={{
              gridTemplateColumns: `repeat(${groups.length > 8 ? 3 : groups.length > 4 ? 2 : 1}, minmax(200px, 1fr))`,
            }}
          >
            {groups.map((child) => (
              <Link
                key={child.path}
                to={child.path}
                className="rounded-lg px-2 py-2 text-sm font-semibold text-white/90 hover:bg-white/5 hover:text-gold"
              >
                {child.label}
                {child.description && (
                  <span className="mt-0.5 block text-xs font-normal text-white/40">{child.description}</span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function HomeHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openAccordion, setOpenAccordion] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen ? 'bg-[#fffdf6]/90 backdrop-blur-md shadow-[0_1px_0_rgba(20,52,109,0.06)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-6">
        <Link to="/" className="shrink-0" onClick={() => setMobileOpen(false)}>
          <img src={logo} alt="Prosper Infotech" className="h-11 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-auto">
          {NAV_ITEMS.map((item, i) => (
            <div key={item.path} className="group relative">
              <Link
                to={item.path}
                className="relative flex items-center gap-1 whitespace-nowrap px-4 py-2 text-[15px] font-medium text-ink-900 transition-colors hover:text-primary"
              >
                {item.label}
                {item.children && (
                  <ChevronDown className="h-4 w-4 text-ink-500 transition-transform group-hover:rotate-180" />
                )}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 origin-left scale-x-0 rounded-full bg-gold-dark transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
              {item.children && (
                <NavDropdown item={item} align={i >= NAV_ITEMS.length - 2 ? 'right' : 'center'} />
              )}
            </div>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden lg:inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ink-900/70 px-5 py-2.5 text-sm font-semibold text-ink-900 transition-all duration-200 hover:scale-105 hover:border-primary hover:bg-primary hover:text-white"
        >
          Book A Demo
          <ArrowRight className="h-4 w-4" />
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-900/20 text-ink-900 lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="max-h-[calc(100vh-88px)] overflow-y-auto border-t border-ink-300/40 bg-[#fffdf6] px-6 py-4 lg:hidden">
          <nav className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <div key={item.path} className="border-b border-ink-300/40 last:border-b-0">
                <div className="flex items-center justify-between">
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 py-3 text-[15px] font-medium text-ink-900"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      onClick={() => setOpenAccordion((cur) => (cur === item.path ? null : item.path))}
                      aria-label={`Toggle ${item.label} submenu`}
                      className="flex h-10 w-10 items-center justify-center text-ink-500"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${openAccordion === item.path ? 'rotate-180' : ''}`}
                      />
                    </button>
                  )}
                </div>
                {item.children && openAccordion === item.path && (
                  <ul className="flex flex-col gap-1 pb-3 pl-4">
                    {item.children.map((child) => (
                      <li key={child.path}>
                        <Link
                          to={child.path}
                          onClick={() => setMobileOpen(false)}
                          className="block py-1.5 text-sm text-ink-600 hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 flex items-center justify-center gap-1.5 rounded-full border border-ink-900/70 px-5 py-2.5 text-sm font-semibold text-ink-900"
          >
            Book A Demo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </header>
  )
}

const FOOTER_COLUMNS = NAV.filter((item) => item.children).slice(0, 3)

function HomeFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-ink-300/60">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 lg:grid-cols-[1.1fr_2fr]">
        <div>
          <Link to="/" className="inline-flex items-center">
            <img src={logo} alt="Prosper Infotech" className="h-14 w-auto" />
          </Link>
          <p className="mt-4 text-sm font-semibold text-ink-900">
            Automating global logistics operations using AI.
          </p>
          <p className="mt-3 max-w-sm text-sm text-ink-500">
            Prosper Infotech engineers AI, computer vision, RFID, GPS and IoT platforms that bring real-time
            visibility and automation to warehouses, yards, fleets and container terminals.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-300 text-ink-600 transition-all duration-200 hover:-translate-y-0.5 hover:scale-110 hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {FOOTER_COLUMNS.slice(0, 2).map((column, i) => (
            <div key={column.path} className={i === 1 ? 'flex flex-col gap-8' : undefined}>
              <div>
                <h3 className="mb-4 font-heading font-semibold text-primary">{column.label}</h3>
                <ul className="flex flex-col gap-2.5">
                  {column.children.slice(0, 7).map((child) => (
                    <li key={child.path}>
                      <Link to={child.path} className="text-sm text-ink-600 hover:text-primary">
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {i === 1 && FOOTER_COLUMNS[2] && (
                <div>
                  <h3 className="mb-4 font-heading font-semibold text-primary">{FOOTER_COLUMNS[2].label}</h3>
                  <ul className="flex flex-col gap-2.5">
                    {FOOTER_COLUMNS[2].children.slice(0, 7).map((child) => (
                      <li key={child.path}>
                        <Link to={child.path} className="text-sm text-ink-600 hover:text-primary">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          <div>
            <h3 className="mb-4 font-heading font-semibold text-primary">Contact</h3>
            <ul className="flex flex-col gap-4">
              {OFFICES.map((office) => (
                <li key={office.country} className="text-sm text-ink-600">
                  <div className="font-semibold text-ink-900">{office.country}</div>
                  <a href={`tel:${office.phone.replace(/\s+/g, '')}`} className="mt-1 flex items-center gap-2 hover:text-primary">
                    <Phone className="h-3.5 w-3.5 shrink-0 text-gold-dark" />
                    <span>{office.phone}</span>
                  </a>
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 flex items-start gap-2 hover:text-primary"
                  >
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-dark" />
                    <span>{office.address}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-300/60">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-ink-500 sm:flex-row">
          <span>&copy; {year} Prosper Infotech. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link to="/about" className="transition-colors hover:text-primary">
              About Us
            </Link>
            <Link to="/privacy-policy" className="transition-colors hover:text-primary">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  useDocumentTitle(
    'Prosper Infotech | AI-Powered RFID, GPS & IoT Logistics Solutions',
    'IoT, RFID, GPS, and AI-powered visibility for warehouses, yards, and fleets — real-time tracking, asset visibility, and logistics automation from Prosper Infotech.'
  )
  useAnalyticsPageView()
  useScrollToHash()

  const [wordIndex, setWordIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % HERO_WORDS.length), 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <HomeHeader />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b from-[#fffdf6] to-[#fff8dc] pt-6 pb-10">
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
      </main>

      <HomeFooter />
      <WhatsAppButton />
      <FloatingCallButton />
    </div>
  )
}
