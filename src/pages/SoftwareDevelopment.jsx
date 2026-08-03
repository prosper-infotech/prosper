import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import {
  Smartphone,
  Globe,
  Layout,
  Workflow,
  Apple,
  Component,
  FileCode,
  Blocks,
  Code2,
  Gem,
  Coffee,
  Layers,
  Triangle,
  Hexagon,
  GitBranch,
  Cloud,
  Zap,
  Server,
} from 'lucide-react'
import Breadcrumb from '../components/ui/Breadcrumb'
import CTABand from '../components/ui/CTABand'
import Reveal from '../components/motion/Reveal'

const CATEGORIES = [
  {
    key: 'mobile',
    title: 'Mobile App Development',
    description: 'Native and cross-platform apps for iOS, Android, and everything in between.',
    icon: Smartphone,
    items: [
      {
        label: 'Android App Development',
        icon: Smartphone,
        blurb: 'Native Android apps built with Kotlin/Java for performance and scale.',
      },
      {
        label: 'iOS App Development',
        icon: Apple,
        blurb: 'Native iOS apps built with Swift, tuned for the Apple ecosystem.',
      },
      {
        label: 'React Native App Development',
        icon: Component,
        blurb: 'Cross-platform apps sharing one codebase across iOS and Android.',
      },
      {
        label: 'HTML5 App Development',
        icon: FileCode,
        blurb: 'Lightweight hybrid apps that run in any mobile browser or WebView.',
      },
      {
        label: 'Xamarin App Development',
        icon: Blocks,
        blurb: 'Cross-platform apps in C# with native performance and shared logic.',
      },
    ],
  },
  {
    key: 'web',
    title: 'Web Development',
    description: 'Robust backend and full-stack web platforms built to scale.',
    icon: Globe,
    items: [
      {
        label: '.Net',
        icon: Code2,
        blurb: 'Enterprise-grade web apps and APIs built on the .NET/C# stack.',
      },
      {
        label: 'Ruby on Rails (RoR)',
        icon: Gem,
        blurb: 'Fast, convention-driven web apps built with Ruby on Rails.',
      },
      {
        label: 'Java/J2EE',
        icon: Coffee,
        blurb: 'Scalable enterprise systems built on Java and the J2EE stack.',
      },
      {
        label: 'Mean Stack',
        icon: Layers,
        blurb: 'Full-stack JavaScript apps using MongoDB, Express, Angular, and Node.',
      },
      {
        label: 'Python',
        icon: Code2,
        blurb: 'Backend services and automation built with Python frameworks like Django/Flask.',
      },
    ],
  },
  {
    key: 'frontend',
    title: 'Frontend',
    description: 'Interactive, accessible interfaces built with modern frontend frameworks.',
    icon: Layout,
    items: [
      {
        label: 'ReactJS',
        icon: Component,
        blurb: 'Interactive, component-based UIs built with React.',
      },
      {
        label: 'AngularJS',
        icon: Triangle,
        blurb: 'Structured, data-driven single-page apps built with Angular.',
      },
      {
        label: 'Bootstrap',
        icon: Layout,
        blurb: 'Responsive, mobile-first layouts built on the Bootstrap framework.',
      },
      {
        label: 'VueJS',
        icon: Hexagon,
        blurb: 'Lightweight, reactive interfaces built with Vue.',
      },
    ],
  },
  {
    key: 'devops',
    title: 'DevOps',
    description: 'Automated pipelines and cloud infrastructure that keep releases smooth.',
    icon: Workflow,
    items: [
      {
        label: 'CI/CD Automation',
        icon: GitBranch,
        blurb: 'Automated build, test, and deployment pipelines for faster releases.',
      },
      {
        label: 'Windows Azure',
        icon: Cloud,
        blurb: 'Cloud infrastructure and hosting built on Microsoft Azure.',
      },
      {
        label: 'Serverless',
        icon: Zap,
        blurb: 'Event-driven functions that scale automatically without managing servers.',
      },
      {
        label: 'Amazon Web Services',
        icon: Server,
        blurb: 'Cloud infrastructure, storage, and compute built on AWS.',
      },
    ],
  },
]

function ItemRow({ item }) {
  const ItemIcon = item.icon
  return (
    <div className="group flex items-start gap-3.5 rounded-lg border border-ink-200 bg-white px-4 py-3.5 shadow-sm hover:shadow-[0_10px_25px_-8px_rgba(20,52,109,0.25)] hover:border-gold/50 hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold/5 text-primary group-hover:from-gold group-hover:to-gold-dark transition-colors duration-300">
        <ItemIcon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-sm font-semibold text-ink-900">{item.label}</div>
        <p className="mt-0.5 text-xs text-ink-600 leading-relaxed">{item.blurb}</p>
      </div>
    </div>
  )
}

export default function SoftwareDevelopment() {
  const [active, setActive] = useState(CATEGORIES[0].key)
  const activeCategory = CATEGORIES.find((c) => c.key === active)

  return (
    <>
      <Breadcrumb title="Software Development" parent="Services" />

      {/* Desktop: hover-preview two-column layout */}
      <section className="hidden lg:block max-w-6xl mx-auto px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <div className="flex flex-col gap-5">
            {CATEGORIES.map((category, i) => {
              const Icon = category.icon
              const isActive = active === category.key
              return (
                <Reveal key={category.key} delay={i * 0.06}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(category.key)}
                    onClick={() => setActive(category.key)}
                    className={`w-full text-left rounded-lg border-l-4 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-[0_0_50px_-8px_rgba(247,221,0,0.45),0_25px_50px_-12px_rgba(0,0,0,0.35)] ${
                      isActive ? 'border-gold shadow-lg' : 'border-ink-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                          isActive ? 'bg-gold/20 text-primary' : 'bg-surface-alt text-ink-500'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-lg text-primary">
                          {category.title}
                        </h3>
                        <p className="mt-1 text-sm text-ink-600">{category.description}</p>
                        <span className="mt-2 inline-block text-xs font-semibold uppercase tracking-wide text-ink-500">
                          {isActive ? 'Showing stack' : 'Hover to preview'}
                        </span>
                      </div>
                    </div>
                  </button>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={0.1} className="lg:sticky lg:top-28">
            <div className="rounded-2xl border border-ink-300 bg-white shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-primary shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.15)]">
                  <activeCategory.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-primary">
                  {activeCategory.title}
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                {activeCategory.items.map((item) => (
                  <ItemRow key={item.label} item={item} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mobile/tablet: sliding cards, one category per slide, sub-items listed below */}
      <section className="lg:hidden max-w-xl mx-auto px-6 py-14">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          className="pb-10"
        >
          {CATEGORIES.map((category) => {
            const Icon = category.icon
            return (
              <SwiperSlide key={category.key}>
                <div className="rounded-2xl border-l-4 border-gold bg-white shadow-xl p-6">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/20 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-primary">
                        {category.title}
                      </h3>
                      <p className="text-sm text-ink-600">{category.description}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    {category.items.map((item) => (
                      <ItemRow key={item.label} item={item} />
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </section>

      <CTABand
        title="Ready to talk about Software Development?"
        description="We'll walk through your requirements and recommend the right stack."
      />
    </>
  )
}
