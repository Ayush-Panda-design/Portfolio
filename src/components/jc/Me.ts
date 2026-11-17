import * as THREE from "three";
import { attachAvatar, type MeRig } from "./Avatar";

/** Shared toon gradient (3 steps). */
export function toonGradient() {
  const d = new Uint8Array([70, 70, 70, 255, 150, 150, 150, 255, 255, 255, 255, 255]);
  const tex = new THREE.DataTexture(d, 3, 1, THREE.RGBAFormat);
  tex.minFilter = tex.magFilter = THREE.NearestFilter;
  tex.needsUpdate = true;
  return tex;
}

/**
 * A stylised 3D likeness of Ayush: curly dark hair, light stubble, maroon bomber jacket with cream trim,
 * khaki cargo pants, off-white sneakers and a silver watch. Parts are added to `body`; returns the pivots.
 */
export function buildMe(grad: THREE.Texture, body: THREE.Object3D) {
  const M = (c: number) => new THREE.MeshToonMaterial({ color: c, gradientMap: grad });
  const skin = M(0xb98159), skinD = M(0xa46f4b);
  const jacket = M(0x6d1f2b), jacketD = M(0x571823), cream = M(0xeadfc6), tee = M(0x1b1b1d);
  const khaki = M(0xcdad7c), khakiD = M(0xb99863);
  const hair = M(0x17100d), shoe = M(0xece6da), sole = M(0xc9c1b2);
  const add = (g: THREE.BufferGeometry, m: THREE.Material, parent: THREE.Object3D, x = 0, y = 0, z = 0) => {
    const mesh = new THREE.Mesh(g, m);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };

  // legs: khaki cargos + sneakers
  const legs: THREE.Group[] = [];
  for (const s of [-1, 1]) {
    const lg = new THREE.Group();
    lg.position.set(s * 0.22, 1.1, 0);
    body.add(lg);
    add(new THREE.CapsuleGeometry(0.165, 0.62, 6, 14), khaki, lg, 0, -0.48, 0);
    const pk = add(new THREE.BoxGeometry(0.1, 0.3, 0.26), khakiD, lg, s * 0.155, -0.42, 0.02);
    pk.rotation.z = s * 0.05;
    add(new THREE.BoxGeometry(0.11, 0.05, 0.27), khaki, lg, s * 0.155, -0.28, 0.02);
    add(new THREE.SphereGeometry(0.24, 20, 14), shoe, lg, 0, -0.95, 0.1).scale.set(0.95, 0.6, 1.5);
    add(new THREE.SphereGeometry(0.24, 20, 14), sole, lg, 0, -1.03, 0.1).scale.set(1, 0.3, 1.55);
    add(new THREE.BoxGeometry(0.3, 0.04, 0.22), cream, lg, 0, -0.86, 0.26);
    legs.push(lg);
  }

  // torso: bomber jacket
  const torso = new THREE.Group();
  torso.position.y = 1.35;
  body.add(torso);
  add(new THREE.CapsuleGeometry(0.45, 0.45, 8, 20), jacket, torso, 0, 0.2, 0).scale.set(1.05, 1, 0.82);
  add(new THREE.TorusGeometry(0.4, 0.055, 8, 28), cream, torso, 0, -0.42, 0).rotation.x = Math.PI / 2; // hem rib
  add(new THREE.BoxGeometry(0.04, 1.0, 0.05), cream, torso, 0, 0.1, 0.375); // zip
  add(new THREE.BoxGeometry(0.2, 0.34, 0.02), tee, torso, 0, 0.7, 0.31).rotation.x = -0.1; // tee at neck
  add(new THREE.TorusGeometry(0.3, 0.1, 10, 24), jacketD, torso, 0, 0.84, -0.02).rotation.x = Math.PI / 2; // stand collar
  add(new THREE.BoxGeometry(0.16, 0.02, 0.02), cream, torso, 0.22, 0.18, 0.375); // chest logo stroke
  for (const s of [-1, 1]) add(new THREE.BoxGeometry(0.02, 0.2, 0.03), cream, torso, s * 0.26, -0.25, 0.365).rotation.z = s * 0.1; // pockets

  // head
  const head = new THREE.Group();
  head.position.y = 2.72;
  body.add(head);
  add(new THREE.SphereGeometry(0.62, 40, 28, 0, Math.PI * 2, 0, 1.5), skin, head).scale.set(0.88, 0.97, 0.95);
  add(new THREE.CylinderGeometry(0.2, 0.24, 0.4, 16), skin, head, 0, -0.55, -0.02);
  for (const s of [-1, 1]) add(new THREE.SphereGeometry(0.13, 16, 12), skinD, head, s * 0.55, -0.04, 0);
  // light stubble: darker shell over the lower face
  const st = new THREE.Mesh(
    new THREE.SphereGeometry(0.635, 36, 20, 0, Math.PI * 2, Math.PI * 0.58, Math.PI * 0.42),
    new THREE.MeshBasicMaterial({ color: 0x3b2a22, transparent: true, opacity: 0.4 }),
  );
  st.scale.set(0.88, 0.97, 0.95);
  head.add(st);
  const face: THREE.Object3D[] = [st];
  // curly hair: a dense cap plus curls
  const hairCap = add(new THREE.SphereGeometry(0.66, 36, 20, 0, Math.PI * 2, 0, Math.PI * 0.52), hair, head, 0, 0.1, -0.04);
  hairCap.rotation.x = 0.28;
  hairCap.scale.set(0.9, 1, 1);
  const curls: [number, number, number, number][] = [
    [0, 0.68, 0.18, 0.2], [0.22, 0.62, 0.28, 0.17], [-0.22, 0.62, 0.28, 0.17], [0.4, 0.5, 0.12, 0.17], [-0.4, 0.5, 0.12, 0.17],
    [0.1, 0.72, -0.08, 0.2], [-0.12, 0.7, -0.1, 0.19], [0.46, 0.3, -0.12, 0.15], [-0.46, 0.3, -0.12, 0.15], [0, 0.55, -0.4, 0.2],
    [0.3, 0.55, -0.26, 0.17], [-0.3, 0.55, -0.26, 0.17], [0.12, 0.6, 0.36, 0.14], [-0.14, 0.6, 0.35, 0.14],
  ];
  for (const [x, y, z, r] of curls) add(new THREE.SphereGeometry(r, 12, 10), hair, head, x * 0.88, y, z);
  const eyeWhite = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const eyeBlack = new THREE.MeshBasicMaterial({ color: 0x1c110c });
  const eyes: { g: THREE.Group; pupil: THREE.Mesh }[] = [];
  for (const s of [-1, 1]) {
    const g = new THREE.Group();
    g.position.set(s * 0.22, 0.02, 0.55);
    head.add(g);
    add(new THREE.SphereGeometry(0.105, 20, 14), eyeWhite, g).scale.set(1, 1.05, 0.5);
    const pupil = add(new THREE.SphereGeometry(0.072, 16, 12), eyeBlack, g, 0, 0, 0.04);
    add(new THREE.SphereGeometry(0.02, 8, 8), eyeWhite, pupil, 0.025, 0.03, 0.05);
    eyes.push({ g, pupil });
    face.push(g, add(new THREE.BoxGeometry(0.24, 0.06, 0.04), hair, head, s * 0.22, 0.2, 0.56)); // thick brows
  }
  face.push(add(new THREE.SphereGeometry(0.075, 14, 10), skinD, head, 0, -0.1, 0.6));
  const mouth = add(new THREE.TorusGeometry(0.13, 0.026, 8, 24, Math.PI), new THREE.MeshBasicMaterial({ color: 0x6f3030 }), head, 0, -0.2, 0.56);
  mouth.rotation.z = Math.PI;
  face.push(mouth);

  // arms with jacket sleeves, cream cuffs; silver watch on the left wrist
  const mkArm = (s: number) => {
    const g = new THREE.Group();
    g.position.set(s * 0.6, 2.0, 0);
    body.add(g);
    add(new THREE.CapsuleGeometry(0.13, 0.5, 6, 14), jacket, g, 0, -0.34, 0);
    add(new THREE.TorusGeometry(0.13, 0.045, 8, 16), cream, g, 0, -0.64, 0).rotation.x = Math.PI / 2;
    add(new THREE.SphereGeometry(0.15, 16, 12), skin, g, 0, -0.82, 0);
    return g;
  };
  const armL = mkArm(-1);
  const armR = mkArm(1);
  const wr = add(new THREE.CylinderGeometry(0.09, 0.09, 0.06, 16), M(0xc9ced6), armR, 0, -0.7, 0);
  wr.rotation.z = Math.PI / 2;
  add(new THREE.CircleGeometry(0.06, 16), new THREE.MeshBasicMaterial({ color: 0x8fb4d9 }), armR, 0.1, -0.7, 0).rotation.y = Math.PI / 2;

  const toonMeshes: THREE.Object3D[] = [];
  body.traverse((o) => {
    if ((o as THREE.Mesh).isMesh) toonMeshes.push(o);
  });
  const rig = { legs, torso, head, eyes, mouth, armL, armR, armLen: 0.82, ready: false, sync: () => {}, onReady: (_cb: () => void) => {} } as MeRig & { eyes: typeof eyes; mouth: typeof mouth };
  attachAvatar(rig, body, toonMeshes);
  return rig;
}
