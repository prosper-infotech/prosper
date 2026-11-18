import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/ui/Breadcrumb'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { useShop } from '../../shop/shopContext'
import { PageLoading } from '../../shop/components/ui'
import { STATIC_PAGE_META } from '../../../shared/pages.js'

const OWN = 'Prosper Infotech'

export default function BrandsPage() {
  const { ready, products, categories } = useShop()
  const meta = STATIC_PAGE_META.brands
  useDocumentTitle(meta.title, meta.description)

  const brands = useMemo(() => {
    const map = new Map()
    for (const p of products) {
      const name = p.brand || OWN
      if (!map.has(name)) map.set(name, { name, count: 0, cats: new Set() })
      const b = map.get(name)
      b.count += 1
      b.cats.add(p.category)
    }
    return [...map.values()].sort((a, b) => (a.name === OWN) - (b.name === OWN) || a.name.localeCompare(b.name))
  }, [products])

  if (!ready) return <PageLoading label="Loading brands" />
  const catName = (slug) => categories.find((c) => c.slug === slug)?.name

  return (
    <>
      <Breadcrumb title="Brands" h1="Shop by brand" description="Genuine hardware from leading RFID, barcode, POS and security brands, plus our own value range." />
      <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {brands.map((b) => (
            <li key={b.name}>
              <Link
                to={`/c/all?brand=${encodeURIComponent(b.name)}`}
                className="group flex h-full flex-col rounded-lg border border-[#eaeaec] bg-white p-5 transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-[0_6px_20px_rgba(20,52,109,0.10)]"
              >
                <span className="flex items-baseline justify-between gap-3">
                  <span className="text-lg font-extrabold uppercase tracking-wide text-primary">{b.name === OWN ? 'Prosper value range' : b.name}</span>
                  <span className="shrink-0 rounded-full bg-surface-alt px-2.5 py-0.5 text-xs font-bold text-primary">{b.count}</span>
                </span>
                <span className="mt-2 text-sm text-[#696e79]">
                  {[...b.cats]
                    .map(catName)
                    .filter(Boolean)
                    .join(' · ')}
                </span>
                <span className="mt-auto pt-4 text-xs font-bold uppercase tracking-wider text-primary group-hover:underline">View products</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-3xl text-sm text-[#696e79]">
          Brand names and trademarks belong to their owners. Branded products are supplied through authorised channels with the maker&apos;s warranty. Looking for a brand
          that is not listed?{' '}
          <Link to="/bulk-order" className="font-bold text-primary hover:underline">
            Ask us for a quote
          </Link>
          .
        </p>
      </div>
    </>
  )
}
