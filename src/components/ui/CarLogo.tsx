"use client";

interface Props {
  className?: string;
  iconOnly?: boolean;
}

export default function CarLogo({ className = "", iconOnly = false }: Props) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Sleek Vector Supercar Silhouette Emblem */}
      <svg
        className="h-6 w-auto text-accent transition-transform duration-300 group-hover:scale-105"
        viewBox="0 0 54 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 18C7 18 11 16 15 13L21 6C24 3.5 30 3.5 37 6L45 12C48 14 50 16 51 18H2"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 13L24 7C26 5.5 31 5.5 36 7.5L40 13"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="13" cy="18" r="3.5" fill="currentColor" />
        <circle cx="41" cy="18" r="3.5" fill="currentColor" />
        {/* Forward Headlight Ray */}
        <line x1="48" y1="14" x2="52" y2="13.5" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      {!iconOnly && (
        <span className="text-sm font-semibold tracking-[0.35em] uppercase text-text-primary">
          NOVA
        </span>
      )}
    </div>
  );
}
