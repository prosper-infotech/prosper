import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle } from 'lucide-react'
import FAQAccordion from '../../components/ui/FAQAccordion'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { useShop } from '../../shop/shopContext'
import HeroCarousel from '../../shop/components/HeroCarousel'
import ProductRow from '../../shop/components/ProductRow'
import TrustStrip from '../../shop/components/TrustStrip'
import { CategoryIcon, PageLoading } from '../../shop/components/ui'
import { btn } from '../../shop/format'
import { track } from '../../shop/track'
import { COMPANY_URL, SITE_URL } from '../../shop/site'
import { formatINR, hasPrice, isOrderable } from '../../../shared/pricing.js'

const FAQS = [
  {
    question: 'How do I order?',
    answer:
      'Add products that show a price to your cart and check out. You do not need an account. Products marked "Request price" are quoted by our team within one business day.',
  },
  {
    question: 'Do prices include GST?',
    answer: 'Yes. Every price on the shop includes GST. You can add your company name and GSTIN at checkout so they appear on your GST invoice.',
  },
  {
    question: 'How can I pay?',
    answer: 'You can pay online by card, UPI or net banking, or choose bank transfer or UPI and pay from your own bank app. We confirm your order by email as soon as the payment arrives.',
  },
  {
    question: 'Where do you deliver?',
    answer: 'We deliver across India by tracked courier. You get an email with the tracking link when your order ships.',
  },
  {
    question: 'Can I get a price for a large quantity?',
    answer: 'Yes. Use "Request bulk quote" on any product page and tell us the quantity. We reply with a price and delivery time within one business day.',
  },
  {
    question: 'Will these products work with Prosper Asset Tracking?',
    answer: 'Yes. Our tags, readers, scanners and printers are chosen to work together with Prosper Asset Tracking and our RFID software.',
  },
]

const TILE_THEMES = [
  'from-primary-dark to-[#1c4a99] text-white',
  'from-[#fff3c4] to-gold text-primary',
  'from-[#e8f0fc] to-[#c9dbf6] text-primary',
  'from-[#14346d] to-[#0b1d3f] text-white',
]

export default function ShopHome() {
  const { ready, products, categories, config, requestQuote, recent } = useShop()

  const live = useMemo(() => categories.filter((c) => products.some((p) => p.category === c.slug)), [categories, products])
  const inStock = useMemo(() => products.filter(isOrderable), [products])
  const deals = useMemo(
    () => products.filter((p) => isOrderable(p) && p.mrp_paise > p.price_paise).sort((a, b) => b.mrp_paise / b.price_paise - a.mrp_paise / a.price_paise),
    [products]
  )
  const featured = useMemo(() => {
    const list = products.filter((p) => p.is_featured)
    return list.length >= 4 ? list : products.slice(0, 10)
  }, [products])
  const recentlyViewed = useMemo(() => recent.map((id) => products.find((p) => p.id === id)).filter(Boolean), [recent, products])
  const photos = useMemo(() => products.filter((p) => p.images?.[0]).map((p) => p.images[0]), [products])
  const lowest = useMemo(() => {
    const prices = products.filter(hasPrice).map((p) => p.price_paise)
    return prices.length ? Math.min(...prices) : null
  }, [products])

  const slides = useMemo(() => {
    const tags = live.find((c) => c.slug === 'tags-labels') || live[0]
    return [
      {
        theme: 'navy',
        eyebrow: 'Prosper Infotech Shop',
        title: 'RFID and barcode hardware, ready to order',
        text: `Tags, readers, scanners and printers with GST invoice and tracked delivery across India.${lowest ? ` From ${formatINR(lowest)}.` : ''}`,
        cta: 'Shop all products',
        to: '/c/all',
        images: photos.slice(0, 3),
        icon: 'radio',
      },
      tags && {
        theme: 'gold',
        eyebrow: tags.name,
        title: 'A tag for every surface',
        text: 'Paper labels, on-metal tags, rugged outdoor tags and hang tags. Order a few to test, then scale up.',
        cta: `Shop ${tags.name.toLowerCase()}`,
        to: `/c/${tags.slug}`,
        images: products.filter((p) => p.category === tags.slug && p.images?.[0]).map((p) => p.images[0]),
        icon: tags.icon,
      },
      {
        theme: 'light',
        eyebrow: 'Bulk and business orders',
        title: 'Buying in quantity? Get a better price',
        text: 'Tell us the product and how many. We reply with a quantity price and delivery time within one business day.',
        cta: 'Request bulk quote',
        onClick: () => requestQuote('Bulk order'),
        icon: 'printer',
      },
    ].filter(Boolean)
  }, [live, photos, products, lowest, requestQuote])

  const schema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebSite', name: 'Prosper Infotech Shop', url: `${SITE_URL}/` },
        { '@type': 'FAQPage', mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) },
      ],
    }),
    []
  )
  useDocumentTitle(
    'Buy RFID Tags, Readers, Barcode Scanners & Printers Online | Prosper Infotech Shop',
    'Order UHF RFID tags and labels, RFID readers and antennas, barcode scanners and label printers online. Prices include GST, GST invoice, delivery across India.',
    schema
  )

  useEffect(() => {
    if (featured.length) track.viewItemList('Shop home: featured', featured)
  }, [featured])

  if (!ready) return <PageLoading label="Loading the shop" />
  const whatsapp = `https://wa.me/${config.whatsapp_number}?text=${encodeURIComponent("Hi, I'd like help choosing RFID or barcode products from your shop.")}`

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-2 pb-10 pt-3 sm:gap-5 sm:px-4 sm:pt-4">
      <h1 className="sr-only">Prosper Infotech Shop: RFID tags, readers, barcode scanners and printers</h1>
      <HeroCarousel slides={slides} />

      <section aria-label="Shop by category" className="rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(20,52,109,0.08)] sm:p-5">
        <ul className="flex gap-2 overflow-x-auto [scrollbar-width:none] sm:justify-around [&::-webkit-scrollbar]:hidden">
          {live.map((cat) => (
            <li key={cat.slug} className="shrink-0">
              <Link to={`/c/${cat.slug}`} className="group flex w-[92px] flex-col items-center gap-2 rounded-xl p-2 text-center sm:w-32">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#fff3c4] to-gold text-primary shadow-[inset_0_2px_3px_rgba(255,255,255,0.7),0_6px_14px_-8px_rgba(20,52,109,0.6)] transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-105 sm:h-20 sm:w-20">
                  <CategoryIcon category={cat} className="h-7 w-7 sm:h-9 sm:w-9" />
                </span>
                <span className="text-xs font-bold leading-tight text-ink-900 group-hover:text-primary sm:text-sm">{cat.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ProductRow title="Top deals" subtitle="Priced below MRP while stock lasts" products={deals} viewAllTo="/c/all?stock=1&sort=price-asc" />
      <ProductRow title="Ready to ship" subtitle="In stock and dispatched after payment" products={inStock} viewAllTo="/c/all?stock=1" />

      <section aria-label="Categories" className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {live.slice(0, 4).map((cat, i) => {
          const items = products.filter((p) => p.category === cat.slug)
          const photo = items.find((p) => p.images?.[0])?.images[0]
          const from = items.filter(hasPrice).map((p) => p.price_paise)
          return (
            <Link
              key={cat.slug}
              to={`/c/${cat.slug}`}
              className={`group relative flex min-h-[190px] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br p-5 shadow-[0_1px_3px_rgba(20,52,109,0.08)] transition-transform duration-200 hover:-translate-y-1 ${TILE_THEMES[i % TILE_THEMES.length]}`}
            >
              <div className="relative z-10 max-w-[62%]">
                <p className="font-heading text-xl font-extrabold leading-tight">{cat.name}</p>
                <p className="mt-1 text-sm opacity-85">{from.length ? `From ${formatINR(Math.min(...from))}` : `${items.length} products`}</p>
              </div>
              <span className="relative z-10 inline-flex items-center gap-1.5 text-sm font-bold">
                Shop now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              {photo ? (
                <img src={photo} alt="" loading="lazy" className="absolute -bottom-4 -right-4 h-36 w-36 rotate-6 rounded-2xl border-4 border-white/80 object-cover shadow-xl transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105" />
              ) : (
                <span className="absolute -bottom-6 -right-6 flex h-36 w-36 items-center justify-center rounded-full bg-white/25">
                  <CategoryIcon category={cat} className="h-16 w-16 opacity-90" />
                </span>
              )}
            </Link>
          )
        })}
      </section>

      <ProductRow title="Featured products" subtitle="Popular with warehouses, stores and asset teams" products={featured} viewAllTo="/c/all" />

      {live.slice(0, 3).map((cat) => (
        <ProductRow key={cat.slug} title={cat.name} subtitle={cat.description} products={products.filter((p) => p.category === cat.slug)} viewAllTo={`/c/${cat.slug}`} />
      ))}

      <ProductRow title="Recently viewed" products={recentlyViewed} />

      <TrustStrip />

      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-dark via-primary to-[#1c4a99] px-6 py-9 text-center md:px-12 md:text-left">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/25 blur-3xl" />
        <div className="relative flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h2 className="text-2xl font-extrabold !text-white md:text-3xl">Not sure what fits? Ask the people who install it</h2>
            <p className="mt-2 max-w-xl text-white/85">Send a photo or description of what you track. We suggest the right tags and readers.</p>
          </div>
          <div className="flex shrink-0 flex-wrap justify-center gap-3">
            <button type="button" onClick={() => requestQuote('Not sure, need guidance')} className={btn.gold}>
              Get free advice
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => window.gtag?.('event', 'click_whatsapp', { event_category: 'Online Shop' })}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-primary"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp us
            </a>
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(20,52,109,0.08)] md:p-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl md:text-3xl">Common questions</h2>
          <FAQAccordion items={FAQS} />
          <p className="mt-6 text-center text-sm text-ink-600">
            Need the hardware installed or connected to software? See{' '}
            <a href={`${COMPANY_URL}/products/software/asset-tracking`} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline decoration-gold-dark decoration-2 underline-offset-4">
              Prosper Asset Tracking
            </a>{' '}
            and our{' '}
            <a href={`${COMPANY_URL}/services/rfid-services`} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline decoration-gold-dark decoration-2 underline-offset-4">
              RFID services
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
