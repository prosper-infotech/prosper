import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Lightbulb, Wrench, Cable, LifeBuoy, CheckCircle2 } from 'lucide-react'
import Breadcrumb from '../components/ui/Breadcrumb'
import CTABand from '../components/ui/CTABand'
import Reveal from '../components/motion/Reveal'
import useDocumentTitle from '../hooks/useDocumentTitle'

const HIGHLIGHTS = [
  'Strategic technology consulting before you invest in hardware',
  'Full hardware and software deployment across every site',
  'Direct integration with your ERP, WMS, and business systems',
  'Ongoing monitoring, tuning, and support once you go live',
]

const POINTS = [
  {
    key: 'consulting',
    title: 'RFID Consulting',
    description: 'Strategic guidance on RFID technology selection and deployment planning.',
    icon: Lightbulb,
    blurb:
      "Our RFID consulting team evaluates your operation — warehouse layout, asset types, read-range requirements — and recommends the right tags, readers, and frequency bands before you invest in hardware. We help you avoid costly pilot failures by validating the approach against your real environment first.",
  },
  {
    key: 'implementation',
    title: 'RFID Implementation',
    description: 'End-to-end deployment of RFID hardware and software across your sites.',
    icon: Wrench,
    blurb:
      'From installing fixed and handheld readers to configuring middleware and tuning antenna placement for accurate reads, our implementation team handles the full rollout — including staff training and phased go-live — so your RFID system works reliably from day one.',
  },
  {
    key: 'integration',
    title: 'RFID Integration',
    description: 'Connecting RFID data into your existing ERP, WMS, and business systems.',
    icon: Cable,
    blurb:
      'RFID is only as useful as the systems it feeds. We integrate tag reads directly into your ERP, WMS, or custom platforms via APIs and middleware, so inventory counts, asset locations, and gate events update automatically — no manual reconciliation required.',
  },
  {
    key: 'support',
    title: 'RFID Support',
    description: 'Ongoing monitoring, maintenance, and troubleshooting for live RFID systems.',
    icon: LifeBuoy,
    blurb:
      'Once you are live, our support team keeps your RFID infrastructure running — monitoring reader uptime, tuning performance as your environment changes, and resolving hardware or software issues quickly to minimize downtime.',
  },
]

export default function RFIDServices() {
  useDocumentTitle(
    'RFID Services | Prosper Infotech',
    'End-to-end RFID deployment — consulting, implementation, system integration, and ongoing support — so your RFID investment works from day one.'
  )

  const location = useLocation()
  const [active, setActive] = useState(
    () => POINTS.find((p) => p.key === location.hash.slice(1))?.key ?? POINTS[0].key
  )
  const activePoint = POINTS.find((p) => p.key === active)

  useEffect(() => {
    const key = location.hash.slice(1)
    if (POINTS.some((p) => p.key === key)) setActive(key)
  }, [location.hash])

  return (
    <>
      <Breadcrumb title="RFID Services" parent="Services" />

      <section className="max-w-5xl mx-auto px-6 pt-16 pb-4">
        <Reveal className="flex flex-col gap-5">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            How we help
          </span>
          <h2 className="text-3xl md:text-[38px] md:leading-[44px] font-heading font-bold text-primary">
            End-to-end RFID deployment, from first pilot to full rollout
          </h2>
          <p className="text-ink-600 text-lg">
            RFID only pays off when it's implemented right. From evaluating your operation and
            recommending the right hardware, through installation, system integration, and
            ongoing support, our team handles every stage so your RFID investment actually works
            as intended from day one.
          </p>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {HIGHLIGHTS.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-ink-700">
                <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Desktop: hover-preview two-column layout */}
      <section className="hidden lg:block max-w-6xl mx-auto px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <div className="flex flex-col gap-5">
            {POINTS.map((point, i) => {
              const Icon = point.icon
              const isActive = active === point.key
              return (
                <Reveal key={point.key} delay={i * 0.06}>
                  <button
                    id={point.key}
                    type="button"
                    onMouseEnter={() => setActive(point.key)}
                    onClick={() => setActive(point.key)}
                    className={`scroll-mt-32 w-full text-left rounded-lg border-l-4 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-[0_0_50px_-8px_rgba(247,221,0,0.45),0_25px_50px_-12px_rgba(0,0,0,0.35)] ${
                      isActive ? 'border-gold shadow-lg' : 'border-ink-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                          isActive ? 'bg-gold/20 text-primary' : 'bg-surface-alt text-ink-500'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-lg text-primary">
                          {point.title}
                        </h3>
                        <p className="mt-1 text-sm text-ink-600">{point.description}</p>
                        <span className="mt-2 inline-block text-xs font-semibold uppercase tracking-wide text-ink-500">
                          {isActive ? 'Showing details' : 'Hover to preview'}
                        </span>
                      </div>
                    </div>
                  </button>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={0.1} className="lg:sticky lg:top-28">
            <div className="rounded-2xl border border-ink-300 bg-white shadow-xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.15)]">
                  <activePoint.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-primary">
                  {activePoint.title}
                </h3>
              </div>
              <p className="text-sm text-ink-600 leading-relaxed">{activePoint.blurb}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mobile/tablet: stacked cards, one point per row */}
      <section className="lg:hidden max-w-xl mx-auto px-6 py-14">
        <div className="flex flex-col gap-6">
          {POINTS.map((point, i) => {
            const Icon = point.icon
            return (
              <Reveal key={point.key} delay={(i % 3) * 0.06}>
                <div className="rounded-2xl border-l-4 border-gold bg-white shadow-xl p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/20 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-primary">
                        {point.title}
                      </h3>
                      <p className="text-sm text-ink-600">{point.description}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-ink-600 leading-relaxed">{point.blurb}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <CTABand
        title="Ready to talk about RFID Services?"
        description="We'll walk through your requirements and recommend the right approach."
      />
    </>
  )
}
