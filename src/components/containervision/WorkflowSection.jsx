import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BadgeCheck,
  Camera,
  CheckCircle2,
  Cpu,
  Crosshair,
  Layers,
  LockOpen,
  Radio,
  RefreshCw,
  ScanLine,
  Satellite,
  Truck,
} from 'lucide-react'
import Reveal from '../motion/Reveal'
import Eyebrow from './Eyebrow'

import card1 from '../../assets/containervision/card-1.webp'
import card2 from '../../assets/containervision/card-2.webp'
import card3 from '../../assets/containervision/card-3.webp'
import card4 from '../../assets/containervision/card-4.webp'
import panelReachStacker from '../../assets/containervision/panel-reach-stacker.webp'

const PHOTOS = { 'card-1': card1, 'card-2': card2, 'card-3': card3, 'card-4': card4, 'panel-reach-stacker': panelReachStacker }
const photo = (name) => PHOTOS[name]

const STAGES = [
  {
    title: 'GateVision AI',
    phase: 'Arrival',
    image: photo('card-1'),
    alt: 'Truck at a terminal gate with a camera scanning the container',
    caption: 'Container arrival logged',
    items: ['Detect container number automatically', 'Log arrivals in real time', 'Identify damage / exceptions'],
    stat: ['OCR capture', 'Automated'],
  },
  {
    title: 'ReachStackerVision AI',
    phase: 'Movement',
    image: photo('card-2'),
    alt: 'View from a reach stacker cab across a busy container yard as a container is lifted',
    caption: 'Task assigned · move in progress',
    items: ['Assign tasks automatically', 'Track pickup / drop activity', 'Capture container movement events'],
    stat: ['Task sync', 'Real-time'],
  },
  {
    title: 'YardVision AI & Inspection',
    phase: 'Inventory',
    image: photo('card-3'),
    alt: 'Yard operator checking a container and inspection details on a tablet',
    caption: 'Yard location updated',
    items: ['Track exact yard location & tier', 'Support customs / inspection workflows', 'Maintain live inventory visibility'],
    stat: ['RTK positioning', 'Precise'],
  },
  {
    title: 'GateVision AI',
    phase: 'Departure',
    image: photo('card-4'),
    alt: 'Truck with a container passing through the terminal exit gate',
    caption: 'Departure verified',
    items: ['Validate departures automatically', 'Log gate-out in real time', 'Confirm release status'],
    stat: ['TOS / ERP sync', 'Automated'],
  },
]

const PICKUP = [
  { icon: ScanLine, title: 'OCR Confirms', sub: 'Container ID' },
  { icon: Radio, title: 'Sensors Detect', sub: 'Container contact' },
  { icon: ArrowUp, title: 'Lift Action', sub: 'Verified' },
  { icon: BadgeCheck, title: 'AI Confirms', sub: 'Pickup event' },
]

const DROP = [
  { icon: Crosshair, title: 'RTK Confirms', sub: 'Target location' },
  { icon: Layers, title: 'Height / Tier', sub: 'Verified' },
  { icon: LockOpen, title: 'Release Action', sub: 'Detected' },
  { icon: RefreshCw, title: 'Inventory Updated', sub: 'Automatically' },
]

const HARDWARE_CHIPS = [
  { icon: Camera, label: 'OCR Camera', pos: 'left-3 top-3' },
  { icon: Satellite, label: 'GPS / RTK Antenna', pos: 'right-3 top-3' },
  { icon: Radio, label: 'Industrial Sensors', pos: 'left-3 bottom-3' },
  { icon: Cpu, label: 'Prosper AI EdgeBox', pos: 'right-3 bottom-3' },
]

const DATA_FLOW = ['Camera / Sensor Capture', 'AI EdgeBox (OCR + YOLO)', 'Task / Event Detection', 'TOS / ERP Sync', 'Dashboard & Alerts']

function PhotoSlot({ src, alt, icon: Icon = Truck, className = '', children }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-primary-dark via-navy to-navy ${className}`}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Icon className="h-10 w-10 text-gold/30" />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
      {children}
    </div>
  )
}

function ValidationRow({ icon: HeaderIcon, title, steps, accent }) {
  const isGold = accent === 'gold'
  const text = isGold ? 'text-gold' : 'text-sky-300'
  const ring = isGold ? 'border-gold/50 bg-gold/10 text-gold' : 'border-sky-300/50 bg-sky-300/10 text-sky-300'
  const solid = isGold ? 'border-gold bg-gold text-primary' : 'border-sky-300 bg-sky-300 text-primary'
  const badge = isGold ? 'bg-gold text-primary' : 'bg-sky-300 text-primary'
  const line = isGold ? 'bg-gold/30' : 'bg-sky-300/30'
  return (
    <div className="py-6 first:pt-0 last:pb-0">
      <div className="flex items-center justify-between gap-3">
        <h3 className={`flex items-center gap-2 text-sm font-heading font-bold uppercase tracking-wide ${text}`}>
          <HeaderIcon className="h-4 w-4" /> {title}
        </h3>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/40">4 steps</span>
      </div>
      <ol className="mt-5 flex flex-col sm:flex-row">
        {steps.map(({ icon: Icon, title: t, sub }, i) => {
          const last = i === steps.length - 1
          return (
            <li key={t} className="relative flex gap-4 pb-6 last:pb-0 sm:flex-1 sm:flex-col sm:items-center sm:gap-3 sm:pb-0 sm:text-center">
              {!last && (
                <span
                  aria-hidden="true"
                  className={`absolute left-6 top-[52px] bottom-1 w-px -translate-x-1/2 sm:bottom-auto sm:left-[calc(50%+2rem)] sm:right-[calc(-50%+2rem)] sm:top-6 sm:h-px sm:w-auto sm:translate-x-0 ${line}`}
                />
              )}
              <span className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${last ? solid : ring}`}>
                <Icon className="h-5 w-5" />
                <span className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ring-2 ring-navy ${badge}`}>{i + 1}</span>
              </span>
              <span className="min-w-0 self-center sm:self-auto">
                <span className="block text-sm font-semibold text-white">{t}</span>
                <span className="mt-0.5 block text-xs text-white/55">{sub}</span>
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default function WorkflowSection() {
  return (
    <section id="workflow" className="relative overflow-hidden bg-gradient-to-b from-navy to-primary-dark">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative max-w-6xl mx-auto px-6 py-16 sm:py-24">
        <Reveal>
          <Eyebrow dark>End-to-end orchestration</Eyebrow>
          <h2 className="mt-2 text-3xl sm:text-4xl text-white">Container visibility at every step</h2>
          <p className="mt-3 max-w-2xl text-white/70">
            Real-time container visibility across{' '}
            <span className="font-semibold text-white">Gate Arrival → Yard → Inspection → Departure</span> workflows.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((s, i) => (
            <Reveal key={s.phase} delay={0.05 * i}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
                <div className="flex items-center gap-3 px-5 pt-5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-primary">{i + 1}</span>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-heading font-semibold text-white">{s.title}</h3>
                    <p className="text-[11px] uppercase tracking-widest text-white/50">({s.phase})</p>
                  </div>
                </div>

                <PhotoSlot src={s.image} alt={s.alt} className="mx-5 mt-4 aspect-[4/3] rounded-xl">
                  <span className="absolute inset-x-2 bottom-2 rounded-md border border-white/15 bg-navy/80 px-2 py-1 text-center text-[10px] font-semibold uppercase tracking-widest text-gold backdrop-blur-sm">
                    {s.caption}
                  </span>
                </PhotoSlot>

                <ul className="mt-4 flex flex-1 flex-col gap-2 px-5">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-white/80">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex items-center justify-between border-t border-white/10 px-5 py-3 text-[10px] font-semibold uppercase tracking-widest">
                  <span className="text-white/50">{s.stat[0]}</span>
                  <span className="text-gold">{s.stat[1]}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">Validation logic</p>
                <h3 className="mt-1 text-2xl sm:text-3xl font-heading font-bold text-white">Reach Stacker AI Automation &amp; Validation</h3>
              </div>
              <span className="text-[11px] uppercase tracking-widest text-white/50">Multi-sensor verification</span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[0.9fr_1.4fr]">
              <div className="rounded-2xl border border-white/10 bg-navy/60 p-3">
                <PhotoSlot src={photo('panel-reach-stacker')} alt="Reach stacker lifting a container in a yard, fitted with OCR camera, GPS/RTK antenna, industrial sensors and the Prosper AI EdgeBox" className="aspect-[4/3] rounded-xl">
                  {HARDWARE_CHIPS.map(({ icon: Icon, label, pos }) => (
                    <span key={label} className={`absolute ${pos} inline-flex items-center gap-1.5 rounded-md border border-gold/50 bg-navy/85 px-2 py-1 text-[10px] font-semibold text-gold backdrop-blur-sm`}>
                      <Icon className="h-3 w-3" /> {label}
                    </span>
                  ))}
                </PhotoSlot>
                <div className="mt-3 flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] uppercase tracking-widest">
                  <span className="text-white/50">Local inference</span>
                  <span className="font-semibold text-white">On-cabin edge</span>
                </div>
              </div>

              <div className="flex flex-col justify-center divide-y divide-white/10">
                <ValidationRow icon={ArrowUp} title="Pickup validation" steps={PICKUP} accent="gold" />
                <ValidationRow icon={ArrowDown} title="Drop validation" steps={DROP} accent="sky" />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-white/50 mb-5">How the data moves</p>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
            {DATA_FLOW.map((step, i) => (
              <div key={step} className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
                <span className="rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-xs sm:text-sm font-semibold text-white">{step}</span>
                {i < DATA_FLOW.length - 1 && (
                  <ArrowRight className="h-4 w-4 shrink-0 rotate-90 text-gold animate-pulse sm:rotate-0" style={{ animationDelay: `${i * 0.15}s` }} />
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
