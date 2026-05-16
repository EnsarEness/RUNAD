import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  strong?: boolean;
  glow?: boolean;
};

export function GlassCard({
  children,
  className,
  strong = false,
  glow = false,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl",
        strong ? "glass-strong" : "glass",
        glow && "neon-glow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
