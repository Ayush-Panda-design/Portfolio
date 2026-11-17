import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { MeBuddy } from "./MeBuddy";
import { EASE, Magnetic, Reveal, SecHead, scrollToY } from "./lib";
import { setHot } from "./bus";

const EMAIL = "pandaayush25305@gmail.com";
const LINKS = [
  { k: "M", label: "Email", href: `mailto:${EMAIL}` },
  { k: "G", label: "GitHub", href: "https://github.com/Ayush-Panda-design" },
  { k: "L", label: "LinkedIn", href: "https://www.linkedin.com/in/ayush-panda-a04280215/" },
  { k: "X", label: "X / Twitter", href: "https://x.com/AyushPanda85699" },
  { k: "H", label: "Hashnode", href: "https://hashnode.com/@Ayush-Panda" },
  { k: "R", label: "Resume", href: "/resume/Ayush_Panda_Resume.pdf" },
];
const AVATARS = ["#FFD23F", "#FF6B4A", "#9FD3FF", "#B7A2FF", "#4F9E4A"];

export function Contact() {
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [av, setAv] = useState(0);
  const secRef = useRef<HTMLElement>(null);
  const walk = useRef(1);
  const [live, setLive] = useState(false);
  const { scrollYProgress } = useScroll({ target: secRef, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 });
  useMotionValueEvent(p, "change", (v) => {
    walk.current = v < 0.62 ? 1 : Math.max(0, 1 - (v - 0.62) / 0.12);
    setLive(v > 0.66);
  });
  const stars = useMemo(() => Array.from({ length: 46 }, (_, i) => ({ x: (i * 53.7) % 100, y: (i * 29.3) % 52, s: 1 + (i % 3), d: (i % 7) * 0.5 })), []);
  const sceneY = useTransform(p, [0, 1], ["0%", "-6%"]);
  const dune1 = useTransform(p, [0, 1], ["0%", "-9%"]);
  const dune2 = useTransform(p, [0, 1], ["0%", "-4%"]);
  const portalScale = useTransform(p, [0, 0.5, 0.78, 1], [1, 1.25, 3.2, 3.6]);
  const portalOp = useTransform(p, [0.7, 0.9], [1, 0.55]);
  const skyDark = useTransform(p, [0.4, 0.85], [0, 0.78]);
  const meScale = useTransform(p, [0, 0.62, 0.74], [1, 0.46, 0.2]);
  const meY = useTransform(p, [0, 0.62, 0.74], ["0vh", "-12vh", "-17vh"]);
  const meOp = useTransform(p, [0.6, 0.74], [1, 0]);
  const flashOp = useTransform(p, [0.6, 0.72, 0.86], [0, 0.85, 0]);
  const introOp = useTransform(p, [0, 0.08, 0.3, 0.42], [0, 1, 1, 0]);
  const bodyOp = useTransform(p, [0.7, 0.86], [0, 1]);
  const bodyY = useTransform(p, [0.7, 0.9], ["36px", "0px"]);

  const flash = (t: string) => {
    setToast(t);
    setTimeout(() => setToast(""), 2200);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("input,textarea") || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Escape") setModal(false);
      const l = LINKS.find((x) => x.k.toLowerCase() === e.key.toLowerCase());
      if (l) window.open(l.href, l.href.startsWith("mailto") ? "_self" : "_blank");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const copy = async () => {
    await navigator.clipboard.writeText(EMAIL).catch(() => {});
    flash("Email copied ✓");
  };

  const pin = () => {
    if (!msg.trim()) return;
    const body = `${msg.trim()}\n\n— ${name.trim() || "a visitor"}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("A note from your portfolio")}&body=${encodeURIComponent(body)}`;
    setModal(false);
    setMsg("");
    flash("Opening your mail app…");
  };

  return (
    <footer id="contact" data-scene="forth" className="jc-sec jc-contact ct-scene" style={{ position: "relative" }} ref={secRef}>
      <div className="ct-sticky">
        <motion.div className="ct-sky" style={{ y: sceneY }}>
          {stars.map((st, i) => <i key={i} className="ct-star" style={{ left: `${st.x}%`, top: `${st.y}%`, width: st.s, height: st.s, animationDelay: `${st.d}s` }} />)}
        </motion.div>
        <motion.div className="ct-portal" style={{ scale: portalScale, opacity: portalOp }} aria-hidden>
          <i className="ct-halo" /><i className="ct-ring" /><i className="ct-gal g1" /><i className="ct-gal g2" /><i className="ct-core" />
        </motion.div>
        <motion.svg className="ct-dune d2" viewBox="0 0 1440 300" preserveAspectRatio="none" style={{ y: dune2 }} aria-hidden>
          <path d="M0 170 C200 110 360 140 560 150 C800 165 980 90 1200 120 C1320 136 1400 150 1440 140 L1440 300 L0 300Z" />
        </motion.svg>
        <motion.svg className="ct-dune d1" viewBox="0 0 1440 300" preserveAspectRatio="none" style={{ y: dune1 }} aria-hidden>
          <path d="M0 150 C220 210 420 120 700 160 C960 196 1160 110 1440 170 L1440 300 L0 300Z" />
        </motion.svg>
        <motion.div className="ct-me" style={{ scale: meScale, y: meY, opacity: meOp }}>
          <MeBuddy back mood="idle" walkRef={walk} />
        </motion.div>
        <motion.div className="ct-flash" style={{ opacity: flashOp }} aria-hidden />
        <motion.div className="ct-fade" style={{ opacity: skyDark }} aria-hidden />

        <motion.p className="ct-intro" style={{ opacity: introOp }}>Thanks for walking through.</motion.p>

        <motion.div className="ct-body" style={{ opacity: bodyOp, y: bodyY, pointerEvents: live ? "auto" : "none" }}>
          <div className="jc-center"><span className="jc-open"><i />Open to work · SDE internships &amp; full-time roles</span></div>
          <SecHead label="Before you leave" title="Let's build something." variant="sides" sub="Internships, freelance work or just a hello. Click the address to copy it." />
          <button className="jc-mail" onClick={copy} onMouseEnter={() => { setHot("sun", true); setHot("train", true); }} onMouseLeave={() => { setHot("sun", false); setHot("train", false); }}>{EMAIL}</button>
          <div className="ct-acts">
            <Magnetic><button className="jc-btn sun" onClick={() => setModal(true)}>Leave a note</button></Magnetic>
            <Magnetic><button className="jc-btn ghost" onClick={() => scrollToY(0)}>Back to top ↑</button></Magnetic>
          </div>
          <div className="jc-keys" aria-label="Keyboard shortcuts">
            {LINKS.map((l) => (
              <a key={l.k} className="jc-key" href={l.href} target={l.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer"><kbd>{l.k}</kbd>{l.label}</a>
            ))}
          </div>
          <p className="ct-copy">© {new Date().getFullYear()} Ayush Panda. Press a key to jump to a link.</p>
        </motion.div>
      </div>

      <AnimatePresence>
        {modal && (
          <motion.div className="jc-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModal(false)}>
            <motion.div
              className="jc-sheet"
              style={{ textAlign: "left" }}
              initial={{ y: 40, scale: 0.92, rotate: -2 }}
              animate={{ y: 0, scale: 1, rotate: 0 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-label="Leave a note"
            >
              <h3>Write a note</h3>
              <p style={{ color: "var(--ink2)", margin: 0, fontSize: 14 }}>Say hi, share feedback, or tell me what you&apos;re building.</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14 }}>
                <button
                  onClick={() => setAv((a) => (a + 1) % AVATARS.length)}
                  aria-label="Shuffle avatar"
                  style={{ width: 52, height: 52, borderRadius: "50%", background: AVATARS[av], display: "grid", placeItems: "center", fontWeight: 900, color: "#13233A", transition: "transform .4s var(--spring)" }}
                >
                  {(name[0] || "?").toUpperCase()}
                </button>
                <span style={{ fontSize: 12, color: "var(--ink2)" }}>tap to shuffle</span>
              </div>
              <input className="jc-field" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} />
              <textarea className="jc-field" placeholder="Your note…" value={msg} onChange={(e) => setMsg(e.target.value.slice(0, 200))} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                <span style={{ fontSize: 12, color: "var(--ink2)" }}>{msg.length}/200</span>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="jc-pill" style={{ border: "1px solid var(--line)" }} onClick={() => setModal(false)}>Cancel</button>
                  <button className="jc-btn sun" onClick={pin} disabled={!msg.trim()} style={{ opacity: msg.trim() ? 1 : 0.5 }}>Send it ↗</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>{toast && <motion.div className="jc-toast" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }}>{toast}</motion.div>}</AnimatePresence>
    </footer>
  );
}
