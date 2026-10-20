import { Link } from "react-router-dom";
import "./ProjectCard.css";

/* السهم بيتكرر مرتين: واحد بيخرج وواحد بيدخل وقت الـ hover */
function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

export default function ProjectCard({ project }) {
  const {
    number,
    slug,
    title,
    category,
    image,
    imageAlt,
  } = project;

  return (
    <article className="project-card">
      {/* Project Preview */}
      <div className="project-card__preview">
        {image ? (
          <img
            className="project-card__image"
            src={image}
            alt={imageAlt || `${title} project preview`}
            loading="lazy"
          />
        ) : (
          <div className="project-card__placeholder">
            <span className="project-card__placeholder-number" aria-hidden="true">
              {number}
            </span>

            <span className="project-card__placeholder-title">
              {title}
            </span>

            <span className="project-card__placeholder-label">
              PROJECT PREVIEW
            </span>
          </div>
        )}
      </div>

      {/* Project Information */}
      <div className="project-card__info">
        <span className="project-card__number">
          {number}
        </span>

        <div className="project-card__details">
          <h3 className="project-card__title">
            {title}
          </h3>

          <p className="project-card__category">
            {category}
          </p>
        </div>

        {/* الـ Link ده بيغطي الكارت كله (stretched link) من الـ CSS */}
        <Link
          className="project-card__arrow"
          to={`/projects/${slug}`}
          aria-label={`View details for ${title}`}
        >
          <span className="project-card__arrow-icon" aria-hidden="true">
            <ArrowIcon />
            <ArrowIcon />
          </span>
        </Link>
      </div>
    </article>
  );
}