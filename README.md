# Lei Xu — Portfolio & Blog

Personal portfolio and blog for [lei-xu.com](https://lei-xu.com), built with **Vite + React + TypeScript + Tailwind CSS 4**.

All blog posts are plain Markdown files — no CMS, no database. To publish a post, write a `.md` file, commit it, and push to `main`. GitHub Actions handles the rest.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 6 |
| Styling | Tailwind CSS 4 |
| Routing | React Router 7 |
| Markdown | react-markdown + remark-gfm + rehype-highlight |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |

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

## Writing a New Blog Post

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
| `tags` | No | Comma-separated list, used for filtering |
| `coverImage` | No | URL to a cover image (Unsplash, your own CDN, etc.) |

### 3. Write your content

Everything after the closing `---` is your post body. Full **GitHub Flavored Markdown** is supported:

- Headings (`##`, `###`)
- **Bold**, *italic*, ~~strikethrough~~
- `inline code` and fenced code blocks with syntax highlighting
- Tables, blockquotes, ordered/unordered lists
- Images: `![alt](url)`
- Links: `[text](url)`

**Code block example with syntax highlighting:**

````markdown
```glsl
vec3 color = texture(albedoTex, uv).rgb;
```
````

Supported languages: `glsl`, `hlsl`, `cpp`, `c`, `python`, `rust`, `js`, `ts`, `bash`, `json`, `yaml`, and [many more](https://highlightjs.org/static/demo/).

### 4. Publish

```bash
git add src/posts/my-new-post.md
git commit -m "Add post: My New Post"
git push origin main
```

GitHub Actions will automatically build and deploy to GitHub Pages within ~2 minutes.

---

## Updating Portfolio Content

All portfolio content (projects, case studies, testimonials, work history, skills) lives in `src/pages/Home.tsx`. Open that file and edit the data arrays at the top:

- **`projects`** — the 3 featured project cards
- **`caseStudies`** — the horizontal case study cards
- **`testimonials`** — the carousel quotes
- **`skills`** — the skills tag cloud
- Work history is in the JSX inline (search for `"2022 – Present"`)

To update social links and contact email, edit `src/components/Footer.tsx` and `src/components/Navbar.tsx`.

---

## Deployment

Deployment is fully automated via GitHub Actions (`.github/workflows/deploy.yml`).

**One-time setup (already done):**

1. Go to your repo **Settings → Pages**
2. Set **Source** to `GitHub Actions`
3. Your `CNAME` file (`public/CNAME`) already contains `lei-xu.com`
4. Make sure your DNS has a `CNAME` record: `www` → `xuleidawang.github.io` and an `A` record for the apex domain pointing to GitHub's IPs:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

After that, every push to `main` auto-deploys.

---

## Project Structure

```
lei-xu-static/
├── public/
│   ├── CNAME              ← Custom domain (lei-xu.com)
│   ├── 404.html           ← GitHub Pages SPA routing fallback
│   └── favicon.svg
├── src/
│   ├── posts/             ← ✏️  Your blog posts go here (.md files)
│   │   ├── real-time-global-illumination.md
│   │   └── shader-optimization-tips.md
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
│   └── deploy.yml         ← Auto-deploy on push to main
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## License

MIT — feel free to fork and adapt for your own portfolio.
