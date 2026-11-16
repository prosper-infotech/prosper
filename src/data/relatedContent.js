import { NAV } from './navigation'
import { SOFTWARE_PRODUCTS } from './softwareProductsDetail'
import { BLOG_POSTS } from './blogPosts'

// Hand-picked links between pages (solutions, products, services, industries), so every page points to
// the pages that explain or sell the same thing. Blog posts are matched automatically by topic below.
export const RELATED_PAGES = {
  // Solutions
  '/solutions/warehouse-solutions': ['/products/software/wms', '/solutions/asset-tracking', '/solutions/rfid-gps-solutions', '/industries/warehousing'],
  '/solutions/yard-solutions': ['/products/software/yardvision-ai', '/solutions/gate-yard-dock-vision-ai', '/solutions/container-terminal-automation', '/industries/logistics'],
  '/solutions/fleet-management': ['/solutions/rfid-gps-solutions', '/products/software/rfid-gps', '/solutions/yard-solutions', '/industries/logistics'],
  '/solutions/rfid-gps-solutions': ['/products/software/rfid-gps', '/products/software/asset-tracking', '/services/rfid-services', '/solutions/fleet-management'],
  '/solutions/asset-tracking': ['/products/software/asset-tracking', '/solutions/rfid-gps-solutions', '/services/rfid-services', '/industries/healthcare'],
  '/solutions/container-terminal-automation': ['/products/software/containervision-ai', '/products/software/yardvision-ai', '/industries/ports-terminals', '/industries/cfs'],
  '/solutions/gate-yard-dock-vision-ai': ['/products/software/dockvision-ai', '/products/software/yardvision-ai', '/products/software/containervision-ai', '/services/ai-software-development/ai-computer-vision-ocr'],
  '/solutions/industrial-iot': ['/services/industrial-iot-services', '/products/hardware', '/services/ai-software-development/edge-ai-iot-software-development', '/industries/manufacturing'],
  '/solutions/ai-computer-vision': ['/services/ai-software-development/ai-computer-vision-ocr', '/solutions/gate-yard-dock-vision-ai', '/products/software/containervision-ai', '/products/software/video-attendance'],
  '/solutions/workforce-management': ['/products/software/video-attendance', '/solutions/ai-computer-vision', '/industries/manufacturing'],

  // Software products
  '/products/software/dockvision-ai': ['/solutions/gate-yard-dock-vision-ai', '/solutions/warehouse-solutions', '/products/software/yardvision-ai', '/industries/warehousing'],
  '/products/software/containervision-ai': ['/solutions/container-terminal-automation', '/industries/cfs', '/industries/ports-terminals', '/products/software/yardvision-ai'],
  '/products/software/asset-tracking': ['/solutions/asset-tracking', '/solutions/rfid-gps-solutions', '/products/rfid-assets', '/services/rfid-services'],
  '/products/software/wms': ['/solutions/warehouse-solutions', '/industries/warehousing', '/industries/3pl', '/products/software/dockvision-ai'],
  '/products/software/yardvision-ai': ['/solutions/yard-solutions', '/solutions/gate-yard-dock-vision-ai', '/products/software/containervision-ai', '/industries/logistics'],
  '/products/software/rfid-gps': ['/solutions/rfid-gps-solutions', '/solutions/fleet-management', '/products/hardware', '/services/rfid-services'],
  '/products/software/video-attendance': ['/solutions/workforce-management', '/solutions/ai-computer-vision', '/industries/manufacturing', '/products/hardware'],
  '/products/hardware': ['/solutions/rfid-gps-solutions', '/solutions/industrial-iot', '/products/software/asset-tracking', '/products/rfid-assets'],
  '/products/rfid-assets': ['/products/software/asset-tracking', '/products/hardware', '/services/rfid-services', '/solutions/asset-tracking'],

  // Services
  '/services/rfid-services': ['/solutions/rfid-gps-solutions', '/products/software/asset-tracking', '/products/rfid-assets', '/industries/retail'],
  '/services/industrial-iot-services': ['/solutions/industrial-iot', '/products/hardware', '/services/ai-software-development/edge-ai-iot-software-development', '/industries/manufacturing'],
  '/services/technology-outsourcing': ['/services/ai-software-development', '/services/industrial-iot-services', '/ibm-i-as400', '/about'],
  '/services/ai-software-development': ['/solutions/ai-computer-vision', '/services/industrial-iot-services', '/services/technology-outsourcing'],
  '/services/ai-software-development/ai-machine-learning-development': ['/solutions/ai-computer-vision', '/services/ai-software-development/ai-analytics-predictive-intelligence', '/products/software/containervision-ai'],
  '/services/ai-software-development/ai-computer-vision-ocr': ['/solutions/ai-computer-vision', '/solutions/gate-yard-dock-vision-ai', '/products/software/containervision-ai', '/products/software/dockvision-ai'],
  '/services/ai-software-development/ai-automation-development': ['/solutions/warehouse-solutions', '/solutions/yard-solutions', '/services/ai-software-development/custom-logistics-ai-software'],
  '/services/ai-software-development/ai-analytics-predictive-intelligence': ['/solutions/fleet-management', '/solutions/yard-solutions', '/services/ai-software-development/ai-machine-learning-development'],
  '/services/ai-software-development/ai-integration-enterprise-apis': ['/products/software/wms', '/ibm-i-as400', '/services/ai-software-development/custom-logistics-ai-software'],
  '/services/ai-software-development/edge-ai-iot-software-development': ['/solutions/industrial-iot', '/services/industrial-iot-services', '/products/hardware'],
  '/services/ai-software-development/custom-logistics-ai-software': ['/solutions/warehouse-solutions', '/solutions/yard-solutions', '/solutions/fleet-management', '/services/technology-outsourcing'],
  '/ibm-i-as400': ['/services/technology-outsourcing', '/services/ai-software-development/ai-integration-enterprise-apis', '/products/software/wms'],

  // Industries
  '/industries/logistics': ['/solutions/fleet-management', '/solutions/yard-solutions', '/solutions/gate-yard-dock-vision-ai', '/products/software/containervision-ai'],
  '/industries/warehousing': ['/solutions/warehouse-solutions', '/products/software/wms', '/products/software/dockvision-ai', '/solutions/asset-tracking'],
  '/industries/manufacturing': ['/solutions/asset-tracking', '/solutions/workforce-management', '/solutions/industrial-iot', '/products/software/video-attendance'],
  '/industries/ports-terminals': ['/solutions/container-terminal-automation', '/products/software/containervision-ai', '/solutions/gate-yard-dock-vision-ai', '/products/software/yardvision-ai'],
  '/industries/cfs': ['/products/software/containervision-ai', '/solutions/container-terminal-automation', '/solutions/yard-solutions', '/industries/ports-terminals'],
  '/industries/supply-chain': ['/solutions/fleet-management', '/solutions/warehouse-solutions', '/solutions/rfid-gps-solutions', '/solutions/ai-computer-vision'],
  '/industries/3pl': ['/products/software/wms', '/solutions/warehouse-solutions', '/solutions/yard-solutions', '/solutions/fleet-management'],
  '/industries/cold-chain': ['/solutions/industrial-iot', '/solutions/fleet-management', '/solutions/asset-tracking', '/solutions/warehouse-solutions'],
  '/industries/healthcare': ['/solutions/asset-tracking', '/products/software/asset-tracking', '/solutions/rfid-gps-solutions', '/solutions/workforce-management'],
  '/industries/pharma': ['/solutions/rfid-gps-solutions', '/solutions/warehouse-solutions', '/solutions/asset-tracking', '/services/rfid-services'],
  '/industries/retail': ['/solutions/warehouse-solutions', '/solutions/rfid-gps-solutions', '/products/software/rfid-gps', '/services/rfid-services'],
  '/industries/construction': ['/solutions/asset-tracking', '/solutions/fleet-management', '/solutions/rfid-gps-solutions', '/products/software/asset-tracking'],
  '/industries/media-entertainment': ['/solutions/asset-tracking', '/solutions/rfid-gps-solutions', '/products/software/asset-tracking', '/services/rfid-services'],
}

// What each page is about, used to pick the blog posts that fit it.
const PAGE_TOPICS = {
  '/solutions/warehouse-solutions': ['warehouse', 'forklift', 'automation'],
  '/solutions/yard-solutions': ['yard', 'container'],
  '/solutions/fleet-management': ['fleet', 'vms', 'gps'],
  '/solutions/rfid-gps-solutions': ['rfid', 'gps'],
  '/solutions/asset-tracking': ['asset', 'rfid'],
  '/solutions/container-terminal-automation': ['container', 'cfs', 'yard'],
  '/solutions/gate-yard-dock-vision-ai': ['vision', 'container', 'dock'],
  '/solutions/industrial-iot': ['iot', 'edge'],
  '/solutions/ai-computer-vision': ['vision', 'forklift', 'ai'],
  '/solutions/workforce-management': ['workforce'],
  '/products/software/dockvision-ai': ['dock', 'vision', 'warehouse'],
  '/products/software/containervision-ai': ['container', 'cfs', 'vision', 'yard'],
  '/products/software/asset-tracking': ['asset', 'rfid'],
  '/products/software/wms': ['wms', 'warehouse'],
  '/products/software/yardvision-ai': ['yard', 'vision'],
  '/products/software/rfid-gps': ['rfid', 'gps'],
  '/products/software/video-attendance': ['workforce', 'vision'],
  '/products/hardware': ['rfid', 'edge', 'iot'],
  '/products/rfid-assets': ['rfid', 'asset'],
  '/services/rfid-services': ['rfid'],
  '/services/industrial-iot-services': ['iot', 'edge'],
  '/services/technology-outsourcing': ['outsourcing'],
  '/services/ai-software-development': ['ai', 'vision', 'edge'],
  '/services/ai-software-development/ai-machine-learning-development': ['ai'],
  '/services/ai-software-development/ai-computer-vision-ocr': ['vision', 'ai'],
  '/services/ai-software-development/ai-automation-development': ['ai', 'automation'],
  '/services/ai-software-development/ai-analytics-predictive-intelligence': ['ai', 'analytics'],
  '/services/ai-software-development/ai-integration-enterprise-apis': ['ai', 'wms'],
  '/services/ai-software-development/edge-ai-iot-software-development': ['edge', 'iot', 'ai'],
  '/services/ai-software-development/custom-logistics-ai-software': ['ai', 'automation'],
  '/ibm-i-as400': ['as400'],
  '/industries/logistics': ['fleet', 'yard', 'container'],
  '/industries/warehousing': ['warehouse', 'wms'],
  '/industries/manufacturing': ['asset', 'workforce'],
  '/industries/ports-terminals': ['container', 'cfs'],
  '/industries/cfs': ['cfs', 'container'],
  '/industries/supply-chain': ['fleet', 'warehouse'],
  '/industries/3pl': ['3pl', 'warehouse'],
  '/industries/cold-chain': ['cold-chain'],
  '/industries/healthcare': ['healthcare', 'asset'],
  '/industries/pharma': ['pharma'],
  '/industries/retail': ['retail', 'rfid'],
  '/industries/construction': ['construction', 'asset'],
  '/industries/media-entertainment': ['asset'],
}

// Topics are read from each post's slug, title and category, so new posts are matched without extra tagging.
const TOPIC_RULES = [
  ['yard', /yard|congestion/],
  ['container', /container|reach-stacker|terminal/],
  ['cfs', /\bcfs\b/],
  ['warehouse', /warehouse|wms|3pl/],
  ['wms', /wms/],
  ['forklift', /forklift/],
  ['rfid', /rfid/],
  ['asset', /asset|tool and equipment|tool-tracking/],
  ['fleet', /fleet|truck|vms|vehicle|e-pod|epod|portal/],
  ['vms', /\bvms\b|vehicle management|e-pod|epod|portals/],
  ['gps', /\bgps\b/],
  ['vision', /vision|ocr|gatevision|dockvision/],
  ['ai', /\bai\b|ai-/],
  ['edge', /edge/],
  ['iot', /iot|lorawan/],
  ['dock', /\bdock/],
  ['workforce', /attendance|biometric/],
  ['cold-chain', /cold|reefer/],
  ['healthcare', /healthcare/],
  ['pharma', /pharma/],
  ['retail', /retail/],
  ['construction', /construction/],
  ['3pl', /3pl/],
  ['outsourcing', /outsourc|in-house/],
  ['as400', /ibm i|ibm-i|as400/],
  ['automation', /automation/],
  ['analytics', /analytics/],
]

function postTopics(post) {
  const text = `${post.slug} ${post.title} ${post.category}`.toLowerCase()
  return TOPIC_RULES.filter(([, pattern]) => pattern.test(text)).map(([topic]) => topic)
}

// Up to `limit` posts that share the most topics with the page, newest first among equals.
export function relatedPosts(path, limit = 3) {
  const wanted = PAGE_TOPICS[path] ?? []
  const scored = BLOG_POSTS.map((post) => {
    const topics = postTopics(post)
    return { post, score: wanted.filter((topic) => topics.includes(topic)).length }
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.post.date) - new Date(a.post.date))
    .map((item) => item.post)
  // Never show an empty or one-item list: top up with the newest posts.
  const extra = BLOG_POSTS.filter((post) => !scored.includes(post))
  return [...scored, ...extra].slice(0, Math.max(limit, 0))
}

const NAV_PAGES = {}
const addNav = (items) =>
  items.forEach((item) => {
    if (item.path && !item.path.includes('#')) NAV_PAGES[item.path] = item
    if (item.children) addNav(item.children)
  })
addNav(NAV)

// Name and one-line description for a page path, for the "related pages" cards.
export function pageInfo(path) {
  const product = SOFTWARE_PRODUCTS.find((p) => p.path === path)
  if (product) return { path, label: product.name, description: product.tagline }
  const item = NAV_PAGES[path]
  if (!item) return null
  return { path, label: item.label, description: item.description }
}
