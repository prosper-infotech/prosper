import IconCardOverviewTemplate from '../components/templates/IconCardOverviewTemplate'
import { NAV } from '../data/navigation'
import { RESOURCE_ICONS } from '../data/resourceIcons'

// About Us lives at /about, so it is added here rather than in NAV (NAV children must sit under /resources).
const resources = [
  { label: 'About Us', path: '/about', description: 'Our mission, vision, values and global engineering team.' },
  ...NAV.find((item) => item.label === 'Resources').children,
]

export default function ResourcesOverview() {
  return (
    <IconCardOverviewTemplate
      title="Resources"
      eyebrow="Learn more"
      heading="About us, guides, videos, and answers from the Prosper Infotech team"
      items={resources}
      icons={RESOURCE_ICONS}
      columns={2}
      ctaTitle="Have a question about your operation?"
      ctaDescription="Talk to our team about the right fit for your operation."
      seoTitle="Resources | Prosper Infotech"
      seoDescription="Learn about Prosper Infotech, plus guides, videos, and FAQs on RFID, GPS, IoT, and AI logistics technology."
    />
  )
}
