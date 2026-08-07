import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import Breadcrumb from '../components/ui/Breadcrumb'
import Reveal from '../components/motion/Reveal'
import { BLOG_POSTS } from '../data/blogPosts'
import useDocumentTitle from '../hooks/useDocumentTitle'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function Blog() {
  useDocumentTitle(
    'Blog | Prosper Infotech',
    'Practical guides and perspectives from the Prosper Infotech team on warehouse, yard, and fleet technology — RFID, GPS, IoT, and AI logistics insights.'
  )

  return (
    <>
      <Breadcrumb title="Blog" parent="Resources" />

      <section className="max-w-3xl mx-auto px-6 pt-16 pb-8 text-center">
        <Reveal className="flex flex-col items-center gap-4">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Resources
          </span>
          <h2 className="text-3xl md:text-[38px] md:leading-[44px]">
            Insights on RFID, GPS, IoT, and AI logistics technology
          </h2>
          <p className="text-ink-600 text-lg">
            Practical guides and perspectives from the Prosper Infotech team on warehouse, yard,
            and fleet technology.
          </p>
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.08}>
              <Link
                to={`/resources/blog/${post.slug}`}
                className="group flex flex-col h-full rounded-lg border border-ink-300 bg-white p-6 shadow-md hover:shadow-[0_0_50px_-8px_rgba(247,221,0,0.35),0_25px_50px_-12px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300"
              >
                <span className="self-start rounded-full bg-gold/20 text-primary text-xs font-semibold px-3 py-1">
                  {post.category}
                </span>
                <h3 className="mt-4 font-heading font-semibold text-lg text-primary group-hover:text-primary-dark transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-ink-600 line-clamp-3 flex-1">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-ink-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                  Read article <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
