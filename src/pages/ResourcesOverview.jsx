import IconCardOverviewTemplate from '../components/templates/IconCardOverviewTemplate'
import { NAV } from '../data/navigation'
import { RESOURCE_ICONS } from '../data/resourceIcons'

const resources = NAV.find((item) => item.label === 'Resources').children

export default function ResourcesOverview() {
  return (
    <IconCardOverviewTemplate
      title="Resources"
      eyebrow="Learn more"
      heading="Guides, videos, and answers from the Prosper Infotech team"
      items={resources}
      icons={RESOURCE_ICONS}
      columns={2}
      ctaTitle="Have a question about your operation?"
      ctaDescription="Talk to our team about the right fit for your operation."
      seoTitle="Resources | Prosper Infotech"
      seoDescription="Guides, case studies, videos, and FAQs on RFID, GPS, IoT, and AI logistics technology from Prosper Infotech."
    />
  )
}
