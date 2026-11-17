import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ShopContext } from './shopContext'
import { api } from './api'
import { track } from './track'
import { priceCart, isOrderable, clampQty } from '../../shared/pricing.js'

const QuoteModal = lazy(() => import('../components/ui/QuoteModal'))

const CART_KEY = 'pi_cart_v1'
const RECENT_KEY = 'pi_recent_v1'
const PIN_KEY = 'pi_pincode'

function readList(key) {
  try {
    const raw = JSON.parse(localStorage.getItem(key) || '[]')
    return Array.isArray(raw) ? raw.filter((x) => typeof x === 'string').slice(0, 60) : []
  } catch {
    return []
  }
}
function save(key, value) {
  try {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
  } catch {
    // private browsing: lasts for this visit only
  }
}
const EMPTY_CONFIG = {
  shipping_flat_paise: 0,
  free_shipping_threshold_paise: 0,
  shipping_gst_percent: 18,
  delivery_days_min: 3,
  delivery_days_max: 7,
  support_email: 'sales@prosperinfotech.com',
  support_phone: '+91 92268 91830',
  whatsapp_number: '919226891830',
  online_payment: false,
  bank_payment: false,
  upi_payment: false,
}

function readCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY) || '[]')
    return Array.isArray(raw) ? raw.filter((l) => l && typeof l.id === 'string' && Number.isInteger(l.qty) && l.qty > 0).slice(0, 50) : []
  } catch {
    return []
  }
}

export default function ShopProvider({ children }) {
  const [catalogue, setCatalogue] = useState({ status: 'idle', products: [], categories: [], config: EMPTY_CONFIG, offline: false })
  const [lines, setLines] = useState(readCart)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [recent, setRecent] = useState(() => readList(RECENT_KEY))
  const [pincode, setPincodeState] = useState(() => {
    try {
      return localStorage.getItem(PIN_KEY) || ''
    } catch {
      return ''
    }
  })
  const [quoteFor, setQuoteFor] = useState(null)
  const loading = useRef(null)

  const loadCatalogue = useCallback(async () => {
    try {
      const data = await api('/shop/catalogue')
      setCatalogue({ status: 'ready', products: data.products, categories: data.categories, config: { ...EMPTY_CONFIG, ...data.config }, offline: false })
    } catch {
      // The shop API is not reachable (for example before the database is set
      // up). Show the launch catalogue as "Request price" so pages still work.
      const seed = await import('../../shared/catalogue.js')
      setCatalogue({
        status: 'ready',
        products: seed.SEED_PRODUCTS.map((p) => ({ ...p, id: p.sku, price_paise: null })),
        categories: seed.SEED_CATEGORIES,
        config: EMPTY_CONFIG,
        offline: true,
      })
    }
  }, [])

  const ensureCatalogue = useCallback(() => {
    if (!loading.current) {
      setCatalogue((c) => (c.status === 'idle' ? { ...c, status: 'loading' } : c))
      loading.current = loadCatalogue()
    }
    return loading.current
  }, [loadCatalogue])

  const refreshCatalogue = useCallback(() => {
    loading.current = loadCatalogue()
    return loading.current
  }, [loadCatalogue])

  // A cart with items needs the catalogue (names, prices) wherever the drawer can open.
  useEffect(() => {
    if (lines.length) ensureCatalogue()
  }, [lines.length, ensureCatalogue])

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(lines))
    } catch {
      // private browsing: the cart simply lasts for this visit
    }
  }, [lines])

  // Keep several open tabs in step.
  useEffect(() => {
    const onStorage = (e) => e.key === CART_KEY && setLines(readCart())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const add = useCallback((product, qty = 1, { open = true } = {}) => {
    if (!isOrderable(product)) return false
    setLines((prev) => {
      const current = prev.find((l) => l.id === product.id)?.qty || 0
      const next = clampQty(product, current + qty)
      return current ? prev.map((l) => (l.id === product.id ? { ...l, qty: next } : l)) : [...prev, { id: product.id, qty: next }]
    })
    track.addToCart(product, qty)
    if (open) setDrawerOpen(true)
    return true
  }, [])

  const setQty = useCallback((product, qty) => {
    setLines((prev) => prev.map((l) => (l.id === product.id ? { ...l, qty: clampQty(product, qty) } : l)))
  }, [])
  const remove = useCallback((id) => setLines((prev) => prev.filter((l) => l.id !== id)), [])
  const clear = useCallback(() => setLines([]), [])

  const addRecent = useCallback((id) => {
    setRecent((prev) => {
      if (prev[0] === id) return prev
      const next = [id, ...prev.filter((x) => x !== id)].slice(0, 12)
      save(RECENT_KEY, next)
      return next
    })
  }, [])
  const setPincode = useCallback((pin) => {
    setPincodeState(pin)
    save(PIN_KEY, pin)
  }, [])

  const requestQuote = useCallback((name) => {
    track.quote(name)
    setQuoteFor(name)
  }, [])
  const closeQuote = useCallback(() => setQuoteFor(null), [])

  const value = useMemo(() => {
    const byId = new Map(catalogue.products.map((p) => [p.id, p]))
    const ready = catalogue.status === 'ready'
    const detailed = lines.map((l) => ({ ...l, product: byId.get(l.id) || null }))
    const priced = priceCart(ready ? detailed.map((l) => ({ product: l.product, qty: l.qty })) : [], catalogue.config)
    return {
      ...catalogue,
      ready,
      ensureCatalogue,
      refreshCatalogue,
      lines: detailed,
      priced,
      count: lines.reduce((sum, l) => sum + l.qty, 0),
      add,
      setQty,
      remove,
      clear,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      requestQuote,
      recent,
      addRecent,
      pincode,
      setPincode,
    }
  }, [catalogue, lines, drawerOpen, ensureCatalogue, refreshCatalogue, add, setQty, remove, clear, requestQuote, recent, addRecent, pincode, setPincode])

  const quoteOptions = useMemo(
    () => [...new Set([quoteFor, ...catalogue.products.map((p) => p.name), 'Bulk order', 'Not sure, need guidance'].filter(Boolean))],
    [catalogue.products, quoteFor]
  )

  return (
    <ShopContext.Provider value={value}>
      {children}
      {quoteFor && (
        <Suspense fallback={null}>
          <QuoteModal product={quoteFor} options={quoteOptions} campaign="Online Shop" onClose={closeQuote} />
        </Suspense>
      )}
    </ShopContext.Provider>
  )
}
