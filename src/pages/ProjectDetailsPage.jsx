import { Link, useParams } from "react-router-dom";

import { projects } from "../data/mock/projects.mock.js";

import "./ProjectDetailsPage.css";

export default function ProjectDetailsPage() {
  const { slug } = useParams();

  const project = projects.find(
    (item) => item.slug === slug && item.published
  );

  // Handle invalid or unpublished projects
  if (!project) {
    return (
      <main className="project-details project-details--not-found">
        <div className="project-details__container">
          <span className="project-details__eyebrow">
            PROJECT NOT FOUND
          </span>

          <h1>Nothing here yet.</h1>

          <p>
            This project may not exist or may not be available.
          </p>

          <Link
            to="/projects"
            className="project-details__back"
          >
            ← Back to all projects
          </Link>
        </div>
      </main>
    );
  }

  const {
    number,
    title,
    category,
    description,
    image,
    imageAlt,
    technologies = [],
    status,
    liveUrl,
    githubUrl,
    documentationUrl,
    gallery = [],
    details = {},
  } = project;

  const {
    overview,
    problem,
    solution,
    role,
    goals = [],
    features = [],
    developmentProcess = [],
    challenges = [],
    outcomes,
  } = details;

  return (
    <main className="project-details">
      <div className="project-details__container">

        {/* Navigation */}
        <nav
          className="project-details__navigation"
          aria-label="Project navigation"
        >
          <Link to="/" className="project-details__back">
            ← Home
          </Link>

          <Link
            to="/projects"
            className="project-details__back"
          >
            All Projects ↗
          </Link>
        </nav>

        {/* Project Hero */}
        <header className="project-details__hero">
          <div className="project-details__intro">
            <span className="project-details__eyebrow">
              PROJECT {number} / {category}
            </span>

            <h1 className="project-details__title">
              {title}
              <span>.</span>
            </h1>

            <p className="project-details__description">
              {description || project.summary}
            </p>

            {status && (
              <span className="project-details__status">
                {status.replaceAll("-", " ").toUpperCase()}
              </span>
            )}

            {/* Project Links */}
            <div className="project-details__actions">
              {liveUrl && (
                <a
                  className="project-details__button project-details__button--primary"
                  href={liveUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Demo ↗
                </a>
              )}

              {githubUrl && (
                <a
                  className="project-details__button"
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Source Code ↗
                </a>
              )}

              {documentationUrl && (
                <a
                  className="project-details__button"
                  href={documentationUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Documentation ↗
                </a>
              )}
            </div>
          </div>

          {/* Project Preview */}
          <div className="project-details__preview">
            {image ? (
              <img
                src={image}
                alt={imageAlt || `${title} project preview`}
              />
            ) : (
              <div className="project-details__placeholder">
                <span>{number}</span>
                <strong>{title}</strong>
                <small>PROJECT PREVIEW</small>
              </div>
            )}
          </div>
        </header>

        {/* Technologies */}
        {technologies.length > 0 && (
          <section className="project-details__section">
            <span className="project-details__eyebrow">
              TECHNOLOGIES
            </span>

            <div className="project-details__technologies">
              {technologies.map((technology) => (
                <span key={technology}>
                  {technology}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Overview */}
        {(overview || description || project.summary) && (
          <section className="project-details__section">
            <span className="project-details__eyebrow">
              01 / OVERVIEW
            </span>

            <h2>About the project</h2>

            <p>
              {overview || description || project.summary}
            </p>
          </section>
        )}

        {/* Problem and Solution */}
        {(problem || solution) && (
          <section className="project-details__section project-details__two-columns">
            {problem && (
              <div>
                <span className="project-details__eyebrow">
                  THE CHALLENGE
                </span>

                <h2>The problem</h2>

                <p>{problem}</p>
              </div>
            )}

            {solution && (
              <div>
                <span className="project-details__eyebrow">
                  THE APPROACH
                </span>

                <h2>The solution</h2>

                <p>{solution}</p>
              </div>
            )}
          </section>
        )}

        {/* My Role */}
        {role && (
          <section className="project-details__section">
            <span className="project-details__eyebrow">
              MY CONTRIBUTION
            </span>

            <h2>My role</h2>

            <p>{role}</p>
          </section>
        )}

        {/* Goals */}
        {goals.length > 0 && (
          <section className="project-details__section">
            <span className="project-details__eyebrow">
              PROJECT GOALS
            </span>

            <h2>What we aimed to achieve</h2>

            <ul className="project-details__list">
              {goals.map((goal, index) => (
                <li key={`${index}-${goal}`}>
                  <span>↗</span>
                  {goal}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Features */}
        {features.length > 0 && (
          <section className="project-details__section">
            <span className="project-details__eyebrow">
              KEY FEATURES
            </span>

            <h2>What it includes</h2>

            <ul className="project-details__list">
              {features.map((feature, index) => (
                <li key={`${index}-${feature}`}>
                  <span>↗</span>
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Development Process */}
        {developmentProcess.length > 0 && (
          <section className="project-details__section">
            <span className="project-details__eyebrow">
              DEVELOPMENT PROCESS
            </span>

            <h2>How it was approached</h2>

            <ol className="project-details__process">
              {developmentProcess.map((step, index) => (
                <li key={`${index}-${step}`}>
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Challenges */}
        {challenges.length > 0 && (
          <section className="project-details__section">
            <span className="project-details__eyebrow">
              CHALLENGES
            </span>

            <h2>What required careful consideration</h2>

            <ul className="project-details__list">
              {challenges.map((challenge, index) => (
                <li key={`${index}-${challenge}`}>
                  <span>↗</span>
                  {challenge}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Outcomes */}
        {outcomes && (
          <section className="project-details__section">
            <span className="project-details__eyebrow">
              OUTCOME
            </span>

            <h2>Current results</h2>

            <p>{outcomes}</p>
          </section>
        )}

        {/* Gallery */}
        {gallery.length > 0 && (
          <section className="project-details__section">
            <span className="project-details__eyebrow">
              PROJECT GALLERY
            </span>

            <h2>Inside the project</h2>

            <div className="project-details__gallery">
              {gallery.map((galleryImage, index) => {
                const src =
                  typeof galleryImage === "string"
                    ? galleryImage
                    : galleryImage.url;

                const alt =
                  typeof galleryImage === "string"
                    ? `${title} screenshot ${index + 1}`
                    : galleryImage.alt ||
                      `${title} screenshot ${index + 1}`;

                if (!src) return null;

                return (
                  <figure key={`${src}-${index}`}>
                    <img src={src} alt={alt} loading="lazy" />
                  </figure>
                );
              })}
            </div>
          </section>
        )}

        {/* Bottom Navigation */}
        <footer className="project-details__footer">
          <Link to="/projects">
            ← Explore all projects
          </Link>
        </footer>

      </div>
    </main>
  );
}