import { motion } from "framer-motion";
import { useRef } from "react";
import { SecHead } from "./lib";

const POSTS = [
  { t: "Setting Up Your First Node.js Application Step-by-Step", tag: "Node.js", url: "https://stngndjs.hashnode.dev/setting-up-your-first-node-js-application-step-by-step", c: "#FFE08A", x: "4%", y: "8%", r: -4 },
  { t: "JWT Authentication in Node.js Explained Simply", tag: "Security", url: "https://jwtauthndjs.hashnode.dev/jwt-authentication-in-node-js-explained-simply", c: "#A8EBDD", x: "62%", y: "6%", r: 3 },
  { t: "Understanding Callback Functions in JavaScript", tag: "JavaScript", url: "https://cbijs.hashnode.dev/understanding-callback-functions-in-javascript-a-complete-beginner-guide/", c: "#FFC2D9", x: "6%", y: "58%", r: 2 },
  { t: "Sessions vs JWT vs Cookies: Authentication Approaches", tag: "Architecture", url: "https://sesca.hashnode.dev/sessions-vs-jwt-vs-cookies-understanding-authentication-approaches", c: "#D9CCFF", x: "66%", y: "60%", r: -3 },
];

export function Desk() {
  const board = useRef<HTMLDivElement>(null);
  const dragged = useRef(false);

  return (
    <section id="life" data-scene="cafe" className="jc-sec">
      <div className="jc-wrap">
        <SecHead label="On the desk" title="Notes from the build." variant="scramble" sub="Things I wrote while learning. It's my board, but go ahead, move things around." />

        <div className="jc-board" ref={board}>
          {POSTS.map((p, i) => (
            <motion.div
              key={p.url}
              className="jc-note"
              style={{ left: p.x, top: p.y, background: p.c, rotate: p.r }}
              drag
              dragConstraints={board}
              dragMomentum={false}
              whileDrag={{ scale: 1.08, rotate: 0, zIndex: 20 }}
              whileHover={{ scale: 1.04 }}
              initial={{ opacity: 0, y: -60, rotate: p.r * 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: p.r }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ type: "spring", stiffness: 160, damping: 14, delay: i * 0.12 }}
              onDragStart={() => (dragged.current = true)}
              onDragEnd={() => setTimeout(() => (dragged.current = false), 0)}
            >
              {p.t}
              <small>{p.tag}</small>
              <a href={p.url} target="_blank" rel="noreferrer" onClick={(e) => dragged.current && e.preventDefault()}>read it ↗</a>
            </motion.div>
          ))}

          <motion.div
            className="jc-pass"
            style={{ left: "22%", top: "34%", rotate: -5 }}
            drag
            dragConstraints={board}
            dragMomentum={false}
            whileDrag={{ scale: 1.05, rotate: 0, zIndex: 20 }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.5 }}
          >
            <div className="main">
              <div className="top"><span>BOARDING PASS</span><span>VSSUT EXPRESS</span></div>
              <div className="route">
                <div><b>BLA</b><em>Burla</em></div>
                <span style={{ fontSize: 22 }}>✈</span>
                <div style={{ textAlign: "right" }}><b>YOU</b><em>your team</em></div>
              </div>
              <div className="meta">
                <span>Passenger<b>Ayush Panda</b></span>
                <span>Seat<b>5A</b></span>
                <span>Class<b>B.Tech CSE</b></span>
              </div>
            </div>
            <div className="stub"><div className="bars">{Array.from({ length: 14 }, (_, k) => <i key={k} style={{ width: 1 + (k % 3) }} />)}</div></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
