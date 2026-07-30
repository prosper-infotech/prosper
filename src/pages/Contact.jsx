import { MapPin, Phone } from 'lucide-react'
import Breadcrumb from '../components/ui/Breadcrumb'
import ContactForm from '../components/forms/ContactForm'
import { OFFICES } from '../data/offices'

export default function Contact() {
  return (
    <>
      <Breadcrumb title="Contact Us" />

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid gap-16 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-heading font-bold text-ink-900 mb-6">Send us a message</h2>
            <ContactForm />
          </div>

          <div className="lg:col-span-2 flex flex-col gap-8">
            <h2 className="text-2xl font-heading font-bold text-ink-900">Our offices</h2>
            {OFFICES.map((office) => (
              <div key={office.country} className="rounded-lg border border-ink-300 p-6">
                <h3 className="font-heading font-semibold text-lg text-ink-900 mb-3">
                  {office.country}
                </h3>
                <div className="flex items-center gap-3 text-ink-600 mb-2">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <a href={`tel:${office.phone.replace(/\s+/g, '')}`} className="hover:text-primary">
                    {office.phone}
                  </a>
                </div>
                <div className="flex items-start gap-3 text-ink-600">
                  <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{office.address}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
