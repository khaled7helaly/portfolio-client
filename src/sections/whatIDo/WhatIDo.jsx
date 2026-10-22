import { useEffect, useRef, useState } from "react";

import { services } from "../../data/mock/services.mock.js";

import "./WhatDo.css";

export default function WhatDo() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
      reduceMotion ||
      !("IntersectionObserver" in window)
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`services ${
        isVisible ? "is-visible" : ""
      }`}
      aria-labelledby="services-title"
    >
      <div className="services__container">

        {/* Section Header */}
        <header className="services__header services__reveal">
          <div className="services__heading">
            <span className="services__eyebrow">
              WHAT I DO
            </span>

            <span
              className="services__line"
              aria-hidden="true"
            />
          </div>

          <span className="services__caption">
            PRACTICAL SOLUTIONS. THOUGHTFULLY BUILT.
          </span>
        </header>

        {/* Introduction */}
        <div className="services__intro services__reveal">
          <h2 id="services-title">
            Ideas into
            <br />
            <span>digital experiences.</span>
          </h2>

          <p>
            From responsive interfaces to full-stack applications,
            I focus on building useful web experiences with
            thoughtful design and practical functionality.
          </p>
        </div>

        {/* Service Cards */}
        <div className="services__grid">
          {services.map((service, index) => (
            <article
              className="service-card services__reveal"
              key={service.id}
              style={{
                "--delay": `${120 + index * 140}ms`,
              }}
            >
              <div className="service-card__top">
                <span className="service-card__number">
                  {service.number}
                </span>

                <span
                  className="service-card__icon"
                  aria-hidden="true"
                >
                  {service.icon}
                </span>
              </div>

              <h3>{service.title}</h3>

              <p className="service-card__description">
                {service.description}
              </p>

              <div className="service-card__divider" />

              <span className="service-card__label">
                WHAT IT INCLUDES
              </span>

              <div className="service-card__tags">
                {service.deliverables.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <a
                className="service-card__link"
                href="#contact"
                aria-label={`Discuss ${service.title}`}
              >
                DISCUSS A PROJECT
                <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>

        {/* Bottom Statement */}
        <footer className="services__footer services__reveal">
          <p>
            Have a project in mind?
            <span> Let's make it happen.</span>
          </p>

          <a href="#contact" className="services__contact">
            LET'S TALK
            <span aria-hidden="true">↗</span>
          </a>
        </footer>

      </div>
    </section>
  );
}