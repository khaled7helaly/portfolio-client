import { useState } from "react";

import { calcTotal, isIncluded } from "../../utils/pricing";
import { buildOrder } from "../../utils/whatsapp";
import useCurrency from "../../hooks/useCurrency";

import "./OrderSlip.css";

const EMPTY_FORM = { name: "", contact: "", description: "", deadline: "" };

export default function OrderSlip({ data, service, pkgId, setPkgId, addonIds, setAddonIds }) {
  const { money: number, label, display, enabled } = useCurrency();

  const [form, setForm] = useState(EMPTY_FORM);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const pkg = service.packages.find((item) => item.id === pkgId);
  const total = calcTotal(service, pkgId, addonIds);

  const toggleAddon = (id) =>
    setAddonIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );

  const setField = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();

    const addons = service.addons.filter(
      (addon) => addonIds.includes(addon.id) && !isIncluded(addon, pkgId)
    );

    const order = buildOrder(data, { service, pkg, addons, total, form });

    setResult(order);
    setCopied(false);
    window.open(order.link, "_blank", "noopener");
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(result.text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <aside className="slip" id="order-slip" aria-labelledby="slip-title">
        <h2 id="slip-title">Your request</h2>

        {/* Package */}
        <fieldset className="slip__group">
          <legend>Package</legend>
          {service.packages.map((item) => (
            <label className="slip__option" key={item.id}>
              <input
                type="radio"
                name="package"
                checked={pkgId === item.id}
                onChange={() => setPkgId(item.id)}
              />
              <span>
                {item.name}
                <small>{item.days} days</small>
              </span>
              <b>{number(item.price)}</b>
            </label>
          ))}
        </fieldset>

        {/* Add-ons */}
        <fieldset className="slip__group">
          <legend>Add-ons</legend>
          {service.addons.map((addon) => {
            const included = isIncluded(addon, pkgId);

            return (
              <label className="slip__option" key={addon.id}>
                <input
                  type="checkbox"
                  checked={included || addonIds.includes(addon.id)}
                  disabled={included}
                  onChange={() => toggleAddon(addon.id)}
                />
                <span>{addon.name}</span>
                <b>{included ? "Included" : `+${number(addon.price)}`}</b>
              </label>
            );
          })}
        </fieldset>

        {/* Total */}
        <dl className="slip__total">
          <div>
            <dt>Delivery</dt>
            <dd>{pkg.days} days</dd>
          </div>
          <div>
            <dt>Total</dt>
            <dd className="slip__sum">
              {number(total)}
              <small>{label}</small>
            </dd>
          </div>
          {enabled && (
            <div>
              <dt />
              <dd className="slip__usd">
                {display === "EGP"
                  ? `about $${new Intl.NumberFormat("en-US").format(Math.round(total / data.currency.usd.rate))}`
                  : `${new Intl.NumberFormat("en-US").format(total)} ${data.currency.label}`}
              </dd>
            </div>
          )}
        </dl>

        {/* Form / Result */}
        {result ? (
          <div className="slip__done" role="status">
            <h3>Your request is ready</h3>
            <p>WhatsApp should open with your message. If it did not, use the buttons below.</p>
            <a className="slip__submit" href={result.link} target="_blank" rel="noreferrer">
              <span>Open WhatsApp</span>
            </a>
            <div className="slip__row">
              <button type="button" onClick={copyMessage}>
                {copied ? "Copied" : "Copy message"}
              </button>
              <button type="button" onClick={() => setResult(null)}>
                Edit request
              </button>
            </div>
          </div>
        ) : (
          <form className="slip__form" onSubmit={handleSubmit}>
            <label>
              Your name
              <input type="text" required autoComplete="name" value={form.name} onChange={setField("name")} />
            </label>
            <label>
              Phone or email
              <input type="text" required autoComplete="tel" value={form.contact} onChange={setField("contact")} />
            </label>
            <label>
              Tell me about your project
              <textarea required rows="4" value={form.description} onChange={setField("description")} />
            </label>
            <label>
              Deadline (optional)
              <input
                type="text"
                placeholder="For example: within 3 weeks"
                value={form.deadline}
                onChange={setField("deadline")}
              />
            </label>

            <button className="slip__submit" type="submit">
              <span>Order on WhatsApp</span>
            </button>
            <p className="slip__hint">Nothing is paid now. We confirm the scope first.</p>
          </form>
        )}
      </aside>

      {/* شريط الإجمالي على الموبايل */}
      <div className="slip-bar">
        <span>
          <small>Total</small>
          <b>
            {number(total)} {label}
          </b>
        </span>
        <a href="#order-slip">Order</a>
      </div>
    </>
  );
}