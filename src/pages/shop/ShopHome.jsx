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
import { HOME_DESCRIPTION, HOME_TITLE } from '../../../shared/seo.js'
import { ALL_FAQS, faqLd } from '../../../shared/faq.js'
import { btn } from '../../shop/format'
import { track } from '../../shop/track'
import { COMPANY_URL, SITE_URL } from '../../shop/site'
import { formatINR, hasPrice, isOrderable } from '../../../shared/pricing.js'

// A few common questions; the full list is on the FAQ page.
const FAQS = ['How do I order?', 'Do prices include GST?', 'How can I pay?', 'Where do you deliver?', 'Can I get a price for a large quantity?', 'Do you sell genuine branded products?']
  .map((q) => ALL_FAQS.find((f) => f.question === q))
  .filter(Boolean)

// Pastel circles for the category grid.
const CIRCLES = ['bg-[#e8eef8]', 'bg-[#fff6c7]', 'bg-[#e4f4ea]', 'bg-[#fbe9ec]', 'bg-[#eeeafb]', 'bg-[#e3f3f7]', 'bg-[#fdeedd]']

export default function ShopHome() {
  const { ready, products, categories, config, requestQuote, recent } = useShop()

  const live = useMemo(() => categories.filter((c) => products.some((p) => p.category === c.slug)), [categories, products])
  const byCategory = useMemo(() => {
    const map = new Map()
    for (const p of products) {
      if (!map.has(p.category)) map.set(p.category, [])
      map.get(p.category).push(p)
    }
    // Featured first, then priced, then products with a photo.
    const score = (p) => (p.is_featured ? 4 : 0) + (hasPrice(p) ? 2 : 0) + (p.images?.length ? 1 : 0)
    for (const list of map.values()) list.sort((a, b) => score(b) - score(a))
    return map
  }, [products])
  const deals = useMemo(
    () => products.filter((p) => isOrderable(p) && p.mrp_paise > p.price_paise).sort((a, b) => b.mrp_paise / b.price_paise - a.mrp_paise / a.price_paise),
    [products]
  )
  const inStock = useMemo(() => products.filter(isOrderable), [products])
  const recentlyViewed = useMemo(() => recent.map((id) => products.find((p) => p.id === id)).filter(Boolean), [recent, products])
  const brands = useMemo(() => {
    const count = new Map()
    for (const p of products) if (p.brand && p.brand !== 'Prosper Infotech') count.set(p.brand, (count.get(p.brand) || 0) + 1)
    return [...count.entries()].sort((a, b) => b[1] - a[1]).slice(0, 14).map(([name]) => name)
  }, [products])
  const lowest = useMemo(() => {
    const prices = products.filter(hasPrice).map((p) => p.price_paise)
    return prices.length ? Math.min(...prices) : null
  }, [products])

  const slides = useMemo(() => {
    const pick = (...slugs) => slugs.map((s) => live.find((c) => c.slug === s)).filter(Boolean)
    return [
      {
        theme: 'navy',
        eyebrow: 'Prosper Infotech Shop',
        title: 'RFID, barcode and POS hardware in one place',
        text: `${products.length}+ products from Zebra, Honeywell, TSC, Newland and more, with GST invoice and delivery across India.${lowest ? ` From ${formatINR(lowest)}.` : ''}`,
        cta: 'Shop all products',
        to: '/c/all',
        categories: pick('readers-antennas', 'barcode-scanners', 'printers-encoders'),
      },
      {
        theme: 'gold',
        eyebrow: 'Retail & restaurants',
        title: 'Billing made simple',
        text: 'Touch POS terminals, handheld POS with printer, receipt printers, cash drawers and self-order kiosks.',
        cta: 'Shop POS & kiosks',
        to: '/c/pos-kiosks',
        categories: pick('pos-kiosks', 'consumables-spares', 'barcode-scanners'),
      },
      {
        theme: 'light',
        eyebrow: 'Security & access',
        title: 'Know who comes in, and what goes out',
        text: 'Attendance terminals, door access control, EAS anti-theft systems, boom barriers and turnstiles.',
        cta: 'Shop security',
        to: '/c/security-access',
        categories: pick('security-access', 'smart-cards-nfc', 'tags-labels'),
      },
      {
        theme: 'navy',
        eyebrow: 'Bulk & corporate orders',
        title: 'Buying in quantity? Get a better price',
        text: 'Tell us the products and quantities. We reply with a price and delivery time within one business day.',
        cta: 'Request a bulk quote',
        to: '/bulk-order',
        categories: pick('tags-labels', 'smart-cards-nfc', 'consumables-spares'),
      },
    ]
  }, [live, products.length, lowest])

  const schema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebSite', name: 'Prosper Infotech Shop', url: `${SITE_URL}/` },
        faqLd(FAQS),
      ],
    }),
    []
  )
  useDocumentTitle(HOME_TITLE, HOME_DESCRIPTION, schema)

  useEffect(() => {
    const featured = products.filter((p) => p.is_featured)
    if (featured.length) track.viewItemList('Shop home: featured', featured)
  }, [products])

  if (!ready) return <PageLoading label="Loading the shop" />
  const whatsapp = `https://wa.me/${config.whatsapp_number}?text=${encodeURIComponent("Hi, I'd like help choosing products from your shop.")}`
  const wrap = 'mx-auto max-w-[1400px] px-4 lg:px-8'

  return (
    <div className="bg-[#f7f8fa] pb-14">
      <h1 className="sr-only">Prosper Infotech Shop: RFID, barcode, POS and security hardware online</h1>
      <HeroCarousel slides={slides} />

      <div className={`${wrap} flex flex-col gap-12`}>
        <TrustStrip className="relative z-10 -mt-6 shadow-[0_6px_24px_rgba(20,52,109,0.08)] md:-mt-8" />

        <section aria-label="Shop by category">
          <SectionTitle title="Shop by category" action={<Link to="/c/all">All products</Link>} />
          <ul className="grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11">
            {live.map((cat, i) => {
              const items = byCategory.get(cat.slug) || []
              const photo = items.find((p) => p.images?.[0])?.images[0]
              return (
                <li key={cat.slug}>
                  <Link to={`/c/${cat.slug}`} className="group flex flex-col items-center text-center">
                    <span
                      className={`flex aspect-square w-full max-w-[104px] items-center justify-center overflow-hidden rounded-full border-2 border-transparent transition-colors group-hover:border-gold ${CIRCLES[i % CIRCLES.length]}`}
                    >
                      {photo ? (
                        <img src={photo} alt="" loading="lazy" className="h-full w-full object-cover" />
                      ) : (
                        <CategoryIcon category={cat} className="h-10 w-10 stroke-[1.4] text-primary transition-transform duration-200 group-hover:scale-110" />
                      )}
                    </span>
                    <span className="mt-2.5 text-[13px] font-bold leading-tight text-ink-900 group-hover:text-primary">{cat.name}</span>
                    <span className="mt-0.5 text-[11px] text-[#7e818c]">{items.length} products</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>

        <ProductRow title="Deals of the day" subtitle="Priced below MRP while stock lasts" products={deals} minimum={3} viewAllTo="/c/all?stock=1&sort=price-asc" />
        <ProductRow title="Ready to ship" subtitle="In stock and dispatched after payment" products={inStock} minimum={5} viewAllTo="/c/all?stock=1" />

        {live.slice(0, 4).map((cat) => (
          <ProductRow key={cat.slug} title={cat.name} products={byCategory.get(cat.slug) || []} viewAllTo={`/c/${cat.slug}`} />
        ))}

        <section className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col justify-center rounded-lg bg-primary px-8 py-10 text-white">
            <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-gold">Bulk &amp; corporate orders</p>
            <h2 className="mt-3 text-2xl font-extrabold !text-white md:text-3xl">Buying in quantity?</h2>
            <p className="mt-2 max-w-sm text-white/80">Send your list of products and quantities. We reply with a price and delivery time within one business day.</p>
            <Link to="/bulk-order" className={`${btn.gold} mt-6 self-start`}>
              Request bulk quote
            </Link>
          </div>
          <div className="flex flex-col justify-center rounded-lg bg-gold px-8 py-10 text-primary">
            <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-primary/70">Free expert advice</p>
            <h2 className="mt-3 text-2xl font-extrabold md:text-3xl">Not sure what fits?</h2>
            <p className="mt-2 max-w-sm text-primary/80">Tell us what you want to track, bill or secure. Our engineers suggest the right hardware.</p>
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

        {live.slice(4).map((cat) => (
          <ProductRow key={cat.slug} title={cat.name} products={byCategory.get(cat.slug) || []} viewAllTo={`/c/${cat.slug}`} />
        ))}

        {brands.length > 0 && (
          <section aria-label="Shop by brand">
            <SectionTitle title="Shop by brand" action={<Link to="/brands">All brands</Link>} />
            <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
              {brands.map((b) => (
                <li key={b}>
                  <Link
                    to={`/c/all?brand=${encodeURIComponent(b)}`}
                    className="flex h-16 items-center justify-center rounded-lg border border-[#eaeaec] bg-white px-3 text-center text-sm font-extrabold uppercase tracking-wide text-primary transition-colors hover:border-primary"
                  >
                    {b}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <ProductRow title="Recently viewed" products={recentlyViewed} />

        <section className="mx-auto w-full max-w-3xl">
          <SectionTitle title="Common questions" action={<Link to="/faq">All FAQs</Link>} />
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
