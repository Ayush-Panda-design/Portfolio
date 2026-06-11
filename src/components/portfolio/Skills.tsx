import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";

const GROUPS = [
  { label: "Fundamentals", items: ["HTML", "CSS", "JavaScript", "TypeScript"] },
  { label: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  { label: "Backend", items: ["Node.js", "Express", "REST API", "tRPC", "WebSockets"] },
  { label: "Databases", items: ["PostgreSQL", "MongoDB", "SQLite", "Redis", "Drizzle ORM"] },
  { label: "DevOps", items: ["Docker", "CI/CD", "Turborepo", "Git"] },
  { label: "Auth & Security", items: ["OpenID Connect", "Rate Limiting"] },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 lg:py-32" style={{ background: "#faf8f5" }}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <SectionLabel>SKILLS&nbsp;&amp;&nbsp;STACK</SectionLabel>
        <motion.h2
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-[820px] font-serif text-4xl leading-[1.1] text-[color:#1a1410] sm:text-5xl lg:text-[56px]"
        >
          A toolkit chosen for <span className="italic">shipping</span>.
        </motion.h2>

        <div className="mt-14 space-y-10">
          {GROUPS.map((g, gi) => (
            <div key={g.label} className="grid grid-cols-1 gap-4 border-t border-[color:#e8e0d5] pt-8 lg:grid-cols-[220px_1fr]">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:#a89880]">
                0{gi + 1} / {g.label}
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: i * 0.04 }}
                    whileHover={{ y: -2 }}
                    className="cursor-default font-mono text-[12px] tracking-[0.06em] transition-colors"
                    style={{
                      padding: "8px 14px",
                      background: "#faf8f5",
                      border: "1px solid #c8430f33",
                      color: "#1a1410",
                      borderRadius: 999,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "#c8430f";
                      (e.currentTarget as HTMLElement).style.color = "#faf8f5";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px -8px #c8430f88";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "#faf8f5";
                      (e.currentTarget as HTMLElement).style.color = "#1a1410";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
