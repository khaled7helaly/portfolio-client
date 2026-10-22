import { Link, useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";

import { dayRange, minPrice } from "../../utils/pricing";
import useCurrency from "../../hooks/useCurrency";

import "./ServicePaper.css";

/* ورقة الخدمة — بتتستخدم في الهوم وفي صفحة الخدمات */
export default function ServicePaper({ service }) {
  const navigate = useNavigate();
  const { money, label } = useCurrency();
  const to = `/services/${service.slug}`;

  // الورقة بتكبر لحد ما تبقى صفحة البروبوزال (لو المتصفح بيدعم View Transitions)
  const handleClick = (event) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0;

    if (!document.startViewTransition || reduce || modified) return;

    event.preventDefault();
    event.currentTarget.style.viewTransitionName = "service-paper";

    document.startViewTransition(() => {
      flushSync(() => navigate(to));
      window.scrollTo(0, 0);
    });
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      className={`paper${service.featured ? " paper--featured" : ""}`}
    >
      {service.featured && <span className="paper__badge">Recommended</span>}

      <h3>{service.title}</h3>
      <p>{service.tagline}</p>

      <span className="paper__lines" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>

      <span className="paper__meta">
        <span>
          <small>From</small>
          <b>
            {money(minPrice(service))} {label}
          </b>
        </span>
        <span>
          <small>Delivery</small>
          <b>{dayRange(service)}</b>
        </span>
      </span>

      <span className="paper__open">
        Open proposal
        <span aria-hidden="true">↗</span>
      </span>
    </Link>
  );
}