import { Link } from 'react-router-dom'
import { MessageCircle, Phone } from 'lucide-react'
import Breadcrumb from '../../components/ui/Breadcrumb'
import FAQAccordion from '../../components/ui/FAQAccordion'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { useCart } from '../../shop/shopContext'
import { btn } from '../../shop/format'
import { FAQ_GROUPS, faqLd } from '../../../shared/faq.js'
import { STATIC_PAGE_META } from '../../../shared/pages.js'

const SCHEMA = { '@context': 'https://schema.org', '@graph': [faqLd()] }

export default function FaqPage() {
  const { config } = useCart()
  const meta = STATIC_PAGE_META.faq
  useDocumentTitle(meta.title, meta.description, SCHEMA)
  return (
    <>
      <Breadcrumb title="FAQ" h1="Frequently asked questions" description="Ordering, GST invoices, payment, delivery, returns and warranty, answered." />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[220px_1fr] lg:px-8">
        <nav aria-label="FAQ topics" className="hidden lg:block">
          <ul className="sticky top-[140px] flex flex-col gap-1 border-l-2 border-[#eaeaec]">
            {FAQ_GROUPS.map((g) => (
              <li key={g.title}>
                <a href={`#${slug(g.title)}`} className="-ml-0.5 block border-l-2 border-transparent py-1.5 pl-4 text-sm font-semibold text-ink-900 hover:border-gold hover:text-primary">
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-10">
          {FAQ_GROUPS.map((g) => (
            <section key={g.title} id={slug(g.title)} className="scroll-mt-40">
              <h2 className="mb-4 text-xl font-extrabold">{g.title}</h2>
              <FAQAccordion items={g.items} />
            </section>
          ))}
          <div className="flex flex-col items-start gap-4 rounded-lg bg-primary p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <h2 className="text-xl font-extrabold !text-white">Still have a question?</h2>
              <p className="mt-1 text-white/80">Our team replies within one business day, usually much sooner.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {config.support_phone && (
                <a href={`tel:${config.support_phone.replace(/\s+/g, '')}`} className={btn.gold}>
                  <Phone className="h-4 w-4" />
                  Call us
                </a>
              )}
              {config.whatsapp_number && (
                <a href={`https://wa.me/${config.whatsapp_number}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-white px-5 py-3 text-[13px] font-bold uppercase tracking-wider text-white hover:bg-white hover:text-primary">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              )}
              <Link to="/contact" className="inline-flex items-center rounded-md px-3 py-3 text-[13px] font-bold uppercase tracking-wider text-gold hover:underline">
                Contact page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function slug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
