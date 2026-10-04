"use client";
import dynamic from "next/dynamic";

const CarScene = dynamic(() => import("@/components/cars/CarScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-transparent" />,
});

export default function HeroScene({ model, color }: { model: string; color?: string }) {
  return (
    <div className="absolute inset-0 z-10">
      <CarScene model={model} color={color} transparentBg={true} />
    </div>
  );
}