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
  const useTwoColumns = item.children.length > 6
  const columns = useTwoColumns
    ? chunk(item.children, Math.ceil(item.children.length / 2))
    : [item.children]

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.15 }}
      className={`absolute left-0 top-full z-40 pt-3 ${useTwoColumns ? 'w-[38rem]' : 'w-64'}`}
    >
      <div className="rounded-lg bg-gradient-to-b from-navy/70 to-primary-dark/70 backdrop-blur-md shadow-xl ring-1 ring-white/10 overflow-hidden">
        <div className={useTwoColumns ? 'grid grid-cols-2 gap-x-1 py-2' : 'flex flex-col py-2'}>
          {columns.map((col, i) => (
            <div key={i} className="flex flex-col">
              {col.map((child) => (
                <Link
                  key={child.path}
                  to={child.path}
                  onClick={onNavigate}
                  className="px-5 py-2.5 text-sm font-heading font-semibold leading-snug text-white hover:bg-white/10 hover:text-gold transition-colors"
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
