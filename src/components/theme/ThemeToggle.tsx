"use client";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";

interface Props {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ className = "", showLabel = false }: Props) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
      aria-label="Toggle visual theme"
      className={`group relative flex items-center gap-2 rounded-full border border-border/80 bg-surface/80 px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] text-text-primary shadow-xs backdrop-blur-md transition-all duration-300 hover:border-accent/60 hover:text-accent ${className}`}
    >
      <div className="relative flex h-4 w-4 items-center justify-center">
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-accent transition-transform duration-300 group-hover:rotate-12" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-amber-500 transition-transform duration-300 group-hover:rotate-45" />
        )}
      </div>
      {showLabel && (
        <span className="text-[10px] tracking-[0.2em]">
          {isDark ? "Dark Studio" : "Light Studio"}
        </span>
      )}
    </button>
  );
}
