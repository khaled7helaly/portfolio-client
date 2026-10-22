import { Link } from "react-router-dom";

import data from "../../data/orderServices.json";
import ServicePaper from "../../components/services/ServicePaper";

import "./HomeServices.css";

export default function HomeServices() {
  const { services, currency } = data;

  // الخدمة المميزة تيجي الأول
  const ordered = [...services].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <section className="home-services" id="order" aria-labelledby="home-services-title">
      <div className="home-services__container">
        {/* Section Header */}
        <header className="home-services__header">
          <div>
            <h2 id="home-services-title">Order a service</h2>
            <p>Pick what you need, read the proposal, and send your request on WhatsApp.</p>
          </div>

          <Link className="home-services__all" to="/services">
            See all services
            <span aria-hidden="true">→</span>
          </Link>
        </header>

        {/* Proposal papers */}
        <div className="home-services__grid">
          {ordered.map((service) => (
            <ServicePaper key={service.slug} service={service} currency={currency} />
          ))}
        </div>
      </div>
    </section>
  );
}