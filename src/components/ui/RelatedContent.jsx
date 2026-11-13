import { Link } from 'react-router-dom'
import { ArrowRight, Calendar } from 'lucide-react'
import Reveal from '../motion/Reveal'
import { RELATED_PAGES, pageInfo, relatedPosts } from '../../data/relatedContent'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

// "Keep exploring" block shown above the call-to-action on detail pages: related solutions, products,
// industries and services on one side, matching blog posts on the other.
export default function RelatedContent({ path }) {
  const pages = (RELATED_PAGES[path] ?? []).map(pageInfo).filter(Boolean)
  const posts = relatedPosts(path, 3)
  if (pages.length === 0 && posts.length === 0) return null

  return (
    <section className="border-t border-ink-300/50 bg-surface-alt">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <Reveal className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl">Keep exploring</h2>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-2">
          {pages.length > 0 && (
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Related solutions and products</h3>
              <div className="flex flex-col gap-3">
                {pages.map((page, i) => (
                  <Reveal key={page.path} delay={i * 0.05}>
                    <Link
                      to={page.path}
                      className="group flex items-center justify-between gap-4 rounded-xl border border-ink-300 bg-white px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-dark hover:shadow-lg"
                    >
                      <span>
                        <span className="block font-heading font-semibold text-primary">{page.label}</span>
                        {page.description && <span className="mt-0.5 block text-sm text-ink-600">{page.description}</span>}
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-gold-dark transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {posts.length > 0 && (
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">From the blog</h3>
              <div className="flex flex-col gap-3">
                {posts.map((post, i) => (
                  <Reveal key={post.slug} delay={i * 0.05}>
                    <Link
                      to={`/resources/blog/${post.slug}`}
                      className="group block rounded-xl border border-ink-300 bg-white px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-dark hover:shadow-lg"
                    >
                      <span className="text-xs font-semibold uppercase tracking-wide text-gold-dark">{post.category}</span>
                      <span className="mt-1 block font-heading font-semibold leading-snug text-primary">{post.title}</span>
                      <span className="mt-2 flex items-center gap-1.5 text-xs text-ink-500">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(post.date)}
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
              <Link
                to="/resources/blog"
                className="group mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-dark"
              >
                Read all articles
                <ArrowRight className="h-4 w-4 text-gold-dark transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
