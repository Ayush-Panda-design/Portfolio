import { PROJECT_DETAILS } from "@/data/project-details";
import { PROJECT_KNOWLEDGE } from "@/data/project-knowledge";
import { getProductionProject } from "@/data/projects";
import { fetchRepoSnapshot } from "@/lib/github.server";

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
        max_tokens: 900,
        temperature: 0.35,
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
          generationConfig: { maxOutputTokens: 900, temperature: 0.35 },
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

function fallbackAnswer(projectTitle: string, query: string, context: string, github: string): string {
  const excerpt = retrieveContext(context, query, 5);
  if (!excerpt) {
    return `I don't have enough context for that specific question about ${projectTitle}. Browse the case study sections above or check the source at ${github}.`;
  }
  return `Here's what I can tell you about **${projectTitle}** based on the repository documentation:\n\n${excerpt}\n\nFor deeper implementation detail, see the GitHub repo: ${github}`;
}

export async function runProjectAgent(data: ChatInput) {
  const project = getProductionProject(data.projectId);
  const detail = PROJECT_DETAILS[data.projectId];
  const knowledge = PROJECT_KNOWLEDGE[data.projectId];

  if (!project || !detail || !knowledge) {
    return { reply: "Unknown project.", syncedAt: null as string | null };
  }

  const snapshot = await fetchRepoSnapshot(detail.repo);
  const syncedAt = snapshot?.pushedAt ?? null;

  const staticCtx = retrieveContext(knowledge, data.message, 6);
  const readmeCtx = snapshot?.readme ? retrieveContext(snapshot.readme, data.message, 4) : "";

  const system = `You are ${detail.agentName}, a dedicated technical assistant for the project "${project.title}" by Ayush Panda (full-stack developer, CS undergrad at VSSUT).

Your job: answer recruiters, hiring managers, and engineers asking about architecture, features, tech stack, deployment, security, and implementation — using ONLY the context below.

Rules:
- Be accurate, concise, and professional (2-6 short paragraphs max).
- If the answer isn't in context, say you don't know and point to ${project.github}.
- Mention live URL when relevant: ${project.live ?? "see GitHub"}.
- Do not invent features or metrics not in context.
- GitHub repo last pushed: ${syncedAt ?? "unknown"}.

--- PORTFOLIO SUMMARY ---
${project.summary}
Stack: ${project.stack.join(", ")}
Features: ${project.features.join("; ")}

--- CURATED REPO KNOWLEDGE ---
${staticCtx}

--- LIVE GITHUB README EXCERPT ---
${readmeCtx || "(README fetch unavailable — using curated knowledge)"}`;

  const history = (data.history ?? []).map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const llmReply = await callLlm(system, data.message, history);
  const reply =
    llmReply ??
    fallbackAnswer(project.title, data.message, knowledge + "\n" + (snapshot?.readme ?? ""), project.github);

  return { reply, syncedAt };
}

export async function getProjectSync(data: { projectId: string }) {
  const detail = PROJECT_DETAILS[data.projectId];
  if (!detail) return { syncedAt: null as string | null };
  const snapshot = await fetchRepoSnapshot(detail.repo);
  return { syncedAt: snapshot?.pushedAt ?? null };
}
