import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowRight, Check, Download, FileText, Heart, Lock, MapPin, MessageCircle, PackageSearch, RotateCcw, ShieldCheck, ShoppingCart, Truck, Zap } from 'lucide-react'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { useShop } from '../../shop/shopContext'
import ProductRow from '../../shop/components/ProductRow'
import { Crumbs, EmptyState, PageLoading, ProductImage, QtyStepper } from '../../shop/components/ui'
import { btn, inputClass } from '../../shop/format'
import { track } from '../../shop/track'
import { COMPANY_URL, SITE_URL } from '../../shop/site'
import { formatINR, hasPrice, isOrderable } from '../../../shared/pricing.js'
import { deliveryEstimate, PINCODE_RE } from '../../../shared/india.js'

const SITE = SITE_URL
const abs = (u) => (u?.startsWith('http') ? u : `${SITE}${u}`)

function DeliveryCheck() {
  const { config, pincode, setPincode } = useShop()
  const [pin, setPin] = useState(pincode)
  const [error, setError] = useState('')
  const estimate = deliveryEstimate(pincode, config)
  const check = (e) => {
    e.preventDefault()
    if (!PINCODE_RE.test(pin)) return setError('Enter a 6-digit PIN code.')
    setError('')
    setPincode(pin)
  }
  return (
    <div>
      <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
        <MapPin className="h-4 w-4 text-gold-dark" />
        Delivery
      </p>
      <form onSubmit={check} className="mt-2 flex gap-2">
        <label htmlFor="pin-check" className="sr-only">
          Delivery PIN code
        </label>
        <input
          id="pin-check"
          inputMode="numeric"
          maxLength={6}
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
          placeholder="Enter PIN code"
          autoComplete="postal-code"
          className={`${inputClass} !py-2 !text-sm`}
        />
        <button type="submit" className="shrink-0 rounded-lg border border-primary/40 px-4 text-sm font-bold text-primary hover:bg-primary hover:text-white">
          Check
        </button>
      </form>
      <p className="mt-2 min-h-5 text-sm" role="status">
        {error ? (
          <span className="text-red-600">{error}</span>
        ) : estimate ? (
          <span className="text-ink-900">
            To {pincode}: <strong>{estimate.min} to {estimate.max} working days</strong> after dispatch{estimate.remote ? ' (remote area)' : ''}.
          </span>
        ) : (
          <span className="text-ink-500">Enter your PIN code to see the delivery time.</span>
        )}
      </p>
    </div>
  )
}

// Main photo with a magnifier that follows the mouse (desktop only).
function Gallery({ product }) {
  const images = product.images || []
  const [index, setIndex] = useState(0)
  const [zoom, setZoom] = useState(null)
  const src = images[index] || null
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row">
      {images.length > 1 && (
        <ul className="flex gap-2 sm:w-16 sm:flex-col">
          {images.map((img, i) => (
            <li key={img} className="w-16 sm:w-auto">
              <button
                type="button"
                onMouseEnter={() => setIndex(i)}
                onClick={() => setIndex(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-pressed={i === index}
                className={`block w-full overflow-hidden rounded-lg border-2 transition-colors ${i === index ? 'border-gold-dark' : 'border-ink-300/60 hover:border-primary/50'}`}
              >
                <img src={img} alt="" loading="lazy" className="aspect-square w-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div
        className={`relative min-w-0 flex-1 overflow-hidden rounded-xl border border-ink-300/60 ${src ? 'lg:cursor-zoom-in' : ''}`}
        onMouseMove={src ? onMove : undefined}
        onMouseLeave={() => setZoom(null)}
      >
        <ProductImage product={product} src={src} ratio="aspect-square" iconSize="h-28 w-28" eager />
        {src && zoom && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden bg-no-repeat lg:block"
            style={{ backgroundImage: `url(${src})`, backgroundSize: '220%', backgroundPosition: `${zoom.x}% ${zoom.y}%` }}
          />
        )}
      </div>
    </div>
  )
}

export default function ProductPage() {
  const { slug } = useParams()
  const { ready, products, categories, config, add, requestQuote, wishlist, toggleWish, recent, addRecent } = useShop()
  const navigate = useNavigate()
  const product = products.find((p) => p.slug === slug) || null
  const category = categories.find((c) => c.slug === product?.category) || null
  const orderable = isOrderable(product)
  const min = Math.max(1, product?.min_order_qty || 1)
  const [qty, setQty] = useState(min)

  useEffect(() => {
    setQty(min)
  }, [slug, min])

  useEffect(() => {
    if (product) {
      track.viewItem(product)
      addRecent(product.id)
    }
    // one event per product viewed
  }, [product?.id]) // eslint-disable-line

  // Phones show a fixed buy bar: lift the floating call / WhatsApp / chat buttons above it (see index.css).
  const hasProduct = Boolean(product)
  useEffect(() => {
    if (!hasProduct) return
    document.body.dataset.buyBar = 'true'
    return () => {
      delete document.body.dataset.buyBar
    }
  }, [hasProduct])

  const related = useMemo(
    () => (product ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 10) : []),
    [products, product]
  )

  const schema = useMemo(() => {
    if (!product) return null
    const url = `${SITE}/p/${product.slug}`
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
            ...(category ? [{ '@type': 'ListItem', position: 2, name: category.name, item: `${SITE}/c/${category.slug}` }] : []),
            { '@type': 'ListItem', position: category ? 3 : 2, name: product.name, item: url },
          ],
        },
        {
          '@type': 'Product',
          name: product.name,
          sku: product.sku,
          description: product.seo_description || product.short_description,
          brand: { '@type': 'Brand', name: product.brand || 'Prosper Infotech' },
          category: category?.name,
          ...(product.images?.length ? { image: product.images.map(abs) } : {}),
          ...(hasPrice(product)
            ? {
                offers: {
                  '@type': 'Offer',
                  url,
                  priceCurrency: 'INR',
                  price: (product.price_paise / 100).toFixed(2),
                  availability: orderable ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
                  itemCondition: 'https://schema.org/NewCondition',
                  seller: { '@type': 'Organization', name: 'Prosper Infotech' },
                },
              }
            : {}),
        },
      ],
    }
  }, [product, category, orderable])

  useDocumentTitle(
    product ? product.seo_title || `${product.name} | Prosper Infotech Shop` : 'Product | Prosper Infotech Shop',
    product ? product.seo_description || `${product.name}: ${product.short_description} Price includes GST. Delivery across India.` : undefined,
    schema,
    { noindex: ready && !product }
  )

  if (!ready) return <PageLoading label="Loading product" />
  if (!product) {
    return (
      <EmptyState
        icon={PackageSearch}
        title="We could not find that product"
        text="It may have been removed or renamed."
        action={
          <Link to="/c/all" className={btn.gold}>
            Browse all products
          </Link>
        }
      />
    )
  }

  const buyNow = () => {
    if (add(product, qty, { open: false })) navigate('/checkout')
  }
  const whatsapp = `https://wa.me/${config.whatsapp_number}?text=${encodeURIComponent(`Hi, I have a question about ${product.name} (${product.sku}) on your shop.`)}`

  const priced = hasPrice(product)
  const saving = priced && product.mrp_paise > product.price_paise ? Math.round((1 - product.price_paise / product.mrp_paise) * 100) : 0
  const wished = wishlist.includes(product.id)
  const viewed = recent.filter((id) => id !== product.id).map((id) => products.find((p) => p.id === id)).filter(Boolean)
  const panel = 'rounded-2xl bg-white shadow-[0_1px_3px_rgba(20,52,109,0.08)]'
  const highlights = [
    ...(product.specs || []).slice(0, 4).map((s) => `${s.label}: ${s.value}`),
    'GST invoice with every order',
  ]

  return (
    <div className="mx-auto max-w-[1400px] px-2 pb-28 pt-3 sm:px-4 sm:pt-4 lg:pb-10">
      <div className={`${panel} px-4 py-3 sm:px-6`}>
        <Crumbs items={[{ label: 'Home', to: '/' }, ...(category ? [{ label: category.name, to: `/c/${category.slug}` }] : []), { label: product.name }]} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_340px]">
        <div className={`${panel} self-start p-3 sm:p-5 lg:sticky lg:top-32`}>
          <Gallery key={product.id} product={product} />
        </div>

        <div className={`${panel} p-5 sm:p-6`}>
          {product.brand && <p className="text-xs font-bold uppercase tracking-widest text-gold-dark">{product.brand}</p>}
          <h1 className="mt-1 text-2xl font-extrabold leading-tight md:text-[28px]">{product.name}</h1>
          <p className="mt-1 text-xs text-ink-500">SKU: {product.sku}</p>
          <p className="mt-3 text-[15px] text-ink-600">{product.short_description}</p>

          <div className="mt-4 border-y border-ink-300/60 py-4">
            {priced ? (
              <>
                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  {saving > 0 && <span className="text-2xl font-bold text-[#c62828]">-{saving}%</span>}
                  <span className="font-heading text-[34px] font-extrabold leading-none text-ink-900">{formatINR(product.price_paise)}</span>
                </p>
                {saving > 0 && (
                  <p className="mt-1 text-sm text-ink-500">
                    MRP <span className="line-through">{formatINR(product.mrp_paise)}</span> · You save {formatINR(product.mrp_paise - product.price_paise)}
                  </p>
                )}
                <p className="mt-1 text-sm text-ink-600">Inclusive of all taxes (GST {product.gst_percent}%)</p>
              </>
            ) : (
              <>
                <p className="font-heading text-2xl font-extrabold text-primary">Price on request</p>
                <p className="mt-1 text-sm text-ink-600">Sold by quote. We reply with price and delivery time within one business day.</p>
              </>
            )}
          </div>

          <h2 className="mt-5 text-base">Highlights</h2>
          <ul className="mt-2 flex flex-col gap-2">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-ink-900">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#2e7d32]" />
                {h}
              </li>
            ))}
          </ul>

          <ul className="mt-5 grid grid-cols-3 gap-2 border-t border-ink-300/60 pt-5 text-center text-xs font-semibold text-ink-900">
            <li className="flex flex-col items-center gap-1.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-alt text-primary"><Truck className="h-5 w-5" /></span>
              <Link to="/shipping-policy" className="hover:text-primary hover:underline">{config.free_shipping_threshold_paise ? `Free delivery above ${formatINR(config.free_shipping_threshold_paise)}` : 'Tracked delivery'}</Link>
            </li>
            <li className="flex flex-col items-center gap-1.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-alt text-primary"><ShieldCheck className="h-5 w-5" /></span>
              <Link to="/warranty" className="hover:text-primary hover:underline">Warranty covered</Link>
            </li>
            <li className="flex flex-col items-center gap-1.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-alt text-primary"><RotateCcw className="h-5 w-5" /></span>
              <Link to="/returns-refunds" className="hover:text-primary hover:underline">Easy replacement</Link>
            </li>
          </ul>
        </div>

        {/* Buy box */}
        <aside className={`${panel} self-start p-5 lg:col-span-2 xl:sticky xl:top-32 xl:col-span-1`}>
          {priced && <p className="font-heading text-2xl font-extrabold text-ink-900">{formatINR(product.price_paise * (orderable ? qty : 1))}</p>}
          <p className={`mt-1 text-base font-bold ${orderable ? 'text-[#2e7d32]' : priced ? 'text-[#c62828]' : 'text-primary'}`}>
            {orderable ? (product.stock_qty <= 5 ? `Only ${product.stock_qty} left in stock` : 'In stock') : priced ? 'Currently out of stock' : 'Available on quote'}
          </p>

          <div className="mt-4">
            <DeliveryCheck />
          </div>

          {orderable ? (
            <>
              <div className="mt-3 flex items-center gap-3">
                <span className="text-sm font-semibold text-ink-900">Quantity</span>
                <QtyStepper size="sm" value={qty} min={min} max={product.stock_qty} onChange={setQty} />
                {min > 1 && <span className="text-xs text-ink-500">Min. {min}</span>}
              </div>
              <div className="mt-4 flex flex-col gap-2.5">
                <button type="button" onClick={() => add(product, qty)} className={`${btn.gold} w-full !rounded-full !py-3`}>
                  <ShoppingCart className="h-5 w-5" />
                  Add to cart
                </button>
                <button type="button" onClick={buyNow} className={`${btn.navy} w-full !rounded-full !py-3`}>
                  <Zap className="h-5 w-5" />
                  Buy now
                </button>
              </div>
            </>
          ) : (
            <button type="button" onClick={() => requestQuote(product.name)} className={`${btn.gold} mt-4 w-full !rounded-full !py-3`}>
              {priced ? 'Ask when it is back' : 'Request price'}
              <ArrowRight className="h-5 w-5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => toggleWish(product.id)}
            aria-pressed={wished}
            className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-full border border-ink-300 py-2.5 text-sm font-bold text-ink-900 transition-colors hover:border-primary hover:text-primary"
          >
            <Heart className={`h-4 w-4 ${wished ? 'fill-red-500 text-red-500' : ''}`} />
            {wished ? 'Saved to wishlist' : 'Add to wishlist'}
          </button>

          <p className="mt-4 flex items-center gap-2 text-xs text-ink-600">
            <Lock className="h-4 w-4 shrink-0 text-ink-500" />
            Secure checkout. Pay online, by UPI or bank transfer.
          </p>
          <div className="mt-3 flex flex-col gap-2 border-t border-ink-300/60 pt-3 text-sm">
            <button type="button" onClick={() => requestQuote(`${product.name} (bulk order)`)} className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline">
              <FileText className="h-4 w-4" />
              Buying in bulk? Request a quote
            </button>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => window.gtag?.('event', 'click_whatsapp', { event_category: 'Online Shop' })} className="inline-flex items-center gap-1.5 font-bold text-[#128C4A] hover:underline">
              <MessageCircle className="h-4 w-4" />
              Ask a question on WhatsApp
            </a>
          </div>
        </aside>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <section aria-labelledby="specs-heading" className={`${panel} p-5 sm:p-6`}>
          <h2 id="specs-heading" className="text-xl">Specifications</h2>
          {product.specs?.length ? (
            <dl className="mt-4 overflow-hidden rounded-xl border border-ink-300/60">
              {product.specs.map((spec, i) => (
                <div key={spec.label} className={`grid grid-cols-[minmax(110px,1fr)_2fr] gap-4 px-4 py-3 text-sm ${i % 2 ? '' : 'bg-[#f6f7fb]'}`}>
                  <dt className="font-semibold text-ink-600">{spec.label}</dt>
                  <dd className="text-ink-900">{spec.value}</dd>
                </div>
              ))}
              {product.hsn_code && (
                <div className={`grid grid-cols-[minmax(110px,1fr)_2fr] gap-4 px-4 py-3 text-sm ${product.specs.length % 2 ? '' : 'bg-[#f6f7fb]'}`}>
                  <dt className="font-semibold text-ink-600">HSN code</dt>
                  <dd className="text-ink-900">{product.hsn_code} (GST {product.gst_percent}%)</dd>
                </div>
              )}
            </dl>
          ) : (
            <p className="mt-3 text-ink-600">Ask us for the full specification sheet.</p>
          )}
          <p className="mt-3 text-xs text-ink-500">Specifications shown are typical. We confirm the exact model before dispatch.</p>
          {product.datasheet_url && (
            <a href={product.datasheet_url} target="_blank" rel="noopener noreferrer" className={`${btn.ghost} mt-4`}>
              <Download className="h-4 w-4" />
              Download datasheet
            </a>
          )}
        </section>

        <section aria-labelledby="about-heading" className={`${panel} p-5 sm:p-6`}>
          <h2 id="about-heading" className="text-xl">About this product</h2>
          <div className="mt-4 flex flex-col gap-3 text-[15px] text-ink-600">
            {(product.long_description || product.short_description).split(/\n{2,}/).map((para) => (
              <p key={para} className="whitespace-pre-line leading-relaxed">{para}</p>
            ))}
            <p className="leading-relaxed">
              Works with{' '}
              <a href={`${COMPANY_URL}/products/software/asset-tracking`} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline decoration-gold-dark decoration-2 underline-offset-4">Prosper Asset Tracking</a>
              . Need it installed? Our{' '}
              <a href={`${COMPANY_URL}/services/rfid-services`} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline decoration-gold-dark decoration-2 underline-offset-4">RFID services team</a>{' '}
              plans, installs and supports the full system.
            </p>
          </div>
        </section>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <ProductRow title={`More in ${category?.name || 'the shop'}`} products={related} viewAllTo={category ? `/c/${category.slug}` : '/c/all'} />
        <ProductRow title="Recently viewed" products={viewed} />
      </div>

      {/* Fixed buy bar on phones */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-300/70 bg-white px-3 py-2.5 shadow-[0_-8px_24px_-12px_rgba(20,52,109,0.35)] lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-2">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] text-ink-500">{product.name}</p>
            <p className="font-heading text-lg font-extrabold leading-tight text-ink-900">{priced ? formatINR(product.price_paise * (orderable ? qty : 1)) : 'On request'}</p>
          </div>
          {orderable ? (
            <>
              <button type="button" onClick={() => add(product, qty)} className={`${btn.gold} shrink-0 !px-4`}>
                <ShoppingCart className="h-4 w-4" />
                Add
              </button>
              <button type="button" onClick={buyNow} className={`${btn.navy} shrink-0 !px-4`}>
                Buy now
              </button>
            </>
          ) : (
            <button type="button" onClick={() => requestQuote(product.name)} className={`${btn.gold} shrink-0`}>
              {priced ? 'Notify me' : 'Request price'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
