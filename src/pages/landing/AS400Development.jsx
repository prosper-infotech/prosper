import {
  Lightbulb,
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
  Globe,
  MessageCircle,
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
import as400Hero from '../../assets/as400.png'

const usaPhone = OFFICES[0].phone

const HUB_ROLES = ['Coordination Hub', 'Delivery Hub']

const STAT_BADGES = [
  { icon: Clock, label: '24x7 Monitoring' },
  { icon: CalendarCheck, label: '365 Day Coverage' },
  { icon: PhoneCall, label: 'Dedicated Calling Line' },
]

const SERVICE_COLUMNS = [
  {
    key: 'consulting',
    icon: Lightbulb,
    iconStyle: 'bg-gradient-to-br from-gold to-gold-dark text-primary',
    barStyle: 'bg-gold',
    title: 'AS400 / IBM i Consulting',
    items: [
      'IBM i Environment Assessment',
      'Technology & Architecture Roadmap',
      'Vendor-Neutral Advisory',
      'Modernization Strategy & Planning',
      'Security & Compliance Consulting',
      'Cost & Licensing Optimization',
    ],
  },
  {
    key: 'development',
    icon: Terminal,
    iconStyle: 'bg-navy text-white',
    barStyle: 'bg-navy',
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
    iconStyle: 'bg-accent-green text-white',
    barStyle: 'bg-accent-green',
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
    iconStyle: 'bg-gradient-to-br from-gold to-gold-dark text-primary',
    barStyle: 'bg-gold',
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

const AS400_VISUALS = [
  {
    title: '5250 Terminal Session',
    caption: 'Live AS/400 terminal sessions we work in every day',
    color: 'text-[#39ff6a]',
    cursor: true,
    lines: [
      'AS/400 Main Menu',
      '',
      ' 1. User Tasks',
      ' 2. Office Tasks',
      ' 5. Programming',
      ' 6. Communications',
      ' 8. Problem Handling',
      '',
      'Selection or command',
      '===>',
    ],
  },
  {
    title: 'RPGLE Development',
    caption: 'Modern free-format RPGLE, built and maintained daily',
    color: 'text-[#7dd3fc]',
    lines: [
      '**FREE',
      'dcl-proc getCustomer;',
      '  dcl-pi *n char(50);',
      '    custId packed(7:0);',
      '  end-pi;',
      '  exec sql',
      '    select name into :custName',
      '    from CUSTMAST',
      '    where CUSTID = :custId;',
      'end-proc;',
    ],
  },
  {
    title: 'DB2/400 Query Console',
    caption: 'DB2/400 performance tuning and query optimization',
    color: 'text-[#facc15]',
    lines: [
      'SELECT CUSTID, NAME, BALANCE',
      'FROM CUSTMAST',
      'WHERE BALANCE > 10000',
      'ORDER BY BALANCE DESC;',
      '',
      ' CUSTID  NAME        BALANCE',
      ' 100234  Acme Corp   45,210.00',
      ' 100118  Globex Ltd  38,904.50',
      ' 100061  Initech     22,300.00',
    ],
  },
  {
    title: '24x7 Monitoring',
    caption: 'Round-the-clock system health and support monitoring',
    color: 'text-[#f472b6]',
    lines: [
      'System Status:     ONLINE',
      'CPU Utilization:       42%',
      'Job Queue:        3 active',
      'Disk (ASP1):       61% used',
      'Uptime:          412 days',
      '',
      'Open Tickets:            2',
      'Avg Response Time:  8 min',
    ],
  },
]

const PROCESS_STEPS = [
  {
    title: 'Free Consultation',
    description: "We review your AS400 environment, codebase, and goals — no cost, no obligation.",
  },
  {
    title: 'Scoped Proposal',
    description: 'You get a clear plan — development, support, or modernization, priced up front.',
  },
  {
    title: 'Team Onboarded',
    description: 'A US-coordinated, offshore-backed team starts working in your environment.',
  },
  {
    title: '24x7x365 Coverage',
    description: 'Ongoing development, support, and monitoring — day or night, every day of the year.',
  },
]

const FAQS = [
  {
    question: 'Do you offer standalone IBM i / AS400 consulting, or only full development work?',
    answer:
      'Both — we take on standalone consulting engagements (environment assessments, architecture roadmaps, advisory) as well as full development, support, and modernization work.',
  },
  {
    question: 'Do you work with our existing AS400/IBM i environment, or only new builds?',
    answer:
      'Both — most of our engagements are enhancements, support, and modernization on systems already in production.',
  },
  {
    question: 'Is support really available 24x7x365?',
    answer: 'Yes — including holidays, with a dedicated calling line for urgent issues.',
  },
  {
    question: 'Do you offer short-term or project-based work, or only long-term contracts?',
    answer:
      'Both. We support one-off development projects as well as ongoing support and modernization retainers.',
  },
  {
    question: 'Where is your team located?',
    answer:
      'We run a US-coordinated, offshore-backed model — you get local-hours communication with the cost advantages of a distributed team.',
  },
  {
    question: 'What does the free consultation actually involve?',
    answer: 'A short call to understand your AS400 environment and goals — no obligation, no sales pressure.',
  },
]

export default function AS400Development() {
  useDocumentTitle(
    'AS400 (IBM i) Consulting, Development & 24x7 Support | Prosper Infotech',
    'IBM i / AS400 consulting, development, support, and modernization — RPG/RPGLE builds, 24x7x365 coverage, and a dedicated calling line. Get a free consultation.'
  )

  return (
    <>
      <LeadFormPopup
        campaign="AS400 Development Landing Page (Popup)"
        title="Get your free AS400 consultation"
        description="Tell us about your environment — we'll respond within one business day."
        serviceOptions={[
          'AS400 / IBM i Consulting',
          'AS400 Development (RPG/RPGLE)',
          'AS400 Support / Help Desk',
          'AS400 Modernization',
          'Migration / Cloud Integration',
          'Not sure — need guidance',
        ]}
      />

      <section className="relative bg-gradient-to-b from-[#fffdf6] to-[#fff8dc] overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-16 h-[420px] w-[420px] rounded-full bg-gold/20 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-[1fr_0.95fr] gap-12 items-center">
          <Reveal className="flex flex-col gap-5">
            <h1 className="text-primary text-3xl md:text-4xl leading-tight">
              24x7x365 <span className="text-gold-dark">Dedicated Support</span>
            </h1>
            <p className="text-xl md:text-2xl font-heading font-bold leading-snug">
              <span className="text-primary">AS400 (IBM i) </span>
              <span className="text-gold-dark">Consulting</span>
              <span className="text-primary">, Development &amp; Support</span>
            </p>
            <p className="text-ink-600 text-lg max-w-xl">
              A specialized AS400 / IBM i consulting and development team already serving live
              enterprise environments — assessments, RPG/RPGLE builds, enhancements, and
              modernization delivered by a US-coordinated, offshore-backed team.
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
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
                      event_category: 'AS400 Landing Page',
                      event_label: 'Hero - Get a Free Consultation',
                    })
                  }
                >
                  Get a Free Consultation
                </Button>
              </div>
              <Button
                href={`tel:${usaPhone.replace(/\s+/g, '')}`}
                variant="outline-dark"
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
              <a
                href={`https://wa.me/19407583271?text=${encodeURIComponent(
                  "Hi, I'd like to know more about Prosper Infotech's AS400 / IBM i services."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  window.gtag?.('event', 'click_whatsapp', { event_category: 'AS400 Landing Page (Hero)' })
                }
                className="inline-flex items-center gap-2 rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 backdrop-blur-sm px-6 py-2.5 text-sm font-semibold text-[#128C4A] shadow-md transition-all duration-200 hover:bg-[#25D366]/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
              >
                <svg viewBox="0 0 32 32" className="h-4 w-4 fill-[#25D366]" aria-hidden="true">
                  <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.386.702 4.607 1.912 6.472L4 29l7.72-1.876A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.818c-1.98 0-3.83-.562-5.4-1.535l-.387-.23-4.583 1.114 1.13-4.47-.253-.398A9.77 9.77 0 0 1 5.182 15c0-5.964 4.858-10.818 10.822-10.818S26.818 9.036 26.818 15 21.968 24.818 16.004 24.818Zm5.94-8.144c-.325-.163-1.925-.95-2.223-1.058-.298-.109-.516-.163-.733.163-.217.325-.842 1.058-1.033 1.276-.19.217-.38.244-.706.081-.325-.163-1.374-.506-2.617-1.612-.968-.862-1.622-1.927-1.812-2.252-.19-.325-.02-.5.143-.663.147-.146.325-.38.488-.57.163-.19.217-.325.325-.543.109-.217.054-.407-.027-.57-.081-.163-.733-1.765-1.004-2.417-.264-.635-.532-.55-.733-.56l-.625-.011c-.217 0-.57.081-.868.407-.298.325-1.137 1.112-1.137 2.712 0 1.6 1.164 3.147 1.326 3.364.163.217 2.29 3.497 5.55 4.904.775.335 1.38.535 1.852.684.778.247 1.486.212 2.046.129.624-.093 1.925-.787 2.196-1.547.271-.76.271-1.412.19-1.548-.081-.135-.298-.216-.624-.38Z" />
                </svg>
                WhatsApp
              </a>
              <button
                type="button"
                onClick={() => {
                  window.gtag?.('event', 'click_chat', { event_category: 'AS400 Landing Page (Hero)' })
                  window.Tawk_API?.maximize?.()
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-primary/5 backdrop-blur-sm text-primary border border-primary/30 shadow-md px-6 py-2.5 text-sm font-semibold transition-all duration-200 hover:bg-primary hover:text-white hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
              >
                <MessageCircle className="h-4 w-4" />
                Chat
              </button>
            </div>

            <div className="flex flex-wrap gap-3 mt-2">
              {STAT_BADGES.map((badge) => {
                const Icon = badge.icon
                return (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-2 rounded-lg bg-white border border-gold-dark/25 px-4 py-2.5 text-sm font-semibold text-ink-700 shadow-sm transition-all duration-300 hover:border-gold-dark/50 hover:-translate-y-0.5"
                  >
                    <Icon className="h-4 w-4 text-gold-dark" />
                    {badge.label}
                  </span>
                )
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="hidden lg:flex items-center justify-center">
            <div className="relative flex items-center justify-center max-w-md">
              <motion.div
                className="absolute -inset-8 rounded-[2rem] bg-gold/10 blur-3xl"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative z-10">
                <img src={as400Hero} alt="Isometric render of Prosper AS400 / IBM i development and support" className="w-full" />
              </div>
              <motion.span
                className="absolute -top-3 left-2 z-20 rounded-full bg-white backdrop-blur-sm border border-gold-dark/25 shadow-sm px-4 py-2 text-sm font-semibold text-primary"
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

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-6 py-16 lg:py-20">
          <Reveal className="text-center mb-14">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">
              Global Delivery Model
            </span>
            <h2 className="mt-2 text-3xl">A US-coordinated, offshore-backed delivery bridge</h2>
            <p className="mt-3 text-ink-600 max-w-xl mx-auto">
              Two connected hubs working as one team — local-hours coordination with the cost
              advantages of offshore engineering.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-8">
            {OFFICES.map((office, i) => (
              <div key={office.country} className={i === 1 ? 'md:order-3' : ''}>
                <Reveal delay={i * 0.1}>
                  <div className="rounded-xl border border-ink-300 bg-white p-6 text-center shadow-sm">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/20">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 font-heading font-semibold text-lg text-primary">
                      {office.country}
                    </h3>
                    <p className="text-sm text-ink-600 mt-1">{HUB_ROLES[i]}</p>
                    <p className="mt-3 text-sm font-semibold text-primary">{office.phone}</p>
                  </div>
                </Reveal>
              </div>
            ))}
            <div className="hidden md:flex md:order-2 flex-col items-center gap-3 px-2">
              <Globe className="h-6 w-6 text-gold" />
              <div className="relative h-0.5 w-20 rounded-full bg-ink-300 overflow-hidden">
                <motion.div
                  className="absolute top-0 h-full w-6 bg-gradient-to-r from-transparent via-gold to-transparent"
                  animate={{ x: ['-100%', '400%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-10 right-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 -translate-x-1/3 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-20">
          <Reveal className="text-center mb-12">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">
              How It Works
            </span>
            <h2 className="mt-2 text-3xl">From consultation to dedicated coverage</h2>
          </Reveal>
          <ProcessSteps steps={PROCESS_STEPS} />
        </div>
      </section>

      <section className="bg-surface-alt">
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
          <Reveal className="text-center mb-10">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">
              See It In Action
            </span>
            <h2 className="mt-2 text-3xl">The work behind the scenes on AS400</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AS400_VISUALS.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="group overflow-hidden rounded-xl border border-ink-300 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_50px_-8px_rgba(247,221,0,0.35),0_25px_50px_-12px_rgba(0,0,0,0.25)]">
                  <div className="aspect-[4/3] bg-[#0d1117] p-4 overflow-hidden">
                    <div className="flex gap-1.5 mb-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                    </div>
                    <motion.pre
                      className={`font-mono text-[10px] leading-relaxed whitespace-pre-wrap ${v.color}`}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-40px' }}
                      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                    >
                      {v.lines.map((line, li) => (
                        <motion.span
                          key={li}
                          className="block"
                          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                        >
                          {line}
                          {v.cursor && li === v.lines.length - 1 && (
                            <motion.span
                              className="ml-1 inline-block h-3 w-1.5 -mb-0.5 bg-current align-middle"
                              animate={{ opacity: [1, 1, 0, 0] }}
                              transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                            />
                          )}
                        </motion.span>
                      ))}
                    </motion.pre>
                  </div>
                  <div className="bg-white px-4 py-3">
                    <h3 className="text-sm font-semibold text-primary">{v.title}</h3>
                    <p className="mt-0.5 text-xs text-ink-600">{v.caption}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 right-1/4 h-64 w-64 rounded-full bg-accent-green/10 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
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

      <section className="relative overflow-hidden bg-gradient-to-b from-navy to-primary-dark">
        <div className="pointer-events-none absolute top-0 left-1/3 h-72 w-72 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <Reveal className="text-center mb-10">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Who we help
            </span>
            <h2 className="mt-2 text-3xl text-white">Trusted by enterprises across industries</h2>
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
            <h2 className="mt-2 text-3xl">Before you get in touch</h2>
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
                'AS400 / IBM i Consulting',
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
