import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { PackageSearch, SlidersHorizontal, X } from 'lucide-react'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { useShop } from '../../shop/shopContext'
import ProductCard from '../../shop/components/ProductCard'
import { Crumbs, EmptyState, PageLoading } from '../../shop/components/ui'
import { btn, inputClass } from '../../shop/format'
import { track } from '../../shop/track'
import { SITE_URL } from '../../shop/site'
import { hasPrice, isOrderable } from '../../../shared/pricing.js'

const PAGE = 16
const SORTS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'newest', label: 'Newest' },
  { value: 'name', label: 'Name: A to Z' },
]

export default function ShopListing() {
  const { category: slug = 'all' } = useParams()
  const { ready, products, categories, requestQuote } = useShop()
  const [params, setParams] = useSearchParams()
  const [shown, setShown] = useState(PAGE)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const category = categories.find((c) => c.slug === slug) || null
  const isAll = slug === 'all'
  const q = params.get('q') || ''
  const sort = SORTS.some((s) => s.value === params.get('sort')) ? params.get('sort') : 'featured'
  const inStock = params.get('stock') === '1'
  const min = params.get('min') || ''
  const max = params.get('max') || ''
  const brandParam = params.get('brand') || ''
  const brands = useMemo(() => brandParam.split(',').filter(Boolean), [brandParam])

  const set = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
    setShown(PAGE)
  }

  const inCategory = useMemo(() => (isAll ? products : products.filter((p) => p.category === slug)), [products, slug, isAll])
  const allBrands = useMemo(() => [...new Set(inCategory.map((p) => p.brand).filter(Boolean))].sort(), [inCategory])

  const results = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean)
    const minP = min ? Number(min) * 100 : null
    const maxP = max ? Number(max) * 100 : null
    const list = inCategory.filter((p) => {
      if (words.length) {
        const hay = `${p.name} ${p.sku} ${p.brand || ''} ${p.short_description || ''} ${(p.specs || []).map((s) => s.value).join(' ')}`.toLowerCase()
        if (!words.every((w) => hay.includes(w))) return false
      }
      if (brands.length && !brands.includes(p.brand)) return false
      if (inStock && !isOrderable(p)) return false
      if ((minP !== null || maxP !== null) && !hasPrice(p)) return false
      if (minP !== null && p.price_paise < minP) return false
      if (maxP !== null && p.price_paise > maxP) return false
      return true
    })
    const priceOf = (p, missing) => (hasPrice(p) ? p.price_paise : missing)
    const sorters = {
      featured: (a, b) => Number(b.is_featured) - Number(a.is_featured) || Number(isOrderable(b)) - Number(isOrderable(a)) || a.name.localeCompare(b.name),
      'price-asc': (a, b) => priceOf(a, Infinity) - priceOf(b, Infinity) || a.name.localeCompare(b.name),
      'price-desc': (a, b) => priceOf(b, -1) - priceOf(a, -1) || a.name.localeCompare(b.name),
      newest: (a, b) => String(b.updated_at || '').localeCompare(String(a.updated_at || '')) || a.name.localeCompare(b.name),
      name: (a, b) => a.name.localeCompare(b.name),
    }
    return [...list].sort(sorters[sort])
  }, [inCategory, q, brands, inStock, min, max, sort])

  const title = isAll ? 'All Products' : category?.name || 'Shop'
  const schema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: title, item: `${SITE_URL}/c/${slug}` },
      ],
    }),
    [title, slug]
  )
  const missing = ready && !isAll && !category
  useDocumentTitle(
    `${title} | Prosper Infotech Shop`,
    category?.description || 'Browse RFID tags, readers, antennas, barcode scanners and label printers. Prices include GST, delivery across India.',
    missing ? null : schema,
    { noindex: missing || Boolean(q) }
  )

  const key = results.map((p) => p.id).join(',')
  useEffect(() => {
    if (results.length) track.viewItemList(title, results)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, title])

  if (!ready) return <PageLoading label="Loading products" />
  if (missing) {
    return (
      <EmptyState
        icon={PackageSearch}
        title="We could not find that category"
        text="It may have been renamed. Browse all products instead."
        action={
          <Link to="/c/all" className={btn.gold}>
            View all products
          </Link>
        }
      />
    )
  }

  const active = Boolean(q || brands.length || inStock || min || max)
  const filters = (
    <div className="flex flex-col gap-7">
      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-ink-500">Category</h3>
        <ul className="flex flex-col gap-1">
          {[{ slug: 'all', name: 'All products' }, ...categories.filter((c) => products.some((p) => p.category === c.slug))].map((c) => (
            <li key={c.slug}>
              <Link
                to={`/c/${c.slug}${q ? `?q=${encodeURIComponent(q)}` : ''}`}
                onClick={() => setShown(PAGE)}
                aria-current={c.slug === slug ? 'page' : undefined}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${c.slug === slug ? 'bg-primary font-bold text-white' : 'text-ink-900 hover:bg-primary/5 hover:text-primary'}`}
              >
                {c.name}
                <span className={`text-xs ${c.slug === slug ? 'text-white/80' : 'text-ink-500'}`}>
                  {c.slug === 'all' ? products.length : products.filter((p) => p.category === c.slug).length}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {allBrands.length > 1 && (
        <fieldset>
          <legend className="mb-3 text-sm font-bold uppercase tracking-wider text-ink-500">Brand</legend>
          <div className="flex flex-col gap-2">
            {allBrands.map((b) => (
              <label key={b} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-900">
                <input
                  type="checkbox"
                  checked={brands.includes(b)}
                  onChange={(e) => set('brand', (e.target.checked ? [...brands, b] : brands.filter((x) => x !== b)).join(','))}
                  className="h-4 w-4 rounded accent-primary"
                />
                {b}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend className="mb-3 text-sm font-bold uppercase tracking-wider text-ink-500">Price (₹, incl. GST)</legend>
        <div className="flex items-center gap-2">
          <input type="number" inputMode="numeric" min="0" value={min} onChange={(e) => set('min', e.target.value)} placeholder="Min" aria-label="Minimum price" className={`${inputClass} !py-2 !text-sm`} />
          <span className="text-ink-500">to</span>
          <input type="number" inputMode="numeric" min="0" value={max} onChange={(e) => set('max', e.target.value)} placeholder="Max" aria-label="Maximum price" className={`${inputClass} !py-2 !text-sm`} />
        </div>
      </fieldset>

      <label className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold text-ink-900">
        <input type="checkbox" checked={inStock} onChange={(e) => set('stock', e.target.checked ? '1' : '')} className="h-4 w-4 rounded accent-primary" />
        In stock, ready to order
      </label>

      {active && (
        <button type="button" onClick={() => { setParams({}, { replace: true }); setShown(PAGE) }} className="self-start text-sm font-bold text-primary underline decoration-gold-dark decoration-2 underline-offset-4">
          Clear all filters
        </button>
      )}
    </div>
  )

  const chips = [
    q && { label: `"${q}"`, clear: () => set('q', '') },
    ...brands.map((b) => ({ label: b, clear: () => set('brand', brands.filter((x) => x !== b).join(',')) })),
    inStock && { label: 'In stock', clear: () => set('stock', '') },
    (min || max) && {
      label: `₹${min || 0} to ${max ? `₹${max}` : 'any'}`,
      clear: () => {
        const next = new URLSearchParams(params)
        next.delete('min')
        next.delete('max')
        setParams(next, { replace: true })
      },
    },
  ].filter(Boolean)
  const panel = 'rounded-2xl bg-white shadow-[0_1px_3px_rgba(20,52,109,0.08)]'

  return (
    <div className="mx-auto max-w-[1400px] px-2 pb-10 pt-3 sm:px-4 sm:pt-4">
      <header className={`${panel} px-4 py-4 sm:px-6`}>
        <Crumbs items={[{ label: 'Home', to: '/' }, { label: title }]} />
        <div className="mt-2 flex flex-wrap items-baseline gap-x-3">
          <h1 className="text-2xl font-extrabold md:text-3xl">{title}</h1>
          <p className="text-sm text-ink-500" role="status">
            {results.length} product{results.length === 1 ? '' : 's'}
            {q ? ` for "${q}"` : ''}
          </p>
        </div>
        <p className="mt-1 max-w-3xl text-sm text-ink-600">
          {category?.description || 'Every product in the shop. Prices include GST. Products without a price are quoted within one business day.'}
        </p>
      </header>

      <div className="mt-4 grid gap-4 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className={`${panel} sticky top-32 p-5`}>
            <h2 className="mb-4 border-b border-ink-300/60 pb-3 text-lg">Filters</h2>
            {filters}
          </div>
        </aside>

        <div className={`${panel} min-w-0 p-3 sm:p-4`}>
          <div className="flex flex-wrap items-center gap-x-1 gap-y-2 border-b border-ink-300/60 pb-3">
            <span className="mr-2 hidden text-sm font-bold text-ink-900 md:inline">Sort by</span>
            <div className="hidden flex-wrap gap-1 md:flex" role="group" aria-label="Sort products">
              {SORTS.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => set('sort', s.value === 'featured' ? '' : s.value)}
                  aria-pressed={sort === s.value}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${sort === s.value ? 'bg-primary text-white' : 'text-ink-600 hover:bg-primary/5 hover:text-primary'}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="flex w-full gap-2 md:hidden">
              <button type="button" onClick={() => setFiltersOpen((v) => !v)} aria-expanded={filtersOpen} className={`${btn.ghost} flex-1 !py-2.5 lg:hidden`}>
                <SlidersHorizontal className="h-4 w-4" />
                Filters{chips.length ? ` (${chips.length})` : ''}
              </button>
              <label htmlFor="listing-sort" className="sr-only">
                Sort products
              </label>
              <select id="listing-sort" value={sort} onChange={(e) => set('sort', e.target.value === 'featured' ? '' : e.target.value)} className={`${inputClass} flex-1 !py-2.5`}>
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <button type="button" onClick={() => setFiltersOpen((v) => !v)} aria-expanded={filtersOpen} className={`${btn.ghost} ml-auto hidden !py-2 md:inline-flex lg:hidden`}>
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>

          {chips.length > 0 && (
            <ul className="mt-3 flex flex-wrap items-center gap-2" aria-label="Active filters">
              {chips.map((chip) => (
                <li key={chip.label}>
                  <button type="button" onClick={chip.clear} aria-label={`Remove filter ${chip.label}`} className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary hover:bg-primary/20">
                    {chip.label}
                    <X className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
              <li>
                <button type="button" onClick={() => { setParams({}, { replace: true }); setShown(PAGE) }} className="text-xs font-bold text-primary underline">
                  Clear all
                </button>
              </li>
            </ul>
          )}

          {filtersOpen && (
            <div className="mt-3 rounded-2xl border border-ink-300/70 bg-white p-5 lg:hidden">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg">Filters</h2>
                <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters" className="flex h-9 w-9 items-center justify-center rounded-full text-ink-600 hover:bg-surface-alt">
                  <X className="h-5 w-5" />
                </button>
              </div>
              {filters}
            </div>
          )}

          {results.length === 0 ? (
            <EmptyState
              icon={PackageSearch}
              title="No products match"
              text="Try a different word or clear the filters. If you cannot find what you need, we can source it for you."
              action={
                <div className="flex flex-wrap justify-center gap-3">
                  <button type="button" onClick={() => { setParams({}, { replace: true }); setShown(PAGE) }} className={btn.ghost}>
                    Clear filters
                  </button>
                  <button type="button" onClick={() => requestQuote(q ? `Looking for: ${q}` : 'Not sure, need guidance')} className={btn.gold}>
                    Ask us for it
                  </button>
                </div>
              }
            />
          ) : (
            <>
              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
                {results.slice(0, shown).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {results.length > shown && (
                <div className="mt-10 text-center">
                  <button type="button" onClick={() => setShown((n) => n + PAGE)} className={btn.navy}>
                    Load more ({results.length - shown} left)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
