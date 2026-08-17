import { useParams, Link, Navigate } from 'react-router-dom'
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react'
import Breadcrumb from '../components/ui/Breadcrumb'
import CTABand from '../components/ui/CTABand'
import Reveal from '../components/motion/Reveal'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { BLOG_POSTS } from '../data/blogPosts'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = BLOG_POSTS.find((p) => p.slug === slug)

  useDocumentTitle(
    post ? `${post.title} | Prosper Infotech Blog` : undefined,
    post ? post.excerpt : undefined,
    post && {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      image: 'https://www.prosperinfotech.com/og-image.jpg',
      author: { '@type': 'Organization', name: 'Prosper Infotech' },
      publisher: {
        '@type': 'Organization',
        name: 'Prosper Infotech',
        logo: { '@type': 'ImageObject', url: 'https://www.prosperinfotech.com/favicon.png' },
      },
      mainEntityOfPage: `https://www.prosperinfotech.com/resources/blog/${post.slug}`,
    }
  )

  if (!post) {
    return <Navigate to="/resources/blog" replace />
  }

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <Breadcrumb title={post.title} parent="Blog" />

      <section className="max-w-3xl mx-auto px-6 pt-16 pb-4">
        <Reveal className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="rounded-full bg-gold/20 text-primary text-xs font-semibold px-3 py-1">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-ink-500">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-ink-500">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>

          {post.sections.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="text-2xl font-heading font-bold text-primary mt-4 mb-2">
                  {section.heading}
                </h2>
              )}
              <p className="text-ink-600 text-lg leading-relaxed">{section.body}</p>
            </div>
          ))}

          {post.relatedLinks?.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-ink-200 pt-6">
              <span className="text-sm font-semibold text-ink-900">See also:</span>
              {post.relatedLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="group inline-flex items-center gap-1 rounded-full border border-ink-300 px-3.5 py-1.5 text-sm text-ink-700 transition-colors hover:border-primary hover:text-primary"
                >
                  {link.label}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          )}

          <Link
            to="/resources/blog"
            className="mt-2 inline-flex items-center gap-2 self-start text-sm font-semibold text-primary hover:text-primary-dark"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </Link>
        </Reveal>
      </section>

      {otherPosts.length > 0 && (
        <section className="bg-surface-alt">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <h3 className="text-center font-heading font-bold text-2xl text-primary mb-10">
              More articles
            </h3>
            <div className="grid gap-6 sm:grid-cols-3">
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  to={`/resources/blog/${p.slug}`}
                  className="rounded-lg border border-ink-300 bg-white p-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                    {p.category}
                  </span>
                  <h4 className="mt-2 font-heading font-semibold text-sm text-ink-900">
                    {p.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand
        title="Have a question about your operation?"
        description="Talk to our team — we'll walk through your specific requirements."
      />
    </>
  )
}
