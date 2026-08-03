import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { Lightbulb, Wrench, Cable, LifeBuoy } from 'lucide-react'
import Breadcrumb from '../components/ui/Breadcrumb'
import CTABand from '../components/ui/CTABand'
import Reveal from '../components/motion/Reveal'

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
  const [active, setActive] = useState(POINTS[0].key)
  const activePoint = POINTS.find((p) => p.key === active)

  return (
    <>
      <Breadcrumb title="RFID Services" parent="Services" />

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
                    type="button"
                    onMouseEnter={() => setActive(point.key)}
                    onClick={() => setActive(point.key)}
                    className={`w-full text-left rounded-lg border-l-4 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-[0_0_50px_-8px_rgba(247,221,0,0.45),0_25px_50px_-12px_rgba(0,0,0,0.35)] ${
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

      {/* Mobile/tablet: sliding cards, one point per slide */}
      <section className="lg:hidden max-w-xl mx-auto px-6 py-14">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          className="pb-10"
        >
          {POINTS.map((point) => {
            const Icon = point.icon
            return (
              <SwiperSlide key={point.key}>
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
              </SwiperSlide>
            )
          })}
        </Swiper>
      </section>

      <CTABand
        title="Ready to talk about RFID Services?"
        description="We'll walk through your requirements and recommend the right approach."
      />
    </>
  )
}
