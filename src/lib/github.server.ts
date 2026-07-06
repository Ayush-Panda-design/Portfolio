const OWNER = "Ayush-Panda-design";

export type RepoSnapshot = {
  readme: string;
  pushedAt: string;
  defaultBranch: string;
  description: string;
};

export async function fetchRepoSnapshot(repo: string): Promise<RepoSnapshot | null> {
  try {
    const [readmeRes, repoRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${OWNER}/${repo}/readme`, {
        headers: { Accept: "application/vnd.github.raw", "User-Agent": "Ayush-Portfolio" },
      }),
      fetch(`https://api.github.com/repos/${OWNER}/${repo}`, {
        headers: { Accept: "application/vnd.github+json", "User-Agent": "Ayush-Portfolio" },
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
