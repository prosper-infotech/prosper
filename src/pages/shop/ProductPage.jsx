import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BadgeCheck, Boxes, Clock, CreditCard, Download, FileText, MessageCircle, PackageSearch, RotateCcw, ShieldCheck, ShoppingBag, Truck } from 'lucide-react'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { useShop } from '../../shop/shopContext'
import ProductRow from '../../shop/components/ProductRow'
import { Crumbs, EmptyState, PageLoading, ProductImage, QtyStepper } from '../../shop/components/ui'
import { btn } from '../../shop/format'
import { track } from '../../shop/track'
import { COMPANY_URL, SITE_URL } from '../../shop/site'
import { formatINR, gstIncluded, hasPrice, isOrderable } from '../../../shared/pricing.js'
import { api } from '../../shop/api'
import { deliveryEstimate, PINCODE_RE } from '../../../shared/india.js'
import { breadcrumbLd, productLd, productMeta } from '../../../shared/seo.js'

const SITE = SITE_URL

function DeliveryCheck() {
  const { config, pincode, setPincode } = useShop()
  const [pin, setPin] = useState(pincode)
  const [error, setError] = useState('')
  const estimate = deliveryEstimate(pincode, config)
  const check = (e) => {
    e.preventDefault()
    if (!PINCODE_RE.test(pin)) return setError('Please enter a valid 6-digit PIN code.')
    setError('')
    setPincode(pin)
  }
  return (
    <div>
      <h2 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.15em] !text-ink-900">
        Delivery options
        <Truck className="h-5 w-5 stroke-[1.5]" aria-hidden="true" />
      </h2>
      <form onSubmit={check} className="mt-3 flex max-w-[300px] items-center rounded-md border border-[#d4d5d9] focus-within:border-ink-900">
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
          className="h-11 min-w-0 flex-1 bg-transparent px-3 text-sm text-ink-900 focus:outline-none"
        />
        <button type="submit" className="px-4 text-sm font-bold text-primary">
          Check
        </button>
      </form>
      <p className="mt-2 min-h-5 text-xs text-[#696e79]" role="status">
        {error ? (
          <span className="text-[#ff5722]">{error}</span>
        ) : estimate ? (
          <>
            Delivery to <strong className="text-ink-900">{pincode}</strong> in {estimate.min} to {estimate.max} working days after dispatch{estimate.remote ? ' (remote area)' : ''}.
          </>
        ) : (
          'Enter your PIN code to check delivery time.'
        )}
      </p>
    </div>
  )
}

// Photos: thumbnails down the side and one large photo, like a store product page.
function Gallery({ product }) {
  const images = product.images || []
  const [active, setActive] = useState(0)
  if (images.length < 2) {
    return (
      <div className="overflow-hidden rounded-lg border border-[#eaeaec] bg-white p-4">
        <ProductImage product={product} ratio="aspect-square" iconSize="h-28 w-28" eager />
      </div>
    )
  }
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row">
      <ul className="flex gap-2 overflow-x-auto sm:w-20 sm:flex-col sm:overflow-visible">
        {images.map((src, i) => (
          <li key={src} className="shrink-0">
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === active ? 'true' : undefined}
              className={`block w-16 overflow-hidden rounded-md border-2 bg-white sm:w-20 ${i === active ? 'border-primary' : 'border-[#eaeaec] hover:border-[#c5c7cf]'}`}
            >
              <img src={src} alt="" loading="lazy" className="aspect-square w-full object-cover" />
            </button>
          </li>
        ))}
      </ul>
      <div className="flex-1 overflow-hidden rounded-lg border border-[#eaeaec] bg-white p-4">
        <ProductImage product={product} src={images[active]} ratio="aspect-square" eager />
      </div>
    </div>
  )
}

const PRESETS = [1, 5, 50, 100]
const RFID_FAMILY = ['tags-labels', 'readers-antennas', 'smart-cards-nfc', 'barcode-scanners', 'mobile-computers', 'printers-encoders']
const BADGES = [
  { icon: BadgeCheck, text: 'Genuine products' },
  { icon: FileText, text: 'GST invoice' },
  { icon: CreditCard, text: 'Secure payment' },
  { icon: ShieldCheck, text: 'Warranty support' },
]

// Description, specifications and delivery in tabs under the photo and buy box.
function DetailTabs({ product, config, loading }) {
  const [tab, setTab] = useState('description')
  const specs = [...(product.specs || []), ...(product.brand ? [{ label: 'Brand', value: product.brand }] : []), { label: 'SKU', value: product.sku }, ...(product.hsn_code ? [{ label: 'HSN code', value: `${product.hsn_code} (GST ${product.gst_percent}%)` }] : [{ label: 'GST', value: `${Number(product.gst_percent) || 18}% (included in price)` }])]
  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specs', label: 'Specifications' },
    { id: 'shipping', label: 'Shipping & returns' },
  ]
  // Our own launch products have only a short description; some have neither.
  const text = product.long_description || product.short_description || ''
  return (
    <section className="mt-12 rounded-lg border border-[#eaeaec] bg-white" aria-label="Product information">
      <div role="tablist" aria-label="Product information" className="flex overflow-x-auto border-b border-[#eaeaec]">
        {tabs.map((t) => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setTab(t.id)}
            className={`shrink-0 border-b-2 px-5 py-4 text-sm font-bold transition-colors md:px-8 ${tab === t.id ? 'border-primary text-primary' : 'border-transparent text-[#535766] hover:text-primary'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`} className="p-5 md:p-8">
        {tab === 'description' && (
          <div className="flex max-w-3xl flex-col gap-3 text-[15px] leading-relaxed text-ink-900">
            {text ? text.split(/\n{2,}/).map((para) => (
              <p key={para} className="whitespace-pre-line">
                {para}
              </p>
            )) : <p className="text-[#535766]">{loading ? 'Loading details…' : 'Full details for this product are coming soon. See the Specifications tab, or ask us on WhatsApp.'}</p>}
            {product.datasheet_url && (
              <a href={product.datasheet_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 self-start text-sm font-bold text-primary hover:underline">
                <Download className="h-4 w-4" />
                Download datasheet
              </a>
            )}
          </div>
        )}
        {tab === 'specs' && (
          <>
            <dl className="max-w-3xl overflow-hidden rounded-lg border border-[#eaeaec] text-sm">
              {specs.map((spec, i) => (
                <div key={spec.label} className={`grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] ${i ? 'border-t border-[#eaeaec]' : ''}`}>
                  <dt className="bg-[#f7f8fa] px-3 py-2.5 font-semibold text-[#535766]">{spec.label}</dt>
                  <dd className="px-3 py-2.5 text-ink-900">{spec.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-[#94969f]">Specifications shown are typical. We confirm the exact model before dispatch.</p>
          </>
        )}
        {tab === 'shipping' && (
          <ul className="flex max-w-3xl list-disc flex-col gap-2 pl-5 text-[15px] leading-relaxed text-ink-900">
            <li>In-stock items are dispatched in 1 to 2 working days by tracked courier, across India.</li>
            <li>{config.free_shipping_threshold_paise ? `Free delivery on orders above ${formatINR(config.free_shipping_threshold_paise)}; a small flat charge below that, shown in the cart.` : 'Delivery charges are shown in the cart before you pay.'}</li>
            <li>If an item arrives damaged or wrong, tell us within 48 hours with photos and we replace or refund it.</li>
            <li>
              Full details:{' '}
              <Link to="/shipping-policy" className="font-bold text-primary hover:underline">Shipping policy</Link>,{' '}
              <Link to="/returns-refunds" className="font-bold text-primary hover:underline">Returns & refunds</Link> and{' '}
              <Link to="/warranty" className="font-bold text-primary hover:underline">Warranty</Link>.
            </li>
          </ul>
        )}
      </div>
    </section>
  )
}

export default function ProductPage() {
  const { slug } = useParams()
  const { ready, products, categories, config, add, requestQuote, recent, addRecent } = useShop()
  const navigate = useNavigate()
  const listed = products.find((p) => p.slug === slug) || null
  const [detail, setDetail] = useState(null)
  const [detailFailed, setDetailFailed] = useState('')
  useEffect(() => {
    if (!listed || listed.long_description !== undefined) return undefined
    let live = true
    api(`/shop/product/${encodeURIComponent(listed.slug)}`)
      .then((full) => live && setDetail(full))
      .catch(() => live && setDetailFailed(listed.slug))
    return () => {
      live = false
    }
  }, [listed])
  const product = useMemo(() => (listed && detail?.slug === listed.slug ? { ...listed, ...detail } : listed), [listed, detail])
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
    const trail = [{ label: 'Home', href: '/' }, ...(category ? [{ label: category.name, href: `/c/${category.slug}` }] : []), { label: product.name, href: `/p/${product.slug}` }]
    const ld = productLd(product, category, config, SITE)
    return { '@context': 'https://schema.org', '@graph': [breadcrumbLd(trail, SITE), ...(ld ? [ld] : [])] }
  }, [product, category, config])
  const meta = product ? productMeta(product) : null

  useDocumentTitle(
    meta ? meta.title : 'Product | Prosper Infotech Shop',
    meta ? meta.description : undefined,
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
  const viewed = recent.filter((id) => id !== product.id).map((id) => products.find((p) => p.id === id)).filter(Boolean)
  const promises = [
    { icon: FileText, text: 'GST invoice with every order' },
    { icon: Truck, text: config.free_shipping_threshold_paise ? `Free delivery on orders above ${formatINR(config.free_shipping_threshold_paise)}` : 'Tracked courier delivery across India', to: '/shipping-policy' },
    { icon: RotateCcw, text: 'Replacement if it arrives damaged or wrong', to: '/returns-refunds' },
    { icon: ShieldCheck, text: 'Covered by manufacturer warranty', to: '/warranty' },
  ]
  const highlights = (product.specs || []).filter((x) => x.label !== 'Other options').slice(0, 5)
  const heading = 'text-sm font-extrabold uppercase tracking-[0.15em] !text-ink-900'
  const quoteName = qty > 1 ? `${product.name} (quantity ${qty})` : product.name

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-28 pt-5 lg:px-8 lg:pb-14">
      <Crumbs items={[{ label: 'Home', to: '/' }, ...(category ? [{ label: category.name, to: `/c/${category.slug}` }] : []), { label: product.name }]} />

      <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-12">
        <div className="self-start lg:sticky lg:top-[140px]">
          <Gallery key={product.id} product={product} />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-dark">{product.brand || 'Prosper Infotech'}</p>
          <h1 className="mt-1.5 text-xl font-extrabold leading-snug !text-primary md:text-[26px]">{product.name}</h1>
          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#7e818c]">
            <span>SKU: {product.sku}</span>
            {category && (
              <span>
                Category:{' '}
                <Link to={`/c/${category.slug}`} className="font-semibold text-primary hover:underline">
                  {category.name}
                </Link>
              </span>
            )}
          </p>

          {highlights.length > 0 && (
            <ul className="mt-4 flex flex-col gap-1.5 text-sm text-ink-900">
              {highlights.map((spec) => (
                <li key={spec.label} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-dark" aria-hidden="true" />
                  <span>
                    <span className="font-semibold">{spec.label}:</span> {spec.value}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 border-t border-[#eaeaec] pt-4">
            {priced ? (
              <>
                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-3xl font-extrabold text-primary">{formatINR(product.price_paise)}</span>
                  <span className="text-sm font-semibold text-[#535766]">incl. GST</span>
                  {saving > 0 && <span className="text-base text-[#7e818c]">MRP <span className="line-through">{formatINR(product.mrp_paise)}</span></span>}
                  {saving > 0 && <span className="rounded bg-[#d6262f] px-2 py-0.5 text-xs font-bold text-white">{saving}% off</span>}
                </p>
                {saving > 0 && <p className="mt-1 text-sm font-bold text-[#0f8a5f]">You save {formatINR(product.mrp_paise - product.price_paise)}</p>}
                <p className="mt-1 text-sm text-[#535766]">
                  {formatINR(product.price_paise - gstIncluded(product.price_paise, product.gst_percent))} + GST ({Number(product.gst_percent) || 0}%) · GST invoice included
                </p>
              </>
            ) : (
              <>
                <p className="text-2xl font-bold text-ink-900">Price on request</p>
                <p className="mt-1 text-sm text-[#535766]">Sold by quote. We reply with price and delivery time within one business day.</p>
              </>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span className={`font-bold ${orderable ? (product.stock_qty <= 5 ? 'text-[#d9480f]' : 'text-[#0f8a5f]') : 'text-[#535766]'}`}>
                {orderable ? (product.stock_qty <= 5 ? `Only ${product.stock_qty} left` : 'In stock') : priced ? 'Out of stock' : 'Available on quote'}
              </span>
              <span className="flex items-center gap-1.5 text-[#535766]">
                <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                {orderable ? 'Dispatched in 1 to 2 working days' : 'Dispatch time confirmed with your quote'}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <p className={heading}>
              Quantity {min > 1 && <span className="ml-1 text-xs font-normal normal-case tracking-normal text-[#94969f]">(minimum {min})</span>}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {PRESETS.filter((n) => n >= min && (!orderable || n <= product.stock_qty)).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setQty(n)}
                  aria-pressed={qty === n}
                  className={`h-11 min-w-12 rounded-md border px-3 text-sm font-bold transition-colors ${qty === n ? 'border-primary bg-primary text-white' : 'border-[#d4d5d9] bg-white text-ink-900 hover:border-primary'}`}
                >
                  {n}
                </button>
              ))}
              <QtyStepper value={qty} min={min} max={orderable ? product.stock_qty : 99999} onChange={setQty} />
            </div>
            {priced && qty > 1 && <p className="mt-2 text-sm text-[#535766]">Total for {qty}: <strong className="text-primary">{formatINR(product.price_paise * qty)}</strong> incl. GST</p>}
          </div>

          <div className="mt-6 flex gap-3">
            {orderable ? (
              <>
                <button type="button" onClick={() => add(product, qty)} className={`${btn.navy} flex-1 !py-4 !text-sm`}>
                  <ShoppingBag className="h-5 w-5" />
                  Add to cart
                </button>
                <button type="button" onClick={buyNow} className={`${btn.gold} flex-1 !py-4 !text-sm`}>
                  Buy now
                </button>
              </>
            ) : (
              <button type="button" onClick={() => requestQuote(quoteName)} className={`${btn.navy} w-full !py-4 !text-sm sm:w-auto sm:min-w-[280px]`}>
                {priced ? 'Notify me when back' : 'Request price'}
              </button>
            )}
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {BADGES.map(({ icon: Icon, text }) => (
              <li key={text} className="flex flex-col items-center gap-1.5 rounded-lg border border-[#eaeaec] bg-white px-2 py-3 text-center text-xs font-semibold text-ink-900">
                <Icon className="h-6 w-6 stroke-[1.5] text-primary" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3 rounded-lg border border-gold bg-surface-alt p-4 sm:flex-row sm:items-center">
            <Boxes className="h-9 w-9 shrink-0 text-primary" aria-hidden="true" />
            <div className="flex-1">
              <p className="font-bold text-primary">Need a larger quantity?</p>
              <p className="text-sm text-[#535766]">Get a bulk price for 50 units or more, with delivery to one or many sites.</p>
            </div>
            <Link to={`/bulk-order?product=${encodeURIComponent(product.slug)}&qty=${Math.max(qty, 50)}`} className={`${btn.navy} shrink-0`}>
              Bulk quote
            </Link>
          </div>

          <div className="mt-8 border-t border-[#eaeaec] pt-6">
            <DeliveryCheck />
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-ink-900">
              {promises.map(({ icon: Icon, text, to }) => (
                <li key={text} className="flex items-center gap-3">
                  <Icon className="h-5 w-5 shrink-0 stroke-[1.5] text-[#696e79]" aria-hidden="true" />
                  {to ? (
                    <Link to={to} className="hover:text-primary hover:underline">
                      {text}
                    </Link>
                  ) : (
                    text
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-[#eaeaec] pt-6 text-sm">
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => window.gtag?.('event', 'click_whatsapp', { event_category: 'Online Shop' })}
              className="inline-flex items-center gap-2 self-start font-bold text-[#128C4A] hover:underline"
            >
              <MessageCircle className="h-4 w-4" />
              Ask a question on WhatsApp
            </a>
            {RFID_FAMILY.includes(product.category) && (
            <p className="text-[#696e79]">
              Works with{' '}
              <a href={`${COMPANY_URL}/products/software/asset-tracking`} target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">
                Prosper Asset Tracking
              </a>
              . Need it installed? Our{' '}
              <a href={`${COMPANY_URL}/services/rfid-services`} target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">
                RFID services team
              </a>{' '}
              can help.
            </p>
            )}
          </div>
        </div>
      </div>

      <DetailTabs product={product} config={config} loading={product.long_description === undefined && detailFailed !== product.slug} />

      <div className="mt-16 flex flex-col gap-14">
        <ProductRow title="Similar products" products={related} viewAllTo={category ? `/c/${category.slug}` : '/c/all'} />
        <ProductRow title="Recently viewed" products={viewed} />
      </div>

      {/* Fixed buy bar on phones */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-[#eaeaec] bg-white lg:hidden">
        {orderable ? (
          <>
            <button type="button" onClick={buyNow} className="flex-1 py-4 text-[13px] font-bold uppercase tracking-wider text-ink-900">
              Buy now
            </button>
            <button type="button" onClick={() => add(product, qty)} className="flex flex-1 items-center justify-center gap-2 bg-primary py-4 text-[13px] font-bold uppercase tracking-wider text-white">
              <ShoppingBag className="h-5 w-5" />
              Add to cart
            </button>
          </>
        ) : (
          <button type="button" onClick={() => requestQuote(quoteName)} className="flex-1 bg-primary py-4 text-[13px] font-bold uppercase tracking-wider text-white">
            {priced ? 'Notify me when back' : 'Request price'}
          </button>
        )}
      </div>
    </div>
  )
}
