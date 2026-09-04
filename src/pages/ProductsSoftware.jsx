import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Breadcrumb from '../components/ui/Breadcrumb'
import CTABand from '../components/ui/CTABand'
import Reveal from '../components/motion/Reveal'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { SOFTWARE_PRODUCTS } from '../data/softwareProductsDetail'

export default function ProductsSoftware() {
  useDocumentTitle(
    'RFID & AI Vision Software Platforms | WMS, YardVision, DockVision AI | Prosper Infotech',
    "Explore Prosper Infotech's software platforms — asset tracking, WMS, YardVision AI, RFID+GPS inventory tracking, and video-based attendance systems."
  )

  return (
    <>
      <Breadcrumb
        title="Software"
        description="Proprietary software built for real-time operations across every yard, warehouse, and fleet."
      />

      <section className="bg-gradient-to-b from-[#fffdf6] to-[#fff8dc]">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
            {SOFTWARE_PRODUCTS.map((product, i) => {
              const Icon = product.icon
              return (
                <Reveal key={product.key} delay={(i % 2) * 0.08}>
                  <Link
                    to={product.path}
                    className="group relative flex h-full flex-col rounded-[22px] border border-gold-dark/25 bg-gradient-to-br from-[#fffdf0] to-[#fff6d6] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(20,52,109,0.25)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.15)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/20 text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-gold">
                        <ArrowRight className="h-4 w-4 -rotate-45" />
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-heading font-bold text-primary">{product.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-ink-500">{product.tagline}</p>
                    <p className="mt-2 text-sm text-ink-600">{product.description}</p>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>

        <CTABand
          title="Ready to see our software in action?"
          description="Talk to our team about which platform fits your operation — we'll walk you through a live demo."
        />
      </section>
    </>
  )
}
