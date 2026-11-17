import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import FAQAccordion from '../../components/ui/FAQAccordion'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { useShop } from '../../shop/shopContext'
import HeroCarousel from '../../shop/components/HeroCarousel'
import ProductRow from '../../shop/components/ProductRow'
import SectionTitle from '../../shop/components/SectionTitle'
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

// Flat pastel tiles for the category grid.
const TILE_COLORS = ['bg-[#eef2f8]', 'bg-[#fff7d1]', 'bg-[#eaf6ee]', 'bg-[#fbeef0]', 'bg-[#f1eefb]', 'bg-[#e9f5f8]']

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
  const wrap = 'mx-auto max-w-[1400px] px-4 lg:px-8'

  return (
    <div className="pb-14">
      <h1 className="sr-only">Prosper Infotech Shop: RFID tags, readers, barcode scanners and printers</h1>
      <HeroCarousel slides={slides} />

      <div className={`${wrap} mt-12 flex flex-col gap-14`}>
        <section aria-label="Shop by category">
          <SectionTitle title="Shop by category" />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {live.map((cat, i) => {
              const items = products.filter((p) => p.category === cat.slug)
              const photo = items.find((p) => p.images?.[0])?.images[0]
              const from = items.filter(hasPrice).map((p) => p.price_paise)
              return (
                <li key={cat.slug}>
                  <Link to={`/c/${cat.slug}`} className={`group flex h-full flex-col items-center px-4 pb-5 pt-6 text-center ${TILE_COLORS[i % TILE_COLORS.length]}`}>
                    <span className="flex aspect-square w-full max-w-[150px] items-center justify-center overflow-hidden rounded-full bg-white">
                      {photo ? (
                        <img src={photo} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      ) : (
                        <CategoryIcon category={cat} className="h-14 w-14 stroke-[1.25] text-primary" />
                      )}
                    </span>
                    <span className="mt-4 text-sm font-extrabold uppercase tracking-wider text-ink-900">{cat.name}</span>
                    <span className="mt-1 text-xs text-[#696e79]">{from.length ? `From ${formatINR(Math.min(...from))}` : `${items.length} products`}</span>
                    <span className="mt-2 text-xs font-bold uppercase tracking-wider text-primary group-hover:underline">Shop now</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>

        <ProductRow title="Deals of the day" subtitle="Priced below MRP while stock lasts" products={deals} minimum={3} viewAllTo="/c/all?stock=1&sort=price-asc" />
        <ProductRow title="Ready to ship" subtitle="In stock and dispatched after payment" products={inStock} minimum={2} viewAllTo="/c/all?stock=1" />

        <section className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col justify-center bg-primary px-8 py-10 text-white">
            <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-gold">Bulk &amp; business orders</p>
            <h2 className="mt-3 text-2xl font-extrabold !text-white md:text-3xl">Buying in quantity?</h2>
            <p className="mt-2 max-w-sm text-white/80">Tell us the product and how many. We reply with a quantity price within one business day.</p>
            <button type="button" onClick={() => requestQuote('Bulk order')} className={`${btn.gold} mt-6 self-start`}>
              Request bulk quote
            </button>
          </div>
          <div className="flex flex-col justify-center bg-gold px-8 py-10 text-primary">
            <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-primary/70">Free expert advice</p>
            <h2 className="mt-3 text-2xl font-extrabold md:text-3xl">Not sure what fits?</h2>
            <p className="mt-2 max-w-sm text-primary/80">Send a photo of what you track. The team that installs RFID will suggest the right tags and readers.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={() => requestQuote('Not sure, need guidance')} className={btn.navy}>
                Get advice
              </button>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.gtag?.('event', 'click_whatsapp', { event_category: 'Online Shop' })}
                className="inline-flex items-center gap-2 rounded-md border border-primary px-5 py-3 text-[13px] font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        <ProductRow title="Featured products" products={featured} viewAllTo="/c/all" />
        {live.slice(0, 3).map((cat) => (
          <ProductRow key={cat.slug} title={cat.name} products={products.filter((p) => p.category === cat.slug)} viewAllTo={`/c/${cat.slug}`} />
        ))}
        <ProductRow title="Recently viewed" products={recentlyViewed} />

        <TrustStrip />

        <section className="mx-auto w-full max-w-3xl">
          <SectionTitle title="Common questions" />
          <FAQAccordion items={FAQS} />
          <p className="mt-6 text-sm text-[#696e79]">
            Need the hardware installed or connected to software? See{' '}
            <a href={`${COMPANY_URL}/products/software/asset-tracking`} target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">
              Prosper Asset Tracking
            </a>{' '}
            and our{' '}
            <a href={`${COMPANY_URL}/services/rfid-services`} target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">
              RFID services
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
