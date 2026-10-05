"use client";
import { Environment as DreiEnv, ContactShadows } from "@react-three/drei";

export default function Environment() {
  return (
    <>
      <DreiEnv preset="city" background={false} />
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.4}
        scale={12}
        blur={1.8}
        far={3.5}
        resolution={512}
        frames={1}
        color="#0f172a"
      />
    </>
  );
}