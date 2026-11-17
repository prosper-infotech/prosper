import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/ui/Breadcrumb'
import Reveal from '../../components/motion/Reveal'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { useShop } from '../../shop/shopContext'
import { formatINR } from '../../../shared/pricing.js'

const EFFECTIVE_DATE = 'November 16, 2026'

// Plain-language shop policies. `config` carries the live shipping settings so
// the numbers here always match what checkout charges.
const POLICIES = {
  'shipping-policy': {
    title: 'Shipping Policy',
    description: 'Where we deliver, what shipping costs and how long delivery takes for orders from the Prosper Infotech online shop.',
    sections: (c) => [
      { title: 'Where we deliver', body: ['We deliver to addresses in India. We do not ship outside India from the online shop. For orders from other countries, please contact us for a quote.'] },
      {
        title: 'Shipping charges',
        body: [
          c.shipping_flat_paise
            ? `Shipping is a flat ${formatINR(c.shipping_flat_paise)} per order, including GST.${c.free_shipping_threshold_paise ? ` Orders of ${formatINR(c.free_shipping_threshold_paise)} or more ship free.` : ''}`
            : 'The shipping charge for your order is shown in the cart and at checkout before you pay.',
          'The exact shipping charge is always shown in your cart and at checkout before you place the order.',
        ],
      },
      {
        title: 'Dispatch and delivery time',
        list: [
          'Orders are packed and handed to the courier after payment is confirmed. For bank transfer and UPI orders, that is when the payment reaches our account.',
          `Delivery usually takes ${c.delivery_days_min} to ${c.delivery_days_max} working days after dispatch. Remote areas can take a few days longer.`,
          'These times are estimates. Courier delays, weather, holidays and local restrictions can add time.',
        ],
      },
      { title: 'Tracking', body: ['When your order ships, we email you the courier name, tracking number and a tracking link. The same details appear on your order page.'] },
      {
        title: 'When the parcel arrives',
        list: [
          'Check the outer box before accepting it. If it looks opened or badly damaged, note it with the delivery person and take photos.',
          'Tell us within 48 hours of delivery if anything is damaged or missing, with photos of the box and the product.',
          'If nobody is available to receive the parcel, the courier will try again. Parcels returned to us after failed attempts can be re-sent at an extra shipping charge.',
        ],
      },
      { title: 'Questions', contact: true },
    ],
  },
  'returns-refunds': {
    title: 'Returns & Refunds',
    description: 'What to do if a product arrives damaged, faulty or wrong, and how refunds work for orders from the Prosper Infotech online shop.',
    sections: () => [
      { title: 'Our promise', body: ['If a product arrives damaged, faulty, or different from what you ordered, we will repair it, replace it or refund you.'] },
      {
        title: 'How to report a problem',
        list: [
          'Contact us within 7 days of delivery with your order number, a short description and photos or a video of the problem.',
          'Please keep the product, accessories and original packaging until we confirm the next step.',
          'We reply within 2 working days with the solution: a replacement, a repair under warranty, or a refund.',
        ],
      },
      {
        title: 'What cannot be returned',
        list: [
          'Products that work correctly and match the order, including orders placed by mistake or where the product does not suit your use. Ask us before ordering if you are unsure: we are happy to advise.',
          'RFID tags, labels, ribbons and other consumables once the pack has been opened or used.',
          'Products encoded, printed, configured or made to your specification.',
          'Products damaged by misuse, wrong installation, wrong power supply, liquid or unauthorised repair.',
        ],
      },
      {
        title: 'Cancelling an order',
        body: ['You can cancel an order any time before it ships by contacting us with the order number. Any payment made is refunded in full. Once an order has shipped it cannot be cancelled.'],
      },
      {
        title: 'Refunds',
        list: [
          'Approved refunds are made to the original payment method: the same card, UPI or bank account.',
          'Online payments are refunded through our payment partner and usually reach you in 5 to 7 working days, depending on your bank.',
          'Bank transfer and UPI payments are refunded to the account they came from.',
          'We email you when a refund has been processed.',
        ],
      },
      { title: 'Questions', contact: true },
    ],
  },
  warranty: {
    title: 'Warranty',
    description: 'Warranty cover for RFID readers, barcode scanners, printers and other products bought from the Prosper Infotech online shop.',
    sections: () => [
      { title: 'What is covered', body: ['Hardware sold on the shop is covered against manufacturing defects by the warranty of its manufacturer. The warranty period depends on the product and is stated on your invoice or the product documents. If you need to know the warranty period before you buy, ask us and we will confirm it in writing.'] },
      {
        title: 'What is not covered',
        list: [
          'Consumables such as RFID tags, labels and printer ribbons, beyond being free of defects on arrival.',
          'Normal wear, including batteries, print heads and cables, unless the manufacturer states otherwise.',
          'Damage from drops, liquid, power surges, wrong power supply, misuse or unauthorised repair.',
          'Products with removed or altered serial numbers.',
        ],
      },
      {
        title: 'How to make a warranty claim',
        list: [
          'Contact us with your order number or invoice number, the product serial number and a description of the fault.',
          'Our team will first try to solve the problem by phone or remote support.',
          'If the product needs repair, we will tell you where to send it. Repaired or replaced products are returned to you.',
        ],
      },
      { title: 'Installation and support', body: ['Need help installing readers and antennas or connecting them to your software? Our RFID services team can plan, install and support the full system.'], link: { href: 'https://www.prosperinfotech.com/services/rfid-services', label: 'See RFID services' } },
      { title: 'Questions', contact: true },
    ],
  },
  'terms-of-sale': {
    title: 'Terms of Sale',
    description: 'The terms that apply when you buy from the Prosper Infotech online shop: orders, prices, GST, payment, delivery and liability.',
    sections: () => [
      { title: 'Who we are', body: ['This online shop is run by Prosper Infotech ("we", "us"). These terms apply to every order placed on the shop. By placing an order you agree to them.'] },
      {
        title: 'Orders',
        list: [
          'Your order is an offer to buy. It is accepted when we confirm your payment by email.',
          'We may decline or cancel an order, for example if a product is out of stock, a price was shown wrongly, or we cannot deliver to your address. If you have paid, you are refunded in full.',
          'Products marked "Request price" are not sold through the cart. They are sold by written quote.',
        ],
      },
      {
        title: 'Prices and GST',
        list: [
          'All prices are in Indian Rupees and include GST.',
          'A GST invoice is issued for each paid order. If you give a valid GSTIN at checkout, it is shown on the invoice. The GSTIN cannot be changed after the invoice is issued.',
          'Prices can change at any time, but not for an order we have already accepted.',
        ],
      },
      {
        title: 'Payment',
        list: [
          'You can pay online by card, UPI, net banking or wallet through our payment partner, or by bank transfer or UPI to our account.',
          'Card details are entered on the payment partner\'s secure page. We do not see or store them.',
          'Bank transfer and UPI orders are held for 5 working days. If payment does not arrive, the order may be cancelled.',
        ],
      },
      { title: 'Delivery', body: ['Delivery is covered by our Shipping Policy. Ownership and risk pass to you on delivery.'], link: { to: '/shipping-policy', label: 'Shipping Policy' } },
      { title: 'Returns, refunds and warranty', body: ['These are covered by our Returns & Refunds policy and our Warranty page.'], link: { to: '/returns-refunds', label: 'Returns & Refunds' } },
      { title: 'Product information', body: ['We take care to describe products correctly. Photos are for illustration, and specifications shown as "typical" are confirmed for the exact model before dispatch. If a product does not match its description, the Returns & Refunds policy applies.'] },
      { title: 'Liability', body: ['Nothing in these terms limits rights you have under Indian law that cannot be limited. Otherwise, our total liability for an order is limited to the amount you paid for it, and we are not liable for indirect losses such as lost profit or business interruption.'] },
      { title: 'Governing law', body: ['These terms are governed by the laws of India. The courts of Pune, Maharashtra have jurisdiction over any dispute.'] },
      { title: 'Questions', contact: true },
    ],
  },
}

export default function PolicyPage({ slug }) {
  const { config } = useShop()
  const policy = POLICIES[slug]
  useDocumentTitle(`${policy.title} | Prosper Infotech Shop`, policy.description)

  return (
    <>
      <Breadcrumb title={policy.title} />
      <section className="mx-auto max-w-3xl px-6 py-16">
        <Reveal className="mb-10">
          <p className="text-sm text-ink-500">Effective date: {EFFECTIVE_DATE}</p>
        </Reveal>
        <div className="flex flex-col gap-10">
          {policy.sections(config).map((section, i) => (
            <Reveal key={section.title} delay={(i % 4) * 0.05}>
              <h2 className="mb-3 font-heading text-xl font-semibold text-primary">{section.title}</h2>
              {section.body?.map((para) => (
                <p key={para} className="mb-3 leading-relaxed text-ink-600">
                  {para}
                </p>
              ))}
              {section.list && (
                <ul className="mb-3 flex flex-col gap-2">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-2 leading-relaxed text-ink-600">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.link?.to && (
                <Link to={section.link.to} className="font-semibold text-primary underline decoration-gold-dark decoration-2 underline-offset-4">
                  {section.link.label}
                </Link>
              )}
              {section.link?.href && (
                <a href={section.link.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline decoration-gold-dark decoration-2 underline-offset-4">
                  {section.link.label}
                </a>
              )}
              {section.contact && (
                <ul className="flex flex-col gap-1.5 text-ink-600">
                  <li>
                    Email:{' '}
                    <a href={`mailto:${config.support_email}`} className="text-primary transition-colors hover:text-gold-dark">
                      {config.support_email}
                    </a>
                  </li>
                  <li>
                    Phone:{' '}
                    <a href={`tel:${config.support_phone.replace(/\s+/g, '')}`} className="text-primary transition-colors hover:text-gold-dark">
                      {config.support_phone}
                    </a>
                  </li>
                  <li>
                    Or use our{' '}
                    <Link to="/contact" className="text-primary underline">
                      contact page
                    </Link>
                    .
                  </li>
                </ul>
              )}
            </Reveal>
          ))}
        </div>
        <nav aria-label="Shop policies" className="mt-14 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink-300/60 pt-6 text-sm">
          {Object.entries(POLICIES)
            .filter(([key]) => key !== slug)
            .map(([key, p]) => (
              <Link key={key} to={`/${key}`} className="font-semibold text-primary underline decoration-gold-dark decoration-2 underline-offset-4">
                {p.title}
              </Link>
            ))}
          <Link to="/privacy-policy" className="font-semibold text-primary underline decoration-gold-dark decoration-2 underline-offset-4">
            Privacy Policy
          </Link>
        </nav>
      </section>
    </>
  )
}
