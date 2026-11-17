import { useEffect, useRef } from "react";
import * as THREE from "three";
import { buildMe, toonGradient } from "./Me";

export type Mood = "idle" | "happy" | "sleepy";

/** A small 3D Ayush: looks at your pointer, breathes, waves when happy, nods off when sleepy. */
export function MeBuddy({ mood = "idle", className = "", back = false, walkRef }: { mood?: Mood; className?: string; back?: boolean; walkRef?: { current: number } }) {
  const mount = useRef<HTMLDivElement>(null);
  const moodRef = useRef<Mood>(mood);
  moodRef.current = mood;
  const backRef = useRef(back);
  backRef.current = back;

  useEffect(() => {
    const el = mount.current!;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50);
    camera.position.set(0, 1.85, 9);
    camera.lookAt(0, 1.85, 0);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x4a4a55, 1.5));
    const key = new THREE.DirectionalLight(0xfff0d8, 2.4);
    key.position.set(3, 5, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffd66b, 1.4);
    rim.position.set(-4, 3, -4);
    scene.add(rim);
    const grad = toonGradient();
    const root = new THREE.Group();
    root.rotation.y = 0.3;
    scene.add(root);
    const sh = new THREE.Mesh(new THREE.CircleGeometry(0.95, 32), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.3, depthWrite: false }));
    sh.rotation.x = -Math.PI / 2;
    sh.position.y = 0.01;
    scene.add(sh);
    const body = new THREE.Group();
    root.add(body);
    const me = buildMe(grad, body);

    const size = () => {
      const w = el.clientWidth || 1, h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(el);

    let nx = 0, ny = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      nx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / 500));
      ny = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height * 0.3)) / 400));
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    const clock = new THREE.Clock();
    let raf = 0, t = 0, blink = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      t += Math.min(clock.getDelta(), 0.05);
      const m = moodRef.current;
      if (backRef.current) {
        const w = walkRef ? walkRef.current : 1;
        root.rotation.y += (Math.PI + Math.sin(t * 2.4) * 0.05 - root.rotation.y) * 0.1;
        me.head.rotation.y += (Math.sin(t * 0.9) * 0.15 - me.head.rotation.y) * 0.1;
        me.head.rotation.x += (-0.12 - me.head.rotation.x) * 0.1;
        me.legs.forEach((l, i) => (l.rotation.x = Math.sin(t * 6 + i * Math.PI) * 0.55 * w));
        me.armL.rotation.z += (-0.12 - me.armL.rotation.z) * 0.12;
        me.armR.rotation.z += (0.12 - me.armR.rotation.z) * 0.12;
        me.armL.rotation.x = Math.sin(t * 6) * 0.4 * w;
        me.armR.rotation.x = -Math.sin(t * 6) * 0.4 * w;
        body.position.y = Math.abs(Math.sin(t * 6)) * 0.05 * w;
        me.sync();
        renderer.render(scene, camera);
        return;
      }
      const yaw = m === "sleepy" ? 0 : nx * 0.7, pit = m === "sleepy" ? 0.35 : ny * 0.35;
      me.head.rotation.y += (yaw - me.head.rotation.y) * 0.12;
      me.head.rotation.x += (pit - me.head.rotation.x) * 0.12;
      root.rotation.y += (0.3 + nx * 0.25 - root.rotation.y) * 0.06;
      me.eyes.forEach((e) => e.pupil.position.set(nx * 0.04, -ny * 0.04, 0.04));
      blink = (t % 4) > 3.85 || m === "sleepy" ? 0.1 : 1;
      me.eyes.forEach((e) => (e.g.scale.y += (blink - e.g.scale.y) * 0.5));
      me.torso.scale.y = 1 + Math.sin(t * 2.2) * 0.012;
      if (m === "happy") {
        me.armR.rotation.z += (2.5 + Math.sin(t * 9) * 0.3 - me.armR.rotation.z) * 0.2;
        body.position.y = Math.abs(Math.sin(t * 4.5)) * 0.06;
      } else {
        me.armR.rotation.z += (0.12 - me.armR.rotation.z) * 0.12;
        body.position.y = 0;
      }
      me.armL.rotation.z += (-0.12 - me.armL.rotation.z) * 0.12;
      me.sync();
      renderer.render(scene, camera);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      renderer.dispose();
      scene.traverse((o) => (o as THREE.Mesh).geometry?.dispose?.());
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mount} className={"me-buddy " + className} />;
}
