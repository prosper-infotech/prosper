import IconCardOverviewTemplate from '../components/templates/IconCardOverviewTemplate'
import { NAV } from '../data/navigation'
import { PRODUCT_ICONS } from '../data/productIcons'

const products = NAV.find((item) => item.label === 'Products').children

export default function ProductsOverview() {
  return (
    <IconCardOverviewTemplate
      title="Products"
      heading="Software platforms and hardware built for RFID, GPS, and IoT deployments"
      items={products}
      icons={PRODUCT_ICONS}
      columns={2}
      ctaTitle="Have a question about our Products?"
      ctaDescription="Talk to our team about the right fit for your operation."
      seoTitle="RFID Software Platforms & Hardware Products | Prosper Infotech"
      seoDescription="Software platforms and industrial hardware built for RFID, GPS, and IoT deployments — explore Prosper Infotech's products."
    />
  )
}
