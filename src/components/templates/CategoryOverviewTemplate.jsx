import { Layers } from 'lucide-react'
import Breadcrumb from '../ui/Breadcrumb'
import ServiceCard from '../ui/ServiceCard'
import CTABand from '../ui/CTABand'

export default function CategoryOverviewTemplate({ title, description, items }) {
  return (
    <>
      <Breadcrumb title={title} />
      <section className="max-w-7xl mx-auto px-6 py-20">
        {description && (
          <p className="max-w-2xl text-ink-600 text-lg mb-12">{description}</p>
        )}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ServiceCard
              key={item.path}
              icon={Layers}
              title={item.label}
              description={item.description ?? `Explore ${item.label}`}
              to={item.path}
            />
          ))}
        </div>
      </section>
      <CTABand
        title={`Have a question about ${title}?`}
        description="Talk to our team about the right fit for your operation."
      />
    </>
  )
}
