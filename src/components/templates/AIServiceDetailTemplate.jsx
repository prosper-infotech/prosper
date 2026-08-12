import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Breadcrumb from '../ui/Breadcrumb'
import CTABand from '../ui/CTABand'
import Reveal from '../motion/Reveal'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { AI_SERVICES } from '../../data/aiServicesDetail'

const ACCENT = {
  violet: {
    badge: 'bg-gradient-to-br from-violet-500 to-violet-700',
    text: 'text-violet-600',
    border: 'border-violet-300',
    hoverBorder: 'hover:border-violet-400',
    dot: 'bg-violet-500',
    line: 'bg-gradient-to-r from-violet-500 to-violet-700',
    lineV: 'bg-gradient-to-b from-violet-500 to-violet-700',
    glowShadow: 'shadow-[0_0_50px_-8px_rgba(139,92,246,0.4)]',
    chip: 'bg-violet-50 border-violet-200 text-violet-800',
  },
  blue: {
    badge: 'bg-gradient-to-br from-blue-500 to-blue-700',
    text: 'text-blue-600',
    border: 'border-blue-300',
    hoverBorder: 'hover:border-blue-400',
    dot: 'bg-blue-500',
    line: 'bg-gradient-to-r from-blue-500 to-blue-700',
    lineV: 'bg-gradient-to-b from-blue-500 to-blue-700',
    glowShadow: 'shadow-[0_0_50px_-8px_rgba(59,130,246,0.4)]',
    chip: 'bg-blue-50 border-blue-200 text-blue-800',
  },
  orange: {
    badge: 'bg-gradient-to-br from-orange-500 to-orange-700',
    text: 'text-orange-600',
    border: 'border-orange-300',
    hoverBorder: 'hover:border-orange-400',
    dot: 'bg-orange-500',
    line: 'bg-gradient-to-r from-orange-500 to-orange-700',
    lineV: 'bg-gradient-to-b from-orange-500 to-orange-700',
    glowShadow: 'shadow-[0_0_50px_-8px_rgba(249,115,22,0.4)]',
    chip: 'bg-orange-50 border-orange-200 text-orange-800',
  },
  emerald: {
    badge: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
    text: 'text-emerald-600',
    border: 'border-emerald-300',
    hoverBorder: 'hover:border-emerald-400',
    dot: 'bg-emerald-500',
    line: 'bg-gradient-to-r from-emerald-500 to-emerald-700',
    lineV: 'bg-gradient-to-b from-emerald-500 to-emerald-700',
    glowShadow: 'shadow-[0_0_50px_-8px_rgba(16,185,129,0.4)]',
    chip: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  },
  cyan: {
    badge: 'bg-gradient-to-br from-cyan-500 to-cyan-700',
    text: 'text-cyan-600',
    border: 'border-cyan-300',
    hoverBorder: 'hover:border-cyan-400',
    dot: 'bg-cyan-500',
    line: 'bg-gradient-to-r from-cyan-500 to-cyan-700',
    lineV: 'bg-gradient-to-b from-cyan-500 to-cyan-700',
    glowShadow: 'shadow-[0_0_50px_-8px_rgba(34,211,238,0.4)]',
    chip: 'bg-cyan-50 border-cyan-200 text-cyan-800',
  },
  indigo: {
    badge: 'bg-gradient-to-br from-indigo-500 to-indigo-700',
    text: 'text-indigo-600',
    border: 'border-indigo-300',
    hoverBorder: 'hover:border-indigo-400',
    dot: 'bg-indigo-500',
    line: 'bg-gradient-to-r from-indigo-500 to-indigo-700',
    lineV: 'bg-gradient-to-b from-indigo-500 to-indigo-700',
    glowShadow: 'shadow-[0_0_50px_-8px_rgba(99,102,241,0.4)]',
    chip: 'bg-indigo-50 border-indigo-200 text-indigo-800',
  },
  gold: {
    badge: 'bg-gradient-to-br from-gold to-gold-dark',
    text: 'text-primary',
    border: 'border-gold/40',
    hoverBorder: 'hover:border-gold/60',
    dot: 'bg-gold',
    line: 'bg-gradient-to-r from-gold to-gold-dark',
    lineV: 'bg-gradient-to-b from-gold to-gold-dark',
    glowShadow: 'shadow-[0_0_50px_-8px_rgba(247,221,0,0.45)]',
    chip: 'bg-gold/10 border-gold/30 text-primary',
  },
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
  const { label, seoTitle, seoDescription, icon: Icon, accent, heading, intro, categories, techFlow, techTags, techNote, cta, path } = detail
  const styles = ACCENT[accent]
  const siblings = AI_SERVICES.filter((s) => s.path !== path)

  useDocumentTitle(seoTitle, seoDescription)

  return (
    <>
      <Breadcrumb title={label} parent="AI Software Development" icon={Icon} />

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
              const siblingStyles = ACCENT[sibling.accent]
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
