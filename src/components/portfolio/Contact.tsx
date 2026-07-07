import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MailIcon as Mail } from "lucide-react";
import { Github, Linkedin, Twitter, Hashnode } from "./icons";
import { SectionLabel } from "./SectionLabel";
import { MovingBorder } from "./effects/MovingBorder";
import { TextGenerate } from "./effects/TextGenerate";

const EMAIL = "pandaayush25305@gmail.com";

const SOCIALS = [
  { icon: Github, href: "https://github.com/Ayush-Panda-design", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ayush-panda-a04280215/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/AyushPanda85699", label: "Twitter" },
  { icon: Hashnode, href: "https://hashnode.com/@Ayush-Panda", label: "Hashnode" },
];

export function Contact() {
  const [toast, setToast] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setToast(true);
      setTimeout(() => setToast(false), 2400);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border-line pt-14 lg:pt-16">
      <SectionLabel num="07.">Contact</SectionLabel>
      <h2 className="font-display text-2xl font-bold leading-snug tracking-tight text-ink sm:text-3xl">
        <TextGenerate words="Let's build something together." />
      </h2>
      <p className="mt-4 text-[15px] leading-[1.8] text-ink-soft">
        Open to internships, freelance collaborations, and serious side projects. If you need typed APIs,
        careful UI, or someone who cares about details — let&apos;s talk.
      </p>

      <div className="mt-8">
        <MovingBorder>
          <button
            onClick={copy}
            className="inline-flex items-center gap-3 rounded-full bg-bg px-6 py-3.5 text-[13px] font-semibold text-ink transition-colors hover:bg-surface"
          >
            <Mail size={16} className="text-accent" /> {EMAIL}
          </button>
        </MovingBorder>
      </div>

      <div className="mt-8 flex items-center gap-3 text-ink-faint lg:hidden">
        {SOCIALS.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-line transition-all hover:border-accent/40 hover:text-accent"
          >
            <Icon size={16} strokeWidth={1.5} />
          </a>
        ))}
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            className="glass fixed bottom-8 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-3 rounded-full border border-border-line px-5 py-3 text-ink"
          >
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="font-mono text-[12px] tracking-[0.08em]">Email copied to clipboard</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
