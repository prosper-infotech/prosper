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
import { categoryMeta } from '../../../shared/seo.js'
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
  const seo = categoryMeta(slug, category)
  useDocumentTitle(
    seo.title,
    seo.description,
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

  const clearAll = () => {
    setParams({}, { replace: true })
    setShown(PAGE)
  }
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
  const heading = 'mb-3 text-xs font-extrabold uppercase tracking-[0.15em] text-ink-900'
  const liveCats = categories.filter((c) => products.some((p) => p.category === c.slug))

  const filters = (
    <div className="divide-y divide-[#eaeaec]">
      <div className="pb-5">
        <h3 className={heading}>Categories</h3>
        <ul className="flex flex-col gap-2.5">
          {[{ slug: 'all', name: 'All products' }, ...liveCats].map((c) => {
            const on = c.slug === slug
            return (
              <li key={c.slug}>
                <Link
                  to={`/c/${c.slug}${q ? `?q=${encodeURIComponent(q)}` : ''}`}
                  onClick={() => setShown(PAGE)}
                  aria-current={on ? 'page' : undefined}
                  className="flex items-center gap-2.5 text-sm text-ink-900 hover:text-primary"
                >
                  <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${on ? 'border-primary' : 'border-[#c3c4c9]'}`}>
                    {on && <span className="h-2 w-2 rounded-full bg-primary" />}
                  </span>
                  <span className={on ? 'font-bold' : ''}>{c.name}</span>
                  <span className="text-xs text-[#94969f]">({c.slug === 'all' ? products.length : products.filter((p) => p.category === c.slug).length})</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {allBrands.length > 1 && (
        <fieldset className="py-5">
          <legend className={`${heading} float-left w-full`}>Brand</legend>
          <div className="clear-both flex flex-col gap-2.5">
            {allBrands.map((b) => (
              <label key={b} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-900">
                <input
                  type="checkbox"
                  checked={brands.includes(b)}
                  onChange={(e) => set('brand', (e.target.checked ? [...brands, b] : brands.filter((x) => x !== b)).join(','))}
                  className="h-4 w-4 rounded-sm accent-primary"
                />
                {b}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset className="py-5">
        <legend className={`${heading} float-left w-full`}>Price (₹)</legend>
        <div className="clear-both flex items-center gap-2">
          <input type="number" inputMode="numeric" min="0" value={min} onChange={(e) => set('min', e.target.value)} placeholder="Min" aria-label="Minimum price" className={`${inputClass} !py-2 !text-sm`} />
          <span className="text-[#94969f]">–</span>
          <input type="number" inputMode="numeric" min="0" value={max} onChange={(e) => set('max', e.target.value)} placeholder="Max" aria-label="Maximum price" className={`${inputClass} !py-2 !text-sm`} />
        </div>
      </fieldset>

      <div className="pt-5">
        <h3 className={heading}>Availability</h3>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-900">
          <input type="checkbox" checked={inStock} onChange={(e) => set('stock', e.target.checked ? '1' : '')} className="h-4 w-4 rounded-sm accent-primary" />
          In stock, ready to ship
        </label>
      </div>
    </div>
  )

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-14 pt-5 lg:px-8">
      <Crumbs items={[{ label: 'Home', to: '/' }, { label: title }]} />
      <h1 className="mt-3 text-base font-bold !text-ink-900">
        {title} <span className="font-normal text-[#94969f]">- {results.length} item{results.length === 1 ? '' : 's'}{q ? ` for "${q}"` : ''}</span>
      </h1>

      <div className="mt-5 flex items-center justify-between gap-3 border-b border-[#eaeaec] pb-3">
        <div className="flex items-center gap-4">
          <span className="hidden w-[244px] text-sm font-extrabold uppercase tracking-[0.15em] text-ink-900 lg:block">Filters</span>
          <button type="button" onClick={() => setFiltersOpen(true)} className={`${btn.ghost} !px-4 !py-2 lg:hidden`}>
            <SlidersHorizontal className="h-4 w-4" />
            Filters{chips.length ? ` (${chips.length})` : ''}
          </button>
          {chips.length > 0 && (
            <ul className="hidden flex-wrap items-center gap-2 md:flex" aria-label="Active filters">
              {chips.map((chip) => (
                <li key={chip.label}>
                  <button type="button" onClick={chip.clear} aria-label={`Remove filter ${chip.label}`} className="inline-flex items-center gap-1.5 rounded-full border border-[#d4d5d9] px-3 py-1 text-xs text-ink-900 hover:border-ink-900">
                    {chip.label}
                    <X className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
              <li>
                <button type="button" onClick={clearAll} className="text-xs font-bold uppercase tracking-wider text-primary">
                  Clear all
                </button>
              </li>
            </ul>
          )}
        </div>
        <label className="flex items-center gap-2 whitespace-nowrap rounded-md border border-[#d4d5d9] px-3 py-2 text-sm">
          <span className="hidden text-[#696e79] sm:inline">Sort by:</span>
          <select value={sort} onChange={(e) => set('sort', e.target.value === 'featured' ? '' : e.target.value)} className="cursor-pointer bg-transparent font-bold text-ink-900 focus:outline-none">
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 grid gap-8 lg:grid-cols-[228px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28">{filters}</div>
        </aside>

        <div className="min-w-0">
          {results.length === 0 ? (
            <EmptyState
              as="h2"
              icon={PackageSearch}
              title="No products match"
              text="Try a different word or clear the filters. If you cannot find what you need, we can source it for you."
              action={
                <div className="flex flex-wrap justify-center gap-3">
                  <button type="button" onClick={clearAll} className={btn.ghost}>
                    Clear filters
                  </button>
                  <button type="button" onClick={() => requestQuote(q ? `Looking for: ${q}` : 'Not sure, need guidance')} className={btn.navy}>
                    Ask us for it
                  </button>
                </div>
              }
            />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-x-4 xl:grid-cols-4">
                {results.slice(0, shown).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {results.length > shown && (
                <div className="mt-10 text-center">
                  <button type="button" onClick={() => setShown((n) => n + PAGE)} className={btn.ghost}>
                    Show more ({results.length - shown})
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-white lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="flex items-center justify-between border-b border-[#eaeaec] px-4 py-3">
            <h2 className="text-sm font-extrabold uppercase tracking-[0.15em] !text-ink-900">Filters</h2>
            <button type="button" onClick={clearAll} className="text-xs font-bold uppercase tracking-wider text-primary">
              Clear all
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-5">{filters}</div>
          <div className="grid grid-cols-2 border-t border-[#eaeaec]">
            <button type="button" onClick={() => setFiltersOpen(false)} className="py-4 text-sm font-bold uppercase tracking-wider text-[#535766]">
              Close
            </button>
            <button type="button" onClick={() => setFiltersOpen(false)} className="border-l border-[#eaeaec] py-4 text-sm font-bold uppercase tracking-wider text-primary">
              Show {results.length} items
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
