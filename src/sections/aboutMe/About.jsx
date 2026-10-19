import { useEffect, useRef } from "react";
import "./About.css";

const PHOTO = "/Images/Profile/khaled.webp";

/* Personal Information */
const INFO = [
  "Computer Science · Suez University",
  "MERN Stack Developer",
  "UI/UX-Oriented Development",
];

/* About Me */
const BIO =
  "I'm Khaled Helaly, a Computer Science graduate from Suez University and a MERN Stack Developer. I enjoy building practical web applications with React, Node.js, and MongoDB, while paying attention to thoughtful interfaces and the overall user experience.";
/* How I Approach Development */
const APPROACH = [
  {
    number: "01",
    title: "Understand the problem",
    text: "I start by understanding the goal, the user's needs, and the problem the product is meant to solve.",
  },
  {
    number: "02",
    title: "Design for clarity",
    text: "I care about visual hierarchy, responsive layouts, and interactions that make digital experiences easier to use.",
  },
  {
    number: "03",
    title: "Build with purpose",
    text: "I turn ideas into functional web applications using reusable components, organized code, and practical solutions.",
  },
];

/* What Motivates Me */
const DRIVES =
  "I'm motivated by learning through real projects, solving problems, and seeing an idea turn into something people can actually use.";

/* Personal Values */
const VALUES = [
  "User Experience",
  "Clean Code",
  "Problem Solving",
  "Continuous Learning",
];

/* Areas of Interest */
const INTERESTS = [
  "Frontend Development",
  "Full-Stack Applications",
  "UI/UX-Oriented Interfaces",
];

/* Reusable Section Heading */
function Head({ children }) {
  return (
    <h3 className="sheet__head">
      <i aria-hidden="true" />
      {children}
    </h3>
  );
}

/* Reusable Hand-Drawn Heading */
function SideTitle({ children }) {
  return (
    <h3 className="about__side-title">
      {children}

      <svg
        viewBox="0 0 120 44"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M6 24C8 8 40 3 68 4c32 1 49 8 46 20-3 13-34 17-64 16C22 39 4 34 8 20" />
      </svg>
    </h3>
  );
}

export default function About() {
  const ref = useRef(null);

  /* Reveal the paper when the section enters the viewport */
  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
      reduceMotion ||
      !("IntersectionObserver" in window)
    ) {
      element.classList.add("is-in");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="about"
      id="about"
      ref={ref}
      aria-labelledby="about-name"
    >
      {/* Oversized background typography */}
      <span className="about__word" aria-hidden="true">
        About me
      </span>

      <div className="stack">
        {/* Decorative paper layers */}
        <div className="sheet__back" aria-hidden="true" />

        <article className="sheet">
          {/* =====================================
              PERSONAL INTRODUCTION
          ====================================== */}
          <header className="sheet__top">
            <div className="sheet__id">
              <ul className="info">
                {INFO.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2 className="name" id="about-name">
                Khaled
                <span className="script">About me</span>
              </h2>

              <p className="bio">{BIO}</p>
            </div>

            {/* Personal Photo */}
            <figure className="polaroid">
              <img
                src={PHOTO}
                alt="Khaled Helaly"
                loading="lazy"
                draggable="false"
              />

              <svg
                className="clip"
                viewBox="0 0 36 100"
                aria-hidden="true"
              >
                <path d="M12 70V28a10 10 0 0 1 20 0v52a14 14 0 0 1-28 0V34" />
              </svg>
            </figure>
          </header>

          {/* =====================================
              PERSONAL APPROACH & INTERESTS
          ====================================== */}
          <div className="sheet__body">
            {/* Main Column */}
            <div className="sheet__main">
              <Head>My Approach</Head>

              <div className="approach-list">
                {APPROACH.map((item) => (
                  <article
                    className="approach-item"
                    key={item.number}
                  >
                    <span
                      className="approach-item__number"
                      aria-hidden="true"
                    >
                      {item.number}
                    </span>

                    <div className="approach-item__content">
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>

              <Head>What Drives Me</Head>

              <p className="about__drives">{DRIVES}</p>
            </div>

            {/* Sidebar */}
            <aside
              className="sheet__aside"
              aria-label="Personal values and interests"
            >
              <SideTitle>What I Value</SideTitle>

              <div className="tags">
                {VALUES.map((value) => (
                  <span key={value}>{value}</span>
                ))}
              </div>

              <SideTitle>My Interests</SideTitle>

              <div className="tags">
                {INTERESTS.map((interest) => (
                  <span key={interest}>{interest}</span>
                ))}
              </div>

              <div className="about__note">
                <span aria-hidden="true">✳</span>

                <p>
                  Thoughtful design.
                  <br />
                  Purposeful code.
                </p>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </section>
  );
}