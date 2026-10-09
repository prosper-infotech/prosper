import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  ChevronDown,
  Eye,
  Handshake,
  Lightbulb,
  MapPin,
  Phone,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react'
import Breadcrumb from '../components/ui/Breadcrumb'
import Button from '../components/ui/Button'
import SectionHeading from '../components/ui/SectionHeading'
import CTABand from '../components/ui/CTABand'
import Reveal from '../components/motion/Reveal'
import { OFFICES } from '../data/offices'
import { CAPABILITIES, REGIONS, WHY_CHOOSE } from '../data/company'
import { FLAG_COMPONENTS } from '../components/ui/RegionFlags'
import useDocumentTitle from '../hooks/useDocumentTitle'
import heroImg from '../assets/hero-slide-ai-vision-iot.jpg'
import teamImg from '../assets/tech-outsourcing-hero-team.jpg'

const MISSION = 'To simplify complex operations through intelligent technology, automation, and real-time visibility.'
const VISION = 'To shape a future where businesses operate with greater visibility, intelligence, and automation.'

const VALUES = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We continuously explore smarter ways to solve real operational challenges.',
  },
  {
    icon: Users,
    title: 'Customer First',
    description: 'We build solutions around the needs and success of our customers.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliability',
    description: 'We create dependable technology designed for real-world operations.',
  },
  {
    icon: Handshake,
    title: 'Collaboration',
    description: 'We grow through teamwork, partnerships, and shared ideas.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We aim for quality, precision and continuous improvement in everything we do.',
  },
]

const APPROACH = [
  {
    icon: Lightbulb,
    title: 'Consult',
    description: 'We start by understanding your operation — yard layout, asset types, existing systems — before recommending any technology.',
  },
  {
    icon: Users,
    title: 'Build',
    description: 'Our engineers develop and configure RFID, GPS, IoT, and AI solutions tailored to your environment, not a one-size-fits-all product.',
  },
  {
    icon: ShieldCheck,
    title: 'Deploy',
    description: 'We install hardware, integrate with your existing ERP, WMS, TMS, or YMS, and train your team for a smooth go-live.',
  },
  {
    icon: Handshake,
    title: 'Support',
    description: 'Our relationship continues after launch, with 24/7 monitoring and remote support to keep your systems running.',
  },
]

const PRODUCTS = [
  { name: 'GateVision AI', description: 'Automatic gate check-in with plate, container and SCAC recognition.', to: '/solutions/gate-yard-dock-vision-ai' },
  { name: 'ContainerVision AI', description: 'AI and OCR automation for CFS and container terminals.', to: '/products/software/containervision-ai' },
  { name: 'DockVision AI', description: 'Live dock door, trailer and restraint status monitoring.', to: '/products/software/dockvision-ai' },
  { name: 'ForkliftVision AI', description: 'Pallet pickup and putaway verification with rack-level accuracy.', to: '/solutions/ai-computer-vision' },
  { name: 'Asset Tracking', description: 'RFID and GPS visibility for any asset, across every site.', to: '/products/software/asset-tracking' },
  { name: 'Warehouse Management', description: 'Real-time inventory from receiving to dispatch.', to: '/products/software/wms' },
  { name: 'Video Attendance', description: 'Face and QR check-in for staff and visitors, processed on-site.', to: '/products/software/video-attendance' },
  { name: 'AS400 / IBM i', description: 'Development, modernization and 24×7 support for IBM i.', to: '/ibm-i-as400' },
]

const INDUSTRIES = [
  ['Logistics', '/industries/logistics'],
  ['Warehousing', '/industries/warehousing'],
  ['Manufacturing', '/industries/manufacturing'],
  ['Ports & Terminals', '/industries/ports-terminals'],
  ['CFS', '/industries/cfs'],
  ['Supply Chain', '/industries/supply-chain'],
  ['3PL', '/industries/3pl'],
  ['Cold Chain', '/industries/cold-chain'],
  ['Healthcare', '/industries/healthcare'],
  ['Pharma', '/industries/pharma'],
  ['Retail', '/industries/retail'],
  ['Construction', '/industries/construction'],
]

const FAQS = [
  {
    q: 'What is Prosper Infotech?',
    a: 'Prosper Infotech is a technology company that designs, builds and supports AI, computer vision, RFID, GPS and IoT solutions for logistics, warehousing, transportation, CFS and container terminals, manufacturing and enterprise operations.',
  },
  {
    q: 'Where is Prosper Infotech located?',
    a: 'Our U.S. office is in Dallas, Texas, and our India office is in Pune. Our engineering teams also work from Japan, so customers get local accountability with global delivery.',
  },
  {
    q: 'What products does Prosper Infotech offer?',
    a: 'Our AI vision products are GateVision AI, ContainerVision AI, DockVision AI and ForkliftVision AI. We also offer RFID and GPS asset tracking, a warehouse management system (WMS), fleet management, video-based attendance and visitor management, and AS400 / IBM i services.',
  },
  {
    q: 'Which industries does Prosper Infotech serve?',
    a: 'We serve logistics, warehousing, manufacturing, ports and terminals, CFS, supply chain, 3PL, cold chain, healthcare, pharma, retail, construction and media and entertainment.',
  },
  {
    q: 'How does Prosper Infotech deliver a project?',
    a: 'We work end to end: consulting, engineering, deployment, integration and support. We connect to your existing ERP, WMS, TMS or YMS, install the hardware and train your team for go-live.',
  },
  {
    q: 'Does Prosper Infotech provide 24×7 support?',
    a: 'Yes. Production monitoring and a technical help desk are available 24×7, including remote support after go-live.',
  },
]

// Structured data for search engines and AI answer engines (AboutPage + FAQ).
const PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': 'https://www.prosperinfotech.com/about#webpage',
      url: 'https://www.prosperinfotech.com/about',
      name: 'About Prosper Infotech',
      description:
        'Prosper Infotech builds AI vision, RFID, GPS and IoT logistics solutions, with engineering teams in the USA, India and Japan and 24×7 support.',
      about: {
        '@type': 'Organization',
        name: 'Prosper Infotech',
        url: 'https://www.prosperinfotech.com/',
        slogan: 'AI-Powered Logistics Solutions',
        knowsAbout: [
          'Artificial intelligence',
          'Computer vision',
          'OCR',
          'RFID',
          'GPS and RTK',
          'Industrial IoT',
          'Edge computing',
          'Warehouse management systems',
          'Yard and gate automation',
          'Container terminal and CFS automation',
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ],
}

function SpotlightCard({ children, className = '' }) {
  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }
  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative h-full overflow-hidden rounded-2xl border border-ink-300 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(220px circle at var(--x) var(--y), rgba(247,221,0,0.18), transparent 70%)',
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}

function MissionVisionCard({ icon: Icon, word, text, delay }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="group relative h-full overflow-hidden rounded-3xl border border-ink-300 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-20px_rgba(20,52,109,0.35)] md:p-10">
        <Icon className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 text-gold/15 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110" strokeWidth={1.2} />
        <div className="relative flex items-center gap-5">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),0_10px_25px_-8px_rgba(224,199,0,0.8)]">
            <Icon className="h-9 w-9" strokeWidth={2} />
          </span>
          <h2 className="text-3xl font-extrabold uppercase leading-tight tracking-tight text-primary md:text-4xl">
            Our <span className="block text-gold-dark">{word}</span>
          </h2>
        </div>
        <span className="relative mt-5 block h-1 w-14 rounded-full bg-gold" />
        <p className="relative mt-5 text-lg leading-relaxed text-ink-900 md:text-xl">{text}</p>
      </div>
    </Reveal>
  )
}

export default function About() {
  useDocumentTitle(
    'About Prosper Infotech | AI, IoT & Logistics Technology',
    'Prosper Infotech builds AI vision, RFID, GPS and IoT logistics solutions, with engineering teams in the USA, India and Japan and 24×7 support.',
    PAGE_SCHEMA
  )

  return (
    <>
      <Breadcrumb title="About Us" h1="About Prosper Infotech" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-navy to-[#081a3d]">
        <motion.div
          className="pointer-events-none absolute -right-10 top-0 h-96 w-96 rounded-full bg-gold/25 blur-[120px]"
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-10 left-0 h-80 w-80 rounded-full bg-gold-dark/15 blur-[100px]"
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '22px 22px' }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-20">
          <Reveal className="flex flex-col items-start gap-5">
            <span className="rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
              Who We Are
            </span>
            <h2 className="text-3xl font-bold leading-tight text-white md:text-[44px] md:leading-[1.1]">
              AI-Powered Logistics &amp; IoT Solutions, <span className="text-gold">Engineered for Real-World Operations</span>
            </h2>
            <p className="text-lg text-white/80">
              For more than a decade, Prosper Infotech has designed, developed, integrated and supported technology for
              logistics, warehousing, transportation, CFS and container terminals, manufacturing and enterprise operations.
            </p>
            <p className="text-white/70">
              Our engineering teams across the USA, India and Japan combine AI, computer vision, OCR, RFID, GPS/RTK,
              industrial IoT, edge computing and enterprise software — connecting physical operations with real-time
              digital intelligence.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Button
                href="https://calendly.com/prosperinfotech-sales/30min"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="!rounded-full !px-7 !py-3 !text-base hover:scale-105"
              >
                Book a Demo
              </Button>
              <Button to="/solutions" variant="outline" className="!rounded-full !px-7 !py-3 !text-base">
                Explore Solutions
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-gold/60 via-transparent to-gold/20 blur-sm" />
              <img
                src={heroImg}
                alt="Prosper Infotech AI vision platform: GateVision, DockVision, ContainerVision, ForkliftVision and YardVision across a logistics yard"
                width={1920}
                height={823}
                className="relative w-full rounded-3xl border border-white/20 object-cover shadow-2xl"
                fetchPriority="high"
              />
              <div className="absolute -bottom-4 left-6 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-primary shadow-xl">
                <span className="h-2 w-2 rounded-full bg-gold-dark" />
                AI · IoT · RFID · GPS
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gradient-to-b from-surface to-surface-alt">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-6 md:grid-cols-2">
            <MissionVisionCard icon={Target} word="Mission" text={MISSION} delay={0} />
            <MissionVisionCard icon={Eye} word="Vision" text={VISION} delay={0.12} />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading eyebrow="What Drives Us" title="Our Values" />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
          {VALUES.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="group flex h-full flex-col items-center px-5 text-center lg:border-l lg:border-ink-300/70 lg:first:border-l-0">
                <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold bg-white text-primary shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-gold group-hover:shadow-[0_15px_30px_-10px_rgba(224,199,0,0.7)]">
                  <Icon className="h-8 w-8" strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 text-base font-extrabold uppercase tracking-wide text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-surface-alt">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading eyebrow="What We Do" title="AI, IoT and logistics technology under one roof" />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map(({ icon: Icon, label, description }, i) => (
              <Reveal key={label} delay={(i % 4) * 0.07}>
                <SpotlightCard>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.15)] transition-transform duration-500 group-hover:rotate-[360deg]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-heading text-base font-semibold text-primary">{label}</h3>
                  <p className="mt-2 text-sm text-ink-600">{description}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading eyebrow="Our Products" title="Solutions built by Prosper Infotech" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map(({ name, description, to }, i) => (
            <Reveal key={name} delay={(i % 4) * 0.06}>
              <Link
                to={to}
                className="group flex h-full flex-col rounded-2xl border border-ink-300 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-dark hover:shadow-lg"
              >
                <h3 className="text-base font-bold text-primary">{name}</h3>
                <p className="mt-1.5 flex-1 text-sm text-ink-600">{description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Learn more
                  <ArrowRight className="h-4 w-4 text-gold-dark transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="bg-surface-alt">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading eyebrow="How We Work" title="Our approach" />
          <div className="relative mt-16">
            <div className="absolute left-6 top-6 bottom-6 w-px bg-ink-300 lg:hidden" />
            <motion.div
              className="absolute left-6 top-6 w-px origin-top bg-gradient-to-b from-gold to-gold-dark lg:hidden"
              style={{ height: 'calc(100% - 3rem)' }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
            <div className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-px bg-ink-300 lg:block" />
            <motion.div
              className="absolute left-[12.5%] top-6 hidden h-px w-[75%] origin-left bg-gradient-to-r from-gold to-gold-dark lg:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
            <div className="relative grid gap-10 lg:grid-cols-4">
              {APPROACH.map((step, i) => {
                const Icon = step.icon
                return (
                  <Reveal key={step.title} delay={i * 0.15} className="relative pl-16 lg:flex lg:flex-col lg:items-center lg:pl-0 lg:text-center">
                    <div className="absolute left-0 top-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary shadow-md lg:static lg:mb-4">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-primary">{step.title}</h3>
                      <p className="mt-2 text-sm text-ink-600">{step.description}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Global team */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading eyebrow="Our Team" title="Global Engineering. Local Accountability." className="mb-12" />
        <Reveal>
          <img
            src={teamImg}
            alt="Prosper Infotech engineers reviewing GateVision, YardVision and DockVision dashboards in a control room"
            width={1536}
            height={658}
            loading="lazy"
            className="mb-10 w-full rounded-3xl border border-ink-300 object-cover shadow-xl"
          />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-3">
          {REGIONS.map(({ flagKey, country, description }, i) => {
            const Flag = FLAG_COMPONENTS[flagKey]
            return (
              <Reveal key={country} delay={i * 0.12}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-ink-300 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_50px_-8px_rgba(247,221,0,0.35),0_25px_50px_-12px_rgba(0,0,0,0.25)]">
                  <div className="relative shrink-0">
                    <motion.span
                      className="absolute inset-0 rounded-full border-2 border-gold"
                      animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: i * 0.4 }}
                    />
                    <Flag />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-primary">{country}</h3>
                    <p className="mt-1.5 text-sm text-ink-600">{description}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* Why choose us */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-primary-dark to-navy shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {WHY_CHOOSE.map((item, i) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className={`group flex flex-col items-center gap-3 px-6 py-10 text-center transition-colors duration-300 hover:bg-white/[0.03] ${
                      i > 0 ? 'lg:border-l lg:border-white/10' : ''
                    }`}
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold/60 text-gold transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className="font-heading text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-sm text-white/70">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Industries */}
      <section className="bg-surface-alt">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <SectionHeading eyebrow="Who We Serve" title="Industries we power" />
          <Reveal className="mt-10 flex flex-wrap justify-center gap-3">
            {INDUSTRIES.map(([label, to]) => (
              <Link
                key={to}
                to={to}
                className="rounded-full border border-primary/20 bg-white px-5 py-2 text-sm font-semibold text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-dark hover:bg-gold/20"
              >
                {label}
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <SectionHeading eyebrow="Quick Answers" title="About Prosper Infotech: FAQs" />
        <div className="mt-12 flex flex-col gap-3">
          {FAQS.map(({ q, a }) => (
            <Reveal key={q}>
              <details className="group rounded-2xl border border-ink-300 bg-white px-6 py-4 transition-shadow open:shadow-lg">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-heading text-base font-semibold text-primary [&::-webkit-details-marker]:hidden">
                  {q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-gold-dark transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-600 md:text-base">{a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Offices */}
      <section className="bg-surface-alt">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <SectionHeading eyebrow="Where We Are" title="Our offices" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {OFFICES.map((office, i) => (
              <Reveal key={office.country} delay={i * 0.1}>
                <div className="rounded-lg border border-ink-300 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_-8px_rgba(247,221,0,0.35),0_20px_40px_-12px_rgba(0,0,0,0.2)]">
                  <h3 className="mb-3 font-heading text-lg font-semibold text-primary">{office.country}</h3>
                  <div className="mb-2 flex items-center gap-3 text-ink-600">
                    <Phone className="h-4 w-4 shrink-0 text-gold" />
                    <a href={`tel:${office.phone.replace(/\s+/g, '')}`} className="hover:text-primary">
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-3 text-ink-600">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <a href={office.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                      {office.address}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to work with us?"
        description="Talk to our team about the right AI, RFID, GPS, or IoT solution for your operation."
      />
    </>
  )
}
