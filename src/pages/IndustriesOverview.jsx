import IconCardOverviewTemplate from '../components/templates/IconCardOverviewTemplate'
import { NAV } from '../data/navigation'
import { INDUSTRY_ICONS } from '../data/industryIcons'

const industries = NAV.find((item) => item.label === 'Industries').children

export default function IndustriesOverview() {
  return (
    <IconCardOverviewTemplate
      title="Industries"
      heading="Purpose-built solutions across the industries we serve"
      items={industries}
      icons={INDUSTRY_ICONS}
      ctaTitle="Have a question about your industry?"
      ctaDescription="Talk to our team about the right fit for your operation."
    />
  )
}
