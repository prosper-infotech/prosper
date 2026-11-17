import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { CategoryIcon } from './ui'

const THEMES = {
  navy: { wrap: 'bg-gradient-to-br from-primary-dark via-primary to-[#1c4a99] text-white', eyebrow: 'text-gold', title: '!text-white', text: 'text-white/85', cta: 'bg-gold text-primary hover:bg-gold-dark' },
  gold: { wrap: 'bg-gradient-to-br from-[#fff3c4] via-[#ffe58a] to-gold text-primary', eyebrow: 'text-primary/80', title: '', text: 'text-ink-900', cta: 'bg-primary text-white hover:bg-primary-dark' },
  light: { wrap: 'bg-gradient-to-br from-white via-[#eef3fb] to-[#dbe6f7] text-primary', eyebrow: 'text-gold-dark', title: '', text: 'text-ink-600', cta: 'bg-primary text-white hover:bg-primary-dark' },
}

// Rotating banners. Each slide: { theme, eyebrow, title, text, cta, to | onClick, images[], icon }.
export default function HeroCarousel({ slides }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = slides.length
  const go = (n) => setIndex((n + count) % count)

  useEffect(() => {
    if (paused || count < 2) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const timer = setTimeout(() => setIndex((i) => (i + 1) % count), 6000)
    return () => clearTimeout(timer)
  }, [index, paused, count])

  const slide = slides[index % count]
  const t = THEMES[slide.theme] || THEMES.navy
  const cta = `inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold shadow-md transition-all hover:-translate-y-0.5 ${t.cta}`
  const arrow = 'absolute top-1/2 z-10 hidden h-20 w-10 -translate-y-1/2 items-center justify-center bg-white/90 text-primary shadow-md transition-colors hover:bg-white sm:flex'

  return (
    <section
      className="relative overflow-hidden rounded-2xl shadow-[0_1px_3px_rgba(20,52,109,0.08)]"
      aria-roledescription="carousel"
      aria-label="Shop highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`relative grid min-h-[300px] items-center gap-6 px-6 py-9 sm:px-14 md:min-h-[360px] md:grid-cols-[1.15fr_1fr] ${t.wrap}`}
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${count}`}
        >
          <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
          <div className="relative">
            <p className={`text-xs font-extrabold uppercase tracking-[0.2em] ${t.eyebrow}`}>{slide.eyebrow}</p>
            <h2 className={`mt-3 text-3xl font-extrabold leading-[1.1] md:text-[44px] ${t.title}`}>{slide.title}</h2>
            <p className={`mt-3 max-w-md text-base md:text-lg ${t.text}`}>{slide.text}</p>
            <div className="mt-6">
              {slide.to ? (
                <Link to={slide.to} className={cta}>
                  {slide.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <button type="button" onClick={slide.onClick} className={cta}>
                  {slide.cta}
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="relative hidden h-full items-center justify-center md:flex">
            {slide.images?.length ? (
              <div className="flex items-center justify-center">
                {slide.images.slice(0, 3).map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className={`aspect-square w-40 rounded-2xl border-4 border-white object-cover shadow-[0_25px_50px_-20px_rgba(0,0,0,0.6)] lg:w-48 ${i === 1 ? 'z-10 -mx-6 scale-110' : i === 0 ? '-rotate-6' : 'rotate-6'}`}
                  />
                ))}
              </div>
            ) : (
              <div className="flex h-44 w-44 items-center justify-center rounded-full bg-white/25 ring-8 ring-white/20">
                <CategoryIcon category={{ icon: slide.icon }} className="h-20 w-20" />
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {count > 1 && (
        <>
          <button type="button" onClick={() => go(index - 1)} aria-label="Previous banner" className={`${arrow} left-0 rounded-r-lg`}>
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button type="button" onClick={() => go(index + 1)} aria-label="Next banner" className={`${arrow} right-0 rounded-l-lg`}>
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show banner ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
                className={`h-2 rounded-full transition-all ${i === index ? 'w-7 bg-primary ring-2 ring-white' : 'w-2 bg-white/80 ring-1 ring-primary/30 hover:bg-white'}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
