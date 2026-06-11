import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer style={{ background: "#1a1410", color: "#a89880" }}>
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 py-16 sm:grid-cols-3 lg:px-12">
        <div>
          <div className="flex items-center gap-3 text-[color:#faf8f5]">
            <Logo className="h-9 w-9 text-[color:#faf8f5]" />
            <span className="font-mono text-[11px] tracking-[0.25em]">AYUSH&nbsp;PANDA</span>
          </div>
          <p className="mt-5 max-w-[300px] font-sans text-[13px] leading-[1.7]">
            Full-stack developer, CS undergrad at VSSUT. Building real, typed, shipped products.
          </p>
        </div>

        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:#faf8f5]">Navigation</div>
          <ul className="mt-5 space-y-3 font-sans text-[13px]">
            {["About", "Skills", "Projects", "Blog", "Contact"].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="transition-colors hover:text-[color:#c8430f]">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:#faf8f5]">Elsewhere</div>
          <ul className="mt-5 space-y-3 font-sans text-[13px]">
            {[
              { l: "GitHub", h: "https://github.com/" },
              { l: "LinkedIn", h: "https://linkedin.com/" },
              { l: "Twitter / X", h: "https://twitter.com/" },
              { l: "Hashnode", h: "https://hashnode.com/" },
            ].map((s) => (
              <li key={s.l}>
                <a href={s.h} target="_blank" rel="noreferrer" className="transition-colors hover:text-[color:#c8430f]">
                  {s.l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-[color:#2a2118]">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-2 px-6 py-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:#6b5c4a] sm:flex-row sm:items-center lg:px-12">
          <span>Built by Ayush Panda · 2025</span>
          <span>Crafted with care · No templates</span>
        </div>
      </div>
    </footer>
  );
}
