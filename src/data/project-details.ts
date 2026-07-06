export type ProjectDetail = {
  problem: string;
  solution: string;
  highlights: { title: string; body: string }[];
  architecture: string[];
  deployment: { label: string; href: string }[];
  agentName: string;
  agentIntro: string;
  suggestedQuestions: string[];
  repo: string;
};

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  edinform: {
    repo: "EdinForm11",
    agentName: "EdinForm Guide",
    agentIntro:
      "Ask me about the monorepo, tRPC API, conditional logic, analytics, deployment on edinform.in, or anything in the GitHub repo.",
    suggestedQuestions: [
      "How does conditional logic work?",
      "What's the monorepo structure?",
      "How are response limits enforced?",
      "Where is the backend hosted?",
    ],
    problem:
      "Teams need Typeform-quality multi-step forms with analytics, limits, and exports — without paying enterprise prices or losing control of their data model.",
    solution:
      "EdinForm is a production SaaS on a Turborepo monorepo: Next.js frontend on Vercel, Express + tRPC API on Render, PostgreSQL via Drizzle, Redis rate limits, and a custom domain at edinform.in.",
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
    agentIntro:
      "Ask about the delivery loop, GitHub App reviews, Inngest jobs, task board, AI codegen, or how ShipFlow ties requirements to PRs.",
    suggestedQuestions: [
      "How does AI PR review work?",
      "What's the delivery loop from idea to ship?",
      "Which Inngest workflows run in the background?",
      "How does GitHub integration work?",
    ],
    problem:
      "Features get lost between customer requests, planning docs, GitHub PRs, and release — teams lack one thread from idea to shipped code.",
    solution:
      "ShipFlow AI unifies clarify → requirements → tasks → plan approval → development → AI PR review → human release approval on shipflowai.in.",
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
    agentIntro:
      "Ask about Gmail/Calendar via Corsair, pgvector search, MCP agent, priority triage, webhooks, or the Superhuman-style UX.",
    suggestedQuestions: [
      "How does semantic search work?",
      "What is Corsair's role?",
      "How does the MCP agent send email?",
      "How is realtime sync implemented?",
    ],
    problem:
      "Gmail and Calendar are powerful but fragmented — slow search, no unified AI layer, and constant tab-switching kill momentum.",
    solution:
      "Relvion rebuilds the inbox + calendar workflow with live Gmail/Calendar via Corsair, Gemini triage, pgvector search, and an MCP agent sidebar.",
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
    agentIntro:
      "Ask about Socket.io rooms, quiz anti-cheat, dual timers, MongoDB aggregations, JWT auth, or the Vercel + Render split.",
    suggestedQuestions: [
      "How do live polls sync in realtime?",
      "How does quiz tab monitoring work?",
      "What's the frontend/backend split?",
      "How is auth handled cross-origin?",
    ],
    problem:
      "Live events need synchronized polls and quizzes with honest participation tracking — generic forms can't handle realtime rooms, timers, and anti-cheat.",
    solution:
      "Votora delivers MCQ polls and scored quizzes with Socket.io rooms, lobby timers, live Recharts dashboards, and optional quiz integrity checks.",
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
