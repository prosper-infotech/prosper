import {
  BrainCircuit,
  Camera,
  Cpu,
  Radio,
  Satellite,
  Package,
  Link2,
  Container,
  Terminal,
  Lock,
  UserCog,
  UsersRound,
  Briefcase,
  Wrench,
  ArrowRight,
  ClipboardCheck,
  Sparkles,
  Zap,
  PhoneCall,
  MapPin,
  Check,
  Globe,
  Mail,
  MessageCircle,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../../components/ui/Button'
import Reveal from '../../components/motion/Reveal'
import LandingLeadForm from '../../components/forms/LandingLeadForm'
import FAQAccordion from '../../components/ui/FAQAccordion'
import ClientLogoStrip from '../../components/ui/ClientLogoStrip'
import { SHOW_CLIENTS } from '../../data/clients'
import LeadFormPopup from '../../components/forms/LeadFormPopup'
import { OFFICES } from '../../data/offices'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import heroTeamImg from '../../assets/tech-outsourcing-hero-team.jpg'
import dockVisionImg from '../../assets/hero-slide-dock-monitoring.jpg'
import yardVisionImg from '../../assets/hero-slide-iot-yard.jpg'
import assetTrackingProductImg from '../../assets/hero-slide-asset-tracking.jpg'
import forkliftVisionImg from '../../assets/hero-slide-forklift.jpg'
import containerVisionImg from '../../assets/hero-slide-cfs.jpg'
import assetFleetImg from '../../assets/hero-slide-fleet-gps.jpg'

const usaPhone = OFFICES[0].phone

// "Lumina Tech Framework" — light-mode design system for this page only.
const NAVY = 'text-[#0F172A]'
const CHARCOAL = 'text-[#334155]'
const BORDER = 'border-[#E2E8F0]'
const SURFACE = 'bg-[#F8FAFC]'
const TINT_GOLD = 'bg-gradient-to-b from-[#FFFBEA] via-[#FFFDF5] to-white'
const TINT_NAVY = 'bg-gradient-to-b from-[#EFF4FC] via-[#F5F8FD] to-white'
const HEADING_FONT = "font-['Plus_Jakarta_Sans']"
const BODY_FONT = "font-['Inter']"
const MONO_FONT = "font-['JetBrains_Mono']"

const SERVICE_OPTIONS = [
  'AI / ML',
  'Computer Vision / OCR',
  'RFID',
  'GPS / RTK',
  'Industrial IoT',
  'Edge AI',
  'WMS / YMS',
  'CFS / Container Automation',
  'Software Development',
  'Dedicated Engineering Resources',
  'Other',
]

const TRUST_STRIP = ['AI & IoT Engineering', 'Fast Team Extension', 'Flexible Engagement', 'USA + Global Delivery']

const STAFF_AUG_FLOW = [
  'Camera / RFID / GPS / Sensor / PLC',
  'EdgeBox / Gateway',
  'AI / ML / OCR',
  'API / MQTT / Cloud',
  'WMS / YMS / TMS / ERP',
  'Dashboard / Alerts / Automation',
]

const EXPERTISE = [
  {
    icon: BrainCircuit,
    title: 'AI & Machine Learning Engineering',
    description:
      'Computer vision models, object detection, tracking, classification, prediction, anomaly detection and operational decision intelligence.',
  },
  {
    icon: Camera,
    title: 'Computer Vision & OCR Engineering',
    description:
      'Container OCR, trailer recognition, license plates, pallet/barcode recognition, document OCR and video analytics.',
  },
  {
    icon: Cpu,
    title: 'Industrial IoT Engineering',
    description:
      'Sensors, PLC integration, Modbus, RS485, LoRaWAN, MQTT, gateways, telemetry, device monitoring and industrial automation.',
  },
  {
    icon: Radio,
    title: 'RFID Engineering',
    description:
      'Fixed/handheld RFID, antenna design, asset tracking, inventory automation, trailer tracking, portal/tunnel applications and middleware.',
  },
  {
    icon: Satellite,
    title: 'GPS / RTK / Telematics Engineering',
    description:
      'GPS/GNSS tracking, RTK positioning, fleet telemetry, geofencing, trailer location, mobile asset tracking and movement intelligence.',
  },
  {
    icon: Zap,
    title: 'Edge AI & Embedded Systems',
    description:
      'NVIDIA edge computing, Prosper AI EdgeBox, industrial gateways, local inference, offline processing, connectivity and edge-to-cloud architecture.',
  },
  {
    icon: Package,
    title: 'Logistics Software Engineering',
    description:
      'YMS, WMS, dock management, gate automation, appointment management, fleet systems, asset tracking and operational dashboards.',
  },
  {
    icon: Link2,
    title: 'Enterprise Integration',
    description:
      'REST APIs, ERP/WMS/TMS interfaces, MQTT, event processing, middleware, database integration and third-party connectivity.',
  },
  {
    icon: Container,
    title: 'CFS & Container Automation',
    description:
      'Container OCR, gate automation, yard inventory, reach-stacker automation, pickup/drop validation and CFS workflows.',
  },
  {
    icon: Terminal,
    title: 'IBM i / AS400 Engineering',
    description: 'Application support, RPG development, integration, modernization and enterprise production support.',
  },
]

const SOLUTIONS = [
  {
    image: dockVisionImg,
    title: 'DockVision AI',
    subtitle: 'IoT-Powered Dock Visibility',
    caption:
      'LoRaWAN sensors, PLC integration and analytics for door position, trailer presence, restraint, leveler and dock utilization.',
  },
  {
    image: yardVisionImg,
    title: 'YardVision AI',
    subtitle: 'Real-Time Yard Intelligence',
    caption: 'RFID, GPS/RTK, OCR and AI for trailer inventory, spotter operations, yard location and movement visibility.',
  },
  {
    image: assetTrackingProductImg,
    title: 'AssetTrack Platform',
    subtitle: 'End-to-End Asset Tracking Hardware & Software',
    caption:
      'RFID tags, fixed and handheld readers, GPS/BLE/LoRaWAN trackers and a cloud dashboard — one connected system from tag to report.',
  },
  {
    image: forkliftVisionImg,
    title: 'ForkLift Vision AI',
    subtitle: 'AI-Powered Pallet & Location Intelligence',
    caption: '8MP cameras, 3D depth sensing, OCR and Edge AI for pallet pickup, rack location, putaway, staging and inventory validation.',
  },
  {
    image: containerVisionImg,
    title: 'ContainerVision AI',
    subtitle: 'CFS & Container Terminal Automation',
    caption: 'AI, OCR, GPS/RTK and industrial sensors supporting container gate, yard, reach stacker, inspection and departure workflows.',
  },
  {
    image: assetFleetImg,
    title: 'Asset & Fleet Tracking',
    subtitle: 'RFID + GPS + IoT Asset Visibility',
    caption: 'SIM-based GPS, LoRaWAN, BLE, GNSS and RFID solutions for equipment, trailers, vehicles and high-value assets.',
  },
]

const IP_CHECKLIST = [
  'Extend an existing engineering team',
  'Build a dedicated development pod',
  'Develop a complete module or product',
  'Integrate AI, IoT, RFID, GPS or OCR into an existing platform',
  'Modernize an existing logistics application',
  'Provide ongoing production and application support',
]

const ENGAGEMENT_MODELS = [
  {
    icon: UserCog,
    title: 'Dedicated Engineer',
    description: 'Best when the customer needs a specific skill such as AI, IoT, RFID, .NET, Python or integration engineering.',
  },
  {
    icon: UsersRound,
    title: 'Dedicated Engineering Pod',
    description: 'Solution Architect + AI/Computer Vision + IoT/Edge + Backend + Frontend + QA for a complete feature/product stream.',
  },
  {
    icon: Briefcase,
    title: 'Project-Based Development',
    description: 'Prosper owns architecture, engineering, integration, testing and delivery against an agreed project scope.',
  },
  {
    icon: Wrench,
    title: 'Managed Support Team',
    description: 'Ongoing enhancement, monitoring, production support, incident resolution and application stabilization.',
  },
]

const TECH_STACK_GROUPS = [
  { title: 'AI / Vision', icon: BrainCircuit, items: ['Python', 'YOLO', 'OpenCV', 'TensorRT', 'NVIDIA', 'Machine Learning', 'OCR', 'Video Analytics'] },
  { title: 'IoT / Edge', icon: Cpu, items: ['LoRaWAN', 'MQTT', 'Modbus', 'RS485', 'PLC', 'BLE', '4G/5G', 'Industrial Gateways'] },
  { title: 'Location & Identification', icon: Satellite, items: ['RFID', 'GPS', 'GNSS', 'RTK', 'Barcode', 'QR/DataMatrix', 'OCR'] },
  { title: 'Enterprise Development', icon: Link2, items: ['.NET / C#', 'Python', 'Angular', 'REST APIs', 'PostgreSQL', 'SQL Server'] },
  { title: 'Cloud', icon: Globe, items: ['Microsoft Azure', 'AWS', 'IoT Hub', 'Containerized Applications', 'Edge-to-Cloud Integration'] },
  { title: 'Logistics Platforms', icon: Package, items: ['YMS', 'WMS', 'TMS', 'Dock', 'Gate', 'Fleet', 'Asset Tracking', 'CFS / Container Automation'] },
]

const SENSOR_TO_SAAS_FLOW = [
  'Sensors / Cameras / RFID / GPS',
  'PLC / Gateway / EdgeBox',
  'AI + Edge Processing',
  'REST API / MQTT',
  'Cloud',
  'WMS / YMS / ERP / TMS',
  'Dashboard / Reports / Alerts / Automation',
]

const GLOBAL_HUBS = [
  { country: 'USA', role: 'Customer coordination, architecture, consulting and delivery leadership.', phone: OFFICES[0].phone },
  { country: 'India', role: 'Software engineering, AI/ML, IoT, QA, integrations and development capacity.', phone: OFFICES[1].phone },
  { country: 'Japan', role: 'Specialized engineering collaboration and technology support.', phone: null },
]

const ENGAGEMENT_STEPS = [
  { title: 'Discovery', description: 'Understand the project, architecture, stack and resource gap.' },
  { title: 'Team Design', description: 'Identify exact roles, experience and skills required.' },
  { title: 'Technical Evaluation', description: 'Customer meets and evaluates the proposed engineers.' },
  { title: 'Onboarding', description: "Engineers join the customer's workflow, repositories, tools and ceremonies." },
  { title: 'Scale', description: 'Increase, reduce or rebalance capacity as project needs change.' },
]

const USE_CASES = [
  {
    icon: Sparkles,
    title: 'Add AI to an Existing Logistics Product',
    description: 'Computer vision, OCR, prediction and analytics without rebuilding the entire platform.',
  },
  {
    icon: Cpu,
    title: 'Build an IoT Monitoring Solution',
    description: 'Sensor → gateway → cloud → dashboard → alerts.',
  },
  {
    icon: Radio,
    title: 'Add RFID or GPS Tracking',
    description: 'Device selection, integration, middleware, location logic and application development.',
  },
  {
    icon: Package,
    title: 'Modernize a YMS or WMS',
    description: 'API modernization, dashboards, cloud migration and automation capabilities.',
  },
  {
    icon: Container,
    title: 'Automate Container Operations',
    description: 'OCR, container identification, reach-stacker intelligence, yard location and ERP integration.',
  },
  {
    icon: Zap,
    title: 'Build Edge AI Applications',
    description: 'Camera processing, local inference, offline operation and cloud synchronization.',
  },
]

const WHY_PROSPER = [
  { icon: Package, label: 'Logistics Domain Experience', description: 'Yard, warehouse, dock, fleet and container workflows are already familiar to the team.' },
  { icon: Cpu, label: 'AI + IoT Under One Team', description: 'Software, hardware integration and intelligence do not need separate vendors.' },
  { icon: ClipboardCheck, label: 'Production-Oriented Engineering', description: 'Design decisions are grounded in real operational conditions, field devices and integration realities.' },
  { icon: UsersRound, label: 'Flexible Team Models', description: 'One specialist, engineering pod, complete project or managed support.' },
  { icon: Globe, label: 'US-Coordinated Delivery', description: 'Customer-facing coordination and accountability with global engineering capacity.' },
  { icon: Link2, label: 'Integration Experience', description: 'WMS, YMS, ERP, TMS, APIs, databases and third-party systems are treated as part of the solution — not an afterthought.' },
]

const FAQS = [
  {
    question: 'Do you provide dedicated resources or project-based delivery?',
    answer: 'Both — we support a single dedicated engineer, a full engineering pod, or fixed-scope project delivery, depending on what fits your roadmap.',
  },
  {
    question: 'Will Prosper force us onto your own product or platform?',
    answer: 'No — we work entirely within your architecture, source code, cloud environment and product roadmap. Our AI, IoT and logistics experience accelerates onboarding; it does not replace your IP.',
  },
  {
    question: 'What technologies do your engineers work with?',
    answer: 'Computer vision, OCR, RFID, GPS/RTK, LoRaWAN, industrial IoT, Edge AI, logistics software (WMS/YMS), enterprise integration, CFS/container automation, and IBM i/AS400.',
  },
  {
    question: 'How quickly can a resource start on our project?',
    answer: 'Most engagements move from discovery to onboarded engineers within 1–2 weeks.',
  },
  {
    question: 'Where is your team located?',
    answer: 'A US-coordinated delivery organization with engineering capacity in India and Japan — one point of accountability, global engineering.',
  },
]

function Eyebrow({ children, className = '' }) {
  return (
    <span className={`${MONO_FONT} text-xs font-semibold uppercase tracking-widest text-[#6b5f00] ${className}`}>
      {children}
    </span>
  )
}

function FlowChips({ steps }) {
  return (
    <motion.div
      className="flex flex-wrap items-center justify-center gap-2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
    >
      {steps.map((step, i) => (
        <motion.div
          key={step}
          className="flex items-center gap-2"
          variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
        >
          <span
            className={`${MONO_FONT} rounded-full border ${BORDER} bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide ${NAVY} shadow-sm transition-transform hover:-translate-y-0.5 hover:border-gold`}
          >
            {step}
          </span>
          {i < steps.length - 1 && (
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
            >
              <ArrowRight className="h-4 w-4 text-gold-dark shrink-0" />
            </motion.span>
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}

function Timeline({ steps }) {
  return (
    <div className="relative">
      <div className="hidden lg:block absolute top-6 left-0 right-0 h-0.5 bg-[#E2E8F0]">
        <motion.div
          className="h-full bg-gradient-to-r from-gold via-gold-dark to-gold origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </div>
      <div className="grid gap-8 lg:grid-cols-5">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.12} className="relative flex flex-col items-center text-center gap-3">
            <motion.div
              className={`${HEADING_FONT} relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary font-bold text-lg shadow-[0_0_0_4px_white]`}
              whileInView={{ scale: [0.6, 1.15, 1] }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              {i + 1}
            </motion.div>
            <h3 className={`${HEADING_FONT} ${NAVY} font-bold text-base`}>{step.title}</h3>
            <p className={`text-sm ${CHARCOAL} max-w-[14rem]`}>{step.description}</p>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export default function TechOutsourcing() {
  useDocumentTitle(
    'AI, IoT & Logistics Software Development Outsourcing | Prosper Infotech',
    'Extend your engineering team with logistics-focused AI/ML, Computer Vision, OCR, RFID, GPS/RTK, LoRaWAN, Edge AI, WMS/YMS and container automation engineers. US-coordinated global delivery from Prosper Infotech.'
  )

  const [showStickyBar, setShowStickyBar] = useState(false)

  useEffect(() => {
    const heroEnd = document.getElementById('lead-form')
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.9
      const atForm = heroEnd ? window.scrollY + window.innerHeight > heroEnd.offsetTop : false
      setShowStickyBar(pastHero && !atForm)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`${BODY_FONT} ${CHARCOAL}`}>
      <LeadFormPopup
        campaign="Tech Resource Outsourcing Landing Page (Popup)"
        title="Tell us what you're building"
        description="We'll connect you directly with an engineering lead within one business day."
        submitLabel="Talk to an Engineering Lead"
        serviceLabel="What are you looking to build?"
        serviceOptions={SERVICE_OPTIONS}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: 'radial-gradient(circle, #0F172A14 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 90%)',
          }}
        />
        <motion.div
          className="pointer-events-none absolute top-1/4 right-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#0F172A]/5 blur-3xl"
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24 flex flex-col items-center text-center gap-5">
          <Reveal className="flex flex-col items-center gap-5">
            <span
              className={`${MONO_FONT} inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gradient-to-r from-gold/15 to-gold/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#6b5f00] shadow-sm`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              US-Coordinated Delivery &bull; Global Engineering &bull; Logistics-Focused
            </span>

            <h1 className={`${HEADING_FONT} ${NAVY} text-4xl md:text-5xl font-bold leading-tight`}>
              Build Logistics Technology Faster with <span className="text-gold-dark">AI, IoT &amp; Automation</span> Engineers
            </h1>
            <p className={`${HEADING_FONT} ${NAVY} relative inline-block text-xl md:text-2xl font-bold leading-snug`}>
              Technology Resource Outsourcing &amp; Product Engineering for Real-World Logistics Operations
              <span className="absolute -bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-gradient-to-r from-gold to-gold-dark" />
            </p>
            <p className={`${CHARCOAL} text-lg max-w-none mt-2`}>
              Extend your engineering team with specialists who already understand AI/ML, Computer
              Vision, OCR, RFID, GPS/RTK, LoRaWAN, Industrial IoT, Edge AI, WMS, YMS, CFS and
              container automation. From a single specialist to a complete engineering pod, Prosper
              Infotech helps you design, develop, integrate, deploy and support production-ready
              logistics technology.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-2">
              <Button
                href="https://calendly.com/prosperinfotech-sales/30min"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                onClick={() =>
                  window.gtag?.('event', 'cta_click', {
                    event_category: 'Tech Outsourcing Landing Page',
                    event_label: 'Hero - Book 30-Minute Consultation',
                  })
                }
              >
                Book a 30-Minute Consultation
              </Button>
              <Button
                href="#lead-form"
                variant="outline-dark"
                icon={false}
                onClick={() =>
                  window.gtag?.('event', 'cta_click', {
                    event_category: 'Tech Outsourcing Landing Page',
                    event_label: 'Hero - Talk to an Engineering Lead',
                  })
                }
              >
                Talk to an Engineering Lead
              </Button>
              <Button
                href="#expertise"
                variant="outline-dark"
                icon={false}
                onClick={() =>
                  window.gtag?.('event', 'cta_click', {
                    event_category: 'Tech Outsourcing Landing Page',
                    event_label: 'Hero - Explore Engineering Expertise',
                  })
                }
              >
                Explore Our Engineering Expertise
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={`tel:${usaPhone.replace(/\s+/g, '')}`}
                onClick={() =>
                  window.gtag?.('event', 'click_to_call', { event_category: 'Tech Outsourcing Landing Page (Hero)' })
                }
                className={`inline-flex items-center gap-2 rounded-lg border ${BORDER} bg-white px-4 py-2 text-sm font-semibold ${NAVY} shadow-sm transition-colors hover:border-gold`}
              >
                <PhoneCall className="h-4 w-4 text-gold-dark" />
                Call: {usaPhone}
              </a>
              <a
                href={`https://wa.me/19407583271?text=${encodeURIComponent(
                  "Hi, I'd like to know more about Prosper Infotech's Technology Resource Outsourcing services."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  window.gtag?.('event', 'click_whatsapp', { event_category: 'Tech Outsourcing Landing Page (Hero)' })
                }
                className="inline-flex items-center gap-2 rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-2 text-sm font-semibold text-[#128C4A] shadow-sm transition-colors hover:bg-[#25D366]/15"
              >
                <svg viewBox="0 0 32 32" className="h-4 w-4 fill-[#25D366]" aria-hidden="true">
                  <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.386.702 4.607 1.912 6.472L4 29l7.72-1.876A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.818c-1.98 0-3.83-.562-5.4-1.535l-.387-.23-4.583 1.114 1.13-4.47-.253-.398A9.77 9.77 0 0 1 5.182 15c0-5.964 4.858-10.818 10.822-10.818S26.818 9.036 26.818 15 21.968 24.818 16.004 24.818Zm5.94-8.144c-.325-.163-1.925-.95-2.223-1.058-.298-.109-.516-.163-.733.163-.217.325-.842 1.058-1.033 1.276-.19.217-.38.244-.706.081-.325-.163-1.374-.506-2.617-1.612-.968-.862-1.622-1.927-1.812-2.252-.19-.325-.02-.5.143-.663.147-.146.325-.38.488-.57.163-.19.217-.325.325-.543.109-.217.054-.407-.027-.57-.081-.163-.733-1.765-1.004-2.417-.264-.635-.532-.55-.733-.56l-.625-.011c-.217 0-.57.081-.868.407-.298.325-1.137 1.112-1.137 2.712 0 1.6 1.164 3.147 1.326 3.364.163.217 2.29 3.497 5.55 4.904.775.335 1.38.535 1.852.684.778.247 1.486.212 2.046.129.624-.093 1.925-.787 2.196-1.547.271-.76.271-1.412.19-1.548-.081-.135-.298-.216-.624-.38Z" />
                </svg>
                WhatsApp
              </a>
              <button
                type="button"
                onClick={() => {
                  window.gtag?.('event', 'click_chat', { event_category: 'Tech Outsourcing Landing Page (Hero)' })
                  window.Tawk_API?.maximize?.()
                }}
                className={`inline-flex items-center gap-2 rounded-lg border ${BORDER} bg-white px-4 py-2 text-sm font-semibold ${NAVY} shadow-sm transition-colors hover:border-gold`}
              >
                <MessageCircle className="h-4 w-4 text-gold-dark" />
                Chat
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-6 mt-2">
              {TRUST_STRIP.map((label) => (
                <span
                  key={label}
                  className={`inline-flex items-center gap-2 rounded-full border ${BORDER} bg-white px-4 py-2 text-sm font-bold ${NAVY} shadow-[0_2px_8px_-2px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_8px_20px_-6px_rgba(247,221,0,0.35)]`}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  {label}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="w-full mt-6">
            <div className="relative mx-auto max-w-5xl">
              <div
                className={`relative z-10 overflow-hidden rounded-[28px] border ${BORDER} shadow-[0_30px_70px_-20px_rgba(15,23,42,0.3)] ring-4 ring-white`}
              >
                <img
                  src={heroTeamImg}
                  alt="Prosper Infotech engineering team reviewing logistics AI, IoT, and automation dashboards"
                  fetchPriority="high"
                  className="w-full"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F172A]/30 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/10" />
              </div>

              <motion.span
                className={`${MONO_FONT} absolute -top-4 left-4 sm:left-8 z-20 inline-flex items-center gap-2 rounded-full bg-white border ${BORDER} shadow-lg px-4 py-2 text-[11px] font-semibold uppercase tracking-wide ${NAVY}`}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Real Engineering Team
              </motion.span>
              <motion.span
                className="absolute -bottom-4 right-4 sm:right-8 z-20 rounded-full bg-gradient-to-r from-gold to-gold-dark px-4 py-2 text-sm font-semibold text-primary shadow-lg"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                Live Product Dashboards
              </motion.span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* More Than Staff Augmentation */}
      <section className={TINT_GOLD}>
        <div className="max-w-5xl mx-auto px-6 py-16 lg:py-20">
          <Reveal className="text-center mb-10">
            <Eyebrow>More Than Staff Augmentation</Eyebrow>
            <h2 className={`${HEADING_FONT} ${NAVY} mt-2 text-3xl font-bold`}>
              Engineers Who Understand the Operation — Not Just the Code
            </h2>
          </Reveal>
          <Reveal delay={0.05} className="flex flex-col gap-4 max-w-3xl mx-auto text-center">
            <p className={CHARCOAL}>
              Most outsourcing companies can provide developers. Prosper Infotech provides
              engineering teams with practical experience connecting the physical logistics
              operation to the digital platform.
            </p>
            <p className={CHARCOAL}>
              Our teams work across cameras, RFID readers, GPS devices, industrial sensors, PLCs,
              gateways, edge computers, AI models, APIs, databases, cloud platforms and enterprise
              logistics applications. Whether you're developing a new logistics product,
              modernizing an existing platform, or adding AI and IoT capabilities, Prosper can
              support the solution from field device to enterprise application.
            </p>
          </Reveal>
          <Reveal delay={0.1} className={`mt-10 rounded-xl border ${BORDER} bg-white p-6 overflow-x-auto`}>
            <FlowChips steps={STAFF_AUG_FLOW} />
          </Reveal>
        </div>
      </section>

      {/* Core Engineering Expertise */}
      <section id="expertise" className="relative overflow-hidden bg-white">
        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-20">
          <Reveal className="text-center mb-12">
            <Eyebrow>Core Engineering Expertise</Eyebrow>
            <h2 className={`${HEADING_FONT} ${NAVY} mt-2 text-3xl font-bold`}>
              Build the Team Around the Skills the Project Actually Needs
            </h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 max-w-4xl mx-auto">
            {EXPERTISE.map((item, i) => {
              const Icon = item.icon
              return (
                <Reveal key={item.title} delay={(i % 5) * 0.06}>
                  <div className={`group relative h-full overflow-hidden rounded-2xl border ${BORDER} bg-white p-5 shadow-[0_2px_10px_-4px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_0_40px_-10px_rgba(247,221,0,0.4)]`}>
                    <span
                      className={`${MONO_FONT} pointer-events-none absolute -top-2 -right-1 text-4xl font-black text-[#0F172A]/[0.04] group-hover:text-gold/10 transition-colors`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-gold/25 to-gold/5 ring-1 ring-inset ring-gold/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="h-5 w-5 text-[#6b5f00]" />
                    </div>
                    <h3 className={`${HEADING_FONT} ${NAVY} relative mt-4 text-sm font-bold`}>{item.title}</h3>
                    <p className={`relative mt-2 text-xs ${CHARCOAL} leading-relaxed`}>{item.description}</p>
                    <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-dark transition-transform duration-300 group-hover:scale-x-100" />
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Real-World Engineering Experience */}
      <section className={TINT_NAVY}>
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
          <Reveal className="text-center mb-6">
            <Eyebrow>Real-World Engineering Experience</Eyebrow>
            <h2 className={`${HEADING_FONT} ${NAVY} mt-2 text-3xl font-bold`}>
              Our Engineers Work on the Same Technologies You Need
            </h2>
          </Reveal>
          <Reveal delay={0.05} className="max-w-2xl mx-auto text-center mb-10">
            <p className={CHARCOAL}>
              Our teams are not learning logistics technology after they join your project. We are
              actively designing and developing intelligent systems for yards, warehouses, docks,
              gates, fleets and container operations.
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className={`group overflow-hidden rounded-2xl border ${BORDER} bg-white shadow-[0_2px_10px_-4px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_0_50px_-8px_rgba(247,221,0,0.35),0_25px_50px_-12px_rgba(0,0,0,0.25)]`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span
                      className={`${MONO_FONT} absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-semibold uppercase tracking-wide ${NAVY} shadow-sm`}
                    >
                      Prosper Product
                    </span>
                    <span className={`${HEADING_FONT} absolute bottom-3 left-3 text-base font-bold text-white drop-shadow`}>
                      {item.title}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className={`text-xs font-semibold uppercase tracking-wide text-[#6b5f00]`}>
                      {item.subtitle}
                    </p>
                    <p className={`mt-2 text-sm ${CHARCOAL} leading-relaxed`}>{item.caption}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Your Product. Your Platform. Your IP. */}
      <section className="relative overflow-hidden bg-white">
        <div className="relative max-w-5xl mx-auto px-6 py-16 lg:py-20">
          <Reveal className="text-center mb-8">
            <Eyebrow>Trust &amp; Ownership</Eyebrow>
            <h2 className={`${HEADING_FONT} ${NAVY} mt-2 text-3xl font-bold`}>
              Your Product. Your Platform. Your IP.
            </h2>
          </Reveal>
          <Reveal delay={0.05} className="max-w-2xl mx-auto text-center">
            <p className={CHARCOAL}>
              Prosper Infotech can work entirely within your architecture, source code, cloud
              environment and product roadmap. Our existing AI, IoT and logistics experience is
              used to accelerate onboarding and reduce discovery time — not to force a proprietary
              product.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {IP_CHECKLIST.map((item, i) => (
              <Reveal key={item} delay={i * 0.05}>
                <div
                  className={`group relative flex h-full items-center gap-4 overflow-hidden rounded-2xl border ${BORDER} bg-white px-5 py-5 shadow-[0_2px_10px_-4px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_0_40px_-10px_rgba(247,221,0,0.35)]`}
                >
                  <div className={`absolute inset-y-0 left-0 w-1 ${i % 2 === 0 ? 'bg-gold' : 'bg-[#0F172A]'} opacity-70`} />
                  <div className="relative shrink-0">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full ${i % 2 === 0 ? 'bg-gradient-to-br from-gold/30 to-gold/5 ring-1 ring-inset ring-gold/25' : 'bg-gradient-to-br from-[#0F172A]/15 to-[#0F172A]/5 ring-1 ring-inset ring-[#0F172A]/15'}`}
                    >
                      <Lock className={`h-5 w-5 ${i % 2 === 0 ? 'text-[#6b5f00]' : 'text-[#0F172A]'}`} />
                    </div>
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow ring-1 ring-inset ring-gold/40">
                      <Check className="h-2.5 w-2.5 text-gold-dark" />
                    </span>
                  </div>
                  <span className={`text-left text-sm font-semibold ${CHARCOAL}`}>{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className={TINT_GOLD}>
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
          <Reveal className="text-center mb-10">
            <Eyebrow>Engagement Models</Eyebrow>
            <h2 className={`${HEADING_FONT} ${NAVY} mt-2 text-3xl font-bold`}>
              One Engineer, a Product Pod, or an Entire Delivery Stream
            </h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ENGAGEMENT_MODELS.map((model, i) => {
              const Icon = model.icon
              const featured = i === 1
              return (
                <Reveal key={model.title} delay={i * 0.08}>
                  <div
                    className={`relative h-full rounded-2xl border bg-white p-6 pt-8 transition-all duration-300 hover:-translate-y-1.5 ${
                      featured
                        ? 'border-gold shadow-[0_0_0_1px_rgba(247,221,0,0.4),0_20px_45px_-15px_rgba(247,221,0,0.5)]'
                        : `${BORDER} shadow-[0_2px_10px_-4px_rgba(15,23,42,0.08)] hover:border-gold/50 hover:shadow-[0_0_40px_-10px_rgba(247,221,0,0.35)]`
                    }`}
                  >
                    {featured && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-gold to-gold-dark px-4 py-1 text-[10px] font-bold uppercase tracking-wide text-primary shadow-md">
                        Most Requested
                      </span>
                    )}
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        featured ? 'bg-gradient-to-br from-gold to-gold-dark shadow-md' : 'bg-gradient-to-br from-gold/25 to-gold/5 ring-1 ring-inset ring-gold/20'
                      }`}
                    >
                      <Icon className={`h-6 w-6 ${featured ? 'text-primary' : 'text-[#6b5f00]'}`} />
                    </div>
                    <h3 className={`${HEADING_FONT} ${NAVY} mt-4 text-base font-bold`}>{model.title}</h3>
                    <p className={`mt-2 text-sm ${CHARCOAL} leading-relaxed`}>{model.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="relative overflow-hidden bg-white">
        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-20">
          <Reveal className="text-center mb-10">
            <Eyebrow>Technology Stack</Eyebrow>
            <h2 className={`${HEADING_FONT} ${NAVY} mt-2 text-3xl font-bold`}>
              Engineering Across the Complete Technology Stack
            </h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TECH_STACK_GROUPS.map((group, i) => {
              const Icon = group.icon
              return (
                <Reveal key={group.title} delay={i * 0.06}>
                  <div className={`group relative h-full overflow-hidden rounded-2xl border ${BORDER} bg-white shadow-[0_2px_10px_-4px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_0_40px_-10px_rgba(247,221,0,0.3)]`}>
                    <div className={`flex items-center gap-3 ${TINT_GOLD} px-6 py-4 border-b ${BORDER}`}>
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-inset ring-gold/25 shrink-0 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-[18px] w-[18px] text-[#6b5f00]" />
                      </div>
                      <h3 className={`${HEADING_FONT} ${NAVY} text-sm font-bold uppercase tracking-wide`}>{group.title}</h3>
                    </div>
                    <div className="p-6 flex flex-wrap gap-1.5">
                      {group.items.map((tech) => (
                        <span
                          key={tech}
                          className={`${MONO_FONT} rounded-full ${SURFACE} border ${BORDER} px-2.5 py-1 text-[10px] font-semibold ${CHARCOAL} transition-colors group-hover:border-gold/40`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Sensor to SaaS */}
      <section className={TINT_NAVY}>
        <div className="max-w-5xl mx-auto px-6 py-16 lg:py-20 text-center">
          <Reveal>
            <Eyebrow>From Sensor to SaaS</Eyebrow>
            <h2 className={`${HEADING_FONT} ${NAVY} mt-2 text-3xl font-bold`}>One Engineering Partner</h2>
            <p className={`mt-2 ${CHARCOAL}`}>We bridge operational technology and enterprise software.</p>
          </Reveal>
          <Reveal delay={0.1} className={`mt-8 rounded-xl border ${BORDER} bg-white p-6 overflow-x-auto`}>
            <FlowChips steps={SENSOR_TO_SAAS_FLOW} />
          </Reveal>
          <Reveal delay={0.15}>
            <p className={`mt-6 ${HEADING_FONT} ${NAVY} font-semibold max-w-2xl mx-auto`}>
              One partner that understands both the device mounted on the forklift and the API
              updating the ERP.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Global Delivery */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-6 py-16 lg:py-20">
          <Reveal className="text-center mb-14">
            <Eyebrow>Global Delivery</Eyebrow>
            <h2 className={`${HEADING_FONT} ${NAVY} mt-2 text-3xl font-bold`}>Global Engineering. Local Accountability.</h2>
            <p className={`mt-3 ${CHARCOAL} max-w-xl mx-auto`}>
              Prosper Infotech combines global engineering capacity with customer-facing
              coordination and accountability.
            </p>
          </Reveal>

          <div className="relative grid gap-6 sm:grid-cols-3">
            <div className="hidden sm:block absolute top-12 left-[16.5%] right-[16.5%] h-1 z-0 rounded-full bg-gold-dark/50 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-gold to-transparent"
                animate={{ left: ['-33%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
            </div>
            {GLOBAL_HUBS.map((hub, i) => {
              const accent = ['from-gold to-gold-dark', 'from-[#0F172A] to-[#1E293B]', 'from-[#6b5f00] to-gold-dark'][i]
              return (
                <Reveal key={hub.country} delay={i * 0.1}>
                  <div className={`group relative z-10 h-full overflow-hidden rounded-2xl border ${BORDER} bg-white text-center shadow-[0_2px_10px_-4px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_0_40px_-10px_rgba(247,221,0,0.35)]`}>
                    <div className={`h-1.5 w-full bg-gradient-to-r ${accent}`} />
                    <div className="p-6">
                      <div
                        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${accent} shadow-md transition-transform duration-300 group-hover:scale-110`}
                      >
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <h3 className={`${HEADING_FONT} ${NAVY} mt-4 text-lg font-bold`}>{hub.country}</h3>
                      <p className={`text-sm ${CHARCOAL} mt-2 leading-relaxed`}>{hub.role}</p>
                      {hub.phone && <p className={`mt-3 text-sm font-semibold ${NAVY}`}>{hub.phone}</p>}
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
          <Reveal delay={0.2} className={`mt-8 rounded-xl border ${BORDER} ${SURFACE} px-6 py-4 text-center max-w-2xl mx-auto`}>
            <p className={`${HEADING_FONT} ${NAVY} font-semibold`}>
              One engineering organization. One delivery process. One point of accountability.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Engagement Process */}
      <section className={TINT_GOLD}>
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
          <Reveal className="text-center mb-12">
            <Eyebrow>Engagement Process</Eyebrow>
            <h2 className={`${HEADING_FONT} ${NAVY} mt-2 text-3xl font-bold`}>
              From Requirement to Productive Engineering — Fast
            </h2>
          </Reveal>
          <Timeline steps={ENGAGEMENT_STEPS} />
        </div>
      </section>

      {/* Immediate Use Cases */}
      <section className="relative overflow-hidden bg-white">
        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-20">
          <Reveal className="text-center mb-10">
            <Eyebrow>Immediate Use Cases</Eyebrow>
            <h2 className={`${HEADING_FONT} ${NAVY} mt-2 text-3xl font-bold`}>
              Where Prosper Engineers Can Help Immediately
            </h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((useCase, i) => {
              const Icon = useCase.icon
              return (
                <Reveal key={useCase.title} delay={i * 0.06}>
                  <div className={`group relative h-full overflow-hidden rounded-2xl border ${BORDER} bg-white p-6 shadow-[0_2px_10px_-4px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_0_40px_-10px_rgba(247,221,0,0.35)]`}>
                    <span
                      className={`${HEADING_FONT} pointer-events-none absolute -bottom-4 -right-2 text-7xl font-black text-[#0F172A]/[0.035] group-hover:text-gold/10 transition-colors`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold/25 to-gold/5 ring-1 ring-inset ring-gold/20 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5 text-[#6b5f00]" />
                    </div>
                    <h3 className={`${HEADING_FONT} ${NAVY} relative mt-4 text-base font-bold`}>{useCase.title}</h3>
                    <p className={`relative mt-2 text-sm ${CHARCOAL} leading-relaxed`}>{useCase.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Prosper */}
      <section className={TINT_NAVY}>
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
          <Reveal className="text-center mb-10">
            <Eyebrow>Why Technology Teams Work With Prosper</Eyebrow>
            <h2 className={`${HEADING_FONT} ${NAVY} mt-2 text-3xl font-bold`}>Why Prosper Infotech</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_PROSPER.map((reason, i) => {
              const Icon = reason.icon
              const gold = i % 2 === 0
              return (
                <Reveal key={reason.label} delay={i * 0.06}>
                  <div
                    className={`group relative h-full overflow-hidden rounded-2xl border ${BORDER} bg-white p-6 shadow-[0_2px_10px_-4px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_40px_-10px_rgba(247,221,0,0.35)]`}
                  >
                    <div
                      className={`pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full blur-2xl transition-opacity duration-300 opacity-60 group-hover:opacity-100 ${gold ? 'bg-gold/15' : 'bg-[#0F172A]/10'}`}
                    />
                    <div
                      className={`relative flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${
                        gold ? 'bg-gradient-to-br from-gold to-gold-dark' : 'bg-gradient-to-br from-[#0F172A] to-[#1E293B]'
                      }`}
                    >
                      <Icon className={`h-6 w-6 ${gold ? 'text-primary' : 'text-white'}`} />
                    </div>
                    <h3 className={`${HEADING_FONT} ${NAVY} relative mt-4 text-base font-bold`}>{reason.label}</h3>
                    <p className={`relative mt-2 text-sm ${CHARCOAL} leading-relaxed`}>{reason.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {SHOW_CLIENTS && (
        <section className="relative overflow-hidden bg-white">
          <div className="relative max-w-5xl mx-auto px-6 py-16">
            <Reveal className="text-center mb-10">
              <Eyebrow>Our Clients</Eyebrow>
              <h2 className={`${HEADING_FONT} ${NAVY} mt-2 text-3xl font-bold`}>
                Companies that trust Prosper Infotech
              </h2>
            </Reveal>
            <ClientLogoStrip />
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-3xl mx-auto px-6 py-16 lg:py-20">
          <Reveal className="text-center mb-10">
            <Eyebrow>Common Questions</Eyebrow>
            <h2 className={`${HEADING_FONT} ${NAVY} mt-2 text-3xl font-bold`}>Before you get in touch</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <FAQAccordion items={FAQS} />
          </Reveal>
        </div>
      </section>

      {/* Final CTA + Lead form */}
      <section id="lead-form" className={`relative overflow-hidden ${TINT_GOLD}`}>
        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-20 grid lg:grid-cols-2 gap-10 items-start">
          <Reveal className="flex flex-col gap-5">
            <Eyebrow>Need Engineering Capacity?</Eyebrow>
            <h2 className={`${HEADING_FONT} ${NAVY} text-3xl font-bold`}>Tell Us What You&apos;re Building.</h2>
            <p className={`${CHARCOAL} text-lg`}>
              Whether you need one specialist or a complete AI, IoT and logistics engineering
              team, share your project with us. We&apos;ll help identify the right technical
              skills, engagement model and fastest path to productive delivery.
            </p>
            <div className="flex flex-col gap-4 mt-2">
              <a
                href={`tel:${usaPhone.replace(/\s+/g, '')}`}
                onClick={() =>
                  window.gtag?.('event', 'click_to_call', { event_category: 'Tech Outsourcing Landing Page' })
                }
                className={`inline-flex items-center gap-3 rounded-lg border ${BORDER} bg-white px-5 py-4 ${NAVY} font-semibold hover:border-gold transition-colors`}
              >
                <PhoneCall className="h-5 w-5 text-gold-dark" />
                {usaPhone}
              </a>
              <a
                href="mailto:sales@prosperinfotech.com"
                className={`inline-flex items-center gap-3 rounded-lg border ${BORDER} bg-white px-5 py-4 ${NAVY} font-semibold hover:border-gold transition-colors`}
              >
                <Mail className="h-5 w-5 text-gold-dark" />
                sales@prosperinfotech.com
              </a>
              <span
                className={`inline-flex items-center gap-3 rounded-lg border ${BORDER} bg-white px-5 py-4 ${CHARCOAL} text-sm`}
              >
                <MapPin className="h-5 w-5 text-gold-dark shrink-0" />
                Proudly based in Dallas, Texas, USA
              </span>
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className={`relative overflow-hidden rounded-xl border ${BORDER} border-t-4 border-t-gold bg-white p-6 sm:p-8 shadow-lg`}
          >
            <div className="pointer-events-none absolute top-0 right-0 w-40 h-40 bg-gold/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            <h3 className={`${HEADING_FONT} ${NAVY} text-xl font-bold mb-1`}>Discuss Your Project</h3>
            <p className={`text-sm ${CHARCOAL} mb-5`}>
              Tell us what you're looking to build — we'll respond within one business day.
            </p>
            <LandingLeadForm
              campaign="Tech Resource Outsourcing Landing Page"
              submitLabel="Talk to an Engineering Lead"
              serviceLabel="What are you looking to build?"
              serviceOptions={SERVICE_OPTIONS}
            />
          </Reveal>
        </div>
      </section>

      {/* Sticky mobile lead CTA */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`fixed inset-x-0 bottom-0 z-30 sm:hidden border-t ${BORDER} bg-white/95 backdrop-blur-sm px-4 py-3 shadow-[0_-8px_24px_-8px_rgba(15,23,42,0.15)]`}
          >
            <a
              href="#lead-form"
              onClick={() =>
                window.gtag?.('event', 'cta_click', {
                  event_category: 'Tech Outsourcing Landing Page',
                  event_label: 'Sticky Mobile Bar',
                })
              }
              className="flex items-center justify-center gap-2 rounded-lg bg-gold px-4 py-3 text-sm font-bold text-primary shadow-md transition-transform active:scale-95"
            >
              Talk to an Engineering Lead
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
