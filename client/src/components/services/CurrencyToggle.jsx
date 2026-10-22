import useCurrency from "../../hooks/useCurrency";

import "./CurrencyToggle.css";

export default function CurrencyToggle() {
  const { display, enabled, setCurrency } = useCurrency();

  if (!enabled) return null;

  return (
    <div className="currency-toggle" role="group" aria-label="Currency">
      {["EGP", "USD"].map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={display === code}
          onClick={() => setCurrency(code)}
        >
          {code}
        </button>
      ))}
    </div>
  );
}