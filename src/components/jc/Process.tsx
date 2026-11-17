import { MeBuddy } from "./MeBuddy";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SecHead } from "./lib";
import { Batter, BAT_START, batSpan } from "./Batter";

const STEPS = [
  { t: "Clarify the idea", d: "Turn a fuzzy idea into requirements before writing any code.", c: "#FFD23F" },
  { t: "Model the data", d: "Schema first: relations, constraints and migrations that won't hurt later.", c: "#9FD3FF" },
  { t: "Design the API", d: "Typed end to end, with tRPC or REST, plus auth and rate limits from day one.", c: "#B7A2FF" },
  { t: "Build the UI", d: "React and Tailwind, fast by default, with motion where it earns its place.", c: "#FF6B4A" },
  { t: "Review hard", d: "AI-assisted PR review plus human sign-off before anything merges.", c: "#4F9E4A" },
  { t: "Ship with CI/CD", d: "Background jobs, previews and deploys that happen without ceremony.", c: "#FFB48A" },
  { t: "Watch and iterate", d: "Real usage tells the truth. Fix, polish, repeat.", c: "#FFD23F" },
];
const N = STEPS.length;
type Rect = { x: number; y: number; w: number; h: number };

/** 4 + 3 staggered brick rows to the right of the batter. */
function layout(W: number, H: number): Rect[] {
  const left = 0.34 * W, right = 0.97 * W, gap = Math.max(10, 0.01 * W);
  const cols = 4, cw = (right - left - gap * (cols - 1)) / cols;
  const ch = Math.min(0.2 * H, 176), top1 = 0.29 * H, top2 = top1 + ch + gap * 1.4;
  return STEPS.map((_, i) => {
    if (i < 4) return { x: left + i * (cw + gap), y: top1, w: cw, h: ch };
    return { x: left + cw / 2 + (i - 4) * (cw + gap), y: top2, w: cw, h: ch };
  });
}

function StepCard({ s, i, r, p, rev }: { s: (typeof STEPS)[number]; i: number; r: Rect; p: MotionValue<number>; rev: boolean }) {
  const a = BAT_START + (i + 0.76) * batSpan(N);
  const k = useTransform(p, [a - 0.004, a + 0.04], [0, 1], { clamp: true });
  const scale = useTransform(k, (v) => (v <= 0 ? 0.2 : 0.2 + 0.8 * (1 + 2.2 * Math.pow(v - 1, 3) + 1.2 * Math.pow(v - 1, 2))));
  const y = useTransform(k, (v) => (1 - v) * 30);
  const opacity = useTransform(k, [0, 0.35], [0, 1]);
  const [on, setOn] = useState(false);
  useMotionValueEvent(k, "change", (v) => setOn(v > 0.6));
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  return (
    <motion.article
      className={"pr-card" + (on ? " on" : "")}
      style={{ left: r.x, top: r.y, width: r.w, height: r.h, scale, y, opacity, pointerEvents: on ? "auto" : "none", ["--a" as string]: s.c, transform: undefined }}
      animate={{ rotateX: tilt.y, rotateY: tilt.x }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      onPointerMove={(e) => {
        const b = e.currentTarget.getBoundingClientRect();
        setTilt({ x: ((e.clientX - b.left) / b.width - 0.5) * 12, y: -((e.clientY - b.top) / b.height - 0.5) * 12 });
      }}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <span className="pr-n">{String(i + 1).padStart(2, "0")}</span>
      <h3>{s.t}</h3>
      <p>{s.d}</p>
      {rev && null}
    </motion.article>
  );
}

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const targets = useRef<{ x: number; y: number }[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [kick, setKick] = useState(0);
  const [done, setDone] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  useMotionValueEvent(p, "change", (v) => setDone(v > 0.97));

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  const desktop = size.w === 0 || size.w >= 900;
  const rects = size.w ? layout(size.w, size.h) : [];
  targets.current = rects.map((r) => ({ x: r.x + r.w / 2, y: r.y + r.h / 2 }));

  return (
    <section id="process" data-scene="arthur" className="jc-sec pr-sec">
      <div className="pr-m">
        <div className="jc-wrap">
          <SecHead label="How I work" title="From fuzzy idea to live product." variant="pop" sub="The loop I follow on ShipFlow, Relvion, EdinForm and Votora." />
          <div className="pr-me"><MeBuddy mood="idle" /></div>
          <div className="pr-list">
            {STEPS.map((s, i) => (
              <motion.article key={s.t} className="pr-card pr-mc on" style={{ ["--a" as string]: s.c }} initial={{ opacity: 0, y: 28, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.05 }}>
                <span className="pr-ball" aria-hidden />
                <span className="pr-n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <div className="pr-tour" ref={ref} style={{ height: `${N * 46 + 100}vh` }}>
        <div className="pr-in" ref={stage}>
          <div className="pr-head">
            <span className="jc-label">How I work</span>
            <h2>From fuzzy idea to live product.</h2>
            <p>The loop I follow on ShipFlow, Relvion, EdinForm and Votora.</p>
          </div>
          {desktop && rects.map((r, i) => <StepCard key={STEPS[i].t} s={STEPS[i]} i={i} r={r} p={p} rev={done} />)}
          {desktop && <Batter p={p} n={N} targets={targets} kick={kick} />}
          <button className="pr-hit" aria-label="Make him swing" onClick={() => done && setKick((k) => k + 1)} style={{ pointerEvents: done ? "auto" : "none" }} />
          <div className="pr-floor" />
          <div className="pr-hint">{done ? "Click the batter for a sixer" : "Scroll: every pitch reveals a step"}</div>
        </div>
      </div>
    </section>
  );
}
