import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { MapPinIcon } from "lucide-react";
import { SCENES } from "./scenes";
import { scrollToId } from "./lib";

/** Reports which section is under the middle of the viewport. Draws nothing. */
export function Tracker({ onActive }: { onActive: (id: string) => void }) {
  useEffect(() => {
    let raf = 0;
    let last = "";
    const frame = () => {
      raf = 0;
      const ref = window.scrollY + window.innerHeight * 0.5;
      let idx = 0;
      SCENES.forEach((s, i) => {
        const el = document.querySelector<HTMLElement>(`[data-scene="${s.id}"]`);
        if (el && el.getBoundingClientRect().top + window.scrollY <= ref) idx = i;
      });
      if (SCENES[idx].id !== last) {
        last = SCENES[idx].id;
        onActive(last);
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    schedule();
    const t = [500, 1500, 3500].map((ms) => setTimeout(schedule, ms));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      t.forEach(clearTimeout);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [onActive]);
  return null;
}

/** Top-left "you are here" chip with a dotted route you can click to jump. */
export function RouteChip({ active }: { active: string }) {
  const idx = Math.max(0, SCENES.findIndex((s) => s.id === active));
  const scene = SCENES[idx];
  return (
    <motion.div className="jc-chip-loc jc-glass" initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 160, damping: 18, delay: 2.2 }}>
      <div className="row">
        <MapPinIcon size={18} style={{ color: "var(--sun)", flex: "none" }} />
        <AnimatePresence mode="wait">
          <motion.div key={scene.id} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} transition={{ duration: 0.35 }}>
            <b>{scene.label}</b>
            <small>{String(idx + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")} · {scene.sub}</small>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="dots">
        {SCENES.map((s, i) => (
          <button key={s.id} onClick={() => scrollToId(s.section)} aria-label={`Go to ${s.label}`} className={i === idx ? "on" : i < idx ? "past" : ""} />
        ))}
      </div>
    </motion.div>
  );
}
