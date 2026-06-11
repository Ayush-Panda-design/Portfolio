import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Twitter, Hashnode } from "./icons";

const TYPE_PHRASES = [
  "for startups.",
  "for product teams.",
  "for founders who ship.",
  "for companies that care about quality.",
];

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
    <span className="font-serif text-2xl text-[color:#1a1410] md:text-3xl">
      {text}
      <span className="cursor-blink ml-0.5 inline-block" style={{ color: "#c8430f" }}>|</span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -180]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-28 lg:pt-32"
      style={{ background: "#faf8f5" }}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 pb-12 lg:grid-cols-[52fr_48fr] lg:gap-0 lg:px-12 lg:pb-24 lg:pt-12">
        {/* LEFT */}
        <div className="order-2 lg:order-1 lg:pr-10">
          <motion.h1
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[44px] leading-[1.05] text-[color:#1a1410] sm:text-6xl lg:text-[72px]"
          >
            Full-Stack Web Developer
          </motion.h1>
          <motion.p
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 font-serif text-3xl italic text-[color:#1a1410] sm:text-4xl lg:text-[48px]"
          >
            & Production-Grade Apps
          </motion.p>

          <svg width="100%" height="2" viewBox="0 0 600 2" preserveAspectRatio="none" className="mt-10 block max-w-[420px]">
            <motion.line
              x1="0" y1="1" x2="600" y2="1"
              stroke="#1a1410" strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, delay: 0.5, ease: "easeInOut" }}
            />
          </svg>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-6">
            <Typewriter />
          </motion.div>

          <motion.p
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-8 max-w-[520px] font-sans text-[15px] leading-[1.7] text-[color:#6b5c4a]"
          >
            I'm Ayush Panda — a CS undergrad at VSSUT (4th semester, CGPA 8.27) building real,
            shipped products. Let's craft something performant, typed end-to-end, and worth using.
          </motion.p>

          <motion.div
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-10 flex items-end gap-6 sm:gap-10"
          >
            {[
              { n: "3+", l: "Projects" },
              { n: "8.27", l: "CGPA" },
              { n: "4th", l: "Semester" },
            ].map((s, idx) => (
              <div key={s.l} className="flex items-end gap-6 sm:gap-10">
                <div>
                  <div className="font-serif text-3xl text-[color:#1a1410] sm:text-4xl">{s.n}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:#a89880]">
                    {s.l}
                  </div>
                </div>
                {idx < 2 && <div className="h-10 w-px bg-[color:#e8e0d5]" />}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="mt-10 flex flex-wrap items-center gap-8"
          >
            <a href="#projects" className="link-hover-draw font-sans text-[12px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#c8430f" }}>
              VIEW MY PROJECTS →
            </a>
            <a href="#contact" className="link-hover-draw font-sans text-[12px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#c8430f" }}>
              LET'S CONNECT →
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-10 flex items-center gap-5 text-[color:#a89880]"
          >
            {[
              { icon: Github, href: "https://github.com/", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/", label: "LinkedIn" },
              { icon: Twitter, href: "https://twitter.com/", label: "Twitter" },
              { icon: Hashnode, href: "https://hashnode.com/", label: "Hashnode" },
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="transition-colors hover:text-[color:#c8430f]">
                <Icon size={18} strokeWidth={1.5} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — photo */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 lg:order-2 relative"
        >
          <motion.div
            style={{ y }}
            className="relative h-[420px] sm:h-[520px] lg:h-[640px] lg:-mr-[max(0px,calc((100vw-1400px)/2))]"
          >
            <img
              src="https://i.ibb.co/sYzb6rs/Gemini-Generated-Image-b7cnr4b7cnr4b7cn.png"
              alt="Ayush Panda holding a laptop"
              width={1024}
              height={1024}
              className="hero-mask absolute inset-0 h-full w-full object-cover object-top"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}