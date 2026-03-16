import { Link } from "react-router-dom";
import {
  ArrowRight, Github, ExternalLink,
  Code2, Zap, BookOpen, Calendar,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/posts";

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 1,
    title: "Test Project",
    description:
      "This is a test project entry. Replace this with your real project title, description, tags, and links.",
    tags: ["C++", "GLSL"],
    icon: <Zap size={20} />,
    accent: "#a78bfa",
    github: "",
    demo: "",
  },
];



const skills = [
  "C++ / Rust", "GLSL / HLSL", "Vulkan / Metal", "CUDA / OpenCL",
  "PyTorch", "OpenGL", "DirectX 12", "WebGL / WebGPU",
  "Real-Time Rendering", "Path Tracing", "Shader Optimization", "GPU Profiling",
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span className="section-label-dot" />
      <span className="section-label-text">{children}</span>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <div className="card-dark group p-6 flex flex-col gap-4 h-full">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ background: `${project.accent}18`, color: project.accent }}
      >
        {project.icon}
      </div>
      <div className="flex-1">
        <h3
          className="font-display text-lg font-semibold mb-2 transition-colors"
          style={{ color: "oklch(0.96 0.005 265)" }}
        >
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "oklch(0.60 0.015 265)" }}>
          {project.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-md"
            style={{
              background: "oklch(0.13 0.018 265)",
              color: "oklch(0.60 0.015 265)",
              border: "1px solid oklch(0.20 0.015 265)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      <div
        className="flex items-center gap-4 pt-2 border-t"
        style={{ borderColor: "oklch(0.20 0.015 265)" }}
      >
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs transition-colors"
          style={{ color: "oklch(0.60 0.015 265)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.96 0.005 265)")}
          onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.60 0.015 265)")}
        >
          <Github size={14} /> Source
        </a>
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs transition-colors"
          style={{ color: "oklch(0.62 0.22 295)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "white")}
          onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.62 0.22 295)")}
        >
          <ExternalLink size={14} /> Live Demo
        </a>
      </div>
    </div>
  );
}


function BlogPostMini({
  post,
}: {
  post: { slug: string; title: string; date: string; excerpt: string; tags: string[]; coverImage?: string; readTime?: string };
}) {
  const date = post.date
    ? new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "";
  return (
    <Link to={`/blog/${post.slug}`}>
      <article className="card-dark group p-5 flex flex-col gap-3 h-full cursor-pointer">
        {post.coverImage && (
          <div className="h-36 rounded-lg overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 2).map((tag) => (
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
        <h3
          className="font-display text-base font-semibold transition-colors line-clamp-2 flex-1"
          style={{ color: "oklch(0.96 0.005 265)" }}
        >
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "oklch(0.60 0.015 265)" }}>
            {post.excerpt}
          </p>
        )}
        <div
          className="flex items-center justify-between pt-2 border-t"
          style={{ borderColor: "oklch(0.20 0.015 265)" }}
        >
          <div className="flex items-center gap-1.5 text-xs" style={{ color: "oklch(0.60 0.015 265)" }}>
            <Calendar size={11} />
            <span>{date}</span>
          </div>
          <span
            className="text-xs flex items-center gap-1"
            style={{ color: "oklch(0.62 0.22 295)" }}
          >
            Read <ArrowRight size={11} />
          </span>
        </div>
      </article>
    </Link>
  );
}



// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const allPosts = getAllPosts();
  const latestPosts = allPosts.slice(0, 3);

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.07 0.012 265)", color: "oklch(0.96 0.005 265)" }}>
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.20 0.015 265) 1px, transparent 1px), linear-gradient(90deg, oklch(0.20 0.015 265) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow orbs */}
        <div
          className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, oklch(0.62 0.22 295), transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-[100px] opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, oklch(0.38 0.12 255), transparent 70%)" }}
        />

        <div className="max-w-6xl mx-auto px-6 relative z-10 pt-24 pb-16 w-full">
          <div className="max-w-3xl">
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 animate-fade-in-up">
              <span style={{ color: "oklch(0.96 0.005 265)" }}>Lei</span>{" "}
              <span className="text-gradient-purple">Xu</span>
            </h1>

            <p
              className="font-display text-xl md:text-2xl font-medium mb-6 animate-fade-in-up animate-delay-100"
              style={{ color: "oklch(0.60 0.015 265)" }}
            >
              Graphics Software / Research Engineer
            </p>

            <p
              className="text-base md:text-lg max-w-xl leading-relaxed mb-10 animate-fade-in-up animate-delay-200"
              style={{ color: "oklch(0.60 0.015 265)" }}
            >
              I love everything about computer graphics, visual computing!
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up animate-delay-300">
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 text-white"
                style={{
                  background: "oklch(0.62 0.22 295)",
                  boxShadow: "0 4px 24px oklch(0.62 0.22 295 / 0.25)",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "oklch(0.68 0.22 295)")}
                onMouseLeave={e => (e.currentTarget.style.background = "oklch(0.62 0.22 295)")}
              >
                View My Work <ArrowRight size={16} />
              </a>
            </div>


          </div>
        </div>
      </section>

      {/* ── About / Skills ────────────────────────────────────────────────── */}
      <section id="about" className="section-padding" style={{ borderTop: "1px solid oklch(0.20 0.015 265)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionLabel>About</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6" style={{ color: "oklch(0.96 0.005 265)" }}>
                Crafting pixels with{" "}
                <span className="text-gradient-purple">precision</span>
              </h2>
              <div className="space-y-4 leading-relaxed" style={{ color: "oklch(0.60 0.015 265)" }}>
                <p>
                  I'm a graphics software engineer and researcher with over 8 years of experience building high-performance rendering systems, tools, and pipelines for games, VR operating system, and interactive media.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-all"
                  style={{
                    background: "oklch(0.13 0.018 265)",
                    border: "1px solid oklch(0.20 0.015 265)",
                    color: "oklch(0.96 0.005 265)",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "oklch(0.62 0.22 295)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "oklch(0.20 0.015 265)")}
                >
                  <Code2 size={15} /> Read My Blog
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-display text-lg font-semibold mb-6" style={{ color: "oklch(0.96 0.005 265)" }}>
                Technical Skills
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg text-sm cursor-default transition-all"
                    style={{
                      background: "oklch(0.10 0.015 265)",
                      border: "1px solid oklch(0.20 0.015 265)",
                      color: "oklch(0.60 0.015 265)",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.62 0.22 295)";
                      (e.currentTarget as HTMLElement).style.color = "oklch(0.96 0.005 265)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.20 0.015 265)";
                      (e.currentTarget as HTMLElement).style.color = "oklch(0.60 0.015 265)";
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-10 space-y-6">
                {[
                  { period: "2024.05 – Present", role: "Avatar Platform", company: "Meta Reality Labs" },
                  { period: "2023.04 – 2024.04", role: "Lego 2K Drive & NBA 2K 25", company: "Visual Concepts / 2K Games" },
                  { period: "2021.06 – 2023.03", role: "Google Map/Earth 3D Reconstruction", company: "Google" },
                  { period: "2019.08 – 2021.03", role: "Bing Maps 3D Reconstruction", company: "Microsoft" },
                ].map((exp) => (
                  <div key={exp.company} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                        style={{ background: "oklch(0.62 0.22 295)" }}
                      />
                      <div className="w-px flex-1 mt-1" style={{ background: "oklch(0.20 0.015 265)" }} />
                    </div>
                    <div className="pb-4">
                      <p className="text-xs font-mono-custom mb-0.5" style={{ color: "oklch(0.62 0.22 295)" }}>
                        {exp.period}
                      </p>
                      <p className="font-semibold text-sm" style={{ color: "oklch(0.96 0.005 265)" }}>
                        {exp.company}
                      </p>
                      <p className="text-xs" style={{ color: "oklch(0.60 0.015 265)" }}>
                        {exp.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ──────────────────────────────────────────────────────── */}
      <section id="projects" className="section-padding" style={{ borderTop: "1px solid oklch(0.20 0.015 265)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel>Featured Work</SectionLabel>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold max-w-lg" style={{ color: "oklch(0.96 0.005 265)" }}>
              Projects that push the{" "}
              <span className="text-gradient-purple">boundaries</span>
            </h2>
            <Link
              to="/blog"
              className="text-sm flex items-center gap-1.5 transition-colors shrink-0"
              style={{ color: "oklch(0.62 0.22 295)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.96 0.005 265)")}
              onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.62 0.22 295)")}
            >
              View all writing <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Writing & Research ────────────────────────────────────────────── */}
      <section id="writing" className="section-padding" style={{ borderTop: "1px solid oklch(0.20 0.015 265)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel>Writing & Research</SectionLabel>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold max-w-lg" style={{ color: "oklch(0.96 0.005 265)" }}>
              <span className="text-gradient-purple">Blog</span>
            </h2>
            <Link
              to="/blog"
              className="text-sm flex items-center gap-1.5 transition-colors shrink-0"
              style={{ color: "oklch(0.62 0.22 295)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.96 0.005 265)")}
              onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.62 0.22 295)")}
            >
              All posts <ArrowRight size={14} />
            </Link>
          </div>
          {latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="card-dark group p-6 flex flex-col gap-3 h-full"
                >
                  <div className="flex items-center gap-2 text-xs" style={{ color: "oklch(0.62 0.22 295)" }}>
                    <Calendar size={12} />
                    {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </div>
                  <h3 className="font-display text-lg font-semibold" style={{ color: "oklch(0.96 0.005 265)" }}>
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "oklch(0.60 0.015 265)" }}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs mt-1" style={{ color: "oklch(0.62 0.22 295)" }}>
                    Read more <ArrowRight size={12} />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div
              className="rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-20 text-center"
              style={{ borderColor: "oklch(0.22 0.015 265)", background: "oklch(0.10 0.012 265)" }}
            >
              <BookOpen size={32} style={{ color: "oklch(0.35 0.015 265)" }} className="mb-4" />
              <p className="text-sm font-medium mb-1" style={{ color: "oklch(0.55 0.015 265)" }}>
                No posts yet
              </p>
              <p className="text-xs" style={{ color: "oklch(0.38 0.010 265)" }}>
                See README.md for instructions on how to publish a post.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
