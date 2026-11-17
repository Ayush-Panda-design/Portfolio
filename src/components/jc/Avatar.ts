import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

export const AVATAR_URL = "/avatar/me.glb";
const TARGET_H = 3.45;

let cache: Promise<THREE.Group> | null = null;
function load() {
  cache ??= new Promise<THREE.Group>((res, rej) => new GLTFLoader().load(AVATAR_URL, (g) => res(g.scene), undefined, rej));
  return cache;
}

/** The pivots the animation code already drives. The real avatar is posed from them every frame via rig.sync(). */
export type Proxies = {
  torso: THREE.Object3D;
  head: THREE.Object3D;
  armL: THREE.Object3D; // toon left (-x) = avatar RightArm
  armR: THREE.Object3D; // toon right (+x) = avatar LeftArm
  legs: THREE.Object3D[]; // [-x, +x]
};
export type MeRig = Proxies & { armLen: number; ready: boolean; sync: () => void; onReady: (cb: () => void) => void };

const E = (o: THREE.Object3D) => new THREE.Quaternion().setFromEuler(o.rotation);
const I = new THREE.Quaternion();
const part = (q: THREE.Quaternion, f: number) => I.clone().slerp(q, f);

/** Loads the rigged GLB and swaps it in for the toon body. Falls back silently to the toon body if it fails. */
export function attachAvatar(rig: MeRig, body: THREE.Object3D, toonMeshes: THREE.Object3D[]) {
  const cbs: (() => void)[] = [];
  rig.onReady = (cb) => (rig.ready ? cb() : cbs.push(cb));
  let dead = false;
  const dispose = () => (dead = true);

  load()
    .then((src) => {
      if (dead) return;
      const av = clone(src) as THREE.Group;
      body.add(av);
      av.updateMatrixWorld(true);

      // size to the toon figure and stand it on the floor
      const box = new THREE.Box3().setFromObject(av);
      const s = TARGET_H / (box.max.y - box.min.y);
      av.scale.setScalar(s);
      av.position.y = -box.min.y * s + 0.04;
      av.traverse((o) => {
        const m = o as THREE.SkinnedMesh;
        if (m.isMesh) {
          m.frustumCulled = false;
          const mats = Array.isArray(m.material) ? m.material : [m.material];
          mats.forEach((mt) => {
            const sm = mt as THREE.MeshStandardMaterial;
            if (sm.metalness !== undefined) sm.metalness = Math.min(sm.metalness, 0.1);
            if (sm.roughness !== undefined) sm.roughness = Math.max(sm.roughness, 0.55);
          });
        }
      });
      av.updateMatrixWorld(true);

      const bone = (n: string) => av.getObjectByName(n) as THREE.Bone;
      const names = ["Spine", "Spine1", "Spine2", "Neck", "Head", "LeftArm", "RightArm", "LeftUpLeg", "RightUpLeg"] as const;
      const B = Object.fromEntries(names.map((n) => [n, bone(n)])) as Record<(typeof names)[number], THREE.Bone>;
      if (names.some((n) => !B[n])) throw new Error("avatar rig missing bones");

      const avInv = new THREE.Quaternion().copy(av.getWorldQuaternion(new THREE.Quaternion())).invert();
      const wq = (o: THREE.Object3D) => avInv.clone().multiply(o.getWorldQuaternion(new THREE.Quaternion()));
      const rest: Record<string, THREE.Quaternion> = {};
      names.forEach((n) => (rest[n] = wq(B[n])));

      // make the T-pose arms hang straight down (in avatar space)
      const hang = (arm: THREE.Bone, fore: THREE.Bone) => {
        const a = new THREE.Vector3(), f = new THREE.Vector3();
        arm.getWorldPosition(a);
        fore.getWorldPosition(f);
        const dir = f.sub(a).applyQuaternion(avInv).normalize();
        return new THREE.Quaternion().setFromUnitVectors(dir, new THREE.Vector3(0, -1, 0));
      };
      const hangL = hang(B.LeftArm, bone("LeftForeArm"));
      const hangR = hang(B.RightArm, bone("RightForeArm"));

      // arm length in body space, so the hand/bat/card pivots land on the real hand
      const pa = new THREE.Vector3(), pf = new THREE.Vector3(), ph = new THREE.Vector3();
      B.LeftArm.getWorldPosition(pa);
      bone("LeftForeArm").getWorldPosition(pf);
      bone("LeftHand").getWorldPosition(ph);
      rig.armLen = pa.distanceTo(pf) + pf.distanceTo(ph) + 0.12;

      toonMeshes.forEach((m) => (m.visible = false));

      const tmp = new THREE.Vector3();
      const drive = (b: THREE.Bone, key: (typeof names)[number], delta: THREE.Quaternion, pre?: THREE.Quaternion) => {
        const target = delta.clone().multiply(pre ? pre.clone().multiply(rest[key]) : rest[key]);
        b.parent!.updateWorldMatrix(true, false);
        const parentAv = wq(b.parent!);
        b.quaternion.copy(parentAv.invert().multiply(target));
      };

      rig.sync = () => {
        const dT = E(rig.torso);
        drive(B.Spine, "Spine", part(dT, 1 / 3));
        drive(B.Spine1, "Spine1", part(dT, 2 / 3));
        drive(B.Spine2, "Spine2", dT);
        const dH = E(rig.head);
        drive(B.Neck, "Neck", dT.clone().multiply(part(dH, 0.4)));
        drive(B.Head, "Head", dT.clone().multiply(dH));
        // toon -x side = avatar Right, +x side = avatar Left
        drive(B.RightArm, "RightArm", dT.clone().multiply(E(rig.armL)), hangR);
        drive(B.LeftArm, "LeftArm", dT.clone().multiply(E(rig.armR)), hangL);
        drive(B.RightUpLeg, "RightUpLeg", E(rig.legs[0]));
        drive(B.LeftUpLeg, "LeftUpLeg", E(rig.legs[1]));
        body.updateMatrixWorld(true);
        // move the toon shoulder pivots onto the real shoulders (bat, card and hand pivots hang off them)
        B.RightArm.getWorldPosition(tmp);
        rig.armL.position.copy(body.worldToLocal(tmp));
        B.LeftArm.getWorldPosition(tmp);
        rig.armR.position.copy(body.worldToLocal(tmp));
      };

      rig.ready = true;
      rig.sync();
      cbs.splice(0).forEach((cb) => cb());
    })
    .catch(() => {
      /* keep the toon body */
    });

  return dispose;
}
