"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { cars } from "@/data/cars";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Compass,
  Flame,
  Gauge,
  Lightbulb,
  Move3d,
  Radio,
  Shield,
  Sparkles,
  Volume2,
  Wind,
  Zap,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { useTheme } from "@/components/theme/ThemeContext";
import { playCarHorn } from "@/lib/sound";

const CarScene = dynamic(() => import("@/components/cars/CarScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-transparent" />,
});

const HeroBackdrop = dynamic(() => import("@/components/hero/HeroBackdrop"), {
  ssr: false,
});

export default function HomeShowcase() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeColor, setActiveColor] = useState(cars[0].colors[0].hex);
  const [isHonking, setIsHonking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const car = cars[0];
  const currentColorObj = car.colors.find((c) => c.hex === activeColor) || car.colors[0];

  // Headlights automatically activate ONLY in Dark Mode
  const headlightsOn = isDark;

  // Direct Car Click Horn Sound & Visual Flash
  const handleHonk = () => {
    playCarHorn();
    setIsHonking(true);
    setTimeout(() => setIsHonking(false), 500);
  };

  // Global smooth scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const p = Math.min(1, Math.max(0, window.scrollY / totalScroll));
        setScrollProgress(p);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine current storytelling stage based on scroll progress
  // 0.00 - 0.12: Stage 0 (The Icon)
  // 0.12 - 0.28: Stage 1 (Propulsion Architecture)
  // 0.28 - 0.44: Stage 2 (Aerodynamics & Optics)
  // 0.44 - 0.60: Stage 3 (Chassis Dynamics & Suspension)
  // 0.60 - 0.76: Stage 4 (The Horizon Cockpit)
  // 0.76 - 0.90: Stage 5 (900V Hypercharging)
  // 0.90 - 1.00: Stage 6 (Bespoke Studio Configurator)
  const currentStage =
    scrollProgress < 0.12
      ? 0
      : scrollProgress < 0.28
      ? 1
      : scrollProgress < 0.44
      ? 2
      : scrollProgress < 0.60
      ? 3
      : scrollProgress < 0.76
      ? 4
      : scrollProgress < 0.90
      ? 5
      : 6;

  return (
    <div ref={containerRef} className="relative w-full bg-background selection:bg-accent/20">
      {/* ========================================================================= */}
      {/* 1. FIXED 3D CANVAS & BACKDROP VIEWPORT (PERSISTENT BEHIND SCROLL CONTENT) */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden">
        {/* Stage 0 Editorial Typography Backdrop - Strictly isolated to Hero section */}
        {scrollProgress < 0.12 && <HeroBackdrop scrollProgress={scrollProgress} />}

        {/* Ambient Road Lighting Ground Glow when in Dark Mode with Active Headlights */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            headlightsOn && scrollProgress > 0.04 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[80vw] w-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-gradient-to-b from-sky-400/20 via-sky-300/5 dark:from-sky-400/25 dark:via-sky-900/10 to-transparent blur-3xl" />
        </div>

        {/* 3D Car Canvas: Clicking on the car automatically sounds the horn */}
        <div
          onClick={handleHonk}
          className="absolute inset-0 z-10 pointer-events-auto cursor-pointer"
        >
          <CarScene
            model={car.model}
            color={activeColor}
            scrollProgress={scrollProgress}
            headlightsOn={headlightsOn}
            transparentBg={true}
            enableOrbit={scrollProgress >= 0.90}
            autoRotate={scrollProgress >= 0.91}
            onHonk={handleHonk}
          />
        </div>
      </div>

      {/* Horn Audio Feedback Visual Indicator */}
      {isHonking && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-bounce">
          <div className="flex items-center gap-2 rounded-full border border-accent bg-surface/95 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-accent shadow-lg backdrop-blur-md">
            <Volume2 className="h-4 w-4 text-accent animate-pulse" />
            <span>NOVA HORN · BEEP!</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FLOATING HUD TELEMETRY BAR (CLEAN STAGE INDICATOR)                      */}
      {/* ========================================================================= */}
      <aside className="fixed bottom-6 left-6 z-30 pointer-events-none md:bottom-10 md:left-10 transition-opacity duration-300">
        <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-border/80 bg-surface/85 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-text-secondary shadow-xs backdrop-blur-md">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="font-semibold text-text-primary">
            {currentStage === 0 && "01 · THE ICON"}
            {currentStage === 1 && "02 · PROPULSION ARCHITECTURE"}
            {currentStage === 2 && "03 · AERODYNAMIC OPTICS"}
            {currentStage === 3 && "04 · CHASSIS & SUSPENSION"}
            {currentStage === 4 && "05 · THE HORIZON COCKPIT"}
            {currentStage === 5 && "06 · 900V HYPERCHARGING"}
            {currentStage === 6 && "07 · BESPOKE CONFIGURATOR"}
          </span>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 3. SCROLLING STORYTELLING SECTIONS                                        */}
      {/* ========================================================================= */}

      {/* SECTION 1: HERO OVERLAY (0% - 12%) */}
      <section className="pointer-events-none relative z-20 flex min-h-screen flex-col justify-between p-6 md:p-12">
        <div className="pointer-events-auto flex items-start justify-between pt-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col gap-1.5"
          >
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent backdrop-blur-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              AERON GT · GRAND TOURER
            </div>
            <span className="text-xs font-light tracking-wide text-text-secondary">
              Pure Electric Grand Touring Architecture
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="hidden flex-col items-end gap-1 text-right md:flex"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted">
              Telemetry Benchmark
            </span>
            <span className="text-xs font-medium tracking-wider text-text-primary">
              650 HP · 3.1s 0–100 · 320 KM/H
            </span>
          </motion.div>
        </div>

        <div className="pointer-events-auto flex flex-col items-center justify-between gap-6 pb-6 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link href="/models/aeron-gt">
              <Button variant="primary" arrow>
                Explore Aeron GT
              </Button>
            </Link>
            <Link href="/models">
              <Button variant="ghost">The Fleet</Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-text-muted"
          >
            <span>Scroll to Explore</span>
            <ArrowDown className="h-3 w-3 animate-bounce text-accent" />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: PROPULSION ARCHITECTURE (12% - 28%) */}
      {/* Content is on the Left (col-span-5) -> Car is on the RIGHT */}
      <section className="pointer-events-none relative z-20 min-h-screen px-6 py-32 md:px-12 flex items-center">
        <div className="w-full max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Narrative Glass Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="pointer-events-auto lg:col-span-5 flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent backdrop-blur-xs">
              <Zap className="h-3 w-3" /> 02 · PROPULSION ARCHITECTURE
            </div>

            <h2 className="text-[clamp(2.4rem,5.5vw,4.2rem)] font-light leading-[0.96] tracking-[-0.03em] text-text-primary">
              DUAL SILICON-CARBIDE<br />
              <span className="font-extralight text-text-secondary">INSTANT TORQUE</span>
            </h2>

            <p className="text-sm leading-relaxed text-text-secondary max-w-md">
              Powered by twin permanent-magnet synchronous motors generating 650 horsepower and 850 Nm of instantaneous torque.
              Active torque vectoring continuously distributes power to all 4 wheels up to 1,000 times per second.
            </p>

            {/* Spec Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="rounded-2xl border border-border/80 bg-surface/80 p-5 shadow-xs backdrop-blur-md transition-colors hover:border-accent/40">
                <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted flex items-center gap-1.5">
                  <Flame className="h-3 w-3 text-accent" /> Total Output
                </span>
                <p className="mt-2 text-3xl font-light text-text-primary">650 <span className="text-sm text-text-muted">HP</span></p>
                <span className="text-[10px] text-text-muted">Dual Permanent Magnet</span>
              </div>

              <div className="rounded-2xl border border-border/80 bg-surface/80 p-5 shadow-xs backdrop-blur-md transition-colors hover:border-accent/40">
                <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted flex items-center gap-1.5">
                  <Gauge className="h-3 w-3 text-accent" /> Acceleration
                </span>
                <p className="mt-2 text-3xl font-light text-text-primary">3.1 <span className="text-sm text-text-muted">sec</span></p>
                <span className="text-[10px] text-text-muted">0–100 km/h Launch</span>
              </div>

              <div className="rounded-2xl border border-border/80 bg-surface/80 p-5 shadow-xs backdrop-blur-md transition-colors hover:border-accent/40">
                <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted flex items-center gap-1.5">
                  <Wind className="h-3 w-3 text-accent" /> V-Max
                </span>
                <p className="mt-2 text-3xl font-light text-text-primary">320 <span className="text-sm text-text-muted">km/h</span></p>
                <span className="text-[10px] text-text-muted">Electronically Governed</span>
              </div>

              <div className="rounded-2xl border border-border/80 bg-surface/80 p-5 shadow-xs backdrop-blur-md transition-colors hover:border-accent/40">
                <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted flex items-center gap-1.5">
                  <Radio className="h-3 w-3 text-accent" /> Voltage Bus
                </span>
                <p className="mt-2 text-3xl font-light text-text-primary">900 <span className="text-sm text-text-muted">V</span></p>
                <span className="text-[10px] text-text-muted">Ultra-Fast Charging</span>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 h-64 lg:h-auto" />
        </div>
      </section>

      {/* SECTION 3: AERODYNAMIC OPTICS (28% - 44%) */}
      {/* Content is on the RIGHT -> Car is on the LEFT */}
      <section className="pointer-events-none relative z-20 min-h-screen px-6 py-32 md:px-12 flex items-center">
        <div className="w-full max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="hidden lg:block lg:col-span-7" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="pointer-events-auto lg:col-span-5 flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-sky-700 dark:text-sky-300 backdrop-blur-xs">
              <Lightbulb className="h-3 w-3" /> 03 · AERODYNAMIC FLUIDITY & OPTICS
            </div>

            <h2 className="text-[clamp(2.4rem,5.5vw,4.2rem)] font-light leading-[0.96] tracking-[-0.03em] text-text-primary">
              SCULPTED BY AIRFLOW<br />
              <span className="font-extralight text-text-secondary">ACTIVE MATRIX VISION</span>
            </h2>

            <p className="text-sm leading-relaxed text-text-secondary max-w-md">
              Every curve of the Aeron GT channels air velocity to balance low drag with high-speed stability.
              Adaptive matrix headlights adjust beam projection in real-time, casting crisp illumination down every road contour.
            </p>

            <div className="flex flex-col gap-3.5 pt-2">
              <div className="rounded-2xl border border-border/80 bg-surface/80 p-5 shadow-xs backdrop-blur-md flex items-start gap-4 transition-colors hover:border-accent/40">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Wind className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="text-sm font-medium text-text-primary">0.21 Cd Drag Coefficient</h4>
                  <p className="mt-1 text-xs text-text-secondary">Underbody air channels paired with an active multi-stage rear diffuser.</p>
                </div>
              </div>

              <div className="rounded-2xl border border-border/80 bg-surface/80 p-5 shadow-xs backdrop-blur-md flex items-start gap-4 transition-colors hover:border-sky-400/40">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400">
                  <Lightbulb className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="text-sm font-medium text-text-primary">Adaptive Matrix LED Headlights</h4>
                  <p className="mt-1 text-xs text-text-secondary">High-intensity forward projection with precision cornering illumination.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: CHASSIS DYNAMICS & SUSPENSION (44% - 60%) */}
      {/* Content is on the Left -> Car is on the RIGHT */}
      <section className="pointer-events-none relative z-20 min-h-screen px-6 py-32 md:px-12 flex items-center">
        <div className="w-full max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="pointer-events-auto lg:col-span-5 flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-700 dark:text-amber-400 backdrop-blur-xs">
              <Shield className="h-3 w-3" /> 04 · CHASSIS DYNAMICS & CONTROL
            </div>

            <h2 className="text-[clamp(2.4rem,5.5vw,4.2rem)] font-light leading-[0.96] tracking-[-0.03em] text-text-primary">
              ADAPTIVE AIR SUSPENSION<br />
              <span className="font-extralight text-text-secondary">4-WHEEL ACTIVE STEERING</span>
            </h2>

            <p className="text-sm leading-relaxed text-text-secondary max-w-md">
              Triple-chamber air springs read road topography up to 500 times per second to isolate bumps while preserving sharp track response. Rear-axle steering provides effortless city agility and laser-precise high-speed lane transitions.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="rounded-2xl border border-border/80 bg-surface/80 p-5 shadow-xs backdrop-blur-md transition-colors hover:border-accent/40">
                <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted">Braking Disc</span>
                <p className="mt-2 text-2xl font-light text-text-primary">420 <span className="text-sm text-text-muted">mm</span></p>
                <span className="text-[10px] text-text-secondary">Carbon-Ceramic Monobloc</span>
              </div>

              <div className="rounded-2xl border border-border/80 bg-surface/80 p-5 shadow-xs backdrop-blur-md transition-colors hover:border-accent/40">
                <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted">Rear Steering</span>
                <p className="mt-2 text-2xl font-light text-text-primary">±4.5 <span className="text-sm text-text-muted">deg</span></p>
                <span className="text-[10px] text-text-secondary">Counter-phase Agility</span>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 h-64 lg:h-auto" />
        </div>
      </section>

      {/* SECTION 5: THE HORIZON COCKPIT (60% - 76%) */}
      {/* Content is on the RIGHT -> Car is on the LEFT Close-Up */}
      <section className="pointer-events-none relative z-20 min-h-screen px-6 py-32 md:px-12 flex items-center">
        <div className="w-full max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="hidden lg:block lg:col-span-6" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="pointer-events-auto lg:col-span-6 flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent backdrop-blur-xs">
              <Sparkles className="h-3 w-3" /> 05 · BESPOKE CABIN ATELIER
            </div>

            <h2 className="text-[clamp(2.4rem,5.5vw,4.2rem)] font-light leading-[0.96] tracking-[-0.03em] text-text-primary">
              THE HORIZON COCKPIT<br />
              <span className="font-extralight text-text-secondary">AERONAUTICAL INTUITION</span>
            </h2>

            <p className="text-sm leading-relaxed text-text-secondary max-w-lg">
              Crafted around the driver. The seamless curved OLED cockpit pairs tactile milled-aluminum controls,
              customizable ambient glow, and sustainably curated lightweight Alcantara tailoring.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="rounded-2xl border border-border/80 bg-surface/80 p-5 shadow-xs backdrop-blur-md transition-colors hover:border-accent/40">
                <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted">Digital Horizon</span>
                <h4 className="mt-1 text-base font-medium text-text-primary">Curved OLED Cluster</h4>
                <p className="mt-1 text-xs text-text-secondary">Zero-latency biometric telemetry interface.</p>
              </div>

              <div className="rounded-2xl border border-border/80 bg-surface/80 p-5 shadow-xs backdrop-blur-md transition-colors hover:border-accent/40">
                <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted">Acoustic Space</span>
                <h4 className="mt-1 text-base font-medium text-text-primary">18-Speaker Spatial Sound</h4>
                <p className="mt-1 text-xs text-text-secondary">Bespoke active cabin road-noise cancellation.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: 900V HYPERCHARGING ARCHITECTURE (76% - 90%) */}
      {/* Content is on the Left -> Car is on the RIGHT */}
      <section className="pointer-events-none relative z-20 min-h-screen px-6 py-32 md:px-12 flex items-center">
        <div className="w-full max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="pointer-events-auto lg:col-span-5 flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-sky-700 dark:text-sky-300 backdrop-blur-xs">
              <Zap className="h-3 w-3" /> 06 · ULTRA-FAST HYPERCHARGING
            </div>

            <h2 className="text-[clamp(2.4rem,5.5vw,4.2rem)] font-light leading-[0.96] tracking-[-0.03em] text-text-primary">
              10% TO 80% IN 14 MIN<br />
              <span className="font-extralight text-text-secondary">700 KM RANGE (WLTP)</span>
            </h2>

            <p className="text-sm leading-relaxed text-text-secondary max-w-md">
              Next-generation silicon-carbide 900V battery chemistry supports up to 350 kW peak DC hypercharging. Solid-state thermal pre-conditioning ensures maximum charging velocity across all weather extremes.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="rounded-2xl border border-border/80 bg-surface/80 p-5 shadow-xs backdrop-blur-md transition-colors hover:border-sky-400/40">
                <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted">Charge Rate</span>
                <p className="mt-2 text-3xl font-light text-text-primary">350 <span className="text-sm text-text-muted">kW</span></p>
                <span className="text-[10px] text-text-secondary">Peak DC Hypercharger</span>
              </div>

              <div className="rounded-2xl border border-border/80 bg-surface/80 p-5 shadow-xs backdrop-blur-md transition-colors hover:border-sky-400/40">
                <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted">Range (WLTP)</span>
                <p className="mt-2 text-3xl font-light text-text-primary">700 <span className="text-sm text-text-muted">km</span></p>
                <span className="text-[10px] text-text-secondary">High-Density Cell Pack</span>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 h-64 lg:h-auto" />
        </div>
      </section>

      {/* SECTION 7: 360° BESPOKE CONFIGURATOR STUDIO (90% - 100%) */}
      {/* Pure Spacious 3D Car Viewport with Floating Swatches */}
      <section className="pointer-events-none relative z-20 min-h-[140vh] px-6 py-16 md:px-12 flex flex-col justify-start items-center">
        {/* Sleek Minimal Floating Color Swatches Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pointer-events-auto mt-6 flex flex-wrap items-center justify-center gap-4 rounded-full border border-border/80 bg-surface/85 px-6 py-3 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.15)] backdrop-blur-xl"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent pr-2 border-r border-border/80">
            07 · BESPOKE STUDIO
          </span>

          <div className="flex items-center gap-3">
            {car.colors.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveColor(c.hex)}
                title={c.name}
                aria-label={`Select ${c.name} finish`}
                className={`group relative flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                  activeColor === c.hex
                    ? "scale-115 border-accent ring-4 ring-accent/35 shadow-lg"
                    : "border-border/80 hover:scale-110 hover:border-text-secondary"
                }`}
                style={{ backgroundColor: c.hex }}
              >
                {activeColor === c.hex && (
                  <Check
                    className={`h-4 w-4 ${
                      c.hex === "#FFFFFF" || c.hex === "#F5F5F5" || c.hex === "#C0C0C0"
                        ? "text-black"
                        : "text-white"
                    }`}
                  />
                )}
              </button>
            ))}
          </div>

          <span className="text-xs font-medium tracking-wide text-text-primary pl-2 border-l border-border/80">
            {currentColorObj.name}
          </span>
        </motion.div>

        {/* Large, completely open, spacious viewing stage */}
        <div className="w-full flex-1" />
      </section>
    </div>
  );
}
