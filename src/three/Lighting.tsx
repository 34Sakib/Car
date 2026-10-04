"use client";

interface Props {
  isDark?: boolean;
}

export default function Lighting({ isDark = true }: Props) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.4 : 0.75} />
      <directionalLight
        position={[6, 12, 6]}
        intensity={isDark ? 3.2 : 2.6}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />
      <directionalLight
        position={[-6, 7, -5]}
        intensity={isDark ? 2.0 : 1.4}
        color={isDark ? "#93c5fd" : "#f0f4ff"}
      />
      <spotLight
        position={[0, 9, 0]}
        intensity={isDark ? 2.6 : 1.8}
        angle={0.85}
        penumbra={1}
        color={isDark ? "#f8fafc" : "#ffffff"}
      />
    </>
  );
}