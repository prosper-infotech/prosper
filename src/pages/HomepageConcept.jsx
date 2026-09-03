import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ArrowRight } from 'lucide-react'
import Button from '../components/ui/Button'
import Reveal from '../components/motion/Reveal'
import { NAV } from '../data/navigation'
import { SOCIAL_LINKS } from '../data/socialLinks'
import useDocumentTitle from '../hooks/useDocumentTitle'
import logo from '../assets/logo-light.png'
import wmsImg from '../assets/prosper wms.png'
import containerVisionImg from '../assets/container vision ai.png'
import forkliftVisionImg from '../assets/forklift vision ai.png'
import assetTrackingImg from '../assets/asset tracking.png'
import as400Img from '../assets/as400.png'
import visionAISuiteImg from '../assets/new homepage image.png'

const HERO_WORDS = ['Warehouse', 'Yard', 'Fleet', 'Container', 'Forklift']

// Decorative particle field for the stats band: a fan of arcs sweeping
// up-right from a focal point, plus two denser corner clusters.
const STAT_DOT_FIELD = (() => {
  const dots = []
  const cx = 260
  const cy = 520
  const startAngle = -8
  const endAngle = 78
  const minR = 70
  const maxR = 760
  const ringCount = 34

  for (let ring = 0; ring < ringCount; ring++) {
    const r = minR + (ring / (ringCount - 1)) * (maxR - minR)
    const spacingDeg = Math.max(2.2, 420 / r)
    for (let angle = startAngle; angle <= endAngle; angle += spacingDeg) {
      const rad = (angle * Math.PI) / 180
      const x = cx + r * Math.cos(rad)
      const y = cy - r * Math.sin(rad)
      if (x < -20 || x > 920 || y < -20 || y > 540) continue
      const t = (r - minR) / (maxR - minR)
      dots.push({ x, y, r: 0.7 + t * 2.1, opacity: 0.1 + t * 0.5 })
    }
  }

  const clusters = [
    { cx: 830, cy: 60, spread: 130, count: 90, maxSize: 3.4 },
    { cx: 40, cy: 40, spread: 70, count: 40, maxSize: 2.4 },
  ]
  clusters.forEach(({ cx: ccx, cy: ccy, spread, count, maxSize }) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const dist = Math.random() * spread
      dots.push({
        x: ccx + Math.cos(angle) * dist,
        y: ccy + Math.sin(angle) * dist,
        r: 0.6 + Math.random() * maxSize,
        opacity: 0.25 + Math.random() * 0.6,
      })
    }
  })

  return dots
})()

const PRODUCTS = [
  {
    name: 'WMS',
    tag: 'Warehouse',
    img: wmsImg,
    desc: 'RFID-powered receiving, put-away, picking, packing and dispatch, with real-time inventory across every warehouse.',
    to: '/lp/wms',
  },
  {
    name: 'ContainerVision',
    tag: 'Container Terminals',
    img: containerVisionImg,
    desc: 'AI cameras, OCR and GPS/RTK automate gate, yard and reach-stacker workflows — gate to departure.',
    to: '/lp/ai-powered-cfs',
  },
  {
    name: 'Forklift',
    tag: 'Pallet & Location',
    img: forkliftVisionImg,
    desc: '8MP cameras, 3D depth sensing and Edge AI mounted on your forklifts confirm every pallet and location.',
    to: '/lp/forklift-vision-ai',
  },
  {
    name: 'Tracking',
    tag: 'RFID & GPS',
    img: assetTrackingImg,
    desc: 'RFID, GPS, BLE and LoRaWAN trackers feed one live dashboard, across the yard, warehouse and road.',
    to: '/lp/asset-tracking',
  },
  {
    name: 'AS400',
    tag: 'IBM i / AS400',
    img: as400Img,
    desc: 'RPG/RPGLE development, 24x7 support and modernization for the legacy systems your operation runs on.',
    to: '/lp/as400-development',
  },
]

const NAV_ITEMS = NAV.filter((item) => !item.hideFromNav && item.path !== '/')

function NavDropdown({ item, align }) {
  const groups = item.children
  const hasNestedGroups = groups.some((group) => group.children)

  return (
    <div
      className={`invisible absolute top-full z-50 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 ${
        align === 'right' ? 'right-0' : 'left-1/2 -translate-x-1/2'
      }`}
    >
      <div className="rounded-2xl border border-ink-300/60 bg-white p-6 shadow-[0_24px_48px_-16px_rgba(20,52,109,0.25)]">
        {hasNestedGroups ? (
          <div
            className="grid gap-x-10 gap-y-1"
            style={{ gridTemplateColumns: `repeat(${groups.length}, minmax(190px, 1fr))` }}
          >
            {groups.map((group) => (
              <div key={group.path}>
                <Link
                  to={group.path}
                  className="mb-3 block text-xs font-bold uppercase tracking-wide text-primary hover:text-gold-dark"
                >
                  {group.label}
                </Link>
                <ul className="flex flex-col gap-2">
                  {(group.children ?? []).map((child) => (
                    <li key={child.path}>
                      <Link to={child.path} className="block text-sm text-ink-600 hover:text-primary">
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
                className="rounded-lg px-2 py-2 text-sm font-semibold text-ink-900 hover:bg-gold/10 hover:text-primary"
              >
                {child.label}
                {child.description && (
                  <span className="mt-0.5 block text-xs font-normal text-ink-500">{child.description}</span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ConceptHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#fffdf6]/90 backdrop-blur-md border-b border-ink-300/40">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between gap-6">
        <Link to="/" className="shrink-0">
          <img src={logo} alt="Prosper Infotech" className="h-14 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
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
      </div>
    </header>
  )
}

const FOOTER_COLUMNS = NAV.filter((item) => item.children).slice(0, 3)

function ConceptFooter() {
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
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.path}>
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
          ))}
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

export default function HomepageConcept() {
  useDocumentTitle(
    'Homepage Concept | Prosper Infotech',
    'A concept redesign of the Prosper Infotech homepage exploring an isometric product-suite layout, not the live homepage.'
  )

  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'robots')
      document.head.appendChild(meta)
    }
    const prev = meta.content
    meta.content = 'noindex, nofollow'
    return () => {
      meta.content = prev
    }
  }, [])

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap'
    document.head.appendChild(link)
    return () => link.remove()
  }, [])

  const [wordIndex, setWordIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % HERO_WORDS.length), 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-b from-[#fffdf6] to-[#fff8dc]"
      style={{ '--font-heading': "'Plus Jakarta Sans', 'Open Sans', sans-serif" }}
    >
      <div className="bg-primary text-white text-center text-xs font-semibold py-1.5 px-4">
        Concept layout for review &mdash; not the live homepage
      </div>

      <ConceptHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden pt-6 pb-10">
          <motion.div
            className="pointer-events-none absolute top-[-120px] right-[-80px] h-[480px] w-[480px] rounded-full bg-gold/20 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="pointer-events-none absolute bottom-[-140px] left-[-100px] h-[380px] w-[380px] rounded-full bg-primary/10 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <div className="relative max-w-7xl mx-auto px-6 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] items-center">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-gold/25 border border-gold-dark/40 px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-widest text-primary-dark">
                  AI-Powered Logistics Platform
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="mt-5 text-4xl md:text-[52px] font-extrabold leading-tight tracking-tight">
                  Automate your
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
                  with our AI platform
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-5 text-lg text-ink-600 max-w-lg">
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

            <Reveal delay={0.2}>
              <img
                src={visionAISuiteImg}
                alt="Prosper Vision AI suite: GateVision, YardVision, DockVision, ContainerVision and ForkliftVision AI connected across a warehouse, yard and container terminal"
                className="w-full drop-shadow-2xl"
              />
            </Reveal>
          </div>
        </section>

        {/* Product suite */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal className="max-w-xl mb-12">
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">Our Platform</span>
              <h2 className="mt-3 text-3xl md:text-[38px] md:leading-[44px]">One AI platform. Every operation, automated.</h2>
              <p className="mt-3 text-ink-600 text-lg">
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
                <svg
                  viewBox="0 0 900 540"
                  preserveAspectRatio="xMidYMid slice"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  {STAT_DOT_FIELD.map((d, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#f7dd00" opacity={d.opacity} />
                  ))}
                </svg>

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
                      <div key={label}>
                        <div className="text-4xl md:text-5xl font-extrabold text-white">{value}</div>
                        <div className="mt-2 text-sm text-white/70">{label}</div>
                      </div>
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
                <CTAIllustration />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <ConceptFooter />
    </div>
  )
}

// Returns the three visible-face polygons of an isometric box, given the
// bottom-front-corner anchor, a right/left footprint vector and a height.
function isoBox(ax, ay, rx, ry, height) {
  const front = { x: ax, y: ay - height }
  const right = { x: front.x + rx, y: front.y + ry }
  const back = { x: front.x, y: front.y + 2 * ry }
  const left = { x: front.x - rx, y: front.y + ry }
  const bottomFront = { x: ax, y: ay }
  const bottomRight = { x: right.x, y: right.y + height }
  const bottomLeft = { x: left.x, y: left.y + height }
  const pts = (list) => list.map((p) => `${p.x},${p.y}`).join(' ')
  return {
    top: pts([front, right, back, left]),
    rightFace: pts([front, right, bottomRight, bottomFront]),
    leftFace: pts([front, left, bottomLeft, bottomFront]),
  }
}

function CTAIllustration() {
  const warehouse = isoBox(190, 300, 90, 50, 120)
  const trailerBed = isoBox(400, 320, 60, 22, 16)
  const trailerBox = isoBox(400, 304, 60, 22, 46)
  const cab = isoBox(322, 320, 22, 14, 42)
  const boxA = isoBox(540, 290, 44, 26, 42)
  const boxB = isoBox(516, 248, 44, 26, 42)

  return (
    <svg
      viewBox="0 0 640 380"
      role="img"
      aria-label="Isometric illustration of a warehouse, a delivery truck and stacked containers connected on one network"
      className="w-full"
    >
      <defs>
        <linearGradient id="ctaNavyTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3a5a99" />
          <stop offset="100%" stopColor="#1c407f" />
        </linearGradient>
        <linearGradient id="ctaNavyRight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#14346d" />
          <stop offset="100%" stopColor="#0e2851" />
        </linearGradient>
        <linearGradient id="ctaNavyLeft" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0e2851" />
          <stop offset="100%" stopColor="#081a3d" />
        </linearGradient>
        <linearGradient id="ctaGoldTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffe94d" />
          <stop offset="100%" stopColor="#f7dd00" />
        </linearGradient>
        <linearGradient id="ctaGoldRight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e0c700" />
          <stop offset="100%" stopColor="#c9a800" />
        </linearGradient>
        <linearGradient id="ctaGoldLeft" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c9a800" />
          <stop offset="100%" stopColor="#a88900" />
        </linearGradient>
      </defs>

      <ellipse cx="200" cy="384" rx="150" ry="16" fill="#14346d" opacity="0.08" />
      <ellipse cx="400" cy="384" rx="90" ry="12" fill="#14346d" opacity="0.08" />
      <ellipse cx="520" cy="356" rx="70" ry="10" fill="#14346d" opacity="0.08" />

      {/* connecting network */}
      <path
        d="M 240 260 Q 320 200 380 280"
        stroke="#14346d"
        strokeWidth="2"
        strokeDasharray="2 8"
        strokeLinecap="round"
        fill="none"
        opacity="0.35"
      />
      <path
        d="M 420 270 Q 470 220 500 260"
        stroke="#14346d"
        strokeWidth="2"
        strokeDasharray="2 8"
        strokeLinecap="round"
        fill="none"
        opacity="0.35"
      />
      <circle cx="240" cy="260" r="4" fill="#f7dd00" />
      <circle cx="380" cy="280" r="4" fill="#f7dd00" />
      <circle cx="500" cy="260" r="4" fill="#f7dd00" />
      <circle className="hc-scene-ping" cx="380" cy="280" r="4" fill="none" stroke="#14346d" strokeWidth="1.5" />

      <g className="hc-scene-float">
        {/* warehouse */}
        <polygon points={warehouse.top} fill="url(#ctaNavyTop)" />
        <polygon points={warehouse.rightFace} fill="url(#ctaNavyRight)" />
        <polygon points={warehouse.leftFace} fill="url(#ctaNavyLeft)" />
        <rect x="118" y="330" width="30" height="46" fill="#081a3d" opacity="0.7" />
        <line x1="90" y1="300" x2="90" y2="230" stroke="#f7dd00" strokeWidth="2" opacity="0.7" />
        <circle cx="90" cy="222" r="5" fill="#f7dd00" />

        {/* truck */}
        <polygon points={trailerBed.top} fill="url(#ctaNavyTop)" />
        <polygon points={trailerBed.rightFace} fill="url(#ctaNavyRight)" />
        <polygon points={trailerBed.leftFace} fill="url(#ctaNavyLeft)" />
        <polygon points={trailerBox.top} fill="url(#ctaGoldTop)" />
        <polygon points={trailerBox.rightFace} fill="url(#ctaGoldRight)" />
        <polygon points={trailerBox.leftFace} fill="url(#ctaGoldLeft)" />
        <polygon points={cab.top} fill="url(#ctaNavyTop)" />
        <polygon points={cab.rightFace} fill="url(#ctaNavyRight)" />
        <polygon points={cab.leftFace} fill="url(#ctaNavyLeft)" />
        <circle cx="316" cy="372" r="9" fill="#0e2851" />
        <circle cx="356" cy="372" r="9" fill="#0e2851" />
        <circle cx="430" cy="372" r="9" fill="#0e2851" />
        <circle cx="466" cy="372" r="9" fill="#0e2851" />

        {/* container stack */}
        <polygon points={boxA.top} fill="url(#ctaGoldTop)" />
        <polygon points={boxA.rightFace} fill="url(#ctaGoldRight)" />
        <polygon points={boxA.leftFace} fill="url(#ctaGoldLeft)" />
        <polygon points={boxB.top} fill="url(#ctaNavyTop)" />
        <polygon points={boxB.rightFace} fill="url(#ctaNavyRight)" />
        <polygon points={boxB.leftFace} fill="url(#ctaNavyLeft)" />
      </g>
    </svg>
  )
}

