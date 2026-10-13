import { Camera, Cpu, Puzzle, ScanLine, Satellite, ShieldCheck } from 'lucide-react'
import Reveal from '../motion/Reveal'
import Eyebrow from './Eyebrow'

const FEATURES = [
  { icon: Camera, label: 'AI Cameras & Edge Gateways', description: 'Capture platform combining AI cameras, GPS/RTK and industrial sensors across gate, yard and reach stacker operations.' },
  { icon: Cpu, label: 'Prosper AI EdgeBox', description: 'YOLO object detection, OCR engine and a task/rules engine running on NVIDIA TensorRT acceleration at the edge.' },
  { icon: ScanLine, label: 'OCR Container ID', description: 'Automatic container number, seal and damage detection at every gate and yard checkpoint.' },
  { icon: Satellite, label: 'GPS / RTK Positioning', description: 'Precise pickup, drop and yard-location confirmation fused with sensor and OCR data.' },
  { icon: Puzzle, label: 'ERP / TOS Integration', description: 'Container inventory updates, task and status APIs feed directly into your existing terminal operating system.' },
  { icon: ShieldCheck, label: 'Reduced Manual Dependency', description: 'Automated validation at arrival, pickup, drop and departure removes manual logging and paperwork.' },
]

export default function FeaturesSection() {
  return (
    <section id="platform" className="relative overflow-hidden bg-gradient-to-b from-navy to-primary-dark">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative max-w-6xl mx-auto px-6 py-16 sm:py-24">
        <Reveal>
          <Eyebrow dark>The Prosper AI EdgeBox</Eyebrow>
          <h2 className="mt-2 text-3xl sm:text-4xl text-white">One capture platform, full automation</h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, label, description }, i) => (
            <Reveal key={label} delay={0.05 * i}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 ring-1 ring-inset ring-gold/30 text-gold">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-heading font-semibold text-white">{label}</h3>
                <p className="mt-2 text-sm text-white/70">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
