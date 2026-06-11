import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

const base = ({ size = 18, ...p }: P) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...p,
});

export const Github = (p: P) => (
  <svg {...base(p)}>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>
  </svg>
);
export const Linkedin = (p: P) => (
  <svg {...base(p)}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
export const Twitter = (p: P) => (
  <svg {...base(p)}>
    <path d="M22 4.01s-2 .6-4 .9a4.5 4.5 0 0 0-7.7 4.1A12.7 12.7 0 0 1 1.7 3.2s-3.6 7.3 5.3 11.6c-2 1.4-4 1.8-6 1.4 8 4.6 18 0 18-10.5 0-.3 0-.6-.1-.9.9-.6 2-1.4 3.1-2.8z"/>
  </svg>
);
export const Hashnode = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 9v6a3 3 0 0 0 .9 2.1l4 4a3 3 0 0 0 2.1.9h4a3 3 0 0 0 2.1-.9l4-4A3 3 0 0 0 21 15V9a3 3 0 0 0-.9-2.1l-4-4A3 3 0 0 0 14 2h-4a3 3 0 0 0-2.1.9l-4 4A3 3 0 0 0 3 9z"/>
    <circle cx="12" cy="12" r="3.5"/>
  </svg>
);
