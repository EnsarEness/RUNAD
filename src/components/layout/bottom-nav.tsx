"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { APP_NAV } from "@/lib/constants";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 safe-bottom">
      <div className="mx-auto max-w-lg px-4 pb-4">
        <div className="glass-strong flex items-center justify-between rounded-2xl px-2 py-2 neon-glow-sm">
          {APP_NAV.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;

            if (item.isCenter) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative -mt-8 flex flex-col items-center"
                >
                  <span
                    className={cn(
                      "flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition-transform active:scale-95 neon-glow",
                      isActive && "ring-2 ring-white/20"
                    )}
                  >
                    <Icon className="size-6" strokeWidth={2.25} />
                  </span>
                  <span className="mt-1 text-[10px] font-medium text-monad-light">
                    {item.label}
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-1 flex-col items-center gap-1 rounded-xl py-2 transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "size-5",
                    isActive &&
                      "drop-shadow-[0_0_8px_rgba(131,110,249,0.8)]"
                  )}
                  strokeWidth={isActive ? 2.25 : 1.75}
                />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
