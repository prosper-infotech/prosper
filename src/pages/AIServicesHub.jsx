import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Breadcrumb from '../components/ui/Breadcrumb'
import CTABand from '../components/ui/CTABand'
import Reveal from '../components/motion/Reveal'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { AI_SERVICES } from '../data/aiServicesDetail'

const INDUSTRY_FOCUS = ['Logistics', 'Supply Chain', 'Warehousing', 'Transportation', 'CFS / Container Terminals', 'Manufacturing']

const ACCENT_BADGE = 'bg-gradient-to-br from-gold to-gold-dark'
const ACCENT_CONIC = 'bg-[conic-gradient(from_0deg,#f7dd00,#fff4a3,#f7dd00)]'

const NODES = [
  [8, 20], [22, 55], [15, 80], [35, 15], [40, 60], [55, 30], [62, 78],
  [78, 20], [85, 55], [92, 85], [50, 90], [70, 45], [28, 35], [95, 15],
]
const LINKS = [
  [0, 3], [3, 5], [5, 7], [7, 13], [5, 11], [1, 4], [4, 5],
  [2, 10], [10, 11], [11, 12], [12, 3], [8, 9], [6, 11], [9, 13],
]

function NeuralBackground() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20" preserveAspectRatio="none">
      {LINKS.map(([a, b], i) => (
        <line
          key={i}
          x1={`${NODES[a][0]}%`}
          y1={`${NODES[a][1]}%`}
          x2={`${NODES[b][0]}%`}
          y2={`${NODES[b][1]}%`}
          stroke="white"
          strokeWidth="1"
        />
      ))}
      {NODES.map(([x, y], i) => (
        <circle key={i} cx={`${x}%`} cy={`${y}%`} r="2.5" fill="#F7DD00">
          <animate
            attributeName="opacity"
            values="0.25;1;0.25"
            dur={`${3 + (i % 4)}s`}
            repeatCount="indefinite"
            begin={`${i * 0.2}s`}
          />
        </circle>
      ))}
    </svg>
  )
}

function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false)
  const Icon = service.icon

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl p-[1.5px] overflow-hidden transition-transform duration-300 hover:-translate-y-1.5"
    >
      <motion.div
        className={`absolute inset-[-60%] ${ACCENT_CONIC}`}
        animate={{ rotate: hovered ? 360 : 0 }}
        transition={{ duration: 3, repeat: hovered ? Infinity : 0, ease: 'linear' }}
      />
      <Link to={service.path} className="relative flex h-full flex-col gap-3 rounded-2xl bg-white p-6">
        <span className={`flex h-11 w-11 items-center justify-center rounded-full text-white ${ACCENT_BADGE}`}>
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="font-heading font-semibold text-lg text-primary">{service.label}</h3>
        <p className="text-sm text-ink-600 line-clamp-3">{service.intro}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Explore
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </Link>
    </div>
  )
}

export default function AIServicesHub() {
  useDocumentTitle(
    'AI Software Development | Prosper Infotech',
    'AI, Machine Learning, Computer Vision, OCR, Automation, Analytics, and Edge AI software development, purpose-built for logistics and supply-chain operations.'
  )

  return (
    <>
      <Breadcrumb title="AI Software Development" parent="Services" parentPath="/services" />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-navy to-[#081a3d]">
        <div className="pointer-events-none absolute -top-16 -right-10 h-72 w-72 rounded-full bg-gold/25 blur-[110px]" />
        <div className="pointer-events-none absolute top-1/2 left-1/3 h-64 w-64 -translate-y-1/2 rounded-full bg-gold-dark/15 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-16 -left-10 h-64 w-64 rounded-full bg-[#3a5a99]/40 blur-[110px]" />
        <NeuralBackground />
        <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
          <Reveal className="flex flex-col items-center gap-5">
            <p className="text-white/80 text-lg">
              Positioning Prosper Infotech as an AI, ML, Computer Vision, OCR, Automation,
              Analytics, Edge AI, and Logistics Technology Engineering Company — purpose-built
              for logistics and supply-chain operations.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {INDUSTRY_FOCUS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {AI_SERVICES.map((service, i) => (
            <Reveal key={service.path} delay={(i % 3) * 0.08}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand
        title="Ready to build your AI-powered logistics platform?"
        description="Talk to our team about the right AI, ML, or Edge AI approach for your operation."
      />
    </>
  )
}
