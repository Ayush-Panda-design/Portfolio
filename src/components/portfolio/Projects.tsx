import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PlusIcon as Plus, XIcon as X, ArrowUpRightIcon as ArrowUpRight } from "lucide-react";
import { SectionLabel } from "./SectionLabel";

type Project = {
  num: string;
  title: string;
  tag: string;
  stack: string[];
  description: string;
  links?: { label: string; href: string }[];
  comingSoon?: boolean;
};

const PROJECTS: Project[] = [
  {
    num: "01",
    title: "Edinform",
    tag: "Live Product",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Drizzle ORM", "Tailwind"],
    description:
      "[TODO: write Edinform description — what it does, what problem it solves, what you owned end-to-end.]",
    links: [{ label: "Visit Site", href: "https://edinform.in" }],
  },
  {
    num: "02",
    title: "Votora",
    tag: "Full-Stack",
    stack: ["React", "Express", "WebSockets", "PostgreSQL", "Redis", "Docker"],
    description:
      "[TODO: write Votora description — realtime architecture, Redis pub/sub, scaling story.]",
    links: [
      { label: "Visit site", href: "https://votora-client-jaam.vercel.app/poll/7C5D4BCD" },
     
    ],
  },
  {
    num: "03",
    title: "Coming Soon",
    tag: "In Progress",
    stack: [],
    description: "",
    comingSoon: true,
  },
];

function Card({ p, i }: { p: Project; i: number }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  if (p.comingSoon) {
    return (
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: i * 0.1 }}
        className="flex min-h-[260px] flex-col items-center justify-center p-8 text-center"
        style={{ border: "2px dashed #c8430f55", borderRadius: 4, background: "transparent" }}
      >
        <div className="font-serif text-7xl text-[color:#c8430f]" style={{ opacity: 0.25 }}>
          {p.num}
        </div>
        <div className="mt-4 font-serif text-2xl text-[color:#1a1410]">Coming Soon</div>
        <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:#a89880]">
          Something new in the oven
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setOpen((v) => !v)}
      className="relative cursor-pointer p-8 transition-shadow"
      style={{
        background: "#faf8f5",
        border: "1px solid #e8e0d5",
        borderRadius: 4,
        transform: hover
          ? "perspective(1000px) rotateX(2deg) rotateY(-3deg) translateY(-4px)"
          : "perspective(1000px) rotateX(0) rotateY(0)",
        transition: "transform .5s ease, box-shadow .3s ease",
        boxShadow: hover ? "0 30px 60px -30px #1a141033" : "none",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 transition-all"
        style={{ height: hover ? 3 : 1, background: hover ? "#c8430f" : "#e8e0d5" }}
      />
      <motion.div layout="position" className="flex items-start justify-between gap-4">
        <div>
          <div className="font-serif text-7xl" style={{ color: "#c8430f", opacity: 0.18 }}>
            {p.num}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ padding: "4px 10px", border: "1px solid #c8430f", color: "#c8430f" }}
            >
              {p.tag}
            </span>
          </div>
          <h3 className="mt-4 font-serif text-4xl text-[color:#1a1410]">{p.title}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span key={s} className="font-mono text-[11px] text-[color:#6b5c4a]">
                {s}
              </span>
            )).reduce<React.ReactNode[]>((acc, el, idx) => {
              if (idx > 0) acc.push(<span key={`d${idx}`} className="text-[color:#c8430f]">·</span>);
              acc.push(el);
              return acc;
            }, [])}
          </div>
        </div>
        <motion.span animate={{ rotate: open ? 45 : 0 }} className="text-[color:#c8430f]">
          {open ? <X size={20} /> : <Plus size={20} />}
        </motion.span>
      </motion.div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <p className="mt-6 font-sans text-[14px] leading-[1.8] text-[color:#6b5c4a]">
              {p.description}
            </p>
            {p.links && (
              <div className="mt-6 flex flex-wrap gap-4">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="link-hover-draw inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.2em]"
                    style={{ color: "#c8430f" }}
                  >
                    {l.label} <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 lg:py-32" style={{ background: "#f0ece5" }}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <SectionLabel>SELECTED&nbsp;WORK</SectionLabel>
        <motion.h2
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-[820px] font-serif text-4xl leading-[1.1] text-[color:#1a1410] sm:text-5xl lg:text-[56px]"
        >
          Projects — <span className="italic">built, shipped, learned from.</span>
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Card key={p.num} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
