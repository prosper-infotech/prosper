import { Link } from 'react-router-dom'
import { Check, ArrowRight, CheckCircle2 } from 'lucide-react'
import Breadcrumb from '../ui/Breadcrumb'
import SectionHeading from '../ui/SectionHeading'
import CTABand from '../ui/CTABand'
import Reveal from '../motion/Reveal'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { SOFTWARE_PRODUCTS } from '../../data/softwareProductsDetail'

function ConnectedSteps({ steps }) {
  return (
    <div className="relative mt-5">
      <div className="lg:hidden absolute left-5 top-5 bottom-5 w-px bg-ink-300" />
      <div className="hidden lg:block absolute left-[12.5%] right-[12.5%] top-5 h-px bg-ink-300" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-4">
        {steps.map((step) => {
          const Icon = step.icon
          return (
            <div key={step.title} className="relative flex gap-4 lg:flex-1 lg:flex-col lg:items-center lg:text-center">
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary shadow-md">
                <Icon className="h-5 w-5" />
              </span>
              <div className="flex-1 lg:mt-1">
                <h5 className="font-heading font-semibold text-sm text-primary">{step.title}</h5>
                {step.status && (
                  <span className="mt-1 inline-block rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                    {step.status}
                  </span>
                )}
                {step.description && <p className="mt-1.5 text-xs text-ink-600">{step.description}</p>}
                {step.items && (
                  <ul className="mt-2 flex flex-col gap-1 lg:items-start text-left">
                    {step.items.map((item) => (
                      <li key={item} className="flex items-start gap-1.5 text-xs text-ink-600">
                        <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function SoftwareProductDetailTemplate({ detail }) {
  const { name, tagline, description, seoTitle, seoDescription, badge, process, features, highlights, idealFor, architecture, reachStackerPanel, dataPoints, path } = detail
  const siblings = SOFTWARE_PRODUCTS.filter((p) => p.path !== path)

  useDocumentTitle(seoTitle, seoDescription, {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description: tagline ? `${tagline} — ${description}` : description,
    applicationCategory: 'BusinessApplication',
    brand: { '@type': 'Brand', name: 'Prosper Infotech' },
    url: `https://www.prosperinfotech.com${path}`,
  })

  return (
    <>
      <Breadcrumb title={name} parent="Software" parentPath="/products/software" description={description} />

      <div className="bg-gradient-to-b from-[#fffdf6] to-[#fff8dc]">
        {/* Intro strip: tagline, badge, process flow */}
        {(tagline || badge || process) && (
          <section className="max-w-4xl mx-auto px-6 pt-12 pb-4 text-center">
            <Reveal className="flex flex-col items-center gap-4">
              {tagline && <p className="text-lg font-semibold text-ink-700">{tagline}</p>}
              {badge && (
                <span className="inline-block rounded-full bg-gold/20 text-primary text-xs font-semibold px-4 py-1.5">
                  {badge}
                </span>
              )}
              {process && (
                <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                  {process.map((step, idx) => (
                    <span key={step} className="flex items-center gap-2">
                      <span className="rounded-full bg-white border border-gold-dark/25 px-3.5 py-1.5 text-xs font-semibold text-ink-700 whitespace-nowrap">
                        {step}
                      </span>
                      {idx < process.length - 1 && (
                        <ArrowRight className="h-3.5 w-3.5 text-ink-500 shrink-0" />
                      )}
                    </span>
                  ))}
                </div>
              )}
            </Reveal>
          </section>
        )}

        {/* Key Capabilities */}
        {features && (
          <section className="max-w-6xl mx-auto px-6 py-14">
            <SectionHeading eyebrow="Key Capabilities" title={`What's included in ${name}`} />
            <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => (
                <Reveal key={feature} delay={(i % 3) * 0.08}>
                  <div className="h-full rounded-[22px] border border-gold-dark/25 bg-gradient-to-br from-[#fffdf0] to-[#fff6d6] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(20,52,109,0.25)]">
                    <span className="text-2xl font-heading font-bold text-gold-dark">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="mt-3 text-sm text-ink-700">{feature}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Highlights — dark accent band */}
        {highlights && (
          <section className="py-6">
            <div className="max-w-6xl mx-auto px-6">
              <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-primary-dark via-navy to-[#081a3d] px-8 py-14 md:px-14 md:py-16">
                <div className="pointer-events-none absolute -top-24 -right-16 h-[380px] w-[380px] rounded-full bg-gold/25 blur-[110px]" />
                <div className="pointer-events-none absolute top-1/2 left-1/3 h-[280px] w-[280px] -translate-y-1/2 rounded-full bg-gold-dark/15 blur-[100px]" />
                <div className="pointer-events-none absolute -bottom-24 -left-16 h-[320px] w-[320px] rounded-full bg-[#3a5a99]/40 blur-[110px]" />

                <div className="relative">
                  <SectionHeading eyebrow="Why it matters" title="Highlights" variant="dark" className="mb-12" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    {highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="flex items-start gap-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] px-5 py-4"
                      >
                        <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                        <span className="text-white/90 text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Ideal For */}
        {idealFor && (
          <section className="max-w-5xl mx-auto px-6 py-16 text-center">
            <SectionHeading eyebrow="Who it's for" title="Ideal For" />
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {idealFor.map((use) => (
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

        {/* Architecture */}
        {architecture &&
          architecture.map((group) => (
            <section key={group.title} className="max-w-6xl mx-auto px-6 py-14">
              <SectionHeading eyebrow="How it works" title={group.title} />
              <ConnectedSteps steps={group.steps} />
            </section>
          ))}

        {/* Reach stacker validation panel */}
        {reachStackerPanel && (
          <section className="max-w-5xl mx-auto px-6 py-14">
            <Reveal>
              <div className="rounded-2xl border border-gold-dark/25 bg-gradient-to-br from-[#fffdf0] to-[#fff6d6] p-6 sm:p-8">
                <h3 className="font-heading font-semibold text-lg text-primary">
                  {reachStackerPanel.title}
                </h3>
                <p className="mt-1 text-sm text-ink-500">{reachStackerPanel.subtitle}</p>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-primary mb-3">
                      Pickup Validation
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {reachStackerPanel.pickup.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-ink-700">
                          <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-primary mb-3">
                      Drop Validation
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {reachStackerPanel.drop.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-ink-700">
                          <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
        )}

        {/* Typical data points */}
        {dataPoints && (
          <section className="max-w-5xl mx-auto px-6 py-16 text-center">
            <SectionHeading eyebrow="What we track" title="Typical Data Points" />
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {dataPoints.map((point) => (
                <span
                  key={point}
                  className="rounded-full border border-gold-dark/30 bg-gold/10 px-4 py-2 text-sm font-medium text-primary"
                >
                  {point}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Sibling products */}
        <section className="border-t border-gold-dark/15">
          <div className="max-w-5xl mx-auto px-6 py-16 text-center">
            <SectionHeading eyebrow="Explore more" title="More software products" />
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {siblings.map((sibling) => {
                const SiblingIcon = sibling.icon
                return (
                  <Link
                    key={sibling.path}
                    to={sibling.path}
                    className="group flex items-center gap-3 rounded-lg border border-ink-300 bg-white px-4 py-3.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-8px_rgba(20,52,109,0.25)] text-left"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-primary bg-gradient-to-br from-gold to-gold-dark">
                      <SiblingIcon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-semibold text-ink-900 flex-1">{sibling.name}</span>
                    <ArrowRight className="h-4 w-4 text-ink-400 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                  </Link>
                )
              })}
            </div>
            <Link
              to="/products/software"
              className="mt-6 inline-block text-sm font-semibold text-primary hover:text-primary-dark"
            >
              View all software &rarr;
            </Link>
          </div>
        </section>

        <CTABand
          title={`Ready to see ${name} in action?`}
          description="Talk to our team about which platform fits your operation — we'll walk you through a live demo."
        />
      </div>
    </>
  )
}
