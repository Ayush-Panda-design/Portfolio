import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ImageIcon as ImageIcon, XIcon as X, ZoomInIcon as ZoomIn } from "lucide-react";
import type { ProjectScreenshot } from "@/data/projects";
import { cn } from "@/lib/utils";

const ACCENT_RING: Record<string, string> = {
  teal: "group-hover:ring-accent/40 hover:shadow-[0_20px_40px_-24px_rgba(94,234,212,0.55)]",
  violet: "group-hover:ring-violet-400/40 hover:shadow-[0_20px_40px_-24px_rgba(167,139,250,0.5)]",
  amber: "group-hover:ring-amber-400/40 hover:shadow-[0_20px_40px_-24px_rgba(251,191,36,0.45)]",
  pink: "group-hover:ring-pink-400/40 hover:shadow-[0_20px_40px_-24px_rgba(244,114,182,0.45)]",
};

type Props = {
  screenshots: ProjectScreenshot[];
  accent: string;
  compact?: boolean;
};

function PlaceholderSlot({ label }: { label: string }) {
  return (
    <div className="flex aspect-[16/10] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border-line bg-bg/40 p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border-line bg-surface/60">
        <ImageIcon size={18} className="text-ink-faint" />
      </div>
      <div className="text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">Coming soon</p>
        <p className="mt-1 text-[12px] text-ink-soft">{label}</p>
      </div>
    </div>
  );
}

function Shot({
  shot,
  accent,
  featured,
  onOpen,
}: {
  shot: ProjectScreenshot;
  accent: string;
  featured?: boolean;
  onOpen?: (src: string) => void;
}) {
  if (shot.placeholder || !shot.src) {
    return <PlaceholderSlot label={shot.label} />;
  }

  const ring = ACCENT_RING[accent] ?? ACCENT_RING.teal;

  return (
    <button
      type="button"
      onClick={() => onOpen?.(shot.src!)}
      className={cn(
        "group flex w-full flex-col overflow-hidden rounded-xl border border-border-line/80 bg-bg/30 text-left ring-1 ring-transparent transition-all duration-300",
        ring,
        featured ? "col-span-full" : "",
      )}
    >
      <div className={cn("relative w-full overflow-hidden", featured ? "aspect-[16/9]" : "aspect-[16/10]")}>
        <img
          src={shot.src}
          alt={shot.alt}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-bg/70 text-ink opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
          <ZoomIn size={13} />
        </span>
      </div>
      <div className="border-t border-border-line/70 bg-bg/50 px-3.5 py-2.5 sm:px-4 sm:py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">{shot.label}</span>
      </div>
    </button>
  );
}

export function ProjectCover({ shot, accent }: { shot: ProjectScreenshot; accent: string }) {
  if (shot.placeholder || !shot.src) return null;
  const ring = ACCENT_RING[accent] ?? ACCENT_RING.teal;

  return (
    <div
      className={cn(
        "relative mx-5 mt-5 overflow-hidden rounded-xl border border-border-line/80 sm:mx-6",
        ring.replace("group-hover:", ""),
      )}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <img src={shot.src} alt={shot.alt} className="h-full w-full object-cover object-top" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-bg/75 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink backdrop-blur-md">
          {shot.label}
        </span>
      </div>
    </div>
  );
}

export function ProjectGallery({ screenshots, accent, compact }: Props) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [hero, ...rest] = screenshots;

  if (compact) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {screenshots.slice(0, 3).map((shot) =>
          shot.placeholder || !shot.src ? (
            <div
              key={shot.label}
              className="flex aspect-[4/3] items-center justify-center rounded-lg border border-dashed border-border-line bg-bg/30"
            >
              <ImageIcon size={14} className="text-ink-faint" />
            </div>
          ) : (
            <div key={shot.src} className="overflow-hidden rounded-lg border border-border-line/70">
              <img src={shot.src} alt={shot.alt} className="aspect-[4/3] w-full object-cover object-top" />
            </div>
          ),
        )}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">Product preview</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="sm:col-span-2"
          >
            <Shot shot={hero} accent={accent} featured onOpen={setLightbox} />
          </motion.div>
          {rest.map((shot, i) => (
            <motion.div
              key={shot.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * (i + 1) }}
            >
              <Shot shot={shot} accent={accent} onOpen={shot.src ? setLightbox : undefined} />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-bg/90 p-4 backdrop-blur-md sm:p-8"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-border-line bg-surface text-ink hover:border-accent/40 hover:text-accent sm:right-8 sm:top-8"
              aria-label="Close preview"
            >
              <X size={18} />
            </button>
            <motion.img
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              src={lightbox}
              alt="Project preview"
              className="max-h-[88vh] max-w-full rounded-xl border border-border-line object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
