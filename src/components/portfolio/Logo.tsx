export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M30 4 L56 30 L30 56 L4 30 Z" />
      <text x="30" y="36" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="16" fill="currentColor" stroke="none" letterSpacing="1">
        AP
      </text>
    </svg>
  );
}
