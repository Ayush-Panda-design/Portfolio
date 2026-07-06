import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon as ArrowLeft,
  ExternalLinkIcon as ExternalLink,
} from "lucide-react";
import { Github } from "./icons";
import { ProjectAgent } from "./ProjectAgent";
import { ProjectGallery } from "./ProjectGallery";
import { PROJECT_DETAILS } from "@/data/project-details";
import type { ProductionProject } from "@/data/projects";
import { cn } from "@/lib/utils";

const ACCENT_RING: Record<string, string> = {
  teal: "from-accent/20 via-sky-500/10 to-transparent",
  violet: "from-violet-400/25 via-fuchsia-500/10 to-transparent",
  amber: "from-amber-400/20 via-orange-500/10 to-transparent",
  pink: "from-pink-400/20 via-rose-500/10 to-transparent",
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45 },
};

export function ProjectDetailPage({ project }: { project: ProductionProject }) {
  const detail = PROJECT_DETAILS[project.id];
  const gradient = ACCENT_RING[project.accent] ?? ACCENT_RING.teal;

  return (
    <main className="relative min-h-screen overflow-hidden bg-bg text-ink">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className={cn("absolute -left-32 top-20 h-72 w-72 rounded-full bg-gradient-to-br blur-3xl", gradient)}
          animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -right-24 bottom-32 h-64 w-64 rounded-full bg-accent/5 blur-3xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-10 sm:px-8 lg:py-14">
        <motion.div {...fadeUp}>
          <Link
            to="/"
            hash="projects"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} /> Back to projects
          </Link>
        </motion.div>

        <div className="mt-8 lg:grid lg:grid-cols-[1fr_340px] lg:gap-10 xl:grid-cols-[1fr_380px]">
          <div className="min-w-0">
            <motion.header {...fadeUp} className="mb-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] text-ink-faint">{project.num}</span>
                <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                  {project.tag}
                </span>
              </div>
              <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-soft">{project.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[12px] font-semibold text-primary-foreground hover:bg-accent-hover"
                  >
                    <ExternalLink size={13} /> Live demo
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border-line px-4 py-2 text-[12px] font-semibold text-ink hover:border-accent/40 hover:text-accent"
                >
                  <Github size={14} /> Source
                </a>
              </div>
            </motion.header>

            <motion.section {...fadeUp} className="mb-10">
              <ProjectGallery screenshots={project.screenshots} accent={project.accent} />
            </motion.section>

            <motion.section {...fadeUp} className="mb-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-border-line bg-surface/30 p-5">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">Problem</h2>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{detail.problem}</p>
              </div>
              <div className="rounded-xl border border-border-line bg-surface/30 p-5">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">Solution</h2>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{detail.solution}</p>
              </div>
            </motion.section>

            <motion.section {...fadeUp} className="mb-10">
              <h2 className="font-display text-xl font-bold text-ink">Key highlights</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {detail.highlights.map((h, i) => (
                  <motion.div
                    key={h.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -3 }}
                    className="rounded-xl border border-border-line bg-bg/40 p-4 transition-shadow hover:shadow-[0_16px_40px_-28px_var(--color-accent-glow)]"
                  >
                    <h3 className="font-display text-sm font-bold text-ink">{h.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{h.body}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section {...fadeUp} className="mb-10">
              <h2 className="font-display text-xl font-bold text-ink">Architecture</h2>
              <ul className="mt-4 space-y-2">
                {detail.architecture.map((line) => (
                  <li key={line} className="flex gap-2 text-[13px] text-ink-soft">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {line}
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.section {...fadeUp} className="mb-10">
              <h2 className="font-display text-xl font-bold text-ink">Tech stack</h2>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border-line bg-bg/50 px-2.5 py-1 font-mono text-[11px] text-ink-soft"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.section>

            <motion.section {...fadeUp} className="mb-12">
              <h2 className="font-display text-xl font-bold text-ink">Deployment & links</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {detail.deployment.map((d) => (
                  <a
                    key={d.href}
                    href={d.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-border-line px-3 py-1.5 font-mono text-[11px] text-ink-soft transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    {d.label} <ExternalLink size={11} />
                  </a>
                ))}
              </div>
            </motion.section>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-10 lg:mt-0"
          >
            <ProjectAgent project={project} />
          </motion.aside>
        </div>
      </div>
    </main>
  );
}
