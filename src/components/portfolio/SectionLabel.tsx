export function SectionLabel({
  children,
  num,
}: {
  children: string;
  num?: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      {num && (
        <span className="font-mono text-[12px] font-medium text-accent">{num}</span>
      )}
      <span className="font-mono text-[12px] font-medium tracking-[0.22em] text-ink-soft">
        {children}
      </span>
      <span className="h-px max-w-[64px] flex-1 bg-border-line" />
    </div>
  );
}
