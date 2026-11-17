import { type MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { buildMe } from "./Me";

export const BAT_START = 0.04;
export const batSpan = (n: number) => 0.9 / n;
const T_HIT = 0.3625;
const T_END = 0.76;

const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * (3 - 2 * t);
const out = (t: number) => 1 - Math.pow(1 - t, 3);

/** Arm swing angle over one step: ready, wind up, swing through, follow through, reset. */
function theta(t: number) {
  if (t < 0.08) return 0.5;
  if (t < 0.3) return lerp(0.5, 1.0, ease((t - 0.08) / 0.22));
  if (t < 0.4) return lerp(1.0, -2.0, ease((t - 0.3) / 0.1));
  if (t < 0.55) return -2.0;
  return lerp(-2.0, 0.5, ease((t - 0.55) / 0.45));
}

type Pt = { x: number; y: number };

/** A 3D batter. Each step of the scroll is one pitch: the ball bounces in, he hits it, it flies to that step's card. */
export function Batter({ p, n, targets, kick }: { p: MotionValue<number>; n: number; targets: React.MutableRefObject<Pt[]>; kick: number }) {
  const mount = useRef<HTMLDivElement>(null);
  const kickRef = useRef(kick);
  const startFree = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (kick !== kickRef.current) {
      kickRef.current = kick;
      startFree.current?.();
    }
  }, [kick]);

  useEffect(() => {
    const el = mount.current!;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 80);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x4a4a55, 1.5));
    const key = new THREE.DirectionalLight(0xfff0d8, 2.4);
    key.position.set(3, 6, 8);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffd66b, 1.6);
    rim.position.set(-4, 3, -4);
    scene.add(rim);

    const d = new Uint8Array([70, 70, 70, 255, 150, 150, 150, 255, 255, 255, 255, 255]);
    const grad = new THREE.DataTexture(d, 3, 1, THREE.RGBAFormat);
    grad.minFilter = grad.magFilter = THREE.NearestFilter;
    grad.needsUpdate = true;
    const M = (c: number) => new THREE.MeshToonMaterial({ color: c, gradientMap: grad });
    const skin = M(0xf1bf99), hoodie = M(0xffd66b), hoodie2 = M(0xe6b83f), jeans = M(0x2f426f), hair = M(0x2a1b14), white = M(0xf4f1ea), dark = M(0x232323);

    const root = new THREE.Group();
    root.rotation.y = 1.25;
    scene.add(root);
    const sh = new THREE.Mesh(new THREE.CircleGeometry(0.95, 32), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.3, depthWrite: false }));
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
    const { torso, head, armL, armR } = me;
    head.rotation.y = -0.55;

    // the bat
    const batG = new THREE.Group();
    batG.position.set(0, -0.82, 0);
    armL.add(batG);
    const prof = [[0, 0], [0.045, 0], [0.04, 0.04], [0.028, 0.12], [0.03, 0.4], [0.05, 0.55], [0.072, 0.72], [0.078, 0.86], [0.062, 0.96], [0, 1.0]].map(([x, y]) => new THREE.Vector2(x, y));
    const bat = add(new THREE.LatheGeometry(prof, 20), M(0xd2a06a), batG, 0, 0.14, 0);
    bat.rotation.x = Math.PI;
    add(new THREE.CylinderGeometry(0.036, 0.036, 0.22, 12), dark, batG, 0, -0.04, 0);
    const hit = new THREE.Object3D();
    hit.position.set(0, -0.82, 0.22);
    batG.add(hit);

    // ball + trail + impact ring
    const ball = new THREE.Group();
    scene.add(ball);
    ball.add(new THREE.Mesh(new THREE.SphereGeometry(0.15, 24, 18), new THREE.MeshToonMaterial({ color: 0xd7f23c, gradientMap: grad })));
    for (const r of [0.5, -0.5]) {
      const seam = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.012, 6, 28, Math.PI), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      seam.rotation.y = r;
      ball.add(seam);
    }
    const trail: THREE.Mesh[] = [];
    for (let i = 0; i < 7; i++) {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffd66b, transparent: true, opacity: 0 }));
      scene.add(m);
      trail.push(m);
    }
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.28, 0.36, 40), new THREE.MeshBasicMaterial({ color: 0xffd66b, transparent: true, opacity: 0, side: THREE.DoubleSide }));
    scene.add(ring);

    // world <-> pixels (the camera looks straight at the z=0 plane)
    const g = { cw: 1, ch: 1, H: 1, Wd: 1, cy: 1 };
    const C = new THREE.Vector3();
    const place = () => {
      const w = el.clientWidth || 1, h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const dist = 12;
      const H = 2 * dist * Math.tan((30 * Math.PI) / 360);
      Object.assign(g, { cw: w, ch: h, H, Wd: H * (w / h), cy: 0.43 * H });
      camera.position.set(0, g.cy, dist);
      camera.lookAt(0, g.cy, 0);
      camera.updateProjectionMatrix();
      const bx = (Math.max(0.12, Math.min(0.2, 190 / w + 0.04)) - 0.5) * g.Wd;
      root.position.x = bx;
      sh.position.x = bx;
      armL.rotation.x = -1.05;
      me.sync();
      scene.updateMatrixWorld(true);
      hit.getWorldPosition(C);
    };
    place();
    me.onReady(() => {
      batG.position.set(0, -me.armLen, 0);
      place();
    });
    const ro = new ResizeObserver(place);
    ro.observe(el);

    const wx = (px: number) => (px / g.cw - 0.5) * g.Wd;
    const wy = (py: number) => g.cy + (0.5 - py / g.ch) * g.H;

    const ballAt = (t: number, tgt: Pt, free: boolean) => {
      if (t < 0 || t > T_END) return null;
      const R = { x: g.Wd / 2 + 0.7, y: C.y + 1.4 };
      if (t < T_HIT) {
        const a = t / T_HIT;
        const B = { x: lerp(R.x, C.x, 0.5), y: 0.16 };
        if (a < 0.55) {
          const u = a / 0.55;
          return { x: lerp(R.x, B.x, u), y: lerp(R.y, B.y, u * u), z: 0, fly: false };
        }
        const u = (a - 0.55) / 0.45;
        return { x: lerp(B.x, C.x, u), y: lerp(B.y, C.y, 1 - (1 - u) * (1 - u)), z: 0, fly: false };
      }
      const u = (t - T_HIT) / (T_END - T_HIT);
      const e = out(u);
      const T = free ? { x: g.Wd * 0.55, y: g.cy + g.H * 0.62 } : { x: wx(tgt.x), y: wy(tgt.y) };
      return { x: lerp(C.x, T.x, e), y: lerp(C.y, T.y, e) + Math.sin(Math.PI * u) * g.H * (free ? 0.05 : 0.16), z: Math.sin(Math.PI * u) * 1.4, fly: true };
    };

    let free = -1;
    startFree.current = () => {
      if (free < 0) free = 0;
    };

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    const clock = new THREE.Clock();
    let breathe = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      breathe += dt;
      const v = p.get();
      const span = batSpan(n);
      const k = (v - BAT_START) / span;
      let t = -1;
      let tgt: Pt = { x: 0, y: 0 };
      let isFree = false;
      if (free >= 0) {
        free += dt / 1.9;
        if (free >= 1) free = -1;
        else {
          t = free;
          isFree = true;
        }
      }
      if (!isFree && k >= 0 && k < n) {
        const i = Math.floor(k);
        t = k - i;
        tgt = targets.current[i] ?? { x: g.cw * 0.7, y: g.ch * 0.4 };
      }
      const th = t >= 0 ? theta(t) : k >= n ? 0.2 : 0.5;
      armL.rotation.x += (th - armL.rotation.x) * 0.6;
      armR.rotation.x += (th * 0.9 - armR.rotation.x) * 0.6;
      const tw = clamp((1 - armL.rotation.x) / 3, 0, 1);
      torso.rotation.y += (lerp(-0.4, 0.6, tw) - torso.rotation.y) * 0.5;
      body.position.y = Math.sin(breathe * 2.2) * 0.012 + (t > T_HIT && t < T_HIT + 0.12 ? Math.sin(((t - T_HIT) / 0.12) * Math.PI) * 0.1 : 0);

      const b = t >= 0 ? ballAt(t, tgt, isFree) : null;
      ball.visible = !!b;
      if (b) {
        ball.position.set(b.x, b.y, b.z);
        ball.rotation.x += 0.3;
        ball.rotation.z += 0.2;
      }
      trail.forEach((m, j) => {
        const tb = b && b.fly ? ballAt(t - (j + 1) * 0.014, tgt, isFree) : null;
        const mat = m.material as THREE.MeshBasicMaterial;
        if (tb && tb.fly) {
          m.position.set(tb.x, tb.y, tb.z);
          m.scale.setScalar(1 - j * 0.11);
          mat.opacity = 0.5 * (1 - j / 7);
        } else mat.opacity = 0;
      });
      const rm = ring.material as THREE.MeshBasicMaterial;
      if (t >= T_HIT && t < T_HIT + 0.11) {
        const u = (t - T_HIT) / 0.11;
        ring.position.copy(C);
        ring.position.z = 0.3;
        ring.scale.setScalar(0.4 + u * 2.2);
        rm.opacity = 0.9 * (1 - u);
      } else rm.opacity = 0;
      me.sync();
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      startFree.current = null;
      renderer.dispose();
      scene.traverse((o) => (o as THREE.Mesh).geometry?.dispose?.());
      el.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={mount} className="pr-canvas" />;
}
