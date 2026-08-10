import { useState } from 'react'
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
  const [hoveredChild, setHoveredChild] = useState(null)
  const useTwoColumns = item.children.length > 6
  const columns = useTwoColumns
    ? chunk(item.children, Math.ceil(item.children.length / 2))
    : [item.children]
  const width = useTwoColumns ? 'w-[38rem]' : 'w-64'

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.15 }}
      className="absolute left-0 top-full z-40 pt-3 flex items-start gap-1.5"
    >
      <div
        className={`rounded-lg bg-gradient-to-b from-navy/70 to-primary-dark/70 backdrop-blur-md shadow-xl ring-1 ring-white/10 overflow-hidden ${width}`}
      >
        <div className={useTwoColumns ? 'grid grid-cols-2 gap-x-1 py-2' : 'flex flex-col py-2'}>
          {columns.map((col, i) => (
            <div key={i} className="flex flex-col">
              {col.map((child) => (
                <Link
                  key={child.path}
                  to={child.path}
                  onClick={onNavigate}
                  onMouseEnter={() => setHoveredChild(child.children ? child : null)}
                  className="px-5 py-2.5 text-sm font-heading font-semibold leading-snug text-white hover:bg-white/10 hover:text-gold transition-colors"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {hoveredChild && (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.15 }}
          className="w-64 rounded-lg bg-gradient-to-b from-navy/70 to-primary-dark/70 backdrop-blur-md shadow-xl ring-1 ring-white/10 overflow-hidden"
        >
          <div className="flex flex-col py-2">
            <span className="px-5 pb-1.5 pt-1 text-xs font-semibold uppercase tracking-wide text-white/50">
              {hoveredChild.label}
            </span>
            {hoveredChild.children.map((grandchild) => (
              <Link
                key={grandchild.path}
                to={grandchild.path}
                onClick={onNavigate}
                className="px-5 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-gold transition-colors"
              >
                {grandchild.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
