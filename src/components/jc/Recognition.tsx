import { motion } from "framer-motion";
import { SecHead } from "./lib";
import { MeBuddy } from "./MeBuddy";

// Add the real post/video links here and the cards become clickable.
const ITEMS = [
  { k: "ChaiCode", t: "Featured as a standout student", d: "Highlighted on ChaiCode's official X and LinkedIn pages, and my video was published on their channel.", links: [{ l: "X post", href: "https://x.com/AyushPanda85699" }, { l: "LinkedIn post", href: "https://lnkd.in/p/dwBfJ5tH" }, { l: "Video", href: "" }], c: "#FFD66B" },
  { k: "Freelance", t: "Shipped work for real clients", d: "Built and delivered freelance projects end to end, from requirements to deploy.", links: [], c: "#34D399" },
];

export function Recognition() {
  return (
    <section id="recognition" data-scene="recognition" className="jc-sec">
      <div className="jc-wrap">
        <SecHead label="Along the way" title="Recognition & status." variant="pop" />
        <div className="rc-me"><MeBuddy mood="idle" /></div>
        <div className="rc-grid">
          {ITEMS.map((it, i) => (
            <motion.div key={it.k} className="rc-card" style={{ ["--a" as string]: it.c }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
              <small>{it.k}</small>
              <h3>{it.t}</h3>
              <p>{it.d}</p>
              {it.links.some((l) => l.href) && (
                <div className="lk">{it.links.filter((l) => l.href).map((l) => <a key={l.l} href={l.href} target="_blank" rel="noreferrer">{l.l} ↗</a>)}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
