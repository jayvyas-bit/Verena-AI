export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-semibold text-slate-900 ${className}`}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600 text-sm font-bold text-white">
        S
      </span>
      ScanPilot
    </span>
  );
}
