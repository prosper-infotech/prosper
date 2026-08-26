import { motion } from 'framer-motion'
import {
  BrainCircuit,
  Cpu,
  ScanText,
  Code2,
  Sparkles,
  Database,
  LineChart,
  Radio,
  Wifi,
  Gauge,
  FileText,
  ScanLine,
  CheckCircle,
  Terminal,
  GitBranch,
  Layers,
} from 'lucide-react'

const VARIANTS = {
  hero: {
    icon: BrainCircuit,
    bg: 'from-primary-dark via-navy to-primary-dark',
    coreBg: 'bg-gradient-to-br from-gold to-gold-dark',
    coreText: 'text-primary',
    satellites: [Cpu, ScanText, Code2],
  },
  ai: {
    icon: BrainCircuit,
    bg: 'from-navy to-primary-dark',
    coreBg: 'bg-gradient-to-br from-gold to-gold-dark',
    coreText: 'text-primary',
    satellites: [Sparkles, Database, LineChart],
  },
  iot: {
    icon: Cpu,
    bg: 'from-primary-dark to-navy',
    coreBg: 'bg-white',
    coreText: 'text-navy',
    satellites: [Radio, Wifi, Gauge],
  },
  ocr: {
    icon: ScanText,
    bg: 'from-navy to-primary-dark',
    coreBg: 'bg-gradient-to-br from-accent-green to-accent-green',
    coreText: 'text-white',
    satellites: [FileText, ScanLine, CheckCircle],
  },
  dev: {
    icon: Code2,
    bg: 'from-primary-dark to-navy',
    coreBg: 'bg-gradient-to-br from-gold to-gold-dark',
    coreText: 'text-primary',
    satellites: [Terminal, GitBranch, Layers],
  },
}

const SATELLITE_POS = [
  { top: '12%', left: '14%' },
  { top: '18%', right: '10%' },
  { bottom: '14%', left: '50%', translate: '-translate-x-1/2' },
]

export default function TechIllustration({ variant = 'ai', className = '' }) {
  const config = VARIANTS[variant] ?? VARIANTS.ai
  const CoreIcon = config.icon

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${config.bg} ${className}`}
    >
      <svg className="absolute inset-0 h-full w-full opacity-[0.15]" aria-hidden="true">
        <defs>
          <pattern id={`grid-${variant}`} width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${variant})`} />
      </svg>

      <motion.div
        className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl"
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />

      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <line x1="50%" y1="50%" x2="14%" y2="12%" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" />
        <line x1="50%" y1="50%" x2="90%" y2="18%" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" />
        <line x1="50%" y1="50%" x2="50%" y2="86%" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" />
      </svg>

      {config.satellites.map((Icon, i) => {
        const pos = SATELLITE_POS[i]
        return (
          <motion.div
            key={i}
            className={`absolute flex h-11 w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white ${pos.translate ?? ''}`}
            style={pos}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          >
            <Icon className="h-5 w-5" />
          </motion.div>
        )
      })}

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className={`flex h-24 w-24 items-center justify-center rounded-full ${config.coreBg} ${config.coreText} shadow-[0_0_50px_-5px_rgba(247,221,0,0.5)]`}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <CoreIcon className="h-11 w-11" />
        </motion.div>
      </div>
    </div>
  )
}
