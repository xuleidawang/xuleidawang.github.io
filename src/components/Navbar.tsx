import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      if (location.pathname === "/") {
        e.preventDefault();
        const id = href.slice(2);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
      setMobileOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md border-b"
          : ""
      }`}
      style={scrolled ? {
        backgroundColor: "oklch(0.07 0.012 265 / 0.92)",
        borderColor: "oklch(0.20 0.015 265)",
      } : {}}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className="font-display font-bold text-lg tracking-tight transition-colors"
          style={{ color: "oklch(0.96 0.005 265)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.62 0.22 295)")}
          onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.96 0.005 265)")}
        >
          xuleidawang
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm transition-colors"
                style={{ color: "oklch(0.60 0.015 265)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.96 0.005 265)")}
                onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.60 0.015 265)")}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/blog"
              className="text-sm transition-colors"
              style={{ color: "oklch(0.60 0.015 265)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.96 0.005 265)")}
              onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.60 0.015 265)")}
            >
              Blog
            </Link>
          </li>
        </ul>

        {/* CTA */}
        <a
          href="mailto:lei@lei-xu.com"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
          style={{
            backgroundColor: "oklch(0.62 0.22 295 / 0.08)",
            border: "1px solid oklch(0.62 0.22 295)",
            color: "oklch(0.62 0.22 295)",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "oklch(0.62 0.22 295)";
            (e.currentTarget as HTMLElement).style.color = "white";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "oklch(0.62 0.22 295 / 0.08)";
            (e.currentTarget as HTMLElement).style.color = "oklch(0.62 0.22 295)";
          }}
        >
          Get in touch
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          style={{ color: "oklch(0.96 0.005 265)" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-b px-6 py-4 flex flex-col gap-4"
          style={{
            backgroundColor: "oklch(0.10 0.015 265)",
            borderColor: "oklch(0.20 0.015 265)",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm py-1 transition-colors"
              style={{ color: "oklch(0.60 0.015 265)" }}
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/blog"
            onClick={() => setMobileOpen(false)}
            className="text-sm py-1 transition-colors"
            style={{ color: "oklch(0.60 0.015 265)" }}
          >
            Blog
          </Link>
          <a
            href="mailto:lei@lei-xu.com"
            className="text-sm font-medium mt-2"
            style={{ color: "oklch(0.62 0.22 295)" }}
          >
            Get in touch →
          </a>
        </div>
      )}
    </header>
  );
}
