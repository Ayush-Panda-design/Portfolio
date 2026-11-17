import { Counter, Reveal, SecHead } from "./lib";
import { setHot } from "./bus";
import { TOTAL_PROJECTS } from "@/data/projects";

const WORDS = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "tRPC", "Prisma", "Docker", "Redis", "Kafka", "Socket.io", "Tailwind"];

export function Story() {
  return (
    <section id="about" data-scene="dean" className="jc-sec jc-center">
      <div className="jc-wrap">
        <SecHead label="How I got here" title="A CS student who learns by shipping." variant="ink" />
        <Reveal delay={0.1}>
          <p className="jc-big">
            Started with CSS landing pages. Kept going until I was building products with auth, realtime, background jobs and AI, and putting them <em>live</em>.
          </p>
        </Reveal>
        <div className="jc-stats">
          {[
            { v: <Counter to={5} suffix="th" />, l: "semester, B.Tech CSE at VSSUT" },
            { v: <Counter to={8.27} decimals={2} />, l: "CGPA, shipping on the side" },
            { v: <Counter to={TOTAL_PROJECTS} suffix="+" />, l: "projects built, 4 in production" },
            { v: "Open", l: "to internships and collabs" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="jc-stat" onMouseEnter={() => setHot(`dw${i}`, true)} onMouseLeave={() => setHot(`dw${i}`, false)}>
                <b>{s.v}</b>
                <span>{s.l}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="jc-marq" aria-hidden>
        <div>
          {[...WORDS, ...WORDS].map((w, i) => (
            <span key={i}>{w}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
