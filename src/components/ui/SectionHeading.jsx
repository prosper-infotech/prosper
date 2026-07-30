export default function SectionHeading({ eyebrow, title, align = 'center', className = '' }) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <div className={`flex flex-col gap-3 ${alignment} ${className}`}>
      {eyebrow && (
        <span className="text-primary text-sm font-semibold uppercase tracking-widest">
          {eyebrow}
        </span>
      )}
      <div className="flex items-center gap-4">
        <span className="hidden sm:block h-0.5 w-10 bg-primary" />
        <h2 className="text-3xl md:text-[38px] md:leading-[44px] text-ink-900">{title}</h2>
        <span className="hidden sm:block h-0.5 w-10 bg-primary" />
      </div>
    </div>
  )
}
