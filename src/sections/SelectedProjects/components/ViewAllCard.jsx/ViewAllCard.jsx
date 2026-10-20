import { Link } from "react-router-dom";

import "./ViewAllCard.css";

export default function ViewAllCard() {
  return (
    <Link className="view-all-card" to="/projects" aria-label="View all projects">
      <div className="view-all-card__content">
        <h3 className="view-all-card__title">
          Explore all projects
          <span aria-hidden="true">.</span>
        </h3>

        <p className="view-all-card__description">
          Discover more projects, technologies, and development work.
        </p>
      </div>

      <div className="view-all-card__action">
        <span>View all projects</span>
        <span className="view-all-card__arrow" aria-hidden="true">
          ↗
        </span>
      </div>
    </Link>
  );
}