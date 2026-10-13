import { Puzzle, ScanSearch, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import heroBg from '../../assets/containervision/hero-bg.webp'
import heroBgMobile from '../../assets/containervision/hero-bg-mobile.webp'

const STATS = [
  { icon: ScanSearch, label: 'Real-Time Container Visibility' },
  { icon: ShieldCheck, label: 'Pickup / Drop Validation' },
  { icon: Puzzle, label: 'Fast ERP Integration' },
]

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#fcf5ee] lg:bg-[#fffdf6] lg:aspect-[1666/829] lg:max-h-[829px]">
      {/* Desktop-only: height tracks width via aspect-ratio (matching the image's native 1666x829
          ratio), so below that width it fills exactly, edge to edge, with zero gap or crop.
          max-height caps it at the image's native 829px once there's more than enough width — from
          that point on, extra width just shows background color on the sides instead of the section
          growing taller than the source photo. (A percentage-padding spacer was tried first, but
          max-height doesn't reliably clamp padding-derived height — aspect-ratio's height is a real
          box-model height, so max-height clamps it correctly.) */}
      <picture>
        <source media="(min-width: 1024px)" srcSet={heroBg} width="1666" height="829" />
        <img
          src={heroBgMobile}
          alt="Reach stacker fitted with the Prosper AI EdgeBox, OCR camera, GPS/RTK antenna and industrial sensors, lifting a shipping container at a container yard"
          width="941"
          height="1672"
          className="absolute bottom-0 left-0 h-auto w-full lg:inset-0 lg:h-full lg:object-contain lg:object-center"
          loading="eager"
          fetchPriority="high"
        />
      </picture>

      <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-[calc(96vw+2.5rem)] lg:py-0 lg:absolute lg:inset-0 flex items-center">
        <div className="flex w-full flex-col items-start lg:block lg:items-stretch">
        <div className="max-w-xl text-left">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full bg-gold/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary"
          >
            AI-Powered CFS Automation
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-4xl sm:text-5xl lg:text-[3.25rem] font-heading font-bold tracking-tight leading-[1.08]"
          >
            Prosper <span className="block text-gold-dark">ContainerVision AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-4 font-heading font-semibold text-lg sm:text-xl text-ink-900"
          >
            Real-Time Container Visibility, Gate to Departure
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-4 text-ink-600 text-base sm:text-lg max-w-xl"
          >
            AI cameras, OCR, GPS/RTK and industrial sensors automate container gate, yard, reach stacker, inspection and
            departure workflows — powered by the Prosper AI EdgeBox.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 hidden sm:grid grid-cols-3 gap-3 lg:w-[660px] xl:w-[700px]"
          >
            {STATS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 rounded-2xl bg-white/90 backdrop-blur-sm px-3 py-2.5 shadow-md ring-1 ring-primary/5 text-left"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-[13px] font-bold leading-snug text-ink-900">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  )
}
