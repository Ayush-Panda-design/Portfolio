import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PlusIcon as Plus, XIcon as X } from "lucide-react";
import { SectionLabel } from "./SectionLabel";

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

  return <span ref={ref}>{display}{suffix}</span>;
}

const CARDS = [
  { kind: "text", title: "4th Semester", body: "Currently in my 4th semester of B.Tech Computer Science & Engineering at VSSUT, Burla — focused on systems, databases and modern web.", value: 0, decimals: 0, suffix: "" },
  { kind: "num", value: 8.27, decimals: 2, suffix: "", title: "CGPA", body: "Maintaining a consistent CGPA of 8.27 while shipping side projects and contributing to open-source learning." },
  { kind: "num", value: 3, decimals: 0, suffix: "+", title: "Projects Shipped", body: "Built and deployed real, end-to-end applications with production concerns: auth, rate limiting, caching, CI/CD." },
  { kind: "text", title: "Open to Work", body: "Actively looking for internships and collaborative projects where I can ship serious software with serious teams.", value: 0, decimals: 0, suffix: "" },
] as const;

export function About() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="about" className="py-24 lg:py-32" style={{ background: "#f0ece5" }}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <SectionLabel>ABOUT&nbsp;ME</SectionLabel>
        <motion.h2
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-[820px] font-serif text-4xl leading-[1.1] text-[color:#1a1410] sm:text-5xl lg:text-[64px]"
        >
          Building real software,
          <br />
          <span className="italic">not just side projects.</span>
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr]">
          <motion.div
            initial={{ y: 18, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-5 font-sans text-[15px] leading-[1.8] text-[color:#6b5c4a]"
          >
            <p>
              I&apos;m a Computer Science undergrad at <span className="text-[color:#1a1410]">VSSUT, Burla</span>,
              currently in my 4th semester. My focus is full-stack web development with a strong bias toward
              type-safety, sensible architecture and shipping things that actually run in production.
            </p>
            <p>
              Most of my time goes into building products end-to-end — designing the data model, writing the API,
              shipping the frontend, and wiring up the infra. I care about performance, DX, and details.
            </p>
            <p>
              I&apos;m currently open to <span className="text-[color:#c8430f]">internships and freelance collaborations</span>{" "}
              where I can contribute meaningfully and learn from people who&apos;ve been doing this longer than me.
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CARDS.map((c, i) => {
              const isOpen = open === i;
              return (
                <motion.button
                  layout
                  key={c.title}
                  onClick={() => setOpen(isOpen ? null : i)}
                  initial={{ y: 24, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="group text-left p-6 transition-colors"
                  style={{
                    background: "#faf8f5",
                    border: `1px solid ${isOpen ? "#c8430f" : "#e8e0d5"}`,
                    borderRadius: 4,
                  }}
                >
                  <motion.div layout="position" className="flex items-start justify-between gap-3">
                    <div className="font-serif text-3xl text-[color:#1a1410]">
                      {c.kind === "num" ? (
                        <Counter value={c.value} decimals={c.decimals} suffix={c.suffix ?? ""} />
                      ) : (
                        <span className="text-base font-mono uppercase tracking-[0.18em] text-[color:#6b5c4a]">
                          {c.title}
                        </span>
                      )}
                    </div>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="text-[color:#c8430f]">
                      {isOpen ? <X size={18} /> : <Plus size={18} />}
                    </motion.span>
                  </motion.div>
                  {c.kind === "num" && (
                    <motion.div layout="position" className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:#a89880]">
                      {c.title}
                    </motion.div>
                  )}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 font-sans text-[13px] leading-[1.7] text-[color:#6b5c4a]"
                      >
                        {c.body}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
