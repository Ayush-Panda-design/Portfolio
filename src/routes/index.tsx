import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import "@/components/jc/jc.css";
import { SmoothScroll, scrollToId, ScrollProgress, Cursor, Preloader } from "@/components/jc/lib";
import { Nav, TopBar, SoundToggle } from "@/components/jc/Nav";
import { Hero } from "@/components/jc/Hero";
import { Story } from "@/components/jc/Story";
import { Journey } from "@/components/jc/Journey";
import { Work } from "@/components/jc/Work";
// import { Live } from "@/components/jc/Live"; // hidden for now
import { Stack } from "@/components/jc/Stack";
import { Process } from "@/components/jc/Process";
import { Desk } from "@/components/jc/Desk";
import { GitHub } from "@/components/jc/GitHub";
import { Recognition } from "@/components/jc/Recognition";
import { Contact } from "@/components/jc/Contact";
import { Tracker, RouteChip } from "@/components/jc/Backdrop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ayush Panda — Full-Stack Web Developer" },
      {
        name: "description",
        content:
          "CS undergrad at VSSUT building real, shipped full-stack products with React, Next.js, Node.js & PostgreSQL.",
      },
      { property: "og:title", content: "Ayush Panda — Full-Stack Web Developer" },
      { property: "og:description", content: "CS undergrad at VSSUT building real, shipped full-stack products." },
    ],
  }),
  component: Index,
});

function Index() {
  const [mode, setMode] = useState<"night" | "day">("night");
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    if (!ready) return;
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const map: Record<string, string> = { projects: "work", skills: "stack", learning: "journey", blog: "life", intro: "top" };
    requestAnimationFrame(() => scrollToId(map[hash] ?? hash, true));
  }, [ready]);

  // Theme switch: a circular reveal that grows from the button, plus a ripple ring
  const toggle = (e: MouseEvent) => {
    const next = mode === "night" ? "day" : "night";
    const x = e.clientX, y = e.clientY;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const ring = document.createElement("div");
    ring.className = "jc-flash";
    Object.assign(ring.style, { left: `${x}px`, top: `${y}px`, width: "20px", height: "20px", marginLeft: "-10px", marginTop: "-10px" });
    document.body.appendChild(ring);
    ring.animate([{ transform: "scale(1)", opacity: 0.9 }, { transform: `scale(${(r * 2) / 20})`, opacity: 0 }], { duration: 1100, easing: "cubic-bezier(.22,1,.36,1)" }).onfinish = () => ring.remove();

    const apply = () => flushSync(() => setMode(next));
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (!doc.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) return apply();
    doc.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 1000, easing: "cubic-bezier(.65,0,.25,1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  return (
    <main className="jc" data-mode={mode}>
      <Preloader onDone={() => setReady(true)} />
      <SmoothScroll />
      <Tracker onActive={setActive} />
      <RouteChip active={active} />
      <ScrollProgress />
      <Cursor />
      <TopBar mode={mode} onToggle={toggle} />
      <SoundToggle />
      <Nav resumeHref="/resume/Ayush_Panda_Resume.pdf" />
      <Hero ready={ready} />
      <Journey />
      <Work />
      {/* <Live /> — hidden for now; component kept in components/jc/Live.tsx */}
      <Stack />
      <Process />
      <GitHub />
      <Recognition />
      <Story />
      <Desk />
      <Contact />
    </main>
  );
}
