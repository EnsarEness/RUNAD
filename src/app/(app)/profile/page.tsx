"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  Calendar,
  ChevronRight,
  Clock,
  Copy,
  ExternalLink,
  Flame,
  Globe,
  Heart,
  MapPin,
  Medal,
  Route,
  Settings,
  Share2,
  Shield,
  Sparkles,
  Star,
  Trophy,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { MobileContainer } from "@/components/layout/mobile-container";
import { GlassCard } from "@/components/runad/glass-card";
import { NeonButton } from "@/components/runad/neon-button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import { AnimatedStat } from "@/components/dashboard/animated-stat";
import { cn } from "@/lib/utils";

/* ─── MOCK DATA ─── */

const PROFILE = {
  name: "runner_nad",
  wallet: "0x7a3f...9c2e",
  walletFull: "0x7a3f8b2c4d1e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9c2e",
  city: "Istanbul",
  joined: "January 2026",
  bio: "Building proof of active lifestyle. Morning runner, onchain believer.",
  rep: 4200,
  level: "Pro Runner",
  streak: 7,
  longestStreak: 22,
};

const lifetimeStats = {
  totalKm: "412",
  totalRuns: "64",
  totalCalories: "28.4k",
  totalTime: "34h 12m",
  avgPace: "5:18",
  cities: "4",
};

const monthlyStats = [
  { month: "May", km: 42.8, runs: 8 },
  { month: "Apr", km: 68.2, runs: 14 },
  { month: "Mar", km: 72.1, runs: 15 },
  { month: "Feb", km: 54.6, runs: 11 },
  { month: "Jan", km: 48.3, runs: 10 },
];

const nftGallery = [
  { city: "Istanbul", tier: "III", rarity: "Epic", runs: 24, date: "Apr 2026", color: "from-purple-500/30 to-violet-600/30" },
  { city: "Kadıköy", tier: "II", rarity: "Rare", runs: 12, date: "Mar 2026", color: "from-blue-500/30 to-indigo-600/30" },
  { city: "Beşiktaş", tier: "I", rarity: "Common", runs: 5, date: "Feb 2026", color: "from-primary/25 to-violet-500/25" },
  { city: "Çanakkale", tier: "I", rarity: "Rare", runs: 1, date: "May 2026", color: "from-amber-500/25 to-orange-500/25" },
];

const achievements = [
  { title: "Çanakkale Runner NFT minted", date: "Today", icon: MapPin, type: "nft" },
  { title: "7-day streak reached", date: "Today", icon: Flame, type: "streak" },
  { title: "400 km milestone", date: "3 days ago", icon: Route, type: "milestone" },
  { title: "Joined Monad Marathon Club", date: "1 week ago", icon: Users, type: "social" },
  { title: "Istanbul Tier III unlocked", date: "2 weeks ago", icon: Trophy, type: "nft" },
  { title: "Monthly challenge: Top 10", date: "Apr 30", icon: Medal, type: "challenge" },
  { title: "22-day streak (personal best)", date: "Mar 18", icon: Star, type: "streak" },
  { title: "First run uploaded", date: "Jan 12", icon: Heart, type: "milestone" },
];

function RarityColor(rarity: string) {
  switch (rarity) {
    case "Legendary": return "bg-amber-500/25 text-amber-300";
    case "Epic": return "bg-purple-500/25 text-purple-300";
    case "Rare": return "bg-blue-500/25 text-blue-300";
    default: return "bg-white/10 text-muted-foreground";
  }
}

function TimelineIcon({ type }: { type: string }) {
  const colors: Record<string, string> = {
    nft: "bg-primary/20 text-primary",
    streak: "bg-amber-500/20 text-amber-400",
    milestone: "bg-emerald-500/20 text-emerald-400",
    social: "bg-blue-500/20 text-blue-400",
    challenge: "bg-purple-500/20 text-purple-300",
  };
  return (
    <div className={cn("flex size-2 rounded-full", colors[type]?.split(" ")[0] ?? "bg-white/10")} />
  );
}

/* ─── PAGE ─── */

export default function ProfilePage() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"nfts" | "stats" | "timeline">("nfts");

  function copyWallet() {
    navigator.clipboard?.writeText(PROFILE.walletFull);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const maxMonthKm = Math.max(...monthlyStats.map((m) => m.km));

  return (
    <MobileContainer withNav className="space-y-5 pt-6 pb-6">
      {/* ─── PROFILE HERO ─── */}
      <GlassCard strong glow className="relative overflow-hidden p-6">
        <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary/15 blur-[60px]" />
        <div className="absolute -left-8 -bottom-8 size-32 rounded-full bg-violet-600/10 blur-[50px]" />

        <div className="relative text-center">
          {/* Avatar */}
          <div className="relative mx-auto w-fit">
            <Avatar className="size-24 ring-4 ring-primary/30 animate-pulse-glow">
              <AvatarFallback className="bg-gradient-to-br from-primary/40 to-violet-600/40 text-3xl font-bold text-primary">
                RN
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-primary neon-glow">
              <Shield className="size-4 text-white" />
            </div>
          </div>

          {/* Name & Info */}
          <h1 className="mt-4 text-2xl font-bold tracking-tight">{PROFILE.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{PROFILE.city} · Since {PROFILE.joined}</p>
          <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground">
            {PROFILE.bio}
          </p>

          {/* Badges */}
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <Badge className="border-0 bg-primary/20 text-primary gap-1">
              <Award className="size-3" />
              {PROFILE.level}
            </Badge>
            <Badge className="border-0 bg-amber-500/20 text-amber-300 gap-1">
              <Flame className="size-3" />
              {PROFILE.streak} day streak
            </Badge>
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary text-[10px]">
              Monad
            </Badge>
          </div>

          {/* Wallet */}
          <button
            type="button"
            onClick={copyWallet}
            className="mt-4 mx-auto flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-1.5 text-xs transition-colors hover:bg-white/[0.08]"
          >
            <Wallet className="size-3 text-primary" />
            <span className="font-mono text-muted-foreground">{PROFILE.wallet}</span>
            <Copy className="size-3 text-muted-foreground" />
            {copied && <span className="text-[10px] text-emerald-400">Copied!</span>}
          </button>
        </div>
      </GlassCard>

      {/* ─── REPUTATION RING + STATS ─── */}
      <div className="flex items-center gap-4">
        <ProgressRing
          value={PROFILE.rep}
          max={10000}
          size={90}
          strokeWidth={6}
          icon={<Shield className="mb-0.5 size-4 text-primary" />}
          label={PROFILE.rep.toLocaleString()}
          sublabel="reputation"
        />
        <div className="grid flex-1 grid-cols-2 gap-2">
          <AnimatedStat label="Total KM" value={lifetimeStats.totalKm} icon={Route} delay={0} />
          <AnimatedStat label="Total Runs" value={lifetimeStats.totalRuns} icon={TrendingUp} delay={80} />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { icon: Flame, label: "Calories", value: lifetimeStats.totalCalories },
          { icon: Clock, label: "Run Time", value: lifetimeStats.totalTime },
          { icon: TrendingUp, label: "Avg Pace", value: lifetimeStats.avgPace },
          { icon: Globe, label: "Cities", value: lifetimeStats.cities },
        ].map((stat, i) => (
          <GlassCard key={stat.label} className="p-2.5 text-center">
            <stat.icon className="mx-auto size-3.5 text-primary" />
            <p className="mt-1 text-sm font-bold tabular-nums">{stat.value}</p>
            <p className="text-[7px] uppercase tracking-wider text-muted-foreground">{stat.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* ─── TAB NAVIGATION ─── */}
      <div className="glass flex rounded-xl p-1">
        {(["nfts", "stats", "timeline"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 rounded-lg py-2 text-xs font-medium transition-all",
              activeTab === tab
                ? "bg-primary text-primary-foreground neon-glow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab === "nfts" ? "NFT Gallery" : tab === "stats" ? "Monthly Stats" : "Timeline"}
          </button>
        ))}
      </div>

      {/* ─── TAB: NFT GALLERY ─── */}
      {activeTab === "nfts" && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">{nftGallery.length} City Badges</h2>
            <Link href="/mint" className="flex items-center text-xs text-primary">
              Latest <ChevronRight className="size-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {nftGallery.map((nft) => (
              <Link href="/mint" key={nft.city}>
                <GlassCard
                  glow={nft.rarity === "Epic"}
                  className="group relative overflow-hidden p-4 transition-all hover:scale-[1.02] hover:border-primary/20"
                >
                  {/* Background gradient */}
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-30", nft.color)} />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-primary/20 transition-all group-hover:animate-float-slow">
                        <MapPin className="size-5 text-primary" />
                      </div>
                      <Badge className={cn("border-0 text-[8px]", RarityColor(nft.rarity))}>
                        {nft.rarity}
                      </Badge>
                    </div>
                    <h3 className="mt-3 font-semibold">{nft.city}</h3>
                    <p className="text-xs text-primary">Tier {nft.tier}</p>
                    <div className="mt-2 flex items-center justify-between text-[9px] text-muted-foreground">
                      <span>{nft.runs} runs</span>
                      <span>{nft.date}</span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>

          {/* Locked badges teaser */}
          <GlassCard className="flex items-center gap-3 p-4 opacity-60">
            <div className="flex size-10 items-center justify-center rounded-xl bg-white/5">
              <Sparkles className="size-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">44 more cities to unlock</p>
              <p className="text-xs text-muted-foreground">Run in new cities to expand your collection</p>
            </div>
          </GlassCard>
        </section>
      )}

      {/* ─── TAB: MONTHLY STATS ─── */}
      {activeTab === "stats" && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold">Monthly Performance</h2>

          {/* Bar chart */}
          <GlassCard className="p-5">
            <div className="flex items-end justify-between gap-2" style={{ height: 140 }}>
              {monthlyStats.map((m, i) => {
                const height = (m.km / maxMonthKm) * 100;
                const isCurrentMonth = i === 0;
                return (
                  <div key={m.month} className="flex flex-1 flex-col items-center gap-1.5">
                    <span className="text-[9px] font-semibold tabular-nums">
                      {m.km}
                    </span>
                    <div className="w-full flex flex-col justify-end" style={{ height: 100 }}>
                      <div
                        className={cn(
                          "w-full rounded-t-lg transition-all duration-700",
                          isCurrentMonth
                            ? "bg-gradient-to-t from-primary to-monad-light neon-glow-sm"
                            : "bg-white/10"
                        )}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <span className={cn(
                      "text-[10px] font-medium",
                      isCurrentMonth ? "text-primary" : "text-muted-foreground"
                    )}>
                      {m.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Month details */}
          <div className="space-y-1.5">
            {monthlyStats.map((m, i) => (
              <GlassCard
                key={m.month}
                className={cn(
                  "flex items-center justify-between p-3",
                  i === 0 && "border-primary/20 bg-primary/[0.04]"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex size-8 items-center justify-center rounded-lg",
                    i === 0 ? "bg-primary/20" : "bg-white/5"
                  )}>
                    <Calendar className={cn("size-3.5", i === 0 ? "text-primary" : "text-muted-foreground")} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{m.month} 2026</p>
                    <p className="text-[10px] text-muted-foreground">{m.runs} runs</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold tabular-nums">{m.km} km</p>
                  <p className="text-[9px] text-muted-foreground">
                    {(m.km / m.runs).toFixed(1)} km/run
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Longest streak */}
          <GlassCard glow className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/20">
              <Star className="size-5 text-amber-400" fill="currentColor" />
            </div>
            <div>
              <p className="text-sm font-semibold">Longest Streak</p>
              <p className="text-xs text-muted-foreground">
                <span className="font-bold text-amber-300">{PROFILE.longestStreak} days</span> — March 2026
              </p>
            </div>
          </GlassCard>
        </section>
      )}

      {/* ─── TAB: TIMELINE ─── */}
      {activeTab === "timeline" && (
        <section className="space-y-1">
          <h2 className="mb-3 text-sm font-semibold">Achievement Timeline</h2>
          {achievements.map((a, i) => (
            <div key={`${a.title}-${i}`} className="flex gap-3">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-lg",
                  a.type === "nft" ? "bg-primary/20" :
                  a.type === "streak" ? "bg-amber-500/20" :
                  a.type === "milestone" ? "bg-emerald-500/20" :
                  a.type === "social" ? "bg-blue-500/20" :
                  "bg-purple-500/20"
                )}>
                  <a.icon className={cn(
                    "size-4",
                    a.type === "nft" ? "text-primary" :
                    a.type === "streak" ? "text-amber-400" :
                    a.type === "milestone" ? "text-emerald-400" :
                    a.type === "social" ? "text-blue-400" :
                    "text-purple-300"
                  )} />
                </div>
                {i < achievements.length - 1 && (
                  <div className="w-px flex-1 bg-white/[0.08] my-1" />
                )}
              </div>
              {/* Content */}
              <GlassCard className="mb-2 flex-1 p-3 transition-all hover:bg-white/[0.06]">
                <p className="text-sm font-medium">{a.title}</p>
                <p className="text-[10px] text-muted-foreground">{a.date}</p>
              </GlassCard>
            </div>
          ))}
        </section>
      )}

      {/* ─── ACTIONS ─── */}
      <GlassCard className="divide-y divide-white/[0.06] overflow-hidden">
        {[
          { icon: Wallet, label: "Connected Wallet", value: PROFILE.wallet, action: "copy" },
          { icon: Shield, label: "Onchain Reputation", value: `${PROFILE.rep.toLocaleString()} pts` },
          { icon: ExternalLink, label: "View on Explorer", value: "" },
          { icon: Share2, label: "Share Profile", value: "" },
          { icon: Settings, label: "Settings", value: "" },
        ].map((item) => (
          <button
            key={item.label}
            type="button"
            className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-white/[0.04]"
          >
            <item.icon className="size-4 text-primary" />
            <span className="flex-1 text-sm font-medium">{item.label}</span>
            {item.value ? (
              <span className="font-mono text-xs text-muted-foreground">{item.value}</span>
            ) : (
              <ChevronRight className="size-4 text-muted-foreground" />
            )}
          </button>
        ))}
      </GlassCard>

      {/* ─── FOOTER ─── */}
      <div className="text-center space-y-2">
        <NeonButton href="/" className="w-full justify-center gap-2">
          <Globe className="size-4" />
          View Public Profile
        </NeonButton>
        <p className="text-[10px] text-muted-foreground">
          Runad v0.1 · Proof of Active Lifestyle · Built on Monad
        </p>
      </div>
    </MobileContainer>
  );
}
