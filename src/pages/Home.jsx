import {
  Warehouse,
  Boxes,
  Truck,
  Radio,
  Tag,
  Cpu,
  Eye,
  Users,
} from 'lucide-react'
import { CheckCircle2 } from 'lucide-react'
import Button from '../components/ui/Button'
import SectionHeading from '../components/ui/SectionHeading'
import ServiceCard from '../components/ui/ServiceCard'
import StatCounter from '../components/ui/StatCounter'
import TestimonialCarousel from '../components/ui/TestimonialCarousel'
import CTABand from '../components/ui/CTABand'
import Reveal from '../components/motion/Reveal'
import Hero from '../components/sections/Hero'
import { NAV } from '../data/navigation'

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
  return (
    <>
      <Hero />

      <section className="bg-surface-alt">
        <div className="max-w-7xl mx-auto px-6 py-20 grid gap-12 lg:grid-cols-2 items-center">
          <Reveal>
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/aU3I6Tw6S5I?autoplay=1&mute=1&playsinline=1"
                title="About Prosper Infotech"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </Reveal>
          <Reveal delay={0.15} className="flex flex-col gap-5">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">
              Who We Are
            </span>
            <h2 className="text-3xl md:text-[38px] md:leading-[44px]">
              Engineering the future of logistics visibility
            </h2>
            <p className="text-ink-600 text-lg">
              For over a decade, Prosper Infotech has helped logistics, warehousing, and
              manufacturing teams trade guesswork for real-time data. From our teams in Dallas
              and Pune, we design, build, and support the RFID, GPS, IoT, and AI systems that
              give operators complete visibility over their yards, warehouses, and fleets.
            </p>
            <ul className="flex flex-col gap-2.5">
              {[
                '10+ years of logistics technology expertise',
                '100+ engineers and consultants',
                'Offices in Dallas, TX and Pune, India',
                'End-to-end: consulting, development, deployment, and support',
              ].map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-ink-700">
                  <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <Button to="/about" variant="filled" className="self-start mt-2">
              Learn more about us
            </Button>
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
          <div className="flex w-max animate-marquee gap-12 md:gap-16">
            {[...industries, ...industries].map((industry, i) => (
              <span
                key={i}
                className="text-lg md:text-xl font-heading font-semibold text-white/70 whitespace-nowrap"
              >
                {industry.label}
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
          <Button to="/solutions" variant="filled">
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

      {TESTIMONIALS.length > 0 ? (
        <section className="max-w-4xl mx-auto px-6 py-20">
          <SectionHeading eyebrow="Testimonials" title="What our clients say" />
          <Reveal className="mt-12">
            <TestimonialCarousel testimonials={TESTIMONIALS} />
          </Reveal>
        </section>
      ) : (
        <section className="max-w-4xl mx-auto px-6 py-20 text-center">
          <SectionHeading eyebrow="Testimonials" title="What our clients say" />
          <Reveal>
            <p className="mt-6 text-ink-500">Client stories coming soon.</p>
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
