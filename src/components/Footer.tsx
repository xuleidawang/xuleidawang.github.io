import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/xuleidawang" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/lei-xu" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com/xuleidawang" },
  { icon: Mail, label: "Email", href: "mailto:lei@lei-xu.com" },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t"
      style={{ borderColor: "oklch(0.20 0.015 265)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="font-display font-bold text-xl mb-3" style={{ color: "oklch(0.96 0.005 265)" }}>
              Lei Xu
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "oklch(0.60 0.015 265)" }}>
              Graphics Software & Research Engineer building real-time rendering systems and computational graphics research.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "oklch(0.60 0.015 265)" }}>
              Navigation
            </p>
            <ul className="space-y-2">
              {[
                { label: "Work", href: "/#projects" },
                { label: "Writing", href: "/#writing" },
                { label: "About", href: "/#about" },
                { label: "Blog", href: "/blog" },
              ].map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("/") && !link.href.startsWith("/#") ? (
                    <Link
                      to={link.href}
                      className="text-sm transition-colors"
                      style={{ color: "oklch(0.60 0.015 265)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.96 0.005 265)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.60 0.015 265)")}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm transition-colors"
                      style={{ color: "oklch(0.60 0.015 265)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.96 0.005 265)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.60 0.015 265)")}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "oklch(0.60 0.015 265)" }}>
              Connect
            </p>
            <div className="flex flex-col gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm transition-colors group"
                  style={{ color: "oklch(0.60 0.015 265)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.62 0.22 295)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.60 0.015 265)")}
                >
                  <Icon size={15} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "oklch(0.20 0.015 265)" }}
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
