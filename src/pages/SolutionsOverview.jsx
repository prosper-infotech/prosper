import IconCardOverviewTemplate from '../components/templates/IconCardOverviewTemplate'
import { NAV } from '../data/navigation'
import { SOLUTION_ICONS } from '../data/solutionIcons'

const solutions = NAV.find((item) => item.label === 'Solutions').children

export default function SolutionsOverview() {
  return (
    <IconCardOverviewTemplate
      title="Solutions"
      heading="IoT, RFID, GPS, and AI solutions for every corner of your operation"
      items={solutions}
      icons={SOLUTION_ICONS}
      ctaTitle="Have a question about Solutions?"
      ctaDescription="Talk to our team about the right fit for your operation."
    />
  )
}
