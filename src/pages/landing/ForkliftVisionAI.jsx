import {
  Camera,
  Boxes,
  ScanSearch,
  Cpu,
  Layers3,
  ShieldAlert,
  Puzzle,
  Warehouse,
  Factory,
  Truck,
  Snowflake,
  PhoneCall,
  Mail,
  MapPin,
  Eye,
  MapPinned,
  PackageSearch,
} from 'lucide-react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Button from '../../components/ui/Button'
import Reveal from '../../components/motion/Reveal'
import LandingLeadForm from '../../components/forms/LandingLeadForm'
import LeadFormPopup from '../../components/forms/LeadFormPopup'
import ProcessSteps from '../../components/ui/ProcessSteps'
import FAQAccordion from '../../components/ui/FAQAccordion'
import ScrollProgressBar from '../../components/ui/ScrollProgressBar'
import ClientLogoStrip from '../../components/ui/ClientLogoStrip'
import CallDropdown from '../../components/layout/CallDropdown'
import { SHOW_CLIENTS } from '../../data/clients'
import { OFFICES } from '../../data/offices'
import forkliftHero from '../../assets/hero-slide-forklift.jpg'
import useDocumentTitle from '../../hooks/useDocumentTitle'

const STAT_BADGES = [
  { icon: Eye, label: 'Real-Time Pallet Detection' },
  { icon: MapPinned, label: 'Rack Location Accuracy' },
  { icon: ShieldAlert, label: 'Safety & Zone Monitoring' },
]

const WORKFLOW = [
  { icon: Camera, title: 'Capture', description: '8MP cameras and 3D depth sensors mounted on the forklift.' },
  { icon: Cpu, title: 'Detect', description: 'Edge AI identifies pallets, racks, aisles and people in real time.' },
  { icon: ScanSearch, title: 'Validate', description: 'OCR confirms pallet ID, rack location and putaway/pick accuracy.' },
  { icon: Puzzle, title: 'Update', description: 'Inventory position and task status sync to your WMS/YMS automatically.' },
]

const FEATURES = [
  { icon: Boxes, label: 'Pallet Pickup & Putaway Validation', description: 'Confirms every pickup and putaway against the correct pallet and rack location automatically.' },
  { icon: MapPinned, label: 'Rack Location Intelligence', description: 'Tracks exact aisle, bay and tier — no more manual location entry or mis-shelved pallets.' },
  { icon: Layers3, label: '3D Depth Sensing', description: 'Depth cameras measure fork height, load position and clearance in real time.' },
  { icon: PackageSearch, label: 'Staging & Inventory Validation', description: 'Confirms staged loads match dispatch orders before they leave the dock.' },
  { icon: ShieldAlert, label: 'Safety & Zone Monitoring', description: 'Detects people, obstacles and restricted-zone entry to reduce incidents.' },
  { icon: Puzzle, label: 'Fast WMS / YMS Integration', description: 'Task and inventory data flow directly into your existing warehouse or yard system.' },
]

const INDUSTRIES = [
  { icon: Warehouse, label: 'Warehouses' },
  { icon: Factory, label: 'Manufacturing' },
  { icon: Truck, label: 'Distribution Centers' },
  { icon: Snowflake, label: 'Cold Storage' },
  { icon: Boxes, label: '3PL / Logistics' },
]

const PROCESS_STEPS = [
  {
    title: 'Free Consultation',
    description: 'We assess your fleet, racking layout and pallet flow — no cost, no obligation.',
  },
  {
    title: 'Install & Calibrate',
    description: '8MP cameras and 3D depth sensors are mounted and calibrated on your forklift fleet.',
  },
  {
    title: 'Go Live',
    description: 'Pallet, rack and location detection start flowing into your dashboard and WMS/YMS.',
  },
  {
    title: 'Ongoing Support',
    description: 'Our team monitors accuracy, tunes detection models and scales across additional forklifts.',
  },
]

const FAQS = [
  {
    question: 'Does ForkliftVision AI work on our existing forklift fleet?',
    answer: "In most cases yes — the camera and sensor kit is designed to retrofit onto standard forklifts. We'll confirm compatibility during your free consultation.",
  },
  {
    question: 'Does it replace our WMS or YMS?',
    answer: 'No — it integrates with your existing WMS/YMS through APIs, automating the pallet, location and task data that would otherwise be entered manually.',
  },
  {
    question: 'How accurate is rack location detection?',
    answer: 'Detection combines 3D depth sensing with OCR and is tuned to your specific racking layout, validated against live operations before full rollout.',
  },
  {
    question: 'How long does deployment take?',
    answer: 'Most deployments go live within a few weeks of the free consultation, depending on fleet size and racking complexity.',
  },
  {
    question: 'Is support included after go-live?',
    answer: 'Yes — ongoing monitoring, model tuning and support are included as part of your plan.',
  },
]

export default function ForkliftVisionAI() {
  useDocumentTitle(
    'Prosper ForkliftVision AI | AI-Powered Pallet & Location Intelligence',
    '8MP cameras, 3D depth sensing, OCR and Edge AI for pallet pickup, rack location, putaway, staging and inventory validation. Book a free demo with Prosper Infotech.'
  )

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

      <LeadFormPopup
        campaign="Forklift Vision AI Landing Page (Popup)"
        title="Book your free ForkliftVision AI demo"
        description="See real-time pallet detection and rack location dashboards — no cost, no obligation."
        submitLabel="Get a free demo"
        serviceLabel="What best describes your situation?"
        serviceOptions={[
          'New forklift AI deployment',
          'Expanding an existing deployment',
          'Evaluating / comparing vendors',
          'Just researching for now',
        ]}
      />

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
              AI-Powered Pallet &amp; Location Intelligence
            </span>
            <h1 className="text-white text-4xl md:text-5xl leading-tight">
              Prosper <span className="text-gold">ForkliftVision AI</span>
            </h1>
            <p className="text-2xl md:text-3xl font-heading font-bold leading-snug text-white">
              See Every Pallet. Confirm Every Location.
            </p>
            <p className="text-white/80 text-lg max-w-xl">
              8MP cameras, 3D depth sensing, OCR and Edge AI mounted on your forklifts — automating
              pallet pickup, rack location, putaway, staging and inventory validation.
            </p>

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
              <CallDropdown
                eventCategory="Forklift Vision AI Landing Page"
                align="left"
                triggerClassName="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-200 bg-white/10 backdrop-blur-sm text-white border border-white/40 shadow-md hover:bg-white hover:text-primary-dark hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
              >
                <PhoneCall className="h-4 w-4" />
                Call Us
              </CallDropdown>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:hidden mt-2">
            <img
              src={forkliftHero}
              alt="ForkliftVision AI pallet and rack location detection"
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
                <img src={forkliftHero} alt="ForkliftVision AI pallet and rack location detection" className="w-full" />
              </motion.div>
              <motion.span
                className="absolute -top-3 left-2 z-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-semibold text-white"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                3D Depth Sensing
              </motion.span>
              <motion.span
                className="absolute bottom-6 -right-4 z-20 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-primary"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                Edge AI Powered
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
              How It Sees
            </span>
            <h2 className="mt-2 text-3xl">From capture to your WMS/YMS</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW.map((step, i) => {
              const Icon = step.icon
              return (
                <Reveal key={step.title} delay={i * 0.08}>
                  <div className="h-full rounded-lg bg-white border border-ink-300 px-5 py-5 shadow-sm hover:shadow-[0_0_50px_-8px_rgba(247,221,0,0.35),0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-300">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/20 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-ink-900 text-sm font-bold">{step.title}</h3>
                    <p className="mt-1.5 text-xs text-ink-600 leading-relaxed">{step.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden max-w-6xl mx-auto px-6 pb-16 lg:pb-20">
        <Reveal className="relative text-center mb-10">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            How It Works
          </span>
          <h2 className="mt-2 text-3xl">From consultation to live tracking</h2>
        </Reveal>
        <ProcessSteps steps={PROCESS_STEPS} />
      </section>

      <section className="relative overflow-hidden max-w-6xl mx-auto px-6 py-16 lg:py-20">
        <motion.div
          className="pointer-events-none absolute bottom-0 -left-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <Reveal className="relative text-center mb-10">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Why ForkliftVision AI
          </span>
          <h2 className="mt-2 text-3xl">Built for real warehouse floors</h2>
        </Reveal>
        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon
            return (
              <Reveal key={feature.label} delay={(i % 3) * 0.08}>
                <div className="h-full rounded-lg bg-white border border-ink-300 px-5 py-5 shadow-sm hover:shadow-[0_0_50px_-8px_rgba(247,221,0,0.35),0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-300">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/20 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-ink-900 text-sm font-bold">{feature.label}</h3>
                  <p className="mt-1.5 text-sm text-ink-600 leading-relaxed">{feature.description}</p>
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
            <h2 className="mt-2 text-3xl text-white">Built for high-volume floors</h2>
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

      {SHOW_CLIENTS && (
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
      )}

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
            <h2 className="text-white text-3xl">Book your free ForkliftVision AI demo</h2>
            <p className="text-white/80 text-lg">
              See ForkliftVision AI live — real-time pallet detection and rack location tracking,
              walked through by our team.
            </p>
            <div className="flex flex-col gap-4 mt-2">
              {OFFICES.map((office) => (
                <a
                  key={office.country}
                  href={`tel:${office.phone.replace(/\s+/g, '')}`}
                  onClick={() =>
                    window.gtag?.('event', 'click_to_call', {
                      event_category: 'Forklift Vision AI Landing Page',
                      event_label: office.country,
                    })
                  }
                  className="inline-flex items-center gap-3 rounded-lg bg-white/5 border border-white/15 px-5 py-4 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  <PhoneCall className="h-5 w-5 text-gold" />
                  {office.country}: {office.phone}
                </a>
              ))}
              <a
                href="mailto:sales@prosperinfotech.com"
                className="inline-flex items-center gap-3 rounded-lg bg-white/5 border border-white/15 px-5 py-4 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                <Mail className="h-5 w-5 text-gold" />
                sales@prosperinfotech.com
              </a>
              <span className="inline-flex items-center gap-3 rounded-lg bg-white/5 border border-white/15 px-5 py-4 text-white/80 text-sm">
                <MapPin className="h-5 w-5 text-gold shrink-0" />
                Offices in Dallas, Texas, USA and Pune, India — delivering AI-powered logistics
                solutions worldwide
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl">
            <h3 className="font-heading font-semibold text-primary text-xl mb-1">
              Get a free ForkliftVision AI demo
            </h3>
            <p className="text-sm text-ink-600 mb-5">
              Tell us about your fleet and racking layout — we'll respond within one business day.
            </p>
            <LandingLeadForm
              campaign="Forklift Vision AI Landing Page"
              submitLabel="Get a free demo"
              serviceLabel="What best describes your situation?"
              serviceOptions={[
                'New forklift AI deployment',
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
