import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BriefcaseIcon, HouseIcon, MailIcon, MoonIcon, RouteIcon, SunIcon, UserIcon, VolumeXIcon } from "lucide-react";
import { scrollToId } from "./lib";

const ITEMS = [
  { id: "top", label: "Home", Icon: HouseIcon },
  { id: "journey", label: "Journey", Icon: RouteIcon },
  { id: "work", label: "Work", Icon: BriefcaseIcon },
  { id: "about", label: "About", Icon: UserIcon },
  { id: "contact", label: "Contact", Icon: MailIcon },
] as const;

export function Nav({ resumeHref }: { resumeHref: string }) {
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    const els = ITEMS.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <motion.nav
      className="jc-nav jc-glass"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 170, damping: 18, delay: 2 }}
      aria-label="Primary"
    >
      {ITEMS.map(({ id, label, Icon }) => (
        <button key={id} onClick={() => scrollToId(id)} aria-current={active === id}>
          {active === id && <motion.span layoutId="jc-nav-pill" className="pill" transition={{ type: "spring", stiffness: 360, damping: 28 }} />}
          {active === id && (
            <motion.span initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} style={{ display: "flex" }}>
              <Icon size={18} />
            </motion.span>
          )}
          <span>{label}</span>
        </button>
      ))}
      <a className="cta" href={resumeHref} target="_blank" rel="noreferrer">
        Resume ↗
      </a>
    </motion.nav>
  );
}

const TOUR = ["top", "journey", "work", "stack", "process", "github", "recognition", "about", "life", "contact"];

export function TopBar({ mode, onToggle }: { mode: "night" | "day"; onToggle: (e: React.MouseEvent) => void }) {
  const [touring, setTouring] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!touring) return;
    let i = 0;
    const step = () => {
      const id = TOUR[i];
      // the journey is a tall pinned section: let it play out before moving on
      if (id === "journey") {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          window.__lenis?.scrollTo(top + el.offsetHeight - window.innerHeight, { duration: 7, easing: (t: number) => t });
          i++;
          timer.current = setTimeout(step, 8000);
          return;
        }
      }
      scrollToId(id);
      i++;
      if (i >= TOUR.length) {
        timer.current = setTimeout(() => setTouring(false), 3500);
        return;
      }
      timer.current = setTimeout(step, 3800);
    };
    step();
    const stop = () => setTouring(false);
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    return () => {
      clearTimeout(timer.current);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
    };
  }, [touring]);

  return (
    <motion.div className="jc-topbar" initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 160, damping: 18, delay: 2.1 }}>
      <button className="jc-tpill jc-glass" onClick={() => setTouring((t) => !t)} aria-pressed={touring}>
        <span className="jc-orb" />
        <span className="lbl">{touring ? "Stop tour" : "Take a tour"}</span>
      </button>
      <button className="jc-tpill noav jc-glass" onClick={onToggle} aria-label={mode === "night" ? "Switch to day" : "Switch to night"}>
        <motion.span key={mode} initial={{ rotate: -120, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 12 }} style={{ display: "flex", color: "var(--sun)" }}>
          {mode === "night" ? <SunIcon size={22} /> : <MoonIcon size={22} />}
        </motion.span>
        <span className="lbl">{mode === "night" ? "Day" : "Night"}</span>
      </button>
    </motion.div>
  );
}

/** Soft generated ambient pad (no audio file needed). */
export function SoundToggle() {
  const [on, setOn] = useState(false);
  const ctx = useRef<AudioContext | null>(null);
  const master = useRef<GainNode | null>(null);
  const oscs = useRef<OscillatorNode[]>([]);

  const start = () => {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const c = new AC();
    const g = c.createGain();
    g.gain.value = 0;
    const f = c.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 700;
    const lfo = c.createOscillator();
    const lg = c.createGain();
    lfo.frequency.value = 0.12;
    lg.gain.value = 300;
    lfo.connect(lg).connect(f.frequency);
    [110, 164.81, 207.65, 277.18, 329.63].forEach((hz, i) => {
      const o = c.createOscillator();
      o.type = i % 2 ? "sine" : "triangle";
      o.frequency.value = hz;
      o.detune.value = (i - 2) * 4;
      const og = c.createGain();
      og.gain.value = 0.05;
      o.connect(og).connect(f);
      o.start();
      oscs.current.push(o);
    });
    f.connect(g).connect(c.destination);
    lfo.start();
    oscs.current.push(lfo);
    g.gain.linearRampToValueAtTime(0.5, c.currentTime + 2.5);
    ctx.current = c;
    master.current = g;
  };

  const toggle = () => {
    if (!on) {
      if (!ctx.current) start();
      else void ctx.current.resume();
      master.current?.gain.cancelScheduledValues(0);
      master.current?.gain.linearRampToValueAtTime(0.5, (ctx.current?.currentTime ?? 0) + 1.5);
      setOn(true);
    } else {
      master.current?.gain.cancelScheduledValues(0);
      master.current?.gain.linearRampToValueAtTime(0, (ctx.current?.currentTime ?? 0) + 0.8);
      setTimeout(() => void ctx.current?.suspend(), 900);
      setOn(false);
    }
  };

  useEffect(() => () => void ctx.current?.close(), []);

  return (
    <motion.button
      className={`jc-sound jc-glass ${on ? "on" : ""}`}
      onClick={toggle}
      aria-label={on ? "Mute ambient sound" : "Play ambient sound"}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 14, delay: 2.2 }}
    >
      {on ? (
        <span className="jc-eqbars"><i /><i /><i /><i /></span>
      ) : (
        <VolumeXIcon size={20} />
      )}
    </motion.button>
  );
}

