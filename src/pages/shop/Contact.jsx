import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import Breadcrumb from '../../components/ui/Breadcrumb'
import Reveal from '../../components/motion/Reveal'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { useShop } from '../../shop/shopContext'
import { btn } from '../../shop/format'

export default function Contact() {
  const { config, requestQuote } = useShop()
  useDocumentTitle('Contact Us | Prosper Infotech Shop', 'Call, email or WhatsApp the Prosper Infotech shop team for help with products, orders, bulk quotes and delivery.')
  const whatsapp = `https://wa.me/${config.whatsapp_number}?text=${encodeURIComponent('Hi, I have a question about the Prosper Infotech shop.')}`
  const cards = [
    { icon: Phone, title: 'Call us', text: config.support_phone, href: `tel:${config.support_phone.replace(/\s+/g, '')}` },
    { icon: Mail, title: 'Email us', text: config.support_email, href: `mailto:${config.support_email}` },
    { icon: MessageCircle, title: 'WhatsApp', text: 'Chat with our team', href: whatsapp, external: true },
  ]
  return (
    <>
      <Breadcrumb title="Contact Us" description="Questions about a product, an order or a bulk price? We reply within one business day." />
      <section className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.06}>
              <a
                href={card.href}
                {...(card.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex h-full flex-col items-start rounded-2xl border border-ink-300/70 bg-white p-6 shadow-[0_2px_10px_-4px_rgba(20,52,109,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-dark/60 hover:shadow-[0_24px_40px_-18px_rgba(20,52,109,0.35)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary">
                  <card.icon className="h-5 w-5" />
                </span>
                <span className="mt-4 font-heading text-lg font-bold text-primary">{card.title}</span>
                <span className="mt-1 break-all text-sm text-ink-600">{card.text}</span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl bg-surface-alt p-6 md:flex-row md:items-center md:p-8">
          <div>
            <h2 className="text-xl">Need a price for a large quantity?</h2>
            <p className="mt-1 text-sm text-ink-600">Tell us the product and how many. We send a quote with the delivery time.</p>
          </div>
          <button type="button" onClick={() => requestQuote('Bulk order')} className={`${btn.gold} shrink-0`}>
            Request a quote
            <ArrowRight className="h-4 w-4" />
          </button>
        </Reveal>

        <p className="mt-8 flex items-start gap-2 text-sm text-ink-600">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
          Prosper Infotech, Ganesham A Commercial, Office No. 17-18, 3rd Floor, Pimple Saudagar, Pune 411027, India
        </p>
      </section>
    </>
  )
}
