const OWNER = "Ayush-Panda-design";

const TREE_CACHE_TTL_MS = 10 * 60 * 1000;
const MAX_FILES = 20;
const MAX_BYTES_PER_FILE = 9_000;
const MAX_TOTAL_CODE_BYTES = 58_000;

const SKIP_DIR = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  ".vercel",
  "coverage",
  "__pycache__",
  ".turbo",
  ".cache",
  "out",
  ".nitro",
  "generated",
]);

const SKIP_EXT = new Set([
  "lock",
  "png",
  "jpg",
  "jpeg",
  "gif",
  "webp",
  "svg",
  "ico",
  "woff",
  "woff2",
  "ttf",
  "eot",
  "mp4",
  "mp3",
  "zip",
  "tar",
  "gz",
  "map",
  "min.js",
  "min.css",
]);

const CODE_EXT = new Set([
  "ts",
  "tsx",
  "js",
  "jsx",
  "mjs",
  "cjs",
  "py",
  "go",
  "rs",
  "java",
  "kt",
  "rb",
  "php",
  "sql",
  "prisma",
  "graphql",
  "gql",
  "yaml",
  "yml",
  "toml",
  "json",
  "md",
  "css",
  "scss",
  "html",
  "sh",
  "env.example",
]);

const PRIORITY_PATHS = [
  "package.json",
  "turbo.json",
  "pnpm-workspace.yaml",
  "docker-compose",
  "schema.prisma",
  "drizzle.config",
  "vite.config",
  "next.config",
];

type TreeCache = { paths: string[]; fetchedAt: number; truncated: boolean };
const treeCache = new Map<string, TreeCache>();

export type RepoSnapshot = {
  readme: string;
  pushedAt: string;
  defaultBranch: string;
  description: string;
};

export type CodeContext = {
  files: { path: string; content: string }[];
  totalPaths: number;
  truncated: boolean;
};

function githubHeaders(accept = "application/vnd.github+json") {
  const headers: Record<string, string> = {
    Accept: accept,
    "User-Agent": "Ayush-Portfolio-Agent",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

function shouldSkipPath(path: string): boolean {
  const lower = path.toLowerCase();
  const parts = lower.split("/");

  if (parts.some((p) => SKIP_DIR.has(p))) return true;
  if (lower.includes("node_modules")) return true;

  const hidden = parts.filter((p) => p.startsWith(".") && p.length > 1);
  if (hidden.length > 0) {
    const allowedHidden = hidden.every(
      (h) => h === ".env.example" || h === ".github" || h.startsWith("github"),
    );
    if (!allowedHidden && !PRIORITY_PATHS.some((p) => lower.includes(p))) return true;
  }

  if (path.endsWith(".lock") || lower.includes("bun.lock")) return true;
  const ext = path.split(".").pop()?.toLowerCase() ?? "";
  if (SKIP_EXT.has(ext)) return true;
  return false;
}

function isCodeFile(path: string): boolean {
  const lower = path.toLowerCase();
  if (PRIORITY_PATHS.some((p) => lower.includes(p))) return true;
  const name = lower.split("/").pop() ?? "";
  const ext = name.includes(".") ? name.split(".").pop()! : "";
  return CODE_EXT.has(ext);
}

function queryTerms(query: string): string[] {
  return [...new Set(query.toLowerCase().split(/\W+/).filter((t) => t.length > 2))];
}

function scorePath(path: string, terms: string[]): number {
  const lower = path.toLowerCase();
  let score = 0;
  for (const term of terms) {
    if (lower.includes(term)) score += 3;
    const segments = lower.split(/[/._-]/);
    if (segments.some((s) => s === term || s.startsWith(term))) score += 2;
  }
  if (PRIORITY_PATHS.some((p) => lower.includes(p))) score += 4;
  if (lower.includes("/routes/") || lower.includes("/api/") || lower.includes("/server/")) score += 1;
  if (lower.includes("schema") || lower.includes("model") || lower.includes("controller")) score += 1;
  return score;
}

function selectRelevantPaths(allPaths: string[], query: string, max = MAX_FILES): string[] {
  const codePaths = allPaths.filter((p) => !shouldSkipPath(p) && isCodeFile(p));
  const terms = queryTerms(query);

  const scored = codePaths
    .map((path) => ({ path, score: scorePath(path, terms) }))
    .sort((a, b) => b.score - a.score);

  const picked = new Set<string>();

  for (const { path, score } of scored) {
    if (picked.size >= max) break;
    if (score > 0 || picked.size < 8) picked.add(path);
  }

  if (picked.size < 8) {
    for (const { path } of scored) {
      if (picked.size >= max) break;
      picked.add(path);
    }
  }

  return [...picked].slice(0, max);
}

async function fetchRepoTreePaths(
  repo: string,
  branch: string,
): Promise<{ paths: string[]; truncated: boolean }> {
  const cacheKey = `${repo}@${branch}`;
  const cached = treeCache.get(cacheKey);
  if (cached && Date.now() - cached.fetchedAt < TREE_CACHE_TTL_MS) {
    return { paths: cached.paths, truncated: cached.truncated };
  }

  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${repo}/git/trees/${encodeURIComponent(branch)}?recursive=1`,
    { headers: githubHeaders() },
  );

  if (!res.ok) return { paths: [], truncated: false };

  const json = (await res.json()) as {
    tree?: { path?: string; type?: string }[];
    truncated?: boolean;
  };

  const paths =
    json.tree?.filter((t) => t.type === "blob" && t.path).map((t) => t.path!) ?? [];

  treeCache.set(cacheKey, {
    paths,
    fetchedAt: Date.now(),
    truncated: json.truncated ?? false,
  });

  return { paths, truncated: json.truncated ?? false };
}

async function fetchFileContent(repo: string, path: string, branch: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${OWNER}/${repo}/contents/${path.split("/").map(encodeURIComponent).join("/")}?ref=${encodeURIComponent(branch)}`,
      { headers: githubHeaders("application/vnd.github.raw") },
    );
    if (!res.ok) return null;
    const text = await res.text();
    return text.slice(0, MAX_BYTES_PER_FILE);
  } catch {
    return null;
  }
}

export async function fetchRelevantCode(
  repo: string,
  query: string,
  branch: string,
): Promise<CodeContext> {
  const { paths, truncated } = await fetchRepoTreePaths(repo, branch);
  if (!paths.length) return { files: [], totalPaths: 0, truncated };

  const selected = selectRelevantPaths(paths, query);
  const files: { path: string; content: string }[] = [];
  let totalBytes = 0;

  const BATCH = 6;
  for (let i = 0; i < selected.length; i += BATCH) {
    const batch = selected.slice(i, i + BATCH);
    const results = await Promise.all(
      batch.map(async (path) => {
        const content = await fetchFileContent(repo, path, branch);
        return content ? { path, content } : null;
      }),
    );
    for (const file of results) {
      if (!file) continue;
      if (totalBytes + file.content.length > MAX_TOTAL_CODE_BYTES) break;
      files.push(file);
      totalBytes += file.content.length;
    }
    if (totalBytes >= MAX_TOTAL_CODE_BYTES) break;
  }

  return { files, totalPaths: paths.length, truncated };
}

export function formatCodeContext(ctx: CodeContext): string {
  if (!ctx.files.length) return "(Source files unavailable — using README and curated knowledge)";
  const header = `Scanned ${ctx.totalPaths} repo paths · loaded ${ctx.files.length} relevant source file(s)${ctx.truncated ? " · tree truncated by GitHub" : ""}`;
  const body = ctx.files
    .map((f) => `### ${f.path}\n\`\`\`\n${f.content}\n\`\`\``)
    .join("\n\n");
  return `${header}\n\n${body}`;
}

export async function fetchRepoSnapshot(repo: string): Promise<RepoSnapshot | null> {
  try {
    const [readmeRes, repoRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${OWNER}/${repo}/readme`, {
        headers: githubHeaders("application/vnd.github.raw"),
      }),
      fetch(`https://api.github.com/repos/${OWNER}/${repo}`, {
        headers: githubHeaders(),
      }),
    ]);

    if (!readmeRes.ok || !repoRes.ok) return null;

    const meta = (await repoRes.json()) as {
      pushed_at: string;
      default_branch: string;
      description: string | null;
    };
    const readme = await readmeRes.text();

    return {
      readme: readme.slice(0, 24_000),
      pushedAt: meta.pushed_at,
      defaultBranch: meta.default_branch,
      description: meta.description ?? "",
    };
  } catch {
    return null;
  }
}
