import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "/#about", isRoute: false },
  { label: "Projects", href: "/#projects", isRoute: false },
  { label: "Blog", href: "/blog", isRoute: true },
  { label: "Contact", href: "/#contact", isRoute: false },
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
        scrolled ? "backdrop-blur-md border-b" : ""
      }`}
      style={scrolled ? {
        backgroundColor: "oklch(0.98 0.003 265 / 0.92)",
        borderColor: "oklch(0.88 0.008 265)",
      } : {}}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className="font-display font-bold text-lg tracking-tight transition-colors"
          style={{ color: "oklch(0.12 0.015 265)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.52 0.22 295)")}
          onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.12 0.015 265)")}
        >
          xuleidawang
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              {link.isRoute ? (
                <Link
                  to={link.href}
                  className="text-sm transition-colors"
                  style={{ color: "oklch(0.45 0.012 265)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.12 0.015 265)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.45 0.012 265)")}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm transition-colors"
                  style={{ color: "oklch(0.45 0.012 265)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.12 0.015 265)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.45 0.012 265)")}
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          style={{ color: "oklch(0.12 0.015 265)" }}
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
            backgroundColor: "oklch(0.97 0.004 265)",
            borderColor: "oklch(0.88 0.008 265)",
          }}
        >
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm py-1 transition-colors"
                style={{ color: "oklch(0.45 0.012 265)" }}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm py-1 transition-colors"
                style={{ color: "oklch(0.45 0.012 265)" }}
              >
                {link.label}
              </a>
            )
          )}
        </div>
      )}
    </header>
  );
}
