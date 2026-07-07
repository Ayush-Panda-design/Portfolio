import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BotIcon as Bot, SendIcon as Send, UserIcon as User } from "lucide-react";
import { AgentMessageMarkdown } from "@/components/portfolio/AgentMessageMarkdown";
import { Github } from "@/components/portfolio/icons";
import { askProjectAgent } from "@/lib/api/project-agent.functions";
import { PROJECT_DETAILS } from "@/data/project-details";
import type { ProductionProject } from "@/data/projects";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_STORAGE_PREFIX = "portfolio-agent-chat-";

function loadStoredChat(projectId: string, intro: string): { messages: Msg[]; demoPlayed: boolean } {
  if (typeof window === "undefined") {
    return { messages: [{ role: "assistant", content: intro }], demoPlayed: false };
  }
  try {
    const raw = sessionStorage.getItem(`${CHAT_STORAGE_PREFIX}${projectId}`);
    if (!raw) return { messages: [{ role: "assistant", content: intro }], demoPlayed: false };
    const parsed = JSON.parse(raw) as { messages?: Msg[]; demoPlayed?: boolean };
    if (!parsed.messages?.length) {
      return { messages: [{ role: "assistant", content: intro }], demoPlayed: false };
    }
    return {
      messages: parsed.messages,
      demoPlayed: parsed.demoPlayed ?? parsed.messages.length > 2,
    };
  } catch {
    return { messages: [{ role: "assistant", content: intro }], demoPlayed: false };
  }
}

function MessageBubble({
  message,
  agentName,
}: {
  message: Msg;
  agentName: string;
}) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-2.5", isUser ? "flex-row-reverse" : "flex-row")}>
      <span
        className={cn(
          "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-accent/15 text-accent" : "bg-surface text-ink-soft",
        )}
      >
        {isUser ? <User size={13} /> : <Bot size={13} />}
      </span>
      <div className={cn("min-w-0 max-w-[90%]", isUser ? "text-right" : "text-left")}>
        <p className="mb-1 text-[11px] text-ink-faint">{isUser ? "You" : agentName}</p>
        <div
          className={cn(
            "rounded-2xl px-3.5 py-2.5 text-left",
            isUser ? "bg-accent/12 text-ink" : "bg-surface/80 text-ink",
          )}
        >
          {isUser ? (
            <p className="text-[13px] leading-relaxed">{message.content}</p>
          ) : (
            <AgentMessageMarkdown content={message.content} />
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectAgent({ project }: { project: ProductionProject }) {
  const detail = PROJECT_DETAILS[project.id];
  if (!detail) return null;

  const stored = loadStoredChat(project.id, detail.agentIntro);

  const [messages, setMessages] = useState<Msg[]>(stored.messages);
  const [demoPlayed, setDemoPlayed] = useState(stored.demoPlayed);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [filesUsed, setFilesUsed] = useState<number | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sessionStorage.setItem(
      `${CHAT_STORAGE_PREFIX}${project.id}`,
      JSON.stringify({ messages, demoPlayed }),
    );
  }, [messages, demoPlayed, project.id]);

  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
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

    if (q === detail.agentDemo.question && !demoPlayed) {
      playDemo();
      return;
    }

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: q }]);
    setLoading(true);

    try {
      const { reply, filesUsed: files } = await askProjectAgent({
        data: {
          projectId: project.id,
          message: q,
          history: messages,
        },
      });
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

  const statusText =
    filesUsed != null
      ? `Scanned ${filesUsed} source files on last reply`
      : "Answers from live GitHub source + project docs";

  return (
    <div className="flex h-full max-h-[calc(100vh-3rem)] flex-col overflow-hidden rounded-2xl border border-border-line bg-bg-elevated shadow-lg">
      <header className="shrink-0 border-b border-border-line px-4 py-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-[15px] font-semibold text-ink">{detail.agentName}</h3>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Online
              </span>
            </div>
            <a
              href={`https://github.com/Ayush-Panda-design/${detail.repo}`}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-[11px] text-ink-faint transition-colors hover:text-accent"
            >
              <Github size={11} />
              Ayush-Panda-design/{detail.repo}
            </a>
            <p className="mt-1 text-[11px] text-ink-faint">{statusText}</p>
          </div>
        </div>
      </header>

      <div
        ref={chatRef}
        className="agent-scroll min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4"
      >
        {messages.map((m, i) => (
          <MessageBubble key={`${m.role}-${i}`} message={m} agentName={detail.agentName} />
        ))}

        <AnimatePresence>
          {!demoPlayed && (
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={playDemo}
              className="w-full rounded-xl border border-dashed border-border-line px-3 py-2.5 text-left text-[12px] text-ink-soft transition-colors hover:border-accent/35 hover:bg-surface/50 hover:text-ink"
            >
              Try a sample answer: &ldquo;{detail.agentDemo.question}&rdquo;
            </motion.button>
          )}
        </AnimatePresence>

        {loading && (
          <div className="flex gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface text-ink-soft">
              <Bot size={13} />
            </span>
            <div className="rounded-2xl bg-surface/80 px-3.5 py-2.5">
              <span className="text-[13px] text-ink-soft">Reading repository…</span>
              <span className="ml-2 inline-flex gap-1 align-middle">
                {[0, 1, 2].map((d) => (
                  <motion.span
                    key={d}
                    className="inline-block h-1 w-1 rounded-full bg-ink-faint"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1, delay: d * 0.15 }}
                  />
                ))}
              </span>
            </div>
          </div>
        )}
      </div>

      <footer className="shrink-0 border-t border-border-line bg-bg/80 px-4 py-3">
        <div className="mb-2.5 flex flex-wrap gap-1.5">
          {detail.suggestedQuestions.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => send(q)}
              disabled={loading}
              className="rounded-full border border-border-line bg-surface/40 px-2.5 py-1 text-[11px] text-ink-soft transition-colors hover:border-accent/30 hover:text-ink disabled:opacity-40"
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
          className="flex items-center gap-2 rounded-xl border border-border-line bg-bg px-3 py-1.5 focus-within:border-accent/40"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about architecture, auth, deploy…"
            className="min-w-0 flex-1 bg-transparent py-2 text-[13px] text-ink outline-none placeholder:text-ink-faint"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-35"
            aria-label="Send message"
          >
            <Send size={14} />
          </button>
        </form>
      </footer>
    </div>
  );
}
