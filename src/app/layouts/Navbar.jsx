import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Navbar.css";

/* id = السكشن في الهوم اللي بيتلون اللينك وهو ظاهر، page = الصفحة اللي بيتلون وإنت جواها */
const LINKS = [
  { id: "projects", label: "Work", to: "/#projects" },
  { id: "about", label: "About", to: "/#about" },
  { id: "order", label: "Services", to: "/services", page: "/services" },
  { id: "skills", label: "Skills", to: "/skills", page: "/skills" },
  { id: "contact", label: "Contact", to: "/#contact" },
];

export default function Navbar() {
  const barRef = useRef(null);

  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  const location = useLocation();

  /* Scroll progress: fill the stitching line */
  useEffect(() => {
    let scroller = document.scrollingElement || document.documentElement;

    const update = () => {
      const max = scroller.scrollHeight - scroller.clientHeight;
      const progress = max > 0 ? Math.min(Math.max(scroller.scrollTop / max, 0), 1) : 0;

      barRef.current?.style.setProperty("--p", progress.toFixed(4));
    };

    // بيلقط السكرول من أي عنصر مش من window بس
    const onScroll = (event) => {
      const target = event.target;

      if (target instanceof Element && target !== document.documentElement) {
        // تجاهل العناصر الصغيرة زي الكاروسيل وبلوكات الكود
        if (target.scrollHeight - target.clientHeight < window.innerHeight * 0.5) return;
        scroller = target;
      } else {
        scroller = document.scrollingElement || document.documentElement;
      }

      update();
    };

    update();

    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", update);

    // ارتفاع الصفحة بيتغير بعد تغيير الراوت أو تحميل المحتوى
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(document.body);

    return () => {
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", update);
      resizeObserver.disconnect();
    };
  }, [location.pathname]);

  /* Navigate to homepage sections from any route */
  useEffect(() => {
    if (location.pathname !== "/") return;

    const frameId = window.requestAnimationFrame(() => {
      if (location.hash) {
        const sectionId = decodeURIComponent(location.hash.slice(1));

        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [location.pathname, location.hash]);

  /* Detect the active homepage section */
  useEffect(() => {
    setActive("");

    if (location.pathname !== "/") return;

    const sections = LINKS.map((link) => document.getElementById(link.id)).filter(Boolean);

    if (sections.length === 0) return;

    // الأقسام اللي واقفة دلوقتي في منتصف الشاشة
    const inView = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) inView.add(entry.target.id);
          else inView.delete(entry.target.id);
        });

        // لو مفيش قسم في النص (زي الهيرو) مفيش لينك يتلون
        const current = sections.filter((section) => inView.has(section.id)).pop();

        setActive(current ? current.id : "");
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [location.pathname]);

  /* Which link is current: a homepage section, or the Skills page */
  const getCurrent = (link) => {
    if (location.pathname === "/") {
      return active === link.id ? "location" : undefined;
    }

    if (link.page && location.pathname.startsWith(link.page)) {
      return "page";
    }

    return undefined;
  };

  /* Close mobile menu when navigating */
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className="nav" ref={barRef} data-open={open}>
      {/* Logo */}
      <Link className="nav__logo" to="/" aria-label="Khaled, home" onClick={closeMenu}>
        K
      </Link>

      {/* Navigation links */}
      <nav className="nav__links" id="nav-links" aria-label="Main">
        {LINKS.map((link) => (
          <Link
            key={link.id}
            to={link.to}
            className="nav__link"
            aria-current={getCurrent(link)}
            onClick={closeMenu}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Contact button */}
      <Link className="nav__cta" to="/services" onClick={closeMenu}>
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
      <span className="nav__stitch" aria-hidden="true" />
    </header>
  );
}