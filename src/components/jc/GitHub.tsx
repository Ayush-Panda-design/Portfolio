import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { MeBuddy } from "./MeBuddy";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PRODUCTION } from "@/data/projects";
import { Counter, SecHead } from "./lib";

const USER = "Ayush-Panda-design";
type Day = { date: string; count: number; level: number };
type Repo = { name: string; description: string | null; html_url: string; language: string | null; stargazers_count: number; forks_count: number; pushed_at: string; fork: boolean };
type PR = { id: number; title: string; html_url: string; state: string; repository_url: string; closed_at: string | null; created_at: string; pull_request?: { merged_at: string | null } };

const LANG: Record<string, string> = { TypeScript: "#3178c6", JavaScript: "#f1e05a", Python: "#3572A5", Java: "#b07219", HTML: "#e34c26", CSS: "#a56cc1", Go: "#00ADD8", Rust: "#dea584", "C++": "#f34b7d", C: "#8a8a8a", Shell: "#89e051", Dockerfile: "#384d54" };

async function cached<T>(key: string, load: () => Promise<T>): Promise<T> {
  try {
    const raw = sessionStorage.getItem(key);
    if (raw) {
      const { t, v } = JSON.parse(raw);
      if (Date.now() - t < 3600_000) return v as T;
    }
  } catch {}
  const v = await load();
  try {
    sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), v }));
  } catch {}
  return v;
}

const YEAR_OPTS = ["last", String(new Date().getFullYear()), String(new Date().getFullYear() - 1), String(new Date().getFullYear() - 2)];

function fmt(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}
function ago(d: string) {
  const days = Math.max(0, Math.round((Date.now() - new Date(d).getTime()) / 86400000));
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.round(days / 30)}mo ago`;
  return `${Math.round(days / 365)}y ago`;
}

function stats(days: Day[]) {
  let total = 0, active = 0, best = 0, bestDay = "", run = 0, longest = 0, lStart = 0, lEnd = -1, start = 0;
  days.forEach((d, i) => {
    total += d.count;
    if (d.count > 0) {
      active++;
      if (run === 0) start = i;
      run++;
      if (run > longest) {
        longest = run;
        lStart = start;
        lEnd = i;
      }
    } else run = 0;
    if (d.count > best) {
      best = d.count;
      bestDay = d.date;
    }
  });
  // current streak, allowing for "today" not being done yet
  let cur = 0;
  let i = days.length - 1;
  if (i >= 0 && days[i].count === 0) i--;
  while (i >= 0 && days[i].count > 0) {
    cur++;
    i--;
  }
  return { total, active, best, bestDay, longest, lStart, lEnd, cur };
}

/** The 3D me: reads the heatmap out loud and follows your pointer. */
function Robot({ say, mood }: { say: string; mood: "idle" | "happy" | "sleepy" }) {
  return (
    <div className="gh-bot">
      <MeBuddy mood={mood} />
      <AnimatePresence mode="wait">
        <motion.div key={say} className="gh-say" initial={{ opacity: 0, scale: 0.85, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
          {say}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function GitHub() {
  const [year, setYear] = useState("last");
  const [days, setDays] = useState<Day[] | null>(null);
  const [err, setErr] = useState(false);
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [prs, setPrs] = useState<PR[] | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [streakOn, setStreakOn] = useState(false);
  const [wave, setWave] = useState(0);
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let off = false;
    setDays(null);
    setErr(false);
    cached<Day[]>(`gh-c-${year}`, async () => {
      const r = await fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=${year}`);
      if (!r.ok) throw new Error("contrib");
      const j = await r.json();
      return j.contributions as Day[];
    })
      .then((d) => !off && (setDays(d), setWave((w) => w + 1)))
      .catch(() => !off && setErr(true));
    return () => {
      off = true;
    };
  }, [year]);

  useEffect(() => {
    let off = false;
    cached<Repo[]>("gh-repos", async () => {
      const r = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`);
      if (!r.ok) throw new Error("repos");
      return r.json();
    })
      .then((d) => !off && setRepos(d))
      .catch(() => !off && setRepos([]));
    cached<PR[]>("gh-prs", async () => {
      const r = await fetch(`https://api.github.com/search/issues?q=${encodeURIComponent(`author:${USER} type:pr -user:${USER}`)}&sort=updated&per_page=8`);
      if (!r.ok) throw new Error("prs");
      return (await r.json()).items;
    })
      .then((d) => !off && setPrs(d))
      .catch(() => !off && setPrs([]));
    return () => {
      off = true;
    };
  }, []);

  const S = useMemo(() => (days ? stats(days) : null), [days]);

  // weeks as columns, Sunday on top
  const grid = useMemo(() => {
    if (!days?.length) return { cells: [] as (Day | null)[], cols: 0, months: [] as { c: number; l: string }[] };
    const lead = new Date(days[0].date + "T00:00:00").getDay();
    const cells: (Day | null)[] = [...Array(lead).fill(null), ...days];
    const cols = Math.ceil(cells.length / 7);
    const months: { c: number; l: string }[] = [];
    let last = -1;
    for (let c = 0; c < cols; c++) {
      const d = cells.slice(c * 7, c * 7 + 7).find(Boolean);
      if (!d) continue;
      const m = new Date(d.date + "T00:00:00").getMonth();
      if (m !== last) {
        last = m;
        months.push({ c, l: new Date(d.date + "T00:00:00").toLocaleDateString("en-GB", { month: "short" }) });
      }
    }
    return { cells, cols, months };
  }, [days]);

  const lead = days?.length ? new Date(days[0].date + "T00:00:00").getDay() : 0;
  const hovDay = hover !== null && days ? days[hover] : null;
  const say = hovDay
    ? hovDay.count === 0
      ? `${fmt(hovDay.date)}: quiet day 😴`
      : `${fmt(hovDay.date)}: ${hovDay.count} contribution${hovDay.count > 1 ? "s" : ""}${hovDay.level >= 3 ? " 🔥" : ""}`
    : err
      ? "I can't reach GitHub right now. Try again in a minute."
      : S
        ? `${S.total} contributions, longest streak ${S.longest} days. Hover a day!`
        : "Hi, I'm Ayush 👋 Fetching the data…";
  const mood = hovDay ? (hovDay.count === 0 ? "sleepy" : hovDay.level >= 3 ? "happy" : "idle") : "idle";

  const onMove = useCallback((e: React.PointerEvent) => {
    const el = card.current;
    if (el) {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--nx", String((e.clientX - r.left) / r.width - 0.5));
      el.style.setProperty("--ny", String((e.clientY - r.top) / r.height - 0.5));
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    }
    const i = (e.target as HTMLElement).dataset?.i;
    setHover(i !== undefined ? Number(i) : null);
  }, []);

  // repos: projects I ship first (the pinned ones), then the rest by stars and recency
  const shown = useMemo(() => {
    if (!repos) return null;
    const mine = repos.filter((r) => !r.fork);
    const pinned = new Set(PRODUCTION.map((p) => p.github.split("/").pop()!.toLowerCase()));
    return [...mine].sort((a, b) => Number(pinned.has(b.name.toLowerCase())) - Number(pinned.has(a.name.toLowerCase())) || b.stargazers_count - a.stargazers_count || +new Date(b.pushed_at) - +new Date(a.pushed_at)).slice(0, 6);
  }, [repos]);
  const langs = useMemo(() => {
    const m = new Map<string, number>();
    repos?.filter((r) => !r.fork && r.language).forEach((r) => m.set(r.language!, (m.get(r.language!) ?? 0) + 1));
    const tot = [...m.values()].reduce((a, b) => a + b, 0) || 1;
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([l, n]) => ({ l, n, p: (n / tot) * 100 }));
  }, [repos]);
  const [lang, setLang] = useState<string | null>(null);

  const secRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: secRef, offset: ["start start", "end end"] });
  const sp = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const split = useTransform(sp, [0.12, 0.88], [100, 0]);
  const clip = useTransform(split, (v) => `inset(0 0 0 ${v}%)`);
  const divLeft = useTransform(split, (v) => `${v}%`);
  const hintOp = useTransform(sp, [0, 0.1], [1, 0]);

  return (
    <section id="github" data-scene="github" className="jc-sec jc-gh gh-split" ref={secRef}>
      <div className="gh-sticky">
      <div className="gh-pane gh-a">
      <div className="jc-wrap">
        <SecHead label="Open source & activity" title="Building in public." variant="type" sub="Live from GitHub: my contributions, repositories and pull requests." />

        <div className="gh-top">
          <Robot say={say} mood={mood} />
          <div className="gh-tiles">
            {[
              { l: "Contributions", v: S?.total, s: year === "last" ? "last 12 months" : year },
              { l: "Active days", v: S?.active, s: S ? `${Math.round((S.active / (days?.length || 1)) * 100)}% of days` : "" },
              { l: "Longest streak", v: S?.longest, s: "days in a row", suffix: "" },
              { l: "Current streak", v: S?.cur, s: S?.cur ? "keep it going" : "start today" },
            ].map((t) => (
              <div key={t.l} className="gh-tile">
                <small>{t.l}</small>
                <b>{t.v === undefined ? "–" : <Counter key={`${year}-${t.v}`} to={t.v} />}</b>
                <span>{t.s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="gh-card" ref={card} onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
          <i className="gh-spot" />
          <div className="gh-ctrl">
            <div className="gh-years">
              {YEAR_OPTS.map((y) => (
                <button key={y} className={y === year ? "on" : ""} onClick={() => setYear(y)}>{y === "last" ? "Last 12 months" : y}</button>
              ))}
            </div>
            <div className="gh-acts">
              <button className={streakOn ? "on" : ""} onClick={() => setStreakOn((s) => !s)}>⚡ Longest streak</button>
              <button onClick={() => setWave((w) => w + 1)}>↻ Replay</button>
            </div>
          </div>

          {err ? (
            <p className="gh-empty">Couldn't load the contribution data. <a href={`https://github.com/${USER}`} target="_blank" rel="noreferrer">Open my GitHub ↗</a></p>
          ) : !days ? (
            <div className="gh-skel" />
          ) : (
            <div className="gh-scroll">
              <div className="gh-months" style={{ gridTemplateColumns: `repeat(${grid.cols}, 1fr)` }}>
                {grid.months.map((m) => <span key={m.c} style={{ gridColumn: m.c + 1 }}>{m.l}</span>)}
              </div>
              <div className="gh-body">
                <div className="gh-wk"><span>Mon</span><span>Wed</span><span>Fri</span></div>
                <div key={`${year}-${wave}`} className={`gh-grid ${streakOn ? "dim" : ""}`} style={{ gridTemplateColumns: `repeat(${grid.cols}, 1fr)` }}>
                  {grid.cells.map((d, k) => {
                    if (!d) return <i key={k} className="c nil" />;
                    const i = k - lead;
                    const inStreak = streakOn && S && i >= S.lStart && i <= S.lEnd;
                    return (
                      <i key={k} data-i={i} className={`c l${d.level} ${inStreak ? "st" : ""}`} style={{ animationDelay: `${(Math.floor(k / 7) * 9 + (k % 7) * 4)}ms` }} />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          <div className="gh-legend">
            <span>Less</span>{[0, 1, 2, 3, 4].map((l) => <i key={l} className={`c l${l}`} />)}<span>More</span>
            {S?.bestDay && <em>Busiest day: {fmt(S.bestDay)} · {S.best}</em>}
          </div>
        </div>

      </div>
      </div>

      <motion.div className="gh-pane gh-b" style={{ clipPath: clip }}>
      <div className="jc-wrap">
        <div className="gh-cols">
          <div>
            <h3 className="gh-h">Pinned repositories</h3>
            <div className="gh-repos">
              {shown === null && [0, 1, 2, 3].map((i) => <div key={i} className="gh-skel s" />)}
              {shown?.length === 0 && <p className="gh-empty">Couldn't load repositories. <a href={`https://github.com/${USER}?tab=repositories`} target="_blank" rel="noreferrer">See them on GitHub ↗</a></p>}
              {shown?.filter((r) => !lang || r.language === lang).slice(0, 6).map((r) => (
                <a key={r.name} href={r.html_url} target="_blank" rel="noreferrer" className="gh-repo" onPointerMove={(e) => {
                  const b = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--rx", `${-((e.clientY - b.top) / b.height - 0.5) * 10}deg`);
                  e.currentTarget.style.setProperty("--ry", `${((e.clientX - b.left) / b.width - 0.5) * 12}deg`);
                }} onPointerLeave={(e) => { e.currentTarget.style.setProperty("--rx", "0deg"); e.currentTarget.style.setProperty("--ry", "0deg"); }}>
                  <b>{r.name}</b>
                  <p>{r.description ?? "No description yet."}</p>
                  <div className="meta">
                    {r.language && <span><i style={{ background: LANG[r.language] ?? "#8b8b8b" }} />{r.language}</span>}
                    <span>★ {r.stargazers_count}</span>
                    <span>⑂ {r.forks_count}</span>
                    <span className="ago">{ago(r.pushed_at)}</span>
                  </div>
                </a>
              ))}
            </div>
            {langs.length > 0 && (
              <div className="gh-langs">
                <div className="bar">
                  {langs.map((x) => <i key={x.l} className={lang && lang !== x.l ? "off" : ""} style={{ width: `${x.p}%`, background: LANG[x.l] ?? "#8b8b8b" }} />)}
                </div>
                <div className="keys">
                  {langs.map((x) => (
                    <button key={x.l} className={lang === x.l ? "on" : ""} onClick={() => setLang((l) => (l === x.l ? null : x.l))}>
                      <i style={{ background: LANG[x.l] ?? "#8b8b8b" }} />{x.l} <small>{Math.round(x.p)}%</small>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <h3 className="gh-h">Pull requests to other projects</h3>
            <div className="gh-prs">
              {prs === null && <div className="gh-skel s" />}
              {prs?.length === 0 && (
                <div className="gh-nopr">
                  <b>None yet.</b>
                  <p>I haven't sent a pull request to someone else's project yet. That is on my list next, and this panel will fill in by itself when I do.</p>
                  <a href={`https://github.com/${USER}`} target="_blank" rel="noreferrer">Follow along on GitHub ↗</a>
                </div>
              )}
              {prs?.slice(0, 4).map((p) => {
                const merged = !!p.pull_request?.merged_at;
                const repo = p.repository_url.split("/").slice(-2).join("/");
                return (
                  <a key={p.id} href={p.html_url} target="_blank" rel="noreferrer" className="gh-pr">
                    <span className={`st ${merged ? "m" : p.state}`}>{merged ? "merged" : p.state}</span>
                    <b>{p.title}</b>
                    <small>{repo} · {ago(p.created_at.slice(0, 10))}</small>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      </motion.div>

      <motion.div className="gh-divider" style={{ left: divLeft }} aria-hidden>
        <span className="gh-knob">‹ ›</span>
      </motion.div>
      <motion.div className="gh-hint" style={{ opacity: hintOp }} aria-hidden>Scroll to see what I've shipped →</motion.div>
      </div>
    </section>
  );
}
