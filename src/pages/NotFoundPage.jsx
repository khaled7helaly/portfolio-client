import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <main className="not-found-page">
      <div className="not-found-page__content">
        <span className="not-found-page__code">404</span>

        <span className="not-found-page__eyebrow">
          PAGE NOT FOUND
        </span>

        <h1>
          Lost your way<span>?</span>
        </h1>

        <p>
          The page you're looking for doesn't exist
          or may have been moved.
        </p>

        <Link to="/" className="not-found-page__button">
          <span aria-hidden="true">←</span>
          Back to Home
        </Link>
      </div>
    </main>
  );
}