import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";

function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6"
      style={{ background: "oklch(0.07 0.012 265)", color: "oklch(0.96 0.005 265)" }}
    >
      <h1 className="font-display text-5xl font-bold">404</h1>
      <p style={{ color: "oklch(0.60 0.015 265)" }}>Page not found.</p>
      <a
        href="/"
        className="text-sm"
        style={{ color: "oklch(0.62 0.22 295)" }}
      >
        ← Back home
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
