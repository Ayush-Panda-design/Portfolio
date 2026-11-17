import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Curtains } from "./Curtains";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Lenis from "lenis";

export const EASE = [0.22, 1, 0.36, 1] as const;

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Smooth scroll (Lenis), shared via window.__lenis so nav and controls can drive it. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.16, wheelMultiplier: 1.35, touchMultiplier: 1.6 });
    window.__lenis = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);
  return null;
}

export function scrollToY(y: number, immediate = false) {
  const l = window.__lenis;
  if (l) l.scrollTo(y, { immediate });
  else window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
}

export function scrollToId(id: string, immediate = false) {
  const el = document.getElementById(id);
  if (!el) return;
  scrollToY(el.getBoundingClientRect().top + window.scrollY, immediate);
}

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "p" | "span";
}) {
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </M>
  );
}

import { animate, useInView } from "framer-motion";
export function Counter({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const c = animate(0, to, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals) + suffix;
      },
    });
    return () => c.stop();
  }, [inView, to, decimals, suffix]);
  return (
    <span ref={ref}>
      {to.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export type TitleVariant = "track" | "neon" | "type" | "drop" | "pop" | "ink" | "scramble" | "sides";
const GLYPHS = "!<>-_\\/[]{}=+*^?#abcdefghijklmnopqrstuvwxyz0123456789";
const rr = (i: number) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

function Scramble({ text, className, go }: { text: string; className: string; go: boolean }) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!go) return;
    let f = 0;
    const total = 38;
    const id = setInterval(() => {
      f++;
      const reveal = Math.floor((f / total) * text.length);
      setOut(text.split("").map((ch, i) => (ch === " " || i < reveal ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join(""));
      if (f >= total) {
        clearInterval(id);
        setOut(text);
      }
    }, 34);
    return () => clearInterval(id);
  }, [go, text]);
  return <h2 className={className} aria-label={text}>{out}</h2>;
}

/**
 * Headlines get a different entrance in every place, so the page never repeats itself:
 * track (Royal Mile), neon (Victoria St), type (gardens), drop (gift), pop (hill),
 * ink (village), scramble (café), sides (bridge).
 */
export function AnimTitle({ text, variant, className = "jc-h2" }: { text: string; variant: TitleVariant; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const go = useInView(ref, { once: true, margin: "-12%" });
  const words = text.split(" ");

  if (variant === "scramble") {
    return (
      <div ref={ref as unknown as React.RefObject<HTMLDivElement>}>
        <Scramble text={text} className={className} go={go} />
      </div>
    );
  }
  if (variant === "type" || variant === "ink") {
    return (
      <h2 ref={ref} className={`${className} t-${variant} ${go ? "go" : ""}`}>
        {text}
      </h2>
    );
  }
  if (variant === "track") {
    return (
      <motion.h2
        ref={ref}
        className={className}
        initial={{ letterSpacing: "0.32em", opacity: 0, x: -50 }}
        animate={go ? { letterSpacing: "-0.035em", opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.7, ease: EASE }}
      >
        {text}
      </motion.h2>
    );
  }
  if (variant === "neon") {
    let n = 0;
    return (
      <h2 ref={ref} className={`${className} t-neon ${go ? "go" : ""}`} aria-label={text}>
        {words.map((w, wi) => (
          <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap", marginRight: "0.28em" }} aria-hidden>
            {w.split("").map((ch) => {
              const d = (n++ * 0.06 + rr(n) * 0.35).toFixed(2);
              return <span key={n} className="l" style={{ ["--d" as string]: `${d}s` }}>{ch}</span>;
            })}
          </span>
        ))}
      </h2>
    );
  }
  if (variant === "drop") {
    let n = 0;
    return (
      <h2 ref={ref} className={className} aria-label={text}>
        {words.map((w, wi) => (
          <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap", marginRight: "0.28em" }} aria-hidden>
            {w.split("").map((ch) => {
              n++;
              return (
                <motion.span
                  key={n}
                  style={{ display: "inline-block" }}
                  initial={{ y: -160, opacity: 0, rotate: (rr(n) - 0.5) * 70 }}
                  animate={go ? { y: 0, opacity: 1, rotate: 0 } : {}}
                  transition={{ type: "spring", stiffness: 210, damping: 11, delay: n * 0.03 }}
                >
                  {ch}
                </motion.span>
              );
            })}
          </span>
        ))}
      </h2>
    );
  }
  if (variant === "pop") {
    return (
      <h2 ref={ref} className={className} aria-label={text}>
        {words.map((w, i) => (
          <motion.span
            key={i}
            aria-hidden
            style={{ display: "inline-block" }}
            initial={{ scale: 0.3, y: 60, opacity: 0, rotate: i % 2 ? 6 : -6 }}
            animate={go ? { scale: 1, y: 0, opacity: 1, rotate: 0 } : {}}
            transition={{ type: "spring", stiffness: 260, damping: 12, delay: i * 0.11 }}
          >
            {w}&nbsp;
          </motion.span>
        ))}
      </h2>
    );
  }
  // sides
  return (
    <h2 ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          aria-hidden
          style={{ display: "inline-block" }}
          initial={{ x: i % 2 ? 160 : -160, skewX: i % 2 ? -18 : 18, opacity: 0 }}
          animate={go ? { x: 0, skewX: 0, opacity: 1 } : {}}
          transition={{ duration: 1, ease: EASE, delay: i * 0.09 }}
        >
          {w}&nbsp;
        </motion.span>
      ))}
    </h2>
  );
}

export function SecHead({ label, title, sub, variant = "pop" }: { label: string; title: string; sub?: string; variant?: TitleVariant }) {
  return (
    <div className="jc-center jc-head">
      <Reveal y={14}><span className="jc-label">{label}</span></Reveal>
      <AnimTitle text={title} variant={variant} />
      {sub && (
        <Reveal delay={0.25} y={16}>
          <p className="jc-lede">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

/** Pulls its children slightly toward the pointer. */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState({ x: 0, y: 0 });
  return (
    <motion.div
      ref={ref}
      style={{ display: "inline-block" }}
      animate={p}
      transition={{ type: "spring", stiffness: 200, damping: 14, mass: 0.4 }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setP({ x: (e.clientX - r.left - r.width / 2) * strength, y: (e.clientY - r.top - r.height / 2) * strength });
      }}
      onMouseLeave={() => setP({ x: 0, y: 0 })}
    >
      {children}
    </motion.div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });
  return <motion.div className="jc-progress" style={{ scaleX }} />;
}

/** Small solid yellow dot that trails the pointer and swells over interactive elements. */
export function Cursor() {
  const el = useRef<HTMLDivElement>(null);
  const [down, setDown] = useState(false);
  const bigRef = useRef(false);
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    let x = -100, y = -100, cx = -100, cy = -100, raf = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const b = !!(e.target as HTMLElement)?.closest?.("a,button,[role=button],.jc-pcard,.jc-note,.jc-pass,.jc-win,.jc-gift,input,textarea");
      if (b !== bigRef.current) {
        bigRef.current = b;
        el.current?.classList.toggle("big", b);
      }
    };
    const loop = () => {
      cx += (x - cx) * 0.45;
      cy += (y - cy) * 0.45;
      if (el.current) el.current.style.transform = `translate(${cx}px,${cy}px)`;
      raf = requestAnimationFrame(loop);
    };
    const d = () => setDown(true);
    const u = () => setDown(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", d);
    window.addEventListener("mouseup", u);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", d);
      window.removeEventListener("mouseup", u);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={el} className={`jc-cursor ${down ? "down" : ""}`} />;
}

/** Counts 0 to 100, then lifts like a curtain. */
export function Preloader({ onDone }: { onDone: () => void }) {
  return <Curtains onDone={onDone} />;
}
