import IconCardOverviewTemplate from '../components/templates/IconCardOverviewTemplate'
import { NAV } from '../data/navigation'
import { SOLUTION_ICONS } from '../data/solutionIcons'
import { SOLUTION_IMAGES } from '../data/solutionImages'

const solutions = NAV.find((item) => item.label === 'Solutions').children

export default function SolutionsOverview() {
  return (
    <IconCardOverviewTemplate
      title="Solutions"
      heading="IoT, RFID, GPS, and AI solutions for every corner of your operation"
      items={solutions}
      icons={SOLUTION_ICONS}
      images={SOLUTION_IMAGES}
      h1="AI Logistics Solutions"
      ctaTitle="Have a question about Solutions?"
      ctaDescription="Talk to our team about the right fit for your operation."
      seoTitle="AI Logistics Solutions | RFID, GPS & IoT | Prosper Infotech"
      seoDescription="AI logistics solutions built on IoT, RFID, and GPS — explore Prosper Infotech's full lineup for warehouses, yards, fleets, and ports."
    />
  )
}
