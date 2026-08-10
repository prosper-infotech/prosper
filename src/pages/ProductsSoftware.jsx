import {
  Tag,
  Warehouse,
  Camera,
  Satellite,
  UserCheck,
  Check,
  ArrowRight,
} from 'lucide-react'
import Breadcrumb from '../components/ui/Breadcrumb'
import SectionHeading from '../components/ui/SectionHeading'
import CTABand from '../components/ui/CTABand'
import Reveal from '../components/motion/Reveal'
import useDocumentTitle from '../hooks/useDocumentTitle'

const PRODUCTS = [
  {
    key: 'asset-tracking',
    icon: Tag,
    name: 'Prosper Asset Tracking',
    tagline: 'Track every asset. Optimize every operation. Secure every moment.',
    description:
      'RFID-powered asset tracking with fixed and handheld reader setups, delivered as a zero-upfront SaaS platform with hardware included.',
    process: ['RFID Tags', 'Fixed / Handheld Readers', 'IoT Gateway', 'REST API', 'Dashboard'],
    features: [
      'Real-time visibility',
      'Alerts & notifications',
      'Automated check-in/out',
      'Multi-site asset control',
      'Powerful dashboards & reports',
    ],
    highlights: [
      'Real-Time Asset Visibility',
      'Automated Check-In & Out',
      'Multi Yard Support',
      'Seamless Integrations',
      'Secure & Reliable',
    ],
    idealFor: [
      'Warehouses',
      'Medical / Hospitals',
      'Construction Equipment',
      'Tools & Machinery',
      'IT Assets',
      'Rental Equipment',
      'Fleet Yards',
      'Manufacturing',
      'Schools / Campuses',
    ],
    badge: '$0 upfront · Free hardware · Pay monthly · First 2 months free',
  },
  {
    key: 'wms',
    icon: Warehouse,
    name: 'Prosper WMS',
    tagline: 'Warehouse Management System',
    description:
      'Real-time inventory control, put-away, picking, packing, dispatch, and full warehouse visibility.',
    process: ['Receiving', 'Put-Away', 'Storage', 'Picking', 'Packing', 'Dispatch'],
    features: [
      'Inventory visibility',
      'Inbound receiving & put-away management',
      'Picking & packing workflows',
      'Batch / lot / serial tracking',
      'Barcode & RFID support',
      'Cycle count & audits',
      'Multi-warehouse support',
      'API / ERP / TMS integration',
    ],
    highlights: [
      'Real-Time Stock Visibility',
      'Faster Order Fulfillment',
      'Reduced Inventory Errors',
      'Seamless Integrations',
      'Multi-Site Operations',
      'Actionable Insights',
    ],
    idealFor: ['Distribution Centers', 'Warehouses', 'Manufacturing', 'Retail Fulfillment', 'Cold Chain', '3PL / Logistics'],
  },
  {
    key: 'yardvision-ai',
    icon: Camera,
    name: 'Prosper YardVision AI',
    tagline: 'Camera-Based Asset Tracking Using AI, OCR & Edge Intelligence',
    description:
      'Track trailers, containers, chassis, bobtails, and custom assets in real time across Gate → Yard → Dock → Departure workflows.',
    process: ['GateVision AI (Arrival)', 'YardVision AI', 'Dock DoorVision AI', 'GateVision AI (Departure)'],
    features: [
      'Automatic trailer & SCAC detection with damage/exception logging',
      'Real-time trailer location tracking fusing camera, RFID, and GPS',
      'Dock door activity and turnaround time monitoring',
      'Automated departure detection and exception logging',
      'YOLO-based object detection and OCR for text / license plates',
      'NVIDIA / TensorRT-accelerated edge compute',
      'Fast integration with YMS / WMS / TMS / ERP / SAP',
    ],
    highlights: [
      'Real-Time Yard Visibility',
      'Reduced Manual Spotter Truck Dependency',
      'Vision + RFID + GPS Fusion',
      'Fast Integration with YMS/WMS/TMS/ERP',
      'AI EdgeBox Powered',
    ],
  },
  {
    key: 'rfid-gps',
    icon: Satellite,
    name: 'RFID + GPS Inventory Tracking',
    tagline: 'Cost-optimized trailer and vessel inventory',
    description:
      'RFID and GPS-based real-time inventory tracking with REST API integration into your existing systems.',
    process: ['RFID Antenna', 'Fixed Reader / Edge Device', 'GPS + 4G LTE', 'REST API', 'YMS / WMS / TMS / ERP'],
    features: [
      'AI-based locationing service',
      'Processes tag reads, GPS position, speed, and time',
      'Calculates nearest available location',
      'Accurate real-time trailer positioning',
      'Integrates with YMS, WMS, TMS, ERP, web, and mobile',
    ],
    highlights: ['Auto Start', 'Self Monitoring', 'GPS + 4G Connectivity', 'Lightweight & Efficient', 'Plug & Play', 'Low Cost'],
  },
  {
    key: 'video-attendance',
    icon: UserCheck,
    name: 'Video-Based Attendance System',
    tagline: 'Powered by Prosper AI EdgeBox',
    description:
      'AI-powered attendance and productivity tracking with multi-camera intelligence — on-premise and privacy-first.',
    process: ['Entry Camera', 'Away Camera', 'Exit Camera', 'Dashboard & Reports'],
    features: [
      'AI face recognition for accurate attendance',
      'Multi-camera IN / OUT / AWAY tracking',
      'Real productivity time & insights',
      'On-premise processing for better privacy',
      'Real-time alerts, dashboard & reports',
      'Low-latency edge AI with Prosper AI EdgeBox',
    ],
    highlights: ['Track Attendance', 'Measure Productivity', 'Improve Performance'],
    idealFor: ['Corporate Offices', 'Manufacturing Plants', 'Warehouses', 'Educational Institutions', 'Healthcare Facilities'],
  },
]

export default function ProductsSoftware() {
  useDocumentTitle(
    'Software Products | Prosper Infotech',
    "Explore Prosper Infotech's software platforms — asset tracking, WMS, YardVision AI, RFID+GPS inventory tracking, and video-based attendance systems."
  )

  return (
    <>
      <Breadcrumb title="Software" parent="Products" />

      <section className="max-w-3xl mx-auto px-6 pt-16 pb-8 text-center">
        <Reveal className="flex flex-col items-center gap-4">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Our Software
          </span>
          <h2 className="text-3xl md:text-[38px] md:leading-[44px]">
            Proprietary software built for real-time operations
          </h2>
          <p className="text-ink-600 text-lg">
            From asset tracking and warehouse management to AI-powered yard vision, our software
            platforms give your team live visibility and control over every yard, warehouse, and
            fleet operation.
          </p>
        </Reveal>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex flex-col gap-8">
          {PRODUCTS.map((product, i) => {
            const Icon = product.icon
            return (
              <Reveal key={product.key} delay={i * 0.05}>
                <div
                  id={product.key}
                  className="scroll-mt-32 rounded-2xl border border-ink-300 bg-white shadow-md hover:shadow-[0_0_50px_-8px_rgba(247,221,0,0.35),0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-300 p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.15)]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-xl text-primary">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-ink-500">{product.tagline}</p>
                      <p className="mt-2 text-sm text-ink-600">{product.description}</p>
                      {product.badge && (
                        <span className="mt-3 inline-block rounded-full bg-gold/20 text-primary text-xs font-semibold px-3 py-1">
                          {product.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {product.process && (
                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      {product.process.map((step, idx) => (
                        <span key={step} className="flex items-center gap-2">
                          <span className="rounded-full bg-surface-alt px-3 py-1.5 text-xs font-semibold text-ink-700 whitespace-nowrap">
                            {step}
                          </span>
                          {idx < product.process.length - 1 && (
                            <ArrowRight className="h-3.5 w-3.5 text-ink-500 shrink-0" />
                          )}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-primary mb-3">
                        Key Capabilities
                      </h4>
                      <ul className="flex flex-col gap-2">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-ink-700">
                            <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-primary mb-3">
                          Highlights
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {product.highlights.map((highlight) => (
                            <span
                              key={highlight}
                              className="rounded-full border border-ink-300 px-3 py-1.5 text-xs font-medium text-ink-700"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>

                      {product.idealFor && (
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wide text-primary mb-3">
                            Ideal For
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {product.idealFor.map((use) => (
                              <span
                                key={use}
                                className="rounded-full bg-surface-alt px-3 py-1.5 text-xs font-medium text-ink-700"
                              >
                                {use}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <CTABand
        title="Ready to see our software in action?"
        description="Talk to our team about which platform fits your operation — we'll walk you through a live demo."
      />
    </>
  )
}
