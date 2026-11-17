import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState, type ComponentProps } from "react";
import { SecHead } from "./lib";
import { Boy, B_START, B_W, B_FLY0 } from "./Boy";
import { setHot } from "./bus";

export type StageItem = {
  id: string; num: string; title: string; tag: string; img?: string; accent: string; url?: string;
  summary?: string; stack?: string[]; actions?: { label: string; href?: string; project?: string; onClick?: () => void }[];
};
type Side = "left" | "right";
type Theme = "photo" | "charcoal" | "wide";
type Vp = { w: number; h: number; hand?: { x: number; y: number } };

const START = B_START;
const W = B_W;
const FLY0 = B_FLY0;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function itemW(vp: Vp, theme: Theme) {
  if (vp.w < 760) return vp.w * 0.42;
  if (theme === "wide") return Math.max(200, Math.min(330, vp.w * 0.19));
  return theme === "charcoal" ? Math.max(190, Math.min(290, vp.w * 0.15)) : Math.max(150, Math.min(260, vp.w * 0.165));
}
function target(vp: Vp, side: Side, theme: Theme, i: number, n: number) {
  let fx: number, fy: number;
  if (vp.w < 760) {
    fx = i % 2 ? 0.72 : 0.3;
    fy = 0.4 + Math.floor(i / 2) * 0.22;
  } else if (theme === "wide") {
    fx = 0.17 + (n > 1 ? (i * 0.66) / (n - 1) : 0);
    fy = [0.56, 0.46, 0.58, 0.48][i % 4];
  } else if (theme === "charcoal") {
    fx = 0.43 + (n > 1 ? (i * 0.46) / (n - 1) : 0);
    fy = [0.52, 0.4, 0.56, 0.44][i % 4];
  } else {
    fx = 0.2 + (n > 1 ? (i * 0.6) / (n - 1) : 0);
    fy = [0.55, 0.45, 0.53, 0.43][i % 4];
  }
  if (side === "right" && theme === "photo") fx = 1 - fx;
  return { x: vp.w * fx, y: vp.h * fy, fx };
}
function fly(v: number, i: number, n: number, vp: Vp, side: Side, theme: Theme) {
  const tt = (v - (START + i * W)) / W;
  const h = vp.hand ?? { x: side === "left" ? -vp.w * 0.06 : vp.w * 1.06, y: vp.h * 1.1 };
  const t = target(vp, side, theme, i, n);
  const tilt = i % 2 ? 2.2 : -2.2;
  if (tt <= FLY0) return { x: h.x, y: h.y, s: 0.4, r: 0, o: 0 };
  if (tt >= 1) return { x: t.x, y: t.y, s: 1, r: tilt, o: 1 };
  const u = (tt - FLY0) / (1 - FLY0);
  const e = 1 - Math.pow(1 - u, 3);
  return {
    x: lerp(h.x, t.x, e),
    y: lerp(h.y, t.y, e) - Math.sin(Math.PI * u) * vp.h * 0.16,
    s: 0.4 + 0.6 * e,
    r: lerp(i % 2 ? -300 : 300, tilt, e),
    o: 1,
  };
}

function Item({ item, i, n, p, vpRef, vp, side, theme, kind, dim, on, onOpen, onHot }: {
  item: StageItem; i: number; n: number; p: MotionValue<number>; vpRef: React.MutableRefObject<Vp>; vp: Vp;
  side: Side; theme: Theme; kind: "card" | "window"; dim: boolean; on: boolean;
  onOpen: (it: StageItem) => void; onHot: (i: number, on: boolean) => void;
}) {
  const x = useTransform(p, (v) => fly(v, i, n, vpRef.current, side, theme).x);
  const y = useTransform(p, (v) => fly(v, i, n, vpRef.current, side, theme).y);
  const scale = useTransform(p, (v) => fly(v, i, n, vpRef.current, side, theme).s);
  const rotate = useTransform(p, (v) => fly(v, i, n, vpRef.current, side, theme).r);
  const opacity = useTransform(p, (v) => fly(v, i, n, vpRef.current, side, theme).o);
  const [live, setLive] = useState(false);
  useMotionValueEvent(p, "change", (v) => setLive(v > START + i * W + W * 0.95));
  const tilt = useRef<HTMLButtonElement>(null);
  const iw = itemW(vp, theme);
  const base = (0.5 - target(vp, side, theme, i, n).fx) * 34;

  return (
    <motion.div
      className={`jc-fl ${dim ? "dim" : ""} ${on ? "on" : ""}`}
      style={{ x, y, scale, rotate, opacity, width: iw, marginLeft: -iw / 2, marginTop: -iw * 0.34, pointerEvents: live ? "auto" : "none", ["--a" as string]: item.accent, ["--ry" as string]: `${base}deg` }}
    >
      <div className="par" style={{ ["--dp" as string]: 24 + (i % 3) * 22 }}>
        <div className="bob" style={{ animationDelay: `${-i * 1.1}s` }}>
          <button
            ref={tilt}
            className="tilt"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(item);
            }}
            onMouseEnter={() => onHot(i, true)}
            onMouseLeave={() => {
              onHot(i, false);
              tilt.current?.style.setProperty("--px", "0deg");
              tilt.current?.style.setProperty("--py", "0deg");
            }}
            onFocus={() => onHot(i, true)}
            onBlur={() => onHot(i, false)}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty("--px", `${((e.clientX - r.left) / r.width - 0.5) * 22}deg`);
              e.currentTarget.style.setProperty("--py", `${-((e.clientY - r.top) / r.height - 0.5) * 16}deg`);
            }}
            aria-label={`Open ${item.title}`}
          >
            {kind === "window" && (
              <span className="chrome">
                <span className="tl"><i style={{ background: "#ff5f57" }} /><i style={{ background: "#febc2e" }} /><i style={{ background: "#28c840" }} /></span>
                <span className="url">{(item.url ?? "").replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
              </span>
            )}
            <span className="shot">{item.img && <img src={item.img} alt="" loading="lazy" draggable={false} />}<i className="gl" /></span>
            <span className="cap"><small>{item.num} · {item.tag}</small><b>{item.title}</b></span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Stage({ label, title, variant, items, kind, side = "left", onOpen, hot, theme = "photo" }: {
  label: string; title: string; variant: ComponentProps<typeof SecHead>["variant"]; items: StageItem[];
  kind: "card" | "window"; side?: Side; onOpen: (it: StageItem) => void; hot: string; theme?: Theme;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [vp, setVp] = useState<Vp>({ w: 1440, h: 900 });
  const vpRef = useRef(vp);
  const [hov, setHov] = useState<number | null>(null);
  const n = items.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.35 });

  useEffect(() => {
    const on = () => {
      const v = { w: window.innerWidth, h: window.innerHeight };
      vpRef.current = { ...vpRef.current, ...v };
      setVp(v);
    };
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  useEffect(() => () => items.forEach((_, i) => setHot(`${hot}${i}`, false)), [items, hot]);

  const onHot = (k: number, on: boolean) => {
    setHot(`${hot}${k}`, on);
    if (on) setHov(k);
    else setHov((h) => (h === k ? null : h));
  };
  const boyOn = theme === "charcoal" && vp.w >= 760;

  return (
    <div ref={ref} className={`jc-tstage ${theme === "wide" ? "charcoal wide" : theme}`} style={{ height: `${200 + n * 38}vh` }}>
      <div
        ref={inner}
        className="jc-tstage-in"
        onPointerMove={(e) => {
          const el = inner.current;
          if (!el) return;
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", `${e.clientX - r.left}px`);
          el.style.setProperty("--my", `${e.clientY - r.top}px`);
          el.style.setProperty("--nx", `${(e.clientX - r.left) / r.width - 0.5}`);
          el.style.setProperty("--ny", `${(e.clientY - r.top) / r.height - 0.5}`);
        }}
      >
        {theme !== "photo" && (
          <div className="cc-bg" aria-hidden>
            <i className="beam" />
          </div>
        )}
        <div className="jc-stagehead">
          <SecHead label={label} title={title} variant={variant} />
        </div>

        {boyOn && (
          <Boy
            p={p}
            n={n}
            images={items.map((it) => it.img)}
            onRelease={(pt) => {
              vpRef.current = { ...vpRef.current, hand: pt };
            }}
          />
        )}

        {items.map((it, i) => (
          <Item key={it.id} item={it} i={i} n={n} p={p} vpRef={vpRef} vp={vp} side={side} theme={theme} kind={kind} dim={hov !== null && hov !== i} on={hov === i} onOpen={onOpen} onHot={onHot} />
        ))}
      </div>
    </div>
  );
}
