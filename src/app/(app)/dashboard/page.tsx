import Link from "next/link";
import {
  Activity,
  Flame,
  MapPin,
  Medal,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { MobileContainer } from "@/components/layout/mobile-container";
import { GlassCard } from "@/components/runad/glass-card";
import { PageHeader } from "@/components/runad/page-header";
import { StatPill } from "@/components/runad/stat-pill";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const recentRuns = [
  { id: 1, city: "Istanbul", km: "8.2", pace: "5:12", date: "Today" },
  { id: 2, city: "Istanbul", km: "5.0", pace: "5:45", date: "Wed" },
  { id: 3, city: "Kadıköy", km: "10.1", pace: "5:01", date: "Mon" },
];

export default function DashboardPage() {
  return (
    <MobileContainer withNav className="space-y-6 pt-6 pb-6">
      <PageHeader
        title="Good morning"
        subtitle="Your active lifestyle streak is on fire"
        action={
          <Avatar className="size-10 ring-2 ring-primary/40">
            <AvatarFallback className="bg-primary/20 text-primary text-sm font-semibold">
              RN
            </AvatarFallback>
          </Avatar>
        }
      />

      <GlassCard glow className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              May Challenge
            </p>
            <p className="mt-1 text-3xl font-bold tabular-nums">42.8</p>
            <p className="text-sm text-muted-foreground">
              / 80 km goal
            </p>
          </div>
          <div className="relative flex size-20 items-center justify-center">
            <svg className="size-20 -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                className="stroke-white/10"
                strokeWidth="3"
              />
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                className="stroke-primary"
                strokeWidth="3"
                strokeDasharray={`${54 * 0.97} 100`}
                strokeLinecap="round"
              />
            </svg>
            <Flame className="absolute size-6 text-primary" />
          </div>
        </div>
        <Progress value={54} className="mt-4 h-1.5 bg-white/10" />
        <p className="mt-2 text-xs text-monad-light">54% complete · 12 days left</p>
      </GlassCard>

      <div className="grid grid-cols-3 gap-2">
        <StatPill label="This week" value="24.3 km" icon={Activity} />
        <StatPill label="Streak" value="7 days" icon={Flame} />
        <StatPill label="Rank" value="#128" icon={TrendingUp} />
      </div>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">City Badges</h2>
          <Link
            href="/profile"
            className="flex items-center text-xs text-primary"
          >
            View all <ChevronRight className="size-3" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
          {["Istanbul", "Kadıköy", "Beşiktaş"].map((city, i) => (
            <GlassCard
              key={city}
              className="min-w-[100px] shrink-0 p-3 text-center"
              glow={i === 0}
            >
              <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-full bg-primary/20">
                <MapPin className="size-4 text-primary" />
              </div>
              <p className="text-xs font-medium">{city}</p>
              <Badge className="mt-1 bg-primary/20 text-[9px] text-primary border-0">
                NFT
              </Badge>
            </GlassCard>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Recent Runs</h2>
          <Link href="/run" className="text-xs text-primary">
            Upload
          </Link>
        </div>
        <div className="space-y-2">
          {recentRuns.map((run) => (
            <GlassCard
              key={run.id}
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/15">
                  <Medal className="size-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{run.km} km</p>
                  <p className="text-xs text-muted-foreground">
                    {run.city} · {run.pace}/km
                  </p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{run.date}</span>
            </GlassCard>
          ))}
        </div>
      </section>
    </MobileContainer>
  );
}
