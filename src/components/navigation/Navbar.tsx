"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "@/components/theme/ThemeToggle";
import CarLogo from "@/components/ui/CarLogo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "backdrop-blur-md bg-surface/85 border-b border-border shadow-[0_4px_25px_-10px_rgba(0,0,0,0.15)] text-text-primary"
          : "bg-transparent text-text-primary"
      )}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="group flex items-center transition-opacity hover:opacity-85"
        >
          <CarLogo />
        </Link>
        <div className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.25em] md:flex">
          <Link href="/models" className="transition-colors hover:text-accent">
            Models
          </Link>
          <Link href="/#explore" className="transition-colors hover:text-accent">
            Explore
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}