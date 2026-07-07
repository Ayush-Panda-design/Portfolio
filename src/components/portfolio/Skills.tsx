import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import { TextGenerate } from "./effects/TextGenerate";

const GROUPS = [
  { label: "Languages", items: ["JavaScript", "TypeScript", "HTML", "CSS", "SQL"] },
  { label: "Frontend", items: ["React", "Next.js", "Expo", "Tailwind", "Framer Motion"] },
  { label: "Backend", items: ["Node.js", "Express", "tRPC", "Socket.io", "REST"] },
  { label: "Data", items: ["PostgreSQL", "MongoDB", "Redis", "Drizzle", "Prisma", "Firebase"] },
  { label: "Infra", items: ["Docker", "Kafka", "Inngest", "Vercel", "Turborepo", "Git"] },
  { label: "Security", items: ["JWT", "OAuth", "Rate limiting", "RBAC"] },
];

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 border-t border-border-line pt-14 lg:pt-16">
      <SectionLabel num="04.">Stack</SectionLabel>
      <h2 className="font-display text-2xl font-bold leading-snug tracking-tight text-ink sm:text-3xl">
        <TextGenerate words="Tools I ship with." />
      </h2>
      <p className="mt-3 text-[14px] text-ink-soft">
        The production toolkit — concepts and practice builds live in the trail below.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {GROUPS.map((g, gi) => (
          <motion.div
            key={g.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.04 }}
            className="rounded-xl border border-border-line bg-surface/40 p-4"
          >
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              {g.label}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border-line bg-bg/50 px-2.5 py-1 font-mono text-[11px] text-ink-soft"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
