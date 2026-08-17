import { defineConfig } from 'vite'
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

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), preloadHeroImage()],
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
