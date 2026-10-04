import Link from "next/link";
import Image from "next/image";
import { cars } from "@/data/cars";
import { ArrowRight } from "lucide-react";

export default function CollectionSection() {
  return (
    <section className="mx-auto max-w-[1600px] px-6 py-32 md:px-10">
      <div className="mb-16 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.4em] text-text-secondary">
            Excellence in Motion
          </p>
          <h2 className="text-[clamp(2.2rem,6vw,4rem)] font-light tracking-[-0.03em] text-text-primary">
            THE COLLECTION
          </h2>
        </div>
        <p className="max-w-md text-sm text-text-secondary">
          Crafted without compromise. Experience automotive art designed to ignite every sense.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {cars.map((car) => (
          <Link
            key={car.id}
            href={`/models/${car.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/80 bg-surface/25 p-6 shadow-xs backdrop-blur-xs transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/60 hover:bg-surface/40 hover:shadow-lg"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-surface-subtle/60">
              {car.fallbackImage ? (
                <Image
                  src={car.fallbackImage}
                  alt={car.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 500px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-surface-subtle text-xs text-text-muted">
                  {car.name}
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-light uppercase tracking-[0.12em] text-text-primary">
                  {car.name}
                </h3>
                <p className="mt-0.5 text-xs text-text-secondary">{car.tagline}</p>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-surface/60 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-text-secondary">
              <span>{car.performance.horsepower} HP</span>
              <span>{car.performance.acceleration} 0–100</span>
              <span>{car.performance.topSpeed}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}