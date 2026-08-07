import { Lightbulb, ShieldCheck, Users, Handshake, MapPin, Phone } from 'lucide-react'
import Breadcrumb from '../components/ui/Breadcrumb'
import SectionHeading from '../components/ui/SectionHeading'
import StatCounter from '../components/ui/StatCounter'
import CTABand from '../components/ui/CTABand'
import Reveal from '../components/motion/Reveal'
import { OFFICES } from '../data/offices'
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

const STATS = [
  { value: '10+', label: 'Years of Logistics Technology Expertise' },
  { value: '100+', label: 'Engineers & Consultants' },
  { value: '2', label: 'Global Offices' },
  { value: '24/7', label: 'Support Coverage' },
]

export default function About() {
  useDocumentTitle(
    'About Us | Prosper Infotech',
    'Prosper Infotech is a Dallas-based technology company delivering RFID, GPS, IoT, and AI logistics solutions, backed by 100+ engineers across offices in the USA and India.'
  )

  return (
    <>
      <Breadcrumb title="About Us" />

      <section className="max-w-4xl mx-auto px-6 pt-16 pb-8 text-center">
        <Reveal className="flex flex-col items-center gap-4">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Who We Are
          </span>
          <h2 className="text-3xl md:text-[38px] md:leading-[44px]">About Prosper Infotech LLC</h2>
          <p className="text-ink-600 text-lg">
            Prosper Infotech LLC is a Dallas, USA based software development company with
            expertise in providing businesses worldwide with custom technology solutions.
          </p>
          <p className="text-ink-600">
            We offer a wide array of services including Supply Chain Solutions, Yard Management
            Solutions, RFID and GPS Solutions, Web Development, and IoT Application Development.
            Our team of 100+ professional developers and consultants approaches every project
            holistically, providing full around-the-clock focus to understanding our customers'
            needs and delivering comprehensive, scalable, and extensible development roadmaps.
          </p>
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <SectionHeading eyebrow="How We Work" title="Our approach" />
        <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {APPROACH.map((step, i) => {
            const Icon = step.icon
            return (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="rounded-lg border border-ink-300 bg-white p-6 shadow-md hover:shadow-[0_0_50px_-8px_rgba(247,221,0,0.35),0_25px_50px_-12px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.15)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-heading font-semibold text-lg text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-600">{step.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-primary-dark to-navy overflow-hidden">
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 py-16 grid gap-6 grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1} y={16} className="h-full">
              <div className="h-full min-h-[160px] flex flex-col items-center pt-6 text-center rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] px-4 pb-6">
                <StatCounter value={stat.value} label={stat.label} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <SectionHeading eyebrow="What We Believe" title="Our values" />
        <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, i) => (
            <Reveal key={value.title} delay={(i % 4) * 0.08}>
              <div className="text-center">
                <span className="text-3xl font-heading font-bold text-gold">
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
                <div className="rounded-lg border border-ink-300 bg-white p-7 shadow-md">
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
