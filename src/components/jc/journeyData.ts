/** The learning path, one room per module. Items are the topics covered. */
export type Mod = {
  id: string; num: string; room: string; title: string; tagline: string; accent: string;
  sections: { t: string; items: string[] }[];
};

const S = (t: string, items: string) => ({ t, items: items.split("|") });

export const MODULES: Mod[] = [
  {
    id: "net", num: "01", room: "The Network Room", title: "Fundamentals", tagline: "How the internet actually moves a page from there to here.", accent: "#4C9BFF",
    sections: [
      S("Computer Networks", "What is the Internet|World Wide Web overview|Data transferring|IP addresses & ports|ISPs|Routers"),
      S("Domain Name Systems", "What DNS is|How domains resolve|A, CNAME, MX records|Root, TLD & authoritative servers|Recursive resolver"),
      S("Client–Server", "Earlier architectures|Why client–server|HTTP request–response cycle|Web servers & hosting"),
      S("Internet Protocols", "TCP/IP|SYN · SYN-ACK · ACK|UDP|Reliability vs speed|HTTP & HTTPS|TLS / SSL|WebSocket|WebRTC"),
    ],
  },
  {
    id: "tools", num: "02", room: "The Workshop", title: "Tools", tagline: "The editor, the terminal and the safety net.", accent: "#FFB534",
    sections: [
      S("IDEs", "Why we need them|Types of IDEs|VS Code|AI in IDEs"),
      S("Terminal", "Role of the terminal|Basic commands"),
      S("Version Control", "Why version control|Git|GitHub"),
      S("AI Assistance", "Do's|Don'ts|Available options"),
    ],
  },
  {
    id: "blocks", num: "03", room: "The Studio", title: "Building Blocks", tagline: "HTML for structure, CSS for everything you can see.", accent: "#FF7A59",
    sections: [
      S("HTML", "Skeleton of a page|Tags & elements|Working with text|Semantic HTML"),
      S("Forms & Inputs", "Creating forms|Submissions|Input types|HTML5 date, email, range, color|Validation"),
      S("CSS Styling", "Cascade|Box model|Styling text|Specificity & selectors"),
      S("Responsive Layouts", "Layout techniques|Flexbox|Grid|Media queries"),
      S("Advanced CSS", "Pseudo classes & elements|Links, buttons, forms|Bootstrap & Tailwind|Animations & transitions|Shadows & gradients"),
    ],
  },
  {
    id: "browser", num: "04", room: "The Browser Lab", title: "Interacting With Browser", tagline: "JavaScript, from first line to the DOM and the network.", accent: "#FFD66B",
    sections: [
      S("Fundamentals", "Hello, world|Variables & types|Operators|Conditionals|Loops"),
      S("Functions", "Declaration, expression, arrow|Parameters & returns|Hoisting|Scope & closures"),
      S("Objects", "References & copying|Methods|Optional chaining|JSON|Symbol"),
      S("Data Types", "Strings|Arrays & methods|Iterating|Date & time"),
      S("ES6+", "Destructuring|Template literals|Default params|Rest & spread|Maps & Sets|ES modules"),
      S("OOP", "Classes & objects|Constructors & this|Prototypal inheritance|Polymorphism|Encapsulation"),
      S("Async", "setTimeout & setInterval|Callbacks|Promises & chaining|async / await"),
      S("DOM & Events", "DOM tree|Accessing & updating|Event listeners|Bubbling & capturing|Delegation"),
      S("Network", "Fetch|CORS|Fetch API"),
      S("Advanced JS", "Lexical scoping|this in context|call, apply, bind|try / catch|Custom errors"),
    ],
  },
  {
    id: "ts", num: "05", room: "The Type Lab", title: "TypeScript Essentials", tagline: "JavaScript with a safety net that catches me early.", accent: "#38BDF8",
    sections: [
      S("JavaScript with Types", "Why TypeScript exists|Thinking in types|Setup"),
      S("Type System", "Basic types|Interfaces vs type aliases|Union & intersection"),
      S("Generics", "Generic functions|Interfaces & constraints"),
      S("Tooling", "tsconfig.json|The compiler|Linting & formatting"),
    ],
  },
  {
    id: "backend", num: "06", room: "The Server Room", title: "Backend Engineering", tagline: "Servers, databases, auth and systems that hold up under load.", accent: "#34D399",
    sections: [
      S("Runtimes", "Why JS on the server|Node.js history|Runtimes in 2026"),
      S("Node Architecture", "Event-driven, non-blocking I/O|Event loop|Microtasks & macrotasks"),
      S("First HTTP Server", "HTTP module|GET, POST, PUT, DELETE|Request & response objects"),
      S("Express", "Routes|Params & query strings|Middleware"),
      S("REST APIs", "Endpoints|Request bodies|JSON responses|Status codes"),
      S("Files", "fs module|Async vs sync|Multer uploads"),
      S("Databases", "SQL vs NoSQL|MongoDB & Mongoose|PostgreSQL|Drizzle ORM"),
      S("Auth", "JWTs|bcryptjs|RBAC|JWKS|OAuth 2.0 & OIDC|Zanzibar"),
      S("Real-time", "WebSockets|Polling vs SSE|socket.io"),
      S("Rate Limiting", "express-rate-limit|Custom limiters|Handling errors"),
      S("High Throughput", "Redis & Streams|Distributed locks|Kafka|Pub/Sub & CQRS"),
      S("Observability", "Winston & Morgan|PM2|OpenTelemetry|Axiom & SigNoz"),
      S("Deployment", "Cloud hosts|Env variables|Nginx & Caddy"),
    ],
  },
  {
    id: "react", num: "07", room: "The Component Gallery", title: "Building Modern Frontends", tagline: "React, from JSX to apps that scale.", accent: "#22D3EE",
    sections: [
      S("React Intro", "What React is|Virtual DOM|Vite setup|JSX / TSX"),
      S("Components & Props", "Class vs functional|Props & children|Prop drilling|Reusable components"),
      S("State", "useState|Lifting state|Conditional rendering"),
      S("Effects", "Lifecycle methods|useEffect|Fetching & cleanup"),
      S("Hooks", "useContext, useReducer|useCallback, useMemo|useRef|Best practices"),
      S("Routing", "SPAs|React Router|TanStack Router|Dynamic routes"),
      S("State Management", "Context API"),
      S("Forms", "Controlled vs uncontrolled|Validation|React Hook Form|TanStack Form"),
      S("Performance", "Rendering behaviour|memo|Lazy loading|Suspense"),
      S("Deployment", "Vercel, Netlify, AWS|Env variables|Continuous deployment"),
      S("Patterns", "HOCs & render props|Compound components|Custom hooks"),
      S("Scaling", "Structuring large apps|Feature slices|Client-state libraries"),
    ],
  },
  {
    id: "next", num: "08", room: "The Framework Floor", title: "Full Stack Development", tagline: "One framework, front to back.", accent: "#E5E7EB",
    sections: [
      S("Frameworks", "What they are|State of frameworks in 2026"),
      S("Next.js Basics", "Why Next.js|Next vs React|Project setup|File-based routing|Layouts"),
      S("Rendering", "SSR|SSG|ISR"),
      S("APIs", "Route handlers|CRUD operations|Database|Errors & responses"),
      S("Server Actions", "vs API routes|use server|Implementing actions"),
    ],
  },
  {
    id: "ai", num: "09", room: "The AI Lab", title: "AI Integrations", tagline: "LLMs, workflows and agents that do real work.", accent: "#A78BFA",
    sections: [
      S("AI in 2026", "What GenAI is|LLMs|Use cases"),
      S("Workflows & Agents", "Workflows|Agents|How they differ"),
      S("Inngest", "Orchestration engine|Building workflows"),
      S("Vercel AI", "Step|Sleep|Hook|Observability"),
      S("Agentic Workflows", "Patterns|Use cases|Examples"),
    ],
  },
  {
    id: "devops", num: "10", room: "The Container Yard", title: "DevOps for Developers", tagline: "Containers, cloud and keeping it up.", accent: "#F472B6",
    sections: [
      S("Docker", "Why Docker|Images & containers|Dockerfiles|Compose"),
      S("Cloud", "Cloud computing|Providers|HA, scalability, fault tolerance|Cost & performance"),
      S("AWS EC2", "Instances|Types, regions, AZs|SSH|Credentials"),
      S("Security Groups", "Why they matter|Inbound & outbound rules|Restricting access|Best practices"),
      S("Load Balancers", "Why|Elastic Load Balancer|ALB|Health checks"),
      S("CloudFront", "Intro|Distributions|Caching & edge locations"),
    ],
  },
  {
    id: "prod", num: "11", room: "The Launch Pad", title: "Production Grade Projects", tagline: "Where it all comes together, built end to end.", accent: "#FF4D6D",
    sections: [
      S("OIDC Auth Service", "Architecture|JWT, refresh tokens, JWKS|OAuth 2.0 & PKCE|Hardening|OpenTelemetry|Docker"),
      S("Zanzibar-style AuthZ", "Permission models|Relationship tuples|Recursive graph traversal|Caching|Scale"),
      S("Form-builder SaaS", "Zod schemas|tRPC|MongoDB modelling|High-throughput ingestion|Turborepo|OpenAPI & Scalar"),
      S("AI Code Review", "Next.js & shadcn|BetterAuth|Polar billing|Octokit|AI SDK|Inngest|Prisma multi-tenant"),
      S("Build your own v0", "Prompt-to-UI|Server actions|Inngest AgentKit|E2B sandbox|Clerk"),
      S("Advanced RAG", "Vector search|Chunking|Embeddings|Retrieval|Background workflows|Evals & guardrails"),
    ],
  },
];

/** Eleven modules, grouped into six rooms so the tour stays short. */
export type Room = {
  id: string; num: string; room: string; title: string; tagline: string; accent: string; scene: string;
  mods: Mod[]; faces: { t: string; d: string }[];
};
const mod = (id: string) => MODULES.find((m) => m.id === id)!;
const F = (t: string, d: string) => ({ t, d });

export const ROOMS: Room[] = [
  {
    id: "found", num: "01", room: "The Foundations Room", title: "Foundations", scene: "net", accent: "#4C9BFF",
    tagline: "How the internet moves a page, and the tools I build with.",
    mods: [mod("net"), mod("tools")],
    faces: [F("DNS", "Turns names into addresses"), F("TCP/IP", "Reliable delivery, in order"), F("HTTP", "The request–response cycle"), F("TLS", "Encryption on the wire"), F("Git", "Every change, remembered"), F("VS Code", "Where the code gets written")],
  },
  {
    id: "web", num: "02", room: "The Web Studio", title: "HTML, CSS, JS & TypeScript", scene: "browser", accent: "#FFD66B",
    tagline: "Structure, style and behaviour, with types on top.",
    mods: [mod("blocks"), mod("browser"), mod("ts")],
    faces: [F("HTML", "Semantic structure"), F("CSS", "Flexbox, grid, animation"), F("JS", "From closures to async"), F("TS", "Types that catch bugs early"), F("DOM", "Events, bubbling, delegation"), F("ES6+", "Modern syntax and modules")],
  },
  {
    id: "front", num: "03", room: "The Frontend Gallery", title: "React & Full Stack", scene: "react", accent: "#22D3EE",
    tagline: "Components, state and a framework that runs both sides.",
    mods: [mod("react"), mod("next")],
    faces: [F("React", "Components and state"), F("Hooks", "useEffect, useMemo, custom hooks"), F("Routing", "React Router, TanStack Router"), F("Next.js", "File routing and layouts"), F("SSR", "SSR, SSG and ISR"), F("Actions", "Server actions and APIs")],
  },
  {
    id: "back", num: "04", room: "The Server Room", title: "Backend Engineering", scene: "backend", accent: "#34D399",
    tagline: "APIs, databases, auth and systems that hold up under load.",
    mods: [mod("backend")],
    faces: [F("Node", "Event loop and non-blocking I/O"), F("Express", "Routes and middleware"), F("SQL", "Postgres, Mongo, Drizzle"), F("Redis", "Streams, locks, rate limits"), F("Kafka", "Append-only logs and queues"), F("JWT", "OAuth 2.0, OIDC, RBAC")],
  },
  {
    id: "ai", num: "05", room: "The AI Lab", title: "AI Integrations", scene: "ai", accent: "#A78BFA",
    tagline: "LLMs, workflows and agents that do real work.",
    mods: [mod("ai")],
    faces: [F("LLMs", "What GenAI can and can't do"), F("Agents", "Tools plus a loop"), F("Inngest", "Durable workflows"), F("Vercel AI", "Step, sleep, hook"), F("RAG", "Retrieval with context"), F("Evals", "Guardrails and quality checks")],
  },
  {
    id: "ship", num: "06", room: "The Launch Pad", title: "DevOps & Production Projects", scene: "prod", accent: "#FF4D6D",
    tagline: "Containers, cloud, and projects built end to end.",
    mods: [mod("devops"), mod("prod")],
    faces: [F("Docker", "Images, containers, compose"), F("AWS", "EC2, security groups"), F("ALB", "Load balancers and health checks"), F("CDN", "CloudFront and edge caching"), F("OIDC", "Auth microservice, built whole"), F("RAG", "Advanced RAG with Inngest")],
  },
];
