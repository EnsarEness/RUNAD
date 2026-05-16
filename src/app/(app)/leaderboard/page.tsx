"use client";

import { useState, useEffect } from "react";
import {
  Award,
  ChevronRight,
  Clock,
  Crown,
  DollarSign,
  Flame,
  Gift,
  Medal,
  Route,
  Star,
  Target,
  Timer,
  Trophy,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { MobileContainer } from "@/components/layout/mobile-container";
import { GlassCard } from "@/components/runad/glass-card";
import { PageHeader } from "@/components/runad/page-header";
import { NeonButton } from "@/components/runad/neon-button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import { cn } from "@/lib/utils";

/* ─── MOCK DATA ─── */

const POOL = {
  total: "4,820",
  currency: "USDC",
  entry: "10",
  participants: 482,
  topPrize: "1,200",
  top10Prize: "480",
};

const leaders = [
  { rank: 1, name: "alex_runner", km: 312.4, city: "Istanbul", rep: 9840, streak: 28, badge: "Legend" },
  { rank: 2, name: "monad_sprinter", km: 298.1, city: "Singapore", rep: 9210, streak: 22, badge: "Elite" },
  { rank: 3, name: "pace_queen", km: 276.8, city: "London", rep: 8890, streak: 19, badge: "Elite" },
  { rank: 4, name: "swift_fox", km: 201.3, city: "Tokyo", rep: 6420, streak: 15, badge: "Pro" },
  { rank: 5, name: "urban_dash", km: 188.9, city: "Berlin", rep: 5890, streak: 12, badge: "Pro" },
  { rank: 6, name: "runner_nad", km: 142.8, city: "Istanbul", rep: 4200, streak: 7, badge: "Rising", isYou: true },
  { rank: 7, name: "night_jogger", km: 138.2, city: "Berlin", rep: 4100, streak: 9, badge: "Rising" },
  { rank: 8, name: "trail_blazer", km: 131.0, city: "Austin", rep: 3980, streak: 6, badge: "Active" },
  { rank: 9, name: "marathon_mike", km: 124.5, city: "NYC", rep: 3700, streak: 11, badge: "Active" },
  { rank: 10, name: "zen_pacer", km: 118.2, city: "Bali", rep: 3400, streak: 5, badge: "Active" },
];

const maxKm = leaders[0].km;

const rewards = [
  { place: "1st Place", amount: "1,200 USDC", icon: Crown, color: "text-amber-400" },
  { place: "2nd Place", amount: "720 USDC", icon: Medal, color: "text-zinc-300" },
  { place: "3rd Place", amount: "480 USDC", icon: Medal, color: "text-amber-700" },
  { place: "Top 10", amount: "Share of 1,440 USDC", icon: Trophy, color: "text-primary" },
];

/* ─── COUNTDOWN HOOK ─── */

function useCountdown() {
  const [time, setTime] = useState({ days: 12, hours: 8, mins: 42, secs: 15 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { days, hours, mins, secs } = prev;
        secs--;
        if (secs < 0) { secs = 59; mins--; }
        if (mins < 0) { mins = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

/* ─── RANK BADGE ─── */

function RankDisplay({ rank }: { rank: number }) {
  if (rank === 1)
    return (
      <div className="flex size-8 items-center justify-center rounded-lg bg-amber-400/20">
        <Crown className="size-4 text-amber-400" />
      </div>
    );
  if (rank === 2)
    return (
      <div className="flex size-8 items-center justify-center rounded-lg bg-zinc-300/15">
        <Medal className="size-4 text-zinc-300" />
      </div>
    );
  if (rank === 3)
    return (
      <div className="flex size-8 items-center justify-center rounded-lg bg-amber-700/20">
        <Medal className="size-4 text-amber-700" />
      </div>
    );
  return (
    <div className="flex size-8 items-center justify-center rounded-lg bg-white/5">
      <span className="text-sm font-bold text-muted-foreground">{rank}</span>
    </div>
  );
}

function BadgeColor(badge: string) {
  switch (badge) {
    case "Legend": return "bg-amber-500/20 text-amber-300";
    case "Elite": return "bg-purple-500/20 text-purple-300";
    case "Pro": return "bg-blue-500/20 text-blue-300";
    case "Rising": return "bg-emerald-500/20 text-emerald-300";
    default: return "bg-white/10 text-muted-foreground";
  }
}

/* ─── PAGE ─── */

export default function LeaderboardPage() {
  const countdown = useCountdown();
  const [showRewards, setShowRewards] = useState(false);
  const [visibleRows, setVisibleRows] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleRows((prev) => {
        if (prev >= leaders.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <MobileContainer withNav className="space-y-5 pt-6 pb-6">
      {/* ─── HEADER ─── */}
      <PageHeader
        title="Leaderboard"
        subtitle="May Distance Challenge · Global"
        action={
          <div className="flex items-center gap-2">
            <Badge className="border-0 bg-red-500/20 text-red-400 text-[10px] gap-1 animate-pulse">
              <span className="size-1.5 rounded-full bg-red-400" />
              LIVE
            </Badge>
          </div>
        }
      />

      {/* ─── REWARD POOL HERO ─── */}
      <GlassCard strong glow className="relative overflow-hidden p-5">
        <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary/15 blur-[60px]" />
        <div className="absolute -left-10 -bottom-10 size-32 rounded-full bg-amber-500/10 blur-[50px]" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Reward Pool
              </p>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-3xl font-bold text-gradient">{POOL.total}</span>
                <span className="text-sm font-medium text-primary">{POOL.currency}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {POOL.participants} runners · {POOL.entry} USDC entry
              </p>
            </div>
            <ProgressRing
              value={68}
              max={100}
              size={72}
              strokeWidth={5}
              icon={<DollarSign className="size-4 text-primary" />}
              label="68%"
              sublabel="filled"
            />
          </div>

          {/* Countdown */}
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/[0.04] p-3">
            <Timer className="size-4 shrink-0 text-primary" />
            <span className="text-[10px] text-muted-foreground">Ends in</span>
            <div className="flex flex-1 justify-end gap-1.5">
              {[
                { v: countdown.days, l: "D" },
                { v: countdown.hours, l: "H" },
                { v: countdown.mins, l: "M" },
                { v: countdown.secs, l: "S" },
              ].map((t) => (
                <div key={t.l} className="flex items-baseline gap-0.5">
                  <span className="font-mono text-sm font-bold tabular-nums">
                    {String(t.v).padStart(2, "0")}
                  </span>
                  <span className="text-[8px] text-muted-foreground">{t.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* ─── QUICK ACTIONS ─── */}
      <div className="grid grid-cols-2 gap-2">
        <NeonButton className="justify-center gap-2 animate-pulse-glow">
          <Zap className="size-4" />
          Join Challenge
        </NeonButton>
        <button
          type="button"
          onClick={() => setShowRewards(!showRewards)}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium transition-all hover:bg-white/10 hover:border-primary/20"
        >
          <Gift className="size-4 text-primary" />
          {showRewards ? "Hide" : "View"} Rewards
        </button>
      </div>

      {/* ─── REWARDS PANEL ─── */}
      {showRewards && (
        <div className="space-y-2">
          {rewards.map((r) => (
            <GlassCard
              key={r.place}
              className="flex items-center gap-3 p-3.5 transition-all"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-white/5">
                <r.icon className={cn("size-5", r.color)} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{r.place}</p>
              </div>
              <span className="text-sm font-bold text-gradient-monad">{r.amount}</span>
            </GlassCard>
          ))}
        </div>
      )}

      {/* ─── PODIUM ─── */}
      <GlassCard glow className="px-4 pt-4 pb-2">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-1.5 text-sm font-semibold">
            <Trophy className="size-4 text-primary" />
            Top 3
          </h2>
          <Badge className="border-0 bg-primary/15 text-[10px] text-primary">
            {POOL.participants} runners
          </Badge>
        </div>
        <div className="flex items-end justify-center gap-3 pb-2">
          {[1, 0, 2].map((orderIdx) => {
            const u = leaders[orderIdx];
            const podiumHeights = ["h-20", "h-28", "h-16"];
            const podiumColors = [
              "from-zinc-300/20 to-zinc-300/5",
              "from-amber-400/25 to-amber-400/5",
              "from-amber-700/20 to-amber-700/5",
            ];
            const ringColors = [
              "ring-zinc-300/40",
              "ring-amber-400/50",
              "ring-amber-700/40",
            ];
            const avatarSizes = ["size-11", "size-14", "size-10"];
            const idx = orderIdx === 0 ? 1 : orderIdx === 1 ? 0 : 2;

            return (
              <div key={u.name} className="flex flex-col items-center">
                <div className="relative mb-2">
                  <Avatar
                    className={cn(
                      avatarSizes[idx],
                      "ring-2",
                      ringColors[idx],
                      orderIdx === 0 && "animate-pulse-glow"
                    )}
                  >
                    <AvatarFallback className="bg-primary/20 text-xs font-bold text-primary">
                      {u.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {orderIdx === 0 && (
                    <Crown className="absolute -top-2 left-1/2 size-5 -translate-x-1/2 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                  )}
                </div>
                <div
                  className={cn(
                    "flex w-20 flex-col items-center justify-end rounded-t-2xl bg-gradient-to-t",
                    podiumHeights[idx],
                    podiumColors[idx]
                  )}
                >
                  <p className="truncate px-1 text-[10px] font-semibold">
                    {u.name}
                  </p>
                  <p className="text-sm font-bold text-gradient-monad tabular-nums">
                    {u.km}
                  </p>
                  <p className="pb-1.5 text-[8px] text-muted-foreground">{u.city}</p>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* ─── YOUR POSITION ─── */}
      {(() => {
        const you = leaders.find((l) => l.isYou);
        if (!you) return null;
        const behindBy = (leaders[you.rank - 2]?.km ?? 0) - you.km;
        return (
          <GlassCard strong glow className="p-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="size-12 ring-2 ring-primary/50 animate-pulse-glow">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm font-bold">
                    RN
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">
                  {you.rank}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{you.name}</p>
                  <Badge className={cn("border-0 text-[8px]", BadgeColor(you.badge))}>
                    {you.badge}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{you.city} · {you.streak} day streak</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold tabular-nums">{you.km}</p>
                <p className="text-[10px] text-muted-foreground">km</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/[0.04] p-2.5">
              <TrendingUp className="size-3.5 text-primary shrink-0" />
              <p className="text-xs text-muted-foreground">
                Run <span className="font-semibold text-primary">{behindBy.toFixed(1)} km</span> more to reach #{you.rank - 1}
              </p>
            </div>
            {/* Progress to next rank */}
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-monad-light"
                style={{ width: `${(you.km / (leaders[you.rank - 2]?.km ?? you.km)) * 100}%` }}
              />
            </div>
          </GlassCard>
        );
      })()}

      {/* ─── FULL RANKING ─── */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Full Rankings</h2>
          <span className="text-[10px] text-muted-foreground">
            Top {leaders.length} of {POOL.participants}
          </span>
        </div>
        <div className="space-y-1.5">
          {leaders.map((user, i) => {
            const barWidth = (user.km / maxKm) * 100;
            const visible = i < visibleRows;

            return (
              <div
                key={user.rank}
                className={cn(
                  "transition-all duration-500",
                  visible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                )}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <GlassCard
                  className={cn(
                    "relative overflow-hidden p-3 transition-all hover:border-primary/15",
                    user.isYou && "border-primary/30 bg-primary/[0.06]"
                  )}
                >
                  {/* Background bar */}
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary/[0.08] to-transparent transition-all duration-1000"
                    style={{ width: `${barWidth}%` }}
                  />

                  <div className="relative flex items-center gap-2.5">
                    <RankDisplay rank={user.rank} />
                    <Avatar className="size-8">
                      <AvatarFallback
                        className={cn(
                          "text-[10px] font-bold",
                          user.isYou ? "bg-primary text-white" : "bg-white/10"
                        )}
                      >
                        {user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="truncate text-sm font-medium">
                          {user.name}
                          {user.isYou && (
                            <span className="ml-1 text-[10px] text-primary">(you)</span>
                          )}
                        </p>
                        <Badge className={cn("border-0 text-[7px] px-1 py-0", BadgeColor(user.badge))}>
                          {user.badge}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span>{user.city}</span>
                        <span>·</span>
                        <span className="flex items-center gap-0.5">
                          <Flame className="size-2.5 text-amber-400" />
                          {user.streak}d
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold tabular-nums">{user.km} km</p>
                      <p className="text-[9px] text-muted-foreground">
                        {user.rep.toLocaleString()} rep
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── CHALLENGE STATS ─── */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: Users, label: "Runners", value: `${POOL.participants}` },
          { icon: Route, label: "Total KM", value: "18.4k" },
          { icon: Award, label: "NFTs Given", value: "126" },
        ].map((stat) => (
          <GlassCard key={stat.label} className="p-3 text-center">
            <stat.icon className="mx-auto size-4 text-primary" />
            <p className="mt-1.5 text-sm font-bold text-gradient-monad">{stat.value}</p>
            <p className="text-[8px] uppercase text-muted-foreground">{stat.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* ─── BOTTOM CTA ─── */}
      <GlassCard className="relative overflow-hidden p-5">
        <div className="absolute -right-6 -bottom-6 size-28 rounded-full bg-primary/10 blur-[40px]" />
        <div className="relative flex items-center gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-violet-600/30 animate-pulse-glow">
            <Target className="size-7 text-primary" />
          </div>
          <div>
            <p className="font-semibold">Climb the ranks!</p>
            <p className="text-xs text-muted-foreground">
              Every kilometer counts. Run more to earn a bigger share of the <span className="text-primary font-medium">{POOL.total} {POOL.currency}</span> pool.
            </p>
          </div>
        </div>
      </GlassCard>
    </MobileContainer>
  );
}
