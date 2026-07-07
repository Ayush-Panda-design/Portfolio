import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  BotIcon as Bot,
  FileIcon as File,
  ImageIcon as ImageIcon,
  PaperclipIcon as Paperclip,
  SendIcon as Send,
  UserIcon as User,
  XIcon as X,
} from "lucide-react";
import { AgentMessageMarkdown } from "@/components/portfolio/AgentMessageMarkdown";
import { Github } from "@/components/portfolio/icons";
import { askProjectAgent } from "@/lib/api/project-agent.functions";
import { PROJECT_DETAILS } from "@/data/project-details";
import type { ProductionProject } from "@/data/projects";
import { cn } from "@/lib/utils";

export type AgentAttachment = {
  id: string;
  name: string;
  mimeType: string;
  kind: "image" | "video" | "file";
  dataUrl: string;
};

type Msg = {
  role: "user" | "assistant";
  content: string;
  attachments?: AgentAttachment[];
};

const CHAT_STORAGE_PREFIX = "portfolio-agent-chat-";
const MAX_ATTACHMENTS = 4;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES =
  "image/jpeg,image/png,image/gif,image/webp,video/mp4,video/webm,application/pdf";

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
      messages: parsed.messages.map((m) => ({ role: m.role, content: m.content })),
      demoPlayed: parsed.demoPlayed ?? parsed.messages.length > 2,
    };
  } catch {
    return { messages: [{ role: "assistant", content: intro }], demoPlayed: false };
  }
}

function attachmentKind(mimeType: string): AgentAttachment["kind"] {
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";
  return "file";
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function toApiAttachment(att: AgentAttachment) {
  const base64 = att.dataUrl.includes(",") ? att.dataUrl.split(",")[1]! : att.dataUrl;
  return { name: att.name, mimeType: att.mimeType, data: base64 };
}

function AttachmentPreview({ att, onRemove }: { att: AgentAttachment; onRemove?: () => void }) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-border-line bg-bg">
      {att.kind === "image" ? (
        <img src={att.dataUrl} alt={att.name} className="h-16 w-16 object-cover" />
      ) : att.kind === "video" ? (
        <video src={att.dataUrl} className="h-16 w-16 object-cover" muted />
      ) : (
        <div className="flex h-16 w-16 flex-col items-center justify-center gap-1 px-1">
          <File size={16} className="text-ink-faint" />
          <span className="max-w-full truncate text-[8px] text-ink-faint">{att.name}</span>
        </div>
      )}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-bg/90 text-ink-soft hover:text-ink"
          aria-label={`Remove ${att.name}`}
        >
          <X size={10} />
        </button>
      )}
    </div>
  );
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
          {message.attachments && message.attachments.length > 0 && (
            <div className={cn("mb-2 flex flex-wrap gap-2", isUser && "justify-end")}>
              {message.attachments.map((att) => (
                <AttachmentPreview key={att.id} att={att} />
              ))}
            </div>
          )}
          {message.content ? (
            isUser ? (
              <p className="text-[13px] leading-relaxed">{message.content}</p>
            ) : (
              <AgentMessageMarkdown content={message.content} />
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function ProjectAgent({
  project,
  variant = "workspace",
}: {
  project: ProductionProject;
  variant?: "workspace" | "card";
}) {
  const detail = PROJECT_DETAILS[project.id];
  if (!detail) return null;

  const stored = loadStoredChat(project.id, detail.agentIntro);

  const [messages, setMessages] = useState<Msg[]>(stored.messages);
  const [demoPlayed, setDemoPlayed] = useState(stored.demoPlayed);
  const [input, setInput] = useState("");
  const [pendingAttachments, setPendingAttachments] = useState<AgentAttachment[]>([]);
  const [loading, setLoading] = useState(false);
  const [filesUsed, setFilesUsed] = useState<number | null>(null);
  const [attachError, setAttachError] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isWorkspace = variant === "workspace";

  useEffect(() => {
    sessionStorage.setItem(
      `${CHAT_STORAGE_PREFIX}${project.id}`,
      JSON.stringify({
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
        demoPlayed,
      }),
    );
  }, [messages, demoPlayed, project.id]);

  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading, pendingAttachments]);

  const addFiles = async (files: FileList | File[]) => {
    setAttachError(null);
    const list = Array.from(files);
    if (!list.length) return;

    const available = MAX_ATTACHMENTS - pendingAttachments.length;
    if (available <= 0) {
      setAttachError(`You can attach up to ${MAX_ATTACHMENTS} files.`);
      return;
    }

    const next: AgentAttachment[] = [];

    for (const file of list.slice(0, available)) {
      if (file.size > MAX_FILE_BYTES) {
        setAttachError(`${file.name} is too large (max 5 MB).`);
        continue;
      }
      const ok =
        file.type.startsWith("image/") ||
        file.type.startsWith("video/") ||
        file.type === "application/pdf";
      if (!ok) {
        setAttachError(`${file.name}: use images, video, or PDF.`);
        continue;
      }
      try {
        const dataUrl = await readFileAsDataUrl(file);
        next.push({
          id: `${file.name}-${file.size}-${Date.now()}`,
          name: file.name,
          mimeType: file.type || "application/octet-stream",
          kind: attachmentKind(file.type),
          dataUrl,
        });
      } catch {
        setAttachError(`Could not read ${file.name}.`);
      }
    }

    if (next.length) setPendingAttachments((prev) => [...prev, ...next].slice(0, MAX_ATTACHMENTS));
  };

  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      const imageFiles: File[] = [];
      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) imageFiles.push(file);
        }
      }
      if (imageFiles.length) {
        e.preventDefault();
        void addFiles(imageFiles);
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  });

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
    const attachments = pendingAttachments;
    if ((!q && attachments.length === 0) || loading) return;

    if (q === detail.agentDemo.question && !demoPlayed && attachments.length === 0) {
      playDemo();
      return;
    }

    const userMessage: Msg = {
      role: "user",
      content: q || "(attached files)",
      attachments: attachments.length ? attachments : undefined,
    };

    setInput("");
    setPendingAttachments([]);
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const { reply, filesUsed: files } = await askProjectAgent({
        data: {
          projectId: project.id,
          message: q || "Please review the attached file(s) in context of this project.",
          history: messages,
          attachments: attachments.map(toApiAttachment),
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
      : "Live GitHub source · images & PDFs supported";

  return (
    <div
      className={cn(
        "flex h-full min-h-[70vh] flex-col overflow-hidden bg-bg-elevated",
        isWorkspace
          ? "lg:h-screen lg:min-h-0 lg:rounded-none lg:border-0 lg:shadow-none"
          : "max-h-[calc(100vh-3rem)] rounded-2xl border border-border-line shadow-lg",
      )}
    >
      <header className="shrink-0 border-b border-border-line px-4 py-3">
        <div className="flex items-center justify-between gap-3">
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
              className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-ink-faint transition-colors hover:text-accent"
            >
              <Github size={11} />
              Ayush-Panda-design/{detail.repo}
            </a>
          </div>
          {isWorkspace && (
            <span className="hidden shrink-0 rounded-md border border-border-line px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-faint sm:inline">
              Agent
            </span>
          )}
        </div>
        <p className="mt-1.5 text-[11px] text-ink-faint">{statusText}</p>
      </header>

      <div ref={chatRef} className="agent-scroll min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4">
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

      <footer className="shrink-0 border-t border-border-line bg-bg/90 px-4 py-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
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

        {pendingAttachments.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {pendingAttachments.map((att) => (
              <AttachmentPreview
                key={att.id}
                att={att}
                onRemove={() =>
                  setPendingAttachments((prev) => prev.filter((item) => item.id !== att.id))
                }
              />
            ))}
          </div>
        )}

        {attachError && <p className="mb-2 text-[11px] text-amber-400">{attachError}</p>}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-end gap-2 rounded-xl border border-border-line bg-bg px-2 py-1.5 focus-within:border-accent/40"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_TYPES}
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) void addFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading || pendingAttachments.length >= MAX_ATTACHMENTS}
            className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink-faint transition-colors hover:bg-surface hover:text-ink disabled:opacity-35"
            aria-label="Attach image, video, or PDF"
            title="Attach image, video, or PDF"
          >
            <Paperclip size={16} />
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            rows={1}
            placeholder="Ask about this codebase…"
            className="max-h-28 min-w-0 flex-1 resize-none bg-transparent py-2 text-[13px] text-ink outline-none placeholder:text-ink-faint"
          />
          <button
            type="submit"
            disabled={loading || (!input.trim() && pendingAttachments.length === 0)}
            className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-35"
            aria-label="Send message"
          >
            <Send size={14} />
          </button>
        </form>
        <p className="mt-1.5 flex items-center gap-1 text-[10px] text-ink-faint">
          <ImageIcon size={10} />
          Paste or attach images, MP4/WebM, PDF · up to {MAX_ATTACHMENTS} files
        </p>
      </footer>
    </div>
  );
}
