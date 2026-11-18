import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CategoryIcon } from './ui'

// Flat full-width banners: solid colour, bold type, one product photo, no shadows or tilt.
const THEMES = {
  navy: { wrap: 'bg-primary text-white', eyebrow: 'text-gold', title: '!text-white', text: 'text-white/80', cta: 'bg-gold text-primary hover:bg-gold-dark', photo: 'bg-white' },
  gold: { wrap: 'bg-gold text-primary', eyebrow: 'text-primary/70', title: '', text: 'text-primary/80', cta: 'bg-primary text-white hover:bg-primary-dark', photo: 'bg-white' },
  light: { wrap: 'bg-[#eef2f8] text-primary', eyebrow: 'text-gold-dark', title: '', text: 'text-[#535766]', cta: 'bg-primary text-white hover:bg-primary-dark', photo: 'bg-white' },
}

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
  const cta = `inline-flex items-center rounded-md px-7 py-3 text-[13px] font-bold uppercase tracking-wider transition-colors ${t.cta}`
  const arrow = 'absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-900 transition-colors hover:bg-white md:flex'

  return (
    <section
      className="relative overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Shop highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        key={index}
        className={`grid min-h-[260px] animate-[fadeIn_.4s_ease-out] items-center md:min-h-[380px] md:grid-cols-[1.2fr_1fr] ${t.wrap}`}
        aria-roledescription="slide"
        aria-label={`${index + 1} of ${count}`}
      >
        <div className="px-6 pb-20 pt-10 sm:px-12 md:py-10 lg:px-20">
          <p className={`text-xs font-extrabold uppercase tracking-[0.25em] ${t.eyebrow}`}>{slide.eyebrow}</p>
          <h2 className={`mt-3 max-w-xl text-3xl font-extrabold leading-[1.1] md:text-5xl ${t.title}`}>{slide.title}</h2>
          <p className={`mt-4 max-w-md text-base ${t.text}`}>{slide.text}</p>
          <div className="mt-7">
            {slide.to ? (
              <Link to={slide.to} className={cta}>
                {slide.cta}
              </Link>
            ) : (
              <button type="button" onClick={slide.onClick} className={cta}>
                {slide.cta}
              </button>
            )}
          </div>
        </div>
        {slide.images?.[0] ? (
          <div className="hidden h-full items-center justify-center p-10 md:flex">
            <img src={slide.images[0]} alt="" className={`aspect-square w-full max-w-[300px] rounded-full object-cover ${t.photo}`} />
          </div>
        ) : slide.categories?.length ? (
          <div className="hidden h-full items-center justify-center gap-4 p-10 md:flex" aria-hidden="true">
            {slide.categories.slice(0, 3).map((c, i) => (
              <span key={c.slug} className={`flex flex-col items-center gap-3 rounded-2xl bg-white px-5 py-6 text-center shadow-sm ${i === 1 ? '-translate-y-6' : ''}`}>
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-alt lg:h-24 lg:w-24">
                  <CategoryIcon category={c} className="h-10 w-10 stroke-[1.4] text-primary lg:h-12 lg:w-12" />
                </span>
                <span className="max-w-[7.5rem] text-xs font-bold leading-tight text-primary">{c.name}</span>
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {count > 1 && (
        <>
          <button type="button" onClick={() => go(index - 1)} aria-label="Previous banner" className={`${arrow} left-4`}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => go(index + 1)} aria-label="Next banner" className={`${arrow} right-4`}>
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-10 left-1/2 z-10 flex md:bottom-12 -translate-x-1/2 gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show banner ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-ink-900' : 'w-1.5 bg-ink-900/30 hover:bg-ink-900/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
