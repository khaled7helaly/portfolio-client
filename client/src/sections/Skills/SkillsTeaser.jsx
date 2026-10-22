import SectionHeader from "../../components/SectionHeader/SectionHeader";
import "./SkillsTeaser.css";

const ART = "/images/skills/skills-poster.webp";

const PILLARS = [
  {
    title: "Strategy",
    text: "UI/UX first: I plan the flow, the structure and the data before writing code.",
  },
  {
    title: "Execution",
    text: "Full stack with MERN: MongoDB, Express, React and Node.js, from API to interface.",
  },
  {
    title: "Refinement",
    text: "Fast interfaces, clean tested code, and a last pass over every detail.",
  },
];

const SKILL_NAMES = [
  "UI/UX Design",
  "React",
  "JavaScript",
  "Node.js",
  "Express",
  "MongoDB",
  "REST APIs",
  "Responsive Design",
];

export default function SkillsTeaser() {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-section__container">
        {/* Section Header */}
        <div className="skills-section__heading">
          <span className="skills-section__script">In short,</span>
          <SectionHeader
            title="My skills"
            actionLabel="View all skills"
            actionTo="/skills"
          />
        </div>

        {/* Skills Content */}
        <div className="skills-section__content">
          <div className="skills-section__copy">
            <p className="skills-section__intro">
              I combine thoughtful UI/UX planning with practical MERN
              development to create responsive, user-focused web experiences.
            </p>

            <ol className="skills-section__list">
              {PILLARS.map((pillar, index) => (
                <li className="skills-section__item" key={pillar.title}>
                  <span className="skills-section__number">
                    0{index + 1}
                  </span>
                  <div className="skills-section__item-content">
                    <h3>
                      {pillar.title}
                      <span aria-hidden="true">.</span>
                    </h3>
                    <p>{pillar.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Side Image */}
          <div className="skills-section__visual">
            <img
              src={ART}
              alt="Skills and web development"
              className="skills-section__image"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Skills Marquee */}
      <div className="teaser__marquee" aria-hidden="true">
        <div className="teaser__track">
          {[0, 1].map((item) => (
            <span key={item}>
              {SKILL_NAMES.map((name, index) => (
                <i key={`${item}-${index}`}>{name}</i>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}