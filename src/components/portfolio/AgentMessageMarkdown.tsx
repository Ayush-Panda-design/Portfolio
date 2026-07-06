import type { ReactNode } from "react";
import { CheckIcon as Check, CircleIcon as Circle } from "lucide-react";
import { cn } from "@/lib/utils";

type Block =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "checklist"; items: { checked: boolean; text: string }[] }
  | { type: "code"; lines: string[] }
  | { type: "tree"; lines: string[] }
  | { type: "hr" };

const TREE_RE = /^[\s│├└─]+/;
const CHECKBOX_RE = /^[-*]\s+\[(x| )\]\s+(.+)$/i;

function isTreeLine(line: string) {
  return TREE_RE.test(line) || /[├└│]/.test(line);
}

function parseInline(text: string) {
  const parts: ReactNode[] = [];
  const re = /(\*\*(.+?)\*\*|`([^`]+)`|\*([^*]+)\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[2]) {
      parts.push(
        <strong key={key++} className="font-semibold text-ink">
          {m[2]}
        </strong>,
      );
    } else if (m[3]) {
      parts.push(
        <code
          key={key++}
          className="rounded bg-bg/90 px-1 py-0.5 font-mono text-[11px] text-accent"
        >
          {m[3]}
        </code>,
      );
    } else if (m[4]) {
      parts.push(<em key={key++}>{m[4]}</em>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length ? parts : [text];
}

function parseBlocks(content: string): Block[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i] ?? "";

    if (!line.trim()) {
      i += 1;
      continue;
    }

    if (line.trim() === "---" || line.trim() === "***") {
      blocks.push({ type: "hr" });
      i += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i]?.startsWith("```")) {
        codeLines.push(lines[i] ?? "");
        i += 1;
      }
      i += 1;
      blocks.push({ type: "code", lines: codeLines });
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      blocks.push({
        type: "heading",
        level: heading[1].length as 1 | 2 | 3,
        text: heading[2],
      });
      i += 1;
      continue;
    }

    if (isTreeLine(line)) {
      const treeLines: string[] = [];
      while (i < lines.length && (lines[i]?.trim() ? isTreeLine(lines[i]!) : false)) {
        treeLines.push(lines[i]!);
        i += 1;
      }
      blocks.push({ type: "tree", lines: treeLines });
      continue;
    }

    if (CHECKBOX_RE.test(line)) {
      const items: { checked: boolean; text: string }[] = [];
      while (i < lines.length && CHECKBOX_RE.test(lines[i] ?? "")) {
        const m = lines[i]!.match(CHECKBOX_RE)!;
        items.push({ checked: m[1].toLowerCase() === "x", text: m[2] });
        i += 1;
      }
      blocks.push({ type: "checklist", items });
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i] ?? "")) {
        items.push(lines[i]!.replace(/^[-*]\s+/, ""));
        i += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i] ?? "")) {
        items.push(lines[i]!.replace(/^\d+\.\s+/, ""));
        i += 1;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    const para: string[] = [line];
    i += 1;
    while (
      i < lines.length &&
      lines[i]?.trim() &&
      !lines[i]!.startsWith("#") &&
      !lines[i]!.startsWith("```") &&
      !/^[-*]\s+/.test(lines[i]!) &&
      !CHECKBOX_RE.test(lines[i]!) &&
      !/^\d+\.\s+/.test(lines[i]!) &&
      !isTreeLine(lines[i]!)
    ) {
      para.push(lines[i]!);
      i += 1;
    }
    blocks.push({ type: "paragraph", text: para.join(" ") });
  }

  return blocks;
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "heading":
      return (
        <p
          className={cn(
            "font-display font-bold text-ink",
            block.level === 1 && "text-[15px]",
            block.level === 2 && "text-[14px]",
            block.level === 3 && "text-[13px]",
          )}
        >
          {parseInline(block.text)}
        </p>
      );
    case "paragraph":
      return (
        <p className="text-[13px] leading-relaxed text-ink-soft">{parseInline(block.text)}</p>
      );
    case "ul":
      return (
        <ul className="space-y-1.5 pl-1">
          {block.items.map((item) => (
            <li key={item} className="flex gap-2 text-[13px] leading-relaxed text-ink-soft">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-1.5 pl-1">
          {block.items.map((item, idx) => (
            <li key={item} className="flex gap-2 text-[13px] leading-relaxed text-ink-soft">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/10 font-mono text-[9px] font-semibold text-accent">
                {idx + 1}
              </span>
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ol>
      );
    case "checklist":
      return (
        <ul className="space-y-1.5">
          {block.items.map((item) => (
            <li key={item.text} className="flex items-start gap-2 text-[13px] leading-relaxed text-ink-soft">
              <span
                className={cn(
                  "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                  item.checked
                    ? "border-accent/50 bg-accent/15 text-accent"
                    : "border-border-line bg-bg/50 text-ink-faint",
                )}
              >
                {item.checked ? <Check size={10} strokeWidth={3} /> : <Circle size={8} />}
              </span>
              <span className={item.checked ? "text-ink-soft" : "text-ink-faint"}>
                {parseInline(item.text)}
              </span>
            </li>
          ))}
        </ul>
      );
    case "code":
    case "tree":
      return (
        <pre className="overflow-x-auto rounded-xl border border-border-line/70 bg-[#060a12] px-3 py-3 font-mono text-[10.5px] leading-[1.65] text-ink-soft shadow-inner">
          <code>
            {block.lines.map((l, idx) => (
              <span key={idx} className="block whitespace-pre">
                {l.split(/(├──|└──|│)/g).map((part, j) =>
                  /^(├──|└──|│)$/.test(part) ? (
                    <span key={j} className="text-accent/60">
                      {part}
                    </span>
                  ) : (
                    <span key={j}>{part}</span>
                  ),
                )}
              </span>
            ))}
          </code>
        </pre>
      );
    case "hr":
      return <hr className="border-border-line/60" />;
    default:
      return null;
  }
}

export function AgentMessageMarkdown({ content }: { content: string }) {
  const blocks = parseBlocks(content);
  return (
    <div className="space-y-2.5">
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </div>
  );
}
