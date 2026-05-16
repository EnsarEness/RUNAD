import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type StatPillProps = {
  label: string;
  value: string;
  icon?: LucideIcon;
  className?: string;
};

export function StatPill({ label, value, icon: Icon, className }: StatPillProps) {
  return (
    <div
      className={cn(
        "glass flex flex-col gap-1 rounded-xl px-3 py-2.5 min-w-0",
        className
      )}
    >
      <div className="flex items-center gap-1.5">
        {Icon && <Icon className="size-3.5 text-primary shrink-0" />}
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground truncate">
          {label}
        </span>
      </div>
      <span className="text-lg font-semibold tabular-nums">{value}</span>
    </div>
  );
}
