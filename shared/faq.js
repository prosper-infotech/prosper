// Shop questions and answers. Used by the FAQ page, the home page and the
// server (for the page's HTML and FAQ structured data).
export const FAQ_GROUPS = [
  {
    title: 'Ordering',
    items: [
      {
        question: 'How do I order?',
        answer:
          'Add products that show a price to your cart and check out. You do not need an account. Products marked "Request price" are quoted by our team within one business day.',
      },
      {
        question: 'Do I need an account to buy?',
        answer:
          'No. You can check out as a guest with your email address. Signing in with a one-time code lets you see all your orders, invoices and saved addresses in one place.',
      },
      {
        question: 'Why do some products say "Request price"?',
        answer:
          'Prices for some products change with quantity, model or import costs. Tap "Request price", tell us how many you need, and we reply with a price and delivery time within one business day.',
      },
      {
        question: 'Can I get a price for a large quantity?',
        answer:
          'Yes. Use the Bulk order page or the bulk quote box on any product page. Tell us the products and quantities and we send a quotation, usually within one business day.',
      },
      {
        question: 'Can you supply products that are not listed?',
        answer:
          'Often, yes. We source RFID, barcode, POS and security hardware from many makers. Send us the model or what you need it to do, and we will tell you what we can supply.',
      },
    ],
  },
  {
    title: 'Prices, GST and payment',
    items: [
      { question: 'Do prices include GST?', answer: 'Yes. Every price on the shop includes GST. The product page also shows the price before GST and the GST rate.' },
      {
        question: 'Will I get a GST invoice?',
        answer: 'Yes. Every order comes with a GST invoice. Add your company name and GSTIN at checkout so you can claim input tax credit.',
      },
      {
        question: 'How can I pay?',
        answer:
          'You can pay online by card, UPI or net banking, or choose bank transfer or UPI and pay from your own bank app. We confirm your order by email as soon as the payment arrives.',
      },
      {
        question: 'Do you offer credit or purchase orders for companies?',
        answer: 'For regular business customers we can work with purchase orders. Contact our sales team with your company details to discuss terms.',
      },
    ],
  },
  {
    title: 'Delivery',
    items: [
      { question: 'Where do you deliver?', answer: 'We deliver across India by tracked courier. You get an email with the tracking link when your order ships.' },
      {
        question: 'How long does delivery take?',
        answer:
          'In-stock products are usually dispatched within 1 to 2 working days after payment. Delivery then takes a few working days depending on your PIN code. Check the time for your PIN code on any product page.',
      },
      {
        question: 'Is delivery free?',
        answer: 'Delivery is free above the order value shown at the top of the shop. Below that, a small flat shipping charge is shown in the cart before you pay.',
      },
    ],
  },
  {
    title: 'Returns and warranty',
    items: [
      {
        question: 'What if a product arrives damaged or wrong?',
        answer: 'Tell us within 48 hours of delivery with photos of the box and the product. We will arrange a replacement or refund as set out in our Returns & Refunds policy.',
      },
      {
        question: 'Are products covered by warranty?',
        answer:
          "Branded products carry the maker's warranty, supported through us. Our own range carries our warranty. The Warranty page explains what is covered and how to make a claim.",
      },
      {
        question: 'Do you sell genuine branded products?',
        answer:
          "Yes. Branded products such as Zebra, Honeywell, TSC, Newland and Sunmi are sourced through authorised channels and carry the maker's warranty.",
      },
    ],
  },
  {
    title: 'Products and support',
    items: [
      {
        question: 'Which RFID tag or reader should I choose?',
        answer:
          'It depends on what you tag, the surface it sits on and how far you need to read. Tell us what you want to track and our engineers will suggest the right tags and readers, free of charge.',
      },
      {
        question: 'Will these products work with my software?',
        answer:
          'Most barcode scanners work like a keyboard and need no setup. RFID readers, printers and POS hardware come with drivers or SDKs. Our tags, readers and printers also work with Prosper Asset Tracking.',
      },
      {
        question: 'Can you install and set up the hardware?',
        answer: 'Yes. Prosper Infotech installs RFID, barcode and access control systems. Ask for installation when you request a quote.',
      },
    ],
  },
]

export const ALL_FAQS = FAQ_GROUPS.flatMap((g) => g.items)

export const faqLd = (items = ALL_FAQS) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
})
