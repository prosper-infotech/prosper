import {
  Terminal,
  Headset,
  TrendingUp,
  Clock,
  CalendarCheck,
  PhoneCall,
  MapPin,
  Check,
  Award,
  BadgeCheck,
  ShieldCheck,
  DollarSign,
  Truck,
  Warehouse,
  Factory,
  Shield,
  Landmark,
  ShoppingCart,
  Boxes,
  Mail,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '../../components/ui/Button'
import Reveal from '../../components/motion/Reveal'
import LandingLeadForm from '../../components/forms/LandingLeadForm'
import { OFFICES } from '../../data/offices'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import as400Hero from '../../assets/as400-hero.png'

const usaPhone = OFFICES[0].phone

const STAT_BADGES = [
  { icon: Clock, label: '24x7 Monitoring' },
  { icon: CalendarCheck, label: '365 Day Coverage' },
  { icon: PhoneCall, label: 'Dedicated Calling Line' },
]

const SERVICE_COLUMNS = [
  {
    key: 'development',
    icon: Terminal,
    iconStyle: 'bg-gradient-to-br from-gold to-gold-dark text-primary',
    barStyle: 'bg-gold',
    title: 'AS400 Development',
    items: [
      'RPG / RPGLE / CL / CLLE Development',
      'New Application Development',
      'Enhancements & Bug Fixes',
      'SQLRPGLE / Embedded SQL',
      'DB2/400 Query & Performance',
      'API / XML / JSON / REST Integration',
      'Unit Testing & Code Review',
    ],
  },
  {
    key: 'support',
    icon: Headset,
    iconStyle: 'bg-navy text-white',
    barStyle: 'bg-navy',
    title: 'AS400 Support',
    items: [
      '24x7 Help Desk & On-Call Support',
      'Production Support & Issue Resolution',
      'Performance Tuning & Optimization',
      'Database & Data Integrity Support',
      'User Support & Access Management',
      'Problem Management & RCA',
      'Monthly Reporting & Health Checks',
    ],
  },
  {
    key: 'modernization',
    icon: TrendingUp,
    iconStyle: 'bg-accent-green text-white',
    barStyle: 'bg-accent-green',
    title: 'AS400 Modernization',
    items: [
      'Legacy Application Assessment',
      'Code & Database Modernization',
      'UI Modernization (Web / Smart HTML)',
      'API Enablement & System Integration',
      'Cloud Integration (AWS / Azure)',
      'Data Migration & Transformation',
      'Security & Compliance Modernization',
    ],
  },
]

const WHY_CHOOSE = [
  { icon: Award, label: '10+ Years of AS400 Expertise' },
  { icon: BadgeCheck, label: 'Skilled & Certified AS400 Professionals' },
  { icon: Headset, label: '24x7x365 Dedicated Support' },
  { icon: DollarSign, label: 'Cost-Effective Solutions' },
  { icon: ShieldCheck, label: 'Secure, Reliable & Compliant' },
]

const INDUSTRIES = [
  { icon: Truck, label: 'Logistics & Transportation' },
  { icon: Warehouse, label: 'Warehouse & Distribution' },
  { icon: Factory, label: 'Manufacturing' },
  { icon: Shield, label: 'Insurance' },
  { icon: Landmark, label: 'Banking & Finance' },
  { icon: ShoppingCart, label: 'Retail' },
  { icon: Boxes, label: 'Supply Chain & 3PL' },
]

export default function AS400Development() {
  useDocumentTitle(
    'AS400 Development & 24x7 Support | Prosper Infotech',
    'USA + offshore AS400 (IBM i) development, support, and modernization — RPG/RPGLE builds, 24x7x365 coverage, and a dedicated calling line. Get a free consultation.'
  )

  return (
    <>
      <section className="relative bg-gradient-to-b from-primary-dark to-navy overflow-hidden">
        <motion.div
          className="pointer-events-none absolute top-1/3 right-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/5 blur-3xl"
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          <Reveal className="flex flex-col gap-5">
            <h1 className="text-white text-4xl md:text-5xl leading-tight">
              24x7x365 <span className="text-gold">Dedicated Support</span>
            </h1>
            <p className="text-2xl md:text-3xl font-heading font-bold leading-snug">
              <span className="text-white">AS400 (IBM i) </span>
              <span className="text-gold">Development</span>
              <span className="text-white">, Support &amp; Modernization</span>
            </p>
            <p className="text-white/80 text-lg max-w-xl">
              A specialized AS400 development team already serving live enterprise environments —
              RPG/RPGLE builds, enhancements, and integrations delivered by a US-coordinated,
              offshore-backed team.
            </p>

            <div className="flex flex-wrap gap-3 mt-2">
              {STAT_BADGES.map((badge) => {
                const Icon = badge.icon
                return (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-2 rounded-lg bg-white/5 border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
                  >
                    <Icon className="h-4 w-4 text-gold" />
                    {badge.label}
                  </span>
                )
              })}
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <div className="relative">
                <span className="absolute inset-0 rounded-lg bg-gold/50 blur-md animate-pulse" />
                <Button href="#lead-form" variant="primary-dark" className="relative">
                  Get a Free Consultation
                </Button>
              </div>
              <Button
                href={`tel:${usaPhone.replace(/\s+/g, '')}`}
                variant="outline"
                icon={false}
                onClick={() =>
                  window.gtag?.('event', 'click_to_call', { event_category: 'AS400 Landing Page' })
                }
              >
                <span className="inline-flex items-center gap-2">
                  <PhoneCall className="h-4 w-4" />
                  Call {usaPhone}
                </span>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="hidden lg:flex items-center justify-center">
            <div className="relative flex items-center justify-center max-w-sm">
              <motion.div
                className="absolute -inset-8 rounded-[2rem] bg-gold/10 blur-3xl"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative z-10 overflow-hidden rounded-2xl border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]">
                <img src={as400Hero} alt="IBM i AS/400 server" className="w-full" />
              </div>
              <motion.span
                className="absolute -top-3 left-2 z-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-semibold text-white"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                IBM i / AS400
              </motion.span>
              <motion.span
                className="absolute bottom-6 -right-4 z-20 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-primary"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                On-Call Support
              </motion.span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {SERVICE_COLUMNS.map((col, i) => {
            const Icon = col.icon
            return (
              <Reveal key={col.key} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-ink-300 bg-white shadow-md hover:-translate-y-1.5 hover:shadow-[0_0_50px_-8px_rgba(247,221,0,0.35),0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-300 overflow-hidden">
                  <div className={`h-1.5 ${col.barStyle}`} />
                  <div className="p-7">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-full ${col.iconStyle}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-heading font-semibold text-lg text-primary">
                      {col.title}
                    </h3>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {col.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-ink-700">
                          <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="bg-surface-alt">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <Reveal className="text-center mb-10">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">
              Why Prosper Infotech
            </span>
            <h2 className="mt-2 text-3xl">Why choose us for AS400</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {WHY_CHOOSE.map((reason) => {
              const Icon = reason.icon
              return (
                <div
                  key={reason.label}
                  className="flex flex-col items-center text-center gap-3 rounded-lg bg-white border border-ink-300 px-5 py-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_40px_-8px_rgba(247,221,0,0.4),0_20px_40px_-12px_rgba(0,0,0,0.2)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/20 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-ink-900 text-sm font-semibold">{reason.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <Reveal className="text-center mb-10">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Who we help
          </span>
          <h2 className="mt-2 text-3xl">Trusted by enterprises across industries</h2>
        </Reveal>
        <div className="flex flex-wrap justify-center gap-3">
          {INDUSTRIES.map((industry) => {
            const Icon = industry.icon
            return (
              <span
                key={industry.label}
                className="inline-flex items-center gap-2 rounded-full border border-ink-300 bg-white px-4 py-2.5 text-sm font-semibold text-ink-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-primary hover:shadow-md"
              >
                <Icon className="h-4 w-4 text-primary" />
                {industry.label}
              </span>
            )
          })}
        </div>
      </section>

      <section id="lead-form" className="relative bg-gradient-to-b from-navy to-primary-dark overflow-hidden">
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-20 grid lg:grid-cols-2 gap-10 items-start">
          <Reveal className="flex flex-col gap-5">
            <h2 className="text-white text-3xl">Let's connect!</h2>
            <p className="text-white/80 text-lg">
              Schedule a quick call with our AS400 experts and discover how we can help your
              business.
            </p>
            <div className="flex flex-col gap-4 mt-2">
              <a
                href={`tel:${usaPhone.replace(/\s+/g, '')}`}
                onClick={() =>
                  window.gtag?.('event', 'click_to_call', { event_category: 'AS400 Landing Page' })
                }
                className="inline-flex items-center gap-3 rounded-lg bg-white/5 border border-white/15 px-5 py-4 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                <PhoneCall className="h-5 w-5 text-gold" />
                {usaPhone}
              </a>
              <a
                href="mailto:sales@prosperinfotech.com"
                className="inline-flex items-center gap-3 rounded-lg bg-white/5 border border-white/15 px-5 py-4 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                <Mail className="h-5 w-5 text-gold" />
                sales@prosperinfotech.com
              </a>
              <span className="inline-flex items-center gap-3 rounded-lg bg-white/5 border border-white/15 px-5 py-4 text-white/80 text-sm">
                <MapPin className="h-5 w-5 text-gold shrink-0" />
                Proudly based in Dallas, Texas, USA
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl">
            <h3 className="font-heading font-semibold text-primary text-xl mb-1">
              Get a free AS400 consultation
            </h3>
            <p className="text-sm text-ink-600 mb-5">
              Tell us about your environment — we'll respond within one business day.
            </p>
            <LandingLeadForm
              serviceOptions={[
                'AS400 Development (RPG/RPGLE)',
                'AS400 Support / Help Desk',
                'AS400 Modernization',
                'Migration / Cloud Integration',
                'Not sure — need guidance',
              ]}
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
