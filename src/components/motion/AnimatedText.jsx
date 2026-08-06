import { motion } from 'framer-motion'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
}

const word = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

export default function AnimatedText({
  text,
  className = '',
  as = 'span',
  scroll = true,
  highlightWords = [],
}) {
  const words = text.split(' ')
  const MotionTag = motion[as] ?? motion.span
  const scrollProps = scroll
    ? { whileInView: 'visible', viewport: { once: true, margin: '-80px' } }
    : { animate: 'visible' }
  const highlightSet = new Set(highlightWords.map((w) => w.toLowerCase()))

  return (
    <MotionTag className={className} variants={container} initial="hidden" {...scrollProps}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={word}
          className={highlightSet.has(w.toLowerCase()) ? 'text-gold' : undefined}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {w}
        </motion.span>
      ))}
    </MotionTag>
  )
}
