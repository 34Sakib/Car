"use client";
import dynamic from "next/dynamic";
import { cars } from "@/data/cars";

const HeroBackdrop = dynamic(() => import("./HeroBackdrop"), { ssr: false });
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });
const HeroContent = dynamic(() => import("./HeroContent"), { ssr: false });

export default function Hero() {
  const car = cars[0];
  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      {/* 1. Giant Editorial Typography Layer Behind the 3D Car (z-0) */}
      <HeroBackdrop />

      {/* 2. Interactive 3D Model Layer (z-10) */}
      <HeroScene model={car.model} color={car.colors[0].hex} />

      {/* 3. Foreground Telemetry, CTAs, and Navigation (z-20) */}
      <HeroContent />
    </section>
  );
}