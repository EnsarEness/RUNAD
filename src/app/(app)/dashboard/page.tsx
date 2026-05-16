"use client";

import Link from "next/link";
import {
  Activity,
  Award,
  ChevronRight,
  Clock,
  Flame,
  Footprints,
  MapPin,
  Medal,
  Route,
  Target,
  Trophy,
  TrendingUp,
  Upload,
  Zap,
} from "lucide-react";
import { MobileContainer } from "@/components/layout/mobile-container";
import { GlassCard } from "@/components/runad/glass-card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import { AnimatedStat } from "@/components/dashboard/animated-stat";
import { QuickAction } from "@/components/dashboard/quick-action";

/* ─── MOCK DATA ─── */

const recentRuns = [
  {
    id: 1,
    title: "Morning Tempo",
    city: "Istanbul",
    km: "8.24",
    pace: "5:12",
    time: "42:18",
    cal: 520,
    date: "Today",
    badge: true,
  },
  {
    id: 2,
    title: "Recovery Jog",
    city: "Istanbul",
    km: "5.02",
    pace: "5:45",
    time: "28:52",
    cal: 310,
    date: "Yesterday",
    badge: false,
  },
  {
    id: 3,
    title: "Long Run",
    city: "Kadıköy",
    km: "10.10",
    pace: "5:01",
    time: "50:42",
    cal: 640,
    date: "Mon",
    badge: true,
  },
  {
    id: 4,
    title: "Interval Sprints",
    city: "Beşiktaş",
    km: "6.50",
    pace: "4:48",
    time: "31:12",
    cal: 480,
    date: "Sun",
    badge: false,
  },
];

const cityBadges = [
  { city: "Istanbul", tier: "III", runs: 24, rarity: "Epic", unlocked: true },
  { city: "Kadıköy", tier: "II", runs: 12, rarity: "Rare", unlocked: true },
  { city: "Beşiktaş", tier: "I", runs: 5, rarity: "Common", unlocked: true },
  { city: "Üsküdar", tier: "—", runs: 0, rarity: "Locked", unlocked: false },
];

/* ─── HELPERS ─── */

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

/* ─── PAGE ─── */

export default function DashboardPage() {
  const greeting = getGreeting();

  return (
    <MobileContainer withNav className="space-y-5 pt-6 pb-6">
      {/* ─── HEADER ─── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="size-12 ring-2 ring-primary/40 animate-pulse-glow">
            <AvatarFallback className="bg-gradient-to-br from-primary/30 to-violet-600/30 text-base font-bold text-primary">
              RN
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{greeting} 🏃</p>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary font-medium">runner_nad</span> · Istanbul
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="border-amber-400/30 bg-amber-400/10 text-[10px] text-amber-300 gap-1"
          >
            <Flame className="size-3" />
            7 day streak
          </Badge>
        </div>
      </div>

      {/* ─── CHALLENGE PROGRESS (Main Hero Card) ─── */}
      <GlassCard strong glow className="relative overflow-hidden p-5">
        <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary/10 blur-[60px]" />
        <div className="relative flex items-center gap-5">
          <ProgressRing
            value={42.8}
            max={80}
            size={110}
            strokeWidth={7}
            icon={<Target className="mb-0.5 size-5 text-primary" />}
            label="54%"
            sublabel="42.8 / 80 km"
          />
          <div className="flex-1">
            <Badge className="mb-2 border-0 bg-primary/20 text-[10px] text-primary">
              <Zap className="mr-1 size-3" />
              May Challenge
            </Badge>
            <p className="text-2xl font-bold tabular-nums">
              42.8 <span className="text-base font-normal text-muted-foreground">km</span>
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              37.2 km remaining · 12 days left
            </p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary via-monad-light to-primary transition-all duration-1000"
                style={{ width: "54%" }}
              />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* ─── ANIMATED STATS GRID ─── */}
      <div className="grid grid-cols-2 gap-2.5">
        <AnimatedStat
          label="Total Distance"
          value="412 km"
          icon={Route}
          trend="12.4 km"
          trendUp
          delay={0}
        />
        <AnimatedStat
          label="Current Streak"
          value="7 days"
          icon={Flame}
          trend="2 days"
          trendUp
          delay={80}
        />
        <AnimatedStat
          label="Calories Burned"
          value="28.4k"
          icon={Activity}
          trend="1.9k"
          trendUp
          delay={160}
        />
        <AnimatedStat
          label="NFTs Earned"
          value="3"
          icon={Award}
          trend="1 new"
          trendUp
          delay={240}
        />
      </div>

      {/* ─── QUICK ACTIONS ─── */}
      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-muted-foreground">Quick Actions</h2>
        <QuickAction
          href="/run"
          icon={Footprints}
          label="Start Run"
          description="Begin GPS tracking"
          variant="primary"
        />
        <div className="grid grid-cols-2 gap-2">
          <QuickAction
            href="/run"
            icon={Upload}
            label="Upload"
            description="Import GPX/FIT"
          />
          <QuickAction
            href="/leaderboard"
            icon={Trophy}
            label="Leaderboard"
            description="View rankings"
          />
        </div>
      </section>

      {/* ─── WEEKLY OVERVIEW (Mini rings) ─── */}
      <GlassCard className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold">This Week</h2>
          <span className="text-xs text-primary font-medium">24.3 km</span>
        </div>
        <div className="flex items-center justify-between">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
            const values = [10.1, 0, 5.0, 0, 0, 8.2, 0];
            const hasRun = values[i] > 0;
            const isToday = i === 5;
            return (
              <div key={day} className="flex flex-col items-center gap-1.5">
                <ProgressRing
                  value={values[i]}
                  max={10}
                  size={36}
                  strokeWidth={3}
                  icon={
                    hasRun ? (
                      <Footprints className="size-3 text-primary" />
                    ) : (
                      <span className="size-1.5 rounded-full bg-white/20" />
                    )
                  }
                />
                <span
                  className={`text-[9px] font-medium ${
                    isToday
                      ? "text-primary"
                      : hasRun
                        ? "text-foreground"
                        : "text-muted-foreground/50"
                  }`}
                >
                  {day}
                </span>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* ─── CITY BADGES ─── */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">City Achievements</h2>
          <Link
            href="/profile"
            className="flex items-center gap-0.5 text-xs text-primary"
          >
            All badges <ChevronRight className="size-3" />
          </Link>
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {cityBadges.map((badge, i) => (
            <GlassCard
              key={badge.city}
              glow={badge.rarity === "Epic"}
              className={`min-w-[110px] shrink-0 p-3.5 text-center transition-all ${
                !badge.unlocked ? "opacity-40" : ""
              }`}
            >
              <div
                className={`mx-auto mb-2 flex size-12 items-center justify-center rounded-2xl ${
                  badge.unlocked
                    ? "bg-primary/20 animate-float-slow"
                    : "bg-white/5"
                }`}
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                <MapPin
                  className={`size-5 ${
                    badge.unlocked ? "text-primary" : "text-muted-foreground"
                  }`}
                />
              </div>
              <p className="text-xs font-semibold">{badge.city}</p>
              <p className="mt-0.5 text-[9px] text-muted-foreground">
                {badge.unlocked ? `Tier ${badge.tier} · ${badge.runs} runs` : "Locked"}
              </p>
              {badge.unlocked && (
                <Badge
                  className={`mt-1.5 border-0 text-[8px] ${
                    badge.rarity === "Epic"
                      ? "bg-purple-500/25 text-purple-300"
                      : badge.rarity === "Rare"
                        ? "bg-blue-500/25 text-blue-300"
                        : "bg-white/10 text-muted-foreground"
                  }`}
                >
                  {badge.rarity}
                </Badge>
              )}
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ─── RECENT RUNS ─── */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Recent Runs</h2>
          <Link href="/run" className="text-xs text-primary">
            View all
          </Link>
        </div>
        <div className="space-y-2">
          {recentRuns.map((run) => (
            <GlassCard
              key={run.id}
              className="p-4 transition-all hover:border-primary/20 hover:bg-white/[0.06]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15">
                      <Medal className="size-5 text-primary" />
                    </div>
                    {run.badge && (
                      <div className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-amber-400">
                        <MapPin className="size-2.5 text-black" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{run.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {run.city} · {run.date}
                    </p>
                  </div>
                </div>
                <ChevronRight className="size-4 text-muted-foreground" />
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {[
                  { icon: Route, label: "Dist", value: `${run.km} km` },
                  { icon: Clock, label: "Time", value: run.time },
                  { icon: TrendingUp, label: "Pace", value: `${run.pace}/km` },
                  { icon: Flame, label: "Cal", value: `${run.cal}` },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-lg bg-white/[0.04] px-2 py-1.5 text-center">
                    <stat.icon className="mx-auto mb-0.5 size-3 text-primary" />
                    <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                    <p className="text-xs font-semibold tabular-nums">{stat.value}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ─── MOTIVATION BANNER ─── */}
      <GlassCard className="relative overflow-hidden p-5">
        <div className="absolute -right-6 -bottom-6 size-32 rounded-full bg-primary/10 blur-[40px]" />
        <div className="relative flex items-center gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-violet-600/30 animate-pulse-glow">
            <Zap className="size-7 text-primary" />
          </div>
          <div>
            <p className="font-semibold">You&apos;re on fire!</p>
            <p className="text-xs text-muted-foreground">
              7-day streak. Run 3.1 km more today to unlock{" "}
              <span className="text-primary">Üsküdar NFT Badge</span>.
            </p>
          </div>
        </div>
      </GlassCard>
    </MobileContainer>
  );
}
