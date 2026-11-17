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
      server.middlewares.use(middleware(() => import(/* @vite-ignore */ new URL('./server/router.js', import.meta.url).href)))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), preloadHeroImage(), shopApi()],
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
