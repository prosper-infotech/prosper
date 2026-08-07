import {
  Tag,
  Box,
  Radio,
  Scan,
  LayoutDashboard,
  Smartphone,
  Eye,
  Bell,
  ClipboardCheck,
  MapPin,
  Puzzle,
  ShieldCheck,
  Warehouse,
  HeartPulse,
  Trees,
  HardHat,
  Wrench,
  Monitor,
  PackageCheck,
  Truck,
  Factory,
  GraduationCap,
  PhoneCall,
  Mail,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '../../components/ui/Button'
import Reveal from '../../components/motion/Reveal'
import LandingLeadForm from '../../components/forms/LandingLeadForm'
import { OFFICES } from '../../data/offices'
import assetTrackingHero from '../../assets/asset-tracking-hero.png'
import useDocumentTitle from '../../hooks/useDocumentTitle'

const usaPhone = OFFICES[0].phone

const STAT_BADGES = [
  { icon: Eye, label: 'Real-Time Visibility' },
  { icon: ClipboardCheck, label: 'Automated Check-In/Out' },
  { icon: MapPin, label: 'Multi Yard Support' },
]

const COMPONENTS = [
  { icon: Tag, label: 'RFID Label Tag' },
  { icon: Box, label: 'Rugged RFID Tag' },
  { icon: Radio, label: 'Fixed RFID Reader Setup' },
  { icon: Scan, label: 'Handheld RFID Reader Setup' },
  { icon: LayoutDashboard, label: 'Cloud Software Dashboard' },
  { icon: Smartphone, label: 'Mobile App' },
]

const FEATURES = [
  { icon: Eye, label: 'Real-Time Asset Visibility' },
  { icon: Bell, label: 'Alerts & Notifications' },
  { icon: ClipboardCheck, label: 'Automated Check-In & Out' },
  { icon: MapPin, label: 'Multi Yard Support' },
  { icon: Puzzle, label: 'Seamless Integrations' },
  { icon: ShieldCheck, label: 'Secure & Reliable' },
]

const INDUSTRIES = [
  { icon: Warehouse, label: 'Warehouses' },
  { icon: HeartPulse, label: 'Medical / Hospitals' },
  { icon: Trees, label: 'Landscaping Equipment' },
  { icon: HardHat, label: 'Construction Equipment' },
  { icon: Wrench, label: 'Tools & Machinery' },
  { icon: Monitor, label: 'IT Assets' },
  { icon: PackageCheck, label: 'Rental Equipment' },
  { icon: Truck, label: 'Fleet Yards' },
  { icon: Factory, label: 'Manufacturing' },
  { icon: GraduationCap, label: 'Schools / Campuses' },
]

export default function AssetTracking() {
  useDocumentTitle(
    'Prosper Asset Tracking | RFID + GPS Asset Visibility',
    'Real-time RFID + GPS asset tracking with $0 upfront hardware, automated check-in/out, and multi-yard support. Book a free demo with Prosper Infotech.'
  )

  return (
    <>
      <section className="relative bg-gradient-to-b from-primary-dark to-navy overflow-hidden">
        <div className="pointer-events-none absolute top-1/3 right-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          <Reveal className="flex flex-col gap-5">
            <span className="inline-flex self-start items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
              RFID + GPS + AI Asset Visibility
            </span>
            <h1 className="text-white text-4xl md:text-5xl leading-tight">
              Prosper <span className="text-gold">Asset Tracking</span>
            </h1>
            <p className="text-2xl md:text-3xl font-heading font-bold leading-snug text-white">
              Real-Time Tracking, Alerts &amp; Control for Every Asset
            </p>
            <p className="text-white/80 text-lg max-w-xl">
              Track assets, tools, equipment, and inventory with RFID tags, fixed and handheld
              readers, and a cloud-based dashboard built for real-time visibility.
            </p>

            <span className="inline-flex self-start items-center gap-2 rounded-full bg-gold/15 border border-gold/40 px-4 py-2 text-sm font-semibold text-gold">
              $0 Upfront &middot; Free Hardware &middot; Pay Monthly &middot; First 2 Months Free
            </span>

            <div className="flex flex-wrap gap-3 mt-2">
              {STAT_BADGES.map((badge) => {
                const Icon = badge.icon
                return (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-2 rounded-lg bg-white/5 border border-white/15 px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    <Icon className="h-4 w-4 text-gold" />
                    {badge.label}
                  </span>
                )
              })}
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <Button href="#lead-form" variant="primary-dark">
                Book a Demo
              </Button>
              <Button
                href={`tel:${usaPhone.replace(/\s+/g, '')}`}
                variant="outline"
                icon={false}
                onClick={() =>
                  window.gtag?.('event', 'click_to_call', {
                    event_category: 'Asset Tracking Landing Page',
                  })
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
              <div className="absolute -inset-8 rounded-[2rem] bg-gold/10 blur-3xl" />
              <div className="relative z-10 overflow-hidden rounded-2xl border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]">
                <img
                  src={assetTrackingHero}
                  alt="Prosper Asset Tracking hardware and dashboard"
                  className="w-full"
                />
              </div>
              <motion.span
                className="absolute -top-3 left-2 z-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-semibold text-white"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                RFID + GPS
              </motion.span>
              <motion.span
                className="absolute bottom-6 -right-4 z-20 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-primary"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                AI Powered
              </motion.span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface-alt border-b border-ink-300">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <Reveal className="text-center mb-8">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">
              What's Included
            </span>
            <h2 className="mt-2 text-2xl md:text-3xl">Everything you need, out of the box</h2>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-3">
            {COMPONENTS.map((item) => {
              const Icon = item.icon
              return (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-2 rounded-full bg-white border border-ink-300 px-4 py-2.5 text-sm font-semibold text-ink-900 shadow-sm"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  {item.label}
                </span>
              )
            })}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
        <Reveal className="text-center mb-10">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Why Prosper Asset Tracking
          </span>
          <h2 className="mt-2 text-3xl">Built for real-time control</h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon
            return (
              <Reveal key={feature.label} delay={(i % 3) * 0.08}>
                <div className="flex items-center gap-4 rounded-lg bg-white border border-ink-300 px-5 py-5 shadow-sm hover:shadow-[0_0_50px_-8px_rgba(247,221,0,0.35),0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-300">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/20 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-ink-900 text-sm font-semibold">{feature.label}</span>
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
              Who we help
            </span>
            <h2 className="mt-2 text-3xl">Trusted across every asset-heavy operation</h2>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-3">
            {INDUSTRIES.map((industry) => {
              const Icon = industry.icon
              return (
                <span
                  key={industry.label}
                  className="inline-flex items-center gap-2 rounded-full border border-ink-300 bg-white px-4 py-2.5 text-sm font-semibold text-ink-700 shadow-sm"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  {industry.label}
                </span>
              )
            })}
          </div>
        </div>
      </section>

      <section id="lead-form" className="relative bg-gradient-to-b from-navy to-primary-dark overflow-hidden">
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-20 grid lg:grid-cols-2 gap-10 items-start">
          <Reveal className="flex flex-col gap-5">
            <h2 className="text-white text-3xl">Book your free demo</h2>
            <p className="text-white/80 text-lg">
              See Prosper Asset Tracking live — real-time dashboards, RFID reads, and alerts,
              walked through by our team.
            </p>
            <div className="flex flex-col gap-4 mt-2">
              <a
                href={`tel:${usaPhone.replace(/\s+/g, '')}`}
                onClick={() =>
                  window.gtag?.('event', 'click_to_call', {
                    event_category: 'Asset Tracking Landing Page',
                  })
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
                Proudly based in Dallas, Texas, USA — delivering AI-powered logistics solutions
                across the USA
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl">
            <h3 className="font-heading font-semibold text-primary text-xl mb-1">
              Get a free asset tracking demo
            </h3>
            <p className="text-sm text-ink-600 mb-5">
              Tell us about your assets — we'll respond within one business day.
            </p>
            <LandingLeadForm
              campaign="Asset Tracking Landing Page"
              submitLabel="Get a free demo"
              serviceLabel="What best describes your situation?"
              serviceOptions={[
                'New RFID + GPS deployment',
                'Expanding an existing deployment',
                'Evaluating / comparing vendors',
                'Just researching for now',
              ]}
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
