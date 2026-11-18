import { Link } from 'react-router-dom'
import { BadgeCheck, Boxes, FileText, Headset, Truck, Wrench } from 'lucide-react'
import Breadcrumb from '../../components/ui/Breadcrumb'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { useShop } from '../../shop/shopContext'
import { CategoryIcon } from '../../shop/components/ui'
import { btn } from '../../shop/format'
import { COMPANY_URL } from '../../shop/site'
import { STATIC_PAGE_META } from '../../../shared/pages.js'

const REASONS = [
  { icon: BadgeCheck, title: 'Genuine products', text: 'Branded hardware from authorised channels, with the maker’s warranty.' },
  { icon: Wrench, title: 'Engineers, not just sellers', text: 'We design and install RFID and barcode systems, so we know what works on site.' },
  { icon: FileText, title: 'GST invoice', text: 'Prices include GST and every order comes with a proper tax invoice.' },
  { icon: Boxes, title: 'Bulk and project supply', text: 'From one scanner to thousands of tags, with quantity pricing.' },
  { icon: Truck, title: 'Delivery across India', text: 'Tracked courier to your door, with dispatch updates by email.' },
  { icon: Headset, title: 'Help after you buy', text: 'Setup help, warranty claims and advice by phone, email or WhatsApp.' },
]

export default function AboutPage() {
  const { categories, products } = useShop()
  const meta = STATIC_PAGE_META.about
  useDocumentTitle(meta.title, meta.description)
  const live = categories.filter((c) => products.some((p) => p.category === c.slug))

  return (
    <>
      <Breadcrumb title="About us" h1="About Prosper Infotech Shop" description="Automation and identification hardware for Indian businesses, from the team that installs it." />

      <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
        <section className="grid items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-ink-900">
            <h2 className="text-2xl font-extrabold">Who we are</h2>
            <p>
              Prosper Infotech is a technology company based in Pune. We build and install RFID, barcode and asset tracking systems for factories, warehouses, offices,
              hospitals and retailers.
            </p>
            <p>
              This shop is where we sell the hardware we use every day: RFID tags and readers, smart cards, barcode scanners, label printers and their ribbons and labels,
              POS terminals, access control and security equipment, and office machines.
            </p>
            <p>
              Because our engineers install these products, we can help you choose the right one, set it up, and support it after you buy. If you need a full system, we can
              do that too.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Link to="/c/all" className={btn.navy}>
                Browse products
              </Link>
              <a href={COMPANY_URL} target="_blank" rel="noopener noreferrer" className={btn.gold}>
                Company website
              </a>
            </div>
          </div>
          <ul className="grid grid-cols-3 gap-3">
            {live.slice(0, 9).map((c) => (
              <li key={c.slug}>
                <Link to={`/c/${c.slug}`} className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border border-[#eaeaec] bg-white p-3 text-center hover:border-primary">
                  <CategoryIcon category={c} className="h-8 w-8 stroke-[1.4] text-primary" />
                  <span className="text-xs font-bold leading-tight text-ink-900">{c.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-extrabold">Why buy from us</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REASONS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4 rounded-lg border border-[#eaeaec] bg-white p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-alt">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-bold text-primary">{title}</span>
                  <span className="mt-1 block text-sm text-[#535766]">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 rounded-lg bg-primary p-8 text-white md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <h2 className="text-2xl font-extrabold !text-white">Visit or write to us</h2>
            <p className="mt-2 max-w-xl text-white/80">Prosper Infotech, Ganesham A Commercial, Office No. 17-18, 3rd Floor, Pimple Saudagar, Pune 411027, Maharashtra, India.</p>
          </div>
          <Link to="/contact" className={`${btn.gold} mt-6 shrink-0 md:mt-0`}>
            Contact us
          </Link>
        </section>
      </div>
    </>
  )
}
