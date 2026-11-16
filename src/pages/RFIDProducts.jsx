import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, MessageCircle, Printer, Radio, ScanBarcode, ScanLine, Tag, Tags, Wifi } from 'lucide-react'
import CTABand from '../components/ui/CTABand'
import FAQAccordion from '../components/ui/FAQAccordion'
import QuoteModal from '../components/ui/QuoteModal'
import RelatedContent from '../components/ui/RelatedContent'
import Reveal from '../components/motion/Reveal'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { CATEGORIES, RFID_FAQS, RFID_PRODUCTS } from '../data/rfidProducts'

const PATH = '/products/rfid-assets'
const CAMPAIGN = 'RFID Products Page'
const WHATSAPP_URL = `https://wa.me/19407583271?text=${encodeURIComponent(
  "Hi, I'd like a quote for RFID tags, readers or printers."
)}`
const PRODUCT_OPTIONS = RFID_PRODUCTS.map((p) => p.name)
const CATEGORY_ICONS = { tags: Tag, readers: Radio, scanners: ScanBarcode, printers: Printer }

const GUIDE_STEPS = [
  { icon: Tags, title: 'What are you tracking?', text: 'Boxes, tools, machines, containers or something else. This decides the tag.' },
  { icon: ScanLine, title: 'Where will it be read?', text: 'A gate, a dock door, a shelf or by hand. This decides the reader and antennas.' },
  { icon: Wifi, title: 'How many items?', text: 'A few hundred or many thousands. This decides the printer and the quantity price.' },
]

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.prosperinfotech.com/' },
        { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://www.prosperinfotech.com/products' },
        { '@type': 'ListItem', position: 3, name: 'RFID & Barcode Products', item: `https://www.prosperinfotech.com${PATH}` },
      ],
    },
    ...RFID_PRODUCTS.map((p) => ({
      '@type': 'Product',
      name: p.name,
      description: p.useCase,
      brand: { '@type': 'Brand', name: 'Prosper Infotech' },
      category: CATEGORIES.find((c) => c.key === p.category)?.label,
    })),
    {
      '@type': 'FAQPage',
      mainEntity: RFID_FAQS.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ],
}

function ProductCard({ product, onQuote }) {
  const Icon = CATEGORY_ICONS[product.category]
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink-300 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_-8px_rgba(247,221,0,0.35),0_20px_40px_-12px_rgba(0,0,0,0.2)]">
      <div className="aspect-[4/3] w-full bg-surface-alt">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface-alt to-[#fff3c4]"
            role="img"
            aria-label={`${product.name} (image coming soon)`}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.15)]">
              <Icon className="h-9 w-9" />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-lg font-semibold text-primary">{product.name}</h3>
        <p className="mt-1 text-sm text-ink-600">{product.useCase}</p>

        <ul className="mt-4 flex flex-col gap-2">
          {product.specs.map((spec) => (
            <li key={spec.label} className="flex items-start gap-2 text-sm text-ink-700">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                <span className="text-ink-500">{spec.label}:</span>{' '}
                <span className="font-medium text-ink-900">{spec.value}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
          <button
            type="button"
            onClick={() => onQuote(product.name)}
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-primary shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-lg active:translate-y-0 active:scale-95"
          >
            Request price
            <ArrowRight className="h-4 w-4" />
          </button>
          {product.to && (
            <Link to={product.to} className="text-sm font-semibold text-primary underline decoration-gold-dark decoration-2 underline-offset-4 hover:text-primary-dark">
              Full specifications
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default function RFIDProducts() {
  const [quoteFor, setQuoteFor] = useState(null)

  useDocumentTitle(
    'RFID & Barcode Products | Tags, Readers, Scanners & Printers',
    'Buy UHF RFID tags and labels, RFID readers and antennas, barcode and QR scanners, and RFID and barcode label printers for asset tracking. Request a quote from Prosper Infotech.',
    SCHEMA
  )

  return (
    <>
      <section className="max-w-3xl mx-auto px-6 pt-14 md:pt-20 pb-8 text-center">
        <Reveal className="flex flex-col items-center gap-4">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">RFID Products</span>
          <h1 className="text-3xl md:text-[38px] md:leading-[44px] font-heading font-extrabold text-primary">
            RFID & Barcode Products for Asset Tracking
          </h1>
          <p className="text-ink-600 text-lg">
            Everything you need to tag, scan and track your assets. Choose your RFID tags, readers, barcode scanners and printers, then ask for a price. We reply within one business
            day, and we can install and connect everything to our asset tracking software.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setQuoteFor(PRODUCT_OPTIONS[0])}
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-primary shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-lg active:translate-y-0 active:scale-95"
            >
              Get a quote
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => window.gtag?.('event', 'click_whatsapp', { event_category: 'RFID Products Page' })}
              className="inline-flex items-center gap-2 rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 px-6 py-2.5 text-sm font-semibold text-[#128C4A] shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#25D366]/20 active:translate-y-0 active:scale-95"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </section>

      <nav aria-label="Product categories" className="max-w-5xl mx-auto px-6 pb-4">
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.key}
              href={`#${cat.key}`}
              className="rounded-full border border-primary/30 bg-primary/5 px-5 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              {cat.label}
            </a>
          ))}
        </div>
      </nav>

      {CATEGORIES.map((cat) => {
        const items = RFID_PRODUCTS.filter((p) => p.category === cat.key)
        return (
          <section key={cat.key} id={cat.key} className="max-w-6xl mx-auto px-6 py-12 scroll-mt-32">
            <Reveal className="mb-8 max-w-2xl">
              <h2 className="text-2xl md:text-3xl">{cat.heading}</h2>
              <p className="mt-2 text-ink-600">{cat.intro}</p>
            </Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((product, i) => (
                <Reveal key={product.key} delay={(i % 3) * 0.06}>
                  <ProductCard product={product} onQuote={setQuoteFor} />
                </Reveal>
              ))}
            </div>
          </section>
        )
      })}

      <p className="max-w-6xl mx-auto px-6 pb-4 text-sm text-ink-500">
        Specifications shown are typical. We confirm exact models and specifications in your quote.
      </p>

      <section className="bg-surface-alt py-16">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="mb-10 text-center">
            <h2 className="text-2xl md:text-3xl">Not sure what you need?</h2>
            <p className="mt-2 text-ink-600">Answer three questions and send them to us. We will suggest the right products.</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {GUIDE_STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <Reveal key={step.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-ink-300 bg-white p-6 shadow-md">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-heading text-lg font-semibold text-primary">{step.title}</h3>
                    <p className="mt-1 text-sm text-ink-600">{step.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setQuoteFor('Not sure, need guidance')}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark active:translate-y-0 active:scale-95"
            >
              Get free advice
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <Reveal className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl">From tag to tracking, all in one place</h2>
          <p className="mt-3 text-ink-600">
            Put a tag on each asset, read it with a handheld or fixed reader, and see where everything is in{' '}
            <Link to="/products/software/asset-tracking" className="font-semibold text-primary underline decoration-gold-dark decoration-2 underline-offset-4">
              Prosper Asset Tracking
            </Link>
            . Need help setting it up? Our{' '}
            <Link to="/services/rfid-services" className="font-semibold text-primary underline decoration-gold-dark decoration-2 underline-offset-4">
              RFID services team
            </Link>{' '}
            plans, installs and supports it.
          </p>
        </Reveal>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-16">
        <Reveal className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl">Common questions</h2>
        </Reveal>
        <FAQAccordion items={RFID_FAQS.map((f) => ({ question: f.question, answer: f.answer }))} />
      </section>

      <RelatedContent path={PATH} />
      <CTABand
        title="Ready to tag your assets?"
        description="Tell us what you track and how many. We will recommend the right tags and readers."
        ctaLabel="Talk to our team"
        ctaTo="/contact"
      />

      <QuoteModal
        product={quoteFor}
        options={[...PRODUCT_OPTIONS, 'Not sure, need guidance']}
        campaign={CAMPAIGN}
        onClose={() => setQuoteFor(null)}
      />
    </>
  )
}
