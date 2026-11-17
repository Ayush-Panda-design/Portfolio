import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SecHead } from "./lib";
import { setHot } from "./bus";

const GROUPS = [
  { label: "Languages", c: "#f7c948", items: ["JavaScript", "TypeScript", "HTML", "CSS", "SQL"] },
  { label: "Frontend", c: "#38bdf8", items: ["React", "Next.js", "Expo", "Tailwind", "Framer Motion"] },
  { label: "Backend", c: "#fb7185", items: ["Node.js", "Express", "tRPC", "Socket.io", "REST"] },
  { label: "Data", c: "#34d399", items: ["PostgreSQL", "MongoDB", "Redis", "Drizzle", "Prisma", "Firebase"] },
  { label: "Infra", c: "#a78bfa", items: ["Docker", "Kafka", "Inngest", "Vercel", "Turborepo", "Git"] },
  { label: "Security", c: "#fb923c", items: ["JWT", "OAuth", "Rate limiting", "RBAC"] },
];
const TOOLS = GROUPS.flatMap((g) => g.items.map((t) => ({ t, g: g.label, c: g.c })));
const initials = (t: string) => (t.length <= 3 ? t : t.split(/[\s.]/).filter(Boolean).map((w) => w[0]).join("").slice(0, 2));
const COLORS = ["#FFD66B", "#FF7A59", "#4C9BFF", "#A78BFA", "#34D399"];

export function Stack() {
  const [open, setOpen] = useState(false);
  const [burst, setBurst] = useState(0);

  useEffect(() => {
    setHot("gift", open);
    return () => setHot("gift", false);
  }, [open]);

  return (
    <section id="stack" data-scene="calton" className="jc-sec">
      <div className="jc-wrap">
        <SecHead label="My stack" title="Everything I know, unwrapped." variant="drop" sub={`${TOOLS.length} tools I ship with. ${open ? "Hover one to wiggle it." : "Tap the gift."}`} />
      </div>
      <div className="jc-gstage">
        <motion.div className="jc-cone" animate={open ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0.2 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} />

        <AnimatePresence>
          {open && (
            <motion.div className="jc-tools" initial="h" animate="s" variants={{ s: { transition: { staggerChildren: 0.04, delayChildren: 0.5 } } }}>
              {TOOLS.map((t) => (
                <motion.div
                  key={t.t}
                  className="jc-tool"
                  variants={{ h: { opacity: 0, y: 220, scale: 0.3 }, s: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 140, damping: 13 } } }}
                >
                  <i style={{ background: `linear-gradient(145deg,${t.c},color-mix(in srgb,${t.c} 55%,#000))` }}>{initials(t.t)}</i>
                  <span>{t.t}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          className={`jc-gift ${open ? "open" : ""}`}
          onClick={() => {
            if (!open) setBurst((b) => b + 1);
            setOpen((o) => !o);
          }}
          aria-label={open ? "Close the gift" : "Unwrap my stack"}
          aria-expanded={open}
        >
          <div className="box" />
          <div className="lid" />
          <div className="tag">A.</div>
          {burst > 0 &&
            Array.from({ length: 26 }, (_, k) => {
              const a = (k / 26) * Math.PI * 2;
              const r = 120 + (k % 5) * 40;
              return (
                <motion.span
                  key={`${burst}-${k}`}
                  className="jc-conf"
                  style={{ background: COLORS[k % COLORS.length] }}
                  initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                  animate={{ x: Math.cos(a) * r, y: Math.sin(a) * r - 160, opacity: 0, rotate: 540 }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                />
              );
            })}
        </button>
      </div>
    </section>
  );
}
