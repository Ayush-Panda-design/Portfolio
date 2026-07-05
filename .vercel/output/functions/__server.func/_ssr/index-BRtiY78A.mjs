import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { C as Canvas, u as useFrame } from "../_libs/react-three__fiber.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { m as motion, A as AnimatePresence, u as useMotionValue, a as useSpring, b as useInView, c as useTransform } from "../_libs/framer-motion.mjs";
import { X, M as Menu, P as Plus, N as Network, C as CodeXml, B as Braces, S as Server, a as PanelsTopLeft, L as Layers, b as Bot, c as Container, d as ChevronRight, A as ArrowUpRight, e as Mail } from "../_libs/lucide-react.mjs";
import { S as Stars, F as Float, a as Sphere, M as MeshDistortMaterial, T as Torus, O as Octahedron } from "../_libs/react-three__drei.mjs";
import "../_libs/three.mjs";
import "../_libs/zustand.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/scheduler.mjs";
import "../_libs/its-fine.mjs";
import "../_libs/react-use-measure.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/babel__runtime.mjs";
function Logo({ className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 60 60", className, fill: "none", stroke: "currentColor", strokeWidth: "1.2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "6", y: "6", width: "48", height: "48", rx: "12" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "text",
      {
        x: "30",
        y: "37",
        textAnchor: "middle",
        fontFamily: "Syne, system-ui, sans-serif",
        fontSize: "15",
        fontWeight: "700",
        fill: "currentColor",
        stroke: "none",
        letterSpacing: "1",
        children: "AP"
      }
    )
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
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Map", href: "#curriculum", id: "curriculum" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Blog", href: "#blog", id: "blog" },
  { label: "Contact", href: "#contact", id: "contact" }
];
function Navbar() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  const [active, setActive] = reactExports.useState("");
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  reactExports.useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.header,
    {
      initial: { y: -80 },
      animate: { y: 0 },
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      className: `fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "glass border-b border-border-line/80" : "border-b border-transparent bg-transparent"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", className: "group flex items-center gap-3 text-ink", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { className: "h-9 w-9 text-accent transition-transform duration-300 group-hover:scale-105" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden font-mono text-[11px] tracking-[0.22em] text-ink-soft sm:inline", children: "AYUSH PANDA" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-1 lg:flex", children: NAV.map((n) => {
            const isActive = active === n.id;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: n.href,
                className: `relative rounded-full px-4 py-2 font-sans text-[13px] font-medium transition-colors ${isActive ? "text-accent" : "text-ink-soft hover:text-ink"}`,
                children: [
                  isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.span,
                    {
                      layoutId: "nav-pill",
                      className: "absolute inset-0 rounded-full bg-accent/10",
                      transition: { type: "spring", stiffness: 380, damping: 30 }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative", children: n.label })
                ]
              },
              n.href
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MagneticButton,
              {
                href: "#contact",
                className: "hidden cursor-pointer items-center justify-center rounded-full md:inline-flex",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block rounded-full bg-accent px-5 py-2.5 font-sans text-[12px] font-semibold tracking-[0.08em] text-primary-foreground transition-colors hover:bg-accent-hover", children: "Let's work" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                "aria-label": "Menu",
                onClick: () => setOpen((v) => !v),
                className: "flex h-10 w-10 items-center justify-center rounded-full border border-border-line text-ink lg:hidden",
                children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 18 })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { y: -12, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: -12, opacity: 0 },
            className: "glass border-t border-border-line lg:hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex flex-col px-6 py-5", children: [
              NAV.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: n.href,
                  onClick: () => setOpen(false),
                  className: "border-b border-border-soft py-4 font-sans text-[14px] text-ink",
                  children: n.label
                },
                n.href
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "#contact",
                  onClick: () => setOpen(false),
                  className: "mt-5 inline-flex items-center justify-center rounded-full bg-accent px-5 py-3.5 font-sans text-[13px] font-semibold text-primary-foreground",
                  children: "Let's work"
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
function FloatingShapes() {
  const group = reactExports.useRef(null);
  const sphere = reactExports.useRef(null);
  const torus = reactExports.useRef(null);
  const octa = reactExports.useRef(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.08;
      group.current.rotation.x = Math.sin(t * 0.2) * 0.08;
    }
    if (sphere.current) sphere.current.rotation.y = t * 0.3;
    if (torus.current) {
      torus.current.rotation.x = t * 0.4;
      torus.current.rotation.y = t * 0.2;
    }
    if (octa.current) octa.current.rotation.z = t * 0.35;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { ref: group, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Float, { speed: 1.4, rotationIntensity: 0.6, floatIntensity: 1.2, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sphere, { ref: sphere, args: [1.1, 64, 64], position: [-0.2, 0.2, 0], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      MeshDistortMaterial,
      {
        color: "#5eead4",
        attach: "material",
        distort: 0.35,
        speed: 2,
        roughness: 0.2,
        metalness: 0.6,
        transparent: true,
        opacity: 0.85
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Float, { speed: 1.8, rotationIntensity: 1, floatIntensity: 1.5, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Torus, { ref: torus, args: [0.55, 0.18, 32, 64], position: [1.6, 0.9, -0.4], children: /* @__PURE__ */ jsxRuntimeExports.jsx("meshStandardMaterial", { color: "#38bdf8", metalness: 0.8, roughness: 0.2, emissive: "#0ea5e9", emissiveIntensity: 0.3 }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Float, { speed: 2, rotationIntensity: 1.2, floatIntensity: 1, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Octahedron, { ref: octa, args: [0.45, 0], position: [-1.5, -0.8, 0.5], children: /* @__PURE__ */ jsxRuntimeExports.jsx("meshStandardMaterial", { color: "#a78bfa", metalness: 0.7, roughness: 0.15, emissive: "#7c3aed", emissiveIntensity: 0.25 }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Float, { speed: 1.2, rotationIntensity: 0.4, floatIntensity: 0.8, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [1.2, -1.1, 0.3], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("icosahedronGeometry", { args: [0.35, 0] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meshStandardMaterial", { color: "#f472b6", metalness: 0.6, roughness: 0.25, emissive: "#db2777", emissiveIntensity: 0.2, wireframe: true })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Float, { speed: 1.6, rotationIntensity: 0.5, floatIntensity: 1.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [-1.3, 1.1, -0.6], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("boxGeometry", { args: [0.4, 0.4, 0.4] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meshStandardMaterial", { color: "#5eead4", metalness: 0.5, roughness: 0.3, wireframe: true })
    ] }) })
  ] });
}
function Scene() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.35 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("directionalLight", { position: [4, 4, 2], intensity: 1.2, color: "#e0f2fe" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [-3, 2, 2], intensity: 1.5, color: "#5eead4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [3, -2, -1], intensity: 1, color: "#818cf8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Stars, { radius: 40, depth: 30, count: 800, factor: 2.5, saturation: 0, fade: true, speed: 0.6 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingShapes, {})
  ] });
}
function HeroScene() {
  const [ready, setReady] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-sky-500/5" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Canvas,
    {
      camera: { position: [0, 0, 5], fov: 42 },
      dpr: [1, 1.5],
      gl: { antialias: true, alpha: true },
      style: { background: "transparent" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scene, {})
    }
  ) }) });
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function BackgroundBeams({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("pointer-events-none absolute inset-0 overflow-hidden", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        className: "absolute h-full w-full",
        width: "100%",
        height: "100%",
        viewBox: "0 0 696 316",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("g", { clipPath: "url(#clip)", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { filter: "url(#filter)", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                d: "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
                stroke: "url(#grad1)",
                strokeOpacity: "0.12",
                strokeWidth: "0.5"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                d: "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
                stroke: "url(#grad2)",
                strokeOpacity: "0.12",
                strokeWidth: "0.5"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                d: "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
                stroke: "url(#grad3)",
                strokeOpacity: "0.12",
                strokeWidth: "0.5"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                d: "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
                stroke: "url(#grad1)",
                strokeOpacity: "0.1",
                strokeWidth: "0.5"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                d: "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
                stroke: "url(#grad2)",
                strokeOpacity: "0.1",
                strokeWidth: "0.5"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                d: "M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
                stroke: "url(#grad3)",
                strokeOpacity: "0.1",
                strokeWidth: "0.5"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "grad1", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { stopColor: "#5eead4", stopOpacity: "0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0.5", stopColor: "#5eead4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "#38bdf8", stopOpacity: "0" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "grad2", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { stopColor: "#38bdf8", stopOpacity: "0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0.5", stopColor: "#818cf8" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "#5eead4", stopOpacity: "0" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "grad3", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { stopColor: "#a78bfa", stopOpacity: "0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0.5", stopColor: "#5eead4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "#38bdf8", stopOpacity: "0" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("filter", { id: "filter", x: "-50%", y: "-50%", width: "200%", height: "200%", children: /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "1" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("clipPath", { id: "clip", children: /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "696", height: "316", fill: "white" }) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg" })
  ] });
}
function Sparkles({ className, count = 40 }) {
  const [particles, setParticles] = reactExports.useState([]);
  reactExports.useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        delay: Math.random() * 4,
        dur: Math.random() * 3 + 2
      }))
    );
  }, [count]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("pointer-events-none absolute inset-0 overflow-hidden", className), children: particles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "absolute rounded-full bg-accent",
      style: {
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: p.size,
        height: p.size,
        opacity: 0,
        animation: `sparkle ${p.dur}s ease-in-out ${p.delay}s infinite`,
        boxShadow: "0 0 6px 1px rgba(94,234,212,0.6)"
      }
    },
    p.id
  )) });
}
function MovingBorder({
  children,
  className,
  containerClassName
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("relative inline-flex overflow-hidden rounded-full p-[1px]", containerClassName), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#5eead4_12%,#38bdf8_24%,transparent_36%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("relative rounded-full bg-bg", className), children })
  ] });
}
function TextGenerate({
  words,
  className,
  delay = 0
}) {
  const parts = words.split(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { className: cn("inline", className), children: parts.map((word, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.span,
    {
      initial: { opacity: 0, filter: "blur(8px)", y: 8 },
      whileInView: { opacity: 1, filter: "blur(0px)", y: 0 },
      viewport: { once: true },
      transition: { duration: 0.45, delay: delay + i * 0.05, ease: [0.22, 1, 0.36, 1] },
      className: "mr-[0.28em] inline-block",
      children: word
    },
    `${word}-${i}`
  )) });
}
const TYPE_PHRASES = [
  "for startups.",
  "for product teams.",
  "for founders who ship.",
  "for companies that care about quality."
];
const SOCIALS$1 = [
  { icon: Github, href: "https://github.com/Ayush-Panda-design", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ayush-panda-a04280215/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/AyushPanda85699", label: "Twitter" },
  { icon: Hashnode, href: "https://hashnode.com/@Ayush-Panda", label: "Hashnode" }
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-xl text-ink-soft md:text-2xl", children: [
    "Building ",
    text,
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "cursor-blink ml-0.5 inline-block text-accent", children: "|" })
  ] });
}
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative min-h-[100svh] overflow-hidden pt-24 lg:pt-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BackgroundBeams, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { count: 50 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(94,234,212,0.12),transparent_55%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 px-6 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4 lg:px-8 lg:pb-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 order-2 lg:order-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MovingBorder, { containerClassName: "mb-6 inline-flex", className: "px-4 py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] tracking-[0.18em] text-accent", children: "Open to internships & freelance" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.15 },
            className: "mb-4 font-mono text-[12px] tracking-[0.22em] text-accent",
            children: "Hi, I'm Ayush Panda"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-[42px] font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[68px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextGenerate, { words: "Full-Stack Web" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-accent via-sky-300 to-violet-300 bg-clip-text text-transparent", children: "Developer" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.45 },
            className: "mt-3 font-display text-2xl font-medium text-ink-soft sm:text-3xl",
            children: "& Production-Grade Apps"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.6 }, className: "mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Typewriter, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.75 },
            className: "mt-7 max-w-[520px] text-[15px] leading-[1.85] text-ink-soft",
            children: "CS undergrad at VSSUT (4th semester, CGPA 8.27) building real, shipped products — typed end-to-end, performant, and worth using."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.9 },
            className: "mt-8 flex items-end gap-6 sm:gap-8",
            children: [
              { n: "3+", l: "Projects" },
              { n: "8.27", l: "CGPA" },
              { n: "4th", l: "Semester" }
            ].map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-6 sm:gap-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl font-bold text-ink sm:text-4xl", children: s.n }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint", children: s.l })
              ] }),
              idx < 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-px bg-border-line" })
            ] }, s.l))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 1 },
            className: "mt-10 flex flex-wrap items-center gap-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "#projects",
                  className: "inline-flex items-center rounded-full bg-accent px-6 py-3 text-[13px] font-semibold text-primary-foreground transition-all hover:bg-accent-hover hover:shadow-[0_0_40px_-8px_var(--color-accent)]",
                  children: "View my projects"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "#curriculum",
                  className: "inline-flex items-center rounded-full border border-border-line px-6 py-3 text-[13px] font-semibold text-ink transition-colors hover:border-accent/40 hover:text-accent",
                  children: "Explore knowledge map"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 1.1 },
            className: "mt-10 flex items-center gap-3 text-ink-faint",
            children: SOCIALS$1.map(({ icon: Icon, href, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href,
                target: "_blank",
                rel: "noreferrer",
                "aria-label": label,
                className: "flex h-10 w-10 items-center justify-center rounded-full border border-border-line transition-all hover:border-accent/40 hover:text-accent hover:shadow-[0_0_20px_-8px_var(--color-accent)]",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16, strokeWidth: 1.5 })
              },
              label
            ))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.92 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.9, delay: 0.3 },
          className: "order-1 relative h-[340px] sm:h-[420px] lg:order-2 lg:h-[560px]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HeroScene, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-x-8 bottom-6 z-10 mx-auto max-w-sm rounded-2xl border border-white/10 bg-bg/70 px-4 py-3 backdrop-blur-md lg:inset-x-12", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-[0.2em] text-accent", children: "Interactive 3D" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-ink", children: "WebGL scene · React Three Fiber" })
            ] })
          ]
        }
      )
    ] })
  ] });
}
const TECH = ["React", "Next.js", "Node.js", "PostgreSQL", "Docker", "TypeScript", "Redis"];
function TrustBar() {
  const items = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-10 px-6 whitespace-nowrap", children: TECH.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[12px] tracking-[0.2em] text-ink-soft", children: t }),
    i < TECH.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-accent" })
  ] }, `${t}-${i}`)) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "h-[64px] overflow-hidden border-y border-border-line bg-bg-elevated", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden h-full items-center justify-center md:flex", children: items }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full items-center md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "marquee flex", children: [
      items,
      items
    ] }) })
  ] });
}
function SectionLabel({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] font-medium tracking-[0.28em] text-accent", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px max-w-[80px] flex-1 bg-accent/40" })
  ] });
}
function SpotlightCard({
  children,
  className
}) {
  const ref = reactExports.useRef(null);
  const [pos, setPos] = reactExports.useState({ x: 0, y: 0 });
  const [hover, setHover] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      onMouseMove: (e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      },
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      className: cn(
        "relative overflow-hidden rounded-2xl border border-border-line bg-surface",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pointer-events-none absolute -inset-px z-0 transition-opacity duration-300",
            style: {
              opacity: hover ? 1 : 0,
              background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(94,234,212,0.12), transparent 40%)`
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 h-full w-full", children })
      ]
    }
  );
}
function DnsDiagram() {
  const nodes = [
    { label: "Browser", x: 50, y: 12 },
    { label: "Resolver", x: 50, y: 32 },
    { label: "Root", x: 18, y: 55 },
    { label: "TLD", x: 50, y: 55 },
    { label: "Auth", x: 82, y: 55 },
    { label: "IP", x: 50, y: 82 }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-48 w-full overflow-hidden rounded-xl border border-border-line bg-bg/60 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 100 100", className: "h-full w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "dnsLine", x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#5eead4", stopOpacity: "0.8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#38bdf8", stopOpacity: "0.4" })
      ] }) }),
      [
        [50, 18, 50, 28],
        [50, 38, 18, 50],
        [50, 38, 50, 50],
        [50, 38, 82, 50],
        [18, 60, 50, 76],
        [50, 60, 50, 76],
        [82, 60, 50, 76]
      ].map(([x1, y1, x2, y2], i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.line,
        {
          x1,
          y1,
          x2,
          y2,
          stroke: "url(#dnsLine)",
          strokeWidth: "0.4",
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true },
          transition: { duration: 0.8, delay: i * 0.08 }
        },
        i
      )),
      nodes.map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.circle,
          {
            cx: n.x,
            cy: n.y,
            r: "5",
            fill: "#0f1629",
            stroke: "#5eead4",
            strokeWidth: "0.5",
            initial: { scale: 0 },
            whileInView: { scale: 1 },
            viewport: { once: true },
            transition: { delay: 0.2 + i * 0.08, type: "spring" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: n.x,
            y: n.y + 0.8,
            textAnchor: "middle",
            fill: "#94a3b8",
            fontSize: "3.2",
            fontFamily: "JetBrains Mono, monospace",
            children: n.label
          }
        )
      ] }, n.label))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-3 font-mono text-[10px] uppercase tracking-[0.16em] text-accent", children: "DNS resolution path" })
  ] });
}
function TcpHandshakeDiagram() {
  const steps = [
    { from: "Client", to: "Server", label: "SYN" },
    { from: "Server", to: "Client", label: "SYN-ACK" },
    { from: "Client", to: "Server", label: "ACK" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border-line bg-bg/60 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex justify-between font-mono text-[11px] text-ink-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-accent", children: "Client" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-sky-300", children: "Server" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: s.from === "Client" ? -20 : 20 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.15 },
        className: "flex items-center gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-px flex-1 ${s.from === "Client" ? "bg-gradient-to-r from-accent to-sky-400" : "bg-gradient-to-l from-accent to-sky-400"}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md border border-border-line bg-surface px-2 py-1 font-mono text-[10px] text-ink", children: s.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-px flex-1 ${s.from === "Client" ? "bg-gradient-to-r from-sky-400 to-transparent" : "bg-gradient-to-l from-sky-400 to-transparent"}` })
        ]
      },
      s.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint", children: "TCP three-way handshake" })
  ] });
}
function ClientServerDiagram() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border-line bg-bg/60 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_auto_1fr] items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "rounded-xl border border-accent/30 bg-accent/5 p-4 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-bold text-ink", children: "Client" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-mono text-[10px] text-ink-faint", children: "Browser · App" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { scaleX: 0 },
            whileInView: { scaleX: 1 },
            viewport: { once: true },
            className: "h-0.5 w-10 origin-left bg-gradient-to-r from-accent to-sky-400"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-accent", children: "HTTP" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { scaleX: 0 },
            whileInView: { scaleX: 1 },
            viewport: { once: true },
            className: "h-0.5 w-10 origin-right bg-gradient-to-l from-accent to-sky-400"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: 0.1 },
          className: "rounded-xl border border-sky-400/30 bg-sky-400/5 p-4 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-bold text-ink", children: "Server" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-mono text-[10px] text-ink-faint", children: "API · Host" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint", children: "Request → Response cycle" })
  ] });
}
function StackLayersDiagram() {
  const layers = [
    { label: "React / Next.js", color: "from-accent/30 to-accent/5" },
    { label: "Node.js / Express / tRPC", color: "from-sky-400/30 to-sky-400/5" },
    { label: "PostgreSQL · Redis · MongoDB", color: "from-violet-400/30 to-violet-400/5" },
    { label: "Docker · CI/CD · Cloud", color: "from-pink-400/30 to-pink-400/5" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: layers.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, x: -24 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true },
      transition: { delay: i * 0.1 },
      className: `rounded-xl border border-border-line bg-gradient-to-r ${l.color} px-4 py-3 font-mono text-[12px] text-ink`,
      children: l.label
    },
    l.label
  )) });
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
  {
    kind: "text",
    title: "4th Semester",
    body: "Currently in my 4th semester of B.Tech Computer Science & Engineering at VSSUT, Burla — focused on systems, databases and modern web.",
    value: 0,
    decimals: 0,
    suffix: ""
  },
  {
    kind: "num",
    value: 8.27,
    decimals: 2,
    suffix: "",
    title: "CGPA",
    body: "Maintaining a consistent CGPA of 8.27 while shipping side projects and contributing to open-source learning."
  },
  {
    kind: "num",
    value: 3,
    decimals: 0,
    suffix: "+",
    title: "Projects Shipped",
    body: "Built and deployed real, end-to-end applications with production concerns: auth, rate limiting, caching, CI/CD."
  },
  {
    kind: "text",
    title: "Open to Work",
    body: "Actively looking for internships and collaborative projects where I can ship serious software with serious teams.",
    value: 0,
    decimals: 0,
    suffix: ""
  }
];
function About() {
  const [open, setOpen] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "about", className: "relative overflow-hidden py-24 lg:py-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute left-0 top-1/3 h-[300px] w-[300px] rounded-full bg-sky-500/10 blur-[100px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-[1200px] px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "ABOUT ME" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "max-w-[820px] font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[52px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextGenerate, { words: "Building real software, not just side projects." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { y: 18, opacity: 0 },
              whileInView: { y: 0, opacity: 1 },
              viewport: { once: true },
              className: "space-y-5 text-[15px] leading-[1.85] text-ink-soft",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                  "I'm a Computer Science undergrad at ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-ink", children: "VSSUT, Burla" }),
                  ", currently in my 4th semester. My focus is full-stack web development with a strong bias toward type-safety, sensible architecture and shipping things that actually run in production."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Most of my time goes into building products end-to-end — designing the data model, writing the API, shipping the frontend, and wiring up the infra. I care about performance, DX, and details." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                  "I'm currently open to",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "internships and freelance collaborations" }),
                  " where I can contribute meaningfully and learn from people who've been doing this longer than me."
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StackLayersDiagram, {}) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: CARDS.map((c, i) => {
          const isOpen = open === i;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              layout: true,
              onClick: () => setOpen(isOpen ? null : i),
              initial: { y: 24, opacity: 0 },
              whileInView: { y: 0, opacity: 1 },
              viewport: { once: true },
              transition: { delay: i * 0.08 },
              whileHover: { y: -4 },
              className: "text-left",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                SpotlightCard,
                {
                  className: `h-full p-6 transition-colors ${isOpen ? "border-accent/50" : ""}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { layout: "position", className: "flex items-start justify-between gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl font-bold text-ink", children: c.kind === "num" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { value: c.value, decimals: c.decimals, suffix: c.suffix ?? "" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-ink-soft", children: c.title }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.span,
                        {
                          animate: { rotate: isOpen ? 45 : 0 },
                          className: "rounded-full bg-accent/10 p-1.5 text-accent",
                          children: isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 })
                        }
                      )
                    ] }),
                    c.kind === "num" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        layout: "position",
                        className: "mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint",
                        children: c.title
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.p,
                      {
                        initial: { opacity: 0, height: 0 },
                        animate: { opacity: 1, height: "auto" },
                        exit: { opacity: 0, height: 0 },
                        className: "mt-4 text-[13px] leading-[1.7] text-ink-soft",
                        children: c.body
                      }
                    ) })
                  ]
                }
              )
            },
            c.title
          );
        }) })
      ] })
    ] })
  ] });
}
const GROUPS = [
  { label: "Fundamentals", items: ["HTML", "CSS", "JavaScript", "TypeScript"], span: "md:col-span-2" },
  { label: "Frontend", items: ["React", "Next.js", "Tailwind CSS"], span: "" },
  { label: "Backend", items: ["Node.js", "Express", "REST API", "tRPC", "WebSockets"], span: "md:col-span-2" },
  { label: "Databases", items: ["PostgreSQL", "MongoDB", "SQLite", "Redis", "Drizzle ORM"], span: "" },
  { label: "DevOps", items: ["Docker", "CI/CD", "Turborepo", "Git"], span: "" },
  { label: "Auth & Security", items: ["OpenID Connect", "Rate Limiting"], span: "md:col-span-2" }
];
function Skills() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "skills", className: "relative overflow-hidden border-y border-border-line bg-bg-elevated py-24 lg:py-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(56,189,248,0.08),transparent_50%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-[1200px] px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "SKILLS & STACK" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "max-w-[820px] font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[52px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextGenerate, { words: "A toolkit chosen for shipping." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 grid grid-cols-1 gap-4 md:grid-cols-3", children: GROUPS.map((g, gi) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-40px" },
          transition: { delay: gi * 0.06 },
          className: g.span,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SpotlightCard, { className: "h-full p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[11px] uppercase tracking-[0.2em] text-accent", children: [
                "0",
                gi + 1,
                " / ",
                g.label
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-10 bg-accent/30" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: g.items.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.span,
              {
                whileHover: { y: -3, scale: 1.04 },
                className: "cursor-default rounded-full border border-border-line bg-bg/60 px-3.5 py-1.5 font-mono text-[12px] text-ink-soft transition-colors hover:border-accent/40 hover:bg-accent/10 hover:text-accent hover:shadow-[0_0_24px_-10px_var(--color-accent)]",
                children: s
              },
              s
            )) })
          ] })
        },
        g.label
      )) })
    ] })
  ] });
}
const TRACKS = [
  {
    id: "fundamentals",
    icon: Network,
    title: "Fundamentals",
    subtitle: "How the internet actually works",
    color: "text-accent",
    diagram: "dns",
    topics: [
      {
        heading: "Computer Networks",
        items: [
          "What is Internet?",
          "World Wide Web (WWW)",
          "Data Transferring",
          "IP Address & Ports",
          "ISPs & Routers"
        ]
      },
      {
        heading: "Domain Name Systems",
        items: [
          "What is DNS?",
          "How DNS resolves domain names",
          "A, CNAME, MX Records",
          "Root, TLDs, Authoritative servers",
          "Recursive DNS Resolver"
        ]
      },
      {
        heading: "Client–Server Architecture",
        items: [
          "Earlier system architectures",
          "Client–Server model",
          "HTTP Request–Response cycle",
          "Web Servers & Hosting"
        ]
      },
      {
        heading: "Internet Protocols",
        items: [
          "TCP/IP · SYN, SYN-ACK, ACK",
          "UDP · Reliability vs Speed",
          "HTTP / HTTPS · TLS/SSL",
          "WebSocket · WebRTC"
        ]
      }
    ]
  },
  {
    id: "building-blocks",
    icon: CodeXml,
    title: "Building Blocks",
    subtitle: "HTML, CSS & responsive layouts",
    color: "text-sky-300",
    diagram: "client",
    topics: [
      {
        heading: "HTML",
        items: ["Skeleton for the web", "Tags & Elements", "Semantic HTML", "Forms & HTML5 inputs", "Data validation"]
      },
      {
        heading: "CSS",
        items: ["Box Model", "Specificity & Selectors", "Flexbox & Grid", "Media Queries", "Animations & Transitions"]
      },
      {
        heading: "Advanced CSS",
        items: ["Pseudo classes & elements", "UX for links, buttons, forms", "Tailwind CSS", "Shadows & Gradients"]
      }
    ]
  },
  {
    id: "javascript",
    icon: Braces,
    title: "JavaScript & Browser",
    subtitle: "Language, DOM, async & network",
    color: "text-amber-300",
    topics: [
      {
        heading: "Core Language",
        items: ["Variables & types", "Functions & closures", "Objects & JSON", "Arrays & methods", "ES6+ features"]
      },
      {
        heading: "OOP & Async",
        items: ["Classes & prototypes", "Promises & async/await", "Callbacks", "Error handling"]
      },
      {
        heading: "DOM & Events",
        items: ["DOM tree", "Event listeners", "Bubbling & delegation", "Fetch API & CORS"]
      },
      {
        heading: "Advanced JS",
        items: ["Lexical scoping", "this / call / apply / bind", "Custom errors"]
      }
    ]
  },
  {
    id: "typescript",
    icon: Braces,
    title: "TypeScript Essentials",
    subtitle: "JavaScript with types",
    color: "text-blue-300",
    topics: [
      {
        heading: "Type System",
        items: ["Basic types", "Interfaces vs Type Aliases", "Union & Intersection", "Generics"]
      },
      {
        heading: "Tooling",
        items: ["tsconfig.json", "TypeScript compiler", "Linting & formatting"]
      }
    ]
  },
  {
    id: "backend",
    icon: Server,
    title: "Backend Engineering",
    subtitle: "Node, APIs, auth & realtime",
    color: "text-emerald-300",
    diagram: "tcp",
    topics: [
      {
        heading: "Node.js & Express",
        items: ["Event loop", "HTTP servers", "Routes & middleware", "REST API design"]
      },
      {
        heading: "Databases",
        items: ["SQL vs NoSQL", "PostgreSQL", "MongoDB / Mongoose", "Drizzle ORM", "Redis"]
      },
      {
        heading: "Auth & Security",
        items: ["JWT auth", "bcrypt", "RBAC", "OAuth 2.0 / OIDC", "Rate limiting"]
      },
      {
        heading: "Realtime & Scale",
        items: ["WebSockets / socket.io", "Redis streams", "Kafka patterns", "Logging & OTEL"]
      }
    ]
  },
  {
    id: "frontend",
    icon: PanelsTopLeft,
    title: "Modern Frontends",
    subtitle: "React, hooks & performance",
    color: "text-cyan-300",
    topics: [
      {
        heading: "React Core",
        items: ["Components & props", "useState & effects", "Hooks", "Routing (TanStack / React Router)"]
      },
      {
        heading: "State & Forms",
        items: ["Context API", "React Hook Form", "Performance (memo, Suspense)"]
      },
      {
        heading: "Patterns",
        items: ["Custom hooks", "Compound components", "Feature-based structure"]
      }
    ]
  },
  {
    id: "fullstack",
    icon: Layers,
    title: "Full Stack",
    subtitle: "Next.js & end-to-end apps",
    color: "text-violet-300",
    diagram: "stack",
    topics: [
      {
        heading: "Next.js",
        items: ["File-based routing", "Layouts", "SSG / SSR / ISR", "API routes", "Server Actions"]
      }
    ]
  },
  {
    id: "ai",
    icon: Bot,
    title: "AI Integrations",
    subtitle: "Agents, workflows & LLMs",
    color: "text-pink-300",
    topics: [
      {
        heading: "GenAI",
        items: ["LLMs & use cases", "Workflows vs Agents", "Inngest orchestration", "Vercel AI workflows"]
      }
    ]
  },
  {
    id: "devops",
    icon: Container,
    title: "DevOps",
    subtitle: "Docker, AWS & delivery",
    color: "text-orange-300",
    topics: [
      {
        heading: "Containers & Cloud",
        items: ["Docker & Compose", "EC2 & Security Groups", "Load Balancers", "CloudFront CDN"]
      }
    ]
  }
];
function DiagramFor({ type }) {
  if (type === "dns") return /* @__PURE__ */ jsxRuntimeExports.jsx(DnsDiagram, {});
  if (type === "tcp") return /* @__PURE__ */ jsxRuntimeExports.jsx(TcpHandshakeDiagram, {});
  if (type === "client") return /* @__PURE__ */ jsxRuntimeExports.jsx(ClientServerDiagram, {});
  if (type === "stack") return /* @__PURE__ */ jsxRuntimeExports.jsx(StackLayersDiagram, {});
  return null;
}
function Curriculum() {
  const [active, setActive] = reactExports.useState(TRACKS[0].id);
  const track = TRACKS.find((t) => t.id === active) ?? TRACKS[0];
  const Icon = track.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "curriculum", className: "relative overflow-hidden py-24 lg:py-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[120px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[100px]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-[1200px] px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "KNOWLEDGE MAP" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "max-w-[900px] font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[52px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextGenerate, { words: "From packets to production — the full stack journey." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-[640px] text-[15px] leading-[1.8] text-ink-soft", children: "An interactive map of everything I study and ship with — networks, browsers, backends, React, AI workflows, and cloud delivery." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0", children: TRACKS.map((t, i) => {
          const TIcon = t.icon;
          const isActive = t.id === active;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              initial: { opacity: 0, x: -12 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.04 },
              onClick: () => setActive(t.id),
              className: `group flex min-w-[200px] items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all lg:min-w-0 ${isActive ? "border-accent/40 bg-accent/10 shadow-[0_0_30px_-12px_var(--color-accent)]" : "border-border-line bg-surface/60 hover:border-accent/25 hover:bg-surface"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TIcon, { size: 18, className: isActive ? "text-accent" : "text-ink-faint" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-sans text-[13px] font-semibold ${isActive ? "text-ink" : "text-ink-soft"}`, children: t.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-mono text-[10px] text-ink-faint", children: t.subtitle })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronRight,
                  {
                    size: 14,
                    className: `shrink-0 transition-transform ${isActive ? "translate-x-0.5 text-accent" : "text-ink-faint"}`
                  }
                )
              ]
            },
            t.id
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -8 },
            transition: { duration: 0.35 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SpotlightCard, { className: "p-6 sm:p-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-start justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 20, className: "text-accent" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold text-ink sm:text-3xl", children: track.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint", children: track.subtitle })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: track.topics.map((topic, ti) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: ti * 0.06 },
                    className: "rounded-xl border border-border-line bg-bg/50 p-4",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent", children: topic.heading }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: topic.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-[13px] leading-snug text-ink-soft", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" }),
                        item
                      ] }, item)) })
                    ]
                  },
                  topic.heading
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DiagramFor, { type: track.diagram }),
                  !track.diagram && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full min-h-[180px] items-center justify-center rounded-xl border border-dashed border-border-line bg-bg/40 p-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-semibold text-ink", children: track.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[13px] text-ink-soft", children: "Concepts I apply when shipping real products end-to-end." })
                  ] }) })
                ] })
              ] })
            ] })
          },
          track.id
        ) })
      ] })
    ] })
  ] });
}
function Card3D({
  children,
  className
}) {
  const ref = reactExports.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mx = useSpring(x, { stiffness: 200, damping: 20 });
  const my = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(my, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-12, 12]);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      ref,
      onMouseMove: onMove,
      onMouseLeave: reset,
      style: {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1e3
      },
      className: cn("relative", className),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { transform: "translateZ(20px)" }, className: "h-full", children }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            style: {
              background: "radial-gradient(circle at var(--x,50%) var(--y,50%), rgba(94,234,212,0.15), transparent 50%)",
              transform: "translateZ(30px)"
            }
          }
        )
      ]
    }
  );
}
const PROJECTS = [
  {
    num: "01",
    title: "Edinform",
    tag: "Live Product",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Drizzle ORM", "Tailwind"],
    description: "[TODO: write Edinform description — what it does, what problem it solves, what you owned end-to-end.]",
    links: [{ label: "Visit Site", href: "https://edinform.in" }],
    gradient: "from-accent/20 via-sky-500/10 to-transparent"
  },
  {
    num: "02",
    title: "Votora",
    tag: "Full-Stack",
    stack: ["React", "Express", "WebSockets", "PostgreSQL", "Redis", "Docker"],
    description: "[TODO: write Votora description — realtime architecture, Redis pub/sub, scaling story.]",
    links: [{ label: "Visit site", href: "https://votora-client-jaam.vercel.app/poll/7C5D4BCD" }],
    gradient: "from-violet-500/20 via-pink-500/10 to-transparent"
  },
  {
    num: "03",
    title: "Coming Soon",
    tag: "In Progress",
    stack: [],
    description: "",
    comingSoon: true,
    gradient: "from-amber-500/10 to-transparent"
  }
];
function Card({ p, i }) {
  const [open, setOpen] = reactExports.useState(false);
  if (p.comingSoon) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { y: 30, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        viewport: { once: true },
        transition: { delay: i * 0.1 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-accent/30 bg-surface/40 p-8 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-7xl font-bold text-accent/20", children: p.num }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 font-display text-2xl font-semibold text-ink", children: "Coming Soon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint", children: "Something new in the oven" })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { y: 30, opacity: 0 },
      whileInView: { y: 0, opacity: 1 },
      viewport: { once: true },
      transition: { delay: i * 0.1 },
      className: "group",
      style: { perspective: 1200 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card3D, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SpotlightCard, { className: "min-h-[300px] cursor-pointer p-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `pointer-events-none absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-60`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen((v) => !v),
            className: "relative w-full text-left",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-6xl font-bold text-accent/20 transition-colors group-hover:text-accent/35", children: p.num }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-3 inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-accent", children: p.tag }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display text-3xl font-bold text-ink", children: p.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap items-center gap-x-2 gap-y-1", children: p.stack.map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 font-mono text-[11px] text-ink-soft", children: [
                    idx > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent/50", children: "·" }),
                    s
                  ] }, s)) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-border-line bg-bg/80 p-2 text-accent", children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, height: 0 },
                  animate: { opacity: 1, height: "auto" },
                  exit: { opacity: 0, height: 0 },
                  className: "overflow-hidden",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-[14px] leading-[1.8] text-ink-soft", children: p.description }),
                    p.links && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-wrap gap-3", children: p.links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: l.href,
                        target: "_blank",
                        rel: "noreferrer",
                        onClick: (e) => e.stopPropagation(),
                        className: "inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent transition-colors hover:bg-accent hover:text-primary-foreground",
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
        )
      ] }) })
    }
  );
}
function Projects() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "projects", className: "relative overflow-hidden py-24 lg:py-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute right-0 top-1/4 h-[360px] w-[360px] rounded-full bg-accent/8 blur-[120px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-[1200px] px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "SELECTED WORK" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "max-w-[820px] font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[52px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextGenerate, { words: "Projects — built, shipped, learned from." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3", children: PROJECTS.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p, i }, p.num)) })
    ] })
  ] });
}
const POSTS = [
  {
    date: "2026 · 05 · 10",
    title: "Setting Up Your First Node.js Application Step-by-Step",
    tag: "Node.js",
    url: "https://stngndjs.hashnode.dev/setting-up-your-first-node-js-application-step-by-step"
  },
  {
    date: "2026 · 05 · 10",
    title: "JWT Authentication in Node.js Explained Simply",
    tag: "Security",
    url: "https://jwtauthndjs.hashnode.dev/jwt-authentication-in-node-js-explained-simply"
  },
  {
    date: "2026 · 04 · 3",
    title: "Understanding Callback Functions in JavaScript (A Complete Beginner Guide)",
    tag: "JavaScript",
    url: "https://cbijs.hashnode.dev/understanding-callback-functions-in-javascript-a-complete-beginner-guide/"
  },
  {
    date: "2026 · 05 · 9",
    title: "Sessions vs JWT vs Cookies: Understanding Authentication Approaches",
    tag: "Architecture",
    url: "https://sesca.hashnode.dev/sessions-vs-jwt-vs-cookies-understanding-authentication-approaches"
  }
];
function Blog() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "blog", className: "relative overflow-hidden border-y border-border-line bg-bg-elevated py-24 lg:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1200px] px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "JOURNAL" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "max-w-[820px] font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[52px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextGenerate, { words: "Observations from the build." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 space-y-3", children: POSTS.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.a,
      {
        href: p.url,
        target: "_blank",
        rel: "noreferrer",
        initial: { y: 16, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        viewport: { once: true },
        transition: { delay: i * 0.06 },
        className: "block",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SpotlightCard, { className: "group px-5 py-5 transition-transform hover:-translate-y-0.5 sm:px-6 sm:py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden w-[130px] shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint sm:block", children: p.date }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint sm:hidden", children: p.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 font-display text-xl font-semibold text-ink transition-colors group-hover:text-accent sm:mt-0 sm:text-2xl", children: p.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden items-center gap-4 md:flex", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft", children: p.tag }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-9 w-9 items-center justify-center rounded-full border border-border-line text-ink-faint transition-all group-hover:border-accent/40 group-hover:bg-accent group-hover:text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 16 }) })
          ] })
        ] }) })
      },
      p.title
    )) })
  ] }) });
}
const EMAIL = "pandaayush25305@gmail.com";
const SOCIALS = [
  { icon: Github, href: "https://github.com/Ayush-Panda-design", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ayush-panda-a04280215/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/AyushPanda85699", label: "Twitter" },
  { icon: Hashnode, href: "https://hashnode.com/@Ayush-Panda", label: "Hashnode" }
];
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "contact", className: "relative overflow-hidden py-24 lg:py-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BackgroundBeams, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { count: 30 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(94,234,212,0.1),transparent_55%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-[760px] px-6 text-center lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "GET IN TOUCH" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[56px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextGenerate, { words: "Let's build something together." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-6 max-w-[580px] text-[15px] leading-[1.85] text-ink-soft", children: "Open to internships, freelance collaborations, and serious side projects. If you're building something that needs typed APIs, careful UI work, or someone who cares about the details — let's talk." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MovingBorder, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: copy,
          className: "inline-flex items-center gap-3 rounded-full bg-bg px-7 py-4 text-[13px] font-semibold text-ink transition-colors hover:bg-surface",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 16, className: "text-accent" }),
            " ",
            EMAIL
          ]
        }
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex items-center justify-center gap-3 text-ink-faint", children: SOCIALS.map(({ icon: Icon, href, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href,
          target: "_blank",
          rel: "noreferrer",
          "aria-label": label,
          className: "flex h-11 w-11 items-center justify-center rounded-full border border-border-line transition-all hover:border-accent/40 hover:text-accent hover:shadow-[0_0_24px_-8px_var(--color-accent)]",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18, strokeWidth: 1.5 })
        },
        label
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: toast && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { y: 30, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 30, opacity: 0 },
        className: "glass fixed bottom-8 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-3 rounded-full border border-border-line px-5 py-3 text-ink",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[12px] tracking-[0.08em]", children: "Email copied to clipboard" })
        ]
      }
    ) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "border-t border-border-line bg-bg-elevated text-ink-soft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-3 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-ink", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { className: "h-9 w-9 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] tracking-[0.22em]", children: "AYUSH PANDA" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-[300px] font-sans text-[13px] leading-[1.7]", children: "Full-stack developer, CS undergrad at VSSUT. Building real, typed, shipped products." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[11px] uppercase tracking-[0.22em] text-ink", children: "Navigation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-5 space-y-3 font-sans text-[13px]", children: [
          { l: "About", h: "#about" },
          { l: "Skills", h: "#skills" },
          { l: "Knowledge Map", h: "#curriculum" },
          { l: "Projects", h: "#projects" },
          { l: "Blog", h: "#blog" },
          { l: "Contact", h: "#contact" }
        ].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: n.h, className: "transition-colors hover:text-accent", children: n.l }) }, n.l)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[11px] uppercase tracking-[0.22em] text-ink", children: "Elsewhere" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-5 space-y-3 font-sans text-[13px]", children: [
          { l: "GitHub", h: "https://github.com/Ayush-Panda-design" },
          { l: "LinkedIn", h: "https://www.linkedin.com/in/ayush-panda-a04280215/" },
          { l: "Twitter / X", h: "https://x.com/AyushPanda85699" },
          { l: "Hashnode", h: "https://hashnode.com/@Ayush-Panda" }
        ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: s.h, target: "_blank", rel: "noreferrer", className: "transition-colors hover:text-accent", children: s.l }) }, s.l)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border-line", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-2 px-6 py-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint sm:flex-row sm:items-center lg:px-8", children: [
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
      if (dot.current) dot.current.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;
    };
    const onOver = (e) => {
      const t = e.target;
      setHovering(!!t.closest("a, button, [data-cursor='hover']"));
    };
    let raf = 0;
    const loop = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
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
        className: "pointer-events-none fixed left-0 top-0 z-[100] hidden h-1.5 w-1.5 rounded-full bg-accent md:block"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: ring,
        className: "pointer-events-none fixed left-0 top-0 z-[100] hidden rounded-full border border-accent/50 md:block",
        style: {
          width: hovering ? 48 : 36,
          height: hovering ? 48 : 36,
          marginLeft: hovering ? -6 : 0,
          marginTop: hovering ? -6 : 0,
          transform: "translate3d(-100px,-100px,0)",
          transition: "width .25s, height .25s, margin .25s, border-color .25s",
          borderColor: hovering ? "rgba(94,234,212,0.9)" : "rgba(94,234,212,0.45)"
        }
      }
    )
  ] });
}
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen overflow-x-hidden bg-bg text-ink", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Cursor, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TrustBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(About, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skills, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Curriculum, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Projects, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Blog, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Contact, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Index as component
};
