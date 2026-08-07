import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Breadcrumb from '../ui/Breadcrumb'
import SectionHeading from '../ui/SectionHeading'
import CTABand from '../ui/CTABand'
import Reveal from '../motion/Reveal'
import useDocumentTitle from '../../hooks/useDocumentTitle'

export default function IconCardOverviewTemplate({
  title,
  eyebrow = 'What we do',
  heading,
  items,
  icons,
  columns = 3,
  ctaTitle,
  ctaDescription,
  seoTitle,
  seoDescription,
}) {
  useDocumentTitle(seoTitle || `${title} | Prosper Infotech`, seoDescription)

  const gridCols = columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <>
      <Breadcrumb title={title} />

      <section className="max-w-7xl mx-auto px-6 py-20">
        {heading && <SectionHeading eyebrow={eyebrow} title={heading} />}

        <div className={`mt-14 grid grid-cols-1 gap-6 ${gridCols}`}>
          {items.map((item, i) => {
            const Icon = icons[item.path]
            return (
              <Reveal
                key={item.path}
                delay={(i % 3) * 0.08}
                className={columns === 3 && i % 2 === 1 ? 'lg:mt-10' : ''}
              >
                <Link
                  to={item.path}
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-ink-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_0_50px_-8px_rgba(247,221,0,0.4),0_25px_50px_-12px_rgba(0,0,0,0.3)]"
                >
                  <div className="absolute inset-0 bg-primary-dark opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="pointer-events-none absolute -top-6 -right-2 z-0 select-none font-heading text-8xl font-bold text-primary/[0.06] transition-colors duration-300 group-hover:text-white/10">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.15),0_4px_8px_rgba(0,0,0,0.2)] transition-all duration-300 group-hover:from-white/25 group-hover:to-white/5 group-hover:text-white">
                    {Icon && <Icon className="h-5 w-5" />}
                  </div>
                  <h3 className="relative z-10 mt-4 font-heading text-lg font-semibold text-primary transition-colors duration-300 group-hover:text-white">
                    {item.label}
                  </h3>
                  <p className="relative z-10 mt-2 text-sm text-ink-600 transition-colors duration-300 group-hover:text-ink-300">
                    {item.description ?? `Explore ${item.label} solutions`}
                  </p>
                  <span className="relative z-10 mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors duration-300 group-hover:text-white">
                    Explore
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      <CTABand title={ctaTitle} description={ctaDescription} />
    </>
  )
}
