import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumb({ title, parent, parentPath, icon: Icon }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const itemListElement = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.prosperinfotech.com/' },
    ]
    // Every non-final ListItem requires an `item` URL, so only add the parent
    // crumb when we actually have a path for it — otherwise skip straight to
    // the current page rather than emitting an invalid entry.
    if (parent && parentPath) {
      itemListElement.push({
        '@type': 'ListItem',
        position: itemListElement.length + 1,
        name: parent,
        item: `https://www.prosperinfotech.com${parentPath}`,
      })
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
  }, [title, parent, parentPath, pathname])

  return (
    <section className="relative bg-[#fffdf6] px-6 pt-8 pb-10 md:pt-10">
      <div className="max-w-6xl mx-auto">
        <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-xs font-semibold uppercase tracking-wide">
          <Link
            to="/"
            className="rounded-full bg-white px-3 py-1.5 text-ink-500 shadow-sm ring-1 ring-ink-300/60 transition-colors hover:text-primary"
          >
            Home
          </Link>
          {parent && (
            <>
              <ChevronRight className="h-3 w-3 text-ink-300" />
              <span className="rounded-full bg-white px-3 py-1.5 text-ink-500 shadow-sm ring-1 ring-ink-300/60">
                {parent}
              </span>
            </>
          )}
          <ChevronRight className="h-3 w-3 text-ink-300" />
          <span className="rounded-full bg-gold px-3 py-1.5 text-primary shadow-sm">{title}</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-gold via-gold to-gold-dark px-8 py-10 shadow-[0_24px_50px_-20px_rgba(224,199,0,0.5)] md:px-12 md:py-12"
        >
          <div className="pointer-events-none absolute -top-16 -right-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-white/20 blur-3xl" />

          <div className="relative flex items-center gap-5 md:gap-6">
            {Icon ? (
              <span className="hidden h-16 w-16 shrink-0 -rotate-6 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-gold shadow-[inset_0_2px_3px_rgba(255,255,255,0.15),0_10px_20px_-4px_rgba(0,0,0,0.35)] sm:flex">
                <Icon className="h-8 w-8" />
              </span>
            ) : (
              <span className="hidden h-12 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-primary to-primary-dark sm:block" />
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-primary drop-shadow-sm">
              {title}
            </h1>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
