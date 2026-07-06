import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, Octahedron, Stars } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import type { Group, Mesh } from "three";

function FloatingShapes() {
  const group = useRef<Group>(null);
  const sphere = useRef<Mesh>(null);
  const torus = useRef<Mesh>(null);
  const octa = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.08;
      group.current.rotation.x = Math.sin(t * 0.2) * 0.08;
    }
    if (sphere.current) sphere.current.rotation.y = t * 0.3;
    if (torus.current) {
      torus.current.rotation.x = t * 0.4;
      torus.current.rotation.y = t * 0.2;
    }
    if (octa.current) octa.current.rotation.z = t * 0.35;
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
        <Sphere ref={sphere} args={[1.1, 64, 64]} position={[-0.2, 0.2, 0]}>
          <MeshDistortMaterial
            color="#5eead4"
            attach="material"
            distort={0.35}
            speed={2}
            roughness={0.2}
            metalness={0.6}
            transparent
            opacity={0.85}
          />
        </Sphere>
      </Float>

      <Float speed={1.8} rotationIntensity={1} floatIntensity={1.5}>
        <Torus ref={torus} args={[0.55, 0.18, 32, 64]} position={[1.6, 0.9, -0.4]}>
          <meshStandardMaterial color="#38bdf8" metalness={0.8} roughness={0.2} emissive="#0ea5e9" emissiveIntensity={0.3} />
        </Torus>
      </Float>

      <Float speed={2} rotationIntensity={1.2} floatIntensity={1}>
        <Octahedron ref={octa} args={[0.45, 0]} position={[-1.5, -0.8, 0.5]}>
          <meshStandardMaterial color="#a78bfa" metalness={0.7} roughness={0.15} emissive="#7c3aed" emissiveIntensity={0.25} />
        </Octahedron>
      </Float>

      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh position={[1.2, -1.1, 0.3]}>
          <icosahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial color="#f472b6" metalness={0.6} roughness={0.25} emissive="#db2777" emissiveIntensity={0.2} wireframe />
        </mesh>
      </Float>

      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.1}>
        <mesh position={[-1.3, 1.1, -0.6]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#5eead4" metalness={0.5} roughness={0.3} wireframe />
        </mesh>
      </Float>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 4, 2]} intensity={1.2} color="#e0f2fe" />
      <pointLight position={[-3, 2, 2]} intensity={1.5} color="#5eead4" />
      <pointLight position={[3, -2, -1]} intensity={1} color="#818cf8" />
      <Stars radius={40} depth={30} count={800} factor={2.5} saturation={0} fade speed={0.6} />
      <FloatingShapes />
    </>
  );
}

export function HeroScene() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-sky-500/5" />;
  }

  return (
    <div className="absolute inset-0">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
