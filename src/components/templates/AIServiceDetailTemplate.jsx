import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Breadcrumb from '../ui/Breadcrumb'
import CTABand from '../ui/CTABand'
import Reveal from '../motion/Reveal'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { AI_SERVICES } from '../../data/aiServicesDetail'

// Single navy/gold style set, used for every AI service category
// regardless of its `accent` field, to keep the theme consistent.
const STYLES = {
  badge: 'bg-gradient-to-br from-gold to-gold-dark',
  text: 'text-primary',
  border: 'border-gold/40',
  hoverBorder: 'hover:border-gold/60',
  dot: 'bg-gold',
  line: 'bg-gradient-to-r from-gold to-gold-dark',
  lineV: 'bg-gradient-to-b from-gold to-gold-dark',
  glowShadow: 'shadow-[0_0_50px_-8px_rgba(247,221,0,0.45)]',
  chip: 'bg-gold/10 border-gold/30 text-primary',
}

function FlowDiagram({ stages, styles }) {
  return (
    <div className="relative mt-8 mb-2">
      {/* Mobile: vertical connected list */}
      <div className="lg:hidden relative">
        <div className="absolute left-4 top-4 bottom-4 w-px bg-ink-300" />
        <motion.div
          className={`absolute left-4 top-4 w-px origin-top ${styles.lineV}`}
          style={{ height: 'calc(100% - 2rem)' }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
        <div className="relative flex flex-col gap-6">
          {stages.map((stage, i) => (
            <div key={stage} className="flex items-center gap-4 pl-0">
              <span className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${styles.badge}`}>
                {i + 1}
              </span>
              <span className="text-sm font-semibold text-ink-900">{stage}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: horizontal pipeline */}
      <div className="hidden lg:block relative">
        <div className="absolute left-0 right-0 top-5 h-px bg-ink-300" />
        <motion.div
          className={`absolute left-0 top-5 h-px origin-left ${styles.line}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.3, ease: 'easeInOut' }}
        />
        <motion.div
          className={`absolute top-5 h-2 w-2 -translate-y-1/2 rounded-full ${styles.dot}`}
          animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
        />
        <div
          className="relative grid gap-3"
          style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0,1fr))` }}
        >
          {stages.map((stage, i) => (
            <div key={stage} className="flex flex-col items-center text-center gap-2">
              <span className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white ${styles.badge}`}>
                {i + 1}
              </span>
              <span className="text-xs font-semibold text-ink-900 leading-snug">{stage}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function AIServiceDetailTemplate({ detail }) {
  const { label, seoTitle, seoDescription, icon: Icon, heading, intro, categories, techFlow, techTags, techNote, cta, path } = detail
  const styles = STYLES
  const siblings = AI_SERVICES.filter((s) => s.path !== path)

  useDocumentTitle(seoTitle, seoDescription)

  return (
    <>
      <Breadcrumb
        title={label}
        parent="AI Software Development"
        parentPath="/services/ai-software-development"
        icon={Icon}
        description={seoDescription}
      />

      <section className="max-w-4xl mx-auto px-6 pt-16 pb-4 text-center">
        <Reveal className="flex flex-col items-center gap-4">
          <span className={`inline-flex items-center gap-2 self-center rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest ${styles.chip}`}>
            AI Software Development
          </span>
          <h2 className="text-2xl md:text-[32px] md:leading-[40px] font-heading font-bold text-primary">
            {heading}
          </h2>
          <p className="text-ink-600 text-lg">{intro}</p>
        </Reveal>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex flex-col gap-12">
          {categories.map((category, ci) => (
            <Reveal key={category.title} delay={ci * 0.08}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`h-2.5 w-2.5 rounded-full ${styles.dot}`} />
                  <h2 className="font-heading font-semibold text-xl text-primary">
                    {category.title}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition-all duration-300 ${styles.chip} ${styles.hoverBorder} hover:-translate-y-0.5`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

          {(techFlow || techTags || techNote) && (
            <Reveal delay={categories.length * 0.08}>
              <div className={`rounded-2xl border ${styles.border} bg-surface-alt p-6 sm:p-8`}>
                <h2 className="font-heading font-semibold text-xl text-primary mb-1">
                  Technology &amp; Architecture
                </h2>

                {techFlow && <FlowDiagram stages={techFlow} styles={styles} />}

                {techTags && (
                  <div className={`flex flex-wrap gap-2.5 ${techFlow ? 'mt-8' : 'mt-5'}`}>
                    {techTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-ink-300 bg-white px-3.5 py-1.5 text-sm font-medium text-ink-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {techNote && <p className="mt-4 text-ink-600">{techNote}</p>}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="bg-surface-alt">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <h2 className="font-heading font-semibold text-lg text-primary mb-6">
            Explore other AI capabilities
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {siblings.map((sibling) => {
              const SiblingIcon = sibling.icon
              const siblingStyles = STYLES
              return (
                <Link
                  key={sibling.path}
                  to={sibling.path}
                  className="group flex items-center gap-3 rounded-lg border border-ink-300 bg-white px-4 py-3.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-8px_rgba(20,52,109,0.25)]"
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white ${siblingStyles.badge}`}>
                    <SiblingIcon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold text-ink-900 flex-1">{sibling.label}</span>
                  <ArrowRight className="h-4 w-4 text-ink-400 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                </Link>
              )
            })}
          </div>
          <Link
            to="/services/ai-software-development"
            className="mt-6 inline-block text-sm font-semibold text-primary hover:text-primary-dark"
          >
            View all AI Software Development &rarr;
          </Link>
        </div>
      </section>

      <CTABand title={cta} description="Talk to our team about the right AI approach for your operation." />
    </>
  )
}
