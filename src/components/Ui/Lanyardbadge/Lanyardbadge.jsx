import { useEffect, useRef } from "react";
import "./LanyardBadge.css";

/*
  شارة إيفنت معلّقة في lanyard (حبلين نازلين من فوق).
  بتتشد بالماوس أو الصباع وبتفضل ترتد وتتأرجح.

  <LanyardBadge
    photo="/images/..."  alt="..."
    name="..."  role="..."  tag="..."
    straps={[["نص الحبل الشمال", ...], ["نص الحبل اليمين", ...]]}
    ceilingRef={heroRef}   // العنصر اللي الحبلين متعلقين من حرفه الفوقاني
  />
*/

/* الفيزيا — ظبطها من هنا */
const GRAV = 4200; // الجاذبية: أعلى = الشارة أتقل
const STIFF = 34; // مرونة الحبلين: أعلى = أنشف وبيرجّع أسرع
const DAMP = 1.8; // الاحتكاك: أقل = تفضل تطلع وتنزل أكتر
const LIM = 180; // أقصى شدّة بالإيد (px)
const SWING = 230; // طول البندول بتاع الكارت حوالين المشبك
const PIVOT = 44; // ارتفاع نقطة التعليق فوق الكارت (لازم يساوي transform-origin في الـ CSS)

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const strapText = (items = []) => Array(3).fill(items.join(" ✦ ")).join(" ✦ ");

export default function LanyardBadge({ photo, alt = "", name, role, tag, straps = [], ceilingRef }) {
  const rootRef = useRef(null);
  const badgeRef = useRef(null);
  const strapRefs = useRef([]);
  const st = useRef({
    x: 0, y: 0, vx: 0, vy: 0, // مكان المشبك (بالنسبة لمكانه وهو ساكن) وسرعته
    th: 0, w: 0, // ميلان الكارت حوالين المشبك وسرعته
    raf: 0, t: 0, drag: null, calm: false, h: [],
  });

  /* هندسة الحبلين (بالنسبة لمكان الشارة): نقطتين فوق برا الصفحة، وطول كل حبل وهو ساكن ووهو مش مشدود */
  const geo = () => {
    const root = rootRef.current;
    const R = root.getBoundingClientRect();
    const ceiling = (ceilingRef?.current ?? root.parentElement).getBoundingClientRect().top;
    const cx = R.width / 2;
    const P0y = -PIVOT;
    const ay = ceiling - R.top - 40;
    const S = Math.min(120, R.width * 0.36);
    const A = [[cx - S, ay], [cx + S, ay]];
    const D = Math.max(40, P0y - ay);
    const L0 = A.map(([ax]) => Math.hypot(cx - ax, P0y - ay));
    const N = L0.map((l) => l - (GRAV / (2 * STIFF)) * (l / D)); // بحيث الشارة تستقر بالظبط مكانها
    return { P0x: cx, P0y, A, L0, N };
  };

  /* الكارت بيتأرجح حوالين المشبك كأنه بندول، وبيتزق لما المشبك يتسارع */
  const swing = (ax, h) => {
    const s = st.current;
    s.w += (-(GRAV / SWING) * s.th + clamp(ax, -40000, 40000) / SWING - 1.4 * s.w) * h;
    s.th = clamp(s.th + s.w * h, -0.7, 0.7);
  };

  /* خطوة فيزيا: الجاذبية + حبلين مطاط (بيشدوا بس، مبيزقوش) + احتكاك */
  const step = (g, h) => {
    const s = st.current;
    const px = g.P0x + s.x;
    const py = g.P0y + s.y;
    let fx = 0;
    let fy = GRAV;
    for (let i = 0; i < 2; i++) {
      const dx = px - g.A[i][0];
      const dy = py - g.A[i][1];
      const L = Math.hypot(dx, dy);
      if (L > g.N[i]) {
        const f = (STIFF * (L - g.N[i])) / L;
        fx -= f * dx;
        fy -= f * dy;
      }
    }
    const pvx = s.vx;
    s.vx += (fx - DAMP * s.vx) * h;
    s.vy += (fy - DAMP * s.vy) * h;
    s.x += s.vx * h;
    s.y += s.vy * h;
    swing((s.vx - pvx) / h, h);
  };

  /* بيحرّك الشارة والحبلين: كل حبل بيلف ويتمدد (الكتابة اللي عليه بتتمدد معاه) */
  const draw = (g = geo()) => {
    const s = st.current;
    const px = g.P0x + s.x;
    const py = g.P0y + s.y;
    const deg = (s.th * 180) / Math.PI;
    const b = badgeRef.current;
    b.style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0) rotate(${deg.toFixed(2)}deg)`;
    b.style.setProperty("--sh", (deg * 1.6).toFixed(1));
    strapRefs.current.forEach((el, i) => {
      const [ax, ay] = g.A[i];
      const dx = px - ax;
      const dy = py - ay;
      const len = Math.hypot(dx, dy);
      if (s.h[i] !== g.L0[i]) {
        s.h[i] = g.L0[i];
        el.style.height = `${g.L0[i]}px`;
      }
      const ang = (Math.atan2(-dx, dy) * 180) / Math.PI;
      el.style.transform = `translate(${(ax - 15).toFixed(1)}px, ${ay.toFixed(1)}px) rotate(${ang.toFixed(2)}deg) scaleY(${Math.max(0.15, len / g.L0[i]).toFixed(3)})`;
    });
  };

  const tick = (now) => {
    const s = st.current;
    const dt = clamp((now - s.t) / 1000, 0.001, 0.033);
    s.t = now;
    const g = geo();
    if (s.drag) {
      // الشارة بتتبع الإيد، والسرعة بتتسجل عشان لو سيبتها وإنت بتزقها بتتقذف
      const pvx = s.vx;
      const nx = s.x + (s.drag.x - s.x) * 0.45;
      const ny = s.y + (s.drag.y - s.y) * 0.45;
      s.vx = (nx - s.x) / dt;
      s.vy = (ny - s.y) / dt;
      s.x = nx;
      s.y = ny;
      swing((s.vx - pvx) / dt, dt);
    } else {
      const n = Math.ceil(dt * 240);
      for (let i = 0; i < n; i++) step(g, dt / n);
    }
    s.vx = clamp(s.vx, -3200, 3200);
    s.vy = clamp(s.vy, -3200, 3200);
    draw(g);

    const still =
      !s.drag && Math.hypot(s.x, s.y) < 0.25 && Math.hypot(s.vx, s.vy) < 3 && Math.abs(s.th) < 0.002 && Math.abs(s.w) < 0.03;
    if (still) {
      Object.assign(s, { x: 0, y: 0, vx: 0, vy: 0, th: 0, w: 0, raf: 0 });
      draw(g);
    } else {
      s.raf = requestAnimationFrame(tick);
    }
  };

  const kick = () => {
    const s = st.current;
    if (!s.raf) {
      s.t = performance.now();
      s.raf = requestAnimationFrame(tick);
    }
  };

  const onDown = (e) => {
    const s = st.current;
    if (s.calm || e.button > 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.classList.add("is-drag");
    s.drag = { ox: e.clientX - s.x, oy: e.clientY - s.y, x: s.x, y: s.y };
    kick();
  };

  const onMove = (e) => {
    const s = st.current;
    if (!s.drag) return;
    // مقاومة مطاطية: كل ما تشد أكتر الحبل بيتقل
    const dx = e.clientX - s.drag.ox;
    const dy = e.clientY - s.drag.oy;
    const m = Math.hypot(dx, dy) || 1;
    const k = (LIM * Math.tanh(m / LIM)) / m;
    s.drag.x = dx * k;
    s.drag.y = dy * k;
  };

  const onUp = (e) => {
    const s = st.current;
    if (!s.drag) return;
    s.drag = null;
    e.currentTarget.classList.remove("is-drag");
    kick();
  };

  useEffect(() => {
    const s = st.current;
    const root = rootRef.current;
    s.calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ro = new ResizeObserver(() => { if (!s.raf) draw(); });
    ro.observe(root);
    if (ceilingRef?.current) ro.observe(ceilingRef.current);

    // وقت الدخول الشارة بتنزل من فوق شوية وترتد على الحبلين
    if (!s.calm) {
      s.y = -150;
      s.vx = 260;
    }
    draw();
    root.classList.add("is-live");
    if (!s.calm) kick();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(s.raf);
      s.raf = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="lanyard" ref={rootRef}>
      {/* حبلين بيبدأوا من فوق برا الشاشة وبيتقابلوا عند المشبك */}
      {[0, 1].map((i) => (
        <div className="lanyard__strap" key={i} ref={(el) => { strapRefs.current[i] = el; }} aria-hidden="true">
          <span>{strapText(straps[i] ?? straps[0])}</span>
        </div>
      ))}

      <div
        className="lanyard__badge"
        ref={badgeRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <div className="lanyard__card">
          <span className="lanyard__slot" />
          <div className="lanyard__photo">
            <img src={photo} alt={alt} width="800" height="1000" draggable="false" fetchPriority="high" />
          </div>
          <div className="lanyard__info">
            <b>{name}</b>
            <span>{role}</span>
            <div className="lanyard__row">
              <small>{tag}</small>
              <i className="lanyard__bars" />
            </div>
          </div>
        </div>
        <span className="lanyard__crimp" />
        <span className="lanyard__ring" />
      </div>
    </div>
  );
}