import Reveal from '../motion/Reveal'

export default function VisualGallery({ items }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => (
        <Reveal key={item.caption} delay={i * 0.08}>
          <div className="group relative overflow-hidden rounded-xl border border-ink-300 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_50px_-8px_rgba(247,221,0,0.35),0_25px_50px_-12px_rgba(0,0,0,0.25)]">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={item.image}
                alt={item.caption}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 pt-10">
              <span className="text-white text-sm font-semibold leading-snug">{item.caption}</span>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
