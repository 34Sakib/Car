"use client";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "text-[clamp(2.5rem,8vw,6.5rem)] font-light leading-[0.95] tracking-[-0.03em]",
        className
      )}
    >
      {children}
    </motion.h2>
  );
}