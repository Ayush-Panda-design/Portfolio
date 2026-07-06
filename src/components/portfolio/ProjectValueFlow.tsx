import { cn } from "@/lib/utils";
import { ChevronRightIcon as ChevronRight } from "lucide-react";

export function ProjectValueFlow({ steps }: { steps: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-1.5 sm:gap-2">
      {steps.map((step, i) => (
        <span key={step} className="flex items-center gap-1.5 sm:gap-2">
          <span
            className={cn(
              "rounded-lg border border-accent/25 bg-accent/8 px-2.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-accent sm:text-[11px]",
              i === 0 && "border-accent/40 bg-accent/12",
            )}
          >
            {step}
          </span>
          {i < steps.length - 1 && (
            <ChevronRight size={12} className="shrink-0 text-ink-faint" aria-hidden />
          )}
        </span>
      ))}
    </div>
  );
}
