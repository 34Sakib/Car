"use client";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import gsap from "gsap";

export type CameraPose = {
  position: [number, number, number];
  target: [number, number, number];
};

export const POSES: Record<string, CameraPose> = {
  hero: { position: [4.5, 1.6, 6.5], target: [0, 0.7, 0] },
  side: { position: [7, 1.4, 0], target: [0, 0.7, 0] },
  rear: { position: [-4, 1.6, -6], target: [0, 0.7, 0] },
  detail: { position: [2, 1.2, 2.2], target: [0.5, 0.6, 0] },
  top: { position: [0, 5.5, 0.01], target: [0, 0.6, 0] },
};

export default function CameraRig({ pose = "hero" }: { pose?: keyof typeof POSES }) {
  const { camera } = useThree();

  useEffect(() => {
    const target = POSES[pose];
    gsap.to(camera.position, {
      x: target.position[0],
      y: target.position[1],
      z: target.position[2],
      duration: 2,
      ease: "power3.inOut",
    });
  }, [pose, camera]);

  return null;
}