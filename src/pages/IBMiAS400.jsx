import {
  Terminal,
  Settings2,
  Workflow,
  Cloud,
  Headset,
  Check,
  CheckCircle2,
  ShieldCheck,
  Factory,
  ShoppingCart,
  Landmark,
  Truck,
  HeartPulse,
  Building2,
} from 'lucide-react'
import Breadcrumb from '../components/ui/Breadcrumb'
import SectionHeading from '../components/ui/SectionHeading'
import CTABand from '../components/ui/CTABand'
import Reveal from '../components/motion/Reveal'
import useDocumentTitle from '../hooks/useDocumentTitle'

const SERVICE_CATEGORIES = [
  {
    icon: Terminal,
    title: 'AS400 Development & Application Support',
    description:
      'Maintain, enhance, and develop enterprise applications using industry-standard IBM i technologies.',
    groups: [
      {
        label: 'Technologies We Support',
        items: ['RPG / RPGLE', 'COBOL', 'CL Programming', 'DB2 Database', 'SQL on IBM i'],
      },
      {
        label: 'Services Include',
        items: [
          'Custom application development',
          'Legacy application enhancement',
          'Bug fixing & troubleshooting',
          'Performance optimization',
          'Ongoing application maintenance',
        ],
      },
    ],
  },
  {
    icon: Settings2,
    title: 'System Administration & Maintenance',
    description: 'Keep your IBM i environment secure, optimized, and running efficiently.',
    groups: [
      {
        label: 'Services Include',
        items: [
          'System health monitoring',
          'Backup & disaster recovery',
          'Performance tuning',
          'PTF installation & management',
          'User & security administration',
          'Job scheduling',
          'Storage management',
        ],
      },
    ],
  },
  {
    icon: Workflow,
    title: 'AS400 Integration & Modernization',
    description: 'Modernize your legacy applications without replacing your existing infrastructure.',
    groups: [
      {
        label: 'Integration Capabilities',
        items: [
          'REST APIs',
          'Web Services',
          'Mobile Applications',
          'Microsoft 365 Integration',
          'AWS Cloud Integration',
          'SAP Integration',
          'Third-party Enterprise Applications',
        ],
      },
      {
        label: 'Modernization Services',
        items: [
          'Green-screen modernization',
          'Web-based UI development',
          'API enablement',
          'Digital transformation consulting',
        ],
      },
    ],
  },
  {
    icon: Cloud,
    title: 'AS400 Migration Services',
    description: 'Plan and execute seamless migrations with minimal business disruption.',
    groups: [
      {
        label: 'Migration Options',
        items: [
          'IBM Power Systems upgrades',
          'IBM Cloud migration',
          'AWS migration',
          'Azure integration',
          'ERP migration support',
          'Database migration',
          'Legacy application transition',
        ],
      },
    ],
  },
  {
    icon: Headset,
    title: '24×7 Monitoring & Remote Support',
    description: 'Ensure maximum uptime with proactive monitoring and expert technical assistance.',
    groups: [
      {
        label: 'Support Includes',
        items: [
          '24/7 system monitoring',
          'Remote troubleshooting',
          'Incident management',
          'Emergency support',
          'Performance diagnostics',
          'Preventive maintenance',
          'SLA-based support',
        ],
      },
    ],
  },
]

const KEY_BENEFITS = [
  'Lower operational costs',
  'Extend the lifespan of legacy systems',
  'Improve application performance',
  'Increase business agility',
  'Seamless integration with modern technologies',
  'Enterprise-grade security',
  'Minimize downtime',
  'Reduce business risk',
  'Improve scalability',
  'Future-proof your IT infrastructure',
]

const INDUSTRIES = [
  {
    icon: Factory,
    title: 'Manufacturing',
    description: 'Support production planning, inventory management, and ERP systems.',
  },
  {
    icon: ShoppingCart,
    title: 'Retail & eCommerce',
    description: 'Manage inventory, sales, billing, and supply chain operations efficiently.',
  },
  {
    icon: Landmark,
    title: 'Finance & Insurance',
    description: 'Secure processing for banking, accounting, claims, and financial applications.',
  },
  {
    icon: Truck,
    title: 'Logistics & Distribution',
    description: 'Optimize warehouse management, transportation, inventory, and distribution workflows.',
  },
  {
    icon: HeartPulse,
    title: 'Healthcare',
    description: 'Ensure secure management of patient records, billing, and healthcare operations.',
  },
  {
    icon: Building2,
    title: 'Government & Public Sector',
    description:
      'Reliable solutions for public administration, citizen services, and mission-critical government systems.',
  },
]

const WHY_CHOOSE_US = [
  'Experienced IBM i (AS400) professionals',
  'End-to-end development and support',
  'Legacy modernization expertise',
  'Secure enterprise integration',
  '24/7 technical assistance',
  'Scalable and cost-effective solutions',
  'Proven experience across multiple industries',
  'Commitment to performance, reliability, and business continuity',
]

export default function IBMiAS400() {
  useDocumentTitle(
    'AS400 / IBM i Services | Prosper Infotech',
    'End-to-end IBM i (AS400) consulting, development, modernization, migration, and 24/7 support — RPG/RPGLE, COBOL, system administration, and cloud integration.'
  )

  return (
    <>
      <Breadcrumb title="IBM i / AS400" />

      <section className="max-w-4xl mx-auto px-6 pt-16 pb-8 text-center">
        <Reveal className="flex flex-col items-center gap-4">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            AS400 / IBM iSeries Solutions
          </span>
          <h2 className="text-3xl md:text-[38px] md:leading-[44px]">
            Enterprise IBM i (AS400) Services for Modern Businesses
          </h2>
          <p className="text-ink-600 text-lg">
            The IBM AS400, now known as IBM i, is one of the world's most reliable enterprise
            computing platforms, trusted for mission-critical applications across industries.
            From ERP systems and financial applications to manufacturing and logistics
            operations, IBM i continues to deliver unmatched security, stability, and
            performance.
          </p>
          <p className="text-ink-600">
            At Prosper Infotech, we provide end-to-end IBM i (AS400) consulting, development,
            modernization, integration, and support services that help organizations maximize
            the value of their legacy systems while seamlessly connecting them with modern
            technologies.
          </p>
        </Reveal>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <SectionHeading eyebrow="Services" title="Our AS400 Services" />
        <div className="mt-12 flex flex-col gap-6">
          {SERVICE_CATEGORIES.map((category, i) => {
            const Icon = category.icon
            return (
              <Reveal key={category.title} delay={i * 0.05}>
                <div className="rounded-2xl border border-ink-300 bg-white shadow-md hover:shadow-[0_0_50px_-8px_rgba(247,221,0,0.35),0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-300 p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.15)]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-primary">
                        {category.title}
                      </h3>
                      <p className="mt-1 text-sm text-ink-600">{category.description}</p>
                    </div>
                  </div>

                  <div
                    className={`mt-6 grid gap-6 ${
                      category.groups.length > 1 ? 'sm:grid-cols-2' : ''
                    }`}
                  >
                    {category.groups.map((group) => (
                      <div key={group.label}>
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-primary mb-3">
                          {group.label}
                        </h4>
                        <ul className="flex flex-col gap-2">
                          {group.items.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-ink-700">
                              <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="relative bg-gradient-to-br from-primary-dark via-navy to-[#081a3d] overflow-hidden">
        <div className="pointer-events-none absolute -top-16 -right-10 h-72 w-72 rounded-full bg-gold/25 blur-[110px]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-dark/15 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-16 -left-10 h-64 w-64 rounded-full bg-[#3a5a99]/40 blur-[110px]" />
        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <SectionHeading eyebrow="Why it matters" title="Key benefits" variant="dark" className="mb-12" />
          <div className="grid gap-4 sm:grid-cols-2">
            {KEY_BENEFITS.map((benefit) => (
              <div
                key={benefit}
                className="flex items-start gap-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] px-5 py-4"
              >
                <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <span className="text-white/90 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <SectionHeading eyebrow="Who we help" title="Industries we serve" />
        <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry, i) => {
            const Icon = industry.icon
            return (
              <Reveal key={industry.title} delay={(i % 3) * 0.08}>
                <div className="rounded-lg border border-ink-300 bg-white p-7 shadow-md hover:shadow-[0_0_50px_-8px_rgba(247,221,0,0.35),0_25px_50px_-12px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-heading font-semibold text-lg text-primary">
                    {industry.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-600">{industry.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="bg-surface-alt">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <SectionHeading eyebrow="Why Prosper Infotech" title="Why choose us" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {WHY_CHOOSE_US.map((reason) => (
              <div
                key={reason}
                className="flex items-start gap-3 rounded-lg bg-white border border-ink-300 px-5 py-4 shadow-sm"
              >
                <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-ink-900 text-sm font-medium">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to Modernize Your IBM i Environment?"
        description="Whether you need AS400 development, modernization, migration, integration, or managed support, Prosper Infotech delivers secure, scalable, and future-ready IBM i solutions tailored to your business needs."
      />
    </>
  )
}
