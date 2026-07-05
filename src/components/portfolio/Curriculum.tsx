import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  NetworkIcon as Network,
  Code2Icon as Code2,
  BracesIcon as Braces,
  ServerIcon as Server,
  LayoutIcon as Layout,
  LayersIcon as Layers,
  BotIcon as Bot,
  ContainerIcon as Container,
} from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { SpotlightCard } from "./effects/Spotlight";
import { TextGenerate } from "./effects/TextGenerate";
import {
  DnsDiagram,
  TcpHandshakeDiagram,
  ClientServerDiagram,
  StackLayersDiagram,
} from "./Diagrams";

type Track = {
  id: string;
  icon: typeof Network;
  title: string;
  subtitle: string;
  color: string;
  topics: { heading: string; items: string[] }[];
  diagram?: "dns" | "tcp" | "client" | "stack";
};

const TRACKS: Track[] = [
  {
    id: "fundamentals",
    icon: Network,
    title: "Fundamentals",
    subtitle: "How the internet actually works",
    color: "text-accent",
    diagram: "dns",
    topics: [
      {
        heading: "Computer Networks",
        items: [
          "What is Internet?",
          "World Wide Web (WWW)",
          "Data Transferring",
          "IP Address & Ports",
          "ISPs & Routers",
        ],
      },
      {
        heading: "Domain Name Systems",
        items: [
          "What is DNS?",
          "How DNS resolves domain names",
          "A, CNAME, MX Records",
          "Root, TLDs, Authoritative servers",
          "Recursive DNS Resolver",
        ],
      },
      {
        heading: "Client–Server Architecture",
        items: [
          "Earlier system architectures",
          "Client–Server model",
          "HTTP Request–Response cycle",
          "Web Servers & Hosting",
        ],
      },
      {
        heading: "Internet Protocols",
        items: [
          "TCP/IP · SYN, SYN-ACK, ACK",
          "UDP · Reliability vs Speed",
          "HTTP / HTTPS · TLS/SSL",
          "WebSocket · WebRTC",
        ],
      },
    ],
  },
  {
    id: "building-blocks",
    icon: Code2,
    title: "Building Blocks",
    subtitle: "HTML, CSS & responsive layouts",
    color: "text-sky-300",
    diagram: "client",
    topics: [
      {
        heading: "HTML",
        items: ["Skeleton for the web", "Tags & Elements", "Semantic HTML", "Forms & HTML5 inputs", "Data validation"],
      },
      {
        heading: "CSS",
        items: ["Box Model", "Specificity & Selectors", "Flexbox & Grid", "Media Queries", "Animations & Transitions"],
      },
      {
        heading: "Advanced CSS",
        items: ["Pseudo classes & elements", "UX for links, buttons, forms", "Tailwind CSS", "Shadows & Gradients"],
      },
    ],
  },
  {
    id: "javascript",
    icon: Braces,
    title: "JavaScript & Browser",
    subtitle: "Language, DOM, async & network",
    color: "text-amber-300",
    topics: [
      {
        heading: "Core Language",
        items: ["Variables & types", "Functions & closures", "Objects & JSON", "Arrays & methods", "ES6+ features"],
      },
      {
        heading: "OOP & Async",
        items: ["Classes & prototypes", "Promises & async/await", "Callbacks", "Error handling"],
      },
      {
        heading: "DOM & Events",
        items: ["DOM tree", "Event listeners", "Bubbling & delegation", "Fetch API & CORS"],
      },
      {
        heading: "Advanced JS",
        items: ["Lexical scoping", "this / call / apply / bind", "Custom errors"],
      },
    ],
  },
  {
    id: "typescript",
    icon: Braces,
    title: "TypeScript Essentials",
    subtitle: "JavaScript with types",
    color: "text-blue-300",
    topics: [
      {
        heading: "Type System",
        items: ["Basic types", "Interfaces vs Type Aliases", "Union & Intersection", "Generics"],
      },
      {
        heading: "Tooling",
        items: ["tsconfig.json", "TypeScript compiler", "Linting & formatting"],
      },
    ],
  },
  {
    id: "backend",
    icon: Server,
    title: "Backend Engineering",
    subtitle: "Node, APIs, auth & realtime",
    color: "text-emerald-300",
    diagram: "tcp",
    topics: [
      {
        heading: "Node.js & Express",
        items: ["Event loop", "HTTP servers", "Routes & middleware", "REST API design"],
      },
      {
        heading: "Databases",
        items: ["SQL vs NoSQL", "PostgreSQL", "MongoDB / Mongoose", "Drizzle ORM", "Redis"],
      },
      {
        heading: "Auth & Security",
        items: ["JWT auth", "bcrypt", "RBAC", "OAuth 2.0 / OIDC", "Rate limiting"],
      },
      {
        heading: "Realtime & Scale",
        items: ["WebSockets / socket.io", "Redis streams", "Kafka patterns", "Logging & OTEL"],
      },
    ],
  },
  {
    id: "frontend",
    icon: Layout,
    title: "Modern Frontends",
    subtitle: "React, hooks & performance",
    color: "text-cyan-300",
    topics: [
      {
        heading: "React Core",
        items: ["Components & props", "useState & effects", "Hooks", "Routing (TanStack / React Router)"],
      },
      {
        heading: "State & Forms",
        items: ["Context API", "React Hook Form", "Performance (memo, Suspense)"],
      },
      {
        heading: "Patterns",
        items: ["Custom hooks", "Compound components", "Feature-based structure"],
      },
    ],
  },
  {
    id: "fullstack",
    icon: Layers,
    title: "Full Stack",
    subtitle: "Next.js & end-to-end apps",
    color: "text-violet-300",
    diagram: "stack",
    topics: [
      {
        heading: "Next.js",
        items: ["File-based routing", "Layouts", "SSG / SSR / ISR", "API routes", "Server Actions"],
      },
    ],
  },
  {
    id: "ai",
    icon: Bot,
    title: "AI Integrations",
    subtitle: "Agents, workflows & LLMs",
    color: "text-pink-300",
    topics: [
      {
        heading: "GenAI",
        items: ["LLMs & use cases", "Workflows vs Agents", "Inngest orchestration", "Vercel AI workflows"],
      },
    ],
  },
  {
    id: "devops",
    icon: Container,
    title: "DevOps",
    subtitle: "Docker, AWS & delivery",
    color: "text-orange-300",
    topics: [
      {
        heading: "Containers & Cloud",
        items: ["Docker & Compose", "EC2 & Security Groups", "Load Balancers", "CloudFront CDN"],
      },
    ],
  },
];

function DiagramFor({ type }: { type?: Track["diagram"] }) {
  if (type === "dns") return <DnsDiagram />;
  if (type === "tcp") return <TcpHandshakeDiagram />;
  if (type === "client") return <ClientServerDiagram />;
  if (type === "stack") return <StackLayersDiagram />;
  return null;
}

export function Curriculum() {
  const [active, setActive] = useState(TRACKS[0].id);
  const track = TRACKS.find((t) => t.id === active) ?? TRACKS[0];
  const Icon = track.icon;

  return (
    <section id="curriculum" className="scroll-mt-24 py-14 lg:py-16">
      <SectionLabel num="03.">Knowledge</SectionLabel>
      <h2 className="font-display text-2xl font-bold leading-snug tracking-tight text-ink sm:text-3xl">
        <TextGenerate words="From packets to production." />
      </h2>
      <p className="mt-4 text-[15px] leading-[1.8] text-ink-soft">
          An interactive map of everything I study and ship with — networks, browsers, backends, React,
          AI workflows, and cloud delivery.
        </p>

        <div className="mt-8 space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {TRACKS.map((t, i) => {
              const TIcon = t.icon;
              const isActive = t.id === active;
              return (
                <motion.button
                  key={t.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setActive(t.id)}
                  className={`group flex min-w-[160px] shrink-0 items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-all ${
                    isActive
                      ? "border-accent/40 bg-accent/10 shadow-[0_0_30px_-12px_var(--color-accent)]"
                      : "border-border-line bg-surface/60 hover:border-accent/25 hover:bg-surface"
                  }`}
                >
                  <TIcon size={16} className={isActive ? "text-accent" : "text-ink-faint"} />
                  <div className="min-w-0">
                    <div className={`text-[12px] font-semibold ${isActive ? "text-ink" : "text-ink-soft"}`}>
                      {t.title}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <SpotlightCard className="p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink">{track.title}</h3>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                      {track.subtitle}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {track.topics.map((topic, ti) => (
                      <motion.div
                        key={topic.heading}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: ti * 0.06 }}
                        className="rounded-xl border border-border-line bg-bg/50 p-4"
                      >
                        <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                          {topic.heading}
                        </div>
                        <ul className="space-y-2">
                          {topic.items.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-[13px] leading-snug text-ink-soft">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <DiagramFor type={track.diagram} />
                    {!track.diagram && (
                      <div className="flex h-full min-h-[180px] items-center justify-center rounded-xl border border-dashed border-border-line bg-bg/40 p-6 text-center">
                        <div>
                          <div className="font-display text-lg font-semibold text-ink">{track.title}</div>
                          <p className="mt-2 text-[13px] text-ink-soft">
                            Concepts I apply when shipping real products end-to-end.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          </AnimatePresence>
        </div>
    </section>
  );
}
