import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  BotIcon as Bot,
  MessageCircleQuestionIcon as MessageCircleQuestion,
  SendIcon as Send,
  SparklesIcon as Sparkles,
} from "lucide-react";
import { AgentMessageMarkdown } from "@/components/portfolio/AgentMessageMarkdown";
import { askProjectAgent } from "@/lib/api/project-agent.functions";
import { PROJECT_DETAILS } from "@/data/project-details";
import type { ProductionProject } from "@/data/projects";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

function formatSync(date: string | null) {
  if (!date) return "curated knowledge";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function seedMessages(detail: (typeof PROJECT_DETAILS)[string]): Msg[] {
  return [
    { role: "assistant", content: detail.agentIntro },
    { role: "user", content: detail.agentDemo.question },
    { role: "assistant", content: detail.agentDemo.answer },
  ];
}

export function ProjectAgent({ project }: { project: ProductionProject }) {
  const detail = PROJECT_DETAILS[project.id];
  if (!detail) return null;

  const [messages, setMessages] = useState<Msg[]>(() => seedMessages(detail));
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [syncedAt, setSyncedAt] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setLoading(true);
    try {
      const { reply, syncedAt: sync } = await askProjectAgent({
        data: {
          projectId: project.id,
          message: q,
          history: next.slice(-10),
        },
      });
      if (sync) setSyncedAt(sync);
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-24 flex flex-col overflow-hidden rounded-2xl border border-border-line bg-surface/50 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.55)] backdrop-blur-md"
    >
      <div className="border-b border-border-line/80 bg-bg/50 px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent"
              title="AI assistant"
            >
              <Bot size={17} strokeWidth={2} />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-display text-sm font-bold text-ink">{detail.agentName}</p>
                <span className="rounded-full border border-accent/25 bg-accent/8 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-accent">
                  AI chat
                </span>
              </div>
              <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
                <Sparkles size={10} className="mr-1 inline text-accent" />
                GitHub synced · {formatSync(syncedAt)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="agent-scroll flex max-h-[420px] flex-col gap-3 overflow-y-auto px-4 py-4">
        {messages.map((m, i) => (
          <motion.div
            key={`${m.role}-${i}`}
            initial={{ opacity: 0, x: m.role === "user" ? 8 : -8 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              "max-w-[96%]",
              m.role === "user" ? "ml-auto" : "mr-auto",
            )}
          >
            <p
              className={cn(
                "mb-1 font-mono text-[8px] uppercase tracking-[0.14em]",
                m.role === "user" ? "text-right text-ink-faint" : "text-accent/70",
              )}
            >
              {m.role === "user" ? "You" : detail.agentName}
            </p>
            <div
              className={cn(
                "rounded-xl px-3 py-2.5",
                m.role === "user"
                  ? "border border-accent/30 bg-accent/10"
                  : "border border-border-line bg-bg/60",
              )}
            >
              {m.role === "user" ? (
                <p className="text-[13px] leading-relaxed text-ink">{m.content}</p>
              ) : (
                <AgentMessageMarkdown content={m.content} />
              )}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="mr-auto max-w-[96%]">
            <p className="mb-1 font-mono text-[8px] uppercase tracking-[0.14em] text-accent/70">
              {detail.agentName}
            </p>
            <div className="flex gap-1 rounded-xl border border-border-line bg-bg/60 px-3 py-3">
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1, delay: d * 0.2 }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="border-t border-border-line/80 bg-bg/70 px-3 py-3 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.4)]">
        <p className="mb-2 font-mono text-[8px] uppercase tracking-[0.16em] text-ink-faint">
          Try a question
        </p>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {detail.suggestedQuestions.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => send(q)}
              disabled={loading}
              className="group inline-flex items-center gap-1.5 rounded-full border border-border-line bg-surface/60 px-2.5 py-1.5 font-mono text-[9px] text-ink-soft transition-all hover:border-accent/45 hover:bg-accent/8 hover:text-accent disabled:opacity-40"
            >
              <MessageCircleQuestion
                size={10}
                className="shrink-0 text-ink-faint transition-colors group-hover:text-accent"
              />
              {q}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about architecture, stack, features…"
            className="flex-1 rounded-full border border-border-line bg-bg/80 px-4 py-2.5 text-[13px] text-ink outline-none placeholder:text-ink-faint focus:border-accent/50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary-foreground transition-opacity hover:bg-accent-hover disabled:opacity-40"
            aria-label="Send message"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </motion.div>
  );
}
