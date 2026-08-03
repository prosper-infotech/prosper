import { Link } from 'react-router-dom'
import Breadcrumb from '../ui/Breadcrumb'
import Button from '../ui/Button'
import CTABand from '../ui/CTABand'
import Reveal from '../motion/Reveal'

export default function TopicPageTemplate({ title, parentLabel, parentPath, siblings }) {
  return (
    <>
      <Breadcrumb title={title} parent={parentLabel} />

      <Reveal className="max-w-3xl mx-auto px-6 py-20 text-center flex flex-col items-center gap-6">
        <p className="text-ink-600 text-lg">
          Content for {title} is coming soon. In the meantime, get in touch and we'll walk you
          through how Prosper Infotech can help.
        </p>
        <div className="inline-flex items-center gap-2 rounded-full bg-surface-alt px-4 py-1.5 text-sm text-ink-500">
          Content coming soon
        </div>
        <Button to="/contact" variant="filled">
          Talk to us about {title}
        </Button>

        {siblings.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            {siblings.slice(0, 6).map((sibling) => (
              <Link
                key={sibling.path}
                to={sibling.path}
                className="rounded-full border border-ink-300 px-4 py-1.5 text-sm text-ink-600 hover:border-primary hover:text-primary transition-colors"
              >
                {sibling.label}
              </Link>
            ))}
          </div>
        )}
        <Link to={parentPath} className="text-sm font-semibold text-primary hover:text-primary-dark">
          View all {parentLabel} &rarr;
        </Link>
      </Reveal>

      <CTABand title="Not sure where to start?" description="We'll help you find the right solution." />
    </>
  )
}
