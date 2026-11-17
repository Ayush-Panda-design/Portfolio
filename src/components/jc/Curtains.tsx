import { animate, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Phase = "load" | "hello" | "open" | "gone";

/** Palace-curtain opening: velvet drapes with gold trim stay closed behind a Namaste, then part to reveal the site. */
export function Curtains({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  const [phase, setPhase] = useState<Phase>("load");
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    const reduce = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const c = animate(0, 100, {
      duration: reduce ? 0.4 : 1.8,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => {
        setPhase("hello");
        timers.push(setTimeout(() => setPhase("open"), reduce ? 200 : 1300));
        timers.push(setTimeout(() => done.current(), reduce ? 300 : 1300 + 700));
        timers.push(setTimeout(() => setPhase("gone"), reduce ? 700 : 1300 + 3000));
      },
    });
    return () => {
      c.stop();
      timers.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    const el = document.documentElement;
    if (phase === "gone") {
      el.style.overflow = "";
      return;
    }
    el.style.overflow = "hidden";
    return () => {
      el.style.overflow = "";
    };
  }, [phase]);

  if (phase === "gone") return null;
  const open = phase === "open";
  const ease = [0.7, 0, 0.2, 1] as const;

  return (
    <div className="cur" aria-hidden={open} role="presentation">
      {/* the two velvet drapes (cut from the reference photo) */}
      <motion.div
        className="cur-img l"
        initial={false}
        animate={open ? { x: "-102%", scaleX: 0.55, skewX: 0 } : { x: "0%", scaleX: 1, skewX: 0 }}
        transition={{ duration: 2.6, ease }}
        style={{ backgroundImage: "url(/curtain-left.png)" }}
      />
      <motion.div
        className="cur-img r"
        initial={false}
        animate={open ? { x: "102%", scaleX: 0.55, skewX: 0 } : { x: "0%", scaleX: 1, skewX: 0 }}
        transition={{ duration: 2.6, ease }}
        style={{ backgroundImage: "url(/curtain-right.png)" }}
      />
      <motion.i className="cur-light" initial={false} animate={{ opacity: open ? 0 : 1 }} transition={{ duration: 0.8 }} />

      {/* centre: the welcome */}
      <motion.div className="cur-mid" initial={false} animate={open ? { opacity: 0, scale: 1.12, filter: "blur(8px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 0.8, ease: "easeInOut" }}>
        <motion.div className="cur-om" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }}>
          <svg viewBox="0 0 120 40" aria-hidden>
            <path d="M4 20 H46 M74 20 H116" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M60 6 L68 20 L60 34 L52 20 Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="60" cy="20" r="2.4" fill="currentColor" />
          </svg>
        </motion.div>
        <div className="cur-hi">
          <motion.span key={phase === "load" ? "a" : "b"} initial={{ opacity: 0, y: 16, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.7 }} className="dv">
            नमस्ते
          </motion.span>
          <motion.span className="en" initial={{ opacity: 0 }} animate={{ opacity: phase === "load" ? 0.7 : 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
            {phase === "load" ? "Namaste · welcome to my portfolio" : "Namaste 🙏  Welcome"}
          </motion.span>
        </div>
        <div className="cur-bar" aria-hidden>
          <motion.i style={{ width: `${n}%` }} />
        </div>
        <small className="cur-n">{n}</small>
      </motion.div>
    </div>
  );
}
