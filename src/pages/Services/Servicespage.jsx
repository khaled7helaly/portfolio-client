import { useEffect } from "react";

import data from "../../data/orderServices.json";
import ServicePaper from "../../components/services/ServicePaper";
import CurrencyToggle from "../../components/services/CurrencyToggle";
import useCurrency from "../../hooks/useCurrency";

import "./ServicesPage.css";

const STEPS = [
  { title: "Pick a service", text: "Choose what fits your project." },
  { title: "Read the proposal", text: "Scope, timeline, packages, and prices." },
  { title: "Send on WhatsApp", text: "Fill a short form and your request reaches me." },
];

export default function ServicesPage() {
  const { services, currency, whatsapp } = data;
  const { label } = useCurrency();

  useEffect(() => {
    document.title = "Order a service | Khaled";
    window.scrollTo({ top: 0 });
  }, []);

  // الخدمة المميزة تيجي الأول
  const ordered = [...services].sort((a, b) => Number(b.featured) - Number(a.featured));

  const customLink = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(
    "أهلاً خالد، عندي فكرة مشروع مش موجودة في الخدمات المتاحة وحابب أعرف التفاصيل والسعر."
  )}`;

  return (
    <main className="services-page">
      <div className="services-page__container">
        {/* Header */}
        <header className="services-page__header">
          <div className="services-page__tools">
            <CurrencyToggle />
          </div>
          <h1>Order a service</h1>
          <p>
            Every service has its own proposal: what I build, how long it takes, and what it
            costs. Open one, choose a package, and send your request.
          </p>
        </header>

        {/* Steps */}
        <ol className="steps">
          {STEPS.map((step) => (
            <li key={step.title}>
              <b>{step.title}</b>
              <span>{step.text}</span>
            </li>
          ))}
        </ol>

        {/* Services */}
        <div className="services-page__grid">
          {ordered.map((service) => (
            <ServicePaper key={service.slug} service={service} currency={currency} />
          ))}

          <a className="custom" href={customLink} target="_blank" rel="noreferrer">
            <h3>Not on the list?</h3>
            <p>Tell me your idea and I will quote it separately.</p>
            <span className="custom__action">
              Describe your idea
              <span aria-hidden="true">↗</span>
            </span>
          </a>
        </div>

        <p className="services-page__note">
          Prices are starting points in {label}. Every proposal lists exactly what is
          included and what is not.
        </p>
      </div>
    </main>
  );
}