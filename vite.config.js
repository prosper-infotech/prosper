import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Preloads the homepage hero's first-slide image so the browser fetches it
// immediately instead of waiting on JS to resolve the hashed import — it's
// the LCP element on the most important page.
function preloadHeroImage() {
  return {
    name: 'preload-hero-image',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html
        const entry = Object.values(ctx.bundle).find(
          (item) =>
            item.type === 'asset' &&
            (item.originalFileNames || [item.name]).some(
              (n) => n && n.includes('hero-slide-ai-vision-iot')
            )
        )
        if (!entry) return html
        return [
          {
            tag: 'link',
            attrs: { rel: 'preload', as: 'image', href: `/${entry.fileName}`, fetchpriority: 'high' },
            injectTo: 'head',
          },
        ]
      },
    },
  }
}


// Runs the shop's server functions (server/router.js) inside the Vite dev and
// preview servers, so /api works locally exactly as it does on Vercel.
function shopApi() {
  const middleware = (loadRouter) => async (req, res, next) => {
    if (!req.url.startsWith('/api/') && req.url !== '/api') return next()
    try {
      const chunks = []
      for await (const chunk of req) chunks.push(chunk)
      const hasBody = !['GET', 'HEAD'].includes(req.method) && chunks.length > 0
      const headers = new Headers()
      for (const [k, v] of Object.entries(req.headers)) headers.set(k, Array.isArray(v) ? v.join(', ') : v)
      const request = new Request(`http://${req.headers.host}${req.url}`, {
        method: req.method,
        headers,
        body: hasBody ? Buffer.concat(chunks) : undefined,
      })
      const { handle } = await loadRouter()
      const response = await handle(request)
      res.statusCode = response.status
      response.headers.forEach((value, key) => {
        if (key !== 'set-cookie') res.setHeader(key, value)
      })
      const cookies = response.headers.getSetCookie()
      if (cookies.length) res.setHeader('Set-Cookie', cookies)
      res.end(Buffer.from(await response.arrayBuffer()))
    } catch (err) {
      console.error('[shop-api]', err)
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Local API error. See the terminal.' }))
    }
  }
  const applyEnv = (mode) => {
    for (const [k, v] of Object.entries(loadEnv(mode, process.cwd(), ''))) {
      if (process.env[k] === undefined) process.env[k] = v
    }
  }
  return {
    name: 'shop-api',
    configureServer(server) {
      applyEnv(server.config.mode)
      server.middlewares.use(middleware(() => server.ssrLoadModule('/server/router.js')))
    },
    configurePreviewServer(server) {
      applyEnv(server.config.mode)
      server.middlewares.use((req, _res, next) => {
        const [pathname, search = ''] = req.url.split('?')
        if (req.method === 'GET' && !pathname.startsWith('/api') && !/\.[a-z0-9]+$/i.test(pathname)) {
          req.url = `/api/__html?p=${encodeURIComponent(pathname.replace(/^\/+/, ''))}${search ? `&${search}` : ''}`
        } else if (pathname === '/sitemap.xml') req.url = '/api/sitemap.xml'
        next()
      })
      server.middlewares.use(middleware(() => import(/* @vite-ignore */ new URL('./server/router.js', import.meta.url).href)))
    },
  }
}

// After the build, rename index.html to _app.html. The server uses it as the
// template for every page (see server/routes/html.js), so "/" must not be a file.
function pageTemplate() {
  return {
    name: 'page-template',
    apply: 'build',
    closeBundle() {
      const out = path.resolve('dist')
      if (fs.existsSync(path.join(out, 'index.html'))) fs.renameSync(path.join(out, 'index.html'), path.join(out, '_app.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), preloadHeroImage(), shopApi(), pageTemplate()],
  // The local test store writes files here; they must not reload the page.
  server: { watch: { ignored: ['**/.shop-dev/**'] } },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-router-dom') || id.includes('/react/') || id.includes('/react-dom/')) {
            return 'react-vendor'
          }
          if (id.includes('framer-motion')) return 'motion-vendor'
          if (id.includes('swiper')) return 'swiper-vendor'
        },
      },
    },
  },
})
