import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Github, ExternalLink, ChevronLeft, ChevronRight,
  Star, Code2, Cpu, Layers, Zap, BookOpen, Calendar,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/posts";

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 1,
    title: "Real-Time Global Illumination Engine",
    description:
      "A GPU-accelerated path tracing renderer achieving real-time performance through novel denoising algorithms and adaptive sampling strategies.",
    tags: ["C++", "CUDA", "OpenGL", "GLSL"],
    icon: <Zap size={20} />,
    accent: "#a78bfa",
    github: "https://github.com/xuleidawang",
    demo: "https://lei-xu.com",
  },
  {
    id: 2,
    title: "Procedural Terrain Generation",
    description:
      "Research into multi-scale noise functions and erosion simulation for photorealistic terrain synthesis, published at SIGGRAPH 2024.",
    tags: ["Python", "WebGL", "WASM", "Rust"],
    icon: <Layers size={20} />,
    accent: "#818cf8",
    github: "https://github.com/xuleidawang",
    demo: "https://lei-xu.com",
  },
  {
    id: 3,
    title: "Neural Texture Compression",
    description:
      "Leveraging neural networks to achieve 10x compression ratios on PBR texture atlases while maintaining perceptual quality for game engines.",
    tags: ["PyTorch", "ONNX", "DirectX 12", "C#"],
    icon: <Cpu size={20} />,
    accent: "#60a5fa",
    github: "https://github.com/xuleidawang",
    demo: "https://lei-xu.com",
  },
];

const caseStudies = [
  {
    id: 1,
    label: "Case Study 01",
    title: "Optimizing Shader Pipelines for AAA Game Titles",
    description:
      "A deep dive into the profiling, analysis, and optimization of complex shader pipelines that reduced GPU frame time by 40% across three major game titles.",
    tags: ["Performance", "HLSL", "Vulkan"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    readTime: "12 min read",
  },
  {
    id: 2,
    label: "Case Study 02",
    title: "Building a Cross-Platform Graphics Abstraction Layer",
    description:
      "Designing and implementing a unified graphics API that transparently targets Vulkan, Metal, and DirectX 12 with zero runtime overhead.",
    tags: ["Architecture", "C++", "Cross-Platform"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    readTime: "18 min read",
  },
];

const testimonials = [
  {
    id: 1,
    quote:
      "Lei's work on our rendering pipeline was transformative. The optimizations delivered were beyond what we thought achievable in the timeframe — a rare combination of deep technical knowledge and practical execution.",
    name: "Sarah Chen",
    role: "Lead Graphics Engineer",
    company: "Naughty Dog",
    initials: "SC",
    color: "#a78bfa",
  },
  {
    id: 2,
    quote:
      "Working with Lei on the SIGGRAPH paper was an incredible experience. Their ability to translate complex mathematical concepts into elegant, efficient code is unmatched. Highly recommend for any research collaboration.",
    name: "Dr. Marcus Webb",
    role: "Associate Professor",
    company: "Stanford University",
    initials: "MW",
    color: "#818cf8",
  },
  {
    id: 3,
    quote:
      "Lei joined our team mid-project and immediately made an impact. The neural texture compression system they built is now a core part of our asset pipeline, saving us hours of build time every day.",
    name: "Priya Nair",
    role: "Technical Director",
    company: "Epic Games",
    initials: "PN",
    color: "#60a5fa",
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

function CaseStudyCard({ study }: { study: typeof caseStudies[0] }) {
  return (
    <div className="card-dark group overflow-hidden flex flex-col md:flex-row">
      <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
        <img
          src={study.image}
          alt={study.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between gap-4">
        <div>
          <span
            className="text-xs font-mono-custom tracking-widest uppercase"
            style={{ color: "oklch(0.62 0.22 295)" }}
          >
            {study.label}
          </span>
          <h3
            className="font-display text-xl font-semibold mt-2 mb-3 transition-colors"
            style={{ color: "oklch(0.96 0.005 265)" }}
          >
            {study.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "oklch(0.60 0.015 265)" }}>
            {study.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {study.tags.map((tag) => (
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
            className="flex items-center gap-3 text-xs shrink-0 ml-4"
            style={{ color: "oklch(0.60 0.015 265)" }}
          >
            <span>{study.readTime}</span>
            <ArrowRight size={14} style={{ color: "oklch(0.62 0.22 295)" }} />
          </div>
        </div>
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

function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = (dir: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((c) => (c + dir + testimonials.length) % testimonials.length);
      setAnimating(false);
    }, 200);
  };

  const t = testimonials[current]!;

  return (
    <div className="relative">
      <div
        className={`card-dark p-8 md:p-10 transition-opacity duration-200 ${animating ? "opacity-0" : "opacity-100"}`}
      >
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill={t.color} color={t.color} />
          ))}
        </div>
        <blockquote
          className="text-base md:text-lg leading-relaxed mb-8 italic"
          style={{ color: "oklch(0.96 0.005 265)" }}
        >
          "{t.quote}"
        </blockquote>
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
            style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}
          >
            {t.initials}
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: "oklch(0.96 0.005 265)" }}>
              {t.name}
            </p>
            <p className="text-xs" style={{ color: "oklch(0.60 0.015 265)" }}>
              {t.role} · {t.company}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!animating) {
                  setAnimating(true);
                  setTimeout(() => { setCurrent(i); setAnimating(false); }, 200);
                }
              }}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === current ? "1.5rem" : "0.375rem",
                background: i === current ? "oklch(0.62 0.22 295)" : "oklch(0.20 0.015 265)",
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => go(-1)}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
            style={{
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
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => go(1)}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
            style={{
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
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
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
              Building the invisible infrastructure of visual experiences — from real-time rendering engines
              to novel research in computational graphics. I bridge the gap between academic theory and
              production-grade systems.
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
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200"
                style={{
                  border: "1px solid oklch(0.20 0.015 265)",
                  color: "oklch(0.60 0.015 265)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = "oklch(0.96 0.005 265)";
                  (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.62 0.22 295)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = "oklch(0.60 0.015 265)";
                  (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.20 0.015 265)";
                }}
              >
                Get in Touch
              </a>
            </div>

            <div
              className="flex flex-wrap gap-8 mt-16 pt-8 border-t animate-fade-in-up animate-delay-400"
              style={{ borderColor: "oklch(0.20 0.015 265)" }}
            >
              {[
                { value: "8+", label: "Years Experience" },
                { value: "30+", label: "Projects Shipped" },
                { value: "4", label: "SIGGRAPH Papers" },
                { value: "12+", label: "Collaborators" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-bold" style={{ color: "oklch(0.96 0.005 265)" }}>
                    {stat.value}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "oklch(0.60 0.015 265)" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
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

          {/* Case study cards */}
          <div className="flex flex-col gap-6 mb-10">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </div>

          {/* Latest blog posts */}
          {latestPosts.length > 0 && (
            <>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px" style={{ background: "oklch(0.20 0.015 265)" }} />
                <div
                  className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase"
                  style={{ color: "oklch(0.60 0.015 265)" }}
                >
                  <BookOpen size={13} /> Latest from the Blog
                </div>
                <div className="flex-1 h-px" style={{ background: "oklch(0.20 0.015 265)" }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {latestPosts.map((post) => (
                  <BlogPostMini key={post.slug} post={post} />
                ))}
              </div>
            </>
          )}
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
                  I'm a graphics software engineer and researcher with over 8 years of experience building
                  high-performance rendering systems, tools, and pipelines for games, film, and interactive media.
                </p>
                <p>
                  My work spans from low-level GPU programming in CUDA and Vulkan to high-level research
                  in neural rendering and procedural generation. I've contributed to shipped AAA titles and
                  published research at SIGGRAPH and EGSR.
                </p>
                <p>
                  When I'm not optimizing shaders, I write about graphics programming on my blog and mentor
                  junior engineers entering the field.
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
                        {exp.role}
                      </p>
                      <p className="text-xs" style={{ color: "oklch(0.60 0.015 265)" }}>
                        {exp.company}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
