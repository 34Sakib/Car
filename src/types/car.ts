export interface CarColor {
  id: string;
  name: string;
  hex: string;
}

export interface CarHotspot {
  id: string;
  label: string;
  description: string;
  position: [number, number, number];
  cameraTarget?: [number, number, number];
}

export interface CarFeature {
  title: string;
  description: string;
}

export interface Car {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  model: string;
  fallbackImage?: string;
  performance: {
    horsepower: number;
    acceleration: string;
    topSpeed: string;
    drivetrain?: string;
  };
  colors: CarColor[];
  hotspots?: CarHotspot[];
  images?: string[];
  features?: CarFeature[];
}