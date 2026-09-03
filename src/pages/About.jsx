import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, ShieldCheck, Users, Handshake, MapPin, Phone } from 'lucide-react'
import Breadcrumb from '../components/ui/Breadcrumb'
import SectionHeading from '../components/ui/SectionHeading'
import CTABand from '../components/ui/CTABand'
import Reveal from '../components/motion/Reveal'
import { OFFICES } from '../data/offices'
import { CAPABILITIES, REGIONS, WHY_CHOOSE } from '../data/company'
import { FLAG_COMPONENTS } from '../components/ui/RegionFlags'
import useDocumentTitle from '../hooks/useDocumentTitle'

const APPROACH = [
  {
    icon: Lightbulb,
    title: 'Consult',
    description: 'We start by understanding your operation — yard layout, asset types, existing systems — before recommending any technology.',
  },
  {
    icon: Users,
    title: 'Build',
    description: 'Our engineers develop and configure RFID, GPS, IoT, and AI solutions tailored to your environment, not a one-size-fits-all product.',
  },
  {
    icon: ShieldCheck,
    title: 'Deploy',
    description: 'We install hardware, integrate with your existing ERP, WMS, TMS, or YMS, and train your team for a smooth go-live.',
  },
  {
    icon: Handshake,
    title: 'Support',
    description: 'Our relationship continues after launch, with 24/7 monitoring and remote support to keep your systems running.',
  },
]

const VALUES = [
  { title: 'Reliability', description: 'Systems built for mission-critical operations, engineered for uptime.' },
  { title: 'Innovation', description: 'We stay ahead of RFID, GPS, IoT, and AI advances so our clients don\'t have to.' },
  { title: 'Partnership', description: 'We work as an extension of your team, not a vendor that disappears after go-live.' },
  { title: 'Security', description: 'Encrypted data pipelines and secure hardware, built in from day one.' },
]

function SpotlightCard({ children, className = '' }) {
  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }
  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative h-full overflow-hidden rounded-2xl border border-ink-300 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(220px circle at var(--x) var(--y), rgba(247,221,0,0.18), transparent 70%)',
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}

export default function About() {
  useDocumentTitle(
    'About Us | Prosper Infotech',
    'Prosper Infotech is a Dallas-based technology company delivering RFID, GPS, IoT, and AI logistics solutions, backed by engineering teams across the USA, India, and Japan.'
  )

  const [flippedIndex, setFlippedIndex] = useState(null)

  return (
    <>
      <Breadcrumb title="About Us" />

      <section className="relative bg-gradient-to-br from-primary-dark via-navy to-[#081a3d] overflow-hidden">
        <motion.div
          className="pointer-events-none absolute top-0 right-0 h-80 w-80 rounded-full bg-gold/25 blur-[110px]"
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-gold-dark/15 blur-[100px]"
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3a5a99]/40 blur-[110px]" />
        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <Reveal className="flex flex-col items-center gap-5">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Who We Are
            </span>
            <h1 className="text-white text-3xl md:text-[42px] md:leading-[48px] font-heading font-bold">
              Engineering AI, IoT &amp; Logistics Solutions for Real-World Operations
            </h1>
            <p className="text-white/80 text-lg">
              For more than a decade, Prosper Infotech has been designing, developing,
              integrating, and supporting technology solutions for logistics, warehousing,
              transportation, CFS/container terminals, manufacturing, and enterprise operations.
            </p>
            <p className="text-white/70">
              Our engineering teams across the USA, India, and Japan bring together deep
              expertise in Artificial Intelligence, Computer Vision, OCR, RFID, GPS/RTK,
              Industrial IoT, Edge Computing, cloud platforms, and enterprise software
              development — helping customers connect physical operations with real-time
              digital intelligence.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <SectionHeading eyebrow="What We Do" title="Capabilities that power your operation" />
        <div className="mt-12 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map(({ icon: Icon, label, description }, i) => (
            <Reveal key={label} delay={(i % 4) * 0.07}>
              <SpotlightCard>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.15)] transition-transform duration-500 group-hover:rotate-[360deg]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-heading font-semibold text-base text-primary">{label}</h3>
                <p className="mt-2 text-sm text-ink-600">{description}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-surface-alt">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <SectionHeading eyebrow="How We Work" title="Our approach" />
          <div className="relative mt-16">
            <div className="lg:hidden absolute left-6 top-6 bottom-6 w-px bg-ink-300" />
            <motion.div
              className="lg:hidden absolute left-6 top-6 w-px bg-gradient-to-b from-gold to-gold-dark origin-top"
              style={{ height: 'calc(100% - 3rem)' }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
            <div className="hidden lg:block absolute left-[12.5%] right-[12.5%] top-6 h-px bg-ink-300" />
            <motion.div
              className="hidden lg:block absolute left-[12.5%] top-6 h-px w-[75%] bg-gradient-to-r from-gold to-gold-dark origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
            <div className="relative grid gap-10 lg:grid-cols-4">
              {APPROACH.map((step, i) => {
                const Icon = step.icon
                return (
                  <Reveal
                    key={step.title}
                    delay={i * 0.15}
                    className="relative pl-16 lg:pl-0 lg:flex lg:flex-col lg:items-center lg:text-center"
                  >
                    <div className="absolute left-0 top-0 lg:static lg:mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary shadow-md z-10">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-primary">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm text-ink-600">{step.description}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <SectionHeading title="Global Engineering. Local Accountability." className="mb-14" />
        <div className="grid gap-6 sm:grid-cols-3">
          {REGIONS.map(({ flagKey, country, description }, i) => {
            const Flag = FLAG_COMPONENTS[flagKey]
            return (
              <Reveal key={country} delay={i * 0.12}>
                <div className="h-full flex items-start gap-4 rounded-2xl border border-ink-300 bg-white p-6 shadow-sm hover:-translate-y-1.5 hover:shadow-[0_0_50px_-8px_rgba(247,221,0,0.35),0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-300">
                  <div className="relative shrink-0">
                    <motion.span
                      className="absolute inset-0 rounded-full border-2 border-gold"
                      animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: i * 0.4 }}
                    />
                    <Flag />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-primary">{country}</h3>
                    <p className="mt-1.5 text-sm text-ink-600">{description}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <Reveal>
          <div className="rounded-2xl bg-gradient-to-b from-primary-dark to-navy border border-white/10 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {WHY_CHOOSE.map((item, i) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className={`group flex flex-col items-center text-center gap-3 px-6 py-10 transition-colors duration-300 hover:bg-white/[0.03] ${
                      i > 0 ? 'lg:border-l lg:border-white/10' : ''
                    }`}
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold/60 text-gold transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className="font-heading font-bold text-lg text-white">{item.title}</h3>
                    <p className="text-sm text-white/70">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <SectionHeading eyebrow="What We Believe" title="Our values" />
        <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, i) => (
            <Reveal key={value.title} delay={(i % 4) * 0.08}>
              <div
                className="text-center cursor-default"
                onMouseEnter={() => setFlippedIndex(i)}
                onMouseLeave={() => setFlippedIndex(null)}
              >
                <span
                  className={`inline-block text-3xl font-heading font-bold transition-all duration-300 ${
                    flippedIndex === i ? 'text-gold scale-110' : 'text-gold/70'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 font-heading font-semibold text-lg text-primary">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-ink-600">{value.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-surface-alt">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <SectionHeading eyebrow="Where We Are" title="Our offices" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {OFFICES.map((office, i) => (
              <Reveal key={office.country} delay={i * 0.1}>
                <div className="rounded-lg border border-ink-300 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_-8px_rgba(247,221,0,0.35),0_20px_40px_-12px_rgba(0,0,0,0.2)]">
                  <h3 className="font-heading font-semibold text-lg text-primary mb-3">
                    {office.country}
                  </h3>
                  <div className="flex items-center gap-3 text-ink-600 mb-2">
                    <Phone className="h-4 w-4 text-gold shrink-0" />
                    <a href={`tel:${office.phone.replace(/\s+/g, '')}`} className="hover:text-primary">
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-3 text-ink-600">
                    <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    <span>{office.address}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to work with us?"
        description="Talk to our team about the right RFID, GPS, IoT, or AI solution for your operation."
      />
    </>
  )
}
