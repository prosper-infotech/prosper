import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
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
    tab: 'GateVision AI',
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
    tab: 'ContainerVision AI',
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
    tab: 'ForkliftVision AI',
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
    tab: 'DockVision AI',
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
    tab: 'Asset Tracking',
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
    tab: 'Attendance & Visitors',
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
    <section className="relative overflow-hidden pt-5 pb-6 lg:pt-6">
      <motion.div
        className="pointer-events-none absolute -top-32 right-[-120px] h-[520px] w-[520px] rounded-full bg-gold/25 blur-3xl"
        animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="pointer-events-none absolute bottom-[-160px] left-[-120px] h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-x-8 gap-y-5 lg:grid-cols-2">
          <motion.div
            className="lg:col-start-1 lg:row-start-1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[clamp(32px,5.6svh,46px)]">
              End-to-End
              <span className="block text-gold-dark">Logistics Visibility</span>
              with AI
            </h1>
            <p className="mt-3 max-w-md text-base leading-relaxed text-ink-600 lg:mt-4 [@media(min-width:1024px)_and_(max-height:700px)]:hidden">
              Smarter operations for gates, yards, containers, docks and material movement — all on one intelligent platform.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button
                href="https://calendly.com/prosperinfotech-sales/30min"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="!rounded-full !px-5 sm:!px-6 !py-2.5 !text-sm hover:scale-105"
              >
                Get a Demo
              </Button>
              <Button to="/solutions" variant="outline-dark" className="!rounded-full !px-5 sm:!px-6 !py-2.5 !text-sm hover:scale-105">
                Learn More
              </Button>
            </div>
          </motion.div>

          <div className="relative flex items-center lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${current.key}-${nonce}`}
                className="mx-auto w-full mix-blend-multiply lg:max-w-[min(100%,calc(100svh-215px))]"
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
            className="relative overflow-hidden rounded-3xl border border-white/70 bg-[#cfe2ff]/45 p-5 shadow-xl shadow-primary/10 ring-1 ring-primary/10 backdrop-blur-md lg:col-start-1 lg:row-start-2 lg:self-end"
          >
            <motion.span
              className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gold/30 blur-3xl"
              animate={reduce ? undefined : { scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <AnimatePresence mode="wait">
              <motion.div key={`${current.key}-${nonce}`} variants={CONTENT} initial="hidden" animate="show" exit="exit" className="relative">
                <motion.h2 variants={ITEM} className="text-2xl font-extrabold leading-tight text-primary md:text-[28px]">
                  {current.title[0]}
                  <span className="bg-[linear-gradient(transparent_62%,#f7dd00_62%)]">{current.title[1]}</span>
                  {current.title[2]}
                </motion.h2>
                <motion.p variants={ITEM} className="mt-1 text-sm text-ink-600 md:text-base">
                  {current.tagline}
                </motion.p>
                <ul className="mt-3 space-y-1.5">
                  {current.points.map((p, pi) => (
                    <motion.li
                      key={p}
                      variants={ITEM}
                      className={`flex items-start gap-3 text-sm text-primary/90 md:text-[15px] ${pi === 2 ? '[@media(min-width:1024px)_and_(max-height:700px)]:hidden' : ''}`}
                    >
                      <span className="mt-[7px] h-2.5 w-2.5 shrink-0 rotate-45 rounded-[3px] bg-gold shadow-[0_0_0_1.5px_rgba(20,52,109,0.35)]" />
                      {p}
                    </motion.li>
                  ))}
                </ul>
                <motion.div variants={ITEM} className="mt-4">
                  <Link
                    to={current.to}
                    className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-xl"
                  >
                    Explore {current.title[1]}
                    <ArrowRight className="h-4 w-4 text-gold transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Tab cards */}
        <div role="tablist" aria-label="Vision AI products" className="mt-5 flex flex-wrap justify-center gap-3 lg:gap-4">
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
                className={`relative basis-[calc(50%-6px)] overflow-hidden rounded-2xl border px-3.5 pb-4 pt-3 text-left transition-[border-color,box-shadow] duration-300 md:basis-[calc(33.333%-8px)] lg:basis-[calc(33.333%-11px)] xl:basis-[calc(16.666%-14px)] ${
                  isActive
                    ? 'border-primary shadow-xl shadow-primary/30'
                    : 'border-white/70 bg-[#cfe2ff]/45 backdrop-blur-sm hover:border-gold-dark hover:bg-white/70 hover:shadow-lg'
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
                  <span className={`text-[13px] font-semibold leading-tight transition-colors duration-300 xl:text-sm ${isActive ? 'text-white' : 'text-primary'}`}>
                    {v.tab}
                  </span>
                </span>
                {isActive && (
                  <span className="absolute inset-x-3.5 bottom-1.5 h-1 overflow-hidden rounded-full bg-white/15">
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
