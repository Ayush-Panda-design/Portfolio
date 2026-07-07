import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRightIcon as ArrowUpRight,
  ExternalLinkIcon as ExternalLink,
  ChevronDownIcon as ChevronDown,
  ShieldCheckIcon as ShieldCheck,
  BookOpenIcon as BookOpen,
} from "lucide-react";
import { Github } from "./icons";
import { SectionLabel } from "./SectionLabel";
import { TextGenerate } from "./effects/TextGenerate";
import { SpotlightCard } from "./effects/Spotlight";
import { ProjectCover, ProjectGallery } from "./ProjectGallery";
import { PRODUCTION } from "@/data/projects";
import { cn } from "@/lib/utils";

const ACCENT: Record<string, { bar: string; badge: string; glow: string }> = {
  teal: {
    bar: "from-accent/40 via-sky-500/20 to-transparent",
    badge: "border-accent/30 bg-accent/10 text-accent",
    glow: "hover:shadow-[0_24px_48px_-28px_rgba(94,234,212,0.5)]",
  },
  violet: {
    bar: "from-violet-400/40 via-fuchsia-500/15 to-transparent",
    badge: "border-violet-400/30 bg-violet-400/10 text-violet-300",
    glow: "hover:shadow-[0_24px_48px_-28px_rgba(167,139,250,0.5)]",
  },
  amber: {
    bar: "from-amber-400/35 via-orange-500/15 to-transparent",
    badge: "border-amber-400/30 bg-amber-400/10 text-amber-200",
    glow: "hover:shadow-[0_24px_48px_-28px_rgba(251,191,36,0.45)]",
  },
  pink: {
    bar: "from-pink-400/35 via-rose-500/15 to-transparent",
    badge: "border-pink-400/30 bg-pink-400/10 text-pink-200",
    glow: "hover:shadow-[0_24px_48px_-28px_rgba(244,114,182,0.45)]",
  },
};

export function Projects() {
  const [openId, setOpenId] = useState<string | null>(PRODUCTION[0].id);

  return (
    <section id="projects" className="scroll-mt-24 border-t border-border-line pt-14 lg:pt-16">
      <div className="mb-2 flex items-center gap-2">
        <ShieldCheck size={14} className="text-accent" />
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          Production grade
        </span>
      </div>
      <SectionLabel num="01.">Shipped products</SectionLabel>
      <h2 className="font-display text-2xl font-bold leading-snug tracking-tight text-ink sm:text-3xl">
        <TextGenerate words="Real systems, unique features, live users." />
      </h2>
      <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
        End-to-end products with auth, data models, realtime, and deploy — not tutorial clones.
      </p>

      <div className="mt-8 space-y-4">
        {PRODUCTION.map((p, i) => {
          const open = openId === p.id;
          const a = ACCENT[p.accent] ?? ACCENT.teal;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -2 }}
            >
              <SpotlightCard className={cn("transition-shadow duration-500", a.glow)}>
                <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br", a.bar)} />
                {p.screenshots[0] && !open && (
                  <ProjectCover shot={p.screenshots[0]} accent={p.accent} />
                )}
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : p.id)}
                  className="relative w-full p-5 text-left sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[11px] text-ink-faint">{p.num}</span>
                        <span className={cn("rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider", a.badge)}>
                          {p.tag}
                        </span>
                      </div>
                      <h3 className="mt-2 font-display text-xl font-bold text-ink sm:text-2xl">{p.title}</h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{p.summary}</p>
                    </div>
                    <motion.span
                      animate={{ rotate: open ? 180 : 0 }}
                      className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border-line bg-bg/70 text-accent"
                    >
                      <ChevronDown size={15} />
                    </motion.span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 5).map((s) => (
                      <span key={s} className="rounded-full border border-border-line/80 bg-bg/50 px-2.5 py-1 font-mono text-[10px] text-ink-soft">
                        {s}
                      </span>
                    ))}
                    {p.stack.length > 5 && (
                      <span className="px-1 font-mono text-[10px] text-ink-faint">+{p.stack.length - 5}</span>
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32 }}
                      className="relative overflow-hidden"
                    >
                      <div className="border-t border-border-line/70 px-5 pb-5 pt-4 sm:px-6">
                        <div className="mb-6">
                          <ProjectGallery screenshots={p.screenshots} accent={p.accent} />
                        </div>
                        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                          Unique features
                        </p>
                        <ul className="space-y-2">
                          {p.features.map((f) => (
                            <li key={f} className="flex gap-2 text-[13px] text-ink-soft">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5 flex flex-wrap gap-2">
                          <Link
                            to="/projects/$projectId"
                            params={{ projectId: p.id }}
                            className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-[12px] font-semibold text-accent transition-colors hover:bg-accent/20"
                          >
                            <BookOpen size={13} /> Case study & AI guide
                          </Link>
                          {p.live && (
                            <a
                              href={p.live}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[12px] font-semibold text-primary-foreground hover:bg-accent-hover"
                            >
                              <ExternalLink size={13} /> Live
                            </a>
                          )}
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-border-line px-4 py-2 text-[12px] font-semibold text-ink hover:border-accent/40 hover:text-accent"
                          >
                            <Github size={14} /> Source <ArrowUpRight size={12} />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
