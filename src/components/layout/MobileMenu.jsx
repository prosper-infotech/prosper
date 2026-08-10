import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { ChevronDown, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV } from '../../data/navigation'
import Button from '../ui/Button'
import logo from '../../assets/logo-dark.png'

export default function MobileMenu({ open, onClose }) {
  const [expanded, setExpanded] = useState(null)

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed inset-y-0 right-0 z-50 w-[85vw] max-w-sm overflow-y-auto bg-navy text-white lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <img
                src={logo}
                alt="Prosper Infotech"
                className="h-8 w-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
              />
              <button type="button" onClick={onClose} aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="px-5 py-4 flex flex-col">
              {NAV.map((item) => (
                <div key={item.path} className="border-b border-white/10 py-2">
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between py-2 text-left font-heading font-semibold"
                        onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${expanded === item.label ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <AnimatePresence>
                        {expanded === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-1 pb-2 pl-3">
                              {item.children.map((child) => (
                                <div key={child.path} className="flex flex-col">
                                  <Link
                                    to={child.path}
                                    onClick={onClose}
                                    className="py-1.5 text-sm text-ink-300 hover:text-white"
                                  >
                                    {child.label}
                                  </Link>
                                  {child.children && (
                                    <div className="flex flex-col gap-1 pl-3">
                                      {child.children.map((grandchild) => (
                                        <Link
                                          key={grandchild.path}
                                          to={grandchild.path}
                                          onClick={onClose}
                                          className="py-1 text-xs text-ink-300/80 hover:text-white"
                                        >
                                          {grandchild.label}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className="block py-2 font-heading font-semibold"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div className="px-5 py-6">
              <Button to="/contact" variant="primary" onClick={onClose} className="w-full">
                Book a demo
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
