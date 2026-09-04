import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'
import Breadcrumb from '../ui/Breadcrumb'
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

      <section className="bg-gradient-to-b from-[#fffdf6] to-[#fff8dc]">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <Reveal>
            <div className="rounded-2xl border border-gold-dark/25 bg-gradient-to-br from-[#fffdf0] to-[#fff6d6] p-8">
              {tagline && <p className="text-sm font-semibold text-ink-500">{tagline}</p>}
              {badge && (
                <span className="mt-3 inline-block rounded-full bg-gold/20 text-primary text-xs font-semibold px-3 py-1">
                  {badge}
                </span>
              )}

              {process && (
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {process.map((step, idx) => (
                    <span key={step} className="flex items-center gap-2">
                      <span className="rounded-full bg-surface-alt px-3 py-1.5 text-xs font-semibold text-ink-700 whitespace-nowrap">
                        {step}
                      </span>
                      {idx < process.length - 1 && (
                        <ArrowRight className="h-3.5 w-3.5 text-ink-500 shrink-0" />
                      )}
                    </span>
                  ))}
                </div>
              )}

              {features && (
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-primary mb-3">
                      Key Capabilities
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-ink-700">
                          <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-primary mb-3">
                        Highlights
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="rounded-full border border-ink-300 px-3 py-1.5 text-xs font-medium text-ink-700"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    {idealFor && (
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-primary mb-3">
                          Ideal For
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {idealFor.map((use) => (
                            <span
                              key={use}
                              className="rounded-full bg-surface-alt px-3 py-1.5 text-xs font-medium text-ink-700"
                            >
                              {use}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {architecture &&
                architecture.map((group) => (
                  <div key={group.title} className="mt-8">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">
                      {group.title}
                    </h4>
                    <ConnectedSteps steps={group.steps} />
                  </div>
                ))}

              {reachStackerPanel && (
                <div className="mt-8 rounded-xl border border-ink-300 bg-surface-alt p-5">
                  <h4 className="font-heading font-semibold text-sm text-primary">
                    {reachStackerPanel.title}
                  </h4>
                  <p className="mt-1 text-xs text-ink-500">{reachStackerPanel.subtitle}</p>
                  <div className="mt-4 grid gap-5 sm:grid-cols-2">
                    <div>
                      <h5 className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">
                        Pickup Validation
                      </h5>
                      <ul className="flex flex-col gap-1.5">
                        {reachStackerPanel.pickup.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-ink-700">
                            <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">
                        Drop Validation
                      </h5>
                      <ul className="flex flex-col gap-1.5">
                        {reachStackerPanel.drop.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-ink-700">
                            <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {dataPoints && (
                <div className="mt-8">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-primary mb-3">
                    Typical Data Points
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {dataPoints.map((point) => (
                      <span
                        key={point}
                        className="rounded-full bg-surface-alt px-3 py-1.5 text-xs font-medium text-ink-700"
                      >
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {highlights && !features && (
                <div className="mt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-primary mb-3">
                    Highlights
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full border border-ink-300 px-3 py-1.5 text-xs font-medium text-ink-700"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>

        <div className="border-t border-gold-dark/15">
          <div className="max-w-5xl mx-auto px-6 py-16 text-center">
            <h2 className="font-heading font-semibold text-lg text-primary mb-6">More software products</h2>
            <div className="grid gap-3 sm:grid-cols-2">
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
        </div>

        <CTABand
          title={`Ready to see ${name} in action?`}
          description="Talk to our team about which platform fits your operation — we'll walk you through a live demo."
        />
      </section>
    </>
  )
}
