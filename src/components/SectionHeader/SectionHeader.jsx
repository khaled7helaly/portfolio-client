import { Link } from "react-router-dom";
import "./SectionHeader.css";

function SectionHeader({
  title,
  actionLabel,
  actionTo,
  className = "",
}) {
  const hasAction = Boolean(actionLabel && actionTo);

  const headerClassName = [
    "section-header",
    hasAction
      ? "section-header--with-action"
      : "section-header--without-action",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClassName}>
      <h2 className="section-header__title">{title}</h2>

      <span
        className="section-header__line"
        aria-hidden="true"
      />

      {hasAction && (
        <Link
          className="section-header__action"
          to={actionTo}
        >
          {actionLabel}

          <span aria-hidden="true">→</span>
        </Link>
      )}
    </header>
  );
}

export default SectionHeader;