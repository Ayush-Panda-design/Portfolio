import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MovingBorder } from "./effects/MovingBorder";
import { TextGenerate } from "./effects/TextGenerate";

const TYPE_PHRASES = [
  "for startups.",
  "for product teams.",
  "for founders who ship.",
  "for companies that care about quality.",
];

const AVATAR = "https://i.ibb.co/sYzb6rs/Gemini-Generated-Image-b7cnr4b7cnr4b7cn.png";

function Typewriter() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = TYPE_PHRASES[i];
    const speed = deleting ? 40 : 80;
    const t = setTimeout(() => {
      if (!deleting) {
        const next = full.slice(0, text.length + 1);
        setText(next);
        if (next === full) setTimeout(() => setDeleting(true), 1600);
      } else {
        const next = full.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setI((p) => (p + 1) % TYPE_PHRASES.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, i]);

  return (
    <span className="font-display text-lg text-ink-soft">
      Building {text}
      <span className="cursor-blink ml-0.5 inline-block text-accent">|</span>
    </span>
  );
}

export function Hero() {
  return (
    <section id="intro" className="pb-10">
      {/* Mobile-only identity + avatar */}
      <div className="mb-8 lg:hidden">
        <MovingBorder containerClassName="mb-4 inline-flex" className="px-3 py-1">
          <span className="font-mono text-[10px] tracking-[0.16em] text-accent">Open to work</span>
        </MovingBorder>
        <div className="flex items-start gap-4">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-accent/30">
            <img src={AVATAR} alt="Ayush Panda" className="h-full w-full object-cover object-top" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-ink">Ayush Panda</h1>
            <p className="mt-1 font-mono text-[12px] tracking-[0.12em] text-accent">Full-Stack Developer</p>
          </div>
        </div>
      </div>

      {/* Desktop avatar — sits above intro in the content column */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 hidden lg:block"
      >
        <div className="relative inline-block">
          <div className="absolute -inset-2 rounded-2xl bg-accent/10 blur-xl" />
          <div className="relative w-[200px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <img
              src={AVATAR}
              alt="Ayush Panda holding a laptop"
              width={400}
              height={500}
              className="aspect-[4/5] w-full object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/95 to-transparent px-3 pb-3 pt-8">
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-bg/70 px-2.5 py-1.5 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-accent">Available</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-mono text-[12px] tracking-[0.2em] text-accent"
      >
        Hi, I&apos;m Ayush —
      </motion.p>

      <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
        <TextGenerate words="I build production-grade full-stack web apps." />
      </h2>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-4">
        <Typewriter />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="mt-5 text-[15px] leading-[1.8] text-ink-soft"
      >
        CS undergrad at VSSUT (4th semester, CGPA 8.27). Focused on type-safe APIs, careful UI, and shipping
        software that actually runs in production.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-7 flex flex-wrap items-center gap-3"
      >
        <a
          href="#projects"
          className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-[13px] font-semibold text-primary-foreground transition-all hover:bg-accent-hover hover:shadow-[0_0_32px_-8px_var(--color-accent)]"
        >
          View projects
        </a>
        <a
          href="#learning"
          className="inline-flex items-center rounded-full border border-border-line px-5 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:border-accent/40 hover:text-accent"
        >
          Practice trail
        </a>
        <a
          href="#resume"
          className="inline-flex items-center rounded-full border border-border-line px-5 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:border-accent/40 hover:text-accent"
        >
          Download resume
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        className="mt-8 flex items-center gap-8"
      >
        {[
          { n: "20+", l: "Projects" },
          { n: "8.27", l: "CGPA" },
          { n: "4th", l: "Semester" },
        ].map((s) => (
          <div key={s.l}>
            <div className="font-display text-2xl font-bold text-ink">{s.n}</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">{s.l}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
