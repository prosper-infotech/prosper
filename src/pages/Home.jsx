import { Warehouse, Boxes, Truck, Radio, Tag, Cpu, Eye, Users, Gauge, ShieldCheck, Lock, Cloud } from 'lucide-react'
import Button from '../components/ui/Button'
import SectionHeading from '../components/ui/SectionHeading'
import ServiceCard from '../components/ui/ServiceCard'
import StatCounter from '../components/ui/StatCounter'
import TestimonialCarousel from '../components/ui/TestimonialCarousel'
import CTABand from '../components/ui/CTABand'
import Reveal from '../components/motion/Reveal'
import Hero from '../components/sections/Hero'
import { NAV } from '../data/navigation'
import { REGIONS, WHY_CHOOSE } from '../data/company'
import { FLAG_COMPONENTS } from '../components/ui/RegionFlags'
import useDocumentTitle from '../hooks/useDocumentTitle'

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

// No testimonials sourced yet — swap in real client quotes during content backfill.
const TESTIMONIALS = []

export default function Home() {
  useDocumentTitle(
    'Prosper Infotech | AI-Powered RFID, GPS & IoT Logistics Solutions',
    'IoT, RFID, GPS, and AI-powered visibility for warehouses, yards, and fleets — real-time tracking, asset visibility, and logistics automation from Prosper Infotech.'
  )

  return (
    <>
      <Hero />

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

      <section className="relative bg-gradient-to-b from-primary-dark to-navy overflow-hidden">
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 pt-16">
          <SectionHeading
            eyebrow="By the numbers"
            title="Engineering experience you can rely on"
            variant="dark"
            className="mb-12"
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 pb-16 grid gap-6 grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1} y={16} className="h-full">
              <div className="h-full min-h-[160px] flex flex-col items-center pt-6 text-center rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] px-4 pb-6">
                <StatCounter value={stat.value} label={stat.label} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {TESTIMONIALS.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 py-20">
          <SectionHeading eyebrow="Testimonials" title="What our clients say" />
          <Reveal className="mt-12">
            <TestimonialCarousel testimonials={TESTIMONIALS} />
          </Reveal>
        </section>
      )}

      <CTABand
        title="Ready to get accurate, real-time visibility?"
        description="Talk to our team about RFID, GPS, and IoT solutions built for your operation."
      />
    </>
  )
}
