import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Twitter, Hashnode } from "./icons";

const NAV = [
  { num: "01", label: "About", href: "#about", id: "about" },
  { num: "02", label: "Stack", href: "#skills", id: "skills" },
  { num: "03", label: "Practice", href: "#learning", id: "learning" },
  { num: "04", label: "Shipped", href: "#projects", id: "projects" },
  { num: "05", label: "Writing", href: "#blog", id: "blog" },
  { num: "06", label: "Contact", href: "#contact", id: "contact" },
];

const SOCIALS = [
  { icon: Github, href: "https://github.com/Ayush-Panda-design", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ayush-panda-a04280215/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/AyushPanda85699", label: "Twitter" },
  { icon: Hashnode, href: "https://hashnode.com/@Ayush-Panda", label: "Hashnode" },
];

const AVATAR = "https://i.ibb.co/sYzb6rs/Gemini-Generated-Image-b7cnr4b7cnr4b7cn.png";

function useActiveSection() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Sidebar() {
  const active = useActiveSection();

  return (
    <aside className="hidden w-[300px] shrink-0 flex-col justify-between py-24 lg:sticky lg:top-0 lg:flex lg:h-screen lg:max-h-screen">
      <div>
        <a href="#" className="group flex items-start gap-4">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-accent/40 shadow-[0_0_24px_-6px_var(--color-accent)]">
            <img src={AVATAR} alt="Ayush Panda" className="h-full w-full object-cover object-top" />
          </div>
          <div className="min-w-0 pt-0.5">
            <h1 className="font-display text-[28px] font-bold leading-tight tracking-tight text-ink">
              Ayush Panda
            </h1>
            <p className="mt-1 font-mono text-[11px] tracking-[0.12em] text-accent">Full-Stack Developer</p>
          </div>
        </a>

        <p className="mt-6 text-[14px] leading-relaxed text-ink-soft">
          CS undergrad at VSSUT building real, shipped products — typed end-to-end and worth using.
        </p>

        <nav className="mt-10" aria-label="Primary">
          <ul className="space-y-0.5">
            {NAV.map((n) => {
              const isActive = active === n.id;
              return (
                <li key={n.id}>
                  <a
                    href={n.href}
                    className={`group flex items-center gap-3 py-2 text-[13px] font-medium transition-colors ${
                      isActive ? "text-ink" : "text-ink-faint hover:text-ink"
                    }`}
                  >
                    <span
                      className={`font-mono text-[11px] tracking-widest ${
                        isActive ? "text-accent" : "text-ink-faint group-hover:text-ink-soft"
                      }`}
                    >
                      {n.num}
                    </span>
                    <span
                      className={`h-px transition-all duration-300 ${
                        isActive
                          ? "w-10 bg-accent"
                          : "w-5 bg-border-line group-hover:w-8 group-hover:bg-ink-soft"
                      }`}
                    />
                    <span>{n.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="pb-2">
        <div className="mb-4 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[11px] tracking-[0.14em] text-ink-soft">Open to work</span>
        </div>

        <div className="flex items-center gap-2.5 text-ink-faint">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border-line transition-all hover:border-accent/40 hover:text-accent"
            >
              <Icon size={15} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border-line/60 bg-bg/90 backdrop-blur-md lg:hidden">
      <div className="flex items-center justify-between px-5 py-3">
        <a href="#" className="flex items-center gap-3">
          <div className="h-9 w-9 overflow-hidden rounded-full border border-accent/40">
            <img src={AVATAR} alt="" className="h-full w-full object-cover object-top" />
          </div>
          <span className="font-display text-[15px] font-bold text-ink">Ayush Panda</span>
        </a>
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-border-line px-3 py-1.5 font-mono text-[11px] tracking-wider text-ink-soft"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border-line"
          >
            <div className="px-5 py-3">
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 border-b border-border-soft py-3 text-[14px] ${
                    active === n.id ? "text-accent" : "text-ink"
                  }`}
                >
                  <span className="font-mono text-[11px] text-ink-faint">{n.num}</span>
                  {n.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
