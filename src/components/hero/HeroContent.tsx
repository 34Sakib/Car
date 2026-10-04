"use client";
import { motion } from "motion/react";
import { ArrowDown, Move3d } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function HeroContent() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex h-full flex-col justify-between p-6 md:p-12">
      {/* Top Floating Telemetry & Badges */}
      <div className="flex items-start justify-between pt-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col gap-1"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-accent">
            // AERON GT
          </span>
          <span className="text-xs font-light tracking-wide text-text-primary">
            Next-Gen Gran Turismo
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="hidden flex-col items-end gap-1 text-right md:flex"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-text-secondary">
            Telemetry Overview
          </span>
          <span className="text-xs font-medium tracking-wider text-text-primary">
            650 HP · 3.1s 0–100 · 320 KM/H
          </span>
        </motion.div>
      </div>

      {/* Middle Interactive 3D Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="self-center flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-text-muted backdrop-blur-md"
      >
        <Move3d className="h-3.5 w-3.5 text-accent" />
        <span>Drag to rotate 3D view</span>
      </motion.div>

      {/* Bottom Actions & Scroll Cue */}
      <div className="flex flex-col items-center justify-between gap-6 pb-4 md:flex-row md:items-end">
        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="pointer-events-auto flex flex-wrap items-center gap-4"
        >
          <Link href="/models/aeron-gt">
            <Button variant="primary" arrow>
              Discover Aeron GT
            </Button>
          </Link>
          <Link href="/models">
            <Button variant="ghost">
              All Models
            </Button>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-text-secondary"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="h-3 w-3 animate-bounce text-accent" />
        </motion.div>
      </div>
    </div>
  );
}