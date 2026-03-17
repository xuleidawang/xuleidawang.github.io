# xuleidawang.github.io — Lei Xu's Portfolio

Personal portfolio for [lei-xu.com](https://lei-xu.com), built with **Vite + React + TypeScript + Tailwind CSS 4**.

Blog posts are plain Markdown files — no CMS, no database. To publish, write a `.md` file, commit it, and push to `master`. GitHub Actions handles the rest.

---

## Local Development

```bash
# Install dependencies
pnpm install

# Start dev server at http://localhost:5173
pnpm dev

# Build for production
pnpm build

# Preview the production build locally
pnpm preview
```

---

## How to Publish a Blog Post

### 1. Create a Markdown file

Add a new `.md` file inside `src/posts/`. The filename becomes the URL slug.

```
src/posts/my-new-post.md   →   lei-xu.com/blog/my-new-post
```

### 2. Add frontmatter

Every post **must** start with a YAML frontmatter block:

```markdown
---
title: "Your Post Title Here"
date: "2025-12-01"
excerpt: "A one or two sentence summary shown on the blog listing page."
tags: Rendering, Research, GLSL
coverImage: https://images.unsplash.com/photo-xxxxx?w=1200&q=80
---

Your post content starts here...
```

| Field | Required | Description |
|---|---|---|
| `title` | Yes | Displayed as the post heading |
| `date` | Yes | ISO date `YYYY-MM-DD`, used for sorting (newest first) |
| `excerpt` | Yes | Short summary shown on listing and home page |
| `tags` | No | Comma-separated list, e.g. `Rendering, CUDA, Research` |
| `coverImage` | No | URL to a cover image (Unsplash, your own CDN, etc.) |

### 3. Write your content

Everything after the closing `---` is your post body. Full **GitHub Flavored Markdown** is supported:

- Headings (`##`, `###`)
- **Bold**, *italic*, ~~strikethrough~~
- `inline code` and fenced code blocks with syntax highlighting
- Tables, blockquotes, ordered/unordered lists
- Images: `![alt](url)`
- Links: `[text](url)`

**Code block example:**

````markdown
```glsl
vec3 color = texture(albedoTex, uv).rgb;
```
````

Supported languages: `glsl`, `hlsl`, `cpp`, `c`, `python`, `rust`, `js`, `ts`, `bash`, `json`, `yaml`, and [many more](https://highlightjs.org/static/demo/).

### Embedding Media in a Post

#### Images

Use standard Markdown image syntax. You can use any public URL, or place a file in `public/images/` and reference it with an absolute path.

```markdown
<!-- From a public URL -->
![Alt text](https://images.unsplash.com/photo-xxxxx?w=1200&q=80)

<!-- From your own repo: place the file in public/images/ -->
![Alt text](/images/my-screenshot.png)
```

To add a local image:
```bash
# Copy your image into public/images/
mkdir -p public/images
cp ~/Desktop/my-screenshot.png public/images/

# Reference it in your post
# ![My screenshot](/images/my-screenshot.png)

# Commit both the image and the post
git add public/images/my-screenshot.png src/posts/my-post.md
git commit -m "Add post with screenshot"
git push origin master
```

#### GIFs

GIFs work exactly like images — just point to a `.gif` URL:

```markdown
![Demo animation](https://media.giphy.com/media/xxxxx/giphy.gif)
```

#### YouTube Videos

Paste an HTML `<iframe>` directly in your Markdown — it renders in the post page:

```html
<iframe
  width="100%"
  height="420"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Video title"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  style="border-radius: 8px;"
></iframe>
```

Replace `VIDEO_ID` with the ID from the YouTube URL (e.g. `dQw4w9WgXcQ` from `youtube.com/watch?v=dQw4w9WgXcQ`).

#### Self-Hosted / Direct Video Files

Upload your video to a public location (GitHub Releases, Google Drive direct link, or any CDN), then use an HTML `<video>` tag:

```html
<video width="100%" controls style="border-radius: 8px;">
  <source src="https://your-cdn.com/demo.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

**Quick reference:**

| Media type | Syntax |
|---|---|
| Image (URL) | `![alt](https://...)` |
| Image (local) | `![alt](/images/file.png)` — place file in `public/images/` |
| GIF | Same as image, `.gif` extension |
| YouTube | `<iframe src="https://www.youtube.com/embed/VIDEO_ID" ...>` |
| Self-hosted video | `<video controls><source src="..." type="video/mp4"></video>` |

See `src/posts/test-blog-post.md` for a live working example of each.

### 4. Commit and push

```bash
# Stage the new post file
git add src/posts/my-new-post.md

# Commit with a descriptive message
git commit -m "Add post: My New Post Title"

# Push to master — GitHub Actions auto-deploys within ~2 minutes
git push origin master
```

Your post will appear at:
- **Blog listing:** `https://lei-xu.com/blog`
- **Post page:** `https://lei-xu.com/blog/my-new-post`

---

## How to Add a Featured Project

Featured projects are defined in the `projects` array at the top of `src/pages/Home.tsx`.

### 1. Open the file

```bash
code src/pages/Home.tsx
```

### 2. Find the `projects` array (around line 13)

```ts
const projects = [
  // ... existing or placeholder entries
];
```

### 3. Add a new project object

```ts
{
  id: 1,                            // Unique number; increment from the last
  title: "Your Project Title",
  description: "A short description of what the project does and why it matters.",
  tags: ["C++", "Vulkan", "GLSL"],  // Tech stack tags shown as badges
  icon: <Zap size={20} />,          // Pick one: Zap, Layers, Cpu, Code2, Star
  accent: "#a78bfa",                // Card accent colour:
                                    //   purple  → "#a78bfa"
                                    //   indigo  → "#818cf8"
                                    //   blue    → "#60a5fa"
  github: "https://github.com/xuleidawang/your-repo",  // Set "" to hide
  demo: "https://your-demo-url.com",                   // Set "" to hide
}
```

### 4. Replace the placeholder with the real project grid

When you're ready to show real projects, find the placeholder `<div>` in the Projects section (search for `"Featured projects coming soon"`) and replace it with:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {projects.map((project) => (
    <ProjectCard key={project.id} project={project} />
  ))}
</div>
```

### 5. Commit and push

```bash
git add src/pages/Home.tsx
git commit -m "Add featured project: Your Project Title"
git push origin master
```

---

## Deployment

Deployment is fully automated via GitHub Actions (`.github/workflows/deploy.yml`).

**One-time setup:**

1. Go to your repo **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Your `CNAME` file (`public/CNAME`) already contains `lei-xu.com`
4. Point your DNS to GitHub Pages:
   - `CNAME` record: `www` → `xuleidawang.github.io`
   - `A` records for the apex domain:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

After that, every `git push origin master` auto-deploys within ~2 minutes.

---

## Updating Personal Info

| What to change | File | Where to look |
|---|---|---|
| Name, role, tagline | `src/pages/Home.tsx` | Hero section (~line 458) |
| About bio | `src/pages/Home.tsx` | About section (~line 580) |
| Skills list | `src/pages/Home.tsx` | `skills` array (~line 110) |
| Work history | `src/pages/Home.tsx` | Experience array (~line 685) |
| Social links | `src/components/Footer.tsx` | `socials` array (line 4) |
| Email address | `src/components/Footer.tsx` | Plain text in Connect section |
| Nav logo text | `src/components/Navbar.tsx` | Line 54 |
| Custom domain | `public/CNAME` | Replace with your domain |

---

## Project Structure

```
├── public/
│   ├── CNAME              ← Custom domain (lei-xu.com)
│   ├── 404.html           ← GitHub Pages SPA routing fallback
│   └── favicon.svg
├── src/
│   ├── posts/             ← ✏️  Your blog posts go here (.md files)
│   ├── pages/
│   │   ├── Home.tsx       ← Portfolio sections (edit content here)
│   │   ├── Blog.tsx       ← Blog listing page
│   │   └── BlogPost.tsx   ← Individual post reader
│   ├── components/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   │   └── posts.ts       ← Markdown loader (no edits needed)
│   ├── App.tsx            ← Routes
│   ├── main.tsx           ← Entry point
│   └── index.css          ← Global theme & CSS variables
├── .github/workflows/
│   └── deploy.yml         ← Auto-deploy on push to master
├── index.html
├── vite.config.ts
└── package.json
```

---

## License

MIT — feel free to fork and adapt for your own portfolio.
