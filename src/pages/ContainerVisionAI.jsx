import Hero from '../components/containervision/Hero'
import WorkflowSection from '../components/containervision/WorkflowSection'
import ProcessSection from '../components/containervision/ProcessSection'
import FeaturesSection from '../components/containervision/FeaturesSection'
import EngagementSection from '../components/containervision/EngagementSection'
import TechStackSection from '../components/containervision/TechStackSection'
import IndustriesSection from '../components/containervision/IndustriesSection'
import FAQSection, { FAQS } from '../components/containervision/FAQSection'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { SOFTWARE_PRODUCTS_DETAIL } from '../data/softwareProductsDetail'

const PATH = '/products/software/containervision-ai'
const detail = SOFTWARE_PRODUCTS_DETAIL[PATH]
const URL = `https://www.prosperinfotech.com${PATH}`

// Product + FAQ + breadcrumb structured data for search and AI answer engines.
const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: detail.name,
      description: `${detail.tagline} — ${detail.description}`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web-based',
      brand: { '@type': 'Brand', name: 'Prosper Infotech' },
      url: URL,
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.prosperinfotech.com/' },
        { '@type': 'ListItem', position: 2, name: 'Software', item: 'https://www.prosperinfotech.com/products/software' },
        { '@type': 'ListItem', position: 3, name: detail.name, item: URL },
      ],
    },
  ],
}

// Prosper ContainerVision AI product page. The sections come from the standalone landing page
// (cv.prosperinfotech.com) so the two stay identical; header, footer and floating buttons are the main site's.
export default function ContainerVisionAI() {
  useDocumentTitle(detail.seoTitle, detail.seoDescription, SCHEMA)

  return (
    <>
      <Hero />
      <WorkflowSection />
      <ProcessSection />
      <FeaturesSection />
      <EngagementSection />
      <TechStackSection />
      <IndustriesSection />
      <FAQSection />
    </>
  )
}
