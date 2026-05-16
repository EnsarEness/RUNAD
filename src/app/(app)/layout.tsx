import { BottomNav } from "@/components/layout/bottom-nav";
import { GradientBg } from "@/components/runad/gradient-bg";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <GradientBg />
      <main className="relative min-h-screen animate-page-enter">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
