import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { m as motion, A as AnimatePresence, u as useScroll, a as useTransform, b as useMotionValue, c as useSpring, d as useInView } from "../_libs/framer-motion.mjs";
import { X, M as Menu, P as Plus, A as ArrowRight, a as Mail, b as ArrowUpRight } from "../_libs/lucide-react.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function Logo({ className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 60 60", className, fill: "none", stroke: "currentColor", strokeWidth: "1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M30 4 L56 30 L30 56 L4 30 Z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "30", y: "36", textAnchor: "middle", fontFamily: "Cormorant Garamond, serif", fontSize: "16", fill: "currentColor", stroke: "none", letterSpacing: "1", children: "AP" })
  ] });
}
function MagneticButton({
  children,
  className,
  href,
  onClick,
  strength = 0.35
}) {
  const ref = reactExports.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });
  const handleMove = (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  const Comp = href ? motion.a : motion.button;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      ref,
      href,
      onClick,
      onMouseMove: handleMove,
      onMouseLeave: reset,
      style: { x: sx, y: sy },
      className,
      children
    }
  );
}
const NAV = [
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
  { label: "BLOG", href: "#blog" },
  { label: "CONTACT", href: "#contact" }
];
function Navbar() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.header,
    {
      initial: { y: -80 },
      animate: { y: 0 },
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      className: "fixed inset-x-0 top-0 z-50",
      style: {
        background: scrolled ? "rgba(250,248,245,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #e8e0d5" : "1px solid transparent",
        transition: "background .3s, border-color .3s, backdrop-filter .3s"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", className: "flex items-center gap-3 text-[color:#1a1410]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { className: "h-9 w-9 text-[color:#1a1410]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden font-mono text-[11px] tracking-[0.25em] text-[color:#1a1410] sm:inline", children: "AYUSH PANDA" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-8 lg:flex", children: NAV.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: n.href,
              className: "link-hover-draw font-sans text-[11px] font-medium tracking-[0.22em] text-[color:#1a1410] hover:text-[color:#c8430f]",
              children: n.label
            },
            n.href
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MagneticButton,
              {
                href: "#contact",
                className: "hidden cursor-pointer items-center justify-center px-5 py-3 font-sans text-[11px] font-semibold tracking-[0.22em] text-[color:#faf8f5] transition-colors hover:brightness-110 md:inline-flex",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "block px-5 py-3 -mx-5 -my-3",
                    style: { background: "#c8430f", color: "#faf8f5" },
                    children: "LET'S WORK"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                "aria-label": "Menu",
                onClick: () => setOpen((v) => !v),
                className: "flex h-11 w-11 items-center justify-center text-[color:#1a1410] lg:hidden",
                children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 22 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 22 })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { y: -20, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: -20, opacity: 0 },
            className: "lg:hidden",
            style: { background: "#faf8f5", borderTop: "1px solid #e8e0d5" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex flex-col px-6 py-6", children: [
              NAV.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: n.href,
                  onClick: () => setOpen(false),
                  className: "border-b border-[color:#e8e0d5] py-4 font-sans text-[12px] tracking-[0.22em] text-[color:#1a1410]",
                  children: n.label
                },
                n.href
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "#contact",
                  onClick: () => setOpen(false),
                  className: "mt-6 inline-flex items-center justify-center px-5 py-4 font-sans text-[12px] font-semibold tracking-[0.22em]",
                  style: { background: "#c8430f", color: "#faf8f5" },
                  children: "LET'S WORK"
                }
              )
            ] })
          }
        ) })
      ]
    }
  );
}
const base = ({ size = 18, ...p }) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  ...p
});
const Github = (p) => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...base(p), children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" }) });
const Linkedin = (p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...base(p), children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "2", y: "9", width: "4", height: "12" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "4", cy: "4", r: "2" })
] });
const Twitter = (p) => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...base(p), children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M22 4.01s-2 .6-4 .9a4.5 4.5 0 0 0-7.7 4.1A12.7 12.7 0 0 1 1.7 3.2s-3.6 7.3 5.3 11.6c-2 1.4-4 1.8-6 1.4 8 4.6 18 0 18-10.5 0-.3 0-.6-.1-.9.9-.6 2-1.4 3.1-2.8z" }) });
const Hashnode = (p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...base(p), children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3 9v6a3 3 0 0 0 .9 2.1l4 4a3 3 0 0 0 2.1.9h4a3 3 0 0 0 2.1-.9l4-4A3 3 0 0 0 21 15V9a3 3 0 0 0-.9-2.1l-4-4A3 3 0 0 0 14 2h-4a3 3 0 0 0-2.1.9l-4 4A3 3 0 0 0 3 9z" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "3.5" })
] });
const TYPE_PHRASES = [
  "for startups.",
  "for product teams.",
  "for founders who ship.",
  "for companies that care about quality."
];
function Typewriter() {
  const [i, setI] = reactExports.useState(0);
  const [text, setText] = reactExports.useState("");
  const [deleting, setDeleting] = reactExports.useState(false);
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-serif text-2xl text-[color:#1a1410] md:text-3xl", children: [
    text,
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "cursor-blink ml-0.5 inline-block", style: { color: "#c8430f" }, children: "|" })
  ] });
}
function Hero() {
  const ref = reactExports.useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -180]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      ref,
      className: "relative overflow-hidden pt-28 lg:pt-32",
      style: { background: "#faf8f5" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 pb-12 lg:grid-cols-[52fr_48fr] lg:gap-0 lg:px-12 lg:pb-24 lg:pt-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "order-2 lg:order-1 lg:pr-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h1,
            {
              initial: { y: 24, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              transition: { duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
              className: "font-serif text-[44px] leading-[1.05] text-[color:#1a1410] sm:text-6xl lg:text-[72px]",
              children: "Full-Stack Web Developer"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { y: 24, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              transition: { duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] },
              className: "mt-3 font-serif text-3xl italic text-[color:#1a1410] sm:text-4xl lg:text-[48px]",
              children: "& Production-Grade Apps"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "100%", height: "2", viewBox: "0 0 600 2", preserveAspectRatio: "none", className: "mt-10 block max-w-[420px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.line,
            {
              x1: "0",
              y1: "1",
              x2: "600",
              y2: "1",
              stroke: "#1a1410",
              strokeWidth: "1",
              initial: { pathLength: 0 },
              animate: { pathLength: 1 },
              transition: { duration: 1.1, delay: 0.5, ease: "easeInOut" }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.6 }, className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Typewriter, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { y: 18, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              transition: { duration: 0.7, delay: 0.8 },
              className: "mt-8 max-w-[520px] font-sans text-[15px] leading-[1.7] text-[color:#6b5c4a]",
              children: "I'm Ayush Panda — a CS undergrad at VSSUT (4th semester, CGPA 8.27) building real, shipped products. Let's craft something performant, typed end-to-end, and worth using."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { y: 18, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              transition: { duration: 0.7, delay: 0.85 },
              className: "mt-10 flex items-end gap-6 sm:gap-10",
              children: [
                { n: "3+", l: "Projects" },
                { n: "8.27", l: "CGPA" },
                { n: "4th", l: "Semester" }
              ].map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-6 sm:gap-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif text-3xl text-[color:#1a1410] sm:text-4xl", children: s.n }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:#a89880]", children: s.l })
                ] }),
                idx < 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-px bg-[color:#e8e0d5]" })
              ] }, s.l))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { y: 18, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              transition: { duration: 0.7, delay: 1 },
              className: "mt-10 flex flex-wrap items-center gap-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#projects", className: "link-hover-draw font-sans text-[12px] font-semibold uppercase tracking-[0.2em]", style: { color: "#c8430f" }, children: "VIEW MY PROJECTS →" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#contact", className: "link-hover-draw font-sans text-[12px] font-semibold uppercase tracking-[0.2em]", style: { color: "#c8430f" }, children: "LET'S CONNECT →" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 1.1 },
              className: "mt-10 flex items-center gap-5 text-[color:#a89880]",
              children: [
                { icon: Github, href: "https://github.com/", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/", label: "LinkedIn" },
                { icon: Twitter, href: "https://twitter.com/", label: "Twitter" },
                { icon: Hashnode, href: "https://hashnode.com/", label: "Hashnode" }
              ].map(({ icon: Icon, href, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href, target: "_blank", rel: "noreferrer", "aria-label": label, className: "transition-colors hover:text-[color:#c8430f]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18, strokeWidth: 1.5 }) }, label))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { x: 60, opacity: 0 },
            animate: { x: 0, opacity: 1 },
            transition: { duration: 0.9, delay: 1, ease: [0.22, 1, 0.36, 1] },
            className: "order-1 lg:order-2 relative",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                style: { y },
                className: "relative h-[420px] sm:h-[520px] lg:h-[640px] lg:-mr-[max(0px,calc((100vw-1400px)/2))]",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: "https://i.ibb.co/sYzb6rs/Gemini-Generated-Image-b7cnr4b7cnr4b7cn.png",
                    alt: "Ayush Panda holding a laptop",
                    width: 1024,
                    height: 1024,
                    className: "hero-mask absolute inset-0 h-full w-full object-cover object-top"
                  }
                )
              }
            )
          }
        )
      ] })
    }
  );
}
const TECH = ["React", "Next.js", "Node.js", "PostgreSQL", "Docker", "TypeScript", "Redis"];
function TrustBar() {
  const items = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-10 px-6 whitespace-nowrap", children: TECH.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[12px] tracking-[0.2em] text-[color:#a89880]", children: t }),
    i < TECH.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full", style: { background: "#c8430f" } })
  ] }, `${t}-${i}`)) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { style: { background: "#2a2118" }, className: "h-[72px] overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden h-full items-center justify-center md:flex", children: items }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full items-center md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "marquee flex", children: [
      items,
      items
    ] }) })
  ] });
}
function SectionLabel({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] tracking-[0.3em]", style: { color: "#c8430f" }, children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px flex-1 max-w-[120px]", style: { background: "#c8430f", opacity: 0.4 } })
  ] });
}
function Counter({ value, decimals = 0, suffix = "" }) {
  const ref = reactExports.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const sv = useSpring(mv, { duration: 1.2 });
  const [display, setDisplay] = reactExports.useState("0");
  reactExports.useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, value, mv]);
  reactExports.useEffect(() => sv.on("change", (v) => setDisplay(v.toFixed(decimals))), [sv, decimals]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { ref, children: [
    display,
    suffix
  ] });
}
const CARDS = [
  { kind: "text", title: "4th Semester", body: "Currently in my 4th semester of B.Tech Computer Science & Engineering at VSSUT, Burla — focused on systems, databases and modern web.", value: 0, decimals: 0, suffix: "" },
  { kind: "num", value: 8.27, decimals: 2, suffix: "", title: "CGPA", body: "Maintaining a consistent CGPA of 8.27 while shipping side projects and contributing to open-source learning." },
  { kind: "num", value: 3, decimals: 0, suffix: "+", title: "Projects Shipped", body: "Built and deployed real, end-to-end applications with production concerns: auth, rate limiting, caching, CI/CD." },
  { kind: "text", title: "Open to Work", body: "Actively looking for internships and collaborative projects where I can ship serious software with serious teams.", value: 0, decimals: 0, suffix: "" }
];
function About() {
  const [open, setOpen] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "about", className: "py-24 lg:py-32", style: { background: "#f0ece5" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1400px] px-6 lg:px-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "ABOUT ME" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.h2,
      {
        initial: { y: 24, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.7 },
        className: "max-w-[820px] font-serif text-4xl leading-[1.1] text-[color:#1a1410] sm:text-5xl lg:text-[64px]",
        children: [
          "Building real software,",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", children: "not just side projects." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { y: 18, opacity: 0 },
          whileInView: { y: 0, opacity: 1 },
          viewport: { once: true },
          transition: { duration: 0.7, delay: 0.1 },
          className: "space-y-5 font-sans text-[15px] leading-[1.8] text-[color:#6b5c4a]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "I'm a Computer Science undergrad at ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:#1a1410]", children: "VSSUT, Burla" }),
              ", currently in my 4th semester. My focus is full-stack web development with a strong bias toward type-safety, sensible architecture and shipping things that actually run in production."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Most of my time goes into building products end-to-end — designing the data model, writing the API, shipping the frontend, and wiring up the infra. I care about performance, DX, and details." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "I'm currently open to ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:#c8430f]", children: "internships and freelance collaborations" }),
              " ",
              "where I can contribute meaningfully and learn from people who've been doing this longer than me."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: CARDS.map((c, i) => {
        const isOpen = open === i;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            layout: true,
            onClick: () => setOpen(isOpen ? null : i),
            initial: { y: 24, opacity: 0 },
            whileInView: { y: 0, opacity: 1 },
            viewport: { once: true, margin: "-60px" },
            transition: { duration: 0.5, delay: i * 0.08 },
            whileHover: { y: -4 },
            className: "group text-left p-6 transition-colors",
            style: {
              background: "#faf8f5",
              border: `1px solid ${isOpen ? "#c8430f" : "#e8e0d5"}`,
              borderRadius: 4
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { layout: "position", className: "flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif text-3xl text-[color:#1a1410]", children: c.kind === "num" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { value: c.value, decimals: c.decimals, suffix: c.suffix ?? "" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-mono uppercase tracking-[0.18em] text-[color:#6b5c4a]", children: c.title }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { animate: { rotate: isOpen ? 45 : 0 }, className: "text-[color:#c8430f]", children: isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 18 }) })
              ] }),
              c.kind === "num" && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { layout: "position", className: "mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:#a89880]", children: c.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  initial: { opacity: 0, height: 0 },
                  animate: { opacity: 1, height: "auto" },
                  exit: { opacity: 0, height: 0 },
                  transition: { duration: 0.3 },
                  className: "mt-4 font-sans text-[13px] leading-[1.7] text-[color:#6b5c4a]",
                  children: c.body
                }
              ) })
            ]
          },
          c.title
        );
      }) })
    ] })
  ] }) });
}
const GROUPS = [
  { label: "Fundamentals", items: ["HTML", "CSS", "JavaScript", "TypeScript"] },
  { label: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  { label: "Backend", items: ["Node.js", "Express", "REST API", "tRPC", "WebSockets"] },
  { label: "Databases", items: ["PostgreSQL", "MongoDB", "SQLite", "Redis", "Drizzle ORM"] },
  { label: "DevOps", items: ["Docker", "CI/CD", "Turborepo", "Git"] },
  { label: "Auth & Security", items: ["OpenID Connect", "Rate Limiting"] }
];
function Skills() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "skills", className: "py-24 lg:py-32", style: { background: "#faf8f5" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1400px] px-6 lg:px-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "SKILLS & STACK" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.h2,
      {
        initial: { y: 24, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.7 },
        className: "max-w-[820px] font-serif text-4xl leading-[1.1] text-[color:#1a1410] sm:text-5xl lg:text-[56px]",
        children: [
          "A toolkit chosen for ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", children: "shipping" }),
          "."
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 space-y-10", children: GROUPS.map((g, gi) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 border-t border-[color:#e8e0d5] pt-8 lg:grid-cols-[220px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[color:#a89880]", children: [
        "0",
        gi + 1,
        " / ",
        g.label
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: g.items.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.span,
        {
          initial: { x: -20, opacity: 0 },
          whileInView: { x: 0, opacity: 1 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.45, delay: i * 0.04 },
          whileHover: { y: -2 },
          className: "cursor-default font-mono text-[12px] tracking-[0.06em] transition-colors",
          style: {
            padding: "8px 14px",
            background: "#faf8f5",
            border: "1px solid #c8430f33",
            color: "#1a1410",
            borderRadius: 999
          },
          onMouseEnter: (e) => {
            e.currentTarget.style.background = "#c8430f";
            e.currentTarget.style.color = "#faf8f5";
            e.currentTarget.style.boxShadow = "0 6px 20px -8px #c8430f88";
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.background = "#faf8f5";
            e.currentTarget.style.color = "#1a1410";
            e.currentTarget.style.boxShadow = "none";
          },
          children: s
        },
        s
      )) })
    ] }, g.label)) })
  ] }) });
}
const PROJECTS = [
  {
    num: "01",
    title: "Edinform",
    tag: "Live Product",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Drizzle ORM", "Tailwind"],
    description: "[TODO: write Edinform description — what it does, what problem it solves, what you owned end-to-end.]",
    links: [{ label: "Visit Site", href: "https://edinform.in" }]
  },
  {
    num: "02",
    title: "Votora",
    tag: "Full-Stack",
    stack: ["React", "Express", "WebSockets", "PostgreSQL", "Redis", "Docker"],
    description: "[TODO: write Votora description — realtime architecture, Redis pub/sub, scaling story.]",
    links: [
      { label: "Visit site", href: "https://votora-client-jaam.vercel.app/poll/7C5D4BCD" }
    ]
  },
  {
    num: "03",
    title: "Coming Soon",
    tag: "In Progress",
    stack: [],
    description: "",
    comingSoon: true
  }
];
function Card({ p, i }) {
  const [open, setOpen] = reactExports.useState(false);
  const [hover, setHover] = reactExports.useState(false);
  if (p.comingSoon) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { y: 30, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.6, delay: i * 0.1 },
        className: "flex min-h-[260px] flex-col items-center justify-center p-8 text-center",
        style: { border: "2px dashed #c8430f55", borderRadius: 4, background: "transparent" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif text-7xl text-[color:#c8430f]", style: { opacity: 0.25 }, children: p.num }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 font-serif text-2xl text-[color:#1a1410]", children: "Coming Soon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:#a89880]", children: "Something new in the oven" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      layout: true,
      initial: { y: 30, opacity: 0 },
      whileInView: { y: 0, opacity: 1 },
      viewport: { once: true, margin: "-60px" },
      transition: { duration: 0.6, delay: i * 0.1 },
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      onClick: () => setOpen((v) => !v),
      className: "relative cursor-pointer p-8 transition-shadow",
      style: {
        background: "#faf8f5",
        border: "1px solid #e8e0d5",
        borderRadius: 4,
        transform: hover ? "perspective(1000px) rotateX(2deg) rotateY(-3deg) translateY(-4px)" : "perspective(1000px) rotateX(0) rotateY(0)",
        transition: "transform .5s ease, box-shadow .3s ease",
        boxShadow: hover ? "0 30px 60px -30px #1a141033" : "none"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-x-0 top-0 transition-all",
            style: { height: hover ? 3 : 1, background: hover ? "#c8430f" : "#e8e0d5" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { layout: "position", className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif text-7xl", style: { color: "#c8430f", opacity: 0.18 }, children: p.num }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-mono text-[10px] uppercase tracking-[0.22em]",
                style: { padding: "4px 10px", border: "1px solid #c8430f", color: "#c8430f" },
                children: p.tag
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-serif text-4xl text-[color:#1a1410]", children: p.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: p.stack.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-[color:#6b5c4a]", children: s }, s)).reduce((acc, el, idx) => {
              if (idx > 0) acc.push(/* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:#c8430f]", children: "·" }, `d${idx}`));
              acc.push(el);
              return acc;
            }, []) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { animate: { rotate: open ? 45 : 0 }, className: "text-[color:#c8430f]", children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 20 }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            transition: { duration: 0.35 },
            className: "overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 font-sans text-[14px] leading-[1.8] text-[color:#6b5c4a]", children: p.description }),
              p.links && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-wrap gap-4", children: p.links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: l.href,
                  target: "_blank",
                  rel: "noreferrer",
                  onClick: (e) => e.stopPropagation(),
                  className: "link-hover-draw inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.2em]",
                  style: { color: "#c8430f" },
                  children: [
                    l.label,
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 14 })
                  ]
                },
                l.href
              )) })
            ]
          }
        ) })
      ]
    }
  );
}
function Projects() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "projects", className: "py-24 lg:py-32", style: { background: "#f0ece5" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1400px] px-6 lg:px-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "SELECTED WORK" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.h2,
      {
        initial: { y: 24, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.7 },
        className: "max-w-[820px] font-serif text-4xl leading-[1.1] text-[color:#1a1410] sm:text-5xl lg:text-[56px]",
        children: [
          "Projects — ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", children: "built, shipped, learned from." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3", children: PROJECTS.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p, i }, p.num)) })
  ] }) });
}
const POSTS = [
  {
    date: "2026 · 05 · 10",
    title: "Setting Up Your First Node.js Application Step-by-Step",
    tag: "Node.js",
    url: "https://stngndjs.hashnode.dev/setting-up-your-first-node-js-application-step-by-step"
    // REPLACE # WITH YOUR ACTUAL LINK
  },
  {
    date: "2026 · 05 · 10",
    title: "JWT Authentication in Node.js Explained Simply",
    tag: "Security",
    url: "https://jwtauthndjs.hashnode.dev/jwt-authentication-in-node-js-explained-simply"
    // REPLACE # WITH YOUR ACTUAL LINK
  },
  {
    date: "2026 · 04 · 3",
    title: "Understanding Callback Functions in JavaScript (A Complete Beginner Guide)",
    tag: "JavaScript",
    url: "https://cbijs.hashnode.dev/understanding-callback-functions-in-javascript-a-complete-beginner-guide/"
    // REPLACE # WITH YOUR ACTUAL LINK
  },
  {
    date: "2026 · 05 · 9",
    title: "Sessions vs JWT vs Cookies: Understanding Authentication Approaches",
    tag: "Architecture",
    url: "https://sesca.hashnode.dev/sessions-vs-jwt-vs-cookies-understanding-authentication-approaches"
    // REPLACE # WITH YOUR ACTUAL LINK
  }
];
function Blog() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "blog", className: "py-24 lg:py-32", style: { background: "#faf8f5" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1400px] px-6 lg:px-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "JOURNAL" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.h2,
      {
        initial: { y: 24, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.7 },
        className: "max-w-[820px] font-serif text-4xl leading-[1.1] text-[color:#1a1410] sm:text-5xl lg:text-[56px]",
        children: [
          "Observations from the  ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", children: "build." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 border-t border-[color:#e8e0d5]", children: POSTS.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.a,
      {
        href: p.url,
        initial: { y: 16, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.5, delay: i * 0.06 },
        className: "group flex items-center gap-4 border-b border-[color:#e8e0d5] py-6 sm:py-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden w-[140px] shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:#a89880] sm:block", children: p.date }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-[0.18em] text-[color:#a89880] sm:hidden", children: p.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 font-serif text-2xl text-[color:#1a1410] transition-colors group-hover:text-[color:#c8430f] sm:mt-0 sm:text-3xl", children: p.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden items-center gap-6 md:flex", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-mono text-[10px] uppercase tracking-[0.22em]",
                style: { padding: "4px 10px", border: "1px solid #e8e0d5", color: "#6b5c4a" },
                children: p.tag
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.2em] opacity-0 transition-all -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0",
                style: { color: "#c8430f" },
                children: [
                  "Read more ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
                ]
              }
            )
          ] })
        ]
      },
      p.title
    )) })
  ] }) });
}
const EMAIL = "pandaayush25305@gmail.com";
function Contact() {
  const [toast, setToast] = reactExports.useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setToast(true);
      setTimeout(() => setToast(false), 2400);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "contact", className: "py-24 lg:py-32", style: { background: "#f0ece5" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[900px] px-6 text-center lg:px-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "GET IN TOUCH" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.h2,
        {
          initial: { y: 24, opacity: 0 },
          whileInView: { y: 0, opacity: 1 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.7 },
          className: "font-serif text-4xl leading-[1.05] text-[color:#1a1410] sm:text-5xl lg:text-[64px]",
          children: [
            "Let's build something ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", children: "together." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-6 max-w-[620px] font-sans text-[15px] leading-[1.8] text-[color:#6b5c4a]", children: "Open to internships, freelance collaborations, and serious side projects. If you're building something that needs typed APIs, careful UI work, or someone who cares about the details — let's talk." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: copy,
          className: "mt-10 inline-flex items-center gap-3 px-7 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.22em] transition-colors hover:brightness-110",
          style: { background: "#c8430f", color: "#faf8f5" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 16 }),
            " ",
            EMAIL
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex items-center justify-center gap-6 text-[color:#a89880]", children: [
        { icon: Github, href: "https://github.com/Ayush-Panda-design" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/ayush-panda-a04280215/" },
        { icon: Twitter, href: "https://x.com/AyushPanda85699" },
        { icon: Hashnode, href: "https://hashnode.com/@Ayush-Panda" }
      ].map(({ icon: Icon, href }, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href, target: "_blank", rel: "noreferrer", className: "transition-colors hover:text-[color:#c8430f]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 20, strokeWidth: 1.5 }) }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: toast && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { y: 30, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 30, opacity: 0 },
        className: "fixed bottom-8 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-3 px-5 py-3",
        style: { background: "#faf8f5", border: "1px solid #e8e0d5", color: "#1a1410" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full", style: { background: "#3aa55c" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[12px] tracking-[0.1em]", children: "Email copied to clipboard" })
        ]
      }
    ) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { style: { background: "#1a1410", color: "#a89880" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 py-16 sm:grid-cols-3 lg:px-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-[color:#faf8f5]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { className: "h-9 w-9 text-[color:#faf8f5]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] tracking-[0.25em]", children: "AYUSH PANDA" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-[300px] font-sans text-[13px] leading-[1.7]", children: "Full-stack developer, CS undergrad at VSSUT. Building real, typed, shipped products." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[color:#faf8f5]", children: "Navigation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-5 space-y-3 font-sans text-[13px]", children: ["About", "Skills", "Projects", "Blog", "Contact"].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `#${l.toLowerCase()}`, className: "transition-colors hover:text-[color:#c8430f]", children: l }) }, l)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[11px] uppercase tracking-[0.22em] text-[color:#faf8f5]", children: "Elsewhere" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-5 space-y-3 font-sans text-[13px]", children: [
          { l: "GitHub", h: "https://github.com/" },
          { l: "LinkedIn", h: "https://linkedin.com/" },
          { l: "Twitter / X", h: "https://twitter.com/" },
          { l: "Hashnode", h: "https://hashnode.com/" }
        ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: s.h, target: "_blank", rel: "noreferrer", className: "transition-colors hover:text-[color:#c8430f]", children: s.l }) }, s.l)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-[color:#2a2118]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-2 px-6 py-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:#6b5c4a] sm:flex-row sm:items-center lg:px-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Built by Ayush Panda · 2025" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Crafted with care · No templates" })
    ] }) })
  ] });
}
function Cursor() {
  const dot = reactExports.useRef(null);
  const ring = reactExports.useRef(null);
  const [hovering, setHovering] = reactExports.useState(false);
  const [enabled, setEnabled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    setEnabled(true);
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
    };
    const onOver = (e) => {
      const t = e.target;
      setHovering(!!t.closest("a, button, [data-cursor='hover']"));
    };
    let raf = 0;
    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);
  if (!enabled) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: dot,
        className: "pointer-events-none fixed left-0 top-0 z-[100] hidden h-2 w-2 md:block",
        style: {
          background: "#c8430f",
          mixBlendMode: "multiply",
          transition: hovering ? "width .25s, height .25s" : void 0
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: ring,
        className: "pointer-events-none fixed left-0 top-0 z-[100] hidden h-8 w-8 rounded-full md:block",
        style: {
          border: "1px solid #c8430f",
          mixBlendMode: "multiply",
          transform: "translate3d(-100px,-100px,0)",
          transition: "width .25s, height .25s, margin .25s",
          ...hovering ? { width: 56, height: 56, marginLeft: -12, marginTop: -12 } : {}
        }
      }
    )
  ] });
}
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { style: {
    background: "#faf8f5"
  }, className: "min-h-screen overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Cursor, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TrustBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(About, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skills, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Projects, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Blog, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Contact, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Index as component
};
