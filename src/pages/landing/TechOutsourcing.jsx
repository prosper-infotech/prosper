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
} from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '../../components/ui/Button'
import Reveal from '../../components/motion/Reveal'
import LandingLeadForm from '../../components/forms/LandingLeadForm'
import ProcessSteps from '../../components/ui/ProcessSteps'
import FAQAccordion from '../../components/ui/FAQAccordion'
import ClientLogoStrip from '../../components/ui/ClientLogoStrip'
import { SHOW_CLIENTS } from '../../data/clients'
import LeadFormPopup from '../../components/forms/LeadFormPopup'
import { OFFICES } from '../../data/offices'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import heroTeamImg from '../../assets/tech-outsourcing-hero-team.jpg'
import gateVisionImg from '../../assets/hero-slide-dock-monitoring.jpg'
import yardVisionImg from '../../assets/hero-slide-iot-yard.jpg'
import dockVisionImg from '../../assets/hero-slide-dock-ai.jpg'
import forkliftVisionImg from '../../assets/hero-slide-forklift.jpg'
import containerVisionImg from '../../assets/hero-slide-cfs.jpg'
import assetFleetImg from '../../assets/hero-slide-fleet-gps.jpg'

const usaPhone = OFFICES[0].phone

// "Lumina Tech Framework" — light-mode design system for this page only.
const NAVY = 'text-[#0F172A]'
const CHARCOAL = 'text-[#334155]'
const BORDER = 'border-[#E2E8F0]'
const SURFACE = 'bg-[#F8FAFC]'
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
    image: gateVisionImg,
    title: 'GateVision AI',
    subtitle: 'AI-Powered Gate Automation',
    caption:
      'OCR and computer vision for trailer identification, container numbers, license plates, arrival/departure verification and gate workflow automation.',
  },
  {
    image: yardVisionImg,
    title: 'YardVision AI',
    subtitle: 'Real-Time Yard Intelligence',
    caption: 'RFID, GPS/RTK, OCR and AI for trailer inventory, spotter operations, yard location and movement visibility.',
  },
  {
    image: dockVisionImg,
    title: 'DockVision AI',
    subtitle: 'IoT-Powered Dock Visibility',
    caption: 'LoRaWAN sensors, PLC integration and analytics for door position, trailer presence, restraint, leveler and dock utilization.',
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
  { title: 'AI / Vision', items: 'Python • YOLO • OpenCV • TensorRT • NVIDIA • Machine Learning • OCR • Video Analytics' },
  { title: 'IoT / Edge', items: 'LoRaWAN • MQTT • Modbus • RS485 • PLC • BLE • 4G/5G • Industrial Gateways' },
  { title: 'Location & Identification', items: 'RFID • GPS • GNSS • RTK • Barcode • QR/DataMatrix • OCR' },
  { title: 'Enterprise Development', items: '.NET / C# • Python • Angular • REST APIs • PostgreSQL • SQL Server' },
  { title: 'Cloud', items: 'Microsoft Azure • AWS • IoT Hub • Containerized Applications • Edge-to-Cloud Integration' },
  { title: 'Logistics Platforms', items: 'YMS • WMS • TMS • Dock • Gate • Fleet • Asset Tracking • CFS / Container Automation' },
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
    <div className="flex flex-wrap items-center justify-center gap-2">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <span
            className={`${MONO_FONT} rounded-full border ${BORDER} bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide ${NAVY}`}
          >
            {step}
          </span>
          {i < steps.length - 1 && <ArrowRight className="h-4 w-4 text-gold-dark shrink-0" />}
        </div>
      ))}
    </div>
  )
}

export default function TechOutsourcing() {
  useDocumentTitle(
    'AI, IoT & Logistics Software Development Outsourcing | Prosper Infotech',
    'Extend your engineering team with logistics-focused AI/ML, Computer Vision, OCR, RFID, GPS/RTK, LoRaWAN, Edge AI, WMS/YMS and container automation engineers. US-coordinated global delivery from Prosper Infotech.'
  )

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
        <motion.div
          className="pointer-events-none absolute top-1/4 right-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative max-w-4xl mx-auto px-6 py-16 lg:py-24 flex flex-col items-center text-center gap-5">
          <Reveal className="flex flex-col items-center gap-5">
            <Eyebrow>US-Coordinated Delivery &bull; Global Engineering &bull; Logistics-Focused</Eyebrow>

            <h1 className={`${HEADING_FONT} ${NAVY} text-4xl md:text-5xl font-bold leading-tight`}>
              Build Logistics Technology Faster with <span className="text-gold-dark">AI, IoT &amp; Automation</span> Engineers
            </h1>
            <p className={`${HEADING_FONT} ${NAVY} text-xl md:text-2xl font-bold leading-snug`}>
              Technology Resource Outsourcing &amp; Product Engineering for Real-World Logistics Operations
            </p>
            <p className={`${CHARCOAL} text-lg max-w-2xl`}>
              Extend your engineering team with specialists who already understand AI/ML, Computer
              Vision, OCR, RFID, GPS/RTK, LoRaWAN, Industrial IoT, Edge AI, WMS, YMS, CFS and
              container automation. From a single specialist to a complete engineering pod, Prosper
              Infotech helps you design, develop, integrate, deploy and support production-ready
              logistics technology.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-2">
              <Button href="#lead-form" variant="primary">
                Talk to an Engineering Lead
              </Button>
              <Button href="#expertise" variant="outline-dark" icon={false}>
                Explore Our Engineering Expertise
              </Button>
            </div>

            <div className={`flex flex-wrap justify-center gap-x-6 gap-y-3 pt-6 mt-2 border-t ${BORDER}`}>
              {TRUST_STRIP.map((label) => (
                <span key={label} className={`inline-flex items-center gap-2 text-sm font-bold ${NAVY}`}>
                  <Check className="h-4 w-4 text-gold-dark" />
                  {label}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="w-full mt-4">
            <div
              className={`relative mx-auto max-w-3xl overflow-hidden rounded-xl border ${BORDER} shadow-[0_20px_50px_-15px_rgba(15,23,42,0.15)]`}
            >
              <img
                src={heroTeamImg}
                alt="Prosper Infotech engineering team reviewing logistics AI, IoT, and automation dashboards"
                className="w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* More Than Staff Augmentation */}
      <section className={SURFACE}>
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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {EXPERTISE.map((item, i) => {
              const Icon = item.icon
              return (
                <Reveal key={item.title} delay={(i % 5) * 0.06}>
                  <div className={`h-full rounded-xl border ${BORDER} bg-white p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1`}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/20">
                      <Icon className="h-5 w-5 text-[#6b5f00]" />
                    </div>
                    <h3 className={`${HEADING_FONT} ${NAVY} mt-4 text-sm font-bold`}>{item.title}</h3>
                    <p className={`mt-2 text-xs ${CHARCOAL} leading-relaxed`}>{item.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Real-World Engineering Experience */}
      <section className={SURFACE}>
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
                <div className={`group overflow-hidden rounded-xl border ${BORDER} bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_50px_-8px_rgba(247,221,0,0.35),0_25px_50px_-12px_rgba(0,0,0,0.25)]`}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className={`${HEADING_FONT} ${NAVY} text-base font-bold`}>{item.title}</h3>
                    <p className={`mt-1 text-xs font-semibold uppercase tracking-wide text-[#6b5f00]`}>
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
          <div className="mt-10 grid gap-3 sm:grid-cols-2 max-w-2xl mx-auto">
            {IP_CHECKLIST.map((item, i) => (
              <Reveal key={item} delay={i * 0.05}>
                <div className={`flex items-start gap-2.5 rounded-lg border ${BORDER} bg-white px-4 py-3 text-sm ${CHARCOAL}`}>
                  <Lock className="h-4 w-4 text-gold-dark shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className={SURFACE}>
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
              return (
                <Reveal key={model.title} delay={i * 0.08}>
                  <div className={`h-full rounded-xl border ${BORDER} bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1`}>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/20">
                      <Icon className="h-5 w-5 text-[#6b5f00]" />
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
            {TECH_STACK_GROUPS.map((group, i) => (
              <Reveal key={group.title} delay={i * 0.06}>
                <div className={`h-full rounded-xl border ${BORDER} bg-white p-6 shadow-sm`}>
                  <h3 className={`${HEADING_FONT} ${NAVY} text-sm font-bold uppercase tracking-wide`}>{group.title}</h3>
                  <p className={`mt-3 text-sm ${CHARCOAL} leading-relaxed`}>{group.items}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sensor to SaaS */}
      <section className={SURFACE}>
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

          <div className="grid gap-6 sm:grid-cols-3">
            {GLOBAL_HUBS.map((hub, i) => (
              <Reveal key={hub.country} delay={i * 0.1}>
                <div className={`h-full rounded-xl border ${BORDER} bg-white p-6 text-center shadow-sm`}>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/20">
                    <MapPin className="h-6 w-6 text-gold-dark" />
                  </div>
                  <h3 className={`${HEADING_FONT} ${NAVY} mt-4 text-lg font-bold`}>{hub.country}</h3>
                  <p className={`text-sm ${CHARCOAL} mt-2 leading-relaxed`}>{hub.role}</p>
                  {hub.phone && <p className={`mt-3 text-sm font-semibold ${NAVY}`}>{hub.phone}</p>}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className={`mt-8 rounded-xl border ${BORDER} ${SURFACE} px-6 py-4 text-center max-w-2xl mx-auto`}>
            <p className={`${HEADING_FONT} ${NAVY} font-semibold`}>
              One engineering organization. One delivery process. One point of accountability.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Engagement Process */}
      <section className={SURFACE}>
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
          <Reveal className="text-center mb-12">
            <Eyebrow>Engagement Process</Eyebrow>
            <h2 className={`${HEADING_FONT} ${NAVY} mt-2 text-3xl font-bold`}>
              From Requirement to Productive Engineering — Fast
            </h2>
          </Reveal>
          <ProcessSteps steps={ENGAGEMENT_STEPS} />
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
                  <div className={`h-full rounded-xl border ${BORDER} bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1`}>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/20">
                      <Icon className="h-5 w-5 text-[#6b5f00]" />
                    </div>
                    <h3 className={`${HEADING_FONT} ${NAVY} mt-4 text-base font-bold`}>{useCase.title}</h3>
                    <p className={`mt-2 text-sm ${CHARCOAL} leading-relaxed`}>{useCase.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Prosper */}
      <section className={SURFACE}>
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
          <Reveal className="text-center mb-10">
            <Eyebrow>Why Technology Teams Work With Prosper</Eyebrow>
            <h2 className={`${HEADING_FONT} ${NAVY} mt-2 text-3xl font-bold`}>Why Prosper Infotech</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_PROSPER.map((reason, i) => {
              const Icon = reason.icon
              return (
                <Reveal key={reason.label} delay={i * 0.06}>
                  <div className={`h-full rounded-xl border ${BORDER} bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1`}>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/20">
                      <Icon className="h-5 w-5 text-[#6b5f00]" />
                    </div>
                    <h3 className={`${HEADING_FONT} ${NAVY} mt-4 text-base font-bold`}>{reason.label}</h3>
                    <p className={`mt-2 text-sm ${CHARCOAL} leading-relaxed`}>{reason.description}</p>
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
      <section id="lead-form" className={`relative overflow-hidden ${SURFACE}`}>
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
    </div>
  )
}
