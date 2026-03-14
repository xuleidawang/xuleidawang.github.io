import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/posts";

export default function Blog() {
  const allPosts = getAllPosts();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(allPosts.flatMap((p) => p.tags))).sort();
  const filtered = activeTag ? allPosts.filter((p) => p.tags.includes(activeTag)) : allPosts;

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.07 0.012 265)", color: "oklch(0.96 0.005 265)" }}>
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <div className="mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6"
            style={{
              border: "1px solid oklch(0.62 0.22 295 / 0.3)",
              background: "oklch(0.62 0.22 295 / 0.06)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "oklch(0.62 0.22 295)" }} />
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "oklch(0.62 0.22 295)" }}>
              Writing
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: "oklch(0.96 0.005 265)" }}>
            Blog &{" "}
            <span className="text-gradient-purple">Notes</span>
          </h1>
          <p className="text-lg leading-relaxed max-w-xl" style={{ color: "oklch(0.60 0.015 265)" }}>
            Thoughts on graphics programming, rendering research, and the craft of building visual systems.
          </p>
        </div>

        {/* Tag filter */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveTag(null)}
              className="text-xs px-3 py-1.5 rounded-full transition-all"
              style={{
                background: activeTag === null ? "oklch(0.62 0.22 295)" : "oklch(0.10 0.015 265)",
                color: activeTag === null ? "white" : "oklch(0.60 0.015 265)",
                border: `1px solid ${activeTag === null ? "oklch(0.62 0.22 295)" : "oklch(0.20 0.015 265)"}`,
              }}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className="text-xs px-3 py-1.5 rounded-full transition-all"
                style={{
                  background: activeTag === tag ? "oklch(0.62 0.22 295)" : "oklch(0.10 0.015 265)",
                  color: activeTag === tag ? "white" : "oklch(0.60 0.015 265)",
                  border: `1px solid ${activeTag === tag ? "oklch(0.62 0.22 295)" : "oklch(0.20 0.015 265)"}`,
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Posts */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg font-display font-semibold mb-2" style={{ color: "oklch(0.96 0.005 265)" }}>
              No posts yet
            </p>
            <p className="text-sm" style={{ color: "oklch(0.60 0.015 265)" }}>
              Check back soon — posts will appear here once published.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filtered.map((post) => {
              const date = post.date
                ? new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                : "";
              return (
                <Link key={post.slug} to={`/blog/${post.slug}`}>
                  <article
                    className="card-dark group p-6 md:p-8 flex flex-col md:flex-row gap-6 cursor-pointer"
                  >
                    {post.coverImage && (
                      <div className="md:w-48 md:shrink-0 h-40 md:h-32 rounded-lg overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex-1 flex flex-col justify-between gap-3">
                      <div>
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-0.5 rounded-md"
                                style={{
                                  background: "oklch(0.62 0.22 295 / 0.08)",
                                  color: "oklch(0.62 0.22 295)",
                                  border: "1px solid oklch(0.62 0.22 295 / 0.2)",
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <h2
                          className="font-display text-xl font-semibold mb-2 transition-colors"
                          style={{ color: "oklch(0.96 0.005 265)" }}
                        >
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "oklch(0.60 0.015 265)" }}>
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                      <div
                        className="flex items-center justify-between pt-3 border-t"
                        style={{ borderColor: "oklch(0.20 0.015 265)" }}
                      >
                        <div className="flex items-center gap-4 text-xs" style={{ color: "oklch(0.60 0.015 265)" }}>
                          {date && (
                            <span className="flex items-center gap-1.5">
                              <Calendar size={12} /> {date}
                            </span>
                          )}
                          {post.readTime && (
                            <span className="flex items-center gap-1.5">
                              <Clock size={12} /> {post.readTime}
                            </span>
                          )}
                        </div>
                        <span
                          className="text-xs flex items-center gap-1 transition-all group-hover:gap-2"
                          style={{ color: "oklch(0.62 0.22 295)" }}
                        >
                          Read more <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
