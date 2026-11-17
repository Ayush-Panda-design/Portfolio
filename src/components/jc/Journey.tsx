import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Boy } from "./Boy";
import { ROOMS, type Room } from "./journeyData";
import { Scene } from "./JourneyScenes";
import { scrollToY } from "./lib";
import { MobileTrack } from "./MobileTrack";

const N = ROOMS.length;

/** A cube you can drag, spin, and blow apart. Each face is a technology from the room. */
function Cube3D({ faces, lit }: { faces: Room["faces"]; lit: boolean }) {
  const rx = useMotionValue(-22);
  const ry = useMotionValue(30);
  const vel = useRef({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; moved: number } | null>(null);
  const [boom, setBoom] = useState(false);
  const [hov, setHov] = useState<number | null>(null);

  useAnimationFrame((_, dt) => {
    if (!lit) return;
    const k = dt / 16.7;
    if (!drag.current) {
      ry.set(ry.get() + (vel.current.y + (hov === null ? 0.35 : 0.05)) * k);
      rx.set(rx.get() + vel.current.x * k);
      vel.current.x *= 0.94;
      vel.current.y *= 0.94;
    }
  });

  const place = [
    "rotateY(0deg)", "rotateY(90deg)", "rotateY(180deg)", "rotateY(-90deg)", "rotateX(90deg)", "rotateX(-90deg)",
  ];
  return (
    <div className="cube-zone">
      <div
        className="cube-stage"
        onPointerDown={(e) => {
          drag.current = { x: e.clientX, y: e.clientY, moved: 0 };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d) return;
          const dx = e.clientX - d.x;
          const dy = e.clientY - d.y;
          d.x = e.clientX;
          d.y = e.clientY;
          d.moved += Math.abs(dx) + Math.abs(dy);
          ry.set(ry.get() + dx * 0.6);
          rx.set(rx.get() - dy * 0.6);
          vel.current = { x: -dy * 0.12, y: dx * 0.12 };
        }}
        onPointerUp={() => {
          if (drag.current && drag.current.moved < 5) setBoom((b) => !b);
          drag.current = null;
        }}
        onPointerLeave={() => setHov(null)}
      >
        <div className="ring" />
        <motion.div className={`cube ${boom ? "boom" : ""}`} style={{ rotateX: rx, rotateY: ry }}>
          {faces.map((f, i) => (
            <div key={f.t} className={`face ${hov === i ? "hot" : ""}`} style={{ transform: `${place[i]} translateZ(var(--z))` }} onPointerEnter={() => setHov(i)}>
              <b>{f.t}</b>
            </div>
          ))}
        </motion.div>
        <div className="shadow" />
      </div>
      <div className="cap" aria-live="polite">{hov !== null ? faces[hov].d : boom ? "Click to put it back together" : "Drag to spin · click to explode"}</div>
    </div>
  );
}

function RoomView({ r, lit, width, onGo }: { r: Room; lit: boolean; width: number; onGo: () => void }) {
  const [mi, setMi] = useState(0);
  const [open, setOpen] = useState(0);
  const el = useRef<HTMLDivElement>(null);
  const mod = r.mods[mi];

  const move = (e: React.PointerEvent) => {
    if (!lit || !el.current) return;
    const b = el.current.getBoundingClientRect();
    const nx = (e.clientX - b.left) / b.width - 0.5;
    const ny = (e.clientY - b.top) / b.height - 0.5;
    el.current.style.setProperty("--nx", nx.toFixed(3));
    el.current.style.setProperty("--ny", ny.toFixed(3));
    el.current.style.setProperty("--mx", `${e.clientX - b.left}px`);
    el.current.style.setProperty("--my", `${e.clientY - b.top}px`);
  };
  const leave = () => {
    el.current?.style.setProperty("--nx", "0");
    el.current?.style.setProperty("--ny", "0");
  };

  return (
    <div ref={el} className={`jc-room ${lit ? "lit" : ""}`} style={{ width, ["--a" as string]: r.accent }} onPointerMove={move} onPointerLeave={leave} onClick={() => !lit && onGo()}>
      <i className="spot" />
      <div className="wall">
        <div className="cubewrap"><Cube3D faces={r.faces} lit={lit} /></div>
        <div className="scenewrap"><Scene id={r.scene} /></div>
      </div>
      <div className="board">
        <small>{r.num} · {r.room}</small>
        <h3>{r.title}</h3>
        <p>{r.tagline}</p>
        {r.mods.length > 1 && (
          <div className="tabs">
            {r.mods.map((m, k) => (
              <button key={m.id} className={k === mi ? "on" : ""} onClick={(e) => { e.stopPropagation(); setMi(k); setOpen(0); }}>
                {m.title}
              </button>
            ))}
          </div>
        )}
        <div className="chips">
          {mod.sections.map((s, k) => (
            <button key={s.t} className={k === open ? "on" : ""} onMouseEnter={() => lit && setOpen(k)} onClick={(e) => { e.stopPropagation(); setOpen(k); }}>
              {s.t}
            </button>
          ))}
        </div>
        <ul key={`${mi}-${open}`}>
          {(mod.sections[open] ?? mod.sections[0]).items.map((it, i) => (
            <li key={it} style={{ animationDelay: `${i * 40}ms` }}>{it}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Slot({ i, step, R, fan, p, children }: { i: number; step: number; R: number; fan: MotionValue<number>; p: MotionValue<number>; children: React.ReactNode }) {
  const transform = useTransform(fan, (f) => `rotateY(${i * step * f}deg) translateZ(${R}px)`);
  // far rooms fade and blur, like a gallery wall receding
  const d = useTransform(p, (v) => Math.abs(v * (N - 1) - i));
  const filter = useTransform(d, (x) => `blur(${Math.min(5, Math.max(0, x - 0.4) * 2.4).toFixed(2)}px)`);
  const opacity = useTransform([d, fan], ([x, f]) => Math.max(0.0, Math.min(1, 1.2 - (x as number) * 0.32)) * Math.min(1, (f as number) * 3 + 0.12));
  return (
    <motion.div className="jr-slot" style={{ transform, filter, opacity }}>
      {children}
    </motion.div>
  );
}

/** Phone version: scrolling slides the rooms sideways while the avatar walks. */
function JourneyMobile() {
  return (
    <section id="journey" data-scene="royal" className="jr-ms">
      <MobileTrack
        label="The journey"
        title="Engineer in the making."
        hint="Keep scrolling to walk through the rooms"
        items={ROOMS.map((r) => ({
          key: r.id,
          accent: r.accent,
          label: r.room,
          node: (
            <>
              <small>{r.num} · {r.room}</small>
              <h3>{r.title}</h3>
              <p>{r.tagline}</p>
              <div className="chips">{r.mods.flatMap((m) => m.sections).map((x) => <span key={x.t}>{x.t}</span>)}</div>
            </>
          ),
        }))}
      />
    </section>
  );
}

export function Journey() {
  const ref = useRef<HTMLElement>(null);
  const [vp, setVp] = useState({ w: 1440, h: 900 });
  const vpRef = useRef(vp);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const [bubble, setBubble] = useState<string | null>("Let's take a tour 👋");
  const mobile = vp.w < 820;

  useEffect(() => {
    const on = () => {
      const v = { w: window.innerWidth, h: window.innerHeight };
      vpRef.current = v;
      setVp(v);
    };
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);

  const roomW = Math.min(vp.w * 0.56, 880);
  const STEP = 34; // degrees between rooms on the ring
  const R = roomW / 2 / Math.tan((STEP / 2) * (Math.PI / 180));

  // entrance (section scrolls in) and the pinned tour
  const enter = useScroll({ target: ref, offset: ["start end", "start start"] });
  const rv = useSpring(enter.scrollYProgress, { stiffness: 120, damping: 30, mass: 0.35 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.35 });
  // the ring fans out as it arrives, then turns with the scroll
  const fan = useTransform(rv, [0.15, 1], [0, 1]);
  const ringRot = useTransform([p, fan], ([v, f]) => -(v as number) * (N - 1) * STEP * (f as number));
  // one clock for the avatar: he walks in during the entrance and keeps walking while the ring turns
  const walkP = useTransform([rv, p], ([a, b]) => (b as number) - 0.07 * (1 - (a as number)));
  const boyX = useTransform(rv, [0, 1], ["-34vw", "0vw"]);
  const floorPos = useTransform(walkP, (v) => `${-v * N * 520}px 0`);

  useMotionValueEvent(p, "change", (v) => {
    const best = Math.max(0, Math.min(N - 1, Math.round(v * (N - 1))));
    activeRef.current = best;
    setActive(best);
  });

  useEffect(() => {
    if (mobile) return;
    setBubble(active === 0 ? "Let's take a tour 👋" : ROOMS[active].room);
    const t = setTimeout(() => setBubble(null), 2400);
    return () => clearTimeout(t);
  }, [active, mobile]);

  const go = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const len = el.offsetHeight - window.innerHeight;
    scrollToY(top + (Math.max(0, Math.min(N - 1, i)) / (N - 1)) * len);
  };

  // ← / → walk to the next room while the tour is on screen
  useEffect(() => {
    if (mobile) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && /input|textarea/i.test(t.tagName)) return;
      const r = ref.current?.getBoundingClientRect();
      if (!r || r.top > 10 || r.bottom < window.innerHeight * 0.6) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(activeRef.current + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(activeRef.current - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobile]);

  if (mobile) return <JourneyMobile />;

  const r = ROOMS[active];
  return (
    <section id="journey" data-scene="royal" ref={ref} className="jr-tour" style={{ height: `${N * 46 + 100}vh` }}>
      <div className="jr-in" style={{ ["--a" as string]: r.accent }}>
        <div className="jr-head">
          <span className="jc-label">The journey · room {r.num} of {String(N).padStart(2, "0")}</span>
          <AnimatePresence mode="wait">
            <motion.h2 key={r.id} className="jr-title" initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              {r.title}
            </motion.h2>
          </AnimatePresence>
          <div className="jr-doors">
            {ROOMS.map((d, i) => (
              <button key={d.id} className={i === active ? "on" : i < active ? "past" : ""} onClick={() => go(i)} aria-label={d.title} title={`${d.num} · ${d.title}`} style={{ ["--a" as string]: d.accent }} />
            ))}
          </div>
        </div>

        <motion.div className="jr-wallpaper" style={{ backgroundPosition: floorPos }} aria-hidden />
        <div className="jr-stage3d" style={{ perspective: 2600 }}>
          <motion.div className="jr-ring" style={{ width: roomW, marginLeft: -roomW / 2, rotateY: ringRot, z: -R }}>
            {ROOMS.map((room, i) => (
              <Slot key={room.id} i={i} step={STEP} R={R} fan={fan} p={p}>
                <RoomView r={room} lit={i === active} width={roomW} onGo={() => go(i)} />
              </Slot>
            ))}
          </motion.div>
        </div>
        <motion.div className="jr-floor" style={{ backgroundPosition: floorPos }} aria-hidden />
        <motion.div className="jr-boywrap" style={{ x: boyX }}>
          <Boy p={walkP} n={N} mode="walk" line={bubble} />
        </motion.div>
        <div className="jr-hint">← → to walk · drag the cube</div>
      </div>
    </section>
  );
}
