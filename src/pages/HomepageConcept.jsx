import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Phone, MapPin } from 'lucide-react'
import Button from '../components/ui/Button'
import Reveal from '../components/motion/Reveal'
import StatCounter from '../components/ui/StatCounter'
import CTABand from '../components/ui/CTABand'
import { NAV } from '../data/navigation'
import { OFFICES } from '../data/offices'
import useDocumentTitle from '../hooks/useDocumentTitle'
import logo from '../assets/logo-dark.png'
import wmsImg from '../assets/prosper wms.png'
import containerVisionImg from '../assets/container vision ai.png'
import forkliftVisionImg from '../assets/forklift vision ai.png'
import assetTrackingImg from '../assets/asset tracking.png'
import as400Img from '../assets/as400.png'

const HERO_WORDS = ['Warehouse', 'Yard', 'Fleet', 'Container', 'Forklift']

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

const FOOTER_COLUMNS = NAV.filter((item) => item.children).slice(0, 3)
const NAV_DROPDOWN_ITEMS = NAV.filter((item) => !item.hideFromNav)

function ConceptHeader() {
  return (
    <header className="sticky top-0 z-50 bg-navy-overlay backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20 gap-6">
          <Link to="/" className="flex shrink-0 items-center">
            <img src={logo} alt="Prosper Infotech" className="h-13 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_DROPDOWN_ITEMS.map((item) => (
              <div key={item.path} className="relative group">
                <span className="flex cursor-pointer items-center gap-1 whitespace-nowrap px-2.5 py-2 text-sm font-semibold text-white/90 group-hover:text-gold transition-colors">
                  {item.label}
                  {item.children && (
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                  )}
                </span>
                {item.children && (
                  <div className="invisible absolute left-1/2 top-full z-50 min-w-[230px] -translate-x-1/2 translate-y-[-6px] rounded-2xl bg-white p-2 opacity-0 shadow-[0_24px_48px_-16px_rgba(14,40,81,0.35)] transition-all duration-200 group-hover:visible group-hover:translate-y-2 group-hover:opacity-100">
                    {item.children.slice(0, 8).map((child) => (
                      <span
                        key={child.path}
                        className="block cursor-pointer rounded-lg px-3 py-2 text-[13.5px] font-semibold text-primary hover:bg-gold/15"
                      >
                        {child.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <Button
            href="https://calendly.com/prosperinfotech-sales/30min"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="hidden lg:inline-flex whitespace-nowrap"
          >
            Book a Demo
          </Button>
        </div>
      </div>
    </header>
  )
}

function ConceptFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <Link to="/" className="inline-flex items-center">
            <img src={logo} alt="Prosper Infotech" className="h-12 w-auto" />
          </Link>
          <p className="mt-4 text-sm text-ink-300">
            Efficient Yards, Accurate Mapping, Intelligent Solutions with IoT, RFID, GPS, and AI.
          </p>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.path}>
            <h3 className="font-heading font-semibold text-white mb-4">{column.label}</h3>
            <ul className="flex flex-col gap-2">
              {column.children.slice(0, 6).map((child) => (
                <li key={child.path}>
                  <span className="text-sm text-ink-300">{child.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="font-heading font-semibold text-white mb-4">Contact</h3>
          <ul className="flex flex-col gap-4">
            {OFFICES.map((office) => (
              <li key={office.country} className="text-sm text-ink-300">
                <div className="text-white font-semibold">{office.country}</div>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-gold" />
                  <span>{office.phone}</span>
                </div>
                <div className="flex items-start gap-2 mt-1">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-gold mt-0.5" />
                  <span>{office.address}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-ink-300">
          <span>&copy; {year} Prosper Infotech. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-gold transition-colors">
              About Us
            </Link>
            <Link to="/privacy-policy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <span>Dallas, TX &middot; Pune, India</span>
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

  const [wordIndex, setWordIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % HERO_WORDS.length), 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#fffdf6] to-[#fff8dc]">
      <ConceptHeader />

      <div className="bg-primary text-white text-center text-xs font-semibold py-1.5 px-4">
        Concept layout for review &mdash; not the live homepage
      </div>

      <main className="flex-1">
        {/* Hero */}
        <header className="relative overflow-hidden pt-16 pb-10">
          <div className="pointer-events-none absolute top-[-120px] right-[-80px] h-[480px] w-[480px] rounded-full bg-gold/20 blur-3xl" />
          <div className="relative max-w-7xl mx-auto px-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-gold/25 border border-gold-dark/40 px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-widest text-primary-dark">
                AI-Powered Logistics Platform
              </span>
              <h1 className="mt-5 text-4xl md:text-[52px] font-extrabold leading-tight tracking-tight">
                Automate your
                <br />
                <span className="text-gold-dark transition-opacity duration-200">{HERO_WORDS[wordIndex]}</span> Operations
                <br />
                with our AI platform
              </h1>
              <p className="mt-5 text-lg text-ink-600 max-w-lg">
                We help transform warehouses, yards, fleets and container terminals by enhancing efficiency, capacity and real-time visibility across every operation.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="https://calendly.com/prosperinfotech-sales/30min" target="_blank" rel="noopener noreferrer" variant="primary">
                  Book a Demo
                </Button>
                <Button to="/solutions" variant="outline-dark">
                  Explore the Platform
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <HeroIllustration />
            </Reveal>
          </div>
        </header>

        {/* Trust strip */}
        <section className="border-y border-ink-300 py-10">
          <div className="max-w-7xl mx-auto px-6 grid gap-8 lg:grid-cols-[1.1fr_1fr] items-center">
            <p className="text-lg text-ink-600">
              Harness the power of Prosper&rsquo;s AI platform &mdash; fortified by computer vision, RFID/GPS and deep-learning models trained on real warehouse and yard operations &mdash; to transform your supply chain.
            </p>
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {[
                ['15+', 'Years engineering'],
                ['500+', 'Devices deployed'],
                ['50+', 'Enterprise clients'],
                ['24/7', 'Support coverage'],
              ].map(([n, label]) => (
                <div key={label} className="flex items-baseline gap-2">
                  <b className="font-heading text-2xl text-primary">{n}</b>
                  <span className="text-sm text-ink-500">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 grid gap-14 lg:grid-cols-2 items-center">
            <Reveal>
              <div className="relative">
                <div className="pointer-events-none absolute -inset-3 rounded-2xl border border-gold/20" />
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/aU3I6Tw6S5I?mute=1"
                    title="About Prosper Infotech"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15} className="flex flex-col gap-5">
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">Who We Are</span>
              <h2 className="text-3xl md:text-[38px] md:leading-[44px]">
                Engineering AI, IoT &amp; Logistics Solutions for Real-World Operations
              </h2>
              <p className="text-ink-600 text-lg">
                For more than a decade, Prosper Infotech has been designing, developing, integrating, and supporting technology solutions for logistics, warehousing, transportation, CFS/container terminals, manufacturing, and enterprise operations.
              </p>
              <p className="text-ink-600 text-lg">
                Our engineering teams across the USA, India, and Japan bring together deep expertise in Artificial Intelligence, Computer Vision, OCR, RFID, GPS/RTK, Industrial IoT, Edge Computing, cloud platforms, and enterprise software development.
              </p>
              <p className="text-ink-600 text-lg">
                From intelligent gates and yards to warehouses, docks, forklifts, containers, assets, and legacy enterprise systems, we help customers connect physical operations with real-time digital intelligence.
              </p>
              <Button to="/about" variant="primary" className="self-start mt-2">
                Learn more about us
              </Button>
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
                      <img src={p.img} alt={`Isometric render representing Prosper ${p.name}`} className="relative w-full max-w-[230px] drop-shadow-[0_14px_18px_rgba(20,52,109,0.18)]" />
                    </div>
                  </Link>
                </Reveal>
              ))}

              <Reveal delay={0.24}>
                <div className="flex h-full flex-col rounded-[22px] bg-gradient-to-br from-primary to-primary-dark p-6 text-white">
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
        <section className="relative overflow-hidden bg-gradient-to-b from-primary-dark to-navy">
          <div className="pointer-events-none absolute top-0 left-1/3 h-72 w-72 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
          <div className="relative max-w-7xl mx-auto px-6 py-20">
            <Reveal className="text-center mb-12">
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">By the numbers</span>
              <h2 className="mt-2 text-3xl text-white">Engineering experience you can rely on</h2>
            </Reveal>
            <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
              {[
                ['15+', 'Years of Engineering Experience'],
                ['500+', 'Devices Deployed'],
                ['50+', 'Enterprise Clients'],
                ['24/7', 'Support Coverage'],
              ].map(([value, label], i) => (
                <Reveal key={label} delay={i * 0.1} y={16} className="h-full">
                  <div className="h-full min-h-[160px] flex flex-col items-center pt-6 text-center rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] px-4 pb-6">
                    <StatCounter value={value} label={label} />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CTABand
          title="Ready to see it live?"
          description="Talk to our team about warehouse, yard, fleet and container AI built for your operation — no cost, no obligation."
        />
      </main>

      <ConceptFooter />
    </div>
  )
}

function HeroIllustration() {
  return (
    <svg viewBox="0 0 560 440" role="img" aria-label="Animated isometric illustration of a warehouse, pallet racking and a forklift moving pallets in a yard">
      <circle cx="330" cy="230" r="220" fill="#f7dd00" opacity="0.08" />
      <ellipse cx="247" cy="378" rx="150" ry="18" fill="#14346d" opacity="0.06" />
      <ellipse cx="182" cy="395" rx="90" ry="12" fill="#14346d" opacity="0.06" />

      <g className="hc-scene-float">
        <polygon points="230,140 366,220 264,280 128,200" fill="#3a5a99" />
        <polygon points="366,220 264,280 264,370 366,310" fill="#14346d" />
        <polygon points="128,200 264,280 264,370 128,290" fill="#0e2851" />

        <polygon points="230,113 366,193 264,253 128,173" fill="#f7dd00" />
        <polygon points="366,193 264,253 264,280 366,220" fill="#e0c700" />
        <polygon points="128,173 264,253 264,280 128,200" fill="#c9a800" />

        <polygon points="390,260 424,280 390,300 356,280" fill="#ffe94d" />
        <polygon points="424,280 390,300 390,343 424,343" fill="#e0c700" />
        <polygon points="356,280 390,300 390,343 356,343" fill="#c9a800" />
        <rect className="hc-scene-pallet" x="368" y="290" width="20" height="16" rx="2" fill="#0e2851" />

        <polygon points="420,300 454,320 420,340 386,320" fill="#ffe94d" />
        <polygon points="454,320 420,340 420,385 454,365" fill="#e0c700" />
        <polygon points="386,320 420,340 420,385 386,365" fill="#c9a800" />

        <g className="hc-scene-forklift">
          <polygon points="150,320 201,350 167,370 116,340" fill="#f7dd00" />
          <polygon points="201,350 167,370 167,388 201,368" fill="#e0c700" />
          <polygon points="116,340 167,370 167,388 116,358" fill="#c9a800" />

          <circle cx="140" cy="392" r="11" fill="#0e2851" />
          <line className="hc-scene-wheel" x1="140" y1="384" x2="140" y2="400" stroke="#f7dd00" strokeWidth="2" />
          <circle cx="185" cy="392" r="11" fill="#0e2851" />
          <line className="hc-scene-wheel" x1="185" y1="384" x2="185" y2="400" stroke="#f7dd00" strokeWidth="2" />

          <g className="hc-scene-mast">
            <rect x="159" y="326" width="7" height="62" fill="#0e2851" />
            <line x1="6" x2="116" y1="392" y2="366" stroke="#0e2851" strokeWidth="4" strokeLinecap="round" />
            <line x1="6" x2="116" y1="399" y2="373" stroke="#0e2851" strokeWidth="4" strokeLinecap="round" />
            <circle cx="163" cy="322" r="4" fill="#14346d" />
            <circle className="hc-scene-ping" cx="163" cy="322" r="9" fill="none" stroke="#14346d" strokeWidth="1.5" />
          </g>
        </g>
      </g>
    </svg>
  )
}
