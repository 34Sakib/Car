import type { Car } from "@/types/car";

export const cars: Car[] = [
  {
    id: "aeron-gt",
    slug: "aeron-gt",
    name: "Aeron GT",
    tagline: "Engineered for motion.",
    model: "/models/aeron-gt.glb",
    fallbackImage: "/images/aeron-gt-hero.webp",
    performance: {
      horsepower: 650,
      acceleration: "3.1s",
      topSpeed: "320 km/h",
      drivetrain: "AWD",
    },
    colors: [
      { id: "obsidian", name: "Obsidian", hex: "#080808" },
      { id: "silver", name: "Silver", hex: "#C0C0C0" },
      { id: "pearl", name: "Pearl White", hex: "#F5F5F5" },
      { id: "crimson", name: "Crimson", hex: "#7A0F1A" },
      { id: "blue", name: "Deep Blue", hex: "#0B1E3F" },
      { id: "champagne", name: "Champagne", hex: "#C7A86B" },
    ],
    features: [
      { title: "Active Aerodynamics", description: "Adaptive surfaces reshape at speed." },
      { title: "Adaptive Suspension", description: "Reads the road 500× per second." },
      { title: "Digital Cockpit", description: "Curved OLED driver interface." },
      { title: "Premium Audio", description: "18-speaker spatial sound system." },
    ],
  },
  {
    id: "vortex-r",
    slug: "vortex-r",
    name: "Vortex R",
    tagline: "Built for the edge.",
    model: "/models/vortex-r.glb",
    fallbackImage: "/images/vortex-r-hero.webp",
    performance: { horsepower: 720, acceleration: "2.8s", topSpeed: "340 km/h", drivetrain: "AWD" },
    colors: [
      { id: "obsidian", name: "Obsidian", hex: "#080808" },
      { id: "silver", name: "Silver", hex: "#C0C0C0" },
      { id: "crimson", name: "Crimson", hex: "#7A0F1A" },
    ],
  },
  {
    id: "phantom-s",
    slug: "phantom-s",
    name: "Phantom S",
    tagline: "Silence in motion.",
    model: "/models/phantom-s.glb",
    fallbackImage: "/images/phantom-s-hero.webp",
    performance: { horsepower: 580, acceleration: "3.4s", topSpeed: "290 km/h", drivetrain: "RWD" },
    colors: [
      { id: "obsidian", name: "Obsidian", hex: "#080808" },
      { id: "pearl", name: "Pearl White", hex: "#F5F5F5" },
      { id: "champagne", name: "Champagne", hex: "#C7A86B" },
    ],
  },
];

export const getCarBySlug = (slug: string): Car | undefined =>
  cars.find((c) => c.slug === slug);
