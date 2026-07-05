import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Particle = { id: number; x: number; y: number; size: number; delay: number; dur: number };

export function Sparkles({ className, count = 40 }: { className?: string; count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        delay: Math.random() * 4,
        dur: Math.random() * 3 + 2,
      })),
    );
  }, [count]);

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-accent"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0,
            animation: `sparkle ${p.dur}s ease-in-out ${p.delay}s infinite`,
            boxShadow: "0 0 6px 1px rgba(94,234,212,0.6)",
          }}
        />
      ))}
    </div>
  );
}
