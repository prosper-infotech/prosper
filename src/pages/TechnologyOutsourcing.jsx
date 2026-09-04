import {
  Cpu,
  ScanSearch,
  Cable,
  Tag,
  Satellite,
  Server,
  Warehouse,
  Network,
  Boxes,
  Database,
  User,
  Users,
  ClipboardList,
  LifeBuoy,
  Check,
  Search,
  UserCog,
  ClipboardCheck,
  LogIn,
  TrendingUp,
  DoorOpen,
  Camera,
  Truck,
} from 'lucide-react'
import Breadcrumb from '../components/ui/Breadcrumb'
import SectionHeading from '../components/ui/SectionHeading'
import CTABand from '../components/ui/CTABand'
import Reveal from '../components/motion/Reveal'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { REGIONS } from '../data/company'
import { FLAG_COMPONENTS } from '../components/ui/RegionFlags'

const EXPERTISE = [
  {
    icon: Cpu,
    title: 'AI & Machine Learning Engineering',
    description: 'Computer vision models, object detection, tracking, classification, prediction, anomaly detection and operational decision intelligence.',
  },
  {
    icon: ScanSearch,
    title: 'Computer Vision & OCR Engineering',
    description: 'Container OCR, trailer recognition, license plates, pallet/barcode recognition, document OCR and video analytics.',
  },
  {
    icon: Cable,
    title: 'Industrial IoT Engineering',
    description: 'Sensors, PLC integration, Modbus, RS485, LoRaWAN, MQTT, gateways, telemetry, device monitoring and industrial automation.',
  },
  {
    icon: Tag,
    title: 'RFID Engineering',
    description: 'Fixed/handheld RFID, antenna design, asset tracking, inventory automation, trailer tracking, portal/tunnel applications and middleware.',
  },
  {
    icon: Satellite,
    title: 'GPS / RTK & Telematics Engineering',
    description: 'GPS/GNSS tracking, RTK positioning, fleet telemetry, geofencing, trailer location, mobile asset tracking and movement intelligence.',
  },
  {
    icon: Server,
    title: 'Edge AI & Embedded Systems',
    description: 'NVIDIA edge computing, Prosper AI EdgeBox, industrial gateways, local inference, offline processing, connectivity and edge-to-cloud architecture.',
  },
  {
    icon: Warehouse,
    title: 'Logistics Software Engineering',
    description: 'YMS, WMS, dock management, gate automation, appointment management, fleet systems, asset tracking and operational dashboards.',
  },
  {
    icon: Network,
    title: 'Enterprise Integration',
    description: 'REST APIs, ERP/WMS/TMS interfaces, MQTT, event processing, middleware, database integration and third-party connectivity.',
  },
  {
    icon: Boxes,
    title: 'CFS & Container Automation',
    description: 'Container OCR, gate automation, yard inventory, reach-stacker automation, pickup/drop validation and CFS workflows.',
  },
  {
    icon: Database,
    title: 'IBM i / AS400 Engineering',
    description: 'Application support, RPG development, integration, modernization and enterprise production support.',
  },
]

const ENGAGEMENT_MODELS = [
  {
    icon: User,
    title: 'Dedicated Engineer',
    description: 'Best when the customer needs a specific skill — AI, IoT, RFID, .NET, Python or integration engineering.',
  },
  {
    icon: Users,
    title: 'Dedicated Engineering Pod',
    description: 'Solution Architect + AI/Computer Vision + IoT/Edge + Backend + Frontend + QA for a complete feature or product stream.',
  },
  {
    icon: ClipboardList,
    title: 'Project-Based Development',
    description: 'Prosper owns architecture, engineering, integration, testing and delivery against an agreed project scope.',
  },
  {
    icon: LifeBuoy,
    title: 'Managed Support Team',
    description: 'Ongoing enhancement, monitoring, production support, incident resolution and application stabilization.',
  },
]

const TRUST_POINTS = [
  'Extend an existing engineering team',
  'Build a dedicated development pod',
  'Develop a complete module or product',
  'Integrate AI, IoT, RFID, GPS or OCR into an existing platform',
  'Modernize an existing logistics application',
  'Provide ongoing production and application support',
]

const TECH_STACK = [
  { title: 'AI / Vision', items: ['Python', 'YOLO', 'OpenCV', 'TensorRT', 'NVIDIA', 'Machine Learning', 'OCR', 'Video Analytics'] },
  { title: 'IoT / Edge', items: ['LoRaWAN', 'MQTT', 'Modbus', 'RS485', 'PLC', 'BLE', '4G/5G', 'Industrial Gateways'] },
  { title: 'Location & Identification', items: ['RFID', 'GPS', 'GNSS', 'RTK', 'Barcode', 'QR/DataMatrix', 'OCR'] },
  { title: 'Enterprise Development', items: ['.NET / C#', 'Python', 'Angular', 'REST APIs', 'PostgreSQL', 'SQL Server'] },
  { title: 'Cloud', items: ['Microsoft Azure', 'AWS', 'IoT Hub', 'Containerized Applications', 'Edge-to-Cloud Integration'] },
  { title: 'Logistics Platforms', items: ['YMS', 'WMS', 'TMS', 'Dock', 'Gate', 'Fleet', 'Asset Tracking', 'CFS / Container Automation'] },
]

const PROCESS = [
  { icon: Search, title: 'Discovery', description: 'Understand the project, architecture, stack and resource gap.' },
  { icon: UserCog, title: 'Team Design', description: 'Identify exact roles, experience and skills required.' },
  { icon: ClipboardCheck, title: 'Technical Evaluation', description: 'Customer meets and evaluates the proposed engineers.' },
  { icon: LogIn, title: 'Onboarding', description: "Engineers join the customer's workflow, repositories, tools and ceremonies." },
  { icon: TrendingUp, title: 'Scale', description: 'Increase, reduce or rebalance capacity as project needs change.' },
]

const PROOF = [
  { icon: DoorOpen, title: 'GateVision AI', description: 'AI-powered gate automation: trailer/container/license-plate OCR, arrival/departure verification and gate workflow automation.' },
  { icon: ScanSearch, title: 'YardVision AI', description: 'RFID + GPS/RTK + OCR + AI for trailer inventory, spotter operations, yard location and movement visibility.' },
  { icon: Cable, title: 'DockVision AI', description: 'LoRaWAN sensors and PLC integration for door position, trailer presence, restraint, leveler, utilization, alerts and analytics.' },
  { icon: Camera, title: 'ForkliftVision AI', description: '8MP cameras, 3D depth sensing, OCR and Edge AI for pallet pickup, rack location, putaway, staging and inventory validation.' },
  { icon: Boxes, title: 'ContainerVision AI', description: 'AI, OCR, GPS/RTK and sensors supporting container gate, yard, reach stacker, inspection and departure workflows.' },
  { icon: Truck, title: 'Asset & Fleet Tracking', description: 'SIM GPS, LoRaWAN, BLE, GNSS and RFID solutions for trailers, equipment, vehicles and high-value assets.' },
]

export default function TechnologyOutsourcing() {
  useDocumentTitle(
    'Technology Resource Outsourcing | AI, IoT & Logistics Software Engineering | Prosper Infotech',
    'Extend your engineering team with specialists in AI/ML, Computer Vision, RFID, GPS/RTK, LoRaWAN, Industrial IoT, Edge AI, WMS/YMS and container automation — from a single specialist to a complete delivery team.'
  )

  return (
    <>
      <Breadcrumb
        title="Technology Resource Outsourcing"
        parent="Services"
        parentPath="/services"
        description="Engineers who understand the operation — not just the code. Extend your team with specialists in AI, IoT, RFID, GPS and logistics software."
      />

      <div className="bg-gradient-to-b from-[#fffdf6] to-[#fff8dc]">
        {/* Intro */}
        <section className="max-w-3xl mx-auto px-6 pt-12 pb-4 text-center">
          <Reveal className="flex flex-col gap-4">
            <p className="text-ink-600 text-lg">
              Most outsourcing companies can provide developers. Prosper Infotech provides
              engineering teams with practical experience connecting the physical logistics
              operation to the digital platform.
            </p>
            <p className="text-ink-600 text-lg">
              Our teams work across cameras, RFID readers, GPS devices, industrial sensors, PLCs,
              gateways, edge computers, AI models, APIs, databases, cloud platforms and enterprise
              logistics applications — whether you're building a new product, modernizing an
              existing platform, or adding AI and IoT capabilities.
            </p>
          </Reveal>
        </section>

        {/* Core Engineering Expertise */}
        <section className="max-w-6xl mx-auto px-6 py-14">
          <SectionHeading eyebrow="Core Engineering Expertise" title="Build the team around the skills your project needs" />
          <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {EXPERTISE.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-[22px] border border-gold-dark/25 bg-gradient-to-br from-[#fffdf0] to-[#fff6d6] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(20,52,109,0.25)]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.15)]">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-heading font-semibold text-base text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm text-ink-600">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Real-world proof */}
        <section className="max-w-6xl mx-auto px-6 py-14">
          <SectionHeading eyebrow="Proof Through Real Solutions" title="What Prosper engineers are already building" />
          <div className="mt-12 grid gap-4 grid-cols-1 sm:grid-cols-2">
            {PROOF.map((item, i) => (
              <Reveal key={item.title} delay={(i % 2) * 0.08}>
                <div className="h-full flex items-start gap-4 rounded-2xl border border-ink-300 bg-white p-5 shadow-sm hover:-translate-y-1 hover:shadow-[0_0_50px_-8px_rgba(247,221,0,0.35),0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-300">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-heading font-semibold text-sm text-primary">{item.title}</h3>
                    <p className="mt-1 text-sm text-ink-600">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Engagement Models */}
        <section className="max-w-6xl mx-auto px-6 py-14">
          <SectionHeading eyebrow="Engagement Models" title="One engineer, a product pod, or an entire delivery stream" />
          <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2">
            {ENGAGEMENT_MODELS.map((item, i) => (
              <Reveal key={item.title} delay={(i % 2) * 0.08}>
                <div className="h-full rounded-[22px] border border-gold-dark/25 bg-gradient-to-br from-[#fffdf0] to-[#fff6d6] p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.15)]">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-heading font-semibold text-base text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm text-ink-600">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Trust band */}
        <section className="py-6">
          <div className="max-w-6xl mx-auto px-6">
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-primary-dark via-navy to-[#081a3d] px-8 py-14 md:px-14 md:py-16">
              <div className="pointer-events-none absolute -top-24 -right-16 h-[380px] w-[380px] rounded-full bg-gold/25 blur-[110px]" />
              <div className="pointer-events-none absolute top-1/2 left-1/3 h-[280px] w-[280px] -translate-y-1/2 rounded-full bg-gold-dark/15 blur-[100px]" />
              <div className="pointer-events-none absolute -bottom-24 -left-16 h-[320px] w-[320px] rounded-full bg-[#3a5a99]/40 blur-[110px]" />

              <div className="relative">
                <SectionHeading eyebrow="Your Product. Your Platform. Your IP." title="Prosper works entirely inside your architecture" variant="dark" className="mb-4" />
                <p className="max-w-2xl mx-auto text-center text-white/70 text-sm mb-12">
                  We work within your source code, cloud environment and product roadmap. Existing
                  AI, IoT and logistics experience is used to accelerate onboarding and reduce
                  discovery time — not to force a proprietary product.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {TRUST_POINTS.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] px-5 py-4"
                    >
                      <Check className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                      <span className="text-white/90 text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology stack */}
        <section className="max-w-6xl mx-auto px-6 py-14">
          <SectionHeading eyebrow="Technology Stack" title="Engineering across the complete technology stack" />
          <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {TECH_STACK.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-primary mb-3">{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-gold-dark/30 bg-gold/10 px-3 py-1.5 text-xs font-medium text-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global delivery */}
        <section className="max-w-6xl mx-auto px-6 py-14">
          <SectionHeading eyebrow="Global Delivery" title="Global engineering. Local accountability." />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {REGIONS.map(({ flagKey, country, description }, i) => {
              const Flag = FLAG_COMPONENTS[flagKey]
              return (
                <Reveal key={country} delay={i * 0.1}>
                  <div className="h-full flex items-start gap-4 rounded-2xl border border-ink-300 bg-white p-6 shadow-sm">
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
          <p className="mt-8 text-center text-sm font-semibold text-primary">
            One engineering organization. One delivery process. One point of accountability.
          </p>
        </section>

        {/* Engagement process */}
        <section className="max-w-6xl mx-auto px-6 py-14">
          <SectionHeading eyebrow="Engagement Process" title="From requirement to productive engineering — fast" />
          <div className="relative mt-12">
            <div className="lg:hidden absolute left-5 top-5 bottom-5 w-px bg-ink-300" />
            <div className="hidden lg:block absolute left-[10%] right-[10%] top-5 h-px bg-ink-300" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-4">
              {PROCESS.map((step) => (
                <div key={step.title} className="relative flex gap-4 lg:flex-1 lg:flex-col lg:items-center lg:text-center">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary shadow-md">
                    <step.icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1 lg:mt-1">
                    <h4 className="font-heading font-semibold text-sm text-primary">{step.title}</h4>
                    <p className="mt-1.5 text-xs text-ink-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABand
          title="Tell us what you're building"
          description="Whether you need one specialist or a complete AI, IoT and logistics engineering team, talk to an engineering lead about your project."
          ctaLabel="Talk to an Engineering Lead"
        />
      </div>
    </>
  )
}
