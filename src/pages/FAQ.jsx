import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Breadcrumb from '../components/ui/Breadcrumb'
import CTABand from '../components/ui/CTABand'
import Reveal from '../components/motion/Reveal'

const FAQS = [
  {
    question: 'What industries does Prosper Infotech serve?',
    answer:
      'We work across logistics, warehousing, manufacturing, ports and terminals, container freight stations, supply chain, 3PL, cold chain, healthcare, pharma, retail, construction, and media and entertainment.',
  },
  {
    question: 'Do I need to buy hardware upfront?',
    answer:
      'Not necessarily. Our Prosper Asset Tracking platform, for example, is delivered as a SaaS model with RFID hardware included and no upfront cost — you pay monthly instead of investing in capital equipment. Other solutions can be scoped as hardware-plus-software or software-only, depending on what you already have in place.',
  },
  {
    question: 'How long does implementation typically take?',
    answer:
      'Timelines vary based on project scope and site count. After an initial consultation, we provide a project plan with clear milestones for hardware installation, software configuration, integration, and go-live.',
  },
  {
    question: 'Can your platforms integrate with our existing ERP, WMS, or TMS?',
    answer:
      'Yes. All of our platforms expose REST APIs and support common integration protocols, so RFID, GPS, and IoT data flows directly into the systems you already use instead of requiring a separate dashboard.',
  },
  {
    question: 'Do you provide the hardware as well as the software?',
    answer:
      'Yes. We supply and support fixed and handheld RFID readers, GPS-enabled edge devices, AI edge boxes, and IoT gateways alongside our software platforms, so you get a complete solution from one provider.',
  },
  {
    question: 'What support do you offer after go-live?',
    answer:
      'Our support team provides 24/7 system monitoring, remote troubleshooting, incident management, and preventive maintenance, with SLA-based support plans available.',
  },
  {
    question: 'Where are your offices located?',
    answer: 'We have offices in Dallas, Texas, USA and Pune, India, serving clients worldwide.',
  },
  {
    question: 'Do you offer IBM i / AS400 development and modernization services?',
    answer:
      'Yes. We provide end-to-end IBM i (AS400) consulting, development, modernization, integration, and support — including RPG/RPGLE and COBOL application development, system administration, and cloud migration.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Security is built into our platforms at the hardware and software level, including TLS encryption, X.509 certificates, and secure element hardware on our edge devices. Solutions like our video-based attendance system also support on-premise processing, so sensitive data never has to leave your facility.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Book a demo with our team. We\'ll walk through your operation, recommend the right solution, and outline a project plan — no obligation required.',
  },
]

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-ink-300">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-heading font-semibold text-ink-900">{faq.question}</span>
        <ChevronDown
          className={`h-5 w-5 text-primary shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-ink-600 leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <>
      <Breadcrumb title="FAQs" parent="Resources" />

      <section className="max-w-3xl mx-auto px-6 pt-16 pb-8 text-center">
        <Reveal className="flex flex-col items-center gap-4">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Resources
          </span>
          <h2 className="text-3xl md:text-[38px] md:leading-[44px]">
            Frequently asked questions
          </h2>
          <p className="text-ink-600 text-lg">
            Answers to the questions we hear most about our RFID, GPS, IoT, and AI solutions.
          </p>
        </Reveal>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-16">
        <Reveal className="flex flex-col">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </Reveal>
      </section>

      <CTABand
        title="Still have questions?"
        description="Talk to our team — we're happy to walk through your specific requirements."
      />
    </>
  )
}
