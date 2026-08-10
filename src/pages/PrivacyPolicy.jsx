import Breadcrumb from '../components/ui/Breadcrumb'
import Reveal from '../components/motion/Reveal'
import useDocumentTitle from '../hooks/useDocumentTitle'

const EFFECTIVE_DATE = 'August 10, 2026'

const SECTIONS = [
  {
    title: 'Overview',
    body: [
      `This Privacy Policy explains how Prosper Infotech LLC ("Prosper Infotech," "we," "us," or "our") collects, uses, and protects information when you visit prosperinfotech.com or any of our landing pages, or interact with our contact and lead forms.`,
      `By using this website, you agree to the collection and use of information as described in this policy.`,
    ],
  },
  {
    title: 'Information We Collect',
    body: [
      'We collect information in two ways:',
    ],
    list: [
      'Information you provide directly — such as your name, email address, phone number, company name, and message when you submit a contact form, request a demo, or book a consultation.',
      'Information collected automatically — such as your IP address, browser type, device type, pages visited, referring URL, and approximate location, gathered through Google Analytics and similar tools.',
    ],
  },
  {
    title: 'Cookies and Tracking Technologies',
    body: [
      'We use Google Analytics (GA4) to understand how visitors use our site, and Google Ads conversion tracking to measure the performance of our advertising campaigns. These tools use cookies and similar technologies to collect data such as pages viewed, time on site, and whether a visitor arrived via a paid ad.',
      'You can control or disable cookies through your browser settings, or opt out of Google Analytics tracking using the Google Analytics Opt-out Browser Add-on, available at tools.google.com/dlpage/gaoptout.',
    ],
  },
  {
    title: 'How We Use Your Information',
    list: [
      'To respond to inquiries, demo requests, and consultation bookings',
      'To provide, maintain, and improve our website and services',
      'To measure and improve the performance of our marketing and advertising campaigns',
      'To communicate with you about our products, services, or updates you have requested',
    ],
  },
  {
    title: 'Third-Party Services',
    body: [
      'We share information with the following third-party services solely to operate this website and process your inquiries:',
    ],
    list: [
      'Formspree — processes and delivers contact and lead form submissions to our team',
      'Google Analytics & Google Ads — provide website analytics and advertising performance measurement',
      'YouTube — embedded video content on our Videos page, subject to Google’s privacy policy',
    ],
    footer:
      'We do not sell your personal information to third parties.',
  },
  {
    title: 'Data Retention',
    body: [
      'We retain contact and lead form submissions for as long as necessary to respond to your inquiry and maintain our business records, or until you request deletion.',
    ],
  },
  {
    title: 'Your Choices',
    body: [
      'Depending on your location, you may have the right to request access to, correction of, or deletion of your personal information. To make such a request, contact us at sales@prosperinfotech.com.',
    ],
  },
  {
    title: 'Data Security',
    body: [
      'This website is served over HTTPS, and form submissions are transmitted securely. While we take reasonable steps to protect your information, no method of transmission or storage is 100% secure.',
    ],
  },
  {
    title: "Children's Privacy",
    body: [
      'Our website and services are intended for business audiences and are not directed at children under 13. We do not knowingly collect personal information from children.',
    ],
  },
  {
    title: 'Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised effective date.',
    ],
  },
  {
    title: 'Contact Us',
    body: [
      'If you have questions about this Privacy Policy or how we handle your information, contact us:',
    ],
    contact: true,
  },
]

export default function PrivacyPolicy() {
  useDocumentTitle(
    'Privacy Policy | Prosper Infotech',
    'How Prosper Infotech collects, uses, and protects your information across our website, contact forms, and advertising campaigns.'
  )

  return (
    <>
      <Breadcrumb title="Privacy Policy" />

      <section className="max-w-3xl mx-auto px-6 py-16">
        <Reveal className="mb-10">
          <p className="text-sm text-ink-500">Effective date: {EFFECTIVE_DATE}</p>
        </Reveal>

        <div className="flex flex-col gap-10">
          {SECTIONS.map((section, i) => (
            <Reveal key={section.title} delay={(i % 4) * 0.05}>
              <h2 className="font-heading font-semibold text-xl text-primary mb-3">
                {section.title}
              </h2>
              {section.body?.map((para) => (
                <p key={para} className="text-ink-600 leading-relaxed mb-3">
                  {para}
                </p>
              ))}
              {section.list && (
                <ul className="flex flex-col gap-2 mb-3">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-ink-600 leading-relaxed">
                      <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.footer && (
                <p className="text-ink-600 leading-relaxed">{section.footer}</p>
              )}
              {section.contact && (
                <ul className="flex flex-col gap-1.5 text-ink-600">
                  <li>
                    Email:{' '}
                    <a href="mailto:sales@prosperinfotech.com" className="text-primary hover:text-gold transition-colors">
                      sales@prosperinfotech.com
                    </a>
                  </li>
                  <li>
                    Phone:{' '}
                    <a href="tel:+19407583271" className="text-primary hover:text-gold transition-colors">
                      +1 940 758 3271
                    </a>
                  </li>
                  <li>Address: 4245 N Central Expy, #490, Dallas, TX 75205</li>
                </ul>
              )}
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
