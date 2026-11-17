import { type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { buildMe } from "./Me";

export const B_START = 0.06;
export const B_W = 0.2;
export const B_FLY0 = 0.3;

const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));
const ease = (t: number) => t * t * (3 - 2 * t);

/** Right-arm angle (radians about z) for scroll progress v; also returns whether a card is in hand and which. */
function throwPose(v: number, n: number) {
  const k = (v - B_START) / B_W;
  if (k < 0 || k >= n) return { a: 0, hold: -1, bump: 0 };
  const i = Math.floor(k);
  const t = k - i;
  let a: number;
  if (t < 0.12) a = -0.55 * ease(t / 0.12);
  else if (t < B_FLY0) a = -0.55 + 3.45 * ease((t - 0.12) / (B_FLY0 - 0.12));
  else a = 2.9 * (1 - ease((t - B_FLY0) / (1 - B_FLY0)));
  const bump = t > B_FLY0 - 0.04 && t < B_FLY0 + 0.16 ? Math.sin(((t - (B_FLY0 - 0.04)) / 0.2) * Math.PI) : 0;
  return { a, hold: t < B_FLY0 ? i : -1, bump };
}

function toonGradient() {
  const d = new Uint8Array([70, 70, 70, 255, 150, 150, 150, 255, 255, 255, 255, 255]);
  const tex = new THREE.DataTexture(d, 3, 1, THREE.RGBAFormat);
  tex.minFilter = tex.magFilter = THREE.NearestFilter;
  tex.needsUpdate = true;
  return tex;
}

export function Boy({ p, n, images = [], onRelease, mode = "throw", line }: { p: MotionValue<number>; n: number; images?: (string | undefined)[]; onRelease?: (pt: { x: number; y: number }) => void; mode?: "throw" | "walk"; line?: string | null }) {
  const mount = useRef<HTMLDivElement>(null);
  const [say, setSay] = useState<string | null>("Hi, I'm Ayush 👋");
  const sayRef = useRef<(s: string | null) => void>(() => {});
  sayRef.current = setSay;

  useEffect(() => {
    const el = mount.current!;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block;touch-action:none";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50);
    camera.position.set(0, 1.75, 8);
    camera.lookAt(0, 1.75, 0);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x4a4a55, 1.5));
    const key = new THREE.DirectionalLight(0xfff0d8, 2.4);
    key.position.set(3, 5, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffd66b, 1.6);
    rim.position.set(-4, 3, -4);
    scene.add(rim);

    const grad = toonGradient();
    const M = (c: number) => new THREE.MeshToonMaterial({ color: c, gradientMap: grad });
    const skin = M(0xf1bf99);
    const hoodie = M(0xffd66b);
    const hoodie2 = M(0xe6b83f);
    const jeans = M(0x2f426f);
    const hair = M(0x2a1b14);
    const white = M(0xf4f1ea);
    const dark = M(0x232323);

    const root = new THREE.Group();
    root.rotation.y = 0.38;
    root.position.x = -0.05;
    scene.add(root);

    // contact shadow
    const sh = new THREE.Mesh(
      new THREE.CircleGeometry(0.95, 32),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.35, depthWrite: false }),
    );
    sh.rotation.x = -Math.PI / 2;
    sh.position.y = 0.01;
    scene.add(sh);

    const body = new THREE.Group();
    root.add(body);

    const add = (g: THREE.BufferGeometry, m: THREE.Material, parent: THREE.Object3D, x = 0, y = 0, z = 0) => {
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(x, y, z);
      parent.add(mesh);
      return mesh;
    };

    const me = buildMe(grad, body);
    const { legs, torso, head, eyes, armL, armR } = me;
    const handR = new THREE.Object3D();
    handR.position.set(0, -me.armLen, 0);
    me.onReady(() => handR.position.set(0, -me.armLen, 0));
    armR.add(handR);

    // the card in his hand
    const cardMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const card = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.58, 0.04), [dark, dark, dark, dark, cardMat, dark]);
    card.position.set(0, -0.05, 0.12);
    card.rotation.set(0, 0.2, 0.1);
    handR.add(card);
    card.visible = false;
    const loader = new THREE.TextureLoader();
    const texs = images.map((src) => {
      if (!src) return null;
      const t = loader.load(src);
      t.colorSpace = THREE.SRGBColorSpace;
      return t;
    });
    let shown = -2;

    // sizing + where the card leaves his hand
    const size = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      armR.rotation.set(0, 0, 2.9);
      me.sync();
      scene.updateMatrixWorld(true);
      const v = new THREE.Vector3();
      handR.getWorldPosition(v);
      v.y += 0.35;
      v.project(camera);
      const r = renderer.domElement.getBoundingClientRect();
      onRelease?.({ x: r.left + (v.x * 0.5 + 0.5) * r.width, y: r.top + (-v.y * 0.5 + 0.5) * r.height });
    };
    size();
    me.onReady(size);
    const ro = new ResizeObserver(size);
    ro.observe(el);

    // interaction
    let nx = 0, ny = 0, hover = false, jump = -1;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      nx = clamp(((e.clientX - (r.left + r.width / 2)) / window.innerWidth) * 2.4, -1, 1);
      ny = clamp(((e.clientY - (r.top + r.height * 0.25)) / window.innerHeight) * 2.4, -1, 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    const cv = renderer.domElement;
    const enter = () => (hover = true);
    const leave = () => (hover = false);
    const click = () => {
      jump = 0;
      sayRef.current("Hey! Keep scrolling 😄");
      setTimeout(() => sayRef.current(null), 1800);
    };
    cv.addEventListener("pointerenter", enter);
    cv.addEventListener("pointerleave", leave);
    cv.addEventListener("click", click);
    cv.style.cursor = "pointer";

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(el);
    const clock = new THREE.Clock();
    let yaw = 0, pit = 0, lastPhase = "hi";
    let blink = 0;
    const walk = mode === "walk";
    let prevV = p.get(), amp = 0, face = 0.38, dirSign = 1, walkBob = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;
      const v = p.get();
      const tp = walk ? { a: 0, hold: -1, bump: 0 } : throwPose(v, n);

      // gaze: head and pupils follow the pointer
      yaw += (nx * 0.55 - yaw) * 0.12;
      pit += (ny * 0.3 - pit) * 0.12;
      head.rotation.y = yaw;
      head.rotation.x = pit;
      eyes.forEach((e) => e.pupil.position.set(clamp(nx, -1, 1) * 0.04, clamp(-ny, -1, 1) * 0.04, 0.04));
      blink -= dt;
      const bl = blink < 0 && blink > -0.12 ? 0.1 : 1;
      if (blink < -0.12) blink = 2 + Math.random() * 3;
      eyes.forEach((e) => (e.g.scale.y = bl));

      // breathing
      torso.scale.y = 1 + Math.sin(t * 2.2) * 0.012;
      head.position.y = 2.72 + Math.sin(t * 2.2) * 0.012;

      // arms
      const waveHi = !walk && v < B_START;
      const done = !walk && v > B_START + n * B_W - 0.02;
      if (walk) {
        const dv = v - prevV;
        prevV = v;
        amp += (clamp((Math.abs(dv) / Math.max(dt, 0.001)) * 60, 0, 1) - amp) * 0.12;
        if (Math.abs(dv) > 1e-5) dirSign = dv > 0 ? 1 : -1;
        const phase = v * n * 5 * Math.PI * 2;
        legs[0].rotation.x = Math.sin(phase) * 0.75 * amp;
        legs[1].rotation.x = -Math.sin(phase) * 0.75 * amp;
        face += ((amp > 0.12 ? 1.2 * dirSign : 0.38) - face) * 0.1;
        walkBob = Math.abs(Math.sin(phase)) * 0.09 * amp;
        armR.rotation.x = Math.sin(phase) * 0.6 * amp;
        if (!hover) armL.rotation.x = -Math.sin(phase) * 0.6 * amp;
      }
      if (waveHi || done || hover) {
        armL.rotation.z = -(2.5 + Math.sin(t * 9) * 0.3);
        armL.rotation.x = 0;
      } else {
        armL.rotation.z += (-0.12 - armL.rotation.z) * 0.15;
      }
      armR.rotation.z = tp.a;
      if (!walk) armR.rotation.x = tp.hold >= 0 ? -0.3 * Math.sin(clamp(tp.a, 0, 2.9) / 2.9 * Math.PI) : 0;

      // throw body language
      root.rotation.y = walk ? face : 0.38 + clamp(tp.a, 0, 2.9) * 0.05 - (tp.a < 0 ? tp.a * 0.1 : 0);
      torso.rotation.z = -tp.a * 0.05;
      let y = tp.bump * 0.12;
      if (jump >= 0) {
        jump += dt * 2.2;
        y += Math.sin(Math.min(jump, 1) * Math.PI) * 0.45;
        if (jump >= 1) jump = -1;
      }
      body.position.y = y + walkBob;
      sh.scale.setScalar(1 - y * 0.35);

      // card in hand
      if (tp.hold !== shown) {
        shown = tp.hold;
        card.visible = tp.hold >= 0;
        const tx = tp.hold >= 0 ? texs[tp.hold] : null;
        cardMat.map = tx;
        cardMat.color.set(tx ? 0xffffff : 0x888888);
        cardMat.needsUpdate = true;
      }
      card.scale.setScalar(tp.hold >= 0 ? clamp(tp.a + 0.55, 0.01, 1) : 0.01);

      const phase = waveHi ? "hi" : done ? "done" : "throw";
      if (!walk && phase !== lastPhase) {
        lastPhase = phase;
        sayRef.current(phase === "hi" ? "Hi, I'm Ayush 👋" : phase === "done" ? "That's the lot. Tap a card!" : null);
      }
      me.sync();
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerenter", enter);
      cv.removeEventListener("pointerleave", leave);
      cv.removeEventListener("click", click);
      renderer.dispose();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
      });
      el.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`jc-boy ${mode === "walk" ? "walk" : ""}`}>
      <div ref={mount} className="cv" />
      {(mode === "walk" ? line : say) && <div className="say" key={mode === "walk" ? line : say}>{mode === "walk" ? line : say}</div>}
    </div>
  );
}
