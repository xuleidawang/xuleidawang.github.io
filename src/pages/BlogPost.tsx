import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPostBySlug } from "@/lib/posts";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: "oklch(0.98 0.003 265)", color: "oklch(0.12 0.015 265)" }}>
        <Navbar />
        <h1 className="font-display text-3xl font-bold">Post not found</h1>
        <Link
          to="/blog"
          className="flex items-center gap-2 text-sm transition-colors"
          style={{ color: "oklch(0.52 0.22 295)" }}
        >
          <ArrowLeft size={14} /> Back to Blog
        </Link>
      </div>
    );
  }

  const date = post.date
    ? new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "";

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.98 0.003 265)", color: "oklch(0.12 0.015 265)" }}>
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm mb-10 transition-colors"
          style={{ color: "oklch(0.45 0.012 265)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.12 0.015 265)")}
          onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.45 0.012 265)")}
        >
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full"
                style={{
                  background: "oklch(0.62 0.22 295 / 0.08)",
                  color: "oklch(0.52 0.22 295)",
                  border: "1px solid oklch(0.62 0.22 295 / 0.2)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6" style={{ color: "oklch(0.12 0.015 265)" }}>
          {post.title}
        </h1>

        {/* Meta */}
        <div
          className="flex flex-wrap items-center gap-5 pb-8 mb-10 border-b text-sm"
          style={{ borderColor: "oklch(0.88 0.008 265)", color: "oklch(0.45 0.012 265)" }}
        >
          {date && (
            <span className="flex items-center gap-2">
              <Calendar size={14} /> {date}
            </span>
          )}
          {post.readTime && (
            <span className="flex items-center gap-2">
              <Clock size={14} /> {post.readTime}
            </span>
          )}
        </div>

        {/* Cover image */}
        {post.coverImage && (
          <div className="rounded-xl overflow-hidden mb-10 h-64 md:h-80">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Content */}
        <div className="prose-dark">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h1: ({ children }) => (
                <h1 className="font-display text-3xl font-bold mt-10 mb-4" style={{ color: "oklch(0.12 0.015 265)" }}>{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="font-display text-2xl font-bold mt-8 mb-3" style={{ color: "oklch(0.12 0.015 265)" }}>{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="font-display text-xl font-semibold mt-6 mb-2" style={{ color: "oklch(0.12 0.015 265)" }}>{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mb-5 leading-relaxed" style={{ color: "oklch(0.25 0.010 265)" }}>{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="mb-5 pl-6 space-y-1.5 list-disc" style={{ color: "oklch(0.25 0.010 265)" }}>{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-5 pl-6 space-y-1.5 list-decimal" style={{ color: "oklch(0.25 0.010 265)" }}>{children}</ol>
              ),
              li: ({ children }) => <li className="leading-relaxed">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote
                  className="my-6 pl-4 italic"
                  style={{
                    borderLeft: "3px solid oklch(0.62 0.22 295 / 0.5)",
                    color: "oklch(0.40 0.010 265)",
                  }}
                >
                  {children}
                </blockquote>
              ),
              code: ({ className, children, ...props }) => {
                const isBlock = className?.includes("language-");
                if (isBlock) {
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }
                return (
                  <code
                    className="font-mono-custom text-sm px-1.5 py-0.5 rounded"
                    style={{
                      background: "oklch(0.93 0.006 265)",
                      border: "1px solid oklch(0.88 0.008 265)",
                      color: "oklch(0.82 0.12 295)",
                    }}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => (
                <pre
                  className="my-6 p-5 rounded-xl overflow-x-auto font-mono-custom text-sm"
                  style={{
                    background: "oklch(0.97 0.004 265)",
                    border: "1px solid oklch(0.88 0.008 265)",
                  }}
                >
                  {children}
                </pre>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  style={{ color: "oklch(0.52 0.22 295)", textDecoration: "underline", textUnderlineOffset: "3px" }}
                >
                  {children}
                </a>
              ),
              hr: () => <hr className="my-8" style={{ borderColor: "oklch(0.88 0.008 265)" }} />,
              img: ({ src, alt }) => (
                <img src={src} alt={alt} className="rounded-xl w-full my-6" />
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-6">
                  <table className="w-full text-sm border-collapse">{children}</table>
                </div>
              ),
              th: ({ children }) => (
                <th
                  className="text-left px-4 py-2 font-semibold"
                  style={{
                    background: "oklch(0.93 0.006 265)",
                    border: "1px solid oklch(0.88 0.008 265)",
                    color: "oklch(0.12 0.015 265)",
                  }}
                >
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td
                  className="px-4 py-2"
                  style={{
                    border: "1px solid oklch(0.88 0.008 265)",
                    color: "oklch(0.25 0.010 265)",
                  }}
                >
                  {children}
                </td>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Footer nav */}
        <div
          className="mt-16 pt-8 border-t flex items-center justify-between"
          style={{ borderColor: "oklch(0.88 0.008 265)" }}
        >
          <Link
            to="/blog"
            className="flex items-center gap-2 text-sm transition-colors"
            style={{ color: "oklch(0.45 0.012 265)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.12 0.015 265)")}
            onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.45 0.012 265)")}
          >
            <ArrowLeft size={14} /> All posts
          </Link>
          <Link
            to="/"
            className="text-sm transition-colors"
            style={{ color: "oklch(0.52 0.22 295)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.12 0.015 265)")}
            onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.52 0.22 295)")}
          >
            lei-xu.com
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
