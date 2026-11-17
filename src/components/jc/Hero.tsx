import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo } from "react";
import { EASE, Magnetic, scrollToId } from "./lib";

const HEADLINE = ["I", "build", "full-stack", "products", "that", "ship"];

// deterministic pseudo-random so SSR and client markup match
const rnd = (i: number) => {
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

export function Hero({ ready = true }: { ready?: boolean }) {
  const { scrollY } = useScroll();
  const bgScale = useTransform(scrollY, [0, 900], [1, 1.14]);
  const bgY = useTransform(scrollY, [0, 900], ["0%", "4%"]);
  const textY = useTransform(scrollY, [0, 600], [0, -70]);
  const textO = useTransform(scrollY, [0, 520], [1, 0]);
  const hintO = useTransform(scrollY, [0, 120], [1, 0]);

  // pointer: depth drift + a warm spotlight that follows the cursor
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const lx = useMotionValue(70);
  const ly = useMotionValue(45);
  const light = useTransform([lx, ly], ([x, y]) => `radial-gradient(420px circle at ${x}% ${y}%, rgba(255,200,110,.20), transparent 62%)`);
  useEffect(() => {
    const on = (e: MouseEvent) => {
      mx.set((e.clientX / innerWidth - 0.5) * -22);
      my.set((e.clientY / innerHeight - 0.5) * -12);
      lx.set((e.clientX / innerWidth) * 100);
      ly.set((e.clientY / innerHeight) * 100);
    };
    window.addEventListener("mousemove", on);
    return () => window.removeEventListener("mousemove", on);
  }, [mx, my, lx, ly]);

  const dust = useMemo(
    () => Array.from({ length: 34 }, (_, i) => ({ x: 38 + rnd(i) * 62, y: 20 + rnd(i + 50) * 75, s: 1.5 + rnd(i + 9) * 3, d: rnd(i + 3) * 9, t: 9 + rnd(i + 17) * 10 })),
    [],
  );

  return (
    <header id="top" className="jc-hero h2" data-scene="home">
      <div className="h2-stage">
        {/* scene: pulls in from a soft focus once the curtains open */}
        <motion.div className="h2-intro" initial={{ scale: 1.18, filter: "blur(14px)", opacity: 0 }} animate={ready ? { scale: 1, filter: "blur(0px)", opacity: 1 } : {}} transition={{ duration: 2.4, ease: EASE }}>
          <motion.div className="h2-bg" style={{ scale: bgScale, y: bgY }}>
            <div className="h2-drift">
            <motion.div className="h2-par" style={{ x: sx, y: sy }}>
              <img src="/hero-scene.jpg" alt="Ayush at his desk, writing code" draggable={false} />

              {/* living light on top of the picture, positioned in picture coordinates */}
              <i className="h2-glow lamp" />
              <i className="h2-glow lamp2" />
              <i className="h2-glow shelf" />
              <i className="h2-win w1" />
              <i className="h2-win w2" />
              <i className="h2-win w3" />
              <div className="h2-dust" aria-hidden>
                {dust.map((p, i) => (
                  <span key={i} style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, animationDelay: `${-p.d}s`, animationDuration: `${p.t}s` }} />
                ))}
              </div>
            </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="h2-spot" style={{ background: light }} aria-hidden />
        <div className="h2-scrim" />
        <div className="h2-vig" />

        <motion.div className="h2-text" style={{ y: textY, opacity: textO }}>
          <h1 className="h2-h1" aria-label="I build full-stack products that ship.">
            {HEADLINE.map((w, i) => (
              <span key={i} className="h2-line-w">
                <span className="w">
                  <motion.span initial={{ y: "115%", rotate: 4 }} animate={ready ? { y: 0, rotate: 0 } : {}} transition={{ duration: 1, delay: 0.9 + i * 0.09, ease: EASE }}>
                    {i === 5 ? (
                      <span className="h2-ship">
                        {w}
                        <svg viewBox="0 0 200 18" preserveAspectRatio="none" aria-hidden>
                          <motion.path d="M3 12 C 40 4, 90 3, 150 9 S 190 13, 197 8" fill="none" stroke="var(--sun,#FFD66B)" strokeWidth="5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={ready ? { pathLength: 1 } : {}} transition={{ duration: 0.9, delay: 1.9, ease: EASE }} />
                        </svg>
                      </span>
                    ) : (
                      w
                    )}
                    {i === 5 && <motion.b className="h2-dot" initial={{ scale: 0 }} animate={ready ? { scale: 1 } : {}} transition={{ type: "spring", stiffness: 300, damping: 10, delay: 2.1 }}>.</motion.b>}
                  </motion.span>
                </span>{" "}
              </span>
            ))}
          </h1>
          <motion.div className="h2-cta" initial={{ opacity: 0, y: 14 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 2.0, duration: 0.8, ease: EASE }}>
            <Magnetic><button className="jc-btn sun h2-b1" onClick={() => scrollToId("work")}>See my work ↓</button></Magnetic>
            <Magnetic><button className="jc-btn ghost h2-b2" onClick={() => scrollToId("contact")}>Say hi</button></Magnetic>
          </motion.div>
        </motion.div>

        <motion.div className="jc-hint h2-hint" style={{ opacity: hintO }}>
          scroll
          <span>↓</span>
        </motion.div>
      </div>
    </header>
  );
}
