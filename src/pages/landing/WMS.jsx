import {
  Warehouse,
  PackageCheck,
  ScanBarcode,
  Layers,
  Boxes,
  Truck,
  LineChart,
  Puzzle,
  ShieldCheck,
  Factory,
  Store,
  Snowflake,
  Building2,
  PhoneCall,
  Mail,
  MapPin,
  LogIn,
  ArrowDownToLine,
  PackageSearch,
  PackagePlus,
  PackageX,
  ArrowRight,
  Link2,
  Cloud,
  LayoutDashboard,
  Package,
  Wrench,
  UsersRound,
  MessageCircle,
} from 'lucide-react'
import { motion } from 'framer-motion'
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
import wmsHero from '../../assets/wms-hero.jpg'
import useDocumentTitle from '../../hooks/useDocumentTitle'

const STAT_BADGES = [
  { icon: LineChart, label: 'Real-Time Stock Visibility' },
  { icon: PackageCheck, label: 'Faster Order Fulfillment' },
  { icon: Puzzle, label: 'ERP / TMS Integration' },
]

const RFID_PROCESS = [
  { icon: ScanBarcode, title: 'RFID Tunnel / Conveyor Read', description: 'Automatically scan each box RFID before palletizing.' },
  { icon: Boxes, title: 'Pallet Build — RFID Tracking', description: 'Link each box and serial number to the pallet as it is built.' },
  { icon: ShieldCheck, title: 'Stretch-Wrapper RFID Verification', description: 'Verify box RFID tags while the pallet is being wrapped.' },
  { icon: PackageCheck, title: 'Full-Pallet RFID Read', description: 'Read the completed pallet using a multi-antenna RFID setup.' },
]

const WORKFLOW = [
  { icon: LogIn, title: 'Receiving' },
  { icon: ArrowDownToLine, title: 'Put-Away' },
  { icon: Layers, title: 'Storage' },
  { icon: PackageSearch, title: 'Picking' },
  { icon: PackagePlus, title: 'Packing' },
  { icon: PackageX, title: 'Dispatch' },
]

const DATA_FLOW = [
  'Barcode / RFID Scan',
  'WMS Engine',
  'Task Assignment',
  'Mobile / Handheld Device',
  'ERP / TMS Sync',
  'Dashboard & Reports',
]

const TECH_STACK_GROUPS = [
  { title: 'Hardware', icon: ScanBarcode, items: ['Barcode Scanners', 'RFID Readers & Antennas', 'Handheld Mobile Computers', 'Label Printers'] },
  { title: 'Software Platform', icon: LayoutDashboard, items: ['Cloud Dashboard', 'Mobile App', 'Rules Engine', 'Reporting & Analytics'] },
  { title: 'Integration', icon: Link2, items: ['REST APIs', 'EDI', 'SAP / NetSuite / Dynamics', 'TMS Integration'] },
  { title: 'Cloud & Infrastructure', icon: Cloud, items: ['Microsoft Azure', 'AWS', 'Multi-Tenant SaaS', 'Role-Based Access Control'] },
]

const ENGAGEMENT_MODELS = [
  { icon: Package, title: 'Software Only', description: 'Bring your own barcode/RFID hardware — connect to Prosper WMS software and dashboards.' },
  { icon: Boxes, title: 'Software + Hardware Bundle', description: 'Barcode scanners, RFID readers and handheld devices included and configured for you.' },
  { icon: Wrench, title: 'Managed Implementation', description: 'Full setup, data migration, staff training and go-live support handled by our team.' },
  { icon: UsersRound, title: 'Enterprise / Multi-Site', description: 'Custom SLAs, dedicated account management and multi-warehouse rollout planning.' },
]

const FEATURES = [
  { icon: LineChart, label: 'Real-Time Inventory Visibility', description: 'Live stock levels across every bin, zone and warehouse.' },
  { icon: LogIn, label: 'Inbound Receiving & Put-Away', description: 'Guided receiving workflows that route stock to the right location automatically.' },
  { icon: PackageSearch, label: 'Picking & Packing Workflows', description: 'Wave, batch and zone picking configured around how your floor actually works.' },
  { icon: ScanBarcode, label: 'Barcode & RFID Support', description: 'Scan-driven accuracy at every step, from receiving to dispatch.' },
  { icon: Boxes, label: 'Batch / Lot / Serial Tracking', description: 'Full traceability for regulated, perishable or high-value inventory.' },
  { icon: ShieldCheck, label: 'Cycle Count & Audits', description: 'Continuous, low-disruption inventory accuracy checks instead of full shutdown counts.' },
  { icon: Building2, label: 'Multi-Warehouse Support', description: 'One system across every site, with site-level and network-level visibility.' },
  { icon: Puzzle, label: 'API / ERP / TMS Integration', description: 'Connects into the systems you already run — no rip-and-replace required.' },
]

const INDUSTRIES = [
  { icon: Building2, label: 'Distribution Centers' },
  { icon: Warehouse, label: 'Warehouses' },
  { icon: Factory, label: 'Manufacturing' },
  { icon: Store, label: 'Retail Fulfillment' },
  { icon: Snowflake, label: 'Cold Chain' },
  { icon: Truck, label: '3PL / Logistics' },
]

const PROCESS_STEPS = [
  {
    title: 'Free Consultation',
    description: 'We review your warehouse layout, SKU mix and current workflows — no cost, no obligation.',
  },
  {
    title: 'Configure & Integrate',
    description: 'Receiving, put-away, picking and packing workflows are configured around your operation and connected to your ERP/TMS.',
  },
  {
    title: 'Go Live',
    description: 'Your team starts working from real-time dashboards, barcode/RFID scanning and live stock counts.',
  },
  {
    title: 'Ongoing Support',
    description: 'Our team monitors, tunes and scales the system with you as order volume and SKU count grow.',
  },
]

const FAQS = [
  {
    question: 'Can Prosper WMS integrate with our existing ERP or TMS?',
    answer: 'Yes — Prosper WMS is built with open APIs and integrates with common ERP, TMS and accounting systems, so you keep your existing systems of record.',
  },
  {
    question: 'Do you support multiple warehouses or sites?',
    answer: 'Yes — Prosper WMS supports multi-warehouse and multi-site operations from a single system, with both site-level and network-level visibility.',
  },
  {
    question: 'Do we need to replace our barcode scanners or hardware?',
    answer: "Usually not — Prosper WMS is designed to work with standard barcode and RFID hardware. We'll confirm compatibility during your free consultation.",
  },
  {
    question: 'How long does implementation take?',
    answer: 'Most single-site implementations go live within a few weeks of your free consultation, depending on SKU count, integrations and workflow complexity.',
  },
  {
    question: "What if we're still comparing WMS vendors?",
    answer: "That's fine — the consultation and demo are free with no obligation, so you can compare real workflows and dashboards before deciding.",
  },
  {
    question: 'Can you migrate our existing inventory data?',
    answer: 'Yes — our implementation team handles data migration from your current system or spreadsheets as part of onboarding.',
  },
  {
    question: 'Does it work if our warehouse has poor or no connectivity in some zones?',
    answer: 'Yes — handheld devices can keep scanning in low-connectivity areas and sync automatically once back in range, so work never has to stop.',
  },
  {
    question: 'Is staff training included?',
    answer: 'Yes — training for your receiving, picking, packing and dispatch teams is included as part of implementation.',
  },
  {
    question: 'How is our data secured?',
    answer: 'Data is hosted on Microsoft Azure or AWS with role-based access control, so each user only sees the locations and functions their role requires.',
  },
]

export default function WMS() {
  useDocumentTitle(
    'Prosper WMS | Warehouse Management System',
    'Real-time inventory control, put-away, picking, packing and dispatch. Prosper WMS integrates with your ERP/TMS for faster fulfillment and fewer errors. Book a free demo.'
  )

  return (
    <>
      <ScrollProgressBar />

      <LeadFormPopup
        campaign="WMS Landing Page (Popup)"
        title="Book your free WMS demo"
        description="See real-time inventory, picking and dispatch dashboards — no cost, no obligation."
        submitLabel="Get a free demo"
        serviceLabel="What best describes your situation?"
        serviceOptions={[
          'New WMS implementation',
          'Replacing an existing WMS',
          'Evaluating / comparing vendors',
          'Just researching for now',
        ]}
      />

      <section className="relative overflow-hidden bg-navy">
        <img
          src={wmsHero}
          alt="Prosper WMS warehouse operations"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-navy/15" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-navy/55 via-navy/10 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy/60 via-navy/15 to-transparent" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 65% 75% at center, rgba(15,23,42,0.55), transparent 70%)' }}
        />

        <div className="relative flex flex-col">
          <div className="flex items-center">
            <div className="max-w-6xl mx-auto px-6 pt-8 sm:pt-10 lg:pt-12 pb-3 sm:pb-4 w-full">
              <Reveal className="flex flex-col items-center text-center gap-2 sm:gap-3 max-w-xl mx-auto">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-gold">
                  Prosper WMS
                </span>
                <h1 className="text-white text-3xl sm:text-4xl md:text-5xl leading-tight [text-shadow:0_2px_16px_rgba(0,0,0,0.7)]">
                  Prosper <span className="text-gold">Warehouse Management System</span>
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl font-heading font-bold leading-snug text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.7)]">
                  Real-Time Inventory Control, Faster Fulfillment
                </p>
                <p className="text-white/90 text-sm sm:text-base md:text-lg [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]">
                  Receiving, put-away, picking, packing and dispatch — one connected system with
                  live inventory visibility and full ERP/TMS integration.
                </p>

                <div className="flex flex-wrap justify-center gap-3 mt-1">
                  {STAT_BADGES.map((badge, i) => {
                    const Icon = badge.icon
                    return (
                      <motion.span
                        key={badge.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                        className="inline-flex items-center gap-2 rounded-lg bg-navy/40 backdrop-blur-[2px] border border-white/20 px-4 py-2.5 text-sm font-semibold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.8)] transition-all duration-300 hover:bg-navy/55 hover:-translate-y-0.5"
                      >
                        <Icon className="h-4 w-4 text-gold" />
                        {badge.label}
                      </motion.span>
                    )
                  })}
                </div>

                <div className="flex flex-wrap justify-center gap-3 mt-1 sm:mt-2">
                  <div className="relative">
                    <span className="absolute inset-0 rounded-lg bg-gold/50 blur-md animate-pulse" />
                    <Button
                      href="https://calendly.com/prosperinfotech-sales/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary-dark"
                      className="relative"
                      onClick={() =>
                        window.gtag?.('event', 'cta_click', {
                          event_category: 'WMS Landing Page',
                          event_label: 'Hero - Book a Demo',
                        })
                      }
                    >
                      Book a Demo
                    </Button>
                  </div>
                  <CallDropdown
                    eventCategory="WMS Landing Page"
                    align="left"
                    triggerClassName="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-200 bg-white/10 backdrop-blur-sm text-white border border-white/40 shadow-md hover:bg-white hover:text-primary-dark hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                  >
                    <PhoneCall className="h-4 w-4" />
                    Call Us
                  </CallDropdown>
                  <a
                    href={`https://wa.me/19407583271?text=${encodeURIComponent(
                      "Hi, I'd like to know more about Prosper WMS."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      window.gtag?.('event', 'click_whatsapp', { event_category: 'WMS Landing Page (Hero)' })
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-[#25D366]/40 bg-[#25D366]/15 backdrop-blur-sm px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#25D366]/25 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                  >
                    <svg viewBox="0 0 32 32" className="h-4 w-4 fill-[#25D366]" aria-hidden="true">
                      <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.386.702 4.607 1.912 6.472L4 29l7.72-1.876A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.818c-1.98 0-3.83-.562-5.4-1.535l-.387-.23-4.583 1.114 1.13-4.47-.253-.398A9.77 9.77 0 0 1 5.182 15c0-5.964 4.858-10.818 10.822-10.818S26.818 9.036 26.818 15 21.968 24.818 16.004 24.818Zm5.94-8.144c-.325-.163-1.925-.95-2.223-1.058-.298-.109-.516-.163-.733.163-.217.325-.842 1.058-1.033 1.276-.19.217-.38.244-.706.081-.325-.163-1.374-.506-2.617-1.612-.968-.862-1.622-1.927-1.812-2.252-.19-.325-.02-.5.143-.663.147-.146.325-.38.488-.57.163-.19.217-.325.325-.543.109-.217.054-.407-.027-.57-.081-.163-.733-1.765-1.004-2.417-.264-.635-.532-.55-.733-.56l-.625-.011c-.217 0-.57.081-.868.407-.298.325-1.137 1.112-1.137 2.712 0 1.6 1.164 3.147 1.326 3.364.163.217 2.29 3.497 5.55 4.904.775.335 1.38.535 1.852.684.778.247 1.486.212 2.046.129.624-.093 1.925-.787 2.196-1.547.271-.76.271-1.412.19-1.548-.081-.135-.298-.216-.624-.38Z" />
                    </svg>
                    WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      window.gtag?.('event', 'click_chat', { event_category: 'WMS Landing Page (Hero)' })
                      window.Tawk_API?.maximize?.()
                    }}
                    className="inline-flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm text-white border border-white/40 shadow-md px-6 py-2.5 text-sm font-semibold transition-all duration-200 hover:bg-white hover:text-primary-dark hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat
                  </button>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.2} className="shrink-0 pt-3 sm:pt-4 lg:pt-5 pb-9 sm:pb-11 md:pb-12 lg:pb-14">
            <div className="max-w-6xl mx-auto px-6">
              <p className="text-center text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-gold mb-2 sm:mb-3 [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]">
                RFID-Powered Warehouse Process
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {RFID_PROCESS.map((step, i) => {
                  const Icon = step.icon
                  return (
                    <div
                      key={step.title}
                      className="flex flex-col gap-1 rounded-lg border border-white/15 bg-navy/40 backdrop-blur-[2px] p-2 sm:p-3"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-primary text-[10px] font-bold shrink-0">
                          {i + 1}
                        </span>
                        <Icon className="h-3.5 w-3.5 text-gold shrink-0" />
                      </div>
                      <h4 className="text-white text-[11px] sm:text-xs font-bold leading-snug line-clamp-2">
                        {step.title}
                      </h4>
                      <p className="hidden sm:block text-[11px] text-white/70 leading-snug line-clamp-2">
                        {step.description}
                      </p>
                    </div>
                  )
                })}
              </div>
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
              One System, Every Step
            </span>
            <h2 className="mt-2 text-3xl">From receiving to dispatch</h2>
          </Reveal>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {WORKFLOW.map((step, i) => {
              const Icon = step.icon
              return (
                <Reveal key={step.title} delay={i * 0.06} className="flex items-center gap-3">
                  <span className="group inline-flex items-center gap-2 rounded-full border border-ink-300 bg-white px-4 py-2.5 text-sm font-semibold text-ink-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_8px_20px_-6px_rgba(247,221,0,0.4)]">
                    <Icon className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                    {step.title}
                  </span>
                  {i < WORKFLOW.length - 1 && (
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
                      className="text-gold-dark"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  )}
                </Reveal>
              )
            })}
          </div>

          <Reveal
            delay={0.1}
            className="relative mt-10 overflow-hidden rounded-2xl border border-ink-300 bg-white p-6 shadow-[0_2px_10px_-4px_rgba(15,23,42,0.08)] overflow-x-auto"
          >
            <div className="pointer-events-none absolute -top-8 right-0 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
            <p className="relative text-center text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              How the data moves
            </p>
            <div className="relative flex flex-wrap items-center justify-center gap-2">
              {DATA_FLOW.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="rounded-full border border-ink-300 bg-surface-alt px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold">
                    {step}
                  </span>
                  {i < DATA_FLOW.length - 1 && (
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
                    >
                      <ArrowRight className="h-4 w-4 text-gold-dark shrink-0" />
                    </motion.span>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden max-w-6xl mx-auto px-6 pb-16 lg:pb-20">
        <Reveal className="relative text-center mb-10">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            How It Works
          </span>
          <h2 className="mt-2 text-3xl">From consultation to live operations</h2>
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
            What's Included
          </span>
          <h2 className="mt-2 text-3xl">Built for real warehouse operations</h2>
        </Reveal>
        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon
            return (
              <Reveal key={feature.label} delay={(i % 4) * 0.06}>
                <div className="group relative h-full overflow-hidden rounded-2xl bg-white border border-ink-300 px-5 py-5 shadow-[0_2px_10px_-4px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_0_40px_-10px_rgba(247,221,0,0.4)]">
                  <span className="pointer-events-none absolute -top-2 -right-1 text-4xl font-black text-primary/[0.04] group-hover:text-gold/10 transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-gold/25 to-gold/5 ring-1 ring-inset ring-gold/20 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="relative mt-4 text-ink-900 text-sm font-bold">{feature.label}</h3>
                  <p className="relative mt-1.5 text-sm text-ink-600 leading-relaxed">{feature.description}</p>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-dark transition-transform duration-300 group-hover:scale-x-100" />
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="relative overflow-hidden bg-surface-alt border-y border-ink-300">
        <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-20">
          <Reveal className="text-center mb-10">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">
              Engagement Options
            </span>
            <h2 className="mt-2 text-3xl">Choose how you want to run Prosper WMS</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ENGAGEMENT_MODELS.map((model, i) => {
              const Icon = model.icon
              const featured = i === 2
              return (
                <Reveal key={model.title} delay={i * 0.08}>
                  <div
                    className={`relative h-full rounded-2xl border bg-white px-5 py-6 transition-all duration-300 hover:-translate-y-1.5 ${
                      featured
                        ? 'border-gold shadow-[0_0_0_1px_rgba(247,221,0,0.4),0_20px_45px_-15px_rgba(247,221,0,0.5)]'
                        : 'border-ink-300 shadow-[0_2px_10px_-4px_rgba(15,23,42,0.08)] hover:border-gold/50 hover:shadow-[0_0_40px_-10px_rgba(247,221,0,0.35)]'
                    }`}
                  >
                    {featured && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-gold to-gold-dark px-4 py-1 text-[10px] font-bold uppercase tracking-wide text-primary shadow-md">
                        Most Chosen
                      </span>
                    )}
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                        featured ? 'bg-gradient-to-br from-gold to-gold-dark shadow-md' : 'bg-gradient-to-br from-gold/25 to-gold/5 ring-1 ring-inset ring-gold/20'
                      }`}
                    >
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mt-4 text-ink-900 text-base font-bold">{model.title}</h3>
                    <p className="mt-2 text-sm text-ink-600 leading-relaxed">{model.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden max-w-6xl mx-auto px-6 py-16 lg:py-20">
        <Reveal className="text-center mb-10">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Technology Stack
          </span>
          <h2 className="mt-2 text-3xl">What's under the hood</h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TECH_STACK_GROUPS.map((group, i) => {
            const Icon = group.icon
            return (
              <Reveal key={group.title} delay={i * 0.06}>
                <div className="group h-full overflow-hidden rounded-2xl bg-white border border-ink-300 shadow-[0_2px_10px_-4px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_0_40px_-10px_rgba(247,221,0,0.3)]">
                  <div className="flex items-center gap-2.5 bg-gradient-to-b from-[#FFFBEA] to-white border-b border-ink-300 px-5 py-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-inset ring-gold/25 shrink-0 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-ink-900 text-sm font-bold uppercase tracking-wide">{group.title}</h3>
                  </div>
                  <div className="p-5 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-surface-alt border border-ink-300 px-2.5 py-1 text-[11px] font-semibold text-ink-600 transition-colors group-hover:border-gold/40"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
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
            <h2 className="mt-2 text-3xl text-white">Built for high-volume operations</h2>
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
            <h2 className="text-white text-3xl">Book your free WMS demo</h2>
            <p className="text-white/80 text-lg">
              See Prosper WMS live — real-time inventory, picking and dispatch dashboards, walked
              through by our team.
            </p>
            <div className="flex flex-col gap-4 mt-2">
              {OFFICES.map((office) => (
                <a
                  key={office.country}
                  href={`tel:${office.phone.replace(/\s+/g, '')}`}
                  onClick={() =>
                    window.gtag?.('event', 'click_to_call', {
                      event_category: 'WMS Landing Page',
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

          <Reveal
            delay={0.1}
            className="relative overflow-hidden rounded-2xl border-t-4 border-t-gold bg-white p-6 sm:p-8 shadow-xl"
          >
            <div className="pointer-events-none absolute top-0 right-0 w-40 h-40 bg-gold/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            <h3 className="font-heading font-semibold text-primary text-xl mb-1">
              Get a free WMS demo
            </h3>
            <p className="text-sm text-ink-600 mb-5">
              Tell us about your warehouse — we'll respond within one business day.
            </p>
            <LandingLeadForm
              campaign="WMS Landing Page"
              submitLabel="Get a free demo"
              serviceLabel="What best describes your situation?"
              serviceOptions={[
                'New WMS implementation',
                'Replacing an existing WMS',
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
