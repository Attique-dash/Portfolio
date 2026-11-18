"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function FloatingShapes() {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!group.current) return;
    target.current.x = state.pointer.x;
    target.current.y = state.pointer.y;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      target.current.x * 0.25,
      0.04
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -target.current.y * 0.2,
      0.04
    );
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
  });

  return (
    <group ref={group}>
      {/* Large wireframe icosahedron - left */}
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh position={[-3.2, 0.4, -1]}>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial
            color="#f97316"
            wireframe
            transparent
            opacity={0.35}
            emissive="#f97316"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>

      {/* Torus knot - right centerpiece */}
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.4}>
        <mesh position={[2.6, -0.2, -1.5]} rotation={[0.4, 0.6, 0]}>
          <torusKnotGeometry args={[1.1, 0.32, 128, 16]} />
          <meshStandardMaterial
            color="#dc2626"
            metalness={0.85}
            roughness={0.15}
            emissive="#b91c1c"
            emissiveIntensity={0.25}
          />
        </mesh>
      </Float>

      {/* Small floating octahedrons */}
      <Float speed={2.2} rotationIntensity={1} floatIntensity={1.6}>
        <mesh position={[4.2, 1.6, -2]}>
          <octahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial
            color="#fb923c"
            metalness={0.6}
            roughness={0.2}
            transparent
            opacity={0.85}
          />
        </mesh>
      </Float>

      <Float speed={1.6} rotationIntensity={1.2} floatIntensity={2}>
        <mesh position={[-4.4, -1.2, -2.5]} rotation={[0.5, 0.5, 0]}>
          <tetrahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial
            color="#ef4444"
            metalness={0.7}
            roughness={0.15}
            transparent
            opacity={0.8}
          />
        </mesh>
      </Float>

      <Float speed={2.6} rotationIntensity={0.9} floatIntensity={1.4}>
        <mesh position={[1.2, 2.2, -3]}>
          <icosahedronGeometry args={[0.35, 1]} />
          <meshStandardMaterial
            color="#f97316"
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>
      </Float>
    </group>
  );
}

function ParticleField() {
  const count = 900;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15 - 4;
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
      ref.current.rotation.x = state.pointer.y * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#f97316"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#fb923c" />
      <pointLight position={[-5, -3, 2]} intensity={30} color="#dc2626" />
      <pointLight position={[5, 3, 2]} intensity={20} color="#f97316" />

      <FloatingShapes />
      <ParticleField />
      <Sparkles count={60} scale={14} size={2} speed={0.3} color="#fb923c" opacity={0.4} />
    </Canvas>
  );
}
