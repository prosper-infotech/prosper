import Button from './Button'
import Reveal from '../motion/Reveal'

const BOOK_DEMO_URL = 'https://calendly.com/prosperinfotech-sales/30min'

export default function CTABand({ title, description, ctaLabel = 'Book a demo', ctaTo = BOOK_DEMO_URL }) {
  const isExternal = /^https?:\/\//.test(ctaTo)
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
          <Button href={ctaTo} target="_blank" rel="noopener noreferrer" variant="solid" className="shrink-0">
            {ctaLabel}
          </Button>
        ) : (
          <Button to={ctaTo} variant="solid" className="shrink-0">
            {ctaLabel}
          </Button>
        )}
      </Reveal>
    </section>
  )
}
