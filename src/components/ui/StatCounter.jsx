import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function useCountUp(target, inView, duration = 1200) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const numeric = parseInt(target.match(/^\d+/)?.[0] ?? '0', 10)
    const start = performance.now()

    let frame
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setValue(Math.round(numeric * progress))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, target, duration])

  return value
}

export default function StatCounter({ value, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const count = useCountUp(value, inView)
  const leadingDigits = value.match(/^\d+/)?.[0] ?? ''
  const suffix = value.slice(leadingDigits.length)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-1"
    >
      <span className="text-4xl md:text-5xl font-heading font-bold text-gold">
        {count}
        {suffix}
      </span>
      <span className="text-sm text-ink-300 uppercase tracking-wide min-h-[42px] flex items-center justify-center text-center">
        {label}
      </span>
    </motion.div>
  )
}
