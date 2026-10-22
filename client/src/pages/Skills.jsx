import { useEffect, useRef, useState } from "react";
import data from "../data/Skills.json";
import "./Skills.css";

/* true لما العنصر يبقى في نص الشاشة — الديمو بيتركّب ويشتغل من الأول كل مرة */
function useLive(ref) {
  const [live, setLive] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), {
      rootMargin: "-25% 0px -25% 0px",
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [ref]);
  return live;
}

/* ───────── الديموهات (الربط بالـ JSON عن طريق demo.type) ───────── */
function ReactDemo() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setN((v) => v + 1), 1500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="d-tree">
      <code className="node">{"<App />"}</code>
      <code className="node">{`state: count = ${n}`}</code>
      <code key={`c${n}`} className="node node--hot">{`<Counter count={${n}} />`}</code>
      <code key={`b${n}`} className="node node--hot">{`Clicked ${n} times`}</code>
    </div>
  );
}

const ResponsiveDemo = () => (
  <div className="d-resp">
    <span className="d-px" />
    <div className="d-grid">
      {Array.from({ length: 6 }, (_, i) => <i key={i} />)}
    </div>
  </div>
);

const SeoDemo = () => (
  <div className="d-seo">
    <div className="ring">
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="52" pathLength="100" />
        <circle cx="60" cy="60" r="52" pathLength="100" className="ring__fg" />
      </svg>
      <b className="score" />
    </div>
    <ul>
      {["Meta & Open Graph", "SSR / SSG", "Core Web Vitals", "Sitemap & robots"].map((t, i) => (
        <li key={t} style={{ "--i": i }}>{t}</li>
      ))}
    </ul>
  </div>
);

const FLOW = ["Client", "Express", "Controller", "MongoDB"];
const ApiDemo = () => (
  <div className="d-api">
    <div className="d-flow">
      <i className="packet" />
      {FLOW.map((t, i) => <span key={t} style={{ "--i": i }}>{t}</span>)}
    </div>
    <code>GET /api/projects <em>200 OK</em></code>
  </div>
);

const DbDemo = () => (
  <div className="d-db">
    {["Ahmed", "Sara", "Omar"].map((n, i) => (
      <pre key={n} style={{ "--i": i }}>{`{ _id: ObjectId("…${i}f"),\n  name: "${n}",\n  role: "user" }`}</pre>
    ))}
    <code>db.users.insertMany(…) <em>acknowledged</em></code>
  </div>
);

const GitDemo = () => (
  <svg viewBox="0 0 240 110" className="d-git" aria-hidden="true">
    <path d="M12 82H228" pathLength="1" />
    <path d="M64 82C88 82 84 30 110 30H158C184 30 180 82 204 82" pathLength="1" className="br" />
    {[12, 64, 110, 158, 204, 228].map((x, i) => (
      <circle key={x} cx={x} cy={x > 64 && x < 204 ? 30 : 82} r="5.5" style={{ "--i": i }} />
    ))}
  </svg>
);

const DEMOS = { react: ReactDemo, responsive: ResponsiveDemo, seo: SeoDemo, api: ApiDemo, database: DbDemo, git: GitDemo };

/* ───────── كاتيجوري واحدة ───────── */
function Category({ cat }) {
  const ref = useRef(null);
  const live = useLive(ref);
  const Demo = DEMOS[cat.demo.type];

  return (
    <article className={`cat${live ? " is-live" : ""}`} id={cat.id} ref={ref}>
      <div className="cat__info">
        <h3>{cat.title}</h3>
        <p>{cat.description}</p>
        <ul className="chips">
          {cat.skills.map((s, i) => (
            <li key={s.name} style={{ "--lv": s.level / 100, "--i": i }}>
              <div>
                <b>{s.name}</b>
                <span>{s.note}</span>
              </div>
              <em>{s.level}%</em>
              <i className="bar" />
            </li>
          ))}
        </ul>
      </div>

      <figure className="demo">
        <div className="demo__bar" aria-hidden="true">
          <i /><i /><i />
          <span>{cat.demo.label}</span>
        </div>
        <div className="demo__body">{live && Demo && <Demo />}</div>
        <figcaption>{cat.demo.caption}</figcaption>
      </figure>
    </article>
  );
}

export default function Skills() {
  const ref = useRef(null);

  /* شريط التقدّم: بيمشي مع السكرول من أول السكيلز لآخرها */
  useEffect(() => {
    const el = ref.current;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight * 0.5 - r.top) / r.height;
      el.style.setProperty("--progress", Math.min(1, Math.max(0, p)).toFixed(3));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const { heading, categories } = data;

  return (
    <section className="skills" id="skills" ref={ref}>
      <span className="skills__rail" aria-hidden="true" />
      <header className="skills__head">
        <h2>{heading.title}</h2>
        <p>{heading.text}</p>
      </header>
      {categories.map((c) => <Category key={c.id} cat={c} />)}
    </section>
  );
}