import { Boxes, Package, UsersRound, Wrench } from 'lucide-react'
import Reveal from '../motion/Reveal'
import Eyebrow from './Eyebrow'

const ENGAGEMENT_MODELS = [
  { icon: Package, title: 'Camera & Sensor Only', description: 'Bring your own gate/yard infrastructure — connect Prosper AI EdgeBox and dashboards.' },
  { icon: Boxes, title: 'Full Hardware + Software Bundle', description: 'AI cameras, GPS/RTK antennas and EdgeBox units included and configured for you.' },
  { icon: Wrench, title: 'Managed Deployment', description: 'Full install, calibration, model tuning and go-live support handled by our team.', featured: true },
  { icon: UsersRound, title: 'Enterprise / Multi-Terminal', description: 'Custom SLAs, dedicated account management and multi-facility rollout planning.' },
]

export default function EngagementSection() {
  return (
    <section id="engagement" className="bg-surface-alt/40">
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
        <Reveal>
          <Eyebrow>Engagement Options</Eyebrow>
          <h2 className="mt-2 text-3xl sm:text-4xl">Choose how you want to run ContainerVision AI</h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ENGAGEMENT_MODELS.map(({ icon: Icon, title, description, featured }, i) => (
            <Reveal key={title} delay={0.05 * i}>
              <div
                className={`relative h-full rounded-2xl bg-white px-5 py-5 shadow-[0_2px_10px_-4px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 ${
                  featured
                    ? 'border-2 border-gold shadow-[0_0_40px_-10px_rgba(247,221,0,0.5)]'
                    : 'border border-ink-300 hover:border-gold/50 hover:shadow-[0_0_40px_-10px_rgba(247,221,0,0.4)]'
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 left-5 rounded-full bg-gradient-to-r from-gold to-gold-dark px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary shadow-md">
                    Most Chosen
                  </span>
                )}
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-gold/25 to-gold/5 ring-1 ring-inset ring-gold/20 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-heading font-semibold text-primary">{title}</h3>
                <p className="mt-2 text-sm text-ink-600">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
