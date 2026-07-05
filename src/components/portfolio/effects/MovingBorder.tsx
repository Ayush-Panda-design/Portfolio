import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function MovingBorder({
  children,
  className,
  containerClassName,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <div className={cn("relative inline-flex overflow-hidden rounded-full p-[1px]", containerClassName)}>
      <span className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#5eead4_12%,#38bdf8_24%,transparent_36%)]" />
      <div className={cn("relative rounded-full bg-bg", className)}>{children}</div>
    </div>
  );
}
