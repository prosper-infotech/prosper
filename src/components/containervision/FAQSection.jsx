import Reveal from '../motion/Reveal'
import Eyebrow from './Eyebrow'
import FAQAccordion from './FAQAccordion'

export const FAQS = [
  { question: 'Does ContainerVision AI replace our terminal operating system?', answer: 'No — it integrates with your existing TOS/ERP through APIs, automating the data capture (container ID, position, damage, timestamps) that would otherwise be logged manually.' },
  { question: 'How accurate is the container OCR?', answer: 'Our OCR + AI models are tuned specifically for container numbers, seals and damage detection in real gate and yard lighting conditions, and are continuously validated against live operations.' },
  { question: 'Can it work with our existing reach stackers and gate cameras?', answer: "In most cases yes — we'll assess your existing hardware during the free consultation and recommend what to add versus reuse." },
  { question: 'How long does deployment take?', answer: 'Most single-facility deployments go live within a few weeks of the free consultation, depending on gate/yard size and camera coverage required.' },
  { question: 'Is support included after go-live?', answer: 'Yes — ongoing monitoring, model tuning and support are included as part of your plan.' },
  { question: 'Do the cameras and sensors hold up in outdoor gate/yard conditions?', answer: 'Yes — the hardware is rated for outdoor use, including rain, dust and varying light conditions typical of container yards and gates.' },
  { question: 'Can it run across multiple terminals or facilities?', answer: 'Yes — Prosper ContainerVision AI supports multi-terminal deployments from a single system, with facility-level and network-level visibility.' },
  { question: 'Does it work if connectivity at the yard is unreliable?', answer: 'Yes — the Prosper AI EdgeBox processes detection locally and syncs to the cloud once connectivity is available, so gate and yard operations never stop.' },
  { question: 'How is our data secured?', answer: 'Data is hosted on Microsoft Azure or AWS with role-based access control, so each user only sees the facilities and functions their role requires.' },
]

export default function FAQSection() {
  return (
    <section id="faq" className="bg-surface">
      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
        <Reveal className="text-center">
          <Eyebrow>Common Questions</Eyebrow>
          <h2 className="mt-2 text-3xl sm:text-4xl">Before you book a demo</h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <FAQAccordion items={FAQS} />
        </Reveal>
      </div>
    </section>
  )
}
