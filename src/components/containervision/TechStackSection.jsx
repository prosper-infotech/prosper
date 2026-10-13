import { Camera, Cloud, Cpu, Link2 } from 'lucide-react'
import Reveal from '../motion/Reveal'
import Eyebrow from './Eyebrow'

const TECH_STACK_GROUPS = [
  { title: 'Hardware', icon: Camera, items: ['AI Cameras', 'GPS / RTK Antennas', 'Industrial Sensors', 'Prosper AI EdgeBox'] },
  { title: 'AI / Vision Software', icon: Cpu, items: ['YOLO Object Detection', 'OCR Engine', 'NVIDIA TensorRT', 'Rules Engine'] },
  { title: 'Integration', icon: Link2, items: ['REST APIs', 'TOS / ERP Connectors', 'EDI', 'Event Webhooks'] },
  { title: 'Cloud & Infrastructure', icon: Cloud, items: ['Microsoft Azure', 'AWS', 'Edge-to-Cloud Sync', 'Role-Based Access Control'] },
]

export default function TechStackSection() {
  return (
    <section id="technology" className="bg-surface">
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
        <Reveal>
          <Eyebrow>Technology Stack</Eyebrow>
          <h2 className="mt-2 text-3xl sm:text-4xl">What's under the hood</h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TECH_STACK_GROUPS.map(({ title, icon: Icon, items }, i) => (
            <Reveal key={title} delay={0.05 * i}>
              <div className="h-full overflow-hidden rounded-2xl border border-ink-300 bg-white shadow-[0_2px_10px_-4px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_0_40px_-10px_rgba(247,221,0,0.4)]">
                <div className="flex items-center gap-2.5 bg-gradient-to-r from-navy to-primary-dark px-5 py-3.5">
                  <Icon className="h-4.5 w-4.5 shrink-0 text-gold" />
                  <h3 className="text-sm font-heading font-semibold text-white">{title}</h3>
                </div>
                <ul className="flex flex-wrap gap-1.5 px-5 py-4">
                  {items.map((item) => (
                    <li key={item} className="rounded-full bg-surface-alt px-2.5 py-1 text-xs font-medium text-ink-900">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
