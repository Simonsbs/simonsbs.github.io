import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, Download, Menu, X } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { profile } from "../data/portfolio";

const navigation = [
  { to: "/", label: "Overview" },
  { to: "/services", label: "Expertise" },
  { to: "/projects", label: "Projects" },
  { to: "/blog/", label: "Writing" },
  { to: "/about", label: "About" },
];

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    if (
      ![
        "/",
        "/about",
        "/services",
        "/resume",
        "/contact",
        "/blogpreview",
        "/work",
      ].includes(pathname.replace(/\/+$/, "") || "/")
    ) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const onClick = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".site-header"))
        setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [menuOpen]);

  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner shell">
          <Link to="/" className="brand" aria-label="Simon Stirling home">
            <img src="/favicon.svg" alt="" width="39" height="39" />
            <span>
              Simon Stirling<span className="brand-dot">.</span>
            </span>
          </Link>
          <nav
            id="main-navigation"
            className={`main-navigation${menuOpen ? " is-open" : ""}`}
            aria-label="Main navigation"
          >
            {navigation.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  isActive ||
                  (to === "/projects" && pathname.startsWith("/case-studies/"))
                    ? "active"
                    : undefined
                }
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
            <a className="mobile-cv" href={profile.cv} download>
              Download CV
              <Download size={16} />
            </a>
          </nav>
          <a className="header-cv" href={profile.cv} download>
            Download CV
            <Download size={16} />
          </a>
          <Link to="/contact" className="header-contact">
            Contact
            <ArrowUpRight size={17} />
          </Link>
          <button
            ref={menuButton}
            className="menu-toggle"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={(event) => {
              event.stopPropagation();
              setMenuOpen((open) => !open);
            }}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer shell">
        <div className="footer-top">
          <div>
            <Link to="/" className="brand">
              <img src="/favicon.svg" alt="" width="34" height="34" />
              <span>
                Simon Stirling<span className="brand-dot">.</span>
              </span>
            </Link>
            <p>
              Pre-sales. Enterprise solutions architecture. Post-sales &
              support.
            </p>
          </div>
          <div className="footer-social">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
            >
              <Github size={19} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in a new tab)"
            >
              <Linkedin size={19} />
            </a>
            <button
              aria-label="Back to top"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches
                    ? "instant"
                    : "smooth",
                })
              }
            >
              <ArrowUp size={19} />
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <div>
            <Link to="/certificates">Certificates</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>
          <span>Built with care, in Israel.</span>
        </div>
      </footer>
    </>
  );
}
