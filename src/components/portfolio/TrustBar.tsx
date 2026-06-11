const TECH = ["React", "Next.js", "Node.js", "PostgreSQL", "Docker", "TypeScript", "Redis"];

export function TrustBar() {
  const items = (
    <div className="flex items-center gap-10 px-6 whitespace-nowrap">
      {TECH.map((t, i) => (
        <div key={`${t}-${i}`} className="flex items-center gap-10">
          <span className="font-mono text-[12px] tracking-[0.2em] text-[color:#a89880]">{t}</span>
          {i < TECH.length - 1 && <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#c8430f" }} />}
        </div>
      ))}
    </div>
  );
  return (
    <section style={{ background: "#2a2118" }} className="h-[72px] overflow-hidden">
      <div className="hidden h-full items-center justify-center md:flex">{items}</div>
      <div className="flex h-full items-center md:hidden">
        <div className="marquee flex">
          {items}
          {items}
        </div>
      </div>
    </section>
  );
}
