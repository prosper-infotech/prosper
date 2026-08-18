import {
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
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'
import Button from '../../components/ui/Button'
import Reveal from '../../components/motion/Reveal'
import LandingLeadForm from '../../components/forms/LandingLeadForm'
import ProcessSteps from '../../components/ui/ProcessSteps'
import FAQAccordion from '../../components/ui/FAQAccordion'
import VisualGallery from '../../components/ui/VisualGallery'
import ScrollProgressBar from '../../components/ui/ScrollProgressBar'
import ClientLogoStrip from '../../components/ui/ClientLogoStrip'
import { OFFICES } from '../../data/offices'
import assetTrackingHero from '../../assets/asset-tracking-hero.jpg'
import galleryRfidScan from '../../assets/asset-tracking-gallery-rfid-scan.jpg'
import galleryDashboard from '../../assets/asset-tracking-gallery-dashboard.jpg'
import galleryYard from '../../assets/asset-tracking-gallery-yard.jpg'
import galleryInstall from '../../assets/asset-tracking-gallery-install.jpg'
import cardRfidLabelTag from '../../assets/asset-tracking-card-rfid-label-tag.jpg'
import cardRuggedTag from '../../assets/asset-tracking-card-rugged-tag.jpg'
import cardFixedReader from '../../assets/asset-tracking-card-fixed-reader.jpg'
import cardHandheldReader from '../../assets/asset-tracking-card-handheld-reader.jpg'
import cardDashboard from '../../assets/asset-tracking-card-dashboard.jpg'
import cardMobileApp from '../../assets/asset-tracking-card-mobile-app.jpg'
import useDocumentTitle from '../../hooks/useDocumentTitle'

const usaPhone = OFFICES[0].phone

const STAT_BADGES = [
  { icon: Eye, label: 'Real-Time Visibility' },
  { icon: ClipboardCheck, label: 'Automated Check-In/Out' },
  { icon: MapPin, label: 'Multi Yard Support' },
]

const COMPONENTS = [
  { image: cardRfidLabelTag, label: 'RFID Label Tag' },
  { image: cardRuggedTag, label: 'Rugged RFID Tag' },
  { image: cardFixedReader, label: 'Fixed RFID Reader Setup' },
  { image: cardHandheldReader, label: 'Handheld RFID Reader Setup' },
  { image: cardDashboard, label: 'Cloud Software Dashboard' },
  { image: cardMobileApp, label: 'Mobile App' },
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

const GALLERY = [
  { image: galleryRfidScan, caption: 'Scanning RFID tags in the warehouse' },
  { image: galleryDashboard, caption: 'Live dashboard, right on the warehouse floor' },
  { image: galleryYard, caption: 'Tracking trailers and containers in the yard' },
  { image: galleryInstall, caption: 'Our team installs and supports every deployment' },
]

const PROCESS_STEPS = [
  {
    title: 'Free Consultation',
    description: 'We assess your assets, tagging needs, and site layout — no cost, no obligation.',
  },
  {
    title: 'Tag & Deploy',
    description: 'RFID tags, fixed/handheld readers, and gateways installed with $0 upfront hardware.',
  },
  {
    title: 'Go Live',
    description: 'Your cloud dashboard and mobile app start tracking assets in real time.',
  },
  {
    title: 'Ongoing Support',
    description: 'Our team monitors, maintains, and scales the system with you as you grow.',
  },
]

const FAQS = [
  {
    question: 'Do we have to pay anything upfront for hardware?',
    answer:
      "No — hardware is provided at $0 upfront, and your first 2 months are free. You pay a simple monthly fee after that.",
  },
  {
    question: 'How long does deployment take?',
    answer:
      'Most single-site deployments go live within a few weeks of your free consultation, depending on the number of assets and readers involved.',
  },
  {
    question: 'Can it integrate with our existing systems?',
    answer:
      'Yes — Prosper Asset Tracking is built with open APIs and integrates with common ERP, WMS, and inventory systems.',
  },
  {
    question: "What if we're just comparing vendors right now?",
    answer:
      "That's fine — the demo is free with no obligation. Most teams use it to compare real dashboards and hardware side by side before deciding.",
  },
  {
    question: 'Is support included?',
    answer: 'Yes, ongoing monitoring and support are included as part of your monthly plan.',
  },
]

export default function AssetTracking() {
  useDocumentTitle(
    'Prosper Asset Tracking | RFID + GPS Asset Visibility',
    'Real-time RFID + GPS asset tracking with $0 upfront hardware, automated check-in/out, and multi-yard support. Book a free demo with Prosper Infotech.'
  )

  const [showFloatingCta, setShowFloatingCta] = useState(false)
  useEffect(() => {
    function onScroll() {
      setShowFloatingCta(window.scrollY > 700)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-8, 8])
  function handleHeroTilt(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5)
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function resetHeroTilt() {
    tiltX.set(0)
    tiltY.set(0)
  }

  return (
    <>
      <ScrollProgressBar />

      <AnimatePresence>
        {showFloatingCta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="hidden lg:block fixed bottom-6 right-6 z-40"
          >
            <div className="relative">
              <span className="absolute inset-0 rounded-lg bg-gold/50 blur-md animate-pulse" />
              <Button href="#lead-form" variant="primary-dark" className="relative shadow-2xl">
                Book a Demo
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              RFID tags, fixed and handheld readers, and a live cloud dashboard — everything you
              need for real-time visibility into assets, tools, and equipment.
            </p>

            <span className="inline-flex self-start items-center gap-2 rounded-full bg-gold/15 border border-gold/40 px-4 py-2 text-sm font-semibold text-gold">
              $0 Upfront &middot; Free Hardware &middot; Pay Monthly &middot; First 2 Months Free
            </span>

            <div className="flex flex-wrap gap-3 mt-2">
              {STAT_BADGES.map((badge, i) => {
                const Icon = badge.icon
                return (
                  <motion.span
                    key={badge.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    className="inline-flex items-center gap-2 rounded-lg bg-white/5 border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
                  >
                    <Icon className="h-4 w-4 text-gold" />
                    {badge.label}
                  </motion.span>
                )
              })}
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <div className="relative">
                <span className="absolute inset-0 rounded-lg bg-gold/50 blur-md animate-pulse" />
                <Button href="#lead-form" variant="primary-dark" className="relative">
                  Book a Demo
                </Button>
              </div>
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

          <Reveal delay={0.15} className="lg:hidden mt-2">
            <img
              src={assetTrackingHero}
              alt="Prosper Asset Tracking hardware and dashboard"
              className="w-full max-w-sm mx-auto rounded-2xl border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]"
            />
          </Reveal>

          <Reveal delay={0.1} className="hidden lg:flex items-center justify-center">
            <div
              className="relative flex items-center justify-center max-w-md"
              style={{ perspective: 800 }}
              onMouseMove={handleHeroTilt}
              onMouseLeave={resetHeroTilt}
            >
              <motion.div
                className="absolute -inset-8 rounded-[2rem] bg-gold/10 blur-3xl"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="relative z-10 overflow-hidden rounded-2xl border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]"
                style={{ rotateX, rotateY }}
              >
                <img
                  src={assetTrackingHero}
                  alt="Prosper Asset Tracking hardware and dashboard"
                  className="w-full"
                />
              </motion.div>
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

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-10 left-0 h-72 w-72 -translate-x-1/3 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 translate-x-1/3 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-20">
          <Reveal className="text-center mb-12">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">
              How It Works
            </span>
            <h2 className="mt-2 text-3xl">From consultation to live tracking</h2>
          </Reveal>
          <ProcessSteps steps={PROCESS_STEPS} />
        </div>
      </section>

      <section className="relative overflow-hidden max-w-6xl mx-auto px-6 pb-16 lg:pb-20">
        <motion.div
          className="pointer-events-none absolute -top-10 right-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <Reveal className="relative text-center mb-10">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            See It In Action
          </span>
          <h2 className="mt-2 text-3xl">Real environments, real-time visibility</h2>
        </Reveal>
        <div className="relative">
          <VisualGallery items={GALLERY} />
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {COMPONENTS.map((item, i) => (
              <Reveal key={item.label} delay={(i % 6) * 0.06}>
                <div className="flex flex-col items-center gap-3 rounded-xl border border-ink-300 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_-8px_rgba(247,221,0,0.35),0_20px_40px_-12px_rgba(0,0,0,0.2)]">
                  <div className="aspect-square w-full overflow-hidden rounded-lg bg-surface-alt">
                    <img
                      src={item.image}
                      alt={item.label}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-semibold text-ink-900 text-center">
                    {item.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden max-w-6xl mx-auto px-6 py-16 lg:py-20">
        <motion.div
          className="pointer-events-none absolute bottom-0 -left-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <Reveal className="relative text-center mb-10">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Why Prosper Asset Tracking
          </span>
          <h2 className="mt-2 text-3xl">Built for real-time control</h2>
        </Reveal>
        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      <section className="relative overflow-hidden bg-gradient-to-b from-navy to-primary-dark">
        <div className="pointer-events-none absolute top-0 left-1/3 h-72 w-72 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <Reveal className="text-center mb-10">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Who we help
            </span>
            <h2 className="mt-2 text-3xl text-white">Trusted across every asset-heavy operation</h2>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-3">
            {INDUSTRIES.map((industry) => {
              const Icon = industry.icon
              return (
                <span
                  key={industry.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-white/10 hover:text-gold"
                >
                  <Icon className="h-4 w-4 text-gold" />
                  {industry.label}
                </span>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 translate-x-1/3 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-6 py-16">
          <Reveal className="text-center mb-10">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">
              Our Clients
            </span>
            <h2 className="mt-2 text-3xl">Companies that trust Prosper Infotech</h2>
          </Reveal>
          <ClientLogoStrip />
        </div>
      </section>

      <section className="bg-surface-alt">
        <div className="max-w-3xl mx-auto px-6 py-16 lg:py-20">
          <Reveal className="text-center mb-10">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">
              Common Questions
            </span>
            <h2 className="mt-2 text-3xl">Before you book a demo</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <FAQAccordion items={FAQS} />
          </Reveal>
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
