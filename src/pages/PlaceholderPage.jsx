import Breadcrumb from '../components/ui/Breadcrumb'
import Button from '../components/ui/Button'

export default function PlaceholderPage({ title, description, parent }) {
  return (
    <>
      <Breadcrumb title={title} parent={parent} />
      <section className="max-w-3xl mx-auto px-6 py-20 text-center flex flex-col items-center gap-6">
        {description && <p className="text-ink-600 text-lg">{description}</p>}
        <div className="inline-flex items-center gap-2 rounded-full bg-surface-alt px-4 py-1.5 text-sm text-ink-500">
          Content coming soon
        </div>
        <Button to="/contact" variant="filled">
          Talk to us about {title}
        </Button>
      </section>
    </>
  )
}
