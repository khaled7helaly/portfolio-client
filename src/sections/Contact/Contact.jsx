import { useEffect, useRef, useState } from "react";
import { CONTACT } from "../../content/Contact";
import orderData from "../../data/orderServices.json";
import "./Contact.css";
import "./ContactMode.css";

/* Email: الموقع على GitHub Pages (استضافة ثابتة من غير سيرفر) فالإرسال بيتم عن طريق FormSubmit
   وبيوصل على CONTACT.email من غير أي إعداد في .env (بس لازم تفعّل الإيميل مرة واحدة).
   لو عايز خدمة تانية (Formspree مثلًا) حط الـ endpoint في VITE_CONTACT_ENDPOINT وهو اللي هيتستخدم.
   WhatsApp: بيفتح wa.me برسالة جاهزة. الرقم من CONTACT.whatsapp أو من orderServices.json */
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || "";
const FORM_URL = ENDPOINT || `https://formsubmit.co/ajax/${CONTACT.email}`;
const WA_NUMBER = String(CONTACT.whatsapp || orderData.whatsapp.number).replace(/\D/g, "");

const MODES = [
  { key: "email", label: "Email" },
  { key: "whatsapp", label: "WhatsApp" },
];

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const ArrowIcon = () => (
  <svg {...iconProps}>
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

const CopyIcon = () => (
  <svg {...iconProps}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
  </svg>
);

const CheckIcon = () => (
  <svg {...iconProps}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export default function Contact() {
  const [mode, setMode] = useState("email"); // email | whatsapp
  const [status, setStatus] = useState("idle"); // idle | sending | sent | mailto | whatsapp | error
  const [waLink, setWaLink] = useState("");
  const [copied, setCopied] = useState(false);
  const listRef = useRef(null);

  const channels = CONTACT.channels.filter((c) => c.href);

  /* القايمة: fade على الأطراف + أنيميشن سكرول مرة واحدة أول ما توصلها */
  useEffect(() => {
    const el = listRef.current;
    if (!el) return undefined;

    const updateFade = () => {
      el.toggleAttribute("data-more-above", el.scrollTop > 2);
      el.toggleAttribute("data-more-below", el.scrollTop < el.scrollHeight - el.clientHeight - 2);
    };
    updateFade();
    el.addEventListener("scroll", updateFade, { passive: true });
    window.addEventListener("resize", updateFade);

    let cancelled = false;
    let raf = 0;
    let timer = 0;

    const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
    const wait = (ms) => new Promise((resolve) => { timer = setTimeout(resolve, ms); });
    const tween = (from, to, ms) =>
      new Promise((resolve) => {
        const t0 = performance.now();
        const step = (now) => {
          if (cancelled) return resolve();
          const p = Math.min((now - t0) / ms, 1);
          el.scrollTop = from + (to - from) * ease(p);
          if (p < 1) raf = requestAnimationFrame(step);
          else resolve();
          return undefined;
        };
        raf = requestAnimationFrame(step);
      });

    /* ينزل على باقي المنصات وبعدين يرجع لفوق عند LinkedIn و GitHub */
    const play = async () => {
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) return;
      await wait(500);
      if (cancelled) return;
      await tween(0, max, 2600);
      if (cancelled) return;
      await wait(500);
      if (cancelled) return;
      await tween(max, 0, 1400);
    };

    /* أي تفاعل من الزائر بيوقف الأنيميشن فورًا */
    const stop = () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
    const userEvents = ["wheel", "touchstart", "pointerdown", "keydown", "focusin"];

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let io;
    if (!reduceMotion && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          play();
        },
        { threshold: 0.6 }
      );
      io.observe(el);
      userEvents.forEach((ev) => el.addEventListener(ev, stop, { passive: true }));
    }

    return () => {
      stop();
      if (io) io.disconnect();
      userEvents.forEach((ev) => el.removeEventListener(ev, stop));
      el.removeEventListener("scroll", updateFade);
      window.removeEventListener("resize", updateFade);
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* مفيش clipboard — الإيميل ظاهر وممكن يتنسخ يدوي */
    }
  };

  const changeMode = (next) => {
    setMode(next);
    setStatus("idle");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { name, email, message, company } = Object.fromEntries(new FormData(form));

    if (company) return; // honeypot: البوتات بتملّي الحقل ده

    /* WhatsApp: بيفتح المحادثة برسالة جاهزة */
    if (mode === "whatsapp") {
      if (WA_NUMBER.length < 10) {
        console.warn("WhatsApp number is not set. Add whatsapp.number in orderServices.json or CONTACT.whatsapp.");
        setStatus("error");
        return;
      }

      const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
        `Hi Khaled, I'm ${name}.\n\n${message}`
      )}`;

      setWaLink(url);
      window.open(url, "_blank", "noopener");
      setStatus("whatsapp");
      return;
    }

    /* Email: بيتبعت فعلًا في الخلفية من غير ما الزائر يسيب الصفحة */
    setStatus("sending");
    try {
      const payload = { name, email, message, _subject: `New message from ${name}` };
      if (!ENDPOINT) payload._template = "table"; // خاص بـ FormSubmit

      const res = await fetch(FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json().catch(() => ({}));

      if (!res.ok || result.success === "false" || result.success === false) {
        throw new Error(result.message || res.statusText);
      }

      form.reset();
      setStatus("sent");
    } catch (error) {
      console.warn("Contact form failed:", error);
      setStatus("error");
    }
  };

  const hint =
    mode === "whatsapp"
      ? "Opens WhatsApp with your message ready to send."
      : "Your message goes straight to my inbox.";

  return (
    <section className="contact" id="contact" aria-label="Contact">
      <span className="contact__word" aria-hidden="true">CONTACT</span>

      <div className="contact__inner">
        <div className="contact__heading">
          <span className="contact__heading-script">Let's work together</span>
        </div>

        <div className="contact__panel">
          {/* Intro + طرق التواصل */}
          <div className="contact__intro">
            <h3 className="contact__title">Have a project in mind?</h3>

            <p className="contact__lead">
              Tell me what you're building and I'll get back to you.
            </p>

            <div className="contact__email">
              <a className="contact__email-link" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>

              <button className="contact__copy" type="button" onClick={copyEmail}>
                {copied ? <CheckIcon /> : <CopyIcon />}
                {copied ? "Copied" : "Copy"}
              </button>

              <span className="contact__sr" role="status">
                {copied ? "Email copied" : ""}
              </span>
            </div>

            {channels.length > 0 && (
              <ul className="contact__channels" ref={listRef} aria-label="Profiles and platforms">
                {channels.map((c) => (
                  <li key={c.label}>
                    <a
                      className="contact__channel"
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{c.label}</span>
                      <span className="contact__meta">
                        {c.handle && <small>{c.handle}</small>}
                        <ArrowIcon />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Form */}
          <form className="contact__form" onSubmit={handleSubmit} aria-label="Contact form">
            <div className="contact__mode" role="group" aria-label="How do you want to reach me?">
              {MODES.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  aria-pressed={mode === item.key}
                  onClick={() => changeMode(item.key)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <p className="contact__hint">{hint}</p>

            <div className="contact__field">
              <label className="contact__label" htmlFor="contact-name">
                Your name
              </label>
              <input
                className="contact__input"
                id="contact-name"
                name="name"
                type="text"
                dir="auto"
                autoComplete="name"
                placeholder="Jane Doe"
                required
              />
            </div>

            {mode === "email" && (
              <div className="contact__field">
                <label className="contact__label" htmlFor="contact-email">
                  Your email
                </label>
                <input
                  className="contact__input"
                  id="contact-email"
                  name="email"
                  type="email"
                  dir="ltr"
                  inputMode="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder="you@example.com"
                  required
                />
              </div>
            )}

            <div className="contact__field">
              <label className="contact__label" htmlFor="contact-message">
                Your message
              </label>
              <textarea
                className="contact__textarea"
                id="contact-message"
                name="message"
                dir="auto"
                rows={5}
                placeholder="What are you building, and what do you need help with?"
                required
              />
            </div>

            {/* Honeypot */}
            <input
              className="contact__hp"
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <button className="contact__submit" type="submit" disabled={status === "sending"}>
              {status === "sending"
                ? "Sending…"
                : mode === "whatsapp"
                  ? "Open WhatsApp"
                  : "Send message"}
            </button>

            <p className="contact__status" role="status" aria-live="polite">
              {status === "sent" && "Message sent. Thanks, I'll get back to you soon."}
              {status === "whatsapp" && (
                <>
                  WhatsApp should open with your message ready.{" "}
                  <a href={waLink} target="_blank" rel="noopener noreferrer">
                    Didn't open? Tap here.
                  </a>
                </>
              )}
              {status === "error" && (
                <>
                  Couldn't send your message. Please email{" "}
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> instead.
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}