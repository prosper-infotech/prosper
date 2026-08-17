import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumb({ title, parent, icon: Icon }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const itemListElement = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.prosperinfotech.com/' },
    ]
    if (parent) {
      itemListElement.push({ '@type': 'ListItem', position: 2, name: parent })
    }
    itemListElement.push({
      '@type': 'ListItem',
      position: itemListElement.length + 1,
      name: title,
      item: `https://www.prosperinfotech.com${pathname}`,
    })

    const schemaTag = document.createElement('script')
    schemaTag.type = 'application/ld+json'
    schemaTag.setAttribute('data-breadcrumb-schema', 'true')
    schemaTag.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement,
    })
    document.head.appendChild(schemaTag)

    return () => schemaTag.remove()
  }, [title, parent, pathname])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy via-primary to-primary-dark text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-20"
      >
        <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-300">
          <Link to="/" className="rounded-full px-2.5 py-1 transition-colors hover:bg-white/10 hover:text-gold">
            Home
          </Link>
          {parent && (
            <>
              <ChevronRight className="h-3 w-3 text-white/30" />
              <span className="rounded-full px-2.5 py-1 text-white/70">{parent}</span>
            </>
          )}
          <ChevronRight className="h-3 w-3 text-white/30" />
          <span className="rounded-full bg-gold/15 px-2.5 py-1 text-gold">{title}</span>
        </nav>

        <div className="flex items-center gap-4">
          {Icon ? (
            <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-gold-dark text-primary shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.15),0_4px_12px_rgba(0,0,0,0.25)] sm:flex">
              <Icon className="h-7 w-7" />
            </span>
          ) : (
            <span className="hidden h-10 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-gold to-gold-dark sm:block" />
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white drop-shadow-md">
            {title}
          </h1>
        </div>
      </motion.div>
    </section>
  )
}
