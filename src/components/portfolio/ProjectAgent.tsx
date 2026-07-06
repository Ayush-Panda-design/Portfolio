import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BotIcon as Bot, SendIcon as Send, SparklesIcon as Sparkles } from "lucide-react";
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

function renderMarkdownLite(text: string) {
  return text.split("\n").map((line, i) => {
    const html = line
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/`(.+?)`/g, "<code class='rounded bg-bg/80 px-1 py-0.5 font-mono text-[11px]'>$1</code>");
    return (
      <p
        key={i}
        className="text-[13px] leading-relaxed text-ink-soft [&_strong]:text-ink"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  });
}

export function ProjectAgent({ project }: { project: ProductionProject }) {
  const detail = PROJECT_DETAILS[project.id];
  if (!detail) return null;
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content: detail.agentIntro,
    },
  ]);
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
      className="sticky top-24 overflow-hidden rounded-2xl border border-border-line bg-surface/50 backdrop-blur-md"
    >
      <div className="border-b border-border-line/80 bg-bg/40 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Bot size={16} />
          </span>
          <div>
            <p className="font-display text-sm font-bold text-ink">{detail.agentName}</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
              <Sparkles size={10} className="mr-1 inline text-accent" />
              GitHub synced · {formatSync(syncedAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex max-h-[420px] flex-col gap-3 overflow-y-auto px-4 py-4">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: m.role === "user" ? 8 : -8 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              "max-w-[95%] rounded-xl px-3 py-2.5",
              m.role === "user"
                ? "ml-auto border border-accent/30 bg-accent/10"
                : "mr-auto border border-border-line bg-bg/60",
            )}
          >
            {renderMarkdownLite(m.content)}
          </motion.div>
        ))}
        {loading && (
          <div className="mr-auto flex gap-1 rounded-xl border border-border-line bg-bg/60 px-3 py-3">
            {[0, 1, 2].map((d) => (
              <motion.span
                key={d}
                className="h-1.5 w-1.5 rounded-full bg-accent"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1, delay: d * 0.2 }}
              />
            ))}
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="border-t border-border-line/80 px-3 py-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {detail.suggestedQuestions.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => send(q)}
              className="rounded-full border border-border-line bg-bg/50 px-2.5 py-1 font-mono text-[9px] text-ink-soft transition-colors hover:border-accent/40 hover:text-accent"
            >
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
            className="flex-1 rounded-full border border-border-line bg-bg/70 px-4 py-2.5 text-[13px] text-ink outline-none placeholder:text-ink-faint focus:border-accent/50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary-foreground transition-opacity hover:bg-accent-hover disabled:opacity-40"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </motion.div>
  );
}
