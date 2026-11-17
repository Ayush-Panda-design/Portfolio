import type { ReactNode } from "react";

const A = "var(--a)";

function Floor() {
  return (
    <g>
      <rect x="0" y="292" width="400" height="30" style={{ fill: "var(--p-floor2)" }} />
      <rect x="0" y="292" width="400" height="2" style={{ fill: "var(--p-line)" }} />
    </g>
  );
}
function Win({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" fill="#0f1220" stroke="rgba(255,255,255,.22)" strokeWidth="3" />
      <circle cx={x + w * 0.72} cy={y + h * 0.3} r="9" fill="#f3e6b8" opacity=".9" />
      {[0.15, 0.4, 0.55, 0.3, 0.85].map((f, i) => (
        <circle key={i} cx={x + w * f} cy={y + 10 + ((i * 17) % (h * 0.5))} r="1.3" fill="#fff" className="tw" style={{ animationDelay: `${i * 0.5}s` }} />
      ))}
      <path d={`M${x} ${y + h} V${y + h * 0.75} h${w * 0.2} v-${h * 0.1} h${w * 0.15} v${h * 0.18} h${w * 0.2} v-${h * 0.22} h${w * 0.18} v${h * 0.16} h${w * 0.27} V${y + h}Z`} fill="#181b2c" />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke="rgba(255,255,255,.18)" strokeWidth="2" />
    </g>
  );
}
function Lamp({ x, y }: { x: number; y: number }) {
  return (
    <g className="pr">
      <title>Desk lamp</title>
      <ellipse cx={x + 8} cy={y + 8} rx="46" ry="30" fill={A} opacity=".16" className="glow" />
      <path d={`M${x} ${y + 56} V${y + 24} L${x + 18} ${y}`} stroke="#8a8478" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d={`M${x + 8} ${y - 2} l22 6 l-6 14 z`} fill="#d9d2c2" />
      <rect x={x - 10} y={y + 54} width="22" height="5" rx="2" fill="#6f6a60" />
    </g>
  );
}
function Plant({ x, y }: { x: number; y: number }) {
  return (
    <g className="pr">
      <title>Plant</title>
      <path d={`M${x - 14} ${y} h28 l-4 28 h-20z`} fill="#6b4a33" />
      <g className="sway">
        <path d={`M${x} ${y} q-26 -14 -20 -42 q20 8 20 42z`} fill="#3f7d58" />
        <path d={`M${x} ${y} q22 -10 18 -38 q-18 8 -18 38z`} fill="#4c9a69" />
        <path d={`M${x} ${y} q-4 -22 4 -44 q8 22 -4 44z`} fill="#58b07a" />
      </g>
    </g>
  );
}
function Mon({ x, y, w, h, children, label = "Monitor" }: { x: number; y: number; w: number; h: number; children?: ReactNode; label?: string }) {
  return (
    <g className="pr">
      <title>{label}</title>
      <rect x={x} y={y} width={w} height={h} rx="8" fill="#0d0d0d" stroke="rgba(255,255,255,.25)" strokeWidth="3" />
      <rect x={x + 5} y={y + 5} width={w - 10} height={h - 10} rx="4" fill="#12161c" />
      {children}
      <rect x={x + w / 2 - 6} y={y + h} width="12" height="14" fill="#2c2c2c" />
      <rect x={x + w / 2 - 26} y={y + h + 12} width="52" height="5" rx="2" fill="#3a3a3a" />
    </g>
  );
}
function Code({ x, y, w, rows }: { x: number; y: number; w: number; rows: number }) {
  return (
    <g>
      {Array.from({ length: rows }).map((_, i) => (
        <rect key={i} x={x + (i % 3) * 8} y={y + i * 11} height="4" rx="2" width={w * (0.35 + ((i * 37) % 55) / 100)} fill={i % 2 ? A : "rgba(255,255,255,.5)"} opacity=".8" className="ln" style={{ animationDelay: `${i * 0.25}s` }} />
      ))}
    </g>
  );
}
function Desk({ x, w }: { x: number; w: number }) {
  return (
    <g>
      <rect x={x} y="262" width={w} height="9" rx="3" fill="#4a4237" />
      <rect x={x + 10} y="271" width="7" height="21" fill="#3a342c" />
      <rect x={x + w - 17} y="271" width="7" height="21" fill="#3a342c" />
    </g>
  );
}
function Rack({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const units = Math.floor((h - 12) / 26);
  return (
    <g className="pr">
      <title>Server rack</title>
      <rect x={x} y={y} width={w} height={h} rx="6" fill="#1b1f1d" stroke="rgba(255,255,255,.22)" strokeWidth="2.5" />
      {Array.from({ length: units }).map((_, i) => (
        <g key={i}>
          <rect x={x + 8} y={y + 8 + i * 26} width={w - 16} height="20" rx="3" fill="#262c29" />
          <circle cx={x + 18} cy={y + 18 + i * 26} r="3" fill={A} className="blink" style={{ animationDelay: `${i * 0.37}s` }} />
          <circle cx={x + 30} cy={y + 18 + i * 26} r="3" fill="#ffb534" className="blink" style={{ animationDelay: `${i * 0.5 + 0.2}s` }} />
          <rect x={x + w - 36} y={y + 15 + i * 26} width="20" height="6" rx="2" fill="rgba(255,255,255,.12)" />
        </g>
      ))}
    </g>
  );
}
function Iso({ x, y, s, c, label }: { x: number; y: number; s: number; c: string; label?: string }) {
  const h = s * 0.5;
  return (
    <g className="pr">
      <title>{label ?? "Block"}</title>
      <polygon points={`${x},${y - s} ${x + s},${y - s + h} ${x},${y - s + 2 * h} ${x - s},${y - s + h}`} fill={c} />
      <polygon points={`${x - s},${y - s + h} ${x},${y - s + 2 * h} ${x},${y + h} ${x - s},${y}`} fill={c} opacity=".62" />
      <polygon points={`${x + s},${y - s + h} ${x},${y - s + 2 * h} ${x},${y + h} ${x + s},${y}`} fill={c} opacity=".82" />
      {label && <text x={x} y={y - s + h + 5} textAnchor="middle" fontSize={s * 0.42} fontWeight="900" fill="#161616" fontFamily="Unbounded,sans-serif">{label}</text>}
    </g>
  );
}

function Net() {
  const cable = "M150 272 C 195 272, 205 252, 248 248";
  return (
    <>
      <Win x={238} y={34} w={120} h={92} />
      <text x="40" y="84" fontSize="40" fontWeight="900" fill={A} opacity=".9" fontFamily="Unbounded,sans-serif">www</text>
      <g className="pr">
        <title>Router</title>
        {[62, 96, 130].map((x, i) => (
          <g key={x}>
            <line x1={x} y1="252" x2={x} y2={206 - (i % 2) * 10} stroke="#8a8478" strokeWidth="4" strokeLinecap="round" />
            <circle cx={x} cy={206 - (i % 2) * 10} r="7" fill="none" stroke={A} strokeWidth="2" className="pulse" style={{ animationDelay: `${i * 0.5}s` }} />
          </g>
        ))}
        <rect x="40" y="252" width="116" height="36" rx="8" fill="#2d2d2d" stroke="rgba(255,255,255,.25)" strokeWidth="2" />
        {[58, 74, 90, 106].map((x, i) => <circle key={x} cx={x} cy="270" r="3.5" fill={A} className="blink" style={{ animationDelay: `${i * 0.3}s` }} />)}
      </g>
      <g className="pr">
        <title>DNS: names to addresses</title>
        <circle cx="300" cy="244" r="44" fill="#0f1a2b" stroke={A} strokeWidth="3" />
        <g className="spin"><ellipse cx="300" cy="244" rx="18" ry="44" fill="none" stroke={A} opacity=".6" /><ellipse cx="300" cy="244" rx="40" ry="44" fill="none" stroke={A} opacity=".35" /></g>
        <line x1="256" y1="244" x2="344" y2="244" stroke={A} opacity=".5" />
        <text x="300" y="249" textAnchor="middle" fontSize="15" fontWeight="900" fill="#fff" fontFamily="Unbounded,sans-serif">DNS</text>
      </g>
      <path d={cable} fill="none" stroke={A} strokeWidth="2" className="dash" />
      <circle r="4.5" fill="#fff"><animateMotion dur="2.4s" repeatCount="indefinite" path={cable} /></circle>
      <Floor />
    </>
  );
}
function Tools() {
  return (
    <>
      <Desk x={24} w={250} />
      <Mon x={44} y={132} w={160} h={104} label="Terminal">
        <text x="56" y="162" fontSize="10.5" fill="#9fe8b5" fontFamily="monospace">$ git add .</text>
        <text x="56" y="180" fontSize="10.5" fill="#fff" fontFamily="monospace">$ git commit -m "ship"</text>
        <text x="56" y="198" fontSize="10.5" fill={A} fontFamily="monospace">✓ pushed to main</text>
        <rect x="56" y="206" width="7" height="12" fill="#fff" className="blink" />
      </Mon>
      <g className="pr">
        <title>Git history</title>
        <path d="M318 70 V150 M318 110 C 340 110, 350 100, 350 90 M318 150 C 336 150, 350 140, 350 128" fill="none" stroke={A} strokeWidth="3" />
        {[[318, 70], [318, 110], [350, 90], [318, 150], [350, 128]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="7" fill="#161616" stroke={A} strokeWidth="3" className={i === 4 ? "pulse" : ""} />)}
      </g>
      <g className="pr">
        <title>Toolbox</title>
        <rect x="298" y="246" width="86" height="46" rx="7" fill={A} />
        <path d="M322 246 v-12 h38 v12" fill="none" stroke="#8a8478" strokeWidth="5" />
        <rect x="298" y="262" width="86" height="5" fill="#161616" opacity=".35" />
        <rect x="336" y="258" width="10" height="14" rx="2" fill="#161616" />
      </g>
      <Lamp x={232} y={208} />
      <Floor />
    </>
  );
}
function Blocks() {
  return (
    <>
      <g className="pr float">
        <title>Box model</title>
        <rect x="236" y="50" width="136" height="112" rx="6" fill="none" stroke={A} strokeDasharray="5 4" />
        <rect x="250" y="62" width="108" height="88" fill="rgba(255,255,255,.05)" stroke="#ffb534" />
        <rect x="264" y="74" width="80" height="64" fill="rgba(255,255,255,.07)" stroke="#34d399" />
        <rect x="280" y="88" width="48" height="36" fill={A} opacity=".85" />
        <text x="304" y="110" textAnchor="middle" fontSize="9" fontWeight="800" fill="#161616">content</text>
      </g>
      <Iso x={90} y={292} s={44} c="#ff7a59" label="<>" />
      <Iso x={178} y={292} s={44} c="#ffd66b" label="{}" />
      <Iso x={134} y={256} s={44} c="#4c9bff" label="#" />
      <g className="pr">
        <title>Palette</title>
        <ellipse cx="320" cy="272" rx="36" ry="18" fill="#5a4a39" />
        {["#ff7a59", "#ffd66b", "#4c9bff", "#34d399", "#a78bfa"].map((c, i) => <circle key={c} cx={298 + i * 11} cy={266 + (i % 2) * 6} r="5" fill={c} className="float" style={{ animationDelay: `${i * 0.3}s` }} />)}
      </g>
      <Floor />
    </>
  );
}
function Browser() {
  const p = "M70 120 C 120 110, 160 170, 214 196";
  return (
    <>
      <g className="pr">
        <title>Browser</title>
        <rect x="34" y="56" width="268" height="200" rx="10" fill="#101216" stroke="rgba(255,255,255,.25)" strokeWidth="3" />
        <rect x="34" y="56" width="268" height="26" rx="10" fill="#1d2026" />
        {[0, 1, 2].map((i) => <circle key={i} cx={50 + i * 13} cy="69" r="3.6" fill={["#ff5f57", "#febc2e", "#28c840"][i]} />)}
        <rect x="100" y="62" width="180" height="14" rx="7" fill="rgba(255,255,255,.08)" />
        <rect x="52" y="100" width="150" height="14" rx="3" fill="rgba(255,255,255,.7)" />
        <rect x="52" y="124" width="110" height="7" rx="3" fill="rgba(255,255,255,.25)" />
        <rect x="52" y="138" width="130" height="7" rx="3" fill="rgba(255,255,255,.25)" />
        <rect x="52" y="176" width="92" height="30" rx="15" fill={A} />
        <text x="98" y="196" textAnchor="middle" fontSize="11" fontWeight="800" fill="#161616">click me</text>
        <circle cx="98" cy="191" r="20" fill="none" stroke={A} strokeWidth="2" className="pulse" />
        {[0, 1, 2].map((i) => <rect key={i} x={208 + i * 0} y={100 + i * 50} width="80" height="38" rx="6" fill="rgba(255,255,255,.06)" />)}
      </g>
      <path d="M0 0 L0 18 L5 14 L9 22 L12 21 L8 13 L15 13 Z" fill="#fff" stroke="#161616" strokeWidth="1"><animateMotion dur="3.6s" repeatCount="indefinite" path={p} keyPoints="0;1;1;0" keyTimes="0;.45;.6;1" calcMode="linear" /></path>
      <Plant x={350} y={262} />
      <Floor />
    </>
  );
}
function Ts() {
  return (
    <>
      <Desk x={30} w={260} />
      <Mon x={48} y={112} w={220} h={124} label="TypeScript">
        <text x="60" y="140" fontSize="11" fill={A} fontFamily="monospace">let</text>
        <text x="80" y="140" fontSize="11" fill="#fff" fontFamily="monospace">n: number = 1</text>
        <text x="60" y="162" fontSize="11" fill="#fff" fontFamily="monospace">n = "hello"</text>
        <path d="M60 166 q4 -4 8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0" fill="none" stroke="#ff4d6d" strokeWidth="1.5" className="ln" />
        <text x="60" y="190" fontSize="10" fill="#ff8aa0" fontFamily="monospace">✗ string is not number</text>
        <text x="60" y="212" fontSize="10" fill="#9fe8b5" fontFamily="monospace" className="blink">✓ caught before runtime</text>
      </Mon>
      <g className="pr float">
        <title>Type safety</title>
        <path d="M330 150 l44 12 v38 q0 30 -44 46 q-44 -16 -44 -46 v-38z" fill="#0f2b3a" stroke={A} strokeWidth="3" />
        <text x="330" y="220" textAnchor="middle" fontSize="26" fontWeight="900" fill={A} fontFamily="Unbounded,sans-serif">TS</text>
      </g>
      <Lamp x={248} y={206} />
      <Floor />
    </>
  );
}
function Backend() {
  return (
    <>
      <Rack x={34} y={104} w={92} h={188} />
      <Rack x={140} y={104} w={92} h={188} />
      <path d="M232 262 C 262 262, 262 270, 292 270" stroke={A} strokeWidth="2" fill="none" className="dash" />
      <g className="pr">
        <title>Database</title>
        <ellipse cx="324" cy="214" rx="42" ry="12" fill={A} opacity=".85" />
        <rect x="282" y="214" width="84" height="64" fill="#2a3a33" />
        <ellipse cx="324" cy="246" rx="42" ry="12" fill="none" stroke={A} />
        <ellipse cx="324" cy="278" rx="42" ry="12" fill="#2a3a33" stroke={A} />
        <ellipse cx="324" cy="214" rx="42" ry="12" fill="#3d5a4b" stroke={A} />
      </g>
      <g className="pr float">
        <title>Node.js</title>
        <polygon points="324,60 356,78 356,114 324,132 292,114 292,78" fill="#1c2a22" stroke={A} strokeWidth="3" />
        <text x="324" y="104" textAnchor="middle" fontSize="22" fontWeight="900" fill={A} fontFamily="Unbounded,sans-serif">JS</text>
      </g>
      <Floor />
    </>
  );
}
function ReactScene() {
  return (
    <>
      <g className="pr">
        <title>React</title>
        <g className="spin slow">
          {[0, 60, 120].map((r) => <ellipse key={r} cx="130" cy="170" rx="82" ry="30" fill="none" stroke={A} strokeWidth="3" transform={`rotate(${r} 130 170)`} />)}
        </g>
        <circle cx="130" cy="170" r="13" fill={A} />
      </g>
      <g className="pr">
        <title>Component tree</title>
        <path d="M312 70 V92 M312 92 H276 V116 M312 92 H348 V116 M276 142 V158 H252 V176 M276 158 H300 V176 M348 142 V176" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
        {[[312, 60], [276, 130], [348, 130], [252, 188], [300, 188], [348, 188]].map(([x, y], i) => <rect key={i} x={x - 18} y={y - 14} width="36" height="28" rx="6" fill={i === 0 ? A : "#1f2a2e"} stroke={A} className={i === 3 ? "blink" : ""} />)}
      </g>
      <Plant x={360} y={264} />
      <Floor />
    </>
  );
}
function Next() {
  const layers = [
    { y: 96, c: "#e5e7eb", t: "UI" },
    { y: 150, c: "#a78bfa", t: "API" },
    { y: 204, c: "#34d399", t: "DB" },
  ];
  return (
    <>
      <Win x={260} y={40} w={110} h={84} />
      {layers.map((l, i) => (
        <g key={l.t} className="pr float" style={{ animationDelay: `${i * 0.5}s` }}>
          <title>{l.t}</title>
          <polygon points={`130,${l.y - 22} 220,${l.y} 130,${l.y + 22} 40,${l.y}`} fill={l.c} opacity=".92" />
          <polygon points={`40,${l.y} 130,${l.y + 22} 130,${l.y + 36} 40,${l.y + 14}`} fill={l.c} opacity=".5" />
          <polygon points={`220,${l.y} 130,${l.y + 22} 130,${l.y + 36} 220,${l.y + 14}`} fill={l.c} opacity=".7" />
          <text x="130" y={l.y + 6} textAnchor="middle" fontSize="15" fontWeight="900" fill="#161616" fontFamily="Unbounded,sans-serif">{l.t}</text>
        </g>
      ))}
      <path d="M130 120 V140 M130 174 V194" stroke="#fff" strokeWidth="2" className="dash" />
      <circle cx="318" cy="210" r="34" fill="#161616" stroke="#e5e7eb" strokeWidth="3" className="pr" />
      <text x="318" y="222" textAnchor="middle" fontSize="34" fontWeight="900" fill="#e5e7eb" fontFamily="Unbounded,sans-serif">N</text>
      <Floor />
    </>
  );
}
function Ai() {
  const L = [[70, 120, 150, 210], [150, 90, 130, 170, 250], [230, 120, 150, 210]];
  const cols = [60, 140, 220];
  return (
    <>
      <g className="pr">
        <title>Neural network</title>
        {cols.slice(0, 2).flatMap((cx, ci) => L[ci].flatMap((_, a) => L[ci + 1].map((__, b) => <line key={`${ci}-${a}-${b}`} x1={cx} y1={[[120, 150, 210], [90, 130, 170, 250]][ci][a]} x2={cols[ci + 1]} y2={[[90, 130, 170, 250], [120, 150, 210]][ci][b]} stroke={A} strokeOpacity=".28" />)))}
        {[[120, 150, 210], [90, 130, 170, 250], [120, 150, 210]].flatMap((ys, ci) => ys.map((y, i) => <circle key={`${ci}-${i}`} cx={cols[ci]} cy={y} r="9" fill="#1b1730" stroke={A} strokeWidth="2.5" className="pulse2" style={{ animationDelay: `${(ci * 3 + i) * 0.25}s` }} />))}
      </g>
      <Desk x={236} w={150} />
      <g className="pr">
        <title>Agent</title>
        <line x1="312" y1="190" x2="312" y2="206" stroke="#8a8478" strokeWidth="3" />
        <circle cx="312" cy="186" r="5" fill={A} className="blink" />
        <rect x="280" y="208" width="64" height="52" rx="14" fill="#2b2540" stroke={A} strokeWidth="2.5" />
        <circle cx="300" cy="232" r="6" fill={A} className="eye" /><circle cx="324" cy="232" r="6" fill={A} className="eye" />
        <rect x="302" y="246" width="20" height="3" rx="1.5" fill={A} opacity=".8" />
      </g>
      <g className="float"><rect x="330" y="140" width="56" height="28" rx="10" fill="rgba(255,255,255,.9)" /><path d="M342 168 l-4 10 l14 -10z" fill="rgba(255,255,255,.9)" /><text x="358" y="158" textAnchor="middle" fontSize="11" fontWeight="800" fill="#161616">hi 👋</text></g>
      <Floor />
    </>
  );
}
function Devops() {
  const cols = ["#f472b6", "#38bdf8", "#ffd66b", "#34d399", "#a78bfa", "#ff7a59"];
  return (
    <>
      <g className="pr float">
        <title>Cloud</title>
        <path d="M262 88 q-30 0 -30 -24 q0 -22 26 -22 q8 -26 40 -22 q30 4 32 30 q26 2 26 22 q0 16 -22 16z" fill="#1d2330" stroke={A} strokeWidth="3" />
        <path d="M312 78 v-20 M302 66 l10 -10 l10 10" fill="none" stroke={A} strokeWidth="3" strokeLinecap="round" />
      </g>
      <g className="pr">
        <title>Containers</title>
        <rect x="30" y="256" width="230" height="14" rx="5" fill="#3a342c" />
        {cols.map((c, i) => <rect key={c} x={44 + (i % 3) * 70} y={i < 3 ? 214 : 172} width="62" height="40" rx="4" fill={c} opacity=".92" className="float" style={{ animationDelay: `${i * 0.35}s` }} />)}
        {cols.map((c, i) => <rect key={`${c}2`} x={50 + (i % 3) * 70} y={(i < 3 ? 214 : 172) + 8} width="50" height="4" fill="#161616" opacity=".3" />)}
      </g>
      <g className="pr">
        <title>Load balancer</title>
        <circle cx="330" cy="170" r="22" fill="#2a1d2b" stroke={A} strokeWidth="3" />
        <path d="M320 170 h20 M330 160 v20" stroke={A} strokeWidth="3" className="spin" />
        {[218, 246, 274].map((y, i) => <g key={y}><line x1="330" y1="192" x2={300 + i * 30} y2={y - 2} stroke={A} strokeDasharray="4 4" className="dash" /><rect x={288 + i * 30} y={y} width="24" height="16" rx="3" fill="#262626" stroke={A} /></g>)}
      </g>
      <Floor />
    </>
  );
}
function Prod() {
  return (
    <>
      {[[36, 70, -6], [96, 52, 4], [156, 74, -3]].map(([x, y, r], i) => (
        <g key={i} className="pr float" style={{ animationDelay: `${i * 0.4}s` }} transform={`rotate(${r} ${x} ${y})`}>
          <rect x={x} y={y} width="52" height="38" rx="4" fill="#fff" opacity=".92" />
          <rect x={x + 6} y={y + 8} width="30" height="5" rx="2" fill={A} />
          <rect x={x + 6} y={y + 18} width="38" height="4" rx="2" fill="#ccc" />
          <circle cx={x + 26} cy={y - 1} r="3" fill="#ff4d6d" />
        </g>
      ))}
      <g className="pr rocket">
        <title>Launch</title>
        <path d="M300 130 q26 -40 52 0 v62 h-52z" fill="#f5f2ea" stroke="rgba(255,255,255,.4)" />
        <path d="M300 130 q26 -40 52 0z" fill={A} />
        <circle cx="326" cy="156" r="9" fill="#12161c" stroke={A} strokeWidth="3" />
        <path d="M300 170 l-18 30 l18 -6z M352 170 l18 30 l-18 -6z" fill={A} />
        <path d="M312 192 q14 40 28 0z" fill="#ffb534" className="flame" />
      </g>
      <g className="pr">
        <title>Trophy</title>
        <path d="M120 232 h50 v30 q0 18 -25 18 q-25 0 -25 -18z" fill="#ffd66b" />
        <rect x="136" y="278" width="18" height="10" fill="#d4a63a" /><rect x="124" y="286" width="42" height="6" rx="2" fill="#b58a28" />
        <path d="M120 238 q-18 0 -14 18 q4 12 18 10 M170 238 q18 0 14 18 q-4 12 -18 10" fill="none" stroke="#ffd66b" strokeWidth="4" />
      </g>
      <rect x="260" y="282" width="140" height="10" fill="#3a3a3a" />
      <Floor />
    </>
  );
}

const SCENES: Record<string, () => ReactNode> = { net: Net, tools: Tools, blocks: Blocks, browser: Browser, ts: Ts, backend: Backend, react: ReactScene, next: Next, ai: Ai, devops: Devops, prod: Prod };

export function Scene({ id }: { id: string }) {
  const C = SCENES[id];
  return (
    <svg viewBox="0 0 400 320" preserveAspectRatio="xMidYMax meet" className="jr-svg" aria-hidden>
      {C && <C />}
    </svg>
  );
}
