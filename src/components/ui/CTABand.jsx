import Button from './Button'

export default function CTABand({ title, description, ctaLabel = 'Get in touch', ctaTo = '/contact' }) {
  return (
    <section className="bg-primary">
      <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-white">{title}</h3>
          {description && <p className="mt-2 text-white/90">{description}</p>}
        </div>
        <Button to={ctaTo} variant="outline" className="shrink-0">
          {ctaLabel}
        </Button>
      </div>
    </section>
  )
}
