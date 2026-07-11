import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  MailIcon as Mail,
  Send,
  Copy,
  Check,
  ArrowUpRight,
  X,
  ExternalLink,
} from "lucide-react";
import { Github, Linkedin, Twitter, Hashnode } from "./icons";
import { SectionLabel } from "./SectionLabel";
import { MovingBorder } from "./effects/MovingBorder";

const EMAIL = "pandaayush25305@gmail.com";

const SOCIALS = [
  { icon: Github,   href: "https://github.com/Ayush-Panda-design",              label: "GitHub",    sub: "Ayush-Panda-design" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ayush-panda-a04280215/", label: "LinkedIn",  sub: "ayush-panda-a04280215" },
  { icon: Twitter,  href: "https://x.com/AyushPanda85699",                       label: "X / Twitter", sub: "@AyushPanda85699" },
  { icon: Hashnode, href: "https://hashnode.com/@Ayush-Panda",                   label: "Hashnode",  sub: "@Ayush-Panda" },
];

const SUBJECTS = [
  "Internship Opportunity",
  "Freelance Project",
  "Side Project Collaboration",
  "Just Saying Hi",
];

interface SendModal {
  subject: string;
  body: string;      // raw (not encoded)
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [msgCopied, setMsgCopied] = useState(false);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState<SendModal | null>(null);

  /* ── Copy email address ── */
  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  /* ── Copy composed message ── */
  const copyMessage = async (body: string) => {
    await navigator.clipboard.writeText(body).catch(() => {});
    setMsgCopied(true);
    setTimeout(() => setMsgCopied(false), 2400);
  };

  /* ── Form submit → open modal ── */
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const body = `Hi Ayush,\n\nMy name is ${name}.\n\n${message}\n\nBest regards,\n${name}`;
    setModal({ subject, body });
  };

  /* ── Build send URLs ── */
  const gmailUrl = (sub: string, body: string) =>
    `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;

  const outlookUrl = (sub: string, body: string) =>
    `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(EMAIL)}&subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;

  /* ── Close modal & reset ── */
  const closeModal = () => {
    setModal(null);
    setName("");
    setMessage("");
    setSubject(SUBJECTS[0]);
    setMsgCopied(false);
  };

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border-line pt-14 lg:pt-20">
      <SectionLabel num="07.">Contact</SectionLabel>

      {/* Heading */}
      <h2 className="font-display text-2xl font-bold leading-snug tracking-tight text-ink sm:text-3xl lg:text-4xl">
        Let&apos;s build something{" "}
        <span className="bg-gradient-to-r from-accent to-sky-400 bg-clip-text text-transparent">
          together.
        </span>
      </h2>
      <p className="mt-3 text-[14px] leading-[1.8] text-ink-soft">
        Open to internships, freelance collaborations, and serious side projects.
        Fill the form — choose Gmail, Outlook, or copy the message to any app you use.
      </p>

      {/* Two-column layout */}
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto]">

        {/* ── LEFT: Form ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-border-line bg-surface p-6"
        >
          <div aria-hidden className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />

          <form onSubmit={handleSend} className="relative space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-ink-faint">
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
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-ink-faint">Reason</p>
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
              <label htmlFor="contact-message" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-ink-faint">
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
            <MovingBorder containerClassName="w-full">
              <button
                type="submit"
                id="contact-send-btn"
                className="flex w-full items-center justify-center gap-2.5 rounded-full bg-bg px-6 py-3 text-[13px] font-semibold text-ink transition-all hover:bg-surface"
              >
                <Send size={15} className="text-accent" />
                Send Message
              </button>
            </MovingBorder>

            <p className="text-center text-[11px] text-ink-faint">
              Pick Gmail, Outlook, or copy — no mail app required.
            </p>
          </form>
        </motion.div>

        {/* ── RIGHT: Email + Socials ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-4 lg:w-[220px]"
        >
          {/* Email card */}
          <div className="relative overflow-hidden rounded-2xl border border-border-line bg-surface p-5">
            <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-sky-500/10 blur-2xl" />
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-ink-faint">Email directly</p>
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
            <div aria-hidden className="pointer-events-none absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-accent/[0.08] blur-2xl" />
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-ink-faint">Find me on</p>
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
                    <ArrowUpRight size={12} className="shrink-0 text-ink-faint opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
          SEND OPTIONS MODAL
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {modal && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            />

            {/* Modal panel */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
              className="fixed left-1/2 top-1/2 z-[100] w-[calc(100vw-32px)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border-line bg-bg shadow-2xl"
            >
              {/* Ambient glow */}
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />

              {/* Header */}
              <div className="relative flex items-center justify-between border-b border-border-line px-6 py-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-faint">Message ready</p>
                  <p className="mt-0.5 text-[15px] font-bold text-ink">How do you want to send it?</p>
                </div>
                <button
                  onClick={closeModal}
                  aria-label="Close"
                  id="modal-close-btn"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border-line text-ink-faint transition-all hover:border-accent/40 hover:text-accent"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Send options */}
              <div className="relative space-y-2.5 p-5">
                {/* Gmail */}
                <a
                  href={gmailUrl(modal.subject, modal.body)}
                  target="_blank"
                  rel="noreferrer"
                  id="send-gmail-btn"
                  onClick={closeModal}
                  className="group flex w-full items-center gap-4 rounded-xl border border-border-line bg-surface px-4 py-3.5 transition-all hover:border-accent/40 hover:bg-surface"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EA4335]/10 text-[#EA4335]">
                    {/* Gmail G icon */}
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.907 1.528-1.148C21.69 2.28 24 3.434 24 5.457z"/>
                    </svg>
                  </span>
                  <span className="flex-1 text-left">
                    <span className="block text-[13px] font-semibold text-ink">Open in Gmail</span>
                    <span className="block text-[11px] text-ink-faint">Opens Gmail in a new tab, pre-filled</span>
                  </span>
                  <ExternalLink size={13} className="shrink-0 text-ink-faint opacity-0 transition-opacity group-hover:opacity-100" />
                </a>

                {/* Outlook */}
                <a
                  href={outlookUrl(modal.subject, modal.body)}
                  target="_blank"
                  rel="noreferrer"
                  id="send-outlook-btn"
                  onClick={closeModal}
                  className="group flex w-full items-center gap-4 rounded-xl border border-border-line bg-surface px-4 py-3.5 transition-all hover:border-accent/40 hover:bg-surface"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0078D4]/10 text-[#0078D4]">
                    {/* Outlook icon */}
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.32.77.1.43.1.88zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6.5V2.55q0-.44.3-.75.3-.3.75-.3h12.9q.44 0 .75.3.3.3.3.75V10.85l1.24.72h.01q.04.02.07.06l.04.06q.01.02.02.04v.1q.01.06 0 .11zm-8.7-5.73v-.42q0-.17-.08-.3-.08-.12-.21-.2-.13-.07-.3-.07-.17 0-.3.07-.12.08-.2.2-.08.13-.08.3v.42q0 .17.08.3.08.12.2.2.13.07.3.07.17 0 .3-.07.13-.08.21-.2.08-.13.08-.3zm.7 4.1V7.8q0-.17-.08-.3-.08-.13-.2-.2-.13-.07-.3-.07-.18 0-.3.07-.13.07-.21.2-.07.13-.07.3v2.57q0 .17.07.3.08.12.21.2.12.06.3.06.17 0 .3-.07.12-.07.2-.2.08-.12.08-.3zm-4.4-4.1v-.42q0-.17-.08-.3-.08-.12-.2-.2-.13-.07-.3-.07-.18 0-.3.07-.13.08-.21.2-.08.13-.08.3v.42q0 .17.08.3.08.12.21.2.12.07.3.07.17 0 .3-.07.12-.08.2-.2.08-.13.08-.3zm.7 4.1V7.8q0-.17-.08-.3-.08-.13-.2-.2-.13-.07-.3-.07-.18 0-.3.07-.13.07-.21.2-.07.13-.07.3v2.57q0 .17.07.3.08.12.21.2.12.06.3.06.17 0 .3-.07.12-.07.2-.2.08-.12.08-.3zm8.1 1.35l-4.97-2.9v5.8l4.97-2.9zM7.5 7.07H1.5v9.86h6V7.07zM4 15.96q-.9 0-1.58-.38-.68-.37-1.06-1.02-.37-.64-.37-1.44 0-.8.37-1.44.38-.65 1.06-1.02.68-.37 1.58-.37.9 0 1.58.37.68.37 1.06 1.02.37.64.37 1.44 0 .8-.37 1.44-.38.65-1.06 1.02-.68.38-1.58.38z"/>
                    </svg>
                  </span>
                  <span className="flex-1 text-left">
                    <span className="block text-[13px] font-semibold text-ink">Open in Outlook</span>
                    <span className="block text-[11px] text-ink-faint">Opens Outlook web, pre-filled</span>
                  </span>
                  <ExternalLink size={13} className="shrink-0 text-ink-faint opacity-0 transition-opacity group-hover:opacity-100" />
                </a>

                {/* Copy message */}
                <button
                  type="button"
                  id="copy-message-btn"
                  onClick={() => copyMessage(modal.body)}
                  className="group flex w-full items-center gap-4 rounded-xl border border-border-line bg-surface px-4 py-3.5 transition-all hover:border-accent/40 hover:bg-surface"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    {msgCopied ? <Check size={17} /> : <Copy size={17} />}
                  </span>
                  <span className="flex-1 text-left">
                    <span className="block text-[13px] font-semibold text-ink">
                      {msgCopied ? "Copied!" : "Copy message"}
                    </span>
                    <span className="block text-[11px] text-ink-faint">
                      Paste into any email or chat app
                    </span>
                  </span>
                </button>

                {/* Preview of composed body */}
                <div className="mt-1 rounded-xl border border-border-line bg-bg p-3">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-ink-faint">
                    To: {EMAIL} · Subject: {modal.subject}
                  </p>
                  <p className="whitespace-pre-wrap text-[12px] leading-relaxed text-ink-soft line-clamp-4">
                    {modal.body}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
