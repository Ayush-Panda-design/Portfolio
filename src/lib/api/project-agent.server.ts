import { PROJECT_DETAILS } from "@/data/project-details";
import { PROJECT_KNOWLEDGE } from "@/data/project-knowledge";
import { getProductionProject } from "@/data/projects";
import {
  fetchRelevantCode,
  fetchRepoSnapshot,
  formatCodeContext,
} from "@/lib/github.server";

type ChatInput = {
  projectId: string;
  message: string;
  history?: { role: "user" | "assistant"; content: string }[];
};

function retrieveContext(knowledge: string, query: string, maxChunks = 4): string {
  const chunks = knowledge.split(/\n{2,}/).filter(Boolean);
  const terms = query.toLowerCase().split(/\W+/).filter((t) => t.length > 2);
  const scored = chunks
    .map((chunk) => {
      const lower = chunk.toLowerCase();
      const score = terms.reduce((n, t) => n + (lower.includes(t) ? 1 : 0), 0);
      return { chunk, score };
    })
    .sort((a, b) => b.score - a.score);
  return scored
    .slice(0, maxChunks)
    .map((s) => s.chunk)
    .join("\n\n");
}

async function callLlm(system: string, user: string, history: { role: string; content: string }[]) {
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  if (openRouterKey) {
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
          ...history.slice(-8),
          { role: "user", content: user },
        ],
        max_tokens: 1100,
        temperature: 0.25,
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
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: [
            ...history.slice(-6).map((m) => ({
              role: m.role === "assistant" ? "model" : "user",
              parts: [{ text: m.content }],
            })),
            { role: "user", parts: [{ text: user }] },
          ],
          generationConfig: { maxOutputTokens: 1100, temperature: 0.25 },
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
  context: string,
  github: string,
  filesUsed: number,
): string {
  const excerpt = retrieveContext(context, query, 6);
  if (!excerpt) {
    return `I couldn't find enough in the repository for that question about ${projectTitle}. Browse the case study above or inspect the source at ${github}.`;
  }
  const scanned =
    filesUsed > 0
      ? `I scanned **${filesUsed} source file(s)** from the live repo. `
      : "";
  return `${scanned}Here's what I found about **${projectTitle}**:\n\n${excerpt}\n\nFull codebase: ${github}`;
}

export async function runProjectAgent(data: ChatInput) {
  const project = getProductionProject(data.projectId);
  const detail = PROJECT_DETAILS[data.projectId];
  const knowledge = PROJECT_KNOWLEDGE[data.projectId];

  if (!project || !detail || !knowledge) {
    return { reply: "Unknown project.", syncedAt: null as string | null, filesUsed: 0 };
  }

  const snapshot = await fetchRepoSnapshot(detail.repo);
  const syncedAt = snapshot?.pushedAt ?? null;
  const branch = snapshot?.defaultBranch ?? "main";

  const [codeCtx] = await Promise.all([
    fetchRelevantCode(detail.repo, data.message, branch),
  ]);

  const staticCtx = retrieveContext(knowledge, data.message, 4);
  const readmeCtx = snapshot?.readme ? retrieveContext(snapshot.readme, data.message, 3) : "";
  const codeBlock = formatCodeContext(codeCtx);
  const filesUsed = codeCtx.files.length;

  const system = `You are ${detail.agentName} — a senior engineer who has read the GitHub repository for "${project.title}" by Ayush Panda.

You have LIVE access to:
1. Actual source files from the repo (selected by relevance to the user's question)
2. README excerpts
3. Curated project notes

Your audience: recruiters, hiring managers, and engineers evaluating this portfolio project.

## How to answer
- Ground every claim in the SOURCE CODE and README below — cite file paths when referencing implementation (e.g. \`apps/api/src/routes/forms.ts\`).
- Explain *how* things work: functions, routes, schemas, data flow, auth, deployment wiring.
- Use short paragraphs, bullet lists, or code references. Max 6 paragraphs.
- If the code context doesn't contain the answer, say clearly: "I don't see that in the files I scanned" and point to ${project.github}.
- Never invent endpoints, env vars, or metrics not present in context.
- Live product URL: ${project.live ?? "see GitHub"}
- Repo last pushed: ${syncedAt ?? "unknown"}
- Files loaded for this question: ${filesUsed} of ${codeCtx.totalPaths} tracked paths

## Portfolio summary
${project.summary}
Stack: ${project.stack.join(", ")}

## Curated notes
${staticCtx}

## README excerpt
${readmeCtx || "(README unavailable)"}

## LIVE SOURCE CODE (GitHub — ${detail.repo})
${codeBlock}`;

  const history = (data.history ?? []).map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const fallbackContext =
    knowledge +
    "\n\n" +
    (snapshot?.readme ?? "") +
    "\n\n" +
    codeCtx.files.map((f) => `FILE: ${f.path}\n${f.content}`).join("\n\n");

  const llmReply = await callLlm(system, data.message, history);
  const reply =
    llmReply ??
    fallbackAnswer(project.title, data.message, fallbackContext, project.github, filesUsed);

  return { reply, syncedAt, filesUsed };
}

export async function getProjectSync(data: { projectId: string }) {
  const detail = PROJECT_DETAILS[data.projectId];
  if (!detail) return { syncedAt: null as string | null };
  const snapshot = await fetchRepoSnapshot(detail.repo);
  return { syncedAt: snapshot?.pushedAt ?? null };
}
