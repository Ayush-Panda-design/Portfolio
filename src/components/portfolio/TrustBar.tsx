const TECH = [
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Firebase",
  "Socket.io",
  "Kafka",
  "Docker",
  "TypeScript",
  "Expo",
];

export function TrustBar() {
  return (
    <section className="mb-2 overflow-hidden rounded-xl border border-border-line bg-bg-elevated/60 py-3">
      <div className="marquee flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-6 px-4">
            {TECH.map((t) => (
              <div key={`${copy}-${t}`} className="flex items-center gap-6">
                <span className="font-mono text-[11px] tracking-[0.14em] text-ink-soft">{t}</span>
                <span className="h-1 w-1 rounded-full bg-accent" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
