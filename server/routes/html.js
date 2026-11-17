// Builds the HTML for every shop page on the server, so search engines and link
// previews get the right title, description, canonical link, structured data and
// the page's main content without running JavaScript. The browser app then takes
// over; the shop data is embedded so it renders instantly without a loading spinner.
import fs from 'node:fs'
import path from 'node:path'
import { esc } from '../lib/http.js'
import { catalogueData } from './public.js'
import { productMeta, categoryMeta, breadcrumbLd as sharedBreadcrumb, productLd as sharedProductLd, SHOP_NAME } from '../../shared/seo.js'
import { formatINR, hasPrice } from '../../shared/pricing.js'

const SITE = () => (process.env.SITE_URL || 'https://shop.prosperinfotech.com').replace(/\/+$/, '')
const DEFAULT_IMAGE = 'https://www.prosperinfotech.com/og-image.jpg'
const HOME_TITLE = 'Buy RFID Tags, Readers & Barcode Scanners | Prosper Shop'
const HOME_DESCRIPTION =
  'Order UHF RFID tags and labels, RFID readers and antennas, barcode scanners and label printers online. Prices include GST, delivery across India.'

const STATIC_PAGES = {
  contact: { title: `Contact Us | ${SHOP_NAME}`, description: 'Call, email or WhatsApp the Prosper Infotech shop team for help with RFID and barcode products, orders, bulk quotes and delivery.', h1: 'Contact us' },
  'shipping-policy': { title: `Shipping Policy | ${SHOP_NAME}`, description: 'Where we deliver, what shipping costs and how long delivery takes for orders from the Prosper Infotech online shop.', h1: 'Shipping Policy' },
  'returns-refunds': { title: `Returns & Refunds | ${SHOP_NAME}`, description: 'What to do if a product arrives damaged, faulty or wrong, and how refunds work for orders from the Prosper Infotech online shop.', h1: 'Returns & Refunds' },
  warranty: { title: `Warranty | ${SHOP_NAME}`, description: 'Warranty cover for RFID readers, barcode scanners, printers and other products bought from the Prosper Infotech online shop.', h1: 'Warranty' },
  'terms-of-sale': { title: `Terms of Sale | ${SHOP_NAME}`, description: 'The terms that apply when you buy from the Prosper Infotech online shop: orders, prices, GST, payment, delivery and liability.', h1: 'Terms of Sale' },
  'privacy-policy': { title: 'Privacy Policy | Prosper Infotech', description: 'How Prosper Infotech collects, uses and protects your information across the online shop, contact forms and orders.', h1: 'Privacy Policy' },
}
const PRIVATE = /^(cart|checkout|account|order|admin|lp)(\/|$)/

const breadcrumbLd = (items) => sharedBreadcrumb(items, SITE())
const productLd = (p, category, config) => sharedProductLd(p, category, config, SITE())
const abs = (u) => (!u ? '' : /^https?:\/\//.test(u) ? u : `${SITE()}${u.startsWith('/') ? '' : '/'}${u}`)

/* --------------------------------- Template --------------------------------- */

let cached = null
async function template(request) {
  // A local build (vite preview, tests) is read fresh every time, so a rebuild is picked up at once.
  const local = path.resolve('dist/_app.html')
  if (fs.existsSync(local)) return fs.readFileSync(local, 'utf8')
  if (cached && cached.at > Date.now() - 5 * 60 * 1000) return cached.html
  let html = null
  {
    // On Vercel the built page lives on the CDN next to the scripts it loads.
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host')
    const proto = request.headers.get('x-forwarded-proto') || 'https'
    const res = await fetch(`${proto}://${host}/_app.html`, { signal: AbortSignal.timeout(5000) })
    if (!res.ok) throw new Error(`Page template not found (${res.status})`)
    html = await res.text()
  }
  cached = { html, at: Date.now() }
  return html
}

function setMeta(html, pattern, tag) {
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`)
}

function fill(html, meta) {
  const t = esc(meta.title)
  const d = esc(meta.description)
  const image = esc(meta.image || DEFAULT_IMAGE)
  let out = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`)
  out = setMeta(out, /<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${d}" />`)
  out = setMeta(out, /<meta\s+property="og:title"[\s\S]*?\/>/, `<meta property="og:title" content="${t}" />`)
  out = setMeta(out, /<meta\s+property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${d}" />`)
  out = setMeta(out, /<meta\s+property="og:url"[\s\S]*?\/>/, `<meta property="og:url" content="${esc(meta.canonical)}" />`)
  out = setMeta(out, /<meta\s+property="og:type"[\s\S]*?\/>/, `<meta property="og:type" content="${meta.ogType || 'website'}" />`)
  out = setMeta(out, /<meta\s+property="og:image"\s[\s\S]*?\/>/, `<meta property="og:image" content="${image}" />`)
  out = setMeta(out, /<meta\s+name="twitter:title"[\s\S]*?\/>/, `<meta name="twitter:title" content="${t}" />`)
  out = setMeta(out, /<meta\s+name="twitter:description"[\s\S]*?\/>/, `<meta name="twitter:description" content="${d}" />`)
  out = setMeta(out, /<meta\s+name="twitter:image"[\s\S]*?\/>/, `<meta name="twitter:image" content="${image}" />`)
  if (meta.image) out = out.replace(/\s*<meta property="og:image:(width|height)"[^>]*\/>/g, '')

  const head = [
    `<link rel="canonical" href="${esc(meta.canonical)}" />`,
    `<meta name="robots" content="${meta.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}" />`,
    meta.jsonLd ? `<script type="application/ld+json" data-page-schema="true">${JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c')}</script>` : '',
    meta.data ? `<script>window.__SHOP__=${JSON.stringify(meta.data).replace(/</g, '\\u003c').replace(/\u2028|\u2029/g, '')}</script>` : '',
  ]
    .filter(Boolean)
    .join('\n    ')
  out = out.replace('</head>', `    ${head}\n  </head>`)
  if (meta.body) out = out.replace(/<div id="root"><\/div>/, `<div id="root">${meta.body}</div>`)
  return out
}

/* ------------------------------- Page content ------------------------------- */

// Readable by search engines and screen readers. Kept visually hidden: the app paints the
// same content a moment later, so visitors never see a flash of unstyled text.
const wrap = (inner) => `<div class="sr-only" data-prerendered="true">${inner}</div>`
const crumbs = (items) =>
  `<nav aria-label="Breadcrumb" class="text-sm text-ink-500">${items
    .map((i) => (i.href ? `<a href="${esc(i.href)}">${esc(i.label)}</a>` : `<span>${esc(i.label)}</span>`))
    .join(' / ')}</nav>`
const priceText = (p) => (hasPrice(p) ? `${formatINR(p.price_paise)} (incl. GST)` : 'Price on request')
const productLink = (p) =>
  `<li><a href="/p/${esc(p.slug)}">${esc(p.name)}</a> – ${esc(priceText(p))}</li>`

function pageFor(rawPath, query, data) {
  const parts = rawPath.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean)
  const pathName = `/${parts.join('/')}`
  const canonical = `${SITE()}${pathName === '/' ? '/' : pathName}`
  const live = data ? data.categories.filter((c) => data.products.some((p) => p.category === c.slug)) : []

  if (parts.length === 0) {
    const featured = data ? data.products.filter((p) => p.is_featured).slice(0, 12) : []
    return {
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      canonical,
      jsonLd: { '@context': 'https://schema.org', '@type': 'WebSite', name: SHOP_NAME, url: `${SITE()}/` },
      body: wrap(
        `<h1 class="text-2xl font-extrabold">RFID tags, readers, barcode scanners and printers</h1><p>${esc(HOME_DESCRIPTION)}</p>` +
          (live.length ? `<h2>Shop by category</h2><ul>${live.map((c) => `<li><a href="/c/${esc(c.slug)}">${esc(c.name)}</a></li>`).join('')}</ul>` : '') +
          (featured.length ? `<h2>Featured products</h2><ul>${featured.map(productLink).join('')}</ul>` : '')
      ),
    }
  }

  if (parts[0] === 'c' && parts.length === 2) {
    const slug = parts[1]
    const category = data?.categories.find((c) => c.slug === slug)
    if (data && slug !== 'all' && !category) return null
    const meta = categoryMeta(slug, category)
    const name = slug === 'all' ? 'All Products' : category?.name || 'Products'
    const items = data ? (slug === 'all' ? data.products : data.products.filter((p) => p.category === slug)) : []
    const trail = [{ label: 'Home', href: '/' }, { label: name, href: pathName }]
    return {
      title: meta.title,
      description: meta.description,
      canonical,
      noindex: Boolean(query.get('q')),
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          breadcrumbLd(trail),
          { '@type': 'ItemList', itemListElement: items.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE()}/p/${p.slug}`, name: p.name })) },
        ],
      },
      body: wrap(`${crumbs(trail.slice(0, 1))}<h1 class="text-2xl font-extrabold">${esc(name)}</h1><p>${esc(meta.intro)}</p><ul>${items.map(productLink).join('')}</ul>`),
    }
  }

  if (parts[0] === 'p' && parts.length === 2) {
    const product = data?.products.find((p) => p.slug === parts[1])
    if (!product) return data ? null : { title: SHOP_NAME, description: HOME_DESCRIPTION, canonical }
    const category = data.categories.find((c) => c.slug === product.category)
    const { title, description } = productMeta(product)
    const trail = [{ label: 'Home', href: '/' }, ...(category ? [{ label: category.name, href: `/c/${category.slug}` }] : []), { label: product.name, href: pathName }]
    const related = data.products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 8)
    const ld = productLd(product, category, data.config)
    const paragraphs = (product.long_description || product.short_description || '').split(/\n{2,}/).filter(Boolean)
    return {
      title,
      description,
      canonical,
      ogType: 'product',
      image: product.images?.[0] ? abs(product.images[0]) : null,
      jsonLd: { '@context': 'https://schema.org', '@graph': [breadcrumbLd(trail), ...(ld ? [ld] : [])] },
      body: wrap(
        `${crumbs(trail.slice(0, -1))}<h1 class="text-2xl font-extrabold">${esc(product.name)}</h1>` +
          `<p><strong>${esc(product.brand || 'Prosper Infotech')}</strong> · SKU ${esc(product.sku)} · ${esc(priceText(product))}</p>` +
          (product.images?.[0] ? `<img src="${esc(abs(product.images[0]))}" alt="${esc(product.name)}" width="600" height="600" style="max-width:100%;height:auto" />` : '') +
          `<p>${esc(product.short_description || '')}</p>${paragraphs.map((t) => `<p>${esc(t)}</p>`).join('')}` +
          (product.specs?.length ? `<h2>Specifications</h2><dl>${product.specs.map((s) => `<dt>${esc(s.label)}</dt><dd>${esc(s.value)}</dd>`).join('')}</dl>` : '') +
          (related.length ? `<h2>Similar products</h2><ul>${related.map(productLink).join('')}</ul>` : '')
      ),
    }
  }

  const page = STATIC_PAGES[parts.join('/')]
  if (page) return { title: page.title, description: page.description, canonical, body: wrap(`<h1 class="text-2xl font-extrabold">${esc(page.h1)}</h1><p>${esc(page.description)}</p>`) }

  if (PRIVATE.test(parts.join('/'))) return { title: SHOP_NAME, description: HOME_DESCRIPTION, canonical, noindex: true, private: true }
  return null
}

/* --------------------------------- Handler ---------------------------------- */

export async function renderPage(request) {
  const url = new URL(request.url)
  const rawPath = `/${(url.searchParams.get('p') || '').replace(/^\/+/, '')}`
  const query = url.searchParams
  let data = null
  try {
    data = await catalogueData()
  } catch (err) {
    // No database (or it is down): still serve the page; the browser app shows the fallback catalogue.
    console.error('[shop] page data unavailable', err.message)
  }
  const page = pageFor(rawPath, query, data) || {
    title: `Page not found | ${SHOP_NAME}`,
    description: HOME_DESCRIPTION,
    canonical: `${SITE()}${rawPath}`,
    noindex: true,
    notFound: true,
  }
  const html = fill(await template(request), { ...page, data: page.private ? null : data })
  return new Response(html, {
    status: page.notFound ? 404 : 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': page.private ? 'private, no-store' : 'public, max-age=0, s-maxage=60, stale-while-revalidate=600',
      'X-Content-Type-Options': 'nosniff',
      ...(page.noindex ? { 'X-Robots-Tag': 'noindex, nofollow' } : {}),
    },
  })
}

export const _test = { pageFor, fill }
