"use client";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import gsap from "gsap";
import VolumetricHeadlights from "./VolumetricHeadlights";
import { playCarHorn } from "@/lib/sound";

interface Props {
  model: string;
  color?: string;
  autoRotate?: boolean;
  scrollProgress?: number;
  headlightsOn?: boolean;
  onHonk?: () => void;
}

export default function CarModel({
  model,
  color = "#080808",
  autoRotate = false,
  scrollProgress = 0,
  headlightsOn = true,
  onHonk,
}: Props) {
  const { scene } = useGLTF(model);
  const ref = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Object3D[]>([]);
  const headlightMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const isEntering = useRef(true);
  const prevScrollRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Trigger Horn Audio & Headlight High-Beam Flash
  const handleCarClick = useCallback((e?: { stopPropagation?: () => void }) => {
    if (e?.stopPropagation) e.stopPropagation();
    playCarHorn();
    setIsFlashing(true);
    if (onHonk) onHonk();
    setTimeout(() => setIsFlashing(false), 450);
  }, [onHonk]);

  // Identify wheels, headlights, and paint materials
  useEffect(() => {
    const wheels: THREE.Object3D[] = [];
    const headlightMats: THREE.MeshStandardMaterial[] = [];

    scene.traverse((obj) => {
      // Find wheels for rolling animation
      if (/wheel_(fl|fr|rl|rr)/i.test(obj.name)) {
        wheels.push(obj);
      }

      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        const mat = mesh.material;
        const mats = Array.isArray(mat) ? mat : [mat];

        mats.forEach((m) => {
          if (m instanceof THREE.MeshStandardMaterial) {
            // Body paint
            if (/paint|body/i.test(m.name || "")) {
              m.color.set(color);
              m.roughness = 0.14;
              m.metalness = 0.92;
            }

            // Headlights & LEDs: High-intensity crystalline emissive glow
            if (/lights|leds/i.test(m.name || "") && !/red/i.test(m.name || "")) {
              headlightMats.push(m);
              m.emissive = new THREE.Color("#f0f9ff");
              m.emissiveIntensity = isFlashing ? 14.0 : headlightsOn ? 8.0 : 0.4;
            }

            // Rear red lights emissive
            if (/lights_red|red/i.test(m.name || "")) {
              m.emissive = new THREE.Color("#ef4444");
              m.emissiveIntensity = 3.5;
            }
          }
        });
      }
    });

    wheelsRef.current = wheels;
    headlightMaterialsRef.current = headlightMats;
  }, [scene, color, headlightsOn, isFlashing]);

  // Initial Drive-In Entrance Animation on Mount
  useEffect(() => {
    if (ref.current) {
      ref.current.position.set(-1.8, 0, -6.0);
      ref.current.rotation.y = Math.PI + 0.28;
      ref.current.scale.set(0.68, 0.68, 0.68);
      scrollVelocityRef.current = 1.0;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          delay: 0.35,
          onComplete: () => {
            isEntering.current = false;
            scrollVelocityRef.current = 0;
          },
        });

        tl.to(
          ref.current!.position,
          {
            x: 0,
            y: 0,
            z: 0,
            duration: 2.3,
            ease: "power2.out",
          },
          0
        );

        tl.to(
          ref.current!.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 2.3,
            ease: "power2.out",
          },
          0
        );

        tl.to(
          ref.current!.rotation,
          {
            y: Math.PI - 0.45,
            duration: 2.3,
            ease: "power2.out",
          },
          0
        );
      });

      return () => ctx.revert();
    }
  }, []);

  // Frame Loop: Handle Alternating Side Car Movement, 4-Wheel Rolling, and Headlight Glow
  useFrame((_, dt) => {
    if (!ref.current) return;

    // 1. Calculate Scroll Velocity & Wheel Spin
    const scrollDelta = scrollProgress - prevScrollRef.current;
    prevScrollRef.current = scrollProgress;

    // Smooth inertia for wheel spinning
    if (Math.abs(scrollDelta) > 0.0001) {
      scrollVelocityRef.current = scrollDelta * 80;
    } else {
      scrollVelocityRef.current *= Math.max(0, 1 - dt * 6);
    }

    // Roll all 4 wheels around their rolling X axis
    if (Math.abs(scrollVelocityRef.current) > 0.001) {
      wheelsRef.current.forEach((wheel) => {
        wheel.rotation.x += dt * scrollVelocityRef.current * 25;
      });
    }

    // 2. Alternating Section Placement
    if (!isEntering.current) {
      const p = Math.min(1, Math.max(0, scrollProgress));

      // Smoothstep interpolation helper
      const smoothstep = (min: number, max: number, value: number) => {
        const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
        return x * x * (3 - 2 * x);
      };

      const lerp = THREE.MathUtils.lerp;

      let targetX = 0;
      let targetY = 0;
      let targetZ = 0;
      let targetRotY = Math.PI - 0.45;
      let targetRotX = 0;

      let shouldAutoRotate = false;

      if (p < 0.12) {
        // Stage 0: Hero Stage (Car is centered, front 3/4 pose)
        targetX = 0;
        targetY = 0;
        targetZ = 0;
        targetRotY = Math.PI - 0.45;
        targetRotX = 0;
      } else if (p < 0.15) {
        // Prompt Transition 0 -> 1: Glide to the RIGHT side
        const t = smoothstep(0.12, 0.15, p);
        targetX = lerp(0, 1.95, t);
        targetY = lerp(0, -0.05, t);
        targetZ = lerp(0, 0.1, t);
        targetRotY = lerp(Math.PI - 0.45, Math.PI - 0.75, t);
        targetRotX = lerp(0, 0.015, t);
      } else if (p < 0.28) {
        // Stage 1: Propulsion Architecture (Text on Left -> Car stays on RIGHT)
        targetX = 1.95;
        targetY = -0.05;
        targetZ = 0.1;
        targetRotY = Math.PI - 0.75;
        targetRotX = 0.015;
      } else if (p < 0.31) {
        // Prompt Transition 1 -> 2: Glide to the LEFT side
        const t = smoothstep(0.28, 0.31, p);
        targetX = lerp(1.95, -1.95, t);
        targetY = lerp(-0.05, 0, t);
        targetZ = lerp(0.1, 0.1, t);
        targetRotY = lerp(Math.PI - 0.75, Math.PI / 2 + 0.35, t);
        targetRotX = lerp(0.015, 0, t);
      } else if (p < 0.44) {
        // Stage 2: Aerodynamics & Optics (Text on Right -> Car stays on LEFT)
        targetX = -1.95;
        targetY = 0;
        targetZ = 0.1;
        targetRotY = Math.PI / 2 + 0.35;
        targetRotX = 0;
      } else if (p < 0.47) {
        // Prompt Transition 2 -> 3: Glide to the RIGHT side
        const t = smoothstep(0.44, 0.47, p);
        targetX = lerp(-1.95, 1.95, t);
        targetY = lerp(0, -0.05, t);
        targetZ = lerp(0.1, 0.1, t);
        targetRotY = lerp(Math.PI / 2 + 0.35, Math.PI - 0.75, t);
        targetRotX = 0;
      } else if (p < 0.60) {
        // Stage 3: Chassis Dynamics & Suspension (Text on Left -> Car stays on RIGHT)
        targetX = 1.95;
        targetY = -0.05;
        targetZ = 0.1;
        targetRotY = Math.PI - 0.75;
        targetRotX = 0;
      } else if (p < 0.63) {
        // Prompt Transition 3 -> 4: Glide to LEFT Close-Up for Cockpit
        const t = smoothstep(0.60, 0.63, p);
        targetX = lerp(1.95, -1.65, t);
        targetY = lerp(-0.05, -0.08, t);
        targetZ = lerp(0.1, 0.95, t);
        targetRotY = lerp(Math.PI - 0.75, Math.PI / 2 + 0.35, t);
        targetRotX = 0;
      } else if (p < 0.76) {
        // Stage 4: The Horizon Cockpit Atelier (Text on Right -> Car stays on LEFT Close-up)
        targetX = -1.65;
        targetY = -0.08;
        targetZ = 0.95;
        targetRotY = Math.PI / 2 + 0.35;
        targetRotX = 0;
      } else if (p < 0.79) {
        // Prompt Transition 4 -> 5: Glide to RIGHT side for Hypercharging
        const t = smoothstep(0.76, 0.79, p);
        targetX = lerp(-1.65, 1.85, t);
        targetY = lerp(-0.08, -0.05, t);
        targetZ = lerp(0.95, 0.2, t);
        targetRotY = lerp(Math.PI / 2 + 0.35, Math.PI - 0.65, t);
        targetRotX = 0;
      } else if (p < 0.90) {
        // Stage 5: 900V Hypercharging Architecture (Text on Left -> Car stays on RIGHT)
        targetX = 1.85;
        targetY = -0.05;
        targetZ = 0.2;
        targetRotY = Math.PI - 0.65;
        targetRotX = 0;
      } else if (p < 0.93) {
        // Prompt Transition 5 -> 6: Re-center for 360 Customizer Studio
        const t = smoothstep(0.90, 0.93, p);
        targetX = lerp(1.85, 0, t);
        targetY = lerp(-0.05, 0, t);
        targetZ = lerp(0.2, 0, t);
        targetRotY = lerp(Math.PI - 0.65, Math.PI - 0.45, t);
        targetRotX = 0;
      } else {
        // Stage 6: 360 Bespoke Studio Configurator (Centered turntable)
        targetX = 0;
        targetY = 0;
        targetZ = 0;
        targetRotX = 0;
        shouldAutoRotate = true;
      }

      // Snappy and responsive lerp factor so car tracks scroll position faithfully
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetX, 0.12);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, 0.12);
      ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, targetZ, 0.12);
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetRotX, 0.12);

      if (shouldAutoRotate) {
        // Smooth turntable rotation in the Bespoke Studio Configurator stage
        ref.current.rotation.y += dt * 0.22;
      } else {
        ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotY, 0.12);
      }
    }
  });

  // Set pointer cursor on hover
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.cursor = hovered ? "pointer" : "auto";
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.cursor = "auto";
      }
    };
  }, [hovered]);

  return (
    <group
      ref={ref}
      onClick={handleCarClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={scene} />

      {/* Realistic Volumetric Projector Headlights & Lens Flares */}
      <VolumetricHeadlights headlightsOn={headlightsOn} isFlashing={isFlashing} />

      {/* Rear Taillight Soft Red Underglow */}
      <pointLight position={[0, 0.55, 1.8]} intensity={2.2} distance={4.5} color="#ef4444" />
    </group>
  );
}

useGLTF.preload("/models/aeron-gt.glb");