import { useEffect, useRef, useState } from "react";
import "./Navbar.css";

/* id لازم يطابق id السكشن في الصفحة */
const LINKS = [
  { id: "projects", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const barRef = useRef(null);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  // خط الخياطة بيتملى أحمر مع السكرول
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      barRef.current?.style.setProperty("--p", max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // تمييز السكشن الحالي
  useEffect(() => {
    const els = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header className="nav" ref={barRef} data-open={open}>
      <a className="nav__logo" href="#home" aria-label="Khaled, home">K</a>

      <nav className="nav__links" id="nav-links" aria-label="Main">
        {LINKS.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className="nav__link"
            aria-current={active === l.id ? "true" : undefined}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        ))}
      </nav>

      <a className="nav__cta" href="#contact">Hire me</a>

      <button
        className="nav__burger"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen(!open)}
      >
        <i /><i />
      </button>

      <span className="nav__stitch" aria-hidden="true" />
    </header>
  );
}