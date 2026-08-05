import { useState } from 'react'
import { Code2, Radio, Camera, Cpu, Cloud, CheckCircle2 } from 'lucide-react'
import Breadcrumb from '../components/ui/Breadcrumb'
import CTABand from '../components/ui/CTABand'
import Reveal from '../components/motion/Reveal'

const HIGHLIGHTS = [
  'Custom IoT firmware and software development',
  'LoRaWAN sensor network design and deployment',
  'Sensor, PLC, and camera integration via industrial protocols',
  'Edge AI and secure cloud connectivity pipelines',
]

const POINTS = [
  {
    key: 'development',
    title: 'IoT Solution Development',
    description: 'Custom firmware and software development for industrial IoT deployments.',
    icon: Code2,
    blurb:
      'We build the custom firmware, device software, and backend services that turn raw sensor data into something your team can actually act on — tailored to your specific hardware, protocols, and operational requirements rather than forcing you into an off-the-shelf platform.',
  },
  {
    key: 'lorawan',
    title: 'LoRaWAN Networks',
    description: 'Long-range, low-power sensor networks for large industrial sites.',
    icon: Radio,
    blurb:
      "For facilities where WiFi and cellular don't reach, we design and deploy LoRaWAN networks — gateways, sensors, and network servers — that give you years of battery life and kilometers of range for monitoring equipment, tanks, and remote assets.",
  },
  {
    key: 'integration',
    title: 'Device & Camera Integration',
    description: 'Connecting sensors, PLCs, and cameras into a single monitoring platform.',
    icon: Camera,
    blurb:
      'We integrate the sensors, PLCs, meters, and cameras already on your factory floor into one unified platform, using the industrial protocols (Modbus, OPC-UA, MQTT) your equipment already speaks — no rip-and-replace required.',
  },
  {
    key: 'edge-ai',
    title: 'Edge AI',
    description: 'On-device AI processing for real-time inspection and detection.',
    icon: Cpu,
    blurb:
      'Running AI models directly on edge devices — not the cloud — means real-time defect detection, safety monitoring, and anomaly alerts even with unreliable connectivity, while keeping sensitive video and sensor data on-site.',
  },
  {
    key: 'cloud',
    title: 'Cloud Connectivity',
    description: 'Secure data pipelines from the factory floor to your cloud platform.',
    icon: Cloud,
    blurb:
      "We build the secure, reliable data pipelines that move sensor and device data from the edge into AWS, Azure, or your own infrastructure, so it's ready for dashboards, analytics, and long-term storage without dropped readings or manual exports.",
  },
]

export default function IndustrialIoTServices() {
  const [active, setActive] = useState(POINTS[0].key)
  const activePoint = POINTS.find((p) => p.key === active)

  return (
    <>
      <Breadcrumb title="Industrial IoT Services" parent="Services" />

      <section className="max-w-5xl mx-auto px-6 pt-16 pb-4">
        <Reveal className="flex flex-col gap-5">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            How we help
          </span>
          <h2 className="text-3xl md:text-[38px] md:leading-[44px] font-heading font-bold text-primary">
            Industrial IoT services, from the sensor to the cloud
          </h2>
          <p className="text-ink-600 text-lg">
            Turning a factory floor or industrial site into a connected operation takes more than
            hardware. Our team develops the firmware, networks, integrations, and cloud pipelines
            that connect your sensors, equipment, and cameras into one platform you can actually
            monitor and act on.
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
        title="Ready to talk about Industrial IoT Services?"
        description="We'll walk through your requirements and recommend the right approach."
      />
    </>
  )
}
