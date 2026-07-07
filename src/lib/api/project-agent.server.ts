import { PROJECT_DETAILS } from "@/data/project-details";
import { PROJECT_KNOWLEDGE } from "@/data/project-knowledge";
import { getProductionProject } from "@/data/projects";
import {
  fetchRelevantCode,
  fetchRepoSnapshot,
  formatCodeContext,
  type CodeContext,
} from "@/lib/github.server";

type ChatMsg = { role: "user" | "assistant"; content: string };

type AttachmentInput = { name: string; mimeType: string; data: string };

type ChatInput = {
  projectId: string;
  message: string;
  history?: ChatMsg[];
  attachments?: AttachmentInput[];
};

function queryTerms(query: string): string[] {
  return [...new Set(query.toLowerCase().split(/\W+/).filter((t) => t.length > 2))];
}

function buildSearchQuery(message: string, history: ChatMsg[]): string {
  const recentUser = history
    .filter((m) => m.role === "user")
    .slice(-2)
    .map((m) => m.content);
  return [message, ...recentUser].join(" ");
}

function trimContent(text: string, max = 1200): string {
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

/** Drop intro-only assistant turns; remove duplicate current user message. */
function normalizeHistory(history: ChatMsg[], currentMessage: string): ChatMsg[] {
  let h = history
    .filter((m) => m.content.trim())
    .map((m) => ({ role: m.role, content: trimContent(m.content) }));

  if (h.at(-1)?.role === "user" && h.at(-1)?.content === currentMessage) {
    h = h.slice(0, -1);
  }

  while (h.length > 0 && h[0].role === "assistant") {
    h = h.slice(1);
  }

  return h.slice(-10);
}

function retrieveContext(knowledge: string, query: string, maxChunks = 4): string {
  const terms = queryTerms(query);
  const chunks = knowledge.split(/\n{2,}/).filter(Boolean);

  const scored = chunks
    .map((chunk, index) => {
      const lower = chunk.toLowerCase();
      let score = terms.reduce((n, t) => n + (lower.includes(t) ? 2 : 0), 0);
      if (score === 0) score = index * 0.01;
      return { chunk, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored
    .slice(0, maxChunks)
    .map((s) => s.chunk)
    .join("\n\n");
}

function retrieveFromCodeFiles(files: CodeContext["files"], query: string): string {
  const terms = queryTerms(query);
  if (!files.length) return "";

  const hits: { path: string; lines: string[]; score: number }[] = [];

  for (const file of files) {
    const lines = file.content.split("\n");
    const matching = lines.filter((line) => {
      const lower = line.toLowerCase();
      return terms.some((t) => lower.includes(t));
    });
    const pathScore = terms.reduce(
      (n, t) => n + (file.path.toLowerCase().includes(t) ? 3 : 0),
      0,
    );
    const score = matching.length * 2 + pathScore;
    if (score > 0) hits.push({ path: file.path, lines: matching.slice(0, 18), score });
  }

  hits.sort((a, b) => b.score - a.score);

  if (hits.length > 0) {
    return hits
      .slice(0, 4)
      .map(
        (h) =>
          `**${h.path}**\n\`\`\`\n${h.lines.join("\n")}\n\`\`\``,
      )
      .join("\n\n");
  }

  return files
    .slice(0, 2)
    .map(
      (f) =>
        `**${f.path}** (no keyword hit — file preview)\n\`\`\`\n${f.content.slice(0, 600)}\n\`\`\``,
    )
    .join("\n\n");
}

async function callLlm(
  system: string,
  user: string,
  history: ChatMsg[],
  attachments: AttachmentInput[] = [],
): Promise<string | null> {
  const historyMessages = history.map((m) => ({ role: m.role, content: m.content }));

  const imageParts = attachments.filter((a) => a.mimeType.startsWith("image/"));
  const otherParts = attachments.filter((a) => !a.mimeType.startsWith("image/"));
  const attachmentNote =
    otherParts.length > 0
      ? `\n\n[Attachments: ${otherParts.map((a) => `${a.name} (${a.mimeType})`).join(", ")}]`
      : "";

  const openRouterKey = process.env.OPENROUTER_API_KEY;
  if (openRouterKey) {
    const userContent =
      imageParts.length > 0
        ? [
            { type: "text", text: user + attachmentNote },
            ...imageParts.map((a) => ({
              type: "image_url",
              image_url: { url: `data:${a.mimeType};base64,${a.data}` },
            })),
          ]
        : user + attachmentNote;

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openRouterKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://ayushdev-five.vercel.app",
        "X-Title": "Ayush Portfolio Project Agent",
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL ?? "google/gemini-2.0-flash-001",
        messages: [
          { role: "system", content: system },
          ...historyMessages,
          { role: "user", content: userContent },
        ],
        max_tokens: 1100,
        temperature: 0.4,
      }),
    });
    if (res.ok) {
      const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      const text = json.choices?.[0]?.message?.content?.trim();
      if (text) return text;
    }
  }

  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    const parts: { text?: string; inline_data?: { mime_type: string; data: string } }[] = [
      { text: user + attachmentNote },
      ...imageParts.map((a) => ({
        inline_data: { mime_type: a.mimeType, data: a.data },
      })),
    ];

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: [
            ...historyMessages.map((m) => ({
              role: m.role === "assistant" ? "model" : "user",
              parts: [{ text: m.content }],
            })),
            { role: "user", parts },
          ],
          generationConfig: { maxOutputTokens: 1100, temperature: 0.4 },
        }),
      },
    );
    if (res.ok) {
      const json = (await res.json()) as {
        candidates?: { content?: { parts?: { text?: string }[] } }[];
      };
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (text) return text;
    }
  }

  return null;
}

function fallbackAnswer(
  projectTitle: string,
  query: string,
  knowledge: string,
  readme: string,
  codeCtx: CodeContext,
  github: string,
): string {
  const codeExcerpt = retrieveFromCodeFiles(codeCtx.files, query);
  const docExcerpt = retrieveContext(`${knowledge}\n\n${readme}`, query, 3);

  if (!codeExcerpt && !docExcerpt) {
    return `I couldn't find enough in the repository for **"${query}"** about ${projectTitle}. Try rephrasing or browse the source at ${github}.`;
  }

  const parts: string[] = [];
  if (codeCtx.files.length > 0) {
    parts.push(
      `Scanned **${codeCtx.files.length}** source file(s) for your question.`,
    );
  }
  if (codeExcerpt) parts.push(codeExcerpt);
  if (docExcerpt) parts.push(`**From docs:**\n${docExcerpt}`);
  parts.push(`Full repo: ${github}`);

  return parts.join("\n\n");
}

export async function runProjectAgent(data: ChatInput) {
  const project = getProductionProject(data.projectId);
  const detail = PROJECT_DETAILS[data.projectId];
  const knowledge = PROJECT_KNOWLEDGE[data.projectId];

  if (!project || !detail || !knowledge) {
    return { reply: "Unknown project.", syncedAt: null as string | null, filesUsed: 0 };
  }

  const rawHistory = data.history ?? [];
  const chatHistory = normalizeHistory(rawHistory, data.message);
  const searchQuery = buildSearchQuery(data.message, chatHistory);

  const snapshot = await fetchRepoSnapshot(detail.repo);
  const syncedAt = snapshot?.pushedAt ?? null;
  const branch = snapshot?.defaultBranch ?? "main";

  const codeCtx = await fetchRelevantCode(detail.repo, searchQuery, branch);
  const staticCtx = retrieveContext(knowledge, searchQuery, 4);
  const readmeCtx = snapshot?.readme
    ? retrieveContext(snapshot.readme, searchQuery, 3)
    : "";
  const codeBlock = formatCodeContext(codeCtx);
  const filesUsed = codeCtx.files.length;

  const historySummary =
    chatHistory.length > 0
      ? chatHistory
          .slice(-6)
          .map((m) => `${m.role === "user" ? "User" : "You"}: ${trimContent(m.content, 400)}`)
          .join("\n")
      : "(first question in this thread)";

  const system = `You are ${detail.agentName} — a senior engineer answering questions about "${project.title}" by Ayush Panda.

You have live GitHub source files, README excerpts, and curated notes below.

## Conversation so far
${historySummary}

## Rules
- Answer the **latest user question** specifically. Do NOT repeat your previous answer verbatim.
- Use the conversation above for follow-ups ("it", "that", "how does that work" → resolve from prior turns).
- Ground claims in SOURCE CODE — cite paths like \`apps/api/src/routes/forms.ts\`.
- If missing from context, say you don't see it in the scanned files and link ${project.github}.
- Never invent features or metrics.
- Live URL: ${project.live ?? "see GitHub"} · Last push: ${syncedAt ?? "unknown"}
- Files loaded for this turn: ${filesUsed}

## Portfolio
${project.summary}
Stack: ${project.stack.join(", ")}

## Curated notes
${staticCtx}

## README excerpt
${readmeCtx || "(unavailable)"}

## LIVE SOURCE CODE (${detail.repo})
${codeBlock}`;

  const llmReply = await callLlm(system, data.message, chatHistory, data.attachments ?? []);
  const reply =
    llmReply ??
    (data.attachments?.length
      ? `I received your attachment(s) but need an API key for vision analysis. For now, ask a text question about **${project.title}** or browse ${project.github}.`
      : fallbackAnswer(
          project.title,
          data.message,
          knowledge,
          snapshot?.readme ?? "",
          codeCtx,
          project.github,
        ));

  return { reply, syncedAt, filesUsed };
}

export async function getProjectSync(data: { projectId: string }) {
  const detail = PROJECT_DETAILS[data.projectId];
  if (!detail) return { syncedAt: null as string | null };
  const snapshot = await fetchRepoSnapshot(detail.repo);
  return { syncedAt: snapshot?.pushedAt ?? null };
}
