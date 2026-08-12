import Reveal from '../motion/Reveal'

export default function ProcessSteps({ steps }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <Reveal key={step.title} delay={i * 0.1}>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary font-heading font-bold text-xl shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.15)]">
              {i + 1}
            </div>
            <h3 className="font-heading font-semibold text-lg text-ink-900">{step.title}</h3>
            <p className="text-sm text-ink-600 max-w-[15rem]">{step.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
