---
title: "Test Blog Post — Media Examples"
date: "2026-03-16"
excerpt: "A reference post showing how to embed images, GIFs, and videos in your blog posts."
tags: Guide, Media
---

# Test Blog Post — Media Examples

This post is a reference for embedding media in your writing. Delete or replace it once you've added your first real post.

---

## Embedding an Image

Use standard Markdown image syntax. You can link to any public image URL, or place an image file in `public/images/` and reference it with an absolute path.

**From a public URL:**

```md
![Alt text describing the image](https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80)
```

**From your own repo (place the file in `public/images/`):**

```md
![My screenshot](/images/my-screenshot.png)
```

Here is a live example using a public URL:

![A circuit board close-up](https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80)

---

## Embedding a GIF

GIFs work exactly the same as images — just point to a `.gif` URL or file:

```md
![Shader animation demo](https://media.giphy.com/media/3o7btNa0RUYa5E7iiQ/giphy.gif)
```

---

## Embedding a YouTube Video

Markdown doesn't natively support video players, but you can embed a YouTube video using a plain HTML `<iframe>` tag — it renders correctly in the blog post page:

```html
<iframe
  width="100%"
  height="420"
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  title="YouTube video"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  style="border-radius: 8px;"
></iframe>
```

---

## Embedding a Self-Hosted Video

If you have a video file, upload it somewhere publicly accessible (e.g. GitHub Releases, Google Drive direct link, or any CDN) and use an HTML `<video>` tag:

```html
<video
  width="100%"
  controls
  style="border-radius: 8px;"
>
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

Live example:

<video width="100%" controls style="border-radius: 8px;">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## Quick Reference

| Media type | Syntax |
|---|---|
| Image (URL) | `![alt](https://...)` |
| Image (local) | `![alt](/images/file.png)` — place file in `public/images/` |
| GIF | Same as image, `.gif` extension |
| YouTube | `<iframe src="https://www.youtube.com/embed/VIDEO_ID" ...>` |
| Self-hosted video | `<video controls><source src="..." type="video/mp4"></video>` |
