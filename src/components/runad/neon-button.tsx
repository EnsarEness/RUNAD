import Link from "next/link";
import { cn } from "@/lib/utils";

type NeonButtonProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  size?: "default" | "lg";
  onClick?: () => void;
};

const baseClasses =
  "inline-flex items-center justify-center rounded-xl bg-primary font-semibold text-primary-foreground neon-glow transition-all hover:bg-primary/90 active:scale-[0.98]";

export function NeonButton({
  children,
  href,
  className,
  size = "default",
  onClick,
}: NeonButtonProps) {
  const classes = cn(
    baseClasses,
    size === "lg" ? "h-12 px-8 text-base" : "h-10 px-6 text-sm",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
