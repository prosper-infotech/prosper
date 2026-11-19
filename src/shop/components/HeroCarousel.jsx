import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { formatINR } from '../../../shared/pricing.js'

// Full-width banners that slide sideways every few seconds, each showing a few real
// products with their photo and current price (no discounts). Prices come from the
// shop, so the banners change when a price changes.
const THEMES = {
  light: {
    wrap: 'bg-gradient-to-r from-[#eef2f8] via-white to-[#eef2f8]',
    eyebrow: 'text-gold-dark',
    title: '!text-primary',
    accent: 'text-[#d6262f]',
    text: 'text-[#535766]',
    cta: 'bg-primary text-white hover:bg-primary-dark',
    price: 'bg-primary text-white',
  },
  navy: {
    wrap: 'bg-gradient-to-r from-primary-dark via-primary to-primary-dark',
    eyebrow: 'text-gold',
    title: '!text-white',
    accent: 'text-gold',
    text: 'text-white/80',
    cta: 'bg-gold text-primary hover:bg-gold-dark',
    price: 'bg-gold text-primary',
  },
}

function Slide({ slide, active }) {
  const t = THEMES[slide.theme] || THEMES.light
  return (
    <div className={`w-full shrink-0 ${t.wrap}`} aria-roledescription="slide" aria-hidden={!active} inert={!active}>
      <div className="mx-auto grid min-h-[300px] max-w-[1400px] items-center gap-6 px-6 pb-16 pt-8 sm:px-12 md:min-h-[400px] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] md:pb-14 lg:px-20">
        <div>
          <p className={`text-xs font-extrabold uppercase tracking-[0.25em] ${t.eyebrow}`}>{slide.eyebrow}</p>
          <h2 className={`mt-3 text-3xl font-extrabold uppercase leading-[1.05] md:text-[44px] ${t.title}`}>
            {slide.title} {slide.accent && <span className={`block ${t.accent}`}>{slide.accent}</span>}
          </h2>
          <p className={`mt-3 max-w-md text-sm md:text-base ${t.text}`}>{slide.text}</p>
          <Link to={slide.to} className={`mt-6 inline-flex items-center rounded-md px-7 py-3 text-[13px] font-bold uppercase tracking-wider transition-colors ${t.cta}`}>
            {slide.cta}
          </Link>
        </div>
        <ul className="grid grid-cols-3 items-end gap-3 md:gap-5">
          {slide.products.map((p, i) => (
            <li key={p.id} className={i === 1 ? 'md:-translate-y-4' : ''}>
              <Link to={`/p/${p.slug}`} className="group flex flex-col items-center text-center" tabIndex={active ? undefined : -1}>
                <span className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-[0_8px_24px_rgba(20,52,109,0.12)] md:p-4">
                  <img src={p.images[0]} alt={p.name} loading={slide.eager ? 'eager' : 'lazy'} className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105" />
                </span>
                <span className={`mt-2 line-clamp-2 hidden text-xs font-bold leading-tight md:block ${slide.theme === 'navy' ? 'text-white' : 'text-primary'}`}>{p.brand && p.brand !== 'Prosper Infotech' ? `${p.brand} ` : ''}{p.short}</span>
                <span className={`mt-1.5 rounded-md px-2.5 py-1 text-xs font-extrabold md:text-base ${t.price}`}>{formatINR(p.price_paise)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function HeroCarousel({ slides }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = slides.length
  const go = (n) => setIndex((n + count) % count)

  useEffect(() => {
    if (paused || count < 2) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const timer = setTimeout(() => setIndex((i) => (i + 1) % count), 5000)
    return () => clearTimeout(timer)
  }, [index, paused, count])

  if (!count) return null
  const current = index % count
  const arrow = 'absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow transition-colors hover:bg-white md:flex'

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
      <div className="flex transition-transform duration-700 ease-in-out motion-reduce:transition-none" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((s, i) => (
          <Slide key={s.to + s.title} slide={{ ...s, eager: i === 0 }} active={i === current} />
        ))}
      </div>

      {count > 1 && (
        <>
          <button type="button" onClick={() => go(current - 1)} aria-label="Previous banner" className={`${arrow} left-3`}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => go(current + 1)} aria-label="Next banner" className={`${arrow} right-3`}>
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-9 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 md:bottom-11">
            {slides.map((s, i) => (
              <button
                key={s.to + s.title}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show banner ${i + 1}: ${s.title}`}
                aria-current={i === current ? 'true' : undefined}
                className={`h-2 rounded-full transition-all ${i === current ? 'w-6 bg-gold-dark' : 'w-2 bg-[#9aa7c0] hover:bg-[#6f7fa0]'}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
