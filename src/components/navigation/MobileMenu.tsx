"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="md:hidden text-text-primary"
      >
        <Menu className="h-5 w-5" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-lg"
          >
            <div className="flex justify-end p-6">
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col items-center gap-8 pt-20 text-3xl font-light uppercase tracking-[0.2em]">
              <Link href="/" onClick={() => setOpen(false)}>Home</Link>
              <Link href="/models" onClick={() => setOpen(false)}>Models</Link>
              <Link href="/#explore" onClick={() => setOpen(false)}>Explore</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}