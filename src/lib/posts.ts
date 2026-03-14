export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  coverImage?: string;
  readTime?: string;
}

export interface Post extends PostMeta {
  content: string;
}

// Vite's import.meta.glob eagerly imports all markdown files at build time.
// Each file must have YAML frontmatter with: title, date, excerpt, tags.
const modules = import.meta.glob<{ default: string }>("../posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function parseFrontmatter(raw: string): { meta: Record<string, string>; content: string } {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!fmMatch) return { meta: {}, content: raw };

  const fmLines = fmMatch[1].split("\n");
  const meta: Record<string, string> = {};

  for (const line of fmLines) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, "");
    meta[key] = value;
  }

  return { meta, content: fmMatch[2].trim() };
}

export function getAllPosts(): Post[] {
  const posts: Post[] = [];

  for (const [filepath, raw] of Object.entries(modules)) {
    const slug = filepath.replace("../posts/", "").replace(".md", "");
    const { meta, content } = parseFrontmatter(raw as unknown as string);

    posts.push({
      slug,
      title: meta.title ?? slug,
      date: meta.date ?? "",
      excerpt: meta.excerpt ?? "",
      tags: meta.tags ? meta.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      coverImage: meta.coverImage ?? meta.cover_image ?? undefined,
      readTime: estimateReadTime(content),
      content,
    });
  }

  // Sort newest first
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
