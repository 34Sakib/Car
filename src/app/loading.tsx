export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      <p className="text-xs uppercase tracking-[0.5em] text-text-secondary">
        Initializing Experience
      </p>
      <div className="mt-6 h-[2px] w-48 overflow-hidden bg-border">
        <div className="h-full w-1/2 animate-[loading_1.2s_ease-in-out_infinite] bg-accent" />
      </div>
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}