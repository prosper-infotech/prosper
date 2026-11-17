// Myntra-style section heading: uppercase, letter-spaced, with an optional link on the right.
export default function SectionTitle({ title, subtitle, action }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-lg font-extrabold uppercase tracking-[0.15em] !text-ink-900 md:text-xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-[#7e818c]">{subtitle}</p>}
      </div>
      {action && <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-primary [&_a:hover]:underline">{action}</span>}
    </div>
  )
}
