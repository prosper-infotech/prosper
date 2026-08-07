import IconCardOverviewTemplate from '../components/templates/IconCardOverviewTemplate'
import { NAV } from '../data/navigation'
import { SERVICE_ICONS } from '../data/serviceIcons'

const services = NAV.find((item) => item.label === 'Services').children

export default function ServicesOverview() {
  return (
    <IconCardOverviewTemplate
      title="Services"
      heading="Development, implementation, and support across our full solution stack"
      items={services}
      icons={SERVICE_ICONS}
      ctaTitle="Have a question about our Services?"
      ctaDescription="Talk to our team about the right fit for your operation."
      seoTitle="Services | Prosper Infotech"
      seoDescription="Development, implementation, and support services across software, RFID, IoT, and AS400 — explore what Prosper Infotech offers."
    />
  )
}
