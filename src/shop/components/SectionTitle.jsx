// Store-style section heading: bold title with a short gold underline, optional link on the right.
export default function SectionTitle({ title, subtitle, action, as: Heading = 'h2' }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4 border-b border-[#eaeaec]">
      <div className="pb-3">
        <Heading className="relative text-lg font-extrabold !text-primary md:text-[22px]">
          {title}
          <span className="absolute -bottom-[13px] left-0 h-[3px] w-14 bg-gold" aria-hidden="true" />
        </Heading>
        {subtitle && <p className="mt-1 text-sm text-[#7e818c]">{subtitle}</p>}
      </div>
      {action && <span className="shrink-0 pb-3 text-sm font-bold text-primary [&_a:hover]:underline">{action}</span>}
    </div>
  )
}
