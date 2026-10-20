import data from "../../data/Skills.json";
import "./SkillsTeaser.css";

/* الصفحة اللي الزرار بيوديك عليها — غيّرها لو الراوت عندك مختلف */
const SKILLS_HREF = "/skills";

const { categories } = data;
const total = categories.reduce((n, c) => n + c.skills.length, 0);
/* الشريط المتحرك: كل أسماء السكيلز من الـ JSON */
const NAMES = categories.flatMap((c) => c.skills.map((s) => s.name));

export default function SkillsTeaser() {
  return (
    <section className="teaser" id="skills-teaser" aria-labelledby="teaser-title">
      <div className="teaser__main">
        <div className="teaser__intro">
          <h2 id="teaser-title">
            {total} skills across {categories.length} areas, one stack.
          </h2>
          <p>From the interface to the database. See how each part works, live.</p>
          <a className="teaser__btn" href={SKILLS_HREF}>
            Explore all skills
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        <ul className="teaser__list">
          {categories.map((c) => (
            <li key={c.id}>
              <a href={`${SKILLS_HREF}#${c.id}`}>
                <b>{c.title}</b>
                <span>{c.skills.length} skills</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* مكرر مرتين عشان اللوب يبقى سلس */}
      <div className="teaser__marquee" aria-hidden="true">
        <div className="teaser__track">
          {[0, 1].map((k) => (
            <span key={k}>{NAMES.map((n) => <i key={n}>{n}</i>)}</span>
          ))}
        </div>
      </div>
    </section>
  );
}