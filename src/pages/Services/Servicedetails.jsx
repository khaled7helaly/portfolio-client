import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import data from "../../data/orderServices.json";
import { dayRange, minPrice } from "../../utils/pricing";
import useCurrency from "../../hooks/useCurrency";
import CurrencyToggle from "../../components/services/CurrencyToggle";
import DemoSlot from "../../components/services/DemoSlot";
import OrderSlip from "../../components/services/OrderSlip";

import "./ServiceDetails.css";

const range = (values) => {
  const min = Math.min(...values);
  const max = Math.max(...values);
  return min === max ? `${min}` : `${min}–${max}`;
};

function Head({ children }) {
  return (
    <h2 className="proposal__head">
      <i aria-hidden="true" />
      {children}
    </h2>
  );
}

export default function ServiceDetails() {
  const { slug } = useParams();
  const { services, process: steps, terms, faq } = data;
  const { money: number, label } = useCurrency();
  const service = services.find((item) => item.slug === slug);

  // الباقة المختارة والإضافات (بتتشارك بين الباقات وقسيمة الطلب)
  const defaultPkg = service?.packages.find((pkg) => pkg.popular) ?? service?.packages[0];
  const [pkgId, setPkgId] = useState(defaultPkg?.id);
  const [addonIds, setAddonIds] = useState([]);

  // لما تفتح خدمة تانية الاختيار يرجع للافتراضي
  useEffect(() => {
    setPkgId(defaultPkg?.id);
    setAddonIds([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // على الموبايل بنوصّل المستخدم للقسيمة بعد اختيار الباقة
  const choosePackage = (id) => {
    setPkgId(id);

    if (window.matchMedia("(max-width: 1000px)").matches) {
      document.getElementById("order-slip")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    document.title = service ? `${service.title} | Khaled` : "Service not found | Khaled";
    if (service) {
      document.querySelector('meta[name="description"]')?.setAttribute("content", service.tagline);
    }
    window.scrollTo({ top: 0 });
  }, [service]);

  if (!service) {
    return (
      <main className="details">
        <div className="details__container details__missing">
          <h1>Service not found</h1>
          <p>This service does not exist or was moved.</p>
          <Link className="details__back" to="/services">
            <span aria-hidden="true">←</span> All services
          </Link>
        </div>
      </main>
    );
  }

  // أسماء الباقات اللي الإضافة داخلة فيها أصلًا
  const includedIn = (addon) =>
    service.packages
      .filter((pkg) => addon.includedIn?.includes(pkg.id))
      .map((pkg) => pkg.name)
      .join(", ");

  return (
    <main className="details">
      <div className="details__container">
        <div className="details__bar">
          <Link className="details__back" to="/services">
            <span aria-hidden="true">←</span> All services
          </Link>
          <CurrencyToggle />
        </div>

        <div className="details__layout">
        <article className="proposal">
          {/* Top */}
          <header className="proposal__top">
            <h1>{service.title}</h1>
            <p className="proposal__tagline">{service.tagline}</p>
            <p className="proposal__audience">{service.audience}</p>

            <dl className="pr-facts">
              <div>
                <dt>From</dt>
                <dd>
                  {number(minPrice(service))} {label}
                </dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd>{dayRange(service)}</dd>
              </div>
              <div>
                <dt>Revisions</dt>
                <dd>{range(service.packages.map((pkg) => pkg.revisions))} rounds</dd>
              </div>
            </dl>
          </header>

          {/* Overview */}
          <section className="proposal__section">
            <Head>Overview</Head>
            <p>{service.overview}</p>
          </section>

          {/* Demo */}
          <section className="proposal__section">
            <DemoSlot demo={service.demo} />
          </section>

          {/* Scope */}
          <section className="proposal__section">
            <Head>What I build</Head>
            <div className="pr-scope">
              {service.scope.map((group) => (
                <div key={group.group}>
                  <h3>{group.group}</h3>
                  <ul className="pr-ticks">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Out of scope */}
          <section className="proposal__section">
            <Head>Not included</Head>
            <ul className="pr-ticks pr-ticks--no">
              {service.outOfScope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Process */}
          <section className="proposal__section">
            <Head>How we work</Head>
            <ol className="pr-flow">
              {steps.map((step) => (
                <li key={step.step}>
                  <b>{step.step}</b>
                  <span>{step.text}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Packages */}
          <section className="proposal__section">
            <Head>Packages</Head>
            <div className="pr-pkgs">
              {service.packages.map((pkg) => (
                <div
                  className={`pr-pkg${pkg.popular ? " pr-pkg--popular" : ""}${pkgId === pkg.id ? " pr-pkg--selected" : ""}`}
                  key={pkg.id}
                >
                  {pkg.popular && <span className="pr-pkg__badge">Recommended</span>}
                  <h3>{pkg.name}</h3>
                  <p className="pr-pkg__price">
                    {number(pkg.price)}
                    <small>{label}</small>
                  </p>
                  <p className="pr-pkg__meta">
                    <span>{pkg.days} days delivery</span>
                    <span>{pkg.revisions} revision rounds</span>
                  </p>
                  <ul className="pr-ticks">
                    {pkg.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="pr-pkg__choose"
                    aria-pressed={pkgId === pkg.id}
                    onClick={() => choosePackage(pkg.id)}
                  >
                    {pkgId === pkg.id ? "Selected" : "Choose"}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Add-ons */}
          <section className="proposal__section">
            <Head>Add-ons</Head>
            <ul className="pr-addons">
              {service.addons.map((addon) => (
                <li key={addon.id}>
                  <span>
                    {addon.name}
                    {includedIn(addon) && <small>Included in {includedIn(addon)}</small>}
                  </span>
                  <b>
                    +{number(addon.price)} {label}
                  </b>
                </li>
              ))}
            </ul>
          </section>

          {/* Terms */}
          <section className="proposal__section">
            <Head>Terms</Head>
            <div className="pr-terms">
              {terms.map((term) => (
                <div key={term.title}>
                  <h3>{term.title}</h3>
                  <p>{term.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="proposal__section">
            <Head>Questions</Head>
            <div className="pr-faq">
              {faq.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        </article>

        <OrderSlip
          data={data}
          service={service}
          pkgId={pkgId}
          setPkgId={setPkgId}
          addonIds={addonIds}
          setAddonIds={setAddonIds}
        />
        </div>
      </div>
    </main>
  );
}