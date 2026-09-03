import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from '../motion/Reveal'

const BOOK_DEMO_URL = 'https://calendly.com/prosperinfotech-sales/30min'

export default function CTABand({ title, description, ctaLabel = 'Book A Demo', ctaTo = BOOK_DEMO_URL }) {
  const isExternal = /^https?:\/\//.test(ctaTo)
  const ctaClasses =
    'mt-7 md:mt-0 inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-primary-dark'

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
      <Reveal
        className="relative rounded-[32px] bg-gradient-to-br from-[#fffdf0] via-[#fff3c4] to-[#ffe58a]
                   px-8 py-12 md:px-14 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8
                   text-center md:text-left overflow-hidden"
      >
        <div>
          <h3 className="text-3xl md:text-[40px] font-heading font-extrabold leading-tight text-primary">{title}</h3>
          {description && <p className="mt-4 max-w-md text-lg text-ink-600">{description}</p>}
        </div>
        {isExternal ? (
          <a href={ctaTo} target="_blank" rel="noopener noreferrer" className={ctaClasses}>
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </a>
        ) : (
          <Link to={ctaTo} className={ctaClasses}>
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </Reveal>
    </section>
  )
}
