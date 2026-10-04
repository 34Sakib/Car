"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import CarModel from "./CarModel";
import Lighting from "@/three/Lighting";
import Environment from "@/three/Environment";
import CameraRig from "@/three/CameraRig";

import { useTheme } from "@/components/theme/ThemeContext";

interface Props {
  model: string;
  color?: string;
  cameraPose?: keyof typeof import("@/three/CameraRig").POSES;
  transparentBg?: boolean;
  scrollProgress?: number;
  headlightsOn?: boolean;
  enableOrbit?: boolean;
  autoRotate?: boolean;
  onHonk?: () => void;
}

export default function CarScene({
  model,
  color,
  cameraPose = "hero",
  transparentBg = false,
  scrollProgress = 0,
  headlightsOn = true,
  enableOrbit = false,
  autoRotate = false,
  onHonk,
}: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    // Filter internal Three r186 deprecation notices from React Three Fiber ecosystem
    const originalWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      const msg = typeof args[0] === "string" ? args[0] : "";
      if (
        msg.includes("THREE.Clock: This module has been deprecated") ||
        msg.includes("PCFSoftShadowMap has been removed")
      ) {
        return;
      }
      originalWarn.apply(console, args);
    };
    return () => {
      console.warn = originalWarn;
    };
  }, []);

  return (
    <Canvas
      dpr={[1, 1.8]}
      shadows={{ type: THREE.PCFShadowMap }}
      camera={{ position: [4.5, 1.6, 6.5], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFShadowMap;
      }}
    >
      {!transparentBg && (
        <color attach="background" args={[isDark ? "#07090E" : "#F8F9FB"]} />
      )}
      <Suspense fallback={null}>
        <Environment />
        <Lighting isDark={isDark} />
        <CarModel
          model={model}
          color={color}
          scrollProgress={scrollProgress}
          headlightsOn={headlightsOn}
          autoRotate={autoRotate}
          onHonk={onHonk}
        />
        <CameraRig pose={cameraPose} />
        {enableOrbit && (
          <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2.1} />
        )}
      </Suspense>
    </Canvas>
  );
}