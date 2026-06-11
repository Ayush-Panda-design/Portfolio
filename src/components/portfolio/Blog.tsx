import { motion } from "framer-motion";
import { ArrowRightIcon as ArrowRight } from "lucide-react";
import { SectionLabel } from "./SectionLabel";

const POSTS = [
  { 
    date: "2026 · 05 · 10", 
    title: "Setting Up Your First Node.js Application Step-by-Step", 
    tag: "Node.js",
    url: "https://stngndjs.hashnode.dev/setting-up-your-first-node-js-application-step-by-step" // REPLACE # WITH YOUR ACTUAL LINK
  },
  { 
    date: "2026 · 05 · 10", 
    title: "JWT Authentication in Node.js Explained Simply", 
    tag: "Security",
    url: "https://jwtauthndjs.hashnode.dev/jwt-authentication-in-node-js-explained-simply" // REPLACE # WITH YOUR ACTUAL LINK
  },
  { 
    date: "2026 · 04 · 3", 
    title: "Understanding Callback Functions in JavaScript (A Complete Beginner Guide)", 
    tag: "JavaScript",
    url: "https://cbijs.hashnode.dev/understanding-callback-functions-in-javascript-a-complete-beginner-guide/" // REPLACE # WITH YOUR ACTUAL LINK
  },
  { 
    date: "2026 · 05 · 9", 
    title: "Sessions vs JWT vs Cookies: Understanding Authentication Approaches", 
    tag: "Architecture",
    url: "https://sesca.hashnode.dev/sessions-vs-jwt-vs-cookies-understanding-authentication-approaches" // REPLACE # WITH YOUR ACTUAL LINK
  },
];

export function Blog() {
  return (
    <section id="blog" className="py-24 lg:py-32" style={{ background: "#faf8f5" }}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <SectionLabel>JOURNAL</SectionLabel>
        <motion.h2
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-[820px] font-serif text-4xl leading-[1.1] text-[color:#1a1410] sm:text-5xl lg:text-[56px]"
        >
         Observations from the  <span className="italic">build.</span>
        </motion.h2>

        <div className="mt-14 border-t border-[color:#e8e0d5]">
          {POSTS.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.url} // Link is now dynamically attached
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group flex items-center gap-4 border-b border-[color:#e8e0d5] py-6 sm:py-8"
            >
              <div className="hidden w-[140px] shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:#a89880] sm:block">
                {p.date}
              </div>
              <div className="flex-1">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:#a89880] sm:hidden">
                  {p.date}
                </div>
                <h3 className="mt-1 font-serif text-2xl text-[color:#1a1410] transition-colors group-hover:text-[color:#c8430f] sm:mt-0 sm:text-3xl">
                  {p.title}
                </h3>
              </div>
              <div className="hidden items-center gap-6 md:flex">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.22em]"
                  style={{ padding: "4px 10px", border: "1px solid #e8e0d5", color: "#6b5c4a" }}
                >
                  {p.tag}
                </span>
                <span
                  className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.2em] opacity-0 transition-all -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                  style={{ color: "#c8430f" }}
                >
                  Read more <ArrowRight size={14} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}