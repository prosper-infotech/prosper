import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Download, FileText, Heart, MessageCircle, PackageSearch, RotateCcw, ShieldCheck, ShoppingBag, Truck } from 'lucide-react'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { useShop } from '../../shop/shopContext'
import ProductRow from '../../shop/components/ProductRow'
import { Crumbs, EmptyState, PageLoading, ProductImage, QtyStepper } from '../../shop/components/ui'
import { btn } from '../../shop/format'
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

// Photos: a two-column grid when there are several (like Myntra), one large photo otherwise.
function Gallery({ product }) {
  const images = product.images || []
  if (images.length > 1) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {images.map((src) => (
          <div key={src} className="overflow-hidden">
            <img src={src} alt={product.name} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-500 hover:scale-105" />
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="overflow-hidden">
      <ProductImage product={product} ratio="aspect-[4/5] sm:aspect-square" iconSize="h-24 w-24" eager />
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
  const promises = [
    { icon: FileText, text: 'GST invoice with every order' },
    { icon: Truck, text: config.free_shipping_threshold_paise ? `Free delivery on orders above ${formatINR(config.free_shipping_threshold_paise)}` : 'Tracked courier delivery across India', to: '/shipping-policy' },
    { icon: RotateCcw, text: 'Replacement if it arrives damaged or wrong', to: '/returns-refunds' },
    { icon: ShieldCheck, text: 'Covered by manufacturer warranty', to: '/warranty' },
  ]
  const heading = 'text-sm font-extrabold uppercase tracking-[0.15em] !text-ink-900'

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-28 pt-5 lg:px-8 lg:pb-14">
      <Crumbs items={[{ label: 'Home', to: '/' }, ...(category ? [{ label: category.name, to: `/c/${category.slug}` }] : []), { label: product.name }]} />

      <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-12">
        <Gallery key={product.id} product={product} />

        <div>
          <p className="text-xl font-bold text-ink-900 md:text-2xl">{product.brand || 'Prosper Infotech'}</p>
          <h1 className="mt-1 text-lg font-normal !text-[#535766] md:text-xl">{product.name}</h1>
          <p className="mt-1 text-xs text-[#94969f]">SKU {product.sku}</p>

          <div className="mt-4 border-t border-[#eaeaec] pt-4">
            {priced ? (
              <>
                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-2xl font-bold text-ink-900">{formatINR(product.price_paise)}</span>
                  {saving > 0 && <span className="text-lg text-[#535766]">MRP <span className="line-through">{formatINR(product.mrp_paise)}</span></span>}
                  {saving > 0 && <span className="text-lg font-bold text-[#ff905a]">({saving}% OFF)</span>}
                </p>
                <p className="mt-1 text-sm font-bold text-[#03a685]">Inclusive of all taxes</p>
              </>
            ) : (
              <>
                <p className="text-2xl font-bold text-ink-900">Price on request</p>
                <p className="mt-1 text-sm text-[#535766]">Sold by quote. We reply with price and delivery time within one business day.</p>
              </>
            )}
            <p className={`mt-2 text-sm font-bold ${orderable ? (product.stock_qty <= 5 ? 'text-[#ff905a]' : 'text-[#03a685]') : 'text-[#535766]'}`}>
              {orderable ? (product.stock_qty <= 5 ? `Only ${product.stock_qty} left` : 'In stock') : priced ? 'Out of stock' : 'Available on quote'}
            </p>
          </div>

          {orderable && (
            <div className="mt-6">
              <p className={heading}>
                Quantity {min > 1 && <span className="ml-1 text-xs font-normal normal-case tracking-normal text-[#94969f]">(minimum {min})</span>}
              </p>
              <div className="mt-3">
                <QtyStepper value={qty} min={min} max={product.stock_qty} onChange={setQty} />
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            {orderable ? (
              <button type="button" onClick={() => add(product, qty)} className={`${btn.navy} flex-[2] !py-4 !text-sm`}>
                <ShoppingBag className="h-5 w-5" />
                Add to cart
              </button>
            ) : (
              <button type="button" onClick={() => requestQuote(product.name)} className={`${btn.navy} flex-[2] !py-4 !text-sm`}>
                {priced ? 'Notify me' : 'Request price'}
              </button>
            )}
            <button type="button" onClick={() => toggleWish(product.id)} aria-pressed={wished} className={`${btn.ghost} flex-1 !py-4 !text-sm`}>
              <Heart className={`h-5 w-5 ${wished ? 'fill-[#ff3f6c] text-[#ff3f6c]' : ''}`} />
              {wished ? 'Wishlisted' : 'Wishlist'}
            </button>
          </div>
          {orderable && (
            <button type="button" onClick={buyNow} className="mt-3 w-full rounded-md border border-gold bg-gold/15 py-3 text-[13px] font-bold uppercase tracking-wider text-primary transition-colors hover:bg-gold">
              Buy now
            </button>
          )}

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

          <div className="mt-8 border-t border-[#eaeaec] pt-6">
            <h2 className={heading}>Product details</h2>
            <div className="mt-3 flex flex-col gap-3 text-[15px] leading-relaxed text-ink-900">
              {(product.long_description || product.short_description).split(/\n{2,}/).map((para) => (
                <p key={para} className="whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>

            {product.specs?.length > 0 && (
              <>
                <h3 className="mt-6 text-sm font-bold text-ink-900">Specifications</h3>
                <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-4">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="border-b border-[#eaeaec] pb-2">
                      <dt className="text-xs text-[#7e818c]">{spec.label}</dt>
                      <dd className="mt-0.5 text-sm text-ink-900">{spec.value}</dd>
                    </div>
                  ))}
                  {product.hsn_code && (
                    <div className="border-b border-[#eaeaec] pb-2">
                      <dt className="text-xs text-[#7e818c]">HSN code</dt>
                      <dd className="mt-0.5 text-sm text-ink-900">
                        {product.hsn_code} (GST {product.gst_percent}%)
                      </dd>
                    </div>
                  )}
                </dl>
              </>
            )}
            <p className="mt-4 text-xs text-[#94969f]">Specifications shown are typical. We confirm the exact model before dispatch.</p>
            {product.datasheet_url && (
              <a href={product.datasheet_url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                <Download className="h-4 w-4" />
                Download datasheet
              </a>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-[#eaeaec] pt-6 text-sm">
            <button type="button" onClick={() => requestQuote(`${product.name} (bulk order)`)} className="inline-flex items-center gap-2 self-start font-bold text-primary hover:underline">
              <FileText className="h-4 w-4" />
              Buying in bulk? Request a quantity price
            </button>
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
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-14">
        <ProductRow title="Similar products" products={related} viewAllTo={category ? `/c/${category.slug}` : '/c/all'} />
        <ProductRow title="Recently viewed" products={viewed} />
      </div>

      {/* Fixed buy bar on phones */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.6fr] border-t border-[#eaeaec] bg-white lg:hidden">
        <button type="button" onClick={() => toggleWish(product.id)} aria-pressed={wished} className="flex items-center justify-center gap-2 py-4 text-[13px] font-bold uppercase tracking-wider text-ink-900">
          <Heart className={`h-5 w-5 ${wished ? 'fill-[#ff3f6c] text-[#ff3f6c]' : ''}`} />
          Wishlist
        </button>
        {orderable ? (
          <button type="button" onClick={() => add(product, qty)} className="flex items-center justify-center gap-2 bg-primary py-4 text-[13px] font-bold uppercase tracking-wider text-white">
            <ShoppingBag className="h-5 w-5" />
            Add to cart
          </button>
        ) : (
          <button type="button" onClick={() => requestQuote(product.name)} className="bg-primary py-4 text-[13px] font-bold uppercase tracking-wider text-white">
            {priced ? 'Notify me' : 'Request price'}
          </button>
        )}
      </div>
    </div>
  )
}
