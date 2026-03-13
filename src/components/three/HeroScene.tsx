import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import type { Mesh } from 'three';

function GlassIcosahedron() {
  const meshRef = useRef<Mesh>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  useFrame((_state, delta) => {
    if (meshRef.current && !reducedMotion) {
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.x += delta * 0.05;
    }
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  return (
    <mesh ref={meshRef} scale={isMobile ? 1.8 : 2.5}>
      <icosahedronGeometry args={[1, 0]} />
      <MeshTransmissionMaterial
        backside
        samples={isMobile ? 4 : 8}
        resolution={isMobile ? 512 : 1024}
        transmission={0.95}
        roughness={0.1}
        thickness={0.5}
        ior={1.5}
        chromaticAberration={0.06}
        anisotropy={0.1}
        distortion={0.0}
        distortionScale={0.0}
        color="#3B82F6"
      />
    </mesh>
  );
}

export default function HeroScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="absolute inset-0"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 2]}
        frameloop="always"
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <GlassIcosahedron />
        </Suspense>
      </Canvas>
    </div>
  );
}
