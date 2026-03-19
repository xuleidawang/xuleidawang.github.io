import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/xuleidawang", isLink: true },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/lei-xu-546048a5/", isLink: true },
  { icon: Twitter, label: "X / Twitter", href: "https://x.com/xulei_daniel", isLink: true },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t"
      style={{ borderColor: "oklch(0.88 0.008 265)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="font-display font-bold text-xl mb-3" style={{ color: "oklch(0.12 0.015 265)" }}>
              Lei Xu
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "oklch(0.45 0.012 265)" }}>
              Graphics Software & Research Engineer building real-time rendering systems and computational graphics research.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "oklch(0.45 0.012 265)" }}>
              Navigation
            </p>
            <ul className="space-y-2">
              {[
                { label: "About", href: "/#about" },
                { label: "Projects", href: "/#projects" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/#contact" },
              ].map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("/") && !link.href.startsWith("/#") ? (
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
          </div>

          {/* Socials + Email */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "oklch(0.45 0.012 265)" }}>
              Connect
            </p>
            <div className="flex flex-col gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm transition-colors"
                  style={{ color: "oklch(0.45 0.012 265)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.52 0.22 295)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.45 0.012 265)")}
                >
                  <Icon size={15} />
                  {label}
                </a>
              ))}
              {/* Email — plain text, not a link */}
              <div
                className="flex items-center gap-2.5 text-sm"
                style={{ color: "oklch(0.45 0.012 265)" }}
              >
                <Mail size={15} />
                daniel_[lastname][firstname]@hotmail.com
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "oklch(0.88 0.008 265)" }}
        >
          <p className="text-xs" style={{ color: "oklch(0.45 0.010 265)" }}>
            © {new Date().getFullYear()} Lei Xu. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "oklch(0.45 0.010 265)" }}>
            lei-xu.com
          </p>
        </div>
      </div>
    </footer>
  );
}
