import { motion } from "framer-motion";
import { PauseIcon as Pause, PlayIcon as Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const ACCENT: Record<string, { ring: string; glow: string; shimmer: string }> = {
  teal: {
    ring: "group-hover:ring-accent/40",
    glow: "group-hover:shadow-[0_28px_56px_-24px_rgba(94,234,212,0.55)]",
    shimmer: "from-accent/0 via-accent/25 to-accent/0",
  },
  violet: {
    ring: "group-hover:ring-violet-400/40",
    glow: "group-hover:shadow-[0_28px_56px_-24px_rgba(167,139,250,0.5)]",
    shimmer: "from-violet-400/0 via-violet-400/25 to-violet-400/0",
  },
  amber: {
    ring: "group-hover:ring-amber-400/40",
    glow: "group-hover:shadow-[0_28px_56px_-24px_rgba(251,191,36,0.45)]",
    shimmer: "from-amber-400/0 via-amber-400/25 to-amber-400/0",
  },
  pink: {
    ring: "group-hover:ring-pink-400/40",
    glow: "group-hover:shadow-[0_28px_56px_-24px_rgba(244,114,182,0.45)]",
    shimmer: "from-pink-400/0 via-pink-400/25 to-pink-400/0",
  },
};

type Props = {
  src: string;
  title: string;
  accent?: string;
  active?: boolean;
};

export function ProjectDemoVideo({ src, title, accent = "teal", active = true }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const a = ACCENT[accent] ?? ACCENT.teal;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !active) return;

    video.muted = true;
    video.defaultMuted = true;
    video
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));

    return () => {
      video.pause();
      video.currentTime = 0;
      setPlaying(false);
    };
  }, [active, src]);

  const toggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  }, []);

  if (!active) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.012 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={cn(
        "group relative aspect-[944/451] w-full overflow-hidden rounded-xl bg-black ring-1 ring-border-line/60 transition-shadow duration-500",
        a.ring,
        a.glow,
      )}
    >
      {/* 1 — shimmer sweep on hover */}
      <motion.div
        className={cn(
          "pointer-events-none absolute inset-0 z-20 bg-gradient-to-r opacity-0",
          a.shimmer,
        )}
        animate={hovered ? { x: ["-120%", "120%"], opacity: [0, 0.9, 0] } : { x: "-120%", opacity: 0 }}
        transition={{ duration: 0.85, ease: "easeInOut" }}
      />

      {/* 2 — soft vignette edges */}
      <div className="pointer-events-none absolute inset-0 z-[5] shadow-[inset_0_0_80px_rgba(0,0,0,0.35)]" />

      {/* 3 — full video, no cropping */}
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="auto"
        aria-label={`${title} demo video`}
        className="absolute inset-0 h-full w-full object-contain"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {/* 4 — play / pause control */}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause ${title} demo` : `Play ${title} demo`}
        className="absolute inset-0 z-30 flex items-center justify-center"
      >
        <motion.span
          animate={
            !playing
              ? { scale: [1, 1.08, 1], opacity: 1 }
              : { scale: 1, opacity: hovered ? 1 : 0 }
          }
          transition={
            !playing
              ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.2 }
          }
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.94 }}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white shadow-lg backdrop-blur-md"
        >
          {playing ? (
            <Pause size={22} fill="currentColor" />
          ) : (
            <Play size={22} fill="currentColor" className="ml-0.5" />
          )}
        </motion.span>
      </button>
    </motion.div>
  );
}
