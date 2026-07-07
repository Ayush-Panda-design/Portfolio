export type ProjectScreenshot = {
  src?: string;
  label: string;
  alt: string;
  placeholder?: boolean;
};

export type ProductionProject = {
  id: string;
  num: string;
  title: string;
  tag: string;
  summary: string;
  features: string[];
  stack: string[];
  screenshots: ProjectScreenshot[];
  demoVideoSrc?: string;
  live?: string;
  github: string;
  accent: string;
};

export type LearningProject = {
  id: string;
  title: string;
  stack: string[];
  github: string;
  live?: string;
  blurb: string;
};

export type LearningTopic = {
  id: string;
  label: string;
  concept: string;
  projects: LearningProject[];
};

export const PRODUCTION: ProductionProject[] = [
  {
    id: "shipflow",
    num: "01",
    title: "ShipFlow AI",
    tag: "AI · Live",
    summary:
      "Idea → requirements → tasks → AI PR review → human-approved release — one delivery thread for teams.",
    features: [
      "AI clarify, requirements docs & task breakdown",
      "GitHub App reviews with inline comments & checks",
      "Inngest background jobs for review & readiness",
      "BetterAuth, Prisma, Vercel AI SDK",
    ],
    stack: ["Next.js", "tRPC", "Prisma", "PostgreSQL", "Inngest", "OpenRouter", "GitHub App"],
    screenshots: [
      {
        src: "/projects/shipflow-landing.png",
        label: "Landing page",
        alt: "ShipFlow AI landing page with delivery workflow visualization",
      },
      {
        src: "/projects/shipflow-task-board.png",
        label: "Task board",
        alt: "ShipFlow AI Kanban task board with AI codegen integration",
      },
      {
        src: "/projects/shipflow-review-history.png",
        label: "AI review history",
        alt: "ShipFlow AI pull request review history with blocking checks",
      },
    ],
    live: "https://shipflowai.in",
    demoVideoSrc: "/videos/shipflow-demo.mp4",
    github: "https://github.com/Ayush-Panda-design/ShipFlowAI",
    accent: "violet",
  },
  {
    id: "relvion",
    num: "02",
    title: "Relvion AI",
    tag: "AI · Live",
    summary:
      "Superhuman-style Gmail & Calendar — AI triage, semantic search, and an MCP agent that acts for you.",
    features: [
      "Priority inbox (URGENT / IMPORTANT / FYI)",
      "pgvector semantic search under a second",
      "MCP agent: email + schedule in one message",
      "Webhook → SSE realtime pipeline",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "pgvector", "Gemini", "Corsair", "MCP"],
    screenshots: [
      {
        src: "/projects/relvion-landing.png",
        label: "Landing page",
        alt: "Relvion AI landing page for inbox, calendar, and AI workspace",
      },
      {
        src: "/projects/relvion-inbox.png",
        label: "Inbox & AI agent",
        alt: "Relvion AI triaged inbox with embedded workspace assistant",
      },
      {
        src: "/projects/relvion-compose.png",
        label: "Gmail compose",
        alt: "Relvion AI new message composer powered by Gmail via Corsair",
      },
    ],
    live: "https://relvion-ai.vercel.app/",
    demoVideoSrc: "/videos/relvion-demo.mp4",
    github: "https://github.com/Ayush-Panda-design/Relvion-AI",
    accent: "amber",
  },
  {
    id: "edinform",
    num: "03",
    title: "EdinForm",
    tag: "SaaS · Live",
    summary:
      "Typeform-style form builder monorepo — create, publish, and analyze forms end-to-end on a real domain.",
    features: [
      "Conditional logic & multi-step Typeform UI",
      "QR sharing, CSV export, Recharts analytics",
      "Response limits, expiry, Upstash rate limits",
      "tRPC + Drizzle + Turborepo production architecture",
    ],
    stack: ["Next.js", "Express", "tRPC", "Drizzle", "PostgreSQL", "Redis", "Turborepo"],
    screenshots: [
      {
        src: "/projects/edinform-landing.png",
        label: "Landing page",
        alt: "EdinForm marketing landing page with form builder preview",
      },
      {
        src: "/projects/edinform-analytics.png",
        label: "Analytics dashboard",
        alt: "EdinForm workspace analytics with charts and metrics",
      },
      {
        src: "/projects/edinform-templates.png",
        label: "Template library",
        alt: "EdinForm template gallery with categorized form starters",
      },
    ],
    live: "https://edinform.in",
    demoVideoSrc: "/videos/edinform-demo.mp4",
    github: "https://github.com/Ayush-Panda-design/EdinForm11",
    accent: "teal",
  },
  {
    id: "votora",
    num: "04",
    title: "Votora",
    tag: "Realtime",
    summary:
      "Live polling & quizzes with Socket.io rooms, dual timers, anti-cheat, and live analytics dashboards.",
    features: [
      "Live votes & charts over WebSockets",
      "Auto-expiry + manual synchronized live timer",
      "Quiz anti-cheat on tab blur / switch",
      "JWT httpOnly cookies, Google OAuth, rate limits",
    ],
    stack: ["React", "Redux", "Express", "MongoDB", "Socket.io", "JWT", "Recharts"],
    screenshots: [
      {
        src: "/projects/votora-landing.png",
        label: "Landing page",
        alt: "Votora realtime polling platform landing page with live poll mockup",
      },
      {
        src: "/projects/votora-create-poll.png",
        label: "Create poll",
        alt: "Votora poll creation wizard with security scoring",
      },
      {
        src: "/projects/votora-profile.png",
        label: "Profile workspace",
        alt: "Votora user profile and account management dashboard",
      },
    ],
    live: "https://votora-client-jaam.vercel.app",
    demoVideoSrc: "/videos/votora-demo.mp4",
    github: "https://github.com/Ayush-Panda-design/Votora-Real-Time-Polling-Platform",
    accent: "pink",
  },
];

export const LEARNING_TOPICS: LearningTopic[] = [
  {
    id: "ui-css",
    label: "UI · CSS",
    concept: "Layouts, landing pages, and motion-first interfaces while learning the web surface.",
    projects: [
      {
        id: "cursor-clone",
        title: "Cursor AI Clone",
        stack: ["HTML", "CSS"],
        github: "https://github.com/Ayush-Panda-design/Cursor-AI-Clone",
        live: "https://cursor-ai-clone.vercel.app",
        blurb: "Marketing-page recreation to practice structure, typography, and responsive CSS.",
      },
      {
        id: "airbnb",
        title: "Airbnb UI",
        stack: ["React", "Vite", "Tailwind", "Framer Motion"],
        github: "https://github.com/Ayush-Panda-design/AirBnb",
        blurb: "Spotlight, beams, filters, wishlist, and listing detail — Aceternity-style UI practice.",
      },
    ],
  },
  {
    id: "js-react",
    label: "JS · React",
    concept: "State, events, components, and routing — small apps that lock in core frontend skills.",
    projects: [
      {
        id: "tictactoe",
        title: "Tic-Tac-Toe",
        stack: ["React", "Vite", "Tailwind"],
        github: "https://github.com/Ayush-Panda-design/Tic-Tac-Toe",
        live: "https://tic-tac-toe-ruddy-psi-96.vercel.app",
        blurb: "Game state, win detection, and clean component structure.",
      },
      {
        id: "youtube",
        title: "MyTube Grid",
        stack: ["React", "TypeScript", "Vite"],
        github: "https://github.com/Ayush-Panda-design/YouTube_Video_Listing",
        live: "https://you-tube-video-listing-nu.vercel.app",
        blurb: "YouTube-style video grid to practice TSX lists and card layouts.",
      },
      {
        id: "eurobite",
        title: "EuroBite",
        stack: ["Expo", "Expo Router", "TypeScript", "AsyncStorage"],
        github: "https://github.com/Ayush-Panda-design/EuroBite",
        live: "https://youtube.com/shorts/UgUKPW-9NY4",
        blurb: "Food delivery mobile app — auth, cart, orders, deep links on Expo SDK 54.",
      },
    ],
  },
  {
    id: "apis",
    label: "APIs",
    concept: "Talking to external APIs, loading states, and rendering dynamic data.",
    projects: [
      {
        id: "cats",
        title: "Random Cat Viewer",
        stack: ["React", "Vite", "Fetch API"],
        github: "https://github.com/Ayush-Panda-design/Random-Cat_Viewer",
        live: "https://random-cat-viewer-nu.vercel.app",
        blurb: "Random images from a public API with simple UI controls.",
      },
      {
        id: "quotes",
        title: "Quotes App",
        stack: ["React", "Vite", "Fetch API"],
        github: "https://github.com/Ayush-Panda-design/Quotes-App",
        live: "https://quotes-app-coral-kappa.vercel.app",
        blurb: "Quote fetching and display — async UI practice.",
      },
      {
        id: "users",
        title: "Random Users UI",
        stack: ["React", "Vite", "Fetch API"],
        github: "https://github.com/Ayush-Panda-design/Random-Users-UI",
        live: "https://random-users-ui-rho.vercel.app",
        blurb: "User cards from a random-user API — lists, avatars, profiles.",
      },
    ],
  },
  {
    id: "firebase",
    label: "Firebase",
    concept: "Auth, Firestore, realtime sync, and role-based product flows.",
    projects: [
      {
        id: "trip",
        title: "TripTogether",
        stack: ["React", "Firebase", "Zustand", "dnd-kit", "Recharts"],
        github: "https://github.com/Ayush-Panda-design/TripTogether",
        live: "https://trip-together-beige.vercel.app",
        blurb: "Collaborative trips — itinerary, budget, comments, roles, PWA.",
      },
      {
        id: "vssut",
        title: "VSSUT Network",
        stack: ["React", "Firebase", "Framer Motion"],
        github: "https://github.com/Ayush-Panda-design/VSSUT-Network",
        live: "https://vssut-network.vercel.app",
        blurb: "Alumni/student network — directory, year chat rooms, admin dashboard.",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    concept: "Express, JWT, PostgreSQL transactions, and Dockerized services.",
    projects: [
      {
        id: "cinema",
        title: "ChaiCode Cinema",
        stack: ["Node.js", "Express", "PostgreSQL", "JWT", "Docker"],
        github: "https://github.com/Ayush-Panda-design/CHAICODE-CINEMA",
        live: "https://chaicode-cinema-iota.vercel.app",
        blurb: "Seat booking with row-level locks — concurrency-safe bookings.",
      },
      {
        id: "aichat",
        title: "AI Chat Clone",
        stack: ["React", "Node.js", "AI APIs"],
        github: "https://github.com/Ayush-Panda-design/AI-CHAT_CLONE",
        blurb: "Chat UI and backend wiring while learning LLM integrations.",
      },
    ],
  },
  {
    id: "realtime",
    label: "Realtime",
    concept: "WebSockets, Redis bitfields, Kafka streams, and multi-client sync.",
    projects: [
      {
        id: "million",
        title: "1 Million Checkboxes",
        stack: ["Node.js", "WebSockets", "Redis", "Canvas", "JWT"],
        github: "https://github.com/Ayush-Panda-design/1-Million-Checkboxes",
        blurb: "1M checkboxes via Redis BITFIELD, pub/sub, canvas viewport culling.",
      },
      {
        id: "location",
        title: "Live Location Tracker",
        stack: ["Socket.IO", "Kafka", "MongoDB", "Redis", "Leaflet"],
        github: "https://github.com/Ayush-Panda-design/Live-Location-Tracker",
        blurb: "Live map tracking — Kafka buffers location events for scale.",
      },
    ],
  },
  {
    id: "data-design",
    label: "Data Modeling",
    concept: "ERDs and schemas for real domains — designed before writing app code.",
    projects: [
      {
        id: "elevator",
        title: "Smart Elevator Control",
        stack: ["ERD", "RDBMS", "Normalization"],
        github: "https://github.com/Ayush-Panda-design/Smart-Elevator-Control",
        blurb: "Multi-building elevators, access control, maintenance, alerts.",
      },
      {
        id: "parking",
        title: "Comic-Con Parking",
        stack: ["ERD", "Billing", "Reservations"],
        github: "https://github.com/Ayush-Panda-design/Comic-Con-Parking-System",
        blurb: "Multi-zone event parking — sessions, tickets, EV charging.",
      },
      {
        id: "clinic",
        title: "Clinic Platform",
        stack: ["ERD", "Healthcare workflows"],
        github: "https://github.com/Ayush-Panda-design/Clinic-Appointment-and-Diagnostics-Platform",
        blurb: "Appointments → consults → labs → reports → payments.",
      },
      {
        id: "fitness",
        title: "Fitness Coaching",
        stack: ["ERD", "Subscriptions"],
        github: "https://github.com/Ayush-Panda-design/Fitness-Influencer-Coaching-Platform",
        blurb: "Trainers, programs, check-ins, progress, messaging.",
      },
      {
        id: "thrift",
        title: "Thrift Creator Store",
        stack: ["Schema", "Inventory", "Orders"],
        github: "https://github.com/Ayush-Panda-design/Instagram-Thrift-Creator-Store",
        blurb: "Thrift/handmade catalog — variants, stock, payments, shipping.",
      },
    ],
  },
];

export const LEARNING_COUNT = LEARNING_TOPICS.reduce((n, t) => n + t.projects.length, 0);
export const TOTAL_PROJECTS = PRODUCTION.length + LEARNING_COUNT;

export function getProductionProject(id: string) {
  return PRODUCTION.find((p) => p.id === id);
}

export const PRODUCTION_IDS = PRODUCTION.map((p) => p.id);
