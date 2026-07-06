export type ProjectDetail = {
  heroSubtitle: string;
  valueFlow: string[];
  problem: string;
  solution: string;
  highlights: { title: string; body: string }[];
  architecture: string[];
  deployment: { label: string; href: string }[];
  agentName: string;
  agentIntro: string;
  agentDemo: { question: string; answer: string };
  suggestedQuestions: string[];
  repo: string;
};

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  edinform: {
    repo: "EdinForm11",
    agentName: "EdinForm Guide",
    heroSubtitle:
      "Typeform-quality forms on your own domain — build, publish, and analyze without enterprise pricing.",
    valueFlow: ["Create", "Publish", "Share", "Analyze"],
    agentIntro:
      "I scan live source files from GitHub — routes, schemas, services — not just the README. Ask about implementation, APIs, or deployment.",
    agentDemo: {
      question: "What's the monorepo structure?",
      answer: `EdinForm runs on **Turborepo + pnpm** with shared packages:

\`\`\`
edinform/
├── apps/
│   ├── api/          Express + tRPC (port 8000)
│   └── web/          Next.js 16 App Router
├── packages/
│   ├── database/     Drizzle ORM + PostgreSQL
│   ├── trpc/         Shared routers
│   └── validators/   Zod schemas everywhere
\`\`\`

Key capabilities enforced server-side:

- [x] Response limits
- [x] Form expiry (403 after close)
- [x] Rate limiting via Upstash Redis
- [ ] Client-only checks — never used for limits`,
    },
    suggestedQuestions: [
      "How does conditional logic work?",
      "What's the monorepo structure?",
      "How are response limits enforced?",
      "Where is the backend hosted?",
    ],
    problem:
      "Teams want Typeform-quality forms with analytics and limits — without enterprise pricing or losing data control.",
    solution:
      "Production SaaS monorepo: Next.js on Vercel, tRPC API on Render, PostgreSQL + Redis — live at edinform.in.",
    highlights: [
      {
        title: "End-to-end creator flow",
        body: "Sign up, build forms with 9 field types, preview in Typeform-style multi-step UI, publish, share via QR, and analyze responses with Recharts.",
      },
      {
        title: "Server-enforced limits",
        body: "Max responses and form expiry are checked at fetch and submit — not just hidden in the UI.",
      },
      {
        title: "Type-safe API layer",
        body: "tRPC + Zod validators shared across packages; Scalar OpenAPI docs exposed for the REST surface.",
      },
      {
        title: "Real production deploy",
        body: "Live demo forms created through the product itself — visible at /explore without seed scripts.",
      },
    ],
    architecture: [
      "Turborepo + pnpm: apps/web (Next.js 16), apps/api (Express + tRPC)",
      "packages/database — Drizzle schema & migrations",
      "packages/trpc, validators, services, types — shared domain layer",
      "Upstash Redis rate limiting with in-memory fallback",
      "Resend email with console fallback for dev",
    ],
    deployment: [
      { label: "Production", href: "https://edinform.in" },
      { label: "API docs", href: "https://edinform11-2.onrender.com/docs" },
      { label: "GitHub", href: "https://github.com/Ayush-Panda-design/EdinForm11" },
    ],
  },
  shipflow: {
    repo: "ShipFlowAI",
    agentName: "ShipFlow Analyst",
    heroSubtitle:
      "One delivery thread for teams — from customer request to human-approved release.",
    valueFlow: ["Idea", "Requirements", "Tasks", "AI review", "Ship"],
    agentIntro:
      "I scan live source files from GitHub — Inngest jobs, PR review logic, auth — not just the README. Ask about how features are implemented.",
    agentDemo: {
      question: "What's the delivery loop from idea to ship?",
      answer: `ShipFlow threads every stage into one workspace:

1. **Discover** — dashboard intake from email, tickets, or calls
2. **Clarify** — AI follow-ups + duplicate detection
3. **Plan** — requirements doc → tasks → human plan approval
4. **Build** — GitHub repos synced, PRs linked to features
5. **Review** — AI diffs vs approved requirements (blocking/non-blocking)
6. **Ship** — release readiness → human approval → optional auto-merge

Background work runs on **Inngest** (PR reviews, crons, codegen) while clarify/requirements stay inline for fast UI.`,
    },
    suggestedQuestions: [
      "How does AI PR review work?",
      "What's the delivery loop from idea to ship?",
      "Which Inngest workflows run in the background?",
      "How does GitHub integration work?",
    ],
    problem:
      "Features scatter across tickets, docs, and PRs — no single thread from idea to shipped code.",
    solution:
      "ShipFlow unifies clarify → requirements → tasks → AI PR review → human release gates on shipflowai.in.",
    highlights: [
      {
        title: "Single delivery thread",
        body: "Feature requests flow through AI clarification, requirements docs, engineering tasks, and linked GitHub PRs — all in one workspace.",
      },
      {
        title: "Context-aware AI review",
        body: "Reviews diffs against approved requirements and tasks — blocking vs non-blocking findings, inline comments, GitHub Checks.",
      },
      {
        title: "Human gates",
        body: "Plan approval and release approval required — nothing ships without an explicit yes.",
      },
      {
        title: "Background orchestration",
        body: "Inngest powers PR reviews, release readiness, subscription crons, and optional codegen while UI actions stay fast inline.",
      },
    ],
    architecture: [
      "Turborepo: apps/web (Next.js 16 + Shadcn), optional apps/api (Express tRPC)",
      "BetterAuth — GitHub OAuth + email sessions",
      "Prisma + PostgreSQL on Neon",
      "Octokit GitHub App + webhooks for PR sync",
      "Vercel AI SDK + OpenRouter/Gemini for clarify, requirements, tasks, reviews",
    ],
    deployment: [
      { label: "Production", href: "https://shipflowai.in" },
      { label: "GitHub", href: "https://github.com/Ayush-Panda-design/ShipFlowAI" },
    ],
  },
  relvion: {
    repo: "Relvion-AI",
    agentName: "Relvion Expert",
    heroSubtitle:
      "Superhuman-style Gmail & Calendar — AI triage, search, and an agent that acts for you.",
    valueFlow: ["Inbox", "Search", "Triage", "Agent"],
    agentIntro:
      "I scan live source files from GitHub — search, webhooks, MCP handlers — not just the README. Ask about real implementation details.",
    agentDemo: {
      question: "How does semantic search work?",
      answer: `Search runs a **tiered pipeline** — fastest source wins:

- Gmail operators → Corsair local cache
- **pgvector** semantic fallback on Postgres
- Live Gmail API as last resort
- Calendar events included in the same query

\`\`\`
User query
    │
    ├── operator match (Corsair DB)
    ├── vector similarity (pgvector)
    └── live Gmail API
\`\`\`

OAuth-only — mail stays in Google; Relvion is the workspace layer, not a migration.`,
    },
    suggestedQuestions: [
      "How does semantic search work?",
      "What is Corsair's role?",
      "How does the MCP agent send email?",
      "How is realtime sync implemented?",
    ],
    problem:
      "Gmail and Calendar live in separate tabs — slow search, no unified AI inside the workflow.",
    solution:
      "Live Google data via Corsair, pgvector search, Gemini triage, and an MCP agent sidebar.",
    highlights: [
      {
        title: "Live Google data",
        body: "OAuth-only access — mail and events stay in Google; Relvion is the intelligent workspace layer, not a migration.",
      },
      {
        title: "Sub-second search",
        body: "Gmail operators → Corsair local cache → pgvector semantic fallback → live API — unified across mail and calendar.",
      },
      {
        title: "MCP agent",
        body: "Gemini function-calling via Corsair MCP — read, draft, send, and schedule in one message with validated actions.",
      },
      {
        title: "Realtime push",
        body: "Webhooks → server → SSE pipeline so new mail surfaces without manual refresh.",
      },
    ],
    architecture: [
      "Next.js App Router + soft dark Gmail-style dashboard",
      "Corsair — Gmail, Calendar, Postgres cache, MCP AnthropicProvider",
      "PostgreSQL + pgvector for semantic search",
      "Gemini for triage, drafts, and agent tool-calling",
      "Webhook receivers + SSE for live sync",
    ],
    deployment: [
      { label: "Production", href: "https://relvion-ai.vercel.app/" },
      { label: "GitHub", href: "https://github.com/Ayush-Panda-design/Relvion-AI" },
    ],
  },
  votora: {
    repo: "Votora-Real-Time-Polling-Platform",
    agentName: "Votora Host",
    heroSubtitle:
      "Synchronized polls and quizzes for live events — realtime rooms, timers, and dashboards.",
    valueFlow: ["Create", "Lobby", "Live sync", "Results"],
    agentIntro:
      "I scan live source files from GitHub — Socket.io rooms, controllers, auth middleware — not just the README.",
    agentDemo: {
      question: "How do live polls sync in realtime?",
      answer: `Each poll gets a **Socket.io room** scoped by poll ID:

\`\`\`
Host starts poll
    │
    └── room: poll:{id}
            ├── vote events → all clients
            ├── lobby timer sync
            └── Recharts dashboard updates
\`\`\`

Deploy split:

- [x] React SPA on Vercel
- [x] Express API on Render
- [x] MongoDB Atlas + aggregation pipelines
- [x] JWT httpOnly cookies + Bearer fallback for cross-origin`,
    },
    suggestedQuestions: [
      "How do live polls sync in realtime?",
      "How does quiz tab monitoring work?",
      "What's the frontend/backend split?",
      "How is auth handled cross-origin?",
    ],
    problem:
      "Live events need synced polls and quizzes — generic forms can't handle rooms, timers, or integrity checks.",
    solution:
      "Socket.io rooms, lobby timers, live Recharts dashboards, and optional quiz anti-cheat — split Vercel + Render deploy.",
    highlights: [
      {
        title: "Realtime by default",
        body: "Socket.io poll-scoped rooms push vote updates instantly — no refresh needed for hosts or respondents.",
      },
      {
        title: "Dual timing modes",
        body: "Auto-expiry for scheduled close, or manual live timer with synchronized lobby start for competitive sessions.",
      },
      {
        title: "Quiz integrity",
        body: "Optional tab-blur monitoring auto-submits current answers as a client-side deterrent in proctored settings.",
      },
      {
        title: "Production split deploy",
        body: "React SPA on Vercel, Express API on Render, MongoDB Atlas — cross-origin JWT cookies + Bearer fallback.",
      },
    ],
    architecture: [
      "React 18 + Vite + Redux Toolkit frontend",
      "Express layered: Routes → Controllers → Services → Models",
      "MongoDB Mongoose + aggregation pipelines for analytics",
      "Socket.io server with poll-scoped rooms",
      "JWT httpOnly cookies, Google OAuth, rate limits, Helmet, CSRF guard",
    ],
    deployment: [
      { label: "Frontend", href: "https://votora-client-jaam.vercel.app" },
      { label: "API health", href: "https://votora-real-time-polling-platform.onrender.com/api/health" },
      { label: "GitHub", href: "https://github.com/Ayush-Panda-design/Votora-Real-Time-Polling-Platform" },
    ],
  },
};
