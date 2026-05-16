import { Trophy, Medal, Crown } from "lucide-react";
import { MobileContainer } from "@/components/layout/mobile-container";
import { GlassCard } from "@/components/runad/glass-card";
import { PageHeader } from "@/components/runad/page-header";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const leaders = [
  { rank: 1, name: "alex_runner", km: "312.4", city: "Istanbul", rep: 9840 },
  { rank: 2, name: "monad_sprinter", km: "298.1", city: "Singapore", rep: 9210 },
  { rank: 3, name: "pace_queen", km: "276.8", city: "London", rep: 8890 },
  { rank: 4, name: "you", km: "142.8", city: "Istanbul", rep: 4200, isYou: true },
  { rank: 5, name: "night_jogger", km: "138.2", city: "Berlin", rep: 4100 },
  { rank: 6, name: "trail_blazer", km: "131.0", city: "Austin", rep: 3980 },
];

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Crown className="size-4 text-amber-400" />;
  if (rank === 2) return <Medal className="size-4 text-zinc-300" />;
  if (rank === 3) return <Medal className="size-4 text-amber-700" />;
  return (
    <span className="flex size-6 items-center justify-center text-xs font-bold text-muted-foreground">
      {rank}
    </span>
  );
}

export default function LeaderboardPage() {
  return (
    <MobileContainer withNav className="space-y-6 pt-6 pb-6">
      <PageHeader
        title="Leaderboard"
        subtitle="May Distance Challenge · Global"
        action={
          <Badge
            variant="outline"
            className="border-primary/30 bg-primary/10 text-primary"
          >
            <Trophy className="mr-1 size-3" />
            Live
          </Badge>
        }
      />

      <GlassCard glow className="p-4">
        <div className="flex items-end justify-center gap-4 pt-2">
          {leaders.slice(0, 3).map((user, i) => {
            const heights = ["h-24", "h-32", "h-20"];
            const order = [1, 0, 2];
            const u = leaders[order[i]];
            return (
              <div
                key={u.name}
                className={cn("flex flex-col items-center", i === 1 && "-mt-2")}
              >
                <Avatar
                  className={cn(
                    "mb-2 ring-2",
                    u.rank === 1 ? "size-12 ring-amber-400/50" : "size-10 ring-white/10"
                  )}
                >
                  <AvatarFallback className="bg-primary/20 text-xs text-primary">
                    {u.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "flex w-16 flex-col items-center justify-end rounded-t-xl bg-gradient-to-t from-primary/30 to-primary/5",
                    heights[i]
                  )}
                >
                  <RankIcon rank={u.rank} />
                  <p className="mt-1 truncate px-1 text-[10px] font-medium">
                    {u.name}
                  </p>
                  <p className="pb-2 text-xs font-bold text-monad-light">
                    {u.km}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      <div className="space-y-2">
        {leaders.map((user) => (
          <GlassCard
            key={user.rank}
            className={cn(
              "flex items-center gap-3 p-3",
              user.isYou && "border-primary/40 bg-primary/5 neon-glow-sm"
            )}
          >
            <RankIcon rank={user.rank} />
            <Avatar className="size-9">
              <AvatarFallback
                className={cn(
                  "text-xs",
                  user.isYou
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/10"
                )}
              >
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {user.name}
                {user.isYou && (
                  <span className="ml-1 text-xs text-primary">(you)</span>
                )}
              </p>
              <p className="text-xs text-muted-foreground">{user.city}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold tabular-nums">{user.km} km</p>
              <p className="text-[10px] text-muted-foreground">
                {user.rep.toLocaleString()} rep
              </p>
            </div>
          </GlassCard>
        ))}
      </div>
    </MobileContainer>
  );
}
