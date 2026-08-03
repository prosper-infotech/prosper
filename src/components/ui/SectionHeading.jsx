import Reveal from '../motion/Reveal'
import AnimatedText from '../motion/AnimatedText'

export default function SectionHeading({ eyebrow, title, align = 'center', variant = 'light', className = '' }) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  const eyebrowColor = variant === 'dark' ? 'text-gold' : 'text-primary'
  const titleColor = variant === 'dark' ? 'text-white' : ''

  return (
    <Reveal className={`flex flex-col gap-3 ${alignment} ${className}`}>
      {eyebrow && (
        <span className={`${eyebrowColor} text-sm font-semibold uppercase tracking-widest`}>
          {eyebrow}
        </span>
      )}
      <div className="flex items-center gap-4">
        <span className="hidden sm:block h-0.5 w-10 bg-gold" />
        <AnimatedText
          as="h2"
          text={title}
          className={`text-3xl md:text-[38px] md:leading-[44px] ${titleColor}`}
        />
        <span className="hidden sm:block h-0.5 w-10 bg-gold" />
      </div>
    </Reveal>
  )
}
