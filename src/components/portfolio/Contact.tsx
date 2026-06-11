import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MailIcon as Mail } from "lucide-react";
import { Github, Linkedin, Twitter, Hashnode } from "./icons";
import { SectionLabel } from "./SectionLabel";

const EMAIL = "pandaayush25305@gmail.com"; // TODO: replace with real email

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
    <section id="contact" className="py-24 lg:py-32" style={{ background: "#f0ece5" }}>
      <div className="mx-auto max-w-[900px] px-6 text-center lg:px-12">
        <SectionLabel>GET&nbsp;IN&nbsp;TOUCH</SectionLabel>
        <motion.h2
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="font-serif text-4xl leading-[1.05] text-[color:#1a1410] sm:text-5xl lg:text-[64px]"
        >
          Let&apos;s build something <span className="italic">together.</span>
        </motion.h2>
        <p className="mx-auto mt-6 max-w-[620px] font-sans text-[15px] leading-[1.8] text-[color:#6b5c4a]">
          Open to internships, freelance collaborations, and serious side projects. If you&apos;re building
          something that needs typed APIs, careful UI work, or someone who cares about the details — let&apos;s talk.
        </p>

        <button
          onClick={copy}
          className="mt-10 inline-flex items-center gap-3 px-7 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.22em] transition-colors hover:brightness-110"
          style={{ background: "#c8430f", color: "#faf8f5" }}
        >
          <Mail size={16} /> {EMAIL}
        </button>

        <div className="mt-10 flex items-center justify-center gap-6 text-[color:#a89880]">
          {[
            { icon: Github, href: "https://github.com/Ayush-Panda-design" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/ayush-panda-a04280215/" },
            { icon: Twitter, href: "https://x.com/AyushPanda85699" },
            { icon: Hashnode, href: "https://hashnode.com/@Ayush-Panda" },
          ].map(({ icon: Icon, href }, i) => (
            <a key={i} href={href} target="_blank" rel="noreferrer" className="transition-colors hover:text-[color:#c8430f]">
              <Icon size={20} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            className="fixed bottom-8 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-3 px-5 py-3"
            style={{ background: "#faf8f5", border: "1px solid #e8e0d5", color: "#1a1410" }}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: "#3aa55c" }} />
            <span className="font-mono text-[12px] tracking-[0.1em]">Email copied to clipboard</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
