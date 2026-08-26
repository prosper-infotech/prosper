import Button from './Button'
import Reveal from '../motion/Reveal'

const BOOK_DEMO_URL = 'https://calendly.com/prosperinfotech-sales/30min'

export default function CTABand({ title, description, ctaLabel = 'Book a demo', ctaTo = BOOK_DEMO_URL }) {
  const isExternal = /^https?:\/\//.test(ctaTo)
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
      <Reveal
        className="relative rounded-2xl md:rounded-3xl bg-gradient-to-r from-gold to-gold-dark shadow-xl shadow-gold/20
                   px-8 py-12 md:px-16 md:py-14 flex flex-col md:flex-row items-center justify-between gap-6
                   text-center md:text-left overflow-hidden"
      >
        <div className="pointer-events-none absolute -top-16 -right-10 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary">{title}</h3>
          {description && <p className="mt-2 text-primary/80">{description}</p>}
        </div>
        {isExternal ? (
          <Button
            href={ctaTo}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline-dark"
            className="relative z-10 shrink-0"
          >
            {ctaLabel}
          </Button>
        ) : (
          <Button to={ctaTo} variant="outline-dark" className="relative z-10 shrink-0">
            {ctaLabel}
          </Button>
        )}
      </Reveal>
    </section>
  )
}
