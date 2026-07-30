import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function chunk(items, size) {
  const chunks = []
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size))
  }
  return chunks
}

export default function MegaMenu({ item, onNavigate }) {
  const perColumn = Math.ceil(item.children.length / (item.children.length > 6 ? 3 : 2))
  const columns = chunk(item.children, perColumn)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.15 }}
      className="absolute left-1/2 top-full z-40 w-[min(90vw,780px)] -translate-x-1/2 pt-3"
    >
      <div className="rounded-lg bg-white shadow-xl ring-1 ring-black/5 overflow-hidden">
        <div className="grid gap-x-8 gap-y-5 p-8" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
          {columns.map((col, i) => (
            <div key={i} className="flex flex-col gap-5">
              {col.map((child) => (
                <Link
                  key={child.path}
                  to={child.path}
                  onClick={onNavigate}
                  className="group block"
                >
                  <div className="font-heading font-semibold text-ink-900 group-hover:text-primary transition-colors">
                    {child.label}
                  </div>
                  {child.description && (
                    <div className="text-sm text-ink-500 mt-0.5 line-clamp-2">
                      {child.description}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <Link
          to={item.path}
          onClick={onNavigate}
          className="block bg-surface-alt px-8 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
        >
          View all {item.label} &rarr;
        </Link>
      </div>
    </motion.div>
  )
}
