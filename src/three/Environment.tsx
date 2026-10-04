"use client";
import { Environment as DreiEnv, ContactShadows } from "@react-three/drei";

export default function Environment() {
  return (
    <>
      <DreiEnv files="/hdri/studio.hdr" background={false} />
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.45}
        scale={14}
        blur={2}
        far={4}
        color="#0f172a"
      />
    </>
  );
}