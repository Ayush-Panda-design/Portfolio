import { motion } from "framer-motion";
import { ArrowUpRightIcon as ArrowUpRight } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { TextGenerate } from "./effects/TextGenerate";

const POSTS = [
  {
    date: "2026 · 05 · 10",
    title: "Setting Up Your First Node.js Application Step-by-Step",
    tag: "Node.js",
    url: "https://stngndjs.hashnode.dev/setting-up-your-first-node-js-application-step-by-step",
  },
  {
    date: "2026 · 05 · 10",
    title: "JWT Authentication in Node.js Explained Simply",
    tag: "Security",
    url: "https://jwtauthndjs.hashnode.dev/jwt-authentication-in-node-js-explained-simply",
  },
  {
    date: "2026 · 04 · 3",
    title: "Understanding Callback Functions in JavaScript (A Complete Beginner Guide)",
    tag: "JavaScript",
    url: "https://cbijs.hashnode.dev/understanding-callback-functions-in-javascript-a-complete-beginner-guide/",
  },
  {
    date: "2026 · 05 · 9",
    title: "Sessions vs JWT vs Cookies: Understanding Authentication Approaches",
    tag: "Architecture",
    url: "https://sesca.hashnode.dev/sessions-vs-jwt-vs-cookies-understanding-authentication-approaches",
  },
];

export function Blog() {
  return (
    <section id="blog" className="scroll-mt-24 border-t border-border-line pt-14 lg:pt-16">
      <SectionLabel num="05.">Writing</SectionLabel>
      <h2 className="font-display text-2xl font-bold leading-snug tracking-tight text-ink sm:text-3xl">
        <TextGenerate words="Observations from the build." />
      </h2>
      <p className="mt-4 text-[15px] leading-[1.8] text-ink-soft">
        Long-form posts on Hashnode below. Shorter learnings, build notes, and what I&apos;m shipping on{" "}
        <a
          href="https://x.com/AyushPanda85699"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:text-accent-hover"
        >
          X (@AyushPanda85699)
        </a>
        .
      </p>

      <ul className="mt-10">
        {POSTS.map((p, i) => (
          <motion.li
            key={p.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start justify-between gap-4 border-t border-border-line py-5 transition-colors hover:bg-accent/[0.04]"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[11px] text-ink-faint">{p.date}</span>
                  <span className="rounded-full border border-border-line px-2 py-0.5 font-mono text-[10px] text-ink-faint">
                    {p.tag}
                  </span>
                </div>
                <h3 className="mt-1.5 font-display text-lg font-semibold text-ink transition-colors group-hover:text-accent sm:text-xl">
                  {p.title}
                </h3>
              </div>
              <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border-line text-ink-faint transition-all group-hover:border-accent/40 group-hover:bg-accent group-hover:text-primary-foreground">
                <ArrowUpRight size={14} />
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
