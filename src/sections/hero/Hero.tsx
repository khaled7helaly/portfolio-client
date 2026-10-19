import { useRef } from "react";
import Navbar from "../../app/layouts/Navbar";
import "./Hero.css";

/* الصورة من فولدر public — اتأكد من حالة الحروف (Images / Profile) */
const PHOTO = "/images/profile/khaled.webp";
const MAX_TILT = 14; // أقصى ميلان بالدرجات

/* كلام الشريطين — عدّله */
const RIBBON_A = ["Full stack developer", "React & Node.js", "Interfaces that feel fast", "Clean, tested code"];
const RIBBON_B = ["Open to freelance work", "Let's build your next product", "Say hello", "Portfolio below"];

/* أعمال مختارة + سوشيال — بيانات تجريبية */
const WORK = [
  { name: "Project one", meta: "Web app" },
  { name: "Project two", meta: "E-commerce" },
  { name: "Project three", meta: "Dashboard" },
];
const SOCIALS = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "Email", href: "mailto:hello@example.com" },
];

function Ribbon({ items, variant }) {
  const loop = Array.from({ length: 4 }, () => items).flat();
  const group = (hidden) => (
    <div className="ribbon__group" aria-hidden={hidden || undefined}>
      {loop.map((text, i) => (
        <span className="ribbon__item" key={i}>{text}</span>
      ))}
    </div>
  );
  return (
    <div className={`ribbon ribbon--${variant}`}>
      <div className="ribbon__track">{group(false)}{group(true)}</div>
    </div>
  );
}

export default function Hero() {
  const photoRef = useRef(null);

  const handleMove = (e) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = photoRef.current;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    el.style.setProperty("--ry", `${(x - 0.5) * 2 * MAX_TILT}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * 2 * MAX_TILT}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
  };

  const handleLeave = () => {
    ["--rx", "--ry", "--gx", "--gy"].forEach((p) => photoRef.current.style.removeProperty(p));
  };

  return (
    <section className="hero" id="home">
      <Navbar />
      <div className="hero__bg" aria-hidden="true" />

      <div className="hero__main">
        <div className="hero__intro">
          <h1>I'm Khaled. I build web products that feel fast.</h1>
          <p>Full stack developer working with React and Node.js, from the database to the last pixel.</p>
          <div className="hero__cta">
            <a className="btn btn--solid" href="#projects">View projects</a>
            <a className="btn" href="/Khaled-CV.pdf" download>Download CV</a>
          </div>
        </div>

        <div className="hero__stage">
          <div className="ribbons" aria-hidden="true">
            <Ribbon items={RIBBON_A} variant="a" />
            <Ribbon items={RIBBON_B} variant="b" />
          </div>

          <div className="hero__photo" ref={photoRef} onMouseMove={handleMove} onMouseLeave={handleLeave}>
            <div className="hero__tilt">
              <div className="hero__card">
                <img src={PHOTO} alt="Khaled" width="800" height="1000" draggable="false" fetchPriority="high" />
                <span className="hero__glare" />
              </div>
            </div>
          </div>
        </div>

        <aside className="hero__side">
          <h2>Selected work</h2>
          <ul className="work">
            {WORK.map((w) => (
              <li key={w.name}>
                <a className="work__row" href="#projects"><b>{w.name}</b><span>{w.meta}</span></a>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <footer className="hero__foot">
        <nav aria-label="Social links">
          {SOCIALS.map((s) => <a key={s.label} href={s.href}>{s.label}</a>)}
        </nav>
        <small>© 2026 Khaled</small>
      </footer>
    </section>
  );
}