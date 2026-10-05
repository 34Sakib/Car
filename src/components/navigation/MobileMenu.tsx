"use client";
import { Menu, X, ArrowRight, Sparkles, Compass } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import CarLogo from "@/components/ui/CarLogo";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  // Prevent background scrolling when mobile menu is active
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLinks = [
    { label: "Home", href: "/", tag: "Showcase" },
    { label: "The Fleet", href: "/models", tag: "3 Models" },
    { label: "Aeron GT", href: "/models/aeron-gt", tag: "650 HP · Flagship" },
    { label: "Vortex R", href: "/models/vortex-r", tag: "820 HP · Hypercar" },
    { label: "Phantom S", href: "/models/phantom-s", tag: "580 HP · Gran Turismo" },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open mobile navigation"
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-surface/80 text-text-primary shadow-xs backdrop-blur-md transition-colors hover:border-accent hover:text-accent md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100] flex flex-col justify-between overflow-y-auto bg-background/95 p-6 backdrop-blur-2xl"
          >
            {/* Ambient Background Gradient Spotlight */}
            <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl" />

            {/* Top Bar Header */}
            <div className="relative flex items-center justify-between border-b border-border/60 pb-5">
              <Link href="/" onClick={() => setOpen(false)}>
                <CarLogo />
              </Link>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-surface/80 text-text-primary shadow-xs transition-colors hover:border-accent hover:text-accent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation List */}
            <nav className="relative flex flex-col gap-3 py-8">
              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-accent">
                Atelier Navigation
              </span>

              <div className="mt-2 flex flex-col gap-2">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between rounded-2xl border border-transparent bg-surface/40 p-4 transition-all hover:border-border hover:bg-surface/80"
                    >
                      <div className="flex flex-col">
                        <span className="text-lg font-light tracking-wide text-text-primary group-hover:text-accent transition-colors">
                          {link.label}
                        </span>
                        <span className="text-[11px] text-text-muted">{link.tag}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>

            {/* Bottom Atelier Quick Action */}
            <div className="relative border-t border-border/60 pt-5">
              <Link
                href="/models/aeron-gt"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-text-primary py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-background shadow-lg transition-transform active:scale-95"
              >
                <Sparkles className="h-4 w-4 text-accent" />
                Configure Aeron GT
              </Link>
              <p className="mt-3 text-center text-[10px] uppercase tracking-[0.25em] text-text-muted">
                Nova Automotive · Bespoke Engineering
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}