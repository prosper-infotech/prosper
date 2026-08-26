import { useEffect, useRef, useState } from 'react'
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
  Globe,
} from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import Button from '../../components/ui/Button'
import Reveal from '../../components/motion/Reveal'
import LandingLeadForm from '../../components/forms/LandingLeadForm'
import ProcessSteps from '../../components/ui/ProcessSteps'
import FAQAccordion from '../../components/ui/FAQAccordion'
import VisualGallery from '../../components/ui/VisualGallery'
import ClientLogoStrip from '../../components/ui/ClientLogoStrip'
import { SHOW_CLIENTS } from '../../data/clients'
import LeadFormPopup from '../../components/forms/LeadFormPopup'
import { OFFICES } from '../../data/offices'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import heroTeamImg from '../../assets/tech-outsourcing-hero-team.jpg'
import aiMlImg from '../../assets/tech-outsourcing-ai-ml.jpg'
import iotImg from '../../assets/tech-outsourcing-iot.jpg'
import ocrImg from '../../assets/tech-outsourcing-ocr.jpg'
import devSupportImg from '../../assets/tech-outsourcing-dev-support.jpg'
import supportTeamImg from '../../assets/tech-outsourcing-support-team.jpg'

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
    iconBg: 'bg-gold/20',
    iconColor: 'text-[#6b5f00]',
    accent: 'border-t-gold',
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
    iconBg: 'bg-[#0F172A]/10',
    iconColor: 'text-[#0F172A]',
    accent: 'border-t-[#0F172A]',
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
    iconBg: 'bg-accent-green/15',
    iconColor: 'text-accent-green',
    accent: 'border-t-accent-green',
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
  { image: aiMlImg, caption: 'AI & ML models trained and deployed for real production workloads' },
  { image: iotImg, caption: 'IoT sensor networks and edge devices engineered end-to-end' },
  { image: ocrImg, caption: 'OCR and document intelligence built into live business workflows' },
  { image: devSupportImg, caption: 'Full-stack software delivery, from API to production deploy' },
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

const STATS = [
  { value: 10, suffix: '+', label: 'Years of Technology Delivery' },
  { value: 50, suffix: '+', label: 'Engineers Deployed' },
  { value: 100, suffix: '+', label: 'Projects Delivered' },
  { value: 2, suffix: '', label: 'Global Delivery Hubs' },
]

const HUB_ROLES = ['Coordination Hub', 'Delivery Hub']

const TECH_STACK = [
  'Python',
  'TensorFlow',
  'PyTorch',
  'OpenCV',
  'React',
  'Node.js',
  'AWS',
  'Azure',
  'Docker',
  'Kubernetes',
  'LoRaWAN',
  'MQTT',
  'Tesseract OCR',
  'PostgreSQL',
  'MongoDB',
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

function Eyebrow({ children, className = '' }) {
  return (
    <span className={`${MONO_FONT} text-xs font-semibold uppercase tracking-widest text-[#6b5f00] ${className}`}>
      {children}
    </span>
  )
}

function AnimatedCounter({ to, suffix = '', duration = 1.6 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = null
    let frame
    function step(ts) {
      if (start === null) start = ts
      const progress = Math.min((ts - start) / (duration * 1000), 1)
      setValue(Math.floor(progress * to))
      if (progress < 1) frame = requestAnimationFrame(step)
      else setValue(to)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [inView, to, duration])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}

export default function TechOutsourcing() {
  useDocumentTitle(
    'AI, IoT & OCR Technology Resource Outsourcing | Prosper Infotech',
    'Dedicated AI/ML, IoT, and OCR engineers plus full software development support — vetted talent, fast onboarding, and a US-coordinated, offshore-backed delivery model. Get a free consultation.'
  )

  return (
    <div className={`${BODY_FONT} ${CHARCOAL}`}>
      <LeadFormPopup
        campaign="Tech Resource Outsourcing Landing Page (Popup)"
        title="Get your free resourcing consultation"
        description="Tell us about your project — we'll respond within one business day."
        serviceOptions={SERVICE_OPTIONS}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <motion.div
          className="pointer-events-none absolute top-1/4 right-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          <Reveal className="flex flex-col gap-5">
            <div className={`inline-flex w-fit items-center gap-2 rounded-full border ${BORDER} bg-[#F8FAFC] px-4 py-1.5`}>
              <span className="h-2 w-2 rounded-full bg-gold-dark animate-pulse" />
              <span className={`${MONO_FONT} text-xs font-medium uppercase tracking-widest ${CHARCOAL}`}>
                Fast Onboarding &bull; Vetted Talent
              </span>
            </div>

            <h1 className={`${HEADING_FONT} ${NAVY} text-4xl md:text-5xl font-bold leading-tight`}>
              Scale Your Team With <span className="text-gold-dark">AI, IoT &amp; OCR</span> Experts
            </h1>
            <p className={`${HEADING_FONT} ${NAVY} text-2xl md:text-3xl font-bold leading-snug`}>
              Technology <span className="text-gold-dark">Resource Outsourcing</span> &amp; Software
              Development Support
            </p>
            <p className={`${CHARCOAL} text-lg max-w-xl`}>
              Vetted AI/ML, IoT, and OCR engineers who plug into your team fast — backed by a
              US-coordinated, offshore-delivery model built for real production work.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <Button href="#lead-form" variant="primary">
                Get a Free Consultation
              </Button>
              <Button
                href={`tel:${usaPhone.replace(/\s+/g, '')}`}
                variant="outline-dark"
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

            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-2 border-t ${BORDER}`}>
              {STAT_BADGES.map((badge) => {
                const Icon = badge.icon
                return (
                  <div key={badge.label} className="flex items-center gap-3 pt-6">
                    <Icon className="h-6 w-6 text-gold-dark shrink-0" />
                    <span className={`${NAVY} text-sm font-bold`}>{badge.label}</span>
                  </div>
                )
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="hidden lg:flex items-center justify-center">
            <div className="relative flex w-full max-w-sm items-center justify-center">
              <div
                className={`relative z-10 overflow-hidden rounded-xl border ${BORDER} shadow-[0_20px_50px_-15px_rgba(15,23,42,0.15)]`}
              >
                <img
                  src={heroTeamImg}
                  alt="Prosper Infotech AI, IoT, and software engineering team collaborating"
                  className="w-full"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats bar */}
      <section className={`relative overflow-hidden ${SURFACE} border-y ${BORDER}`}>
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08} className="text-center">
                <div className={`${HEADING_FONT} ${NAVY} text-4xl font-extrabold`}>
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                </div>
                <p className={`mt-1 text-sm ${CHARCOAL} font-semibold`}>{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Global delivery model */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-6 py-16 lg:py-20">
          <Reveal className="text-center mb-14">
            <Eyebrow>Global Delivery Model</Eyebrow>
            <h2 className={`${HEADING_FONT} ${NAVY} mt-2 text-3xl font-bold`}>
              A US-coordinated, offshore-backed delivery bridge
            </h2>
            <p className={`mt-3 ${CHARCOAL} max-w-xl mx-auto`}>
              Two connected hubs working as one team — local-hours coordination with the cost
              advantages of offshore engineering.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-8">
            {OFFICES.map((office, i) => (
              <div key={office.country} className={i === 1 ? 'md:order-3' : ''}>
                <Reveal delay={i * 0.1}>
                  <div className={`rounded-xl border ${BORDER} bg-white p-6 text-center shadow-sm`}>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/20">
                      <MapPin className="h-6 w-6 text-gold-dark" />
                    </div>
                    <h3 className={`${HEADING_FONT} ${NAVY} mt-4 text-lg font-bold`}>{office.country}</h3>
                    <p className={`text-sm ${CHARCOAL} mt-1`}>{HUB_ROLES[i]}</p>
                    <p className={`mt-3 text-sm font-semibold ${NAVY}`}>{office.phone}</p>
                  </div>
                </Reveal>
              </div>
            ))}
            <div className="hidden md:flex md:order-2 flex-col items-center gap-3 px-2">
              <Globe className="h-6 w-6 text-gold-dark" />
              <div className={`relative h-0.5 w-20 rounded-full ${SURFACE} border ${BORDER} overflow-hidden`}>
                <motion.div
                  className="absolute top-0 h-full w-6 bg-gradient-to-r from-transparent via-gold-dark to-transparent"
                  animate={{ x: ['-100%', '400%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative overflow-hidden bg-white">
        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-20">
          <Reveal className="text-center mb-12">
            <Eyebrow>How It Works</Eyebrow>
            <h2 className={`${HEADING_FONT} ${NAVY} mt-2 text-3xl font-bold`}>
              From consultation to dedicated delivery
            </h2>
          </Reveal>
          <ProcessSteps steps={PROCESS_STEPS} />
        </div>
      </section>

      {/* What we build */}
      <section className={SURFACE}>
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
          <Reveal className="text-center mb-10">
            <Eyebrow>What We Build</Eyebrow>
            <h2 className={`${HEADING_FONT} ${NAVY} mt-2 text-3xl font-bold`}>
              The technology our engineers deliver
            </h2>
          </Reveal>
          <VisualGallery items={CAPABILITY_VISUALS} />
        </div>
      </section>

      {/* Tech stack marquee */}
      <section className={`relative overflow-hidden border-y ${BORDER} bg-white py-8`}>
        <Reveal className="text-center mb-6">
          <Eyebrow>Technologies We Work With</Eyebrow>
        </Reveal>
        <div
          className="relative overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <div className="flex w-max animate-marquee items-center gap-4">
            {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
              <span
                key={i}
                className={`${MONO_FONT} whitespace-nowrap rounded-full border ${BORDER} ${SURFACE} px-4 py-2 text-xs font-semibold uppercase tracking-wide ${NAVY}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Service columns */}
      <section className="relative overflow-hidden bg-white">
        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-20">
          <div className="grid gap-6 lg:grid-cols-3">
            {SERVICE_COLUMNS.map((col, i) => {
              const Icon = col.icon
              return (
                <Reveal key={col.key} delay={i * 0.08}>
                  <div
                    className={`h-full rounded-xl border ${BORDER} border-t-2 ${col.accent} bg-white p-7 shadow-sm transition-transform duration-300 hover:-translate-y-1.5`}
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${col.iconBg}`}>
                      <Icon className={`h-6 w-6 ${col.iconColor}`} />
                    </div>
                    <h3 className={`${HEADING_FONT} ${NAVY} mt-5 text-lg font-bold`}>{col.title}</h3>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {col.items.map((item) => (
                        <li key={item} className={`flex items-start gap-2 text-sm ${CHARCOAL}`}>
                          <Check className="h-4 w-4 text-gold-dark shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className={SURFACE}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <Reveal className="text-center mb-10">
            <Eyebrow>Why Prosper Infotech</Eyebrow>
            <h2 className={`${HEADING_FONT} ${NAVY} mt-2 text-3xl font-bold`}>
              Why choose us for tech resourcing
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {WHY_CHOOSE.map((reason) => {
              const Icon = reason.icon
              return (
                <div
                  key={reason.label}
                  className={`flex flex-col items-center text-center gap-3 rounded-xl bg-white border ${BORDER} px-5 py-6 shadow-sm transition-transform duration-300 hover:-translate-y-1.5`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/20 text-gold-dark">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`${NAVY} text-sm font-bold`}>{reason.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Support photo */}
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
          <Reveal className="text-center mb-10">
            <Eyebrow>Real Support, Real People</Eyebrow>
            <h2 className={`${HEADING_FONT} ${NAVY} mt-2 text-3xl font-bold`}>
              A dedicated team behind every engagement
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className={`overflow-hidden rounded-xl border ${BORDER} shadow-sm`}>
              <img
                src={supportTeamImg}
                alt="Prosper Infotech support and engineering team"
                className="w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Industries */}
      <section className={SURFACE}>
        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <Reveal className="text-center mb-10">
            <Eyebrow>Who We Help</Eyebrow>
            <h2 className={`${HEADING_FONT} ${NAVY} mt-2 text-3xl font-bold`}>
              Trusted by enterprises across industries
            </h2>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-3">
            {INDUSTRIES.map((industry) => {
              const Icon = industry.icon
              return (
                <span
                  key={industry.label}
                  className={`inline-flex items-center gap-2 rounded-full border ${BORDER} bg-white px-4 py-2.5 text-sm font-semibold ${NAVY} shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold`}
                >
                  <Icon className="h-4 w-4 text-gold-dark" />
                  {industry.label}
                </span>
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
      <section className={SURFACE}>
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

      {/* Lead form */}
      <section id="lead-form" className="relative overflow-hidden bg-white">
        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-20 grid lg:grid-cols-2 gap-10 items-start">
          <Reveal className="flex flex-col gap-5">
            <h2 className={`${HEADING_FONT} ${NAVY} text-3xl font-bold`}>Let&apos;s connect!</h2>
            <p className={`${CHARCOAL} text-lg`}>
              Tell us what you need built or staffed, and we&apos;ll match you with the right AI, IoT,
              OCR, or software engineers.
            </p>
            <div className="flex flex-col gap-4 mt-2">
              <a
                href={`tel:${usaPhone.replace(/\s+/g, '')}`}
                onClick={() =>
                  window.gtag?.('event', 'click_to_call', { event_category: 'Tech Outsourcing Landing Page' })
                }
                className={`inline-flex items-center gap-3 rounded-lg border ${BORDER} ${SURFACE} px-5 py-4 ${NAVY} font-semibold hover:border-gold transition-colors`}
              >
                <PhoneCall className="h-5 w-5 text-gold-dark" />
                {usaPhone}
              </a>
              <a
                href="mailto:sales@prosperinfotech.com"
                className={`inline-flex items-center gap-3 rounded-lg border ${BORDER} ${SURFACE} px-5 py-4 ${NAVY} font-semibold hover:border-gold transition-colors`}
              >
                <Mail className="h-5 w-5 text-gold-dark" />
                sales@prosperinfotech.com
              </a>
              <span
                className={`inline-flex items-center gap-3 rounded-lg border ${BORDER} ${SURFACE} px-5 py-4 ${CHARCOAL} text-sm`}
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
            <h3 className={`${HEADING_FONT} ${NAVY} text-xl font-bold mb-1`}>
              Get a free resourcing consultation
            </h3>
            <p className={`text-sm ${CHARCOAL} mb-5`}>
              Tell us about your project — we&apos;ll respond within one business day.
            </p>
            <LandingLeadForm
              campaign="Tech Resource Outsourcing Landing Page"
              serviceOptions={SERVICE_OPTIONS}
            />
          </Reveal>
        </div>
      </section>
    </div>
  )
}
