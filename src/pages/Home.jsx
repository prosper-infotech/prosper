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
import Button from '../components/ui/Button'
import SectionHeading from '../components/ui/SectionHeading'
import ServiceCard from '../components/ui/ServiceCard'
import StatCounter from '../components/ui/StatCounter'
import TestimonialCarousel from '../components/ui/TestimonialCarousel'
import CTABand from '../components/ui/CTABand'
import { NAV } from '../data/navigation'

const solutions = NAV.find((item) => item.label === 'Solutions').children

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
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 py-28 md:py-36 text-center flex flex-col items-center gap-6">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            IoT &middot; RFID &middot; GPS &middot; AI
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
            Efficient Yards, Accurate Mapping, Intelligent Solutions with IoT, RFID, GPS, and AI
          </h1>
          <p className="text-ink-300 max-w-2xl">
            Prosper Infotech builds RFID, GPS, and AI-driven tracking systems that give
            logistics, warehousing, and manufacturing teams real-time visibility over their
            yards, fleets, and assets.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <Button to="/contact" variant="filled">
              Get in touch
            </Button>
            <Button to="/solutions" variant="outline">
              Explore solutions
            </Button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <SectionHeading eyebrow="What we do" title="Solutions built for your operation" />
        <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {featuredSolutions.map((s) => (
            <ServiceCard
              key={s.path}
              icon={HOME_ICONS[s.label]}
              title={s.label}
              description={s.description}
              to={s.path}
            />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button to="/solutions" variant="filled">
            View all Solutions
          </Button>
        </div>
      </section>

      <section className="bg-navy">
        <div className="max-w-6xl mx-auto px-6 py-16 grid gap-10 grid-cols-2 md:grid-cols-4">
          {STATS.map((stat) => (
            <StatCounter key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </section>

      {TESTIMONIALS.length > 0 ? (
        <section className="max-w-4xl mx-auto px-6 py-20">
          <SectionHeading eyebrow="Testimonials" title="What our clients say" />
          <div className="mt-12">
            <TestimonialCarousel testimonials={TESTIMONIALS} />
          </div>
        </section>
      ) : (
        <section className="max-w-4xl mx-auto px-6 py-20 text-center">
          <SectionHeading eyebrow="Testimonials" title="What our clients say" />
          <p className="mt-6 text-ink-500">Client stories coming soon.</p>
        </section>
      )}

      <CTABand
        title="Ready to get accurate, real-time visibility?"
        description="Talk to our team about RFID, GPS, and IoT solutions built for your operation."
      />
    </>
  )
}
