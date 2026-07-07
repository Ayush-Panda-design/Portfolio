import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PlusIcon as Plus, XIcon as X } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { SpotlightCard } from "./effects/Spotlight";
import { TextGenerate } from "./effects/TextGenerate";
import { StackLayersDiagram } from "./Diagrams";

function Counter({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const sv = useSpring(mv, { duration: 1.2 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, value, mv]);
  useEffect(() => sv.on("change", (v) => setDisplay(v.toFixed(decimals))), [sv, decimals]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const CARDS = [
  {
    kind: "text",
    title: "5th Semester",
    body: "Currently in my 5th semester of B.Tech Computer Science & Engineering at VSSUT, Burla — focused on systems, databases and modern web.",
    value: 0,
    decimals: 0,
    suffix: "",
  },
  {
    kind: "num",
    value: 8.27,
    decimals: 2,
    suffix: "",
    title: "CGPA",
    body: "Maintaining a consistent CGPA of 8.27 while shipping side projects and contributing to open-source learning.",
  },
  {
    kind: "num",
    value: 20,
    decimals: 0,
    suffix: "+",
    title: "Projects Built",
    body: "Practice builds while learning, plus production products with auth, realtime, rate limiting, and CI/CD.",
  },
  {
    kind: "text",
    title: "Open to Work",
    body: "Actively looking for internships and collaborative projects where I can ship serious software with serious teams.",
    value: 0,
    decimals: 0,
    suffix: "",
  },
] as const;

export function About() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="about" className="scroll-mt-24 border-t border-border-line pt-14 lg:pt-16">
      <SectionLabel num="03.">About</SectionLabel>
      <h2 className="font-display text-2xl font-bold leading-snug tracking-tight text-ink sm:text-3xl">
        <TextGenerate words="Building real software, not just side projects." />
      </h2>

      <div className="mt-8 space-y-8">
          <div>
            <motion.div
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-5 text-[15px] leading-[1.85] text-ink-soft"
            >
              <p>
                I&apos;m a Computer Science undergrad at <span className="text-ink">VSSUT, Burla</span>, currently
                in my 5th semester. My focus is full-stack web development with a strong bias toward type-safety,
                sensible architecture and shipping things that actually run in production.
              </p>
              <p>
                Most of my time goes into building products end-to-end — designing the data model, writing the API,
                shipping the frontend, and wiring up the infra. I care about performance, DX, and details.
              </p>
              <p>
                I&apos;m currently open to{" "}
                <span className="text-accent">internships and freelance collaborations</span> where I can contribute
                meaningfully and learn from people who&apos;ve been doing this longer than me.
              </p>
            </motion.div>

            <div className="mt-6">
              <StackLayersDiagram />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {CARDS.map((c, i) => {
              const isOpen = open === i;
              return (
                <motion.button
                  layout
                  key={c.title}
                  onClick={() => setOpen(isOpen ? null : i)}
                  initial={{ y: 24, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="text-left"
                >
                  <SpotlightCard
                    className={`h-full p-6 transition-colors ${
                      isOpen ? "border-accent/50" : ""
                    }`}
                  >
                    <motion.div layout="position" className="flex items-start justify-between gap-3">
                      <div className="font-display text-3xl font-bold text-ink">
                        {c.kind === "num" ? (
                          <Counter value={c.value} decimals={c.decimals} suffix={c.suffix ?? ""} />
                        ) : (
                          <span className="font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-ink-soft">
                            {c.title}
                          </span>
                        )}
                      </div>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        className="rounded-full bg-accent/10 p-1.5 text-accent"
                      >
                        {isOpen ? <X size={14} /> : <Plus size={14} />}
                      </motion.span>
                    </motion.div>
                    {c.kind === "num" && (
                      <motion.div
                        layout="position"
                        className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint"
                      >
                        {c.title}
                      </motion.div>
                    )}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 text-[13px] leading-[1.7] text-ink-soft"
                        >
                          {c.body}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </SpotlightCard>
                </motion.button>
              );
            })}
          </div>
        </div>
    </section>
  );
}
