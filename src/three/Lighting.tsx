"use client";

interface Props {
  isDark?: boolean;
}

export default function Lighting({ isDark = true }: Props) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.45 : 0.8} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={isDark ? 3.0 : 2.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.00015}
        shadow-camera-near={1}
        shadow-camera-far={25}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <directionalLight
        position={[-5, 6, -4]}
        intensity={isDark ? 1.8 : 1.3}
        color={isDark ? "#93c5fd" : "#f0f4ff"}
      />
      <spotLight
        position={[0, 8, 0]}
        intensity={isDark ? 2.2 : 1.6}
        angle={0.8}
        penumbra={1}
        color={isDark ? "#f8fafc" : "#ffffff"}
      />
    </>
  );
}