"use client";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { cars } from "@/data/cars";

export default function PerformanceSection() {
  const car = cars[0];
  return (
    <section className="relative mx-auto max-w-[1600px] px-6 py-40 md:px-10">
      <SectionHeading>PURE<br />PERFORMANCE</SectionHeading>
      <div className="mt-24 grid grid-cols-1 gap-16 md:grid-cols-3">
        {[
          { label: "Horsepower", value: car.performance.horsepower },
          { label: "0–100 km/h", value: parseFloat(car.performance.acceleration), suffix: "s" },
          { label: "Top Speed", value: parseInt(car.performance.topSpeed), suffix: " km/h" },
        ].map((m) => (
          <div key={m.label} className="border-t border-border pt-8">
            <div className="text-[clamp(4rem,10vw,8rem)] font-light leading-none tracking-[-0.04em]">
              <AnimatedCounter value={m.value} suffix={m.suffix ?? ""} />
            </div>
            <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-text-secondary">
              {m.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}