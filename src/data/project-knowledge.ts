/** Curated knowledge from each project's GitHub README — used as agent context + offline fallback. */
export const PROJECT_KNOWLEDGE: Record<string, string> = {
  edinform: `EdinForm — Production-Style Form Builder SaaS
Live: https://edinform.in | Frontend Vercel | Backend Render | Domain edinform.in
GitHub: Ayush-Panda-design/EdinForm11

MONOREPO (Turborepo + pnpm):
- apps/api — Express + tRPC backend port 8000
- apps/web — Next.js 16 App Router + Tailwind v4
- packages/database — Drizzle ORM + PostgreSQL
- packages/trpc/server/routes — forms, responses, analytics, public, auth
- packages/validators — Zod schemas everywhere
- packages/services — business logic

CORE FEATURES:
- JWT auth (sign up/in/out), creator dashboard, CRUD forms
- 9 field types with Zod validation, required/optional per field
- Public submission without login, /explore for public forms
- Unlisted forms via direct link only
- Form preview (multi-step + classic), conditional logic show/hide fields
- Multi-step Typeform UI: dark theme, cover screen, keyboard nav, per-step validation
- QR code sharing with PNG download, response limits server-enforced, form expiry 403 after close
- CSV export, Recharts analytics per form and creator-wide
- Custom slugs, duplication, archiving, progress bar, completion time tracking
- Rate limiting via Upstash Redis (in-memory fallback), Resend email (console fallback)
- Scalar API docs at /docs, OpenAPI 3.1

TECH: Next.js 16, Express, tRPC, Zod, Drizzle, PostgreSQL, Upstash Redis, Recharts, qrcode.react
Demo credentials: creator@example.com / admin@example.com — password123`,

  shipflow: `ShipFlow AI — Idea to shipped code delivery platform
Live: https://shipflowai.in
GitHub: Ayush-Panda-design/ShipFlowAI

WHY: Teams have GitHub and backlogs but no single thread from customer request → requirements → tasks → review → release.

DELIVERY LOOP:
1. Discover — dashboard, customer intake, intake API (email/ticket/call)
2. Clarify — AI follow-up questions, duplicate detection
3. Plan — requirements doc → engineering tasks → team plan approval
4. Build — GitHub repos, sync PRs, link to parent feature
5. Review — AI reviews diffs vs requirements/tasks, blocking/non-blocking, inline comments, GitHub Checks
6. Ship — release readiness → human approval → optional auto-merge → marked shipped

TECH STACK:
- Turborepo + pnpm, Next.js 16 + Shadcn UI
- tRPC + server actions, BetterAuth (GitHub OAuth + email)
- Prisma + PostgreSQL (Neon), Inngest background jobs
- Octokit GitHub App + webhooks, Vercel AI SDK + OpenRouter/Gemini
- Optional Pinecone vectors, Razorpay subscriptions

INNGEST: PR reviews, release readiness, crons, optional codegen
INLINE AI: clarify, requirements, task generation run in web app for fast UI feedback

KEY UI: Task board (Kanban), review history with blocking counts and scores, feature requests, customer intake, pull requests, release approval`,

  relvion: `Relvion AI — Superhuman-style Gmail & Calendar workspace on Corsair
Live: https://relvion-ai.vercel.app/
GitHub: Ayush-Panda-design/Relvion-AI

PROBLEM: Gmail search is slow/syntax-heavy, calendar in another tab, no unified AI that acts inside workflow.

SOLUTION: Opinionated rebuild with live Gmail + Calendar via Corsair, Gemini triage, pgvector search, MCP agent.

FEATURES:
- Smart Inbox: live list, read/send/reply/archive/trash/star/draft, snooze, templates, contact-aware priority
- Priority labels: URGENT / IMPORTANT / FYI
- Calendar: CRUD events, attendee invites, NL scheduling via agent, realtime Google sync
- Agent Sidebar (MCP): Corsair MCP + Gemini function-calling, read/send/draft/schedule in one message
- Search: Gmail operators → Corsair DB cache → pgvector semantic → live Gmail API; calendar in same search
- Realtime: webhooks → SSE push (faster than polling Gmail)
- Compose: Gmail-powered new message modal via Corsair
- Keyboard shortcuts, command palette, analytics, resizable AI panel

TECH: Next.js, TypeScript, PostgreSQL, pgvector, Gemini, Corsair (Gmail, Calendar, MCP, Postgres cache)
SECURITY: OAuth-only, TLS, httpOnly tokens, no training on user mail, data stays in Google

ARCHITECTURE: Google APIs → Corsair sync/cache → Relvion workspace (inbox, calendar, agent) → Gemini`,

  votora: `Votora — Real-Time Polling & Live Feedback Platform
Frontend: https://votora-client-jaam.vercel.app
Backend: https://votora-real-time-polling-platform.onrender.com
GitHub: Ayush-Panda-design/Votora-Real-Time-Polling-Platform

FOR CREATORS:
- MCQ polls + scored quizzes with correct answers, descriptions, optional PIN
- Auto-expiry (datetime close) + manual live timer (lobby → synchronized start)
- Quiz tab monitoring: tab blur/window switch auto-submits answers (client deterrent)
- Live dashboard: Recharts bar/pie, MongoDB aggregation pipelines
- Presentation mode, publish results on public link, CSV export, section guides

FOR RESPONDENTS:
- Anonymous polls need no login; live Socket.io sync; responsive glassmorphic UI
- Auth-required polls redirect back after login

TECH FRONTEND: React 18, Vite, Redux Toolkit, Tailwind, Framer Motion, Recharts, React Router v6, Socket.io-client
TECH BACKEND: Node.js, Express, MongoDB/Mongoose, Socket.io poll-scoped rooms, JWT httpOnly + Bearer fallback, Google OAuth
SECURITY: express-rate-limit, CORS allowlist, origin/referer CSRF guard, Helmet
ARCHITECTURE: Vercel SPA ↔ Render Express API ↔ MongoDB Atlas; cross-origin SameSite=None cookies

FOLDER: layered Routes → Controllers → Services → Models`,
};
