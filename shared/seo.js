import { hasPrice, isOrderable } from './pricing.js'

// Search-engine text for the shop: clearer product names, page titles (under 60
// characters), descriptions (under 160) and a helpful paragraph for each product.
// Also builds the structured data (JSON-LD) used by both the server and the browser.
// Used to update the database, by the server when it builds each page's HTML,
// and as fallbacks in the browser. Keyed by product SKU and category slug.

export const SHOP_NAME = 'Prosper Infotech Shop'

export const CATEGORY_SEO = {
  'tags-labels': {
    title: 'RFID Tags & Labels – Buy Online in India | Prosper',
    description:
      'Buy UHF RFID tags and labels online: paper labels, on-metal tags, rugged outdoor tags and cable-tie tags. GST invoice and delivery across India.',
    intro:
      'Choose the RFID tag by the surface it sits on and where it lives: paper labels for cartons and files, on-metal tags for equipment, rugged tags for outdoor assets.',
  },
  'readers-antennas': {
    title: 'RFID Readers & Antennas – Buy Online India | Prosper',
    description:
      'Handheld and fixed UHF RFID readers and antennas for stock counts, gates and dock doors. Expert advice, GST invoice and delivery across India.',
    intro:
      'Handheld readers for counting and finding items; fixed readers and antennas for gates, dock doors and conveyors that read tags automatically.',
  },
  'barcode-scanners': {
    title: 'Barcode Scanners – 1D, 2D & QR, Buy Online | Prosper',
    description:
      'Wired, wireless, tabletop and fixed-mount barcode scanners plus Android mobile computers. Reads 1D, 2D and QR codes. Delivery across India.',
    intro:
      'Barcode and QR scanners are a low-cost way to track stock, parcels and documents. Pick by where you scan: at a desk, on the move or on a conveyor.',
  },
  'printers-encoders': {
    title: 'RFID & Barcode Label Printers – Buy Online | Prosper',
    description:
      'Desktop and industrial RFID printer-encoders, thermal barcode label printers, blank RFID labels and ribbons. GST invoice, delivery across India.',
    intro: 'Print and encode your own RFID and barcode labels in-house, from a few labels a day to thousands, with the matching labels and ribbons.',
  },
  'edge-iot': {
    title: 'AI Edge Box & Industrial IoT Gateway | Prosper Infotech',
    description:
      'AI edge computers and industrial IoT gateways for vision, RFID and sensor projects. Sold with set-up support. Request a price from Prosper Infotech.',
    intro: 'Edge AI boxes and industrial gateways for projects that need computing on site. Sold by quote with set-up support from our engineers.',
  },
  all: {
    title: 'All RFID & Barcode Products – Shop Online | Prosper',
    description:
      'Shop every RFID tag, RFID reader, antenna, barcode scanner and label printer from Prosper Infotech. Prices include GST, delivery across India.',
    intro: 'Every product in the shop. Prices include GST. Products without a price are quoted within one business day.',
  },
}

export const PRODUCT_SEO = {
  'PI-TAG-001': {
    name: 'UHF RFID Paper Labels (Self-Adhesive)',
    seo_title: 'UHF RFID Paper Labels – Self-Adhesive | Prosper',
    seo_description:
      'Self-adhesive UHF RFID paper labels (EPC Gen2) for cartons, files, boxes and retail stock. Roll or sheet. Buy online with GST invoice across India.',
    long_description:
      'UHF RFID paper labels are the most economical way to tag items that are not metal: cartons, files, boxes, documents and retail stock. Each label carries an EPC Gen2 (ISO 18000-6C) chip, so it can be read by any standard UHF RFID reader, many at a time and without line of sight.\n\nThe labels are self-adhesive and supplied on rolls or sheets. They can be printed and encoded on an RFID printer, or used blank. For metal surfaces, choose on-metal tags instead.',
  },
  'PI-TAG-002': {
    name: 'UHF On-Metal RFID Tags',
    seo_title: 'UHF On-Metal RFID Tags for Equipment | Prosper',
    seo_description:
      'UHF on-metal RFID tags for IT equipment, tools, machines and racks. Adhesive or screw mount, EPC Gen2. Buy online with GST invoice in India.',
    long_description:
      'Ordinary RFID labels stop working when stuck directly on metal. On-metal RFID tags are built to read reliably on metal and mixed surfaces, which makes them the right choice for IT equipment, tools, machines, racks and metal cabinets.\n\nThe tags use EPC Gen2 (ISO 18000-6C) UHF chips and fix with adhesive or screws. They work with handheld and fixed UHF RFID readers and with Prosper Asset Tracking.',
  },
  'PI-TAG-003': {
    name: 'Rugged Outdoor UHF RFID Tags',
    seo_title: 'Rugged Outdoor UHF RFID Tags | Prosper Infotech',
    seo_description:
      'Weather, UV and impact resistant UHF RFID tags for containers, trailers, pallets and yard assets. Bolt or strap mount. Delivery across India.',
    long_description:
      'Rugged outdoor RFID tags are made for assets that live outside or take knocks: containers, trailers, pallets, gas cylinders and yard equipment. The hard housing resists weather, UV and impact, so the tag keeps reading for years.\n\nThey mount with bolts or straps and read with UHF RFID readers at gates and yards, making them a good fit for yard management and asset tracking projects.',
  },
  'PI-TAG-004': {
    name: 'RFID Cable-Tie and Hang Tags',
    seo_title: 'RFID Cable-Tie & Hang Tags (UHF) | Prosper Infotech',
    seo_description:
      'UHF RFID cable-tie and hang tags for garments, bags, cables and tools with no flat surface. Reusable or single use. Buy online across India.',
    long_description:
      'Some items have no flat surface for a label. RFID cable-tie and hang tags attach by looping around the item, which suits garments, bags, cables, hoses and hand tools.\n\nThe tags carry EPC Gen2 UHF chips and are available in reusable and single-use versions, so you can tag items permanently or only while they are in your process.',
  },
  'PI-RDR-001': {
    name: 'Handheld UHF RFID Reader (Android)',
    seo_title: 'Handheld UHF RFID Reader – Android | Prosper Infotech',
    seo_description:
      'Android handheld UHF RFID reader with trigger for stock counts, audits and finding missing items. Wi-Fi, Bluetooth, optional 4G. Delivery in India.',
    long_description:
      'A handheld UHF RFID reader turns a stock count that takes a day into one that takes minutes: walk past shelves and the reader picks up every tag in range. It is also the quickest way to audit assets or find a missing item.\n\nThis reader runs Android, has a pistol-grip trigger and connects over Wi-Fi and Bluetooth, with optional 4G. It runs the Prosper Asset Tracking app, so counts and audits sync straight to your system.',
  },
  'PI-RDR-002': {
    name: '4-Port Fixed UHF RFID Reader (Impinj E710)',
    seo_title: '4-Port Fixed UHF RFID Reader – Impinj E710 | Prosper',
    seo_description:
      'Industrial 4-port fixed UHF RFID reader on Impinj E710, 1000+ tags per second, PoE or 12V. For gates, dock doors and conveyors. Delivery in India.',
    long_description:
      'A fixed RFID reader reads tags automatically as they pass, with no one holding a scanner. This industrial reader is built on the Impinj E710 chip, reads more than 1,000 tags per second and drives up to four antennas, enough to cover a gate, dock door, conveyor or portal.\n\nIt runs on DC 12V or Power over Ethernet. Our RFID services team can plan antenna placement, install the reader and connect it to your software.',
  },
  'PI-RDR-003': {
    name: 'UHF RFID Antennas',
    seo_title: 'UHF RFID Antennas – Circular & Linear | Prosper',
    seo_description:
      'UHF RFID antennas for fixed readers: circular or linear polarization, indoor and outdoor models, wall, ceiling or pole mount. Delivery in India.',
    long_description:
      'Antennas decide where a fixed RFID reader can see tags. Circular-polarized antennas read tags in any orientation; linear antennas reach further when tag direction is known.\n\nIndoor and outdoor models are available for wall, ceiling or pole mounting at gates, portals, dock doors and shelves. Tell us the area you need to cover and we will suggest the right antennas and number of reader ports.',
  },
  'PI-RDR-004': {
    name: 'Integrated RFID Reader with GPS and 4G',
    seo_title: 'Integrated RFID Reader with GPS & 4G | Prosper Infotech',
    seo_description:
      'All-in-one UHF RFID reader with built-in antenna, GPS and 4G LTE for vehicles, gates and remote sites. Coming soon. Request a price.',
    long_description:
      'This all-in-one device combines a UHF RFID reader, a built-in antenna, GPS and a 4G LTE connection in a single housing. It suits vehicles, remote gates and sites where there is no network cable, because it reads tags and reports their location on its own.\n\nThe reader is coming soon. Request a price to be told when it is available or to plan a pilot.',
  },
  'PI-SCN-001': {
    name: 'Wired Handheld Barcode Scanner (1D / 2D / QR)',
    seo_title: 'Wired Handheld Barcode Scanner – 1D, 2D, QR | Prosper',
    seo_description:
      'Plug-and-play USB handheld barcode scanner that reads 1D barcodes, 2D codes and QR. Drop-resistant, for billing counters and stock rooms.',
    long_description:
      'A wired handheld scanner is the simplest way to read barcodes at a desk or counter. Plug it into a USB port and it works like a keyboard, typing the code into whatever program is open, so no software is needed.\n\nIt reads 1D barcodes, 2D codes and QR codes, and has a drop-resistant housing for daily use at billing counters, stores, stock rooms and dispatch desks.',
  },
  'PI-SCN-002': {
    name: 'Wireless Barcode Scanner (1D / 2D / QR)',
    seo_title: 'Wireless Barcode Scanner – Bluetooth, 1D/2D/QR | Prosper',
    seo_description:
      'Cordless barcode scanner with Bluetooth or 2.4 GHz, rechargeable full-shift battery and charging cradle. Reads 1D, 2D and QR codes.',
    long_description:
      'A wireless scanner removes the cable, so staff can scan large or heavy items where they sit instead of carrying them to the counter. It connects over Bluetooth or a 2.4 GHz receiver and reads 1D barcodes, 2D codes and QR codes.\n\nThe rechargeable battery lasts a full shift, and the charging cradle extends the working range in warehouses, shop floors and large counters.',
  },
  'PI-SCN-003': {
    name: 'Android Mobile Computer with Barcode Scanner',
    seo_title: 'Android Mobile Computer with Barcode Scanner | Prosper',
    seo_description:
      'Rugged Android handheld with built-in 1D/2D barcode scanner, camera, Wi-Fi, Bluetooth, 4G and NFC for picking, stock counts and delivery.',
    long_description:
      'A mobile computer puts a barcode scanner, touch screen and apps in one rugged device, so staff can scan and record work wherever they are. It suits picking, stock counts, proof of delivery and field audits.\n\nIt runs Android with a built-in 1D/2D imager and camera, connects over Wi-Fi, Bluetooth, 4G and NFC, and is built to survive drops and dust.',
  },
  'PI-SCN-004': {
    name: 'Fixed-Mount Barcode Scanner',
    seo_title: 'Fixed-Mount Barcode Scanner for Conveyors | Prosper',
    seo_description:
      'Hands-free fixed-mount barcode scanner for conveyors, sorting lines, kiosks and gates. Reads 1D, 2D and QR. USB, RS-232 or Ethernet.',
    long_description:
      'A fixed-mount scanner reads barcodes automatically as items pass, so nobody needs to hold a scanner. It is used on conveyors, sorting lines, kiosks and gates for continuous, hands-free scanning.\n\nIt reads 1D barcodes, 2D codes and QR codes, mounts on a bracket or in a tunnel, and connects over USB, RS-232 or Ethernet.',
  },
  'PI-SCN-005': {
    name: 'Tabletop Barcode and QR Scanner',
    seo_title: 'Tabletop Barcode & QR Scanner for Counters | Prosper',
    seo_description:
      'Hands-free tabletop scanner for retail counters and pharmacies. Reads 1D, 2D and QR codes, including from phone screens. USB connection.',
    long_description:
      'A tabletop scanner sits on the counter and reads codes held in front of it, which keeps both hands free and speeds up checkout. It reads 1D barcodes, 2D codes and QR codes, including codes shown on a phone screen such as UPI and e-tickets.\n\nIt connects over USB and suits retail counters, pharmacies and self-service desks.',
  },
  'PI-PRN-001': {
    name: 'Desktop UHF RFID Printer and Encoder',
    seo_title: 'Desktop UHF RFID Printer & Encoder | Prosper Infotech',
    seo_description:
      'Desktop thermal-transfer printer that prints and encodes UHF EPC Gen2 RFID labels. USB and Ethernet. For low to medium daily volumes.',
    long_description:
      'A desktop RFID printer prints the label and writes the RFID chip in one pass, so every label is ready to use the moment it comes out. It suits offices and small warehouses that tag items in batches every day.\n\nIt prints by thermal transfer, encodes UHF EPC Gen2 chips and connects over USB and Ethernet.',
  },
  'PI-PRN-002': {
    name: 'Industrial UHF RFID Printer and Encoder',
    seo_title: 'Industrial UHF RFID Printer & Encoder | Prosper Infotech',
    seo_description:
      'Rugged industrial RFID printer-encoder for high-volume, all-day UHF label printing in warehouses and production lines. USB and Ethernet.',
    long_description:
      'An industrial RFID printer is built for high volumes and all-day use in warehouses and production lines, where a desktop printer would wear out. It prints by thermal transfer and encodes UHF EPC Gen2 chips in the same pass.\n\nIt connects over USB and Ethernet, with optional Wi-Fi.',
  },
  'PI-PRN-003': {
    name: 'Thermal Barcode Label Printer',
    seo_title: 'Thermal Barcode Label Printer – Desktop | Prosper',
    seo_description:
      'Thermal-transfer and direct-thermal barcode label printer for asset, shipping and shelf labels with barcodes, QR codes and logos.',
    long_description:
      'A barcode label printer makes asset labels, shipping labels and shelf labels with barcodes, QR codes, text and logos. It prints by thermal transfer for long-lasting labels or direct thermal for short-life labels.\n\nDesktop to industrial models are available, all connecting over USB and Ethernet.',
  },
  'PI-PRN-004': {
    name: 'Blank RFID Labels and Thermal Ribbons',
    seo_title: 'Blank RFID Labels & Thermal Printer Ribbons | Prosper',
    seo_description:
      'Printable blank UHF RFID inlay labels and wax or resin thermal-transfer ribbons for RFID printers. Custom sizes, supplied in bulk rolls.',
    long_description:
      'Consumables for RFID and barcode printers: printable RFID inlay labels and thermal-transfer ribbons in wax or resin. Wax ribbons suit paper labels; resin gives a tougher print on synthetic labels.\n\nCustom label sizes are available on request, supplied in bulk rolls.',
  },
  'PI-EDG-001': {
    name: 'AI Edge Box (NVIDIA Jetson Orin NX)',
    seo_title: 'AI Edge Box – NVIDIA Jetson Orin NX | Prosper Infotech',
    seo_description:
      'On-site AI edge computer on NVIDIA Jetson Orin NX for vision AI, OCR and ANPR with multiple IP cameras. Sold with set-up support.',
    long_description:
      'The AI Edge Box runs vision AI next to your cameras instead of in the cloud, which keeps video on site and gives instant results. It is built on the NVIDIA Jetson Orin NX and handles several IP cameras for tasks such as OCR, number-plate recognition (ANPR) and object detection.\n\nIt is sold as part of a project, with set-up by our engineers.',
  },
  'PI-EDG-002': {
    name: 'Industrial IoT Gateway',
    seo_title: 'Industrial IoT Gateway – Raspberry Pi CM4/CM5 | Prosper',
    seo_description:
      'Industrial edge gateway on Raspberry Pi CM4/CM5 that connects sensors, PLCs and RFID readers to your software. Ethernet, Wi-Fi, 4G, RS-485.',
    long_description:
      'An IoT gateway collects data from sensors, PLCs and RFID readers on site and sends it to your software. This industrial gateway is built on the Raspberry Pi CM4/CM5 and connects over Ethernet, Wi-Fi, 4G and RS-485.\n\nIt is sold as part of a project, with set-up by our engineers.',
  },
}

const clip = (text, max) => {
  const s = String(text || '').replace(/\s+/g, ' ').trim()
  if (s.length <= max) return s
  return `${s.slice(0, max - 1).replace(/\s+\S*$/, '')}…`
}

// Page title and description for a product, with sensible fallbacks.
export function productMeta(p) {
  const seo = PRODUCT_SEO[p.sku] || {}
  const title = p.seo_title || seo.seo_title || clip(`${p.name} | ${SHOP_NAME}`, 60)
  const description =
    p.seo_description || seo.seo_description || clip(`${p.name}: ${p.short_description || ''} Price includes GST. Delivery across India.`, 158)
  return { title, description }
}

export function categoryMeta(slug, category) {
  const seo = CATEGORY_SEO[slug] || {}
  return {
    title: seo.title || clip(`${category?.name || 'Products'} | ${SHOP_NAME}`, 60),
    description: seo.description || clip(category?.description || '', 158),
    intro: seo.intro || category?.description || '',
  }
}

/* --------------------------- Structured data (JSON-LD) --------------------------- */

export function breadcrumbLd(items, site) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.label, item: `${site}${item.href}` })),
  }
}

export function productLd(p, category, config, site) {
  // Google requires a price and an image for product results, so only priced
  // products with a photo get Product markup. Others still get breadcrumbs.
  if (!hasPrice(p) || !p.images?.length) return null
  const url = `${site}/p/${p.slug}`
  const abs = (u) => (/^https?:\/\//.test(u) ? u : `${site}${u.startsWith('/') ? '' : '/'}${u}`)
  return {
    '@type': 'Product',
    name: p.name,
    sku: p.sku,
    mpn: p.sku,
    description: productMeta(p).description,
    brand: { '@type': 'Brand', name: p.brand || 'Prosper Infotech' },
    category: category?.name,
    image: p.images.map(abs),
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'INR',
      price: (p.price_paise / 100).toFixed(2),
      availability: isOrderable(p) ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: 'Prosper Infotech' },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'IN' },
        shippingRate: {
          '@type': 'MonetaryAmount',
          currency: 'INR',
          value: (config.free_shipping_threshold_paise && p.price_paise >= config.free_shipping_threshold_paise ? 0 : (config.shipping_flat_paise || 0) / 100).toFixed(2),
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 2, unitCode: 'DAY' },
          transitTime: { '@type': 'QuantitativeValue', minValue: config.delivery_days_min ?? 3, maxValue: config.delivery_days_max ?? 7, unitCode: 'DAY' },
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'IN',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 7,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
    },
  }
}

