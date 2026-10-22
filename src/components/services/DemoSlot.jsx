import "./DemoSlot.css";

const hostOf = (url) => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

/* نافذة الديمو: لو demo.url فاضي بتظهر شكل مبدئي، ولما تحط اللينك بيظهر زرار فتح الديمو */
export default function DemoSlot({ demo }) {
  const url = demo?.url;

  return (
    <figure className="demo-slot">
      <div className="demo-slot__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{url ? hostOf(url) : "your-demo.com"}</span>
      </div>

      <div className="demo-slot__body" aria-hidden="true">
        <i className="demo-slot__hero" />
        <i />
        <i />
        <i />
      </div>

      <figcaption>
        {url ? (
          <a href={url} target="_blank" rel="noreferrer">
            {demo.label || "Live demo"}
            <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <span>A live example of this service will be added here soon.</span>
        )}
      </figcaption>
    </figure>
  );
}