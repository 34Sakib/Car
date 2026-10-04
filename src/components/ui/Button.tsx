"use client";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  arrow?: boolean;
}

export default function Button({
  variant = "primary",
  arrow,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "group inline-flex items-center gap-3 rounded-full px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300",
        variant === "primary"
          ? "bg-text-primary text-background hover:bg-accent hover:text-neutral-950 shadow-md active:scale-95"
          : "border border-border/90 text-text-primary hover:border-accent hover:text-accent bg-surface/70 backdrop-blur-md active:scale-95",
        "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {arrow && (
        <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </button>
  );
}