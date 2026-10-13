import Reveal from '../motion/Reveal'
import Eyebrow from './Eyebrow'
import ProcessSteps from './ProcessSteps'

const PROCESS_STEPS = [
  { title: 'Free Consultation', description: 'We assess your gate, yard and reach stacker workflows — no cost, no obligation.' },
  { title: 'Deploy Cameras & EdgeBox', description: 'AI cameras, GPS/RTK antennas and the Prosper AI EdgeBox are installed at gate, yard and equipment.' },
  { title: 'Go Live', description: 'Automated arrival, pickup/drop and departure validation start flowing into your dashboard and ERP.' },
  { title: 'Ongoing Support', description: 'Our team monitors accuracy, tunes detection models and scales coverage as your terminal grows.' },
]

export default function ProcessSection() {
  return (
    <section id="how-it-works" className="bg-surface-alt/40">
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
        <Reveal>
          <Eyebrow>How It Works</Eyebrow>
          <h2 className="mt-2 text-3xl sm:text-4xl">From consultation to live automation</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <ProcessSteps steps={PROCESS_STEPS} />
        </Reveal>
      </div>
    </section>
  )
}
