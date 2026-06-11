export function SectionLabel({ children }: { children: string }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span className="font-mono text-[11px] tracking-[0.3em]" style={{ color: "#c8430f" }}>
        {children}
      </span>
      <span className="h-px flex-1 max-w-[120px]" style={{ background: "#c8430f", opacity: 0.4 }} />
    </div>
  );
}
