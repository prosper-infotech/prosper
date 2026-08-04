import { MapPin, Phone, Building2 } from 'lucide-react'
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
              <div
                key={office.country}
                className="group rounded-xl border border-ink-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_10px_25px_-8px_rgba(20,52,109,0.25)]"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.15)]">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-ink-900">
                    {office.country}
                  </h3>
                </div>
                <div className="mb-2 flex items-center gap-3 text-ink-600">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <a
                    href={`tel:${office.phone.replace(/\s+/g, '')}`}
                    className="transition-colors hover:text-primary"
                  >
                    {office.phone}
                  </a>
                </div>
                <div className="flex items-start gap-3 text-ink-600">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
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
