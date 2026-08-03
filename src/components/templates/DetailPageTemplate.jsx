import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../ui/Breadcrumb'
import Button from '../ui/Button'
import CTABand from '../ui/CTABand'
import Reveal from '../motion/Reveal'

export default function DetailPageTemplate({ title, description, parentLabel, parentPath, siblings }) {
  const capabilities = description ? description.split(',').map((c) => c.trim()) : []

  return (
    <>
      <Breadcrumb title={title} parent={parentLabel} />

      <Reveal className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 flex flex-col gap-8">
            {description && <p className="text-ink-600 text-lg">{description}</p>}

            <div className="inline-flex items-center gap-2 self-start rounded-full bg-surface-alt px-4 py-1.5 text-sm text-ink-500">
              Detailed content coming soon
            </div>

            {capabilities.length > 0 && (
              <ul className="grid gap-3 sm:grid-cols-2">
                {capabilities.map((capability) => (
                  <li key={capability} className="flex items-start gap-2 text-ink-900">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            )}

            <Button to="/contact" variant="filled" className="self-start">
              Talk to us about {title}
            </Button>
          </div>

          {siblings.length > 0 && (
            <aside className="flex flex-col gap-4">
              <h3 className="font-heading font-semibold text-ink-900">
                Related in {parentLabel}
              </h3>
              <ul className="flex flex-col gap-1 border-l border-ink-300 pl-4">
                {siblings.map((sibling) => (
                  <li key={sibling.path}>
                    <Link
                      to={sibling.path}
                      className="block py-2 text-sm text-ink-600 hover:text-primary transition-colors"
                    >
                      {sibling.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to={parentPath} className="text-sm font-semibold text-primary hover:text-primary-dark">
                View all {parentLabel} &rarr;
              </Link>
            </aside>
          )}
        </div>
      </Reveal>

      <CTABand
        title={`Ready to talk about ${title}?`}
        description="We'll walk through your requirements and recommend the right approach."
      />
    </>
  )
}
