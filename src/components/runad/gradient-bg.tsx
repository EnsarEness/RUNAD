import { cn } from "@/lib/utils";

export function GradientBg({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 mesh-bg",
        className
      )}
    />
  );
}
