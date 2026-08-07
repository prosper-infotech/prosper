import { MapPin, Phone, Mail, Building2, Clock, MessageCircle, Zap, Users, ClipboardList, Wrench, Headset } from 'lucide-react'
import Breadcrumb from '../components/ui/Breadcrumb'
import SectionHeading from '../components/ui/SectionHeading'
import ContactForm from '../components/forms/ContactForm'
import Reveal from '../components/motion/Reveal'
import { OFFICES } from '../data/offices'
import useDocumentTitle from '../hooks/useDocumentTitle'

const OFFERINGS = [
  {
    title: '24/7 Live Support',
    icon: Clock,
    description: 'Our team is available 24 hours a day, 7 days a week, including holidays.',
  },
  {
    title: 'Multi-Channel Assistance',
    icon: MessageCircle,
    description:
      'Reach us via chat, email, phone, or our support ticket system — whichever works best for you.',
  },
  {
    title: 'Quick Response Times',
    icon: Zap,
    description: 'We prioritize urgent issues and ensure prompt resolutions.',
  },
  {
    title: 'Skilled Professionals',
    icon: Users,
    description: 'Every query is handled by trained support specialists with deep domain knowledge.',
  },
  {
    title: 'Issue Tracking',
    icon: ClipboardList,
    description: 'Every support request is logged and tracked for full transparency and follow-up.',
  },
  {
    title: 'Remote Assistance',
    icon: Wrench,
    description:
      'When needed, we can securely access your system to troubleshoot and fix problems in real time.',
  },
]

export default function Contact() {
  useDocumentTitle(
    '24x7 Help Desk & Contact | Prosper Infotech',
    "Reach Prosper Infotech's 24x7 support team by phone, email, or contact form — get help with AS400, RFID, GPS, and IoT deployments any time, day or night."
  )

  return (
    <>
      <Breadcrumb title="24x7 Help Desk" icon={Headset} />

      <section className="max-w-5xl mx-auto px-6 pt-16 pb-4">
        <Reveal className="flex flex-col gap-5">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            We're here for you — anytime, anywhere
          </span>
          <h2 className="text-3xl md:text-[38px] md:leading-[44px] font-heading font-bold text-primary">
            24x7 Help Desk
          </h2>
          <p className="text-ink-600 text-lg">
            Whether it's day or night, weekday or weekend, our expert support team is always on
            standby to help — with issues, questions, or concerns. We know how critical timely
            support is for your business, so our Help Desk is built to be fast, responsive, and
            solution-oriented, keeping downtime to a minimum and your systems running.
          </p>
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <SectionHeading eyebrow="What we offer" title="Support built around your team" />
        <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {OFFERINGS.map((offering, i) => {
            const Icon = offering.icon
            return (
              <Reveal key={offering.title} delay={(i % 3) * 0.08}>
                <div className="h-full rounded-lg border border-ink-300 bg-white p-6 shadow-md hover:shadow-[0_0_50px_-8px_rgba(247,221,0,0.35),0_25px_50px_-12px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.15)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-heading font-semibold text-lg text-primary">
                    {offering.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-600">{offering.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-primary-dark to-navy overflow-hidden">
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-6 py-16 text-center">
          <Reveal>
            <p className="text-xl md:text-2xl font-heading font-semibold text-white leading-relaxed">
              "Your satisfaction is our top priority. No matter the issue — big or small — we're
              here to provide reliable, efficient, and friendly support whenever you need it.
              Because problems don't wait. And neither do we."
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+19407583271"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm px-5 py-2.5 text-sm font-semibold text-white hover:bg-white hover:text-primary-dark transition-colors"
            >
              <Phone className="h-4 w-4" />
              +1 940 758 3271
            </a>
            <a
              href="mailto:sales@prosperinfotech.com"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm px-5 py-2.5 text-sm font-semibold text-white hover:bg-white hover:text-primary-dark transition-colors"
            >
              <Mail className="h-4 w-4" />
              sales@prosperinfotech.com
            </a>
          </Reveal>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid gap-16 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">Send us a message</h2>
            <ContactForm />
          </div>

          <div className="lg:col-span-2 flex flex-col gap-8">
            <h2 className="text-2xl font-heading font-bold text-ink-900">Our offices</h2>
            {OFFICES.map((office) => (
              <div
                key={office.country}
                className="group rounded-xl border border-ink-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_10px_25px_-8px_rgba(20,52,109,0.25)]"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.15)]">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-ink-900">
                    {office.country}
                  </h3>
                </div>
                <div className="mb-2 flex items-center gap-3 text-ink-600">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <a
                    href={`tel:${office.phone.replace(/\s+/g, '')}`}
                    className="transition-colors hover:text-primary"
                  >
                    {office.phone}
                  </a>
                </div>
                <div className="flex items-start gap-3 text-ink-600">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary"
                  >
                    {office.address}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
