import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRightIcon as ArrowRight,
  BotIcon as Bot,
  PlayIcon as Play,
  SendIcon as Send,
  SparklesIcon as Sparkles,
  UserIcon as User,
  ZapIcon as Zap,
} from "lucide-react";
import { AgentMessageMarkdown } from "@/components/portfolio/AgentMessageMarkdown";
import { Github } from "@/components/portfolio/icons";
import { askProjectAgent } from "@/lib/api/project-agent.functions";
import { PROJECT_DETAILS } from "@/data/project-details";
import type { ProductionProject } from "@/data/projects";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const ACCENT_GLOW: Record<string, string> = {
  teal: "from-accent/50 via-cyan-400/20 to-sky-500/30",
  violet: "from-violet-400/50 via-fuchsia-400/20 to-purple-500/30",
  amber: "from-amber-400/50 via-orange-400/20 to-yellow-500/25",
  pink: "from-pink-400/50 via-rose-400/20 to-fuchsia-500/30",
};

const CAPABILITIES = ["Source code", "README", "Architecture", "Deploy"];

function formatSync(date: string | null) {
  if (!date) return "curated knowledge";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function MessageBubble({
  message,
  agentName,
  index,
}: {
  message: Msg;
  agentName: string;
  index: number;
}) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className={cn("flex gap-2.5", isUser ? "flex-row-reverse" : "flex-row")}
    >
      <span
        className={cn(
          "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border",
          isUser
            ? "border-accent/35 bg-accent/12 text-accent"
            : "border-border-line bg-bg-elevated text-accent",
        )}
      >
        {isUser ? <User size={13} /> : <Bot size={13} />}
      </span>
      <div className={cn("min-w-0 max-w-[88%]", isUser ? "items-end" : "items-start")}>
        <p
          className={cn(
            "mb-1 font-mono text-[8px] uppercase tracking-[0.16em]",
            isUser ? "text-right text-ink-faint" : "text-accent/80",
          )}
        >
          {isUser ? "You" : agentName}
        </p>
        <div
          className={cn(
            "rounded-2xl px-3.5 py-3 shadow-sm",
            isUser
              ? "border border-accent/25 bg-gradient-to-br from-accent/16 to-accent/6"
              : "border border-border-line/90 bg-bg-elevated/90 backdrop-blur-sm",
          )}
        >
          {isUser ? (
            <p className="text-[13px] leading-relaxed text-ink">{message.content}</p>
          ) : (
            <AgentMessageMarkdown content={message.content} />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectAgent({ project }: { project: ProductionProject }) {
  const detail = PROJECT_DETAILS[project.id];
  if (!detail) return null;

  const glow = ACCENT_GLOW[project.accent] ?? ACCENT_GLOW.teal;

  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: detail.agentIntro },
  ]);
  const [demoPlayed, setDemoPlayed] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [syncedAt, setSyncedAt] = useState<string | null>(null);
  const [filesUsed, setFilesUsed] = useState<number | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const playDemo = () => {
    if (demoPlayed || loading) return;
    setDemoPlayed(true);
    setMessages((m) => [
      ...m,
      { role: "user", content: detail.agentDemo.question },
      { role: "assistant", content: detail.agentDemo.answer },
    ]);
  };

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setLoading(true);
    try {
      const { reply, syncedAt: sync, filesUsed: files } = await askProjectAgent({
        data: {
          projectId: project.id,
          message: q,
          history: next.slice(-10),
        },
      });
      if (sync) setSyncedAt(sync);
      if (files != null) setFilesUsed(files);
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `Something went wrong. Try again or browse ${project.github} directly.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Ambient glow behind panel */}
      <div
        className={cn(
          "pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br opacity-40 blur-2xl",
          glow,
        )}
        aria-hidden
      />

      {/* Animated gradient border */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="agent-border-glow relative rounded-[20px] p-[1px] shadow-[0_32px_80px_-24px_rgba(0,0,0,0.65)]"
      >
        <div className="flex flex-col overflow-hidden rounded-[19px] bg-bg-elevated">
          {/* Top feature strip */}
          <div className="relative overflow-hidden border-b border-border-line/80 bg-bg/80 px-4 py-2.5">
            <div className="agent-panel-mesh pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <Zap size={11} className="text-accent" />
                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-accent">
                  Code-aware AI
                </span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-2 py-0.5">
                <span className="agent-live-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-emerald-300/90">
                  Live
                </span>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="border-b border-border-line/60 px-4 py-4">
            <div className="flex items-start gap-3">
              <div className="relative">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/20 to-accent/5 text-accent shadow-[0_0_24px_-4px_var(--color-accent-glow)]">
                  <Sparkles size={18} />
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-bg-elevated bg-emerald-500">
                  <Bot size={9} className="text-bg" />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-[15px] font-bold leading-tight text-ink">
                  {detail.agentName}
                </h3>
                <a
                  href={`https://github.com/Ayush-Panda-design/${detail.repo}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-1 font-mono text-[10px] text-ink-faint transition-colors hover:text-accent"
                >
                  <Github size={10} />
                  Ayush-Panda-design/{detail.repo}
                </a>
                <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-faint">
                  {filesUsed != null
                    ? `Last scan · ${filesUsed} source file${filesUsed === 1 ? "" : "s"}`
                    : `Synced · ${formatSync(syncedAt)}`}
                </p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {CAPABILITIES.map((cap) => (
                <span
                  key={cap}
                  className="rounded-md border border-border-line/80 bg-bg/60 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-ink-soft"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>

          {/* Chat */}
          <div className="agent-panel-mesh relative">
            <div className="agent-scroll agent-chat-fade flex max-h-[min(480px,58vh)] flex-col gap-4 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <MessageBubble key={`${m.role}-${i}`} message={m} agentName={detail.agentName} index={i} />
              ))}

              <AnimatePresence>
                {!demoPlayed && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    onClick={playDemo}
                    className="group w-full rounded-2xl border border-dashed border-accent/35 bg-gradient-to-br from-accent/10 via-transparent to-violet-500/5 p-4 text-left transition-all hover:border-accent/55 hover:shadow-[0_0_32px_-8px_var(--color-accent-glow)]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/15 text-accent transition-transform group-hover:scale-105">
                        <Play size={14} className="ml-0.5" />
                      </span>
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-accent">
                          See it in action
                        </p>
                        <p className="mt-0.5 text-[12px] font-medium text-ink">
                          &ldquo;{detail.agentDemo.question}&rdquo;
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-[11px] leading-relaxed text-ink-faint">
                      Instant preview — no API key needed. Click to see a formatted architecture answer.
                    </p>
                  </motion.button>
                )}
              </AnimatePresence>

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border-line bg-bg-elevated text-accent">
                    <Bot size={13} />
                  </span>
                  <div>
                    <p className="mb-1 font-mono text-[8px] uppercase tracking-[0.16em] text-accent/80">
                      {detail.agentName}
                    </p>
                    <div className="flex items-center gap-2 rounded-2xl border border-border-line bg-bg-elevated/90 px-4 py-3">
                      <span className="font-mono text-[11px] text-ink-soft">Scanning source files</span>
                      <span className="flex gap-1">
                        {[0, 1, 2].map((d) => (
                          <motion.span
                            key={d}
                            className="h-1 w-1 rounded-full bg-accent"
                            animate={{ opacity: [0.25, 1, 0.25] }}
                            transition={{ repeat: Infinity, duration: 1.1, delay: d * 0.18 }}
                          />
                        ))}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={endRef} />
            </div>
          </div>

          {/* Input area */}
          <div className="border-t border-border-line/80 bg-bg/90 px-4 py-4 shadow-[0_-12px_40px_-16px_rgba(0,0,0,0.5)]">
            <p className="mb-2.5 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
              Ask anything
            </p>
            <div className="mb-3 space-y-1.5">
              {detail.suggestedQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  disabled={loading}
                  className="group flex w-full items-center justify-between gap-2 rounded-xl border border-border-line/80 bg-surface/40 px-3 py-2.5 text-left transition-all hover:border-accent/40 hover:bg-accent/6 disabled:opacity-40"
                >
                  <span className="text-[11px] leading-snug text-ink-soft transition-colors group-hover:text-ink">
                    {q}
                  </span>
                  <ArrowRight
                    size={12}
                    className="shrink-0 text-ink-faint transition-all group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="relative"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question…"
                className="w-full rounded-xl border border-border-line bg-bg/80 py-3 pl-4 pr-12 text-[13px] text-ink outline-none transition-shadow placeholder:text-ink-faint focus:border-accent/45 focus:shadow-[0_0_0_3px_rgba(94,234,212,0.12)]"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-accent text-primary-foreground transition-all hover:bg-accent-hover disabled:opacity-35"
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
