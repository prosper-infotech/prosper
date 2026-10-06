import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import gateImg from '../../assets/vision/gate.webp'
import containerImg from '../../assets/vision/container.webp'
import dockImg from '../../assets/vision/dock.webp'
import forkliftImg from '../../assets/vision/forklift.webp'
import attendanceImg from '../../assets/vision/attendance.webp'

const SLIDE_SECONDS = 5

const CONTENT = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}
const ITEM = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const VISIONS = [
  {
    key: 'gate',
    title: ['Prosper ', 'GateVision', ' AI'],
    img: gateImg,
    alt: 'GateVision AI camera gantry reading a container truck at the gate',
    name: 'GateVision AI',
    tagline: 'Gate check-in with zero manual logging.',
    points: [
      'Reads container, plate and SCAC codes automatically',
      'Logs every arrival and departure in real time',
      'Flags damage and exceptions at the gate',
    ],
    to: '/solutions/gate-yard-dock-vision-ai',
  },
  {
    key: 'container',
    title: ['Prosper ', 'ContainerVision', ' AI'],
    img: containerImg,
    alt: 'ContainerVision AI reach stacker moving containers in a terminal yard',
    name: 'ContainerVision AI',
    tagline: 'AI cameras run gate, yard and crane moves.',
    points: [
      'Container and trailer OCR from gate to yard',
      'Vision-guided reach stacker automation',
      'Live status for every container, arrival to departure',
    ],
    to: '/products/software/containervision-ai',
  },
  {
    key: 'dock',
    title: ['Prosper ', 'DockVision', ' AI'],
    img: dockImg,
    alt: 'DockVision AI monitoring a trailer at a warehouse dock door',
    name: 'DockVision AI',
    tagline: 'Every dock door, watched and verified.',
    points: [
      'Door, trailer and restraint status in real time',
      'Turnaround time tracking for every dock',
      'Instant alerts by email, SMS and Teams',
    ],
    to: '/products/software/dockvision-ai',
  },
  {
    key: 'forklift',
    title: ['Prosper ', 'ForkliftVision', ' AI'],
    img: forkliftImg,
    alt: 'ForkliftVision AI cameras mounted on a forklift carrying a pallet',
    name: 'ForkliftVision AI',
    tagline: 'Forklift cameras confirm every pallet and spot.',
    points: [
      'Validates every pallet pickup and putaway',
      'Reads rack location down to aisle, bay and tier',
      'Syncs movements to your WMS or ERP live',
    ],
    to: '/solutions/ai-computer-vision',
  },
  {
    key: 'attendance',
    title: ['Prosper ', 'Video', ' Attendance'],
    img: attendanceImg,
    alt: 'Video attendance camera and face recognition turnstile at an entrance',
    name: 'Video Attendance',
    tagline: 'Face check-in. No buddy-punching.',
    points: [
      'AI face recognition for accurate attendance',
      'Multi-camera IN / OUT / AWAY tracking',
      'On-premise processing for privacy',
    ],
    to: '/products/software/video-attendance',
  },
]

export default function VisionHero() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const current = VISIONS[active]
  const next = () => setActive((i) => (i + 1) % VISIONS.length)
  const pad = (n) => String(n).padStart(2, '0')

  return (
    <section
      className="relative overflow-hidden pt-8 pb-14 md:pt-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <motion.div
        className="pointer-events-none absolute -top-32 right-[-120px] h-[520px] w-[520px] rounded-full bg-gold/25 blur-3xl"
        animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="pointer-events-none absolute bottom-[-160px] left-[-120px] h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-x-8 gap-y-8 lg:grid-cols-2">
          <motion.div
            className="lg:col-start-1 lg:row-start-1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[56px]">
              End-to-End
              <span className="block text-gold-dark">Logistics Visibility</span>
              with AI
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-600">
              Smarter operations for gates, yards, containers, docks and material movement — all on one intelligent platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href="https://calendly.com/prosperinfotech-sales/30min"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="!rounded-full !px-5 sm:!px-7 !py-3 !text-base hover:scale-105"
              >
                Get a Demo
              </Button>
              <Button to="/solutions" variant="outline-dark" className="!rounded-full !px-5 sm:!px-7 !py-3 !text-base hover:scale-105">
                Learn More
              </Button>
            </div>
          </motion.div>

          <div className="relative flex min-h-[260px] items-center justify-center sm:min-h-[340px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:min-h-[460px]">
            <motion.div
              className="pointer-events-none absolute bottom-4 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-[50%] bg-primary/20 blur-xl"
              animate={reduce ? undefined : { scaleX: [1, 0.85, 1], opacity: [0.9, 0.55, 0.9] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="relative w-full max-w-[620px]"
              animate={reduce ? undefined : { y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.key}
                  src={current.img}
                  alt={current.alt}
                  width={1100}
                  height={733}
                  initial={{ opacity: 0, x: 50, scale: 0.94, rotate: 1.5 }}
                  animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, x: -50, scale: 0.94, rotate: -1.5 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="mx-auto max-h-[460px] w-full object-contain"
                />
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Info card */}
          <div
            role="tabpanel"
            id="vh-panel"
            aria-labelledby={`vh-tab-${current.key}`}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-dark p-6 text-white shadow-2xl shadow-primary/30 md:p-8 lg:col-start-1 lg:row-start-2 lg:self-end"
          >
            <motion.span
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/25 blur-3xl"
              animate={reduce ? undefined : { scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '18px 18px' }}
            />
            <AnimatePresence mode="wait">
              <motion.div key={current.key} variants={CONTENT} initial="hidden" animate="show" exit="exit" className="relative">
                <motion.h2 variants={ITEM} className="text-2xl font-bold text-white md:text-[30px]">
                  {current.title[0]}
                  <span className="text-gold">{current.title[1]}</span>
                  {current.title[2]}
                </motion.h2>
                <motion.p variants={ITEM} className="mt-1.5 text-base text-white/70">
                  {current.tagline}
                </motion.p>
                <ul className="mt-5 space-y-3">
                  {current.points.map((p) => (
                    <motion.li key={p} variants={ITEM} className="flex items-start gap-3 text-[15px] text-white/90">
                      <span className="mt-[7px] h-2.5 w-2.5 shrink-0 rotate-45 rounded-[3px] bg-gold shadow-[0_0_10px_rgba(247,221,0,0.7)]" />
                      {p}
                    </motion.li>
                  ))}
                </ul>
                <motion.div variants={ITEM} className="mt-6">
                  <Link
                    to={current.to}
                    className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-sm font-bold text-primary shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-xl"
                  >
                    Explore {current.name}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Tab cards */}
        <div role="tablist" aria-label="Vision AI products" className="mt-8 flex flex-wrap justify-center gap-3 lg:gap-4">
          {VISIONS.map((v, i) => {
            const isActive = i === active
            return (
              <motion.button
                key={v.key}
                type="button"
                role="tab"
                id={`vh-tab-${v.key}`}
                aria-selected={isActive}
                aria-controls="vh-panel"
                onClick={() => setActive(i)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, scale: isActive ? 1.04 : 1 }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.35, delay: reduce ? 0 : 0.15 + i * 0.06 }}
                className={`relative basis-[calc(50%-6px)] overflow-hidden rounded-2xl border px-4 pb-5 pt-4 text-left transition-[border-color,box-shadow] duration-300 md:basis-[calc(33.333%-8px)] md:px-5 lg:basis-[calc(20%-13px)] ${
                  isActive
                    ? 'border-primary shadow-xl shadow-primary/30'
                    : 'border-primary/15 bg-white hover:border-gold-dark hover:shadow-lg'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="vh-active-tab"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-primary-dark"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative flex items-center gap-2.5">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold transition-colors duration-300 ${
                      isActive ? 'bg-gold text-primary' : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {pad(i + 1)}
                  </span>
                  <span className={`text-sm font-semibold leading-tight transition-colors duration-300 md:text-base ${isActive ? 'text-white' : 'text-primary'}`}>
                    {v.name}
                  </span>
                </span>
                {isActive && (
                  <span className="absolute inset-x-4 bottom-2 h-1 overflow-hidden rounded-full bg-white/15">
                    <span
                      key={`${v.key}-bar`}
                      className="vh-progress block h-full w-full rounded-full bg-gold"
                      style={{ animationDuration: `${SLIDE_SECONDS}s`, animationPlayState: paused ? 'paused' : 'running' }}
                      onAnimationEnd={next}
                    />
                  </span>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
