"use client";
import { useState } from "react";
import Link from "next/link";
import { Car } from "@/types/car";
import CarScene from "./CarScene";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CarViewer({ car }: { car: Car }) {
  const [selectedColor, setSelectedColor] = useState(car.colors[0]?.hex || "#080808");
  const currentColorObj = car.colors.find((c) => c.hex === selectedColor) || car.colors[0];

  return (
    <article className="min-h-screen pt-20">
      {/* 3D Canvas Area */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-background">
        <CarScene model={car.model} color={selectedColor} />

        {/* Back Link */}
        <div className="absolute top-6 left-6 z-20 md:top-10 md:left-10">
          <Link
            href="/models"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-text-primary backdrop-blur-md transition-all hover:border-accent hover:shadow-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Collection</span>
          </Link>
        </div>

        {/* Floating Bottom Car Title & Color Switcher */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col justify-between gap-6 p-6 md:flex-row md:items-end md:p-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">
              <Sparkles className="h-3 w-3" /> Flagship
            </span>
            <h1 className="mt-3 text-[clamp(2.5rem,7vw,6rem)] font-light leading-none tracking-[-0.04em] text-text-primary">
              {car.name}
            </h1>
            <p className="mt-2 text-sm text-text-secondary">{car.tagline}</p>
          </div>

          {/* Interactive Color Switcher */}
          <div className="pointer-events-auto flex flex-col items-start gap-3 rounded-2xl border border-border bg-surface/85 p-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] backdrop-blur-md md:items-end">
            <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-text-secondary">
              Exterior Finish: <span className="font-semibold text-text-primary">{currentColorObj?.name}</span>
            </span>
            <div className="flex items-center gap-2.5">
              {car.colors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedColor(c.hex)}
                  title={c.name}
                  aria-label={`Select ${c.name} color`}
                  className={`group relative flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 ${
                    selectedColor === c.hex
                      ? "scale-110 border-accent ring-2 ring-accent/30"
                      : "border-neutral-300 hover:scale-105"
                  }`}
                  style={{ backgroundColor: c.hex }}
                >
                  {selectedColor === c.hex && (
                    <Check
                      className={`h-3 w-3 ${
                        c.hex === "#FFFFFF" || c.hex === "#F5F5F5" || c.hex === "#C0C0C0"
                          ? "text-black"
                          : "text-white"
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specifications & Details Section */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-xs">
            <span className="text-[11px] uppercase tracking-[0.25em] text-text-secondary">Horsepower</span>
            <p className="mt-2 text-4xl font-light tracking-tight text-text-primary">{car.performance.horsepower} <span className="text-base text-text-muted">HP</span></p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-xs">
            <span className="text-[11px] uppercase tracking-[0.25em] text-text-secondary">Acceleration</span>
            <p className="mt-2 text-4xl font-light tracking-tight text-text-primary">{car.performance.acceleration} <span className="text-base text-text-muted">0–100</span></p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-xs">
            <span className="text-[11px] uppercase tracking-[0.25em] text-text-secondary">Top Speed</span>
            <p className="mt-2 text-4xl font-light tracking-tight text-text-primary">{car.performance.topSpeed}</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-xs">
            <span className="text-[11px] uppercase tracking-[0.25em] text-text-secondary">Drivetrain</span>
            <p className="mt-2 text-4xl font-light tracking-tight text-text-primary">{car.performance.drivetrain || "AWD"}</p>
          </div>
        </div>

        {/* Features & Narrative */}
        {car.features && car.features.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-light tracking-tight text-text-primary md:text-3xl">
              Engineering Highlights
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {car.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-surface/60 p-8 backdrop-blur-xs transition-colors hover:border-accent/50 hover:bg-surface"
                >
                  <h3 className="text-lg font-medium text-text-primary">{feat.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{feat.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 flex flex-col items-center justify-between gap-6 rounded-3xl border border-border bg-gradient-to-r from-surface to-surface-subtle p-10 md:flex-row md:p-14">
          <div>
            <h3 className="text-2xl font-light tracking-tight text-text-primary md:text-3xl">
              Reserve Your {car.name}
            </h3>
            <p className="mt-2 max-w-md text-sm text-text-secondary">
              Connect with a private specialist to personalize specifications and secure your build slot.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" arrow>
              Request Private Consultation
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
