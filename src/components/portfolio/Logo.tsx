export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="6" y="6" width="48" height="48" rx="12" />
      <text
        x="30"
        y="37"
        textAnchor="middle"
        fontFamily="Syne, system-ui, sans-serif"
        fontSize="15"
        fontWeight="700"
        fill="currentColor"
        stroke="none"
        letterSpacing="1"
      >
        AP
      </text>
    </svg>
  );
}
