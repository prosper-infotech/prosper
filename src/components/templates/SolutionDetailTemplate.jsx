import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import Breadcrumb from '../ui/Breadcrumb'
import SectionHeading from '../ui/SectionHeading'
import CTABand from '../ui/CTABand'
import Reveal from '../motion/Reveal'
import useDocumentTitle from '../../hooks/useDocumentTitle'

const SECTION_LINKS = [
  { id: 'overview', label: 'Overview' },
  { id: 'features', label: 'Key Features' },
  { id: 'benefits', label: 'Benefits' },
]

export default function SolutionDetailTemplate({ title, parentLabel, parentPath, siblings, detail, path, icons }) {
  useDocumentTitle(detail.seoTitle, detail.metaDescription)

  return (
    <>
      <Breadcrumb title={title} parent={parentLabel} parentPath={parentPath} icon={icons?.[path]} />

      <div className="bg-gradient-to-b from-[#fffdf6] to-[#fff8dc]">
        <div className="sticky top-[92px] z-30 border-b border-gold-dark/20 bg-[#fffdf6]/95 backdrop-blur-sm">
          <nav className="max-w-6xl mx-auto flex gap-1 overflow-x-auto px-6">
            {SECTION_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="whitespace-nowrap border-b-2 border-transparent px-4 py-3 text-sm font-semibold text-ink-600 transition-colors hover:border-gold-dark hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <section id="overview" className="max-w-4xl mx-auto px-6 pt-16 pb-4 scroll-mt-36">
          <Reveal className="flex flex-col gap-4">
            {detail.intro.map((para, i) => (
              <p key={i} className="text-ink-600 text-lg">
                {para}
              </p>
            ))}
          </Reveal>
        </section>

        <section id="features" className="max-w-6xl mx-auto px-6 py-14 scroll-mt-36">
          <SectionHeading eyebrow="Key Features" title={`What's included in ${title}`} />
          <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {detail.keyFeatures.map((feature, i) => (
              <Reveal key={feature.title} delay={(i % 3) * 0.08}>
                <div className="h-full rounded-[22px] border border-gold-dark/25 bg-gradient-to-br from-[#fffdf0] to-[#fff6d6] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(20,52,109,0.25)]">
                  <span className="text-3xl font-heading font-bold text-gold-dark">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-heading font-semibold text-lg text-primary">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-600">{feature.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="benefits" className="py-6 scroll-mt-36">
          <div className="max-w-6xl mx-auto px-6">
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-primary-dark via-navy to-[#081a3d] px-8 py-14 md:px-14 md:py-16">
              <div className="pointer-events-none absolute -top-24 -right-16 h-[380px] w-[380px] rounded-full bg-gold/25 blur-[110px]" />
              <div className="pointer-events-none absolute top-1/2 left-1/3 h-[280px] w-[280px] -translate-y-1/2 rounded-full bg-gold-dark/15 blur-[100px]" />
              <div className="pointer-events-none absolute -bottom-24 -left-16 h-[320px] w-[320px] rounded-full bg-[#3a5a99]/40 blur-[110px]" />

              <div className="relative">
                <SectionHeading eyebrow="Why it matters" title="Benefits" variant="dark" className="mb-12" />
                <div className="grid gap-4 sm:grid-cols-2">
                  {detail.benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-start gap-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] px-5 py-4"
                    >
                      <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                      <span className="text-white/90 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {detail.idealFor && (
          <section className="max-w-5xl mx-auto px-6 py-16 text-center">
            <SectionHeading eyebrow="Who it's for" title="Ideal for" />
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {detail.idealFor.map((use) => (
                <span
                  key={use}
                  className="rounded-full border border-gold-dark/30 bg-gold/10 px-4 py-2 text-sm font-medium text-primary"
                >
                  {use}
                </span>
              ))}
            </div>
          </section>
        )}

        {detail.related && (
          <section className="max-w-5xl mx-auto px-6 py-16 text-center">
            <SectionHeading eyebrow="How we help" title="Related Solutions" />
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {detail.related.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </section>
        )}

        {siblings.length > 0 && (
          <section className="border-t border-gold-dark/15">
            <div className="max-w-6xl mx-auto px-6 py-16 text-center">
              <SectionHeading eyebrow="Explore more" title={`More in ${parentLabel}`} />
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                {siblings.map((sibling) => (
                  <Link
                    key={sibling.path}
                    to={sibling.path}
                    className="rounded-full border border-ink-300 px-4 py-2 text-sm text-ink-700 hover:border-primary hover:text-primary transition-colors"
                  >
                    {sibling.label}
                  </Link>
                ))}
              </div>
              <Link
                to={parentPath}
                className="mt-6 inline-block text-sm font-semibold text-primary hover:text-primary-dark"
              >
                View all {parentLabel} &rarr;
              </Link>
            </div>
          </section>
        )}
      </div>

      <CTABand
        title={`Ready to talk about ${title}?`}
        description="We'll walk through your requirements and recommend the right approach."
      />
    </>
  )
}
