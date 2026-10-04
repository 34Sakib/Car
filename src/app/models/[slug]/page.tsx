import { cars, getCarBySlug } from "@/data/cars";
import { notFound } from "next/navigation";
import CarViewer from "@/components/cars/CarViewer";

export async function generateStaticParams() {
  return cars.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) return {};
  return { title: `${car.name} — NOVA`, description: car.tagline };
}

export default async function CarPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) notFound();

  return <CarViewer car={car} />;
}