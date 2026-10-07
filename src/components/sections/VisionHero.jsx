import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Boxes, DoorOpen, Forklift, ScanFace, ScanLine, Tag } from 'lucide-react'
import Button from '../ui/Button'
import gateFirst from '../../assets/vision/gate-first.webp'
import containerFirst from '../../assets/vision/container-first.webp'
import dockFirst from '../../assets/vision/dock-first.webp'
import forkliftFirst from '../../assets/vision/forklift-first.webp'
import assetFirst from '../../assets/vision/asset-first.webp'
import attendanceFirst from '../../assets/vision/attendance-first.webp'

// A product with a `video` plays it in place of its still image (files live in public/videos/vision).
// Slides advance when the video ends; SLIDE_SECONDS is only the fallback when a video can't play.
const SLIDE_SECONDS = 6

// Edge fades so the media melts into the page instead of reading as a card.
const FADE_RADIAL = '[mask-image:radial-gradient(ellipse_at_center,black_62%,transparent_98%)]'
const FADE_EDGES =
  '[mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent),linear-gradient(to_bottom,transparent,black_4%,black_96%,transparent)] [mask-composite:intersect] [-webkit-mask-composite:source-in]'

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
    icon: ScanLine,
    title: ['Prosper ', 'GateVision', ' AI'],
    img: gateFirst,
    ratio: 'square',
    video: '/videos/vision/gate.mp4',
    seconds: 6, // one full play of the clip
    alt: 'Automatic truck check-in: cameras scan the truck, AI reads the numbers, details are saved to ERP and the gate opens',
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
    icon: Boxes,
    title: ['Prosper ', 'ContainerVision', ' AI'],
    img: containerFirst,
    ratio: 'square',
    video: '/videos/vision/container.mp4',
    seconds: 6, // one full play of the clip
    alt: 'Truck to yard, tracked automatically: a task is assigned, the camera reads the container ID, the reach stacker lifts and places it on the right tier, and the location is saved to ERP',
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
    key: 'forklift',
    icon: Forklift,
    title: ['Prosper ', 'ForkliftVision', ' AI'],
    img: forkliftFirst,
    ratio: 'square',
    video: '/videos/vision/forklift.mp4',
    seconds: 6, // one full play of the clip
    alt: 'Putaway, verified at every step: a task is sent to the forklift, the camera reads the pallet ID, the pallet is lifted and the rack position verified, and the putaway is saved to the WMS',
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
    key: 'dock',
    icon: DoorOpen,
    title: ['Prosper ', 'DockVision', ' AI'],
    img: dockFirst,
    ratio: 'square',
    video: '/videos/vision/dock.mp4',
    seconds: 6, // one full play of the clip
    alt: 'Dock door status, live: sensors read the door, status goes to the site edge box and the cloud, and the dashboard and alerts update',
    name: 'DockVision AI',
    tagline: 'Every dock door, watched and verified.',
    points: [
      'Door, trailer and restraint status in real time',
      'Edge buffering with alarm and fault rules',
      'Instant alerts by email, SMS and Teams',
    ],
    to: '/products/software/dockvision-ai',
  },
  {
    key: 'asset',
    icon: Tag,
    title: ['Prosper ', 'Asset Tracking', ''],
    img: assetFirst,
    ratio: 'square',
    video: '/videos/vision/asset.mp4',
    seconds: 6, // one full play of the clip
    alt: 'Every asset, always located: any asset gets an RFID tag, readers scan every tag, check-in and check-out are logged, and all assets appear on one dashboard',
    name: 'Asset Tracking',
    tagline: 'One live map of every tagged asset.',
    points: [
      'Tracks any asset with an RFID tag',
      'Automatic check-in and check-out',
      'One live dashboard with alerts across all sites',
    ],
    to: '/products/software/asset-tracking',
  },
  {
    key: 'attendance',
    icon: ScanFace,
    title: ['', 'Video Attendance', ' / Visitor Management'],
    img: attendanceFirst,
    ratio: 'square',
    video: '/videos/vision/attendance.mp4',
    seconds: 6, // one full play of the clip
    alt: 'Attendance, logged hands-free: a person arrives, face or QR is checked, IN is logged and a visitor badge issued, exit is tracked and the dashboard updates',
    name: 'Video Attendance / Visitor Management',
    tagline: 'Face check-in. No buddy-punching.',
    points: [
      'Face or QR check-in for staff and visitors',
      'Visitor badge issued and host notified',
      'On-premise processing, images stay on-site',
    ],
    to: '/products/software/video-attendance',
  },
]

function VisionMedia({ vision, reduce, onPlaying, onWaiting, onEnded, onMode }) {
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [started, setStarted] = useState(false)
  const saveData = typeof navigator !== 'undefined' && navigator.connection?.saveData
  const showVideo = Boolean(vision.video) && !reduce && !failed && !saveData
  const square = vision.ratio === 'square'

  // Tell the parent whether a video will drive the slide timing (otherwise it falls back to a timer).
  useEffect(() => {
    onMode(showVideo)
  }, [showVideo]) // eslint-disable-line react-hooks/exhaustive-deps

  // If autoplay never starts (blocked or stalled), give up so the slide still advances.
  useEffect(() => {
    if (!showVideo || started) return
    const t = setTimeout(() => setFailed(true), 6000)
    return () => clearTimeout(t)
  }, [showVideo, started])

  return (
    <div className={`relative w-full ${square ? `aspect-square ${FADE_EDGES}` : `aspect-video ${FADE_RADIAL}`}`}>
      <img
        src={vision.img}
        alt={vision.alt}
        width={square ? 1080 : 1280}
        height={square ? 1080 : 720}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {showVideo && (
        <video
          src={vision.video}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${ready ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onCanPlay={() => setReady(true)}
          onPlaying={() => {
            setStarted(true)
            onPlaying()
          }}
          onWaiting={onWaiting}
          onEnded={onEnded}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}

export default function VisionHero() {
  const [active, setActive] = useState(0)
  const [nonce, setNonce] = useState(0) // bumps on every change or click so the clip restarts from the beginning
  const [playing, setPlaying] = useState(false)
  const [videoMode, setVideoMode] = useState(true)
  const reduce = useReducedMotion()
  const current = VISIONS[active]
  const Icon = current.icon
  const pad = (n) => String(n).padStart(2, '0')

  const go = (i) => {
    setActive(i)
    setNonce((n) => n + 1)
    setPlaying(false)
  }
  const next = () => go((active + 1) % VISIONS.length)

  // Fallback only: when no video can play, advance on a timer. Never advances for reduced-motion visitors.
  useEffect(() => {
    if (videoMode || reduce) return
    const t = setTimeout(next, (current.seconds ?? SLIDE_SECONDS) * 1000)
    return () => clearTimeout(t)
  }, [videoMode, reduce, active, nonce]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="relative overflow-hidden pt-8 pb-14 md:pt-12">
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

          <div className="relative flex items-center lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${current.key}-${nonce}`}
                className="w-full mix-blend-multiply"
                initial={{ opacity: 0, x: 50, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.96 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <VisionMedia
                  vision={current}
                  reduce={reduce}
                  onPlaying={() => setPlaying(true)}
                  onWaiting={() => setPlaying(false)}
                  onEnded={next}
                  onMode={setVideoMode}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Info card */}
          <div
            role="tabpanel"
            id="vh-panel"
            aria-labelledby={`vh-tab-${current.key}`}
            className="relative overflow-hidden rounded-[28px] p-[2px] shadow-2xl shadow-primary/30 lg:col-start-1 lg:row-start-2 lg:self-end"
          >
            {/* slowly circling gold glint along the card edge */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[240%] w-[240%] -translate-x-1/2 -translate-y-1/2 animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_240deg,rgba(247,221,0,0.95)_320deg,transparent_360deg)] motion-reduce:animate-none"
            />
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-dark p-6 text-white md:p-8">
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
                <motion.div key={`${current.key}-${nonce}`} variants={CONTENT} initial="hidden" animate="show" exit="exit" className="relative">
                  <motion.div variants={ITEM} className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold text-primary shadow-lg shadow-black/25">
                      <Icon className="h-6 w-6" strokeWidth={2.2} />
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/90">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75 motion-reduce:animate-none" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
                      </span>
                      See how it works
                    </span>
                  </motion.div>
                  <motion.h2 variants={ITEM} className="mt-4 text-2xl font-bold text-white md:text-[34px] md:leading-tight">
                    {current.title[0]}
                    <span className="text-gold">{current.title[1]}</span>
                    {current.title[2]}
                  </motion.h2>
                  <motion.p variants={ITEM} className="mt-1.5 text-base text-white/70 md:text-lg">
                    {current.tagline}
                  </motion.p>
                  <ul className="mt-5 space-y-3">
                    {current.points.map((p) => (
                      <motion.li key={p} variants={ITEM} className="flex items-start gap-3 text-[15px] text-white/90 md:text-base">
                        <span className="mt-[8px] h-2.5 w-2.5 shrink-0 rotate-45 rounded-[3px] bg-gold shadow-[0_0_10px_rgba(247,221,0,0.7)]" />
                        {p}
                      </motion.li>
                    ))}
                  </ul>
                  <motion.div variants={ITEM} className="mt-6">
                    <Link
                      to={current.to}
                      className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-primary shadow-lg shadow-black/25 transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-xl"
                    >
                      Explore {current.title[1]}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
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
                onClick={() => go(i)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, scale: isActive ? 1.04 : 1 }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.35, delay: reduce ? 0 : 0.15 + i * 0.06 }}
                className={`relative basis-[calc(50%-6px)] overflow-hidden rounded-2xl border px-4 pb-5 pt-4 text-left transition-[border-color,box-shadow] duration-300 md:basis-[calc(33.333%-8px)] md:px-5 lg:basis-[calc(33.333%-11px)] xl:basis-[calc(16.666%-14px)] ${
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
                    {/* Fills in step with the video; stays empty until it actually plays. */}
                    <span
                      key={`${v.key}-${nonce}`}
                      className="vh-progress block h-full w-full rounded-full bg-gold"
                      style={{
                        animationDuration: `${v.seconds ?? SLIDE_SECONDS}s`,
                        animationPlayState: !videoMode || playing ? 'running' : 'paused',
                      }}
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
