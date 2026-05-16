"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  Award,
  Check,
  ChevronRight,
  Clock,
  Flame,
  Globe,
  MapPin,
  Navigation,
  Pause,
  Play,
  Route,
  Sparkles,
  Square,
  Timer,
  TrendingUp,
  Upload,
  Zap,
} from "lucide-react";
import { MobileContainer } from "@/components/layout/mobile-container";
import { GlassCard } from "@/components/runad/glass-card";
import { PageHeader } from "@/components/runad/page-header";
import { NeonButton } from "@/components/runad/neon-button";
import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import { RunMap } from "@/components/map/dynamic-map";
import { useGpsTracking } from "@/hooks/use-gps-tracking";
import { cn } from "@/lib/utils";

function formatDuration(secs: number): string {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)}m`;
  return (meters / 1000).toFixed(2);
}

type Tab = "gps" | "upload";

export default function RunPage() {
  const [tab, setTab] = useState<Tab>("gps");
  const gps = useGpsTracking();

  const distanceKm = gps.stats.distance / 1000;

  return (
    <MobileContainer withNav className="space-y-4 pt-6 pb-6">
      <PageHeader
        title={gps.state === "tracking" ? "Running..." : gps.state === "paused" ? "Paused" : gps.state === "complete" ? "Run Complete" : "Run"}
        subtitle={
          gps.state === "tracking"
            ? "GPS is tracking your route"
            : gps.state === "complete"
              ? "Review your run and submit"
              : "Start a live run or upload activity"
        }
        action={
          gps.state !== "idle" && gps.state !== "complete" ? (
            <Badge className="border-0 bg-red-500/20 text-red-400 text-[10px] gap-1 animate-pulse">
              <span className="size-1.5 rounded-full bg-red-400" />
              LIVE
            </Badge>
          ) : undefined
        }
      />

      {/* ─── MODE TABS (only in idle) ─── */}
      {gps.state === "idle" && (
        <div className="flex gap-1 rounded-xl bg-white/[0.04] p-1">
          {[
            { id: "gps" as Tab, label: "Live GPS", icon: Navigation },
            { id: "upload" as Tab, label: "Upload File", icon: Upload },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-medium transition-all",
                tab === t.id
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <t.icon className="size-3.5" />
              {t.label}
            </button>
          ))}
        </div>
      )}

      {/* ━━━━━━━━━━ IDLE — GPS TAB ━━━━━━━━━━ */}
      {gps.state === "idle" && tab === "gps" && (
        <div className="space-y-4">
          <GlassCard glow className="flex flex-col items-center p-8 text-center">
            <div className="relative">
              <div className="flex size-28 items-center justify-center rounded-full border-2 border-dashed border-primary/30 bg-primary/10 animate-pulse-glow">
                <Navigation className="size-12 text-primary" />
              </div>
              <div className="absolute -right-1 -top-1 flex size-8 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30">
                <MapPin className="size-4 text-white" />
              </div>
            </div>

            <h2 className="mt-6 text-xl font-bold font-heading">Start Running</h2>
            <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
              We&apos;ll track your route with GPS, measure distance, pace, and calories in real-time
            </p>

            {gps.error && (
              <div className="mt-4 w-full rounded-xl bg-red-500/10 border border-red-500/20 p-3">
                <p className="text-xs text-red-400">{gps.error}</p>
              </div>
            )}

            <button
              type="button"
              onClick={gps.start}
              className="mt-6 flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet-600 text-white shadow-xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 neon-glow"
            >
              <Play className="size-8 ml-1" />
            </button>
            <p className="mt-3 text-xs text-muted-foreground">Tap to start</p>
          </GlassCard>

          {/* Tips */}
          <GlassCard className="p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Tips</p>
            <div className="space-y-2.5">
              {[
                { icon: MapPin, text: "Allow location access for GPS tracking" },
                { icon: Zap, text: "Keep your phone unlocked during the run" },
                { icon: Globe, text: "Works best outdoors with clear sky" },
              ].map((tip) => (
                <div key={tip.text} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                  <tip.icon className="size-3.5 shrink-0 text-primary" />
                  <span>{tip.text}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* ━━━━━━━━━━ IDLE — UPLOAD TAB ━━━━━━━━━━ */}
      {gps.state === "idle" && tab === "upload" && (
        <div className="space-y-4">
          <GlassCard glow className="flex flex-col items-center p-8 text-center">
            <div className="relative">
              <div className="flex size-24 items-center justify-center rounded-3xl border-2 border-dashed border-primary/30 bg-primary/10 animate-pulse-glow">
                <Upload className="size-10 text-primary" />
              </div>
              <div className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-primary neon-glow">
                <Zap className="size-4 text-white" />
              </div>
            </div>
            <h2 className="mt-5 text-lg font-semibold">Import Your Run</h2>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground">
              Upload GPX, FIT files or connect from Strava, Apple Health, or Garmin
            </p>
            <div className="mt-6 flex items-center gap-6">
              {[
                { label: "GPX", desc: "GPS data" },
                { label: "FIT", desc: "Garmin" },
                { label: "CSV", desc: "Export" },
              ].map((f) => (
                <div key={f.label} className="text-center">
                  <div className="flex size-10 mx-auto items-center justify-center rounded-lg bg-white/5 text-xs font-bold text-primary">
                    {f.label}
                  </div>
                  <p className="mt-1 text-[9px] text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Or connect
            </p>
            <div className="grid grid-cols-3 gap-2">
              {["Strava", "Apple Health", "Garmin"].map((app) => (
                <button
                  key={app}
                  type="button"
                  className="flex flex-col items-center gap-1.5 rounded-xl bg-white/5 px-3 py-3 text-xs font-medium transition-colors hover:bg-white/10"
                >
                  <Globe className="size-5 text-primary" />
                  {app}
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* ━━━━━━━━━━ TRACKING STATE ━━━━━━━━━━ */}
      {(gps.state === "tracking" || gps.state === "paused") && (
        <div className="space-y-4">
          {/* Live Map */}
          <div className="relative">
            <RunMap
              positions={gps.stats.positions}
              height="h-72"
              followUser={gps.state === "tracking"}
              showMarkers
              interactive={gps.state === "paused"}
            />
            {/* GPS accuracy indicator */}
            <div className="absolute left-3 top-3 z-[1000] flex items-center gap-1.5 rounded-lg bg-black/70 px-2.5 py-1.5 backdrop-blur">
              <span className={cn(
                "size-2 rounded-full",
                gps.state === "tracking" ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              )} />
              <span className="text-[10px] font-medium">
                {gps.state === "tracking" ? "GPS Active" : "Paused"}
              </span>
            </div>
            {gps.stats.positions.length > 0 && (
              <div className="absolute right-3 top-3 z-[1000] rounded-lg bg-black/70 px-2.5 py-1.5 backdrop-blur">
                <span className="text-[10px] text-muted-foreground">
                  {gps.stats.positions.length} pts
                </span>
              </div>
            )}
          </div>

          {/* Live Stats */}
          <GlassCard strong glow className="p-5">
            {/* Main distance */}
            <div className="text-center mb-4">
              <p className="text-5xl font-bold font-heading tabular-nums text-gradient">
                {formatDistance(gps.stats.distance)}
              </p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                {gps.stats.distance >= 1000 ? "Kilometers" : "Meters"}
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-white/[0.04] p-3 text-center">
                <Timer className="mx-auto size-4 text-primary mb-1" />
                <p className="text-lg font-bold tabular-nums">
                  {formatDuration(gps.stats.duration)}
                </p>
                <p className="text-[9px] uppercase text-muted-foreground">Duration</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] p-3 text-center">
                <TrendingUp className="mx-auto size-4 text-primary mb-1" />
                <p className="text-lg font-bold tabular-nums">
                  {gps.stats.pace}
                </p>
                <p className="text-[9px] uppercase text-muted-foreground">Pace /km</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] p-3 text-center">
                <Flame className="mx-auto size-4 text-primary mb-1" />
                <p className="text-lg font-bold tabular-nums">
                  {gps.stats.calories}
                </p>
                <p className="text-[9px] uppercase text-muted-foreground">Calories</p>
              </div>
            </div>
          </GlassCard>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            {gps.state === "tracking" ? (
              <>
                <button
                  type="button"
                  onClick={gps.pause}
                  className="flex size-16 items-center justify-center rounded-full border-2 border-white/10 bg-white/5 text-foreground transition-all hover:bg-white/10 active:scale-90"
                >
                  <Pause className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={gps.stop}
                  className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white shadow-xl shadow-red-500/30 transition-all hover:scale-105 active:scale-90"
                >
                  <Square className="size-8" />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={gps.resume}
                  className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet-600 text-white shadow-xl shadow-primary/30 transition-all hover:scale-105 active:scale-90 neon-glow"
                >
                  <Play className="size-8 ml-1" />
                </button>
                <button
                  type="button"
                  onClick={gps.stop}
                  className="flex size-16 items-center justify-center rounded-full border-2 border-red-500/30 bg-red-500/10 text-red-400 transition-all hover:bg-red-500/20 active:scale-90"
                >
                  <Square className="size-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━ COMPLETE STATE ━━━━━━━━━━ */}
      {gps.state === "complete" && (
        <div className="space-y-4">
          {/* Route Map Summary */}
          {gps.stats.positions.length >= 2 && (
            <GlassCard strong glow className="overflow-hidden p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-primary" />
                  <span className="text-sm font-semibold">Your Route</span>
                </div>
                <Badge className="border-0 bg-emerald-500/20 text-[10px] text-emerald-400">
                  <Check className="mr-0.5 size-3" />
                  GPS Verified
                </Badge>
              </div>
              <RunMap
                positions={gps.stats.positions}
                height="h-48"
                followUser={false}
                showMarkers
                interactive
              />
            </GlassCard>
          )}

          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Route, label: "Distance", value: `${distanceKm.toFixed(2)} km`, highlight: true },
              { icon: Clock, label: "Duration", value: formatDuration(gps.stats.duration), highlight: false },
              { icon: TrendingUp, label: "Avg Pace", value: `${gps.stats.pace}/km`, highlight: false },
            ].map((stat) => (
              <GlassCard
                key={stat.label}
                glow={stat.highlight}
                className="p-3 text-center"
              >
                <stat.icon className="mx-auto size-4 text-primary" />
                <p className="mt-2 text-lg font-bold tabular-nums">{stat.value}</p>
                <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
              </GlassCard>
            ))}
          </div>

          {/* Extra stats */}
          <div className="grid grid-cols-3 gap-2">
            <GlassCard className="p-3 text-center">
              <Flame className="mx-auto size-3.5 text-primary" />
              <p className="mt-1 text-sm font-bold tabular-nums">{gps.stats.calories}</p>
              <p className="text-[8px] uppercase text-muted-foreground">Calories</p>
            </GlassCard>
            <GlassCard className="p-3 text-center">
              <Activity className="mx-auto size-3.5 text-primary" />
              <p className="mt-1 text-sm font-bold tabular-nums">{gps.stats.avgSpeed}</p>
              <p className="text-[8px] uppercase text-muted-foreground">Avg km/h</p>
            </GlassCard>
            <GlassCard className="p-3 text-center">
              <Navigation className="mx-auto size-3.5 text-primary" />
              <p className="mt-1 text-sm font-bold tabular-nums">{gps.stats.positions.length}</p>
              <p className="text-[8px] uppercase text-muted-foreground">GPS Points</p>
            </GlassCard>
          </div>

          {/* NFT Badge Eligible */}
          {distanceKm >= 1 && (
            <GlassCard glow className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-violet-600/30 animate-float-slow">
                  <MapPin className="size-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">City Runner Badge</p>
                  <p className="text-xs text-muted-foreground">
                    NFT Badge Eligible · {distanceKm.toFixed(1)} km run
                  </p>
                </div>
                <Badge className="border-0 bg-amber-500/20 text-amber-300 text-[10px]">
                  <Sparkles className="mr-0.5 size-3" />
                  New!
                </Badge>
              </div>
            </GlassCard>
          )}

          {/* Submit */}
          <NeonButton
            className="w-full justify-center gap-2 animate-pulse-glow"
            size="lg"
            href="/mint"
          >
            <Zap className="size-4" />
            Submit & Verify on Monad
          </NeonButton>

          <p className="text-center text-[10px] text-muted-foreground">
            Activity hash will be stored onchain as proof of run
          </p>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2">
            <NeonButton href="/dashboard" className="justify-center gap-1.5">
              <ChevronRight className="size-4" />
              Dashboard
            </NeonButton>
            <button
              type="button"
              onClick={gps.reset}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-white/10"
            >
              <Play className="size-4 text-primary" />
              New Run
            </button>
          </div>
        </div>
      )}
    </MobileContainer>
  );
}
