import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { MailIcon as Mail, Send, Copy, Check, ArrowUpRight } from "lucide-react";
import { Github, Linkedin, Twitter, Hashnode } from "./icons";
import { SectionLabel } from "./SectionLabel";
import { MovingBorder } from "./effects/MovingBorder";

const EMAIL = "pandaayush25305@gmail.com";

const SOCIALS = [
  {
    icon: Github,
    href: "https://github.com/Ayush-Panda-design",
    label: "GitHub",
    sub: "Ayush-Panda-design",
    color: "#e8edf7",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/ayush-panda-a04280215/",
    label: "LinkedIn",
    sub: "ayush-panda-a04280215",
    color: "#38bdf8",
  },
  {
    icon: Twitter,
    href: "https://x.com/AyushPanda85699",
    label: "X / Twitter",
    sub: "@AyushPanda85699",
    color: "#e8edf7",
  },
  {
    icon: Hashnode,
    href: "https://hashnode.com/@Ayush-Panda",
    label: "Hashnode",
    sub: "@Ayush-Panda",
    color: "#5eead4",
  },
];

const SUBJECTS = [
  "Internship Opportunity",
  "Freelance Project",
  "Side Project Collaboration",
  "Just Saying Hi",
];

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setToast("Email copied!");
      setTimeout(() => {
        setCopied(false);
        setToast(null);
      }, 2400);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const body = encodeURIComponent(
      `Hi Ayush,\n\nMy name is ${name}.\n\n${message}\n\nBest regards,\n${name}`
    );
    const sub = encodeURIComponent(subject);
    window.location.href = `mailto:${EMAIL}?subject=${sub}&body=${body}`;

    setSent(true);
    setToast("Opening your mail client…");
    setTimeout(() => {
      setSent(false);
      setToast(null);
      setName("");
      setMessage("");
      setSubject(SUBJECTS[0]);
    }, 3000);
  };

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border-line pt-14 lg:pt-20">
      {/* Section label */}
      <SectionLabel num="07.">Contact</SectionLabel>

      {/* Heading */}
      <h2 className="font-display text-2xl font-bold leading-snug tracking-tight text-ink sm:text-3xl lg:text-4xl">
        Let&apos;s build something{" "}
        <span className="bg-gradient-to-r from-accent to-sky-400 bg-clip-text text-transparent">
          together.
        </span>
      </h2>
      <p className="mt-3 text-[14px] leading-[1.8] text-ink-soft">
        Open to internships, freelance collaborations, and serious side projects. Fill in
        the form below — it opens your mail client with everything pre-filled, so you can
        send in one click.
      </p>

      {/* Two-column layout */}
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto]">

        {/* ── LEFT: Contact form ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-border-line bg-surface p-6"
        >
          {/* Ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
          />

          <form ref={formRef} onSubmit={handleSend} className="relative space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="contact-name"
                className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-ink-faint"
              >
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Johnson"
                className="w-full rounded-xl border border-border-line bg-bg px-4 py-2.5 text-[14px] text-ink placeholder:text-ink-faint focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>

            {/* Subject chips */}
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-ink-faint">
                Reason
              </p>
              <div className="flex flex-wrap gap-2">
                {SUBJECTS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSubject(s)}
                    className={`rounded-full border px-3 py-1 text-[12px] font-medium transition-all ${
                      subject === s
                        ? "border-accent/50 bg-accent/10 text-accent"
                        : "border-border-line bg-transparent text-ink-soft hover:border-accent/30 hover:text-ink"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="contact-message"
                className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-ink-faint"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi Ayush, I'd love to work with you on…"
                className="w-full resize-none rounded-xl border border-border-line bg-bg px-4 py-2.5 text-[14px] text-ink placeholder:text-ink-faint focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>

            {/* Send button */}
            <MovingBorder>
              <button
                type="submit"
                id="contact-send-btn"
                disabled={sent}
                className="flex w-full items-center justify-center gap-2.5 rounded-full bg-bg px-6 py-3 text-[13px] font-semibold text-ink transition-all hover:bg-surface disabled:opacity-60"
              >
                {sent ? (
                  <>
                    <Check size={15} className="text-accent" />
                    Opening mail client…
                  </>
                ) : (
                  <>
                    <Send size={15} className="text-accent" />
                    Send Message
                  </>
                )}
              </button>
            </MovingBorder>

            <p className="text-center text-[11px] text-ink-faint">
              Opens your mail client pre-filled — send in one click.
            </p>
          </form>
        </motion.div>

        {/* ── RIGHT: Direct email + Socials ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-4 lg:w-[220px]"
        >
          {/* Email card */}
          <div className="relative overflow-hidden rounded-2xl border border-border-line bg-surface p-5">
            <div
              aria-hidden
              className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-sky-500/10 blur-2xl"
            />
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-ink-faint">
              Email directly
            </p>
            <p className="mb-3 break-all text-[13px] font-medium text-ink">{EMAIL}</p>
            <div className="flex gap-2">
              <button
                id="copy-email-btn"
                onClick={copyEmail}
                aria-label="Copy email"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border-line bg-bg py-2 text-[12px] font-medium text-ink-soft transition-all hover:border-accent/40 hover:text-accent"
              >
                {copied ? <Check size={13} className="text-accent" /> : <Copy size={13} />}
                {copied ? "Copied!" : "Copy"}
              </button>
              <a
                href={`mailto:${EMAIL}`}
                id="mailto-btn"
                aria-label="Open mail client"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border-line bg-bg py-2 text-[12px] font-medium text-ink-soft transition-all hover:border-accent/40 hover:text-accent"
              >
                <Mail size={13} />
                Open
              </a>
            </div>
          </div>

          {/* Social links */}
          <div className="relative overflow-hidden rounded-2xl border border-border-line bg-surface p-5">
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-accent/8 blur-2xl"
            />
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-ink-faint">
              Find me on
            </p>
            <ul className="space-y-2.5">
              {SOCIALS.map(({ icon: Icon, href, label, sub }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    id={`social-${label.toLowerCase().replace(/[\s/]+/g, "-")}`}
                    className="group flex items-center gap-3 rounded-xl border border-transparent px-2 py-1.5 transition-all hover:border-border-line hover:bg-bg"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border-line bg-bg text-ink-faint transition-all group-hover:border-accent/40 group-hover:text-accent">
                      <Icon size={14} strokeWidth={1.6} />
                    </span>
                    <span className="min-w-0 flex-1 overflow-hidden">
                      <span className="block text-[12px] font-semibold text-ink">{label}</span>
                      <span className="block truncate text-[11px] text-ink-faint">{sub}</span>
                    </span>
                    <ArrowUpRight
                      size={12}
                      className="shrink-0 text-ink-faint opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            className="glass fixed bottom-8 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-3 rounded-full border border-border-line px-5 py-3 text-ink"
          >
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="font-mono text-[12px] tracking-[0.08em]">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
