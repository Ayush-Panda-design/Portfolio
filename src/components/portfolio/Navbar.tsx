import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon as Menu, XIcon as X } from "lucide-react";
import { Logo } from "./Logo";
import { MagneticButton } from "./MagneticButton";

const NAV = [
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
  { label: "BLOG", href: "#blog" },
  { label: "CONTACT", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
      style={{
        background: scrolled ? "rgba(250,248,245,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #e8e0d5" : "1px solid transparent",
        transition: "background .3s, border-color .3s, backdrop-filter .3s",
      }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-12">
        {/* Left: logo */}
        <a href="#" className="flex items-center gap-3 text-[color:#1a1410]">
          <Logo className="h-9 w-9 text-[color:#1a1410]" />
          <span className="hidden font-mono text-[11px] tracking-[0.25em] text-[color:#1a1410] sm:inline">
            AYUSH&nbsp;PANDA
          </span>
        </a>

        {/* Center: nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="link-hover-draw font-sans text-[11px] font-medium tracking-[0.22em] text-[color:#1a1410] hover:text-[color:#c8430f]"
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* Right: CTA */}
        <div className="flex items-center gap-3">
          <MagneticButton
            href="#contact"
            className="hidden cursor-pointer items-center justify-center px-5 py-3 font-sans text-[11px] font-semibold tracking-[0.22em] text-[color:#faf8f5] transition-colors hover:brightness-110 md:inline-flex"
          >
            <span
              className="block px-5 py-3 -mx-5 -my-3"
              style={{ background: "#c8430f", color: "#faf8f5" }}
            >
              LET&apos;S WORK
            </span>
          </MagneticButton>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center text-[color:#1a1410] lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="lg:hidden"
            style={{ background: "#faf8f5", borderTop: "1px solid #e8e0d5" }}
          >
            <nav className="flex flex-col px-6 py-6">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-[color:#e8e0d5] py-4 font-sans text-[12px] tracking-[0.22em] text-[color:#1a1410]"
                >
                  {n.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex items-center justify-center px-5 py-4 font-sans text-[12px] font-semibold tracking-[0.22em]"
                style={{ background: "#c8430f", color: "#faf8f5" }}
              >
                LET&apos;S WORK
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
