import {
  BrainCircuit,
  Cpu,
  ScanText,
  Users,
  Zap,
  Clock,
  PhoneCall,
  MapPin,
  Check,
  Award,
  BadgeCheck,
  Headset,
  ShieldCheck,
  DollarSign,
  Truck,
  Warehouse,
  Factory,
  Landmark,
  ShoppingCart,
  HeartPulse,
  Mail,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '../../components/ui/Button'
import Reveal from '../../components/motion/Reveal'
import LandingLeadForm from '../../components/forms/LandingLeadForm'
import ProcessSteps from '../../components/ui/ProcessSteps'
import FAQAccordion from '../../components/ui/FAQAccordion'
import TechIllustration from '../../components/ui/TechIllustration'
import ClientLogoStrip from '../../components/ui/ClientLogoStrip'
import { SHOW_CLIENTS } from '../../data/clients'
import LeadFormPopup from '../../components/forms/LeadFormPopup'
import { OFFICES } from '../../data/offices'
import useDocumentTitle from '../../hooks/useDocumentTitle'

const usaPhone = OFFICES[0].phone

const SERVICE_OPTIONS = [
  'AI / ML Development',
  'IoT Engineering',
  'OCR & Document Intelligence',
  'Software Development Support / Staff Augmentation',
  'Not sure — need guidance',
]

const STAT_BADGES = [
  { icon: Users, label: 'Vetted AI/IoT Engineers' },
  { icon: Zap, label: 'Fast Onboarding' },
  { icon: Clock, label: 'Flexible Engagement Models' },
]

const SERVICE_COLUMNS = [
  {
    key: 'ai',
    icon: BrainCircuit,
    iconStyle: 'bg-gradient-to-br from-gold to-gold-dark text-primary',
    barStyle: 'bg-gold',
    title: 'AI & ML Development',
    items: [
      'Custom AI/ML Model Development',
      'Computer Vision & Deep Learning',
      'NLP & LLM Integrations',
      'MLOps & Model Deployment',
      'Data Engineering & Pipelines',
      'AI Solution Prototyping',
    ],
  },
  {
    key: 'iot',
    icon: Cpu,
    iconStyle: 'bg-navy text-white',
    barStyle: 'bg-navy',
    title: 'IoT & Embedded Engineering',
    items: [
      'IoT Device & Sensor Integration',
      'Edge AI Development',
      'LoRaWAN / MQTT / Embedded Firmware',
      'IoT Platform & Dashboard Development',
      'Hardware-Software Integration',
      'Connected Device Architecture',
    ],
  },
  {
    key: 'ocr',
    icon: ScanText,
    iconStyle: 'bg-accent-green text-white',
    barStyle: 'bg-accent-green',
    title: 'OCR & Software Dev Support',
    items: [
      'OCR & Document Intelligence Solutions',
      'Full-Stack Web & Mobile Development',
      'API Development & System Integration',
      'QA & Testing Support',
      'Dedicated Staff Augmentation',
      'Legacy System Support',
    ],
  },
]

const WHY_CHOOSE = [
  { icon: Award, label: '10+ Years of Technology Delivery' },
  { icon: BadgeCheck, label: 'Vetted, Skilled Engineers' },
  { icon: Headset, label: 'Dedicated Ongoing Support' },
  { icon: DollarSign, label: 'Cost-Effective Engagement' },
  { icon: ShieldCheck, label: 'Secure, Reliable & Compliant' },
]

const INDUSTRIES = [
  { icon: Truck, label: 'Logistics & Transportation' },
  { icon: Warehouse, label: 'Warehouse & Distribution' },
  { icon: Factory, label: 'Manufacturing' },
  { icon: Landmark, label: 'Banking & Finance' },
  { icon: ShoppingCart, label: 'Retail' },
  { icon: HeartPulse, label: 'Healthcare' },
]

const CAPABILITY_VISUALS = [
  { variant: 'ai', caption: 'AI & ML models trained and deployed for real production workloads' },
  { variant: 'iot', caption: 'IoT sensor networks and edge devices engineered end-to-end' },
  { variant: 'ocr', caption: 'OCR and document intelligence built into live business workflows' },
  { variant: 'dev', caption: 'Full-stack software delivery, from API to production deploy' },
]

const PROCESS_STEPS = [
  {
    title: 'Free Consultation',
    description: 'We review your project, tech stack, and resourcing needs — no cost, no obligation.',
  },
  {
    title: 'Scoped Resource Plan',
    description: 'You get a clear plan — dedicated engineers or project-based delivery, priced up front.',
  },
  {
    title: 'Team Onboarded',
    description: 'Vetted AI, IoT, OCR, or software engineers plug into your workflow fast.',
  },
  {
    title: 'Ongoing Delivery',
    description: 'Continuous development and support, with a US-coordinated point of contact.',
  },
]

const FAQS = [
  {
    question: 'Do you provide dedicated resources or project-based delivery?',
    answer:
      'Both — we support long-term staff augmentation as well as fixed-scope project delivery, depending on what fits your roadmap.',
  },
  {
    question: 'What technologies do your AI/IoT engineers work with?',
    answer:
      'Computer vision, LLMs/NLP, MLOps, IoT/embedded systems (LoRaWAN, MQTT), OCR and document intelligence, plus full-stack web and mobile development.',
  },
  {
    question: 'How quickly can a resource start on our project?',
    answer: 'Most engagements onboard a vetted engineer or team within 1–2 weeks of the scoping call.',
  },
  {
    question: 'Where is your team located?',
    answer:
      'We run a US-coordinated, offshore-backed model — you get local-hours communication with the cost advantages of a distributed team.',
  },
  {
    question: 'What does the free consultation actually involve?',
    answer: 'A short call to understand your project, stack, and resourcing needs — no obligation, no sales pressure.',
  },
]

export default function TechOutsourcing() {
  useDocumentTitle(
    'AI, IoT & OCR Technology Resource Outsourcing | Prosper Infotech',
    'Dedicated AI/ML, IoT, and OCR engineers plus full software development support — vetted talent, fast onboarding, and a US-coordinated, offshore-backed delivery model. Get a free consultation.'
  )

  return (
    <>
      <LeadFormPopup
        campaign="Tech Resource Outsourcing Landing Page (Popup)"
        title="Get your free resourcing consultation"
        description="Tell us about your project — we'll respond within one business day."
        serviceOptions={SERVICE_OPTIONS}
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
            <h1 className="text-white text-4xl md:text-5xl leading-tight">
              Scale Your Team With <span className="text-gold">AI, IoT &amp; OCR</span> Experts
            </h1>
            <p className="text-2xl md:text-3xl font-heading font-bold leading-snug">
              <span className="text-white">Technology </span>
              <span className="text-gold">Resource Outsourcing</span>
              <span className="text-white"> &amp; Software Development Support</span>
            </p>
            <p className="text-white/80 text-lg max-w-xl">
              Vetted AI/ML, IoT, and OCR engineers who plug into your team fast — backed by a
              US-coordinated, offshore-delivery model built for real production work.
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
                  window.gtag?.('event', 'click_to_call', { event_category: 'Tech Outsourcing Landing Page' })
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
            <div className="relative flex w-full max-w-sm items-center justify-center">
              <motion.div
                className="absolute -inset-8 rounded-[2rem] bg-gold/10 blur-3xl"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative z-10 aspect-square w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]">
                <TechIllustration variant="hero" className="h-full w-full" />
              </div>
              <motion.span
                className="absolute -top-3 left-2 z-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-semibold text-white"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                AI / IoT / OCR
              </motion.span>
              <motion.span
                className="absolute bottom-6 -right-4 z-20 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-primary"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                Dedicated Engineers
              </motion.span>
            </div>
          </Reveal>
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
            <h2 className="mt-2 text-3xl">From consultation to dedicated delivery</h2>
          </Reveal>
          <ProcessSteps steps={PROCESS_STEPS} />
        </div>
      </section>

      <section className="bg-surface-alt">
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
          <Reveal className="text-center mb-10">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">
              What We Build
            </span>
            <h2 className="mt-2 text-3xl">The technology our engineers deliver</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITY_VISUALS.map((item, i) => (
              <Reveal key={item.variant} delay={i * 0.08}>
                <div className="group overflow-hidden rounded-xl border border-ink-300 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_50px_-8px_rgba(247,221,0,0.35),0_25px_50px_-12px_rgba(0,0,0,0.25)]">
                  <TechIllustration variant={item.variant} className="aspect-[4/3]" />
                  <p className="bg-white px-4 py-3 text-sm font-semibold text-ink-700 leading-snug">
                    {item.caption}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 right-1/4 h-64 w-64 rounded-full bg-accent-green/10 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-20">
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
        </div>
      </section>

      <section className="bg-surface-alt">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <Reveal className="text-center mb-10">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">
              Why Prosper Infotech
            </span>
            <h2 className="mt-2 text-3xl">Why choose us for tech resourcing</h2>
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
              Tell us what you need built or staffed, and we'll match you with the right AI, IoT,
              OCR, or software engineers.
            </p>
            <div className="flex flex-col gap-4 mt-2">
              <a
                href={`tel:${usaPhone.replace(/\s+/g, '')}`}
                onClick={() =>
                  window.gtag?.('event', 'click_to_call', { event_category: 'Tech Outsourcing Landing Page' })
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
              Get a free resourcing consultation
            </h3>
            <p className="text-sm text-ink-600 mb-5">
              Tell us about your project — we'll respond within one business day.
            </p>
            <LandingLeadForm
              campaign="Tech Resource Outsourcing Landing Page"
              serviceOptions={SERVICE_OPTIONS}
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
