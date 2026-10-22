import { useRef } from "react";
import Navbar from "../../app/layouts/Navbar";
import LanyardBadge from "../../components/Ui/Lanyardbadge/Lanyardbadge";
// import { CommentsPreview } from "../../features/comments";
import "./Hero.css";

/* الصورة من فولدر public — اتأكد من حالة الحروف (Images / Profile) */
const PHOTO = `${import.meta.env.BASE_URL}images/profile/me.webp`;

/* الكلام المطبوع على الحبلين (الـ lanyard) — عدّله */
const STRAP_A = ["Full stack developer", "React & Node.js", "Interfaces that feel fast", "Clean, tested code"];
const STRAP_B = ["Open to freelance work", "Let's build your next product", "Say hello", "Portfolio below"];

/* الجملة الحمرا تحت الاسم — عدّلها (لو تقصد MySQL اكتبها هنا) */
const ROLE = "I’m a MERN Stack Developer & UI/UX enthusiast.";

/* الكلام اللي على الشارة */
const BADGE = { name: "Khaled Helaly", role: "MERN Stack Developer", tag: "Portfolio 2026" };

/* ستيكرز على الشارة + الملاحظة بخط اليد تحتها */
const STICKERS = ["MongoDB", "Express", "React", "Node.js"];
const HINT = "Pull me!";

/* سوشيال */
const SOCIALS = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "Email", href: "mailto:hello@example.com" },
];

/* أيقونات الزراير */
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const GridIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const DownloadIcon = () => (
  <svg {...iconProps}>
    <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
  </svg>
);

export default function Hero() {
  const heroRef = useRef(null);

  return (
    <section className="hero" id="home" ref={heroRef}>
      <Navbar />
      <div className="hero__bg" aria-hidden="true" />

      <div className="hero__main">
        <div className="hero__intro">
          <h1 className="hero__title">
            <span className="hero__hello">Hello, I am</span>{" "}
            <span className="hero__name" lang="ar">Khaled Helaly </span>
          </h1>
          <p className="hero__role">{ROLE}</p>
          <div className="hero__cta">
            <a className="btn btn--solid" href="#projects">
              <GridIcon />
              View projects
            </a>
            <a className="btn btn--ghost" href="/Khaled-CV.pdf" download>
              <DownloadIcon />
              Download CV
            </a>
          </div>
        </div>

        <div className="hero__stage">
          <LanyardBadge
            photo={PHOTO}
            alt="Khaled"
            {...BADGE}
            straps={[STRAP_A, STRAP_B]}
            stickers={STICKERS}
            hint={HINT}
            ceilingRef={heroRef}
          />
        </div>

        <aside className="hero__side">
          {/* <CommentsPreview /> */}
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
