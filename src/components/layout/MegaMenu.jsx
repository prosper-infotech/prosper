import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

function chunk(items, size) {
  const chunks = []
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size))
  }
  return chunks
}

export default function MegaMenu({ item, onNavigate }) {
  const [hoveredChild, setHoveredChild] = useState(null)

  if (item.flattenColumns) {
    const columnCount = item.children.length
    const widthClass = columnCount >= 3 ? 'w-[56rem]' : 'w-[38rem]'
    const gridColsClass = columnCount >= 3 ? 'grid-cols-3' : 'grid-cols-2'

    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.15 }}
        className="absolute left-0 top-full z-40 pt-3"
      >
        <div
          className={`rounded-lg bg-gradient-to-b from-navy/90 to-primary-dark/90 backdrop-blur-md shadow-xl ring-1 ring-white/10 overflow-hidden ${widthClass}`}
        >
          <div className={`grid ${gridColsClass} gap-x-1 py-2`}>
            {item.children.map((category) => (
              <div key={category.path} className="flex flex-col">
                <Link
                  to={category.path}
                  onClick={onNavigate}
                  className="px-5 pt-2 pb-1.5 text-xs font-heading font-bold uppercase tracking-wide text-gold"
                >
                  {category.label}
                </Link>
                {(category.children ?? []).map((child) => (
                  <Link
                    key={child.path}
                    to={child.path}
                    onClick={onNavigate}
                    className="px-5 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-gold transition-colors"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

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
        className={`rounded-lg bg-gradient-to-b from-navy/90 to-primary-dark/90 backdrop-blur-md shadow-xl ring-1 ring-white/10 overflow-hidden ${width}`}
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
                  className="flex items-center justify-between gap-2 px-5 py-2.5 text-sm font-heading font-semibold leading-snug text-white hover:bg-white/10 hover:text-gold transition-colors"
                >
                  {child.label}
                  {child.children && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-white/40" />}
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
          className="w-64 rounded-lg bg-gradient-to-b from-navy/90 to-primary-dark/90 backdrop-blur-md shadow-xl ring-1 ring-white/10 overflow-hidden"
        >
          <div className="flex flex-col py-2">
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
