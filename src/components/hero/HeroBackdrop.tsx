"use client";
import { motion } from "motion/react";

export default function HeroBackdrop({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const text = "OFF DRIVE";

  // Quick fade out as user scrolls past hero section (fades completely by scrollProgress = 0.12)
  const heroOpacity = Math.max(0, 1 - scrollProgress * 8);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 35,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  if (heroOpacity <= 0.01) return null;

  return (
    <div
      suppressHydrationWarning
      style={{ opacity: heroOpacity }}
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden select-none transition-opacity duration-300"
    >
      {/* Soft Ambient Studio Spotlight Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[75vw] w-[75vw] max-h-[900px] max-w-[900px] rounded-full bg-gradient-to-tr from-accent/15 via-sky-200/30 dark:via-sky-500/10 to-transparent blur-3xl" />

      {/* Architectural Studio Horizon Line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="h-px w-full max-w-[1500px] bg-gradient-to-r from-transparent via-neutral-400/80 dark:via-accent/60 to-transparent" />
      </motion.div>

      {/* Single Line High-Contrast Monumental Typography */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative flex items-center justify-center whitespace-nowrap px-4 tracking-[-0.03em]"
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className={`text-[clamp(4.5rem,17vw,17rem)] font-semibold dark:font-light uppercase leading-none text-neutral-950 dark:text-white/90 drop-shadow-xs ${
              char === " " ? "w-[clamp(1.5rem,5vw,5rem)]" : ""
            }`}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
