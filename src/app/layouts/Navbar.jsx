import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Navbar.css";

/* IDs must match the section IDs on the homepage */
const LINKS = [
{ id: "projects", label: "Work", to: "/#projects" },
{ id: "about", label: "About", to: "/#about" },
{ id: "skills", label: "Skills", to: "/skills" },
{ id: "contact", label: "Contact", to: "/#contact" },
];


export default function Navbar() {
  const barRef = useRef(null);

  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  const location = useLocation();

  /* Scroll progress: fill the stitching line */
  useEffect(() => {
    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = max > 0 ? window.scrollY / max : 0;

      barRef.current?.style.setProperty("--p", progress);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* Navigate to homepage sections from any route */
  useEffect(() => {
    if (location.pathname !== "/") return;

    const frameId = window.requestAnimationFrame(() => {
      if (location.hash) {
        const sectionId = decodeURIComponent(
          location.hash.slice(1)
        );

        document
          .getElementById(sectionId)
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [location.pathname, location.hash]);

  /* Detect the active homepage section */
  useEffect(() => {
    setActive("");

    const sections = LINKS.map((link) =>
      document.getElementById(link.id)
    ).filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter(
          (entry) => entry.isIntersecting
        );

        if (visibleSections.length > 0) {
          setActive(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-45% 0px -50% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [location.pathname]);

  /* Close mobile menu when navigating */
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header
      className="nav"
      ref={barRef}
      data-open={open}
    >
      {/* Logo */}
      <Link
        className="nav__logo"
        to="/"
        aria-label="Khaled, home"
        onClick={closeMenu}
      >
        K
      </Link>

      {/* Navigation links */}
      <nav
        className="nav__links"
        id="nav-links"
        aria-label="Main"
      >
        {LINKS.map((link) => (
          <Link
            key={link.id}
            to={link.to}
            className="nav__link"
            aria-current={
              location.pathname === "/" && active === link.id
                ? "location"
                : undefined
            }
            onClick={closeMenu}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Contact button */}
      <Link
        className="nav__cta"
        to="/#contact"
        onClick={closeMenu}
      >
        Hire me
      </Link>

      {/* Mobile menu */}
      <button
        className="nav__burger"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen((previous) => !previous)}
      >
        <i />
        <i />
      </button>

      {/* Scroll progress stitching */}
      <span
        className="nav__stitch"
        aria-hidden="true"
      />
    </header>
  );
}