"use client";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface Props {
  headlightsOn?: boolean;
  isFlashing?: boolean;
}

export default function VolumetricHeadlights({ headlightsOn = true, isFlashing = false }: Props) {
  const leftConeRef = useRef<THREE.Mesh>(null);
  const rightConeRef = useRef<THREE.Mesh>(null);
  const flareLeftRef = useRef<THREE.Mesh>(null);
  const flareRightRef = useRef<THREE.Mesh>(null);

  // Generate radial gradient glow texture for the lens flare
  const flareTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1.0)");
      gradient.addColorStop(0.15, "rgba(224, 242, 254, 0.9)");
      gradient.addColorStop(0.4, "rgba(56, 189, 248, 0.4)");
      gradient.addColorStop(0.7, "rgba(14, 165, 233, 0.12)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Geometry for volumetric light beam cone: extends forward from lens
  const coneGeometry = useMemo(() => {
    // Height 8 units, top radius 0.08, bottom radius 1.5, open ended
    const geom = new THREE.CylinderGeometry(0.08, 1.6, 9.0, 32, 1, true);
    // Move origin to the apex (tip) of the cone and align along -Z
    geom.translate(0, -4.5, 0);
    geom.rotateX(Math.PI / 2);
    return geom;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const effectiveBrightness = isFlashing ? 2.5 : headlightsOn ? 1.0 : 0.05;

    // Subtle micro-pulse for realistic electrical photon shimmer
    const shimmer = 1.0 + Math.sin(time * 20) * 0.02;

    if (leftConeRef.current && rightConeRef.current) {
      const coneMat = leftConeRef.current.material as THREE.MeshBasicMaterial;
      const targetOpacity = headlightsOn ? (isFlashing ? 0.65 : 0.28) * shimmer : 0;
      coneMat.opacity = THREE.MathUtils.lerp(coneMat.opacity, targetOpacity, 0.15);
      (rightConeRef.current.material as THREE.MeshBasicMaterial).opacity = coneMat.opacity;
    }

    if (flareLeftRef.current && flareRightRef.current) {
      const flareMat = flareLeftRef.current.material as THREE.MeshBasicMaterial;
      const targetScale = isFlashing ? 1.4 : headlightsOn ? 1.0 : 0.2;
      const curScale = THREE.MathUtils.lerp(flareLeftRef.current.scale.x, targetScale, 0.2);
      flareLeftRef.current.scale.set(curScale, curScale, curScale);
      flareRightRef.current.scale.set(curScale, curScale, curScale);
      flareMat.opacity = THREE.MathUtils.lerp(
        flareMat.opacity,
        headlightsOn ? (isFlashing ? 1.0 : 0.9) : 0.1,
        0.2
      );
    }
  });

  return (
    <group position={[0, 0.52, -1.85]}>
      {/* ========================================================================= */}
      {/* 1. LEFT HEADLIGHT (VOLUMETRIC CONE, LENS GLOW, SPOTLIGHT)                 */}
      {/* ========================================================================= */}
      <group position={[-0.62, 0, 0]}>
        {/* Optical Lens Flare Disc right at the headlight glass */}
        {flareTexture && (
          <mesh ref={flareLeftRef} position={[0, 0, 0.02]}>
            <planeGeometry args={[0.7, 0.7]} />
            <meshBasicMaterial
              map={flareTexture}
              transparent
              opacity={headlightsOn ? 0.95 : 0.1}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}

        {/* Volumetric 3D Light Cone Beam projecting into the forward road */}
        <mesh ref={leftConeRef} geometry={coneGeometry}>
          <meshBasicMaterial
            color="#bae6fd"
            transparent
            opacity={headlightsOn ? 0.28 : 0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* High-intensity forward projector spotlight */}
        <spotLight
          position={[0, 0, 0]}
          target-position={[-0.2, -0.6, -10]}
          angle={0.42}
          penumbra={0.6}
          intensity={headlightsOn ? (isFlashing ? 16 : 9.5) : 0.5}
          distance={20}
          color="#e0f2fe"
          castShadow={false}
        />

        {/* Point light right at the bulb to brightly illuminate the front fascia */}
        <pointLight
          position={[0, 0, -0.1]}
          intensity={headlightsOn ? (isFlashing ? 7.0 : 4.2) : 0.3}
          distance={5}
          color="#f0f9ff"
        />
      </group>

      {/* ========================================================================= */}
      {/* 2. RIGHT HEADLIGHT (VOLUMETRIC CONE, LENS GLOW, SPOTLIGHT)                */}
      {/* ========================================================================= */}
      <group position={[0.62, 0, 0]}>
        {/* Optical Lens Flare Disc right at the headlight glass */}
        {flareTexture && (
          <mesh ref={flareRightRef} position={[0, 0, 0.02]}>
            <planeGeometry args={[0.7, 0.7]} />
            <meshBasicMaterial
              map={flareTexture}
              transparent
              opacity={headlightsOn ? 0.95 : 0.1}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}

        {/* Volumetric 3D Light Cone Beam projecting into the forward road */}
        <mesh ref={rightConeRef} geometry={coneGeometry}>
          <meshBasicMaterial
            color="#bae6fd"
            transparent
            opacity={headlightsOn ? 0.28 : 0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* High-intensity forward projector spotlight */}
        <spotLight
          position={[0, 0, 0]}
          target-position={[0.2, -0.6, -10]}
          angle={0.42}
          penumbra={0.6}
          intensity={headlightsOn ? (isFlashing ? 16 : 9.5) : 0.5}
          distance={20}
          color="#e0f2fe"
          castShadow={false}
        />

        {/* Point light right at the bulb to brightly illuminate the front fascia */}
        <pointLight
          position={[0, 0, -0.1]}
          intensity={headlightsOn ? (isFlashing ? 7.0 : 4.2) : 0.3}
          distance={5}
          color="#f0f9ff"
        />
      </group>

      {/* Broad Ambient Road Illumination Pool */}
      {headlightsOn && (
        <pointLight
          position={[0, -0.1, -3.5]}
          intensity={isFlashing ? 5.5 : 3.0}
          distance={10}
          color="#38bdf8"
        />
      )}
    </group>
  );
}
