"use client";

import { useState, useEffect, useCallback } from "react";
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
  Route,
  Sparkles,
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

/* ─── MOCK DATA: 5K Run in Çanakkale ─── */

const MOCK_RUN = {
  title: "Waterfront Morning Run",
  city: "Çanakkale",
  date: "May 16, 2026",
  time: "07:42 AM",
  distance: "5.02",
  duration: "25:18",
  pace: "5:02",
  avgPace: "5:02",
  bestPace: "4:31",
  calories: "318",
  elevation: "42",
  cadence: "176",
  heartRate: "152",
  splits: [
    { km: 1, pace: "5:14", elev: "+8m" },
    { km: 2, pace: "5:08", elev: "+12m" },
    { km: 3, pace: "4:55", elev: "-4m" },
    { km: 4, pace: "4:48", elev: "-6m" },
    { km: 5, pace: "5:13", elev: "+2m" },
  ],
};

const ROUTE_PATH =
  "M 30 70 Q 45 55, 65 50 Q 85 45, 100 55 Q 115 65, 135 58 Q 155 50, 170 60 Q 185 70, 200 62 Q 215 55, 235 65 Q 255 75, 270 60";

type Stage = "idle" | "uploading" | "analyzing" | "ready" | "submitting" | "success";

/* ─── PAGE ─── */

export default function RunUploadPage() {
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState(0);
  const [routeProgress, setRouteProgress] = useState(0);

  const simulateUpload = useCallback(() => {
    setStage("uploading");
    setProgress(0);

    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setStage("analyzing");
          setTimeout(() => {
            setStage("ready");
            animateRoute();
          }, 1500);
        }, 400);
      } else {
        setProgress(Math.min(p, 99));
      }
    }, 200);
  }, []);

  function animateRoute() {
    let r = 0;
    const interval = setInterval(() => {
      r += 2;
      if (r >= 100) {
        clearInterval(interval);
        setRouteProgress(100);
      } else {
        setRouteProgress(r);
      }
    }, 20);
  }

  function handleSubmit() {
    setStage("submitting");
    setTimeout(() => setStage("success"), 2000);
  }

  function handleReset() {
    setStage("idle");
    setProgress(0);
    setRouteProgress(0);
  }

  return (
    <MobileContainer withNav className="space-y-5 pt-6 pb-6">
      <PageHeader
        title="Upload Run"
        subtitle="Verify your activity on Monad"
        action={
          stage !== "idle" && stage !== "success" ? (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Reset
            </button>
          ) : undefined
        }
      />

      {/* ━━━ IDLE STATE ━━━ */}
      {stage === "idle" && (
        <div className="space-y-4">
          <GlassCard
            glow
            className="flex flex-col items-center p-8 text-center"
          >
            <div className="relative">
              <div className="flex size-24 items-center justify-center rounded-3xl border-2 border-dashed border-primary/30 bg-primary/10 animate-pulse-glow">
                <Upload className="size-10 text-primary" />
              </div>
              <div className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-primary neon-glow">
                <Zap className="size-4 text-white" />
              </div>
            </div>
            <h2 className="mt-5 text-lg font-semibold">
              Import Your Run
            </h2>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground">
              Upload GPX, FIT files or connect from Strava, Apple Health, or Garmin
            </p>

            <button
              type="button"
              onClick={simulateUpload}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground neon-glow transition-all hover:bg-primary/90 active:scale-[0.98]"
            >
              <Upload className="size-4" />
              Select Run File
            </button>

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
                  onClick={simulateUpload}
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

      {/* ━━━ UPLOADING STATE ━━━ */}
      {stage === "uploading" && (
        <GlassCard glow className="flex flex-col items-center p-8 text-center">
          <ProgressRing
            value={progress}
            max={100}
            size={120}
            strokeWidth={6}
            icon={<Upload className="size-6 text-primary animate-bounce" />}
            label={`${Math.round(progress)}%`}
            sublabel="Uploading..."
          />
          <h2 className="mt-5 text-lg font-semibold">Uploading Run Data</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Processing your GPS coordinates...
          </p>
          <div className="mt-4 w-full max-w-xs">
            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-monad-light transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </GlassCard>
      )}

      {/* ━━━ ANALYZING STATE ━━━ */}
      {stage === "analyzing" && (
        <GlassCard glow className="flex flex-col items-center p-8 text-center">
          <div className="flex size-20 items-center justify-center rounded-2xl bg-primary/15 animate-pulse-glow">
            <Activity className="size-10 text-primary animate-pulse" />
          </div>
          <h2 className="mt-5 text-lg font-semibold">Analyzing Activity</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Detecting city, calculating stats, matching NFT badges...
          </p>
          <div className="mt-4 flex items-center gap-2">
            {["GPS", "City", "Stats", "NFT"].map((step, i) => (
              <div key={step} className="flex items-center gap-1">
                <div
                  className="size-2 rounded-full bg-primary animate-pulse"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
                <span className="text-[10px] text-muted-foreground">{step}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* ━━━ READY STATE ━━━ */}
      {stage === "ready" && (
        <div className="space-y-4">
          {/* GPS Route Map */}
          <GlassCard strong glow className="relative overflow-hidden p-5">
            <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary/10 blur-[60px]" />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-primary" />
                  <span className="text-sm font-semibold">Route Map</span>
                </div>
                <Badge className="border-0 bg-emerald-500/20 text-[10px] text-emerald-400">
                  <Check className="mr-0.5 size-3" />
                  Verified GPS
                </Badge>
              </div>
              {/* SVG Route Visualization */}
              <div className="relative h-40 w-full overflow-hidden rounded-xl bg-black/40 border border-white/[0.06]">
                {/* Grid */}
                <svg className="absolute inset-0 h-full w-full opacity-[0.06]">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <line
                      key={`v${i}`}
                      x1={`${(i / 12) * 100}%`}
                      y1="0"
                      x2={`${(i / 12) * 100}%`}
                      y2="100%"
                      stroke="#836ef9"
                      strokeWidth="1"
                    />
                  ))}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <line
                      key={`h${i}`}
                      x1="0"
                      y1={`${(i / 6) * 100}%`}
                      x2="100%"
                      y2={`${(i / 6) * 100}%`}
                      stroke="#836ef9"
                      strokeWidth="1"
                    />
                  ))}
                </svg>
                {/* Route */}
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                  <path
                    d={ROUTE_PATH}
                    fill="none"
                    stroke="rgba(131, 110, 249, 0.15)"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d={ROUTE_PATH}
                    fill="none"
                    stroke="url(#routeGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="1000"
                    strokeDashoffset={1000 - (routeProgress / 100) * 1000}
                    style={{
                      transition: "stroke-dashoffset 0.05s linear",
                      filter: "drop-shadow(0 0 8px rgba(131, 110, 249, 0.6))",
                    }}
                  />
                  <defs>
                    <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6d5ce8" />
                      <stop offset="50%" stopColor="#836ef9" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                  </defs>
                  {/* Start marker */}
                  <circle cx="30" cy="70" r="5" fill="#836ef9" opacity={routeProgress > 0 ? 1 : 0}>
                    <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
                  </circle>
                  {/* End marker */}
                  {routeProgress >= 100 && (
                    <circle cx="270" cy="60" r="5" fill="#a78bfa">
                      <animate attributeName="r" values="4;7;4" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                  )}
                </svg>
                {/* Labels */}
                <div className="absolute left-3 top-2 flex items-center gap-1 rounded-md bg-black/60 px-1.5 py-0.5 text-[9px] text-primary backdrop-blur">
                  <MapPin className="size-2.5" />
                  Çanakkale
                </div>
                <div className="absolute bottom-2 right-3 text-[9px] text-muted-foreground">
                  5.02 km · Waterfront
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Run Info Header */}
          <GlassCard className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/15">
                <Route className="size-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{MOCK_RUN.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {MOCK_RUN.city} · {MOCK_RUN.date} · {MOCK_RUN.time}
                </p>
              </div>
              <Badge className="border-0 bg-primary/20 text-primary text-[10px]">
                5K
              </Badge>
            </div>
          </GlassCard>

          {/* Main Stats */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Route, label: "Distance", value: `${MOCK_RUN.distance} km`, highlight: true },
              { icon: Clock, label: "Duration", value: MOCK_RUN.duration, highlight: false },
              { icon: TrendingUp, label: "Avg Pace", value: `${MOCK_RUN.avgPace}/km`, highlight: false },
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

          {/* Detailed Stats */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: Flame, label: "Calories", value: MOCK_RUN.calories },
              { icon: TrendingUp, label: "Best Pace", value: `${MOCK_RUN.bestPace}/km` },
              { icon: Activity, label: "Elevation", value: `${MOCK_RUN.elevation}m` },
              { icon: Activity, label: "Cadence", value: `${MOCK_RUN.cadence} spm` },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-xl p-2.5 text-center"
              >
                <stat.icon className="mx-auto size-3.5 text-primary" />
                <p className="mt-1 text-xs font-semibold tabular-nums">{stat.value}</p>
                <p className="text-[8px] uppercase text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Km Splits */}
          <GlassCard className="p-4">
            <h3 className="mb-3 text-sm font-semibold flex items-center gap-2">
              <Activity className="size-4 text-primary" />
              Kilometer Splits
            </h3>
            <div className="space-y-1.5">
              {MOCK_RUN.splits.map((split) => {
                const paceSeconds =
                  parseInt(split.pace.split(":")[0]) * 60 +
                  parseInt(split.pace.split(":")[1]);
                const maxPace = 330;
                const minPace = 270;
                const width = Math.max(
                  30,
                  100 - ((paceSeconds - minPace) / (maxPace - minPace)) * 70
                );

                return (
                  <div key={split.km} className="flex items-center gap-3">
                    <span className="w-8 text-right text-xs font-medium text-muted-foreground">
                      {split.km}K
                    </span>
                    <div className="flex-1">
                      <div className="h-6 overflow-hidden rounded-lg bg-white/[0.04]">
                        <div
                          className="flex h-full items-center rounded-lg bg-gradient-to-r from-primary/40 to-primary/20 px-2 transition-all duration-700"
                          style={{ width: `${width}%` }}
                        >
                          <span className="text-[10px] font-semibold tabular-nums">
                            {split.pace}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="w-10 text-right text-[10px] text-muted-foreground">
                      {split.elev}
                    </span>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* NFT Badge Eligible */}
          <GlassCard glow className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-violet-600/30 animate-float-slow">
                <MapPin className="size-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">Çanakkale Runner</p>
                <p className="text-xs text-muted-foreground">
                  City NFT Badge · Tier I · First Run
                </p>
              </div>
              <Badge className="border-0 bg-amber-500/20 text-amber-300 text-[10px]">
                <Sparkles className="mr-0.5 size-3" />
                New!
              </Badge>
            </div>
          </GlassCard>

          {/* Submit Button */}
          <NeonButton
            className="w-full justify-center gap-2 animate-pulse-glow"
            size="lg"
            onClick={handleSubmit}
          >
            <Zap className="size-4" />
            Submit & Verify on Monad
          </NeonButton>

          <p className="text-center text-[10px] text-muted-foreground">
            Activity hash will be stored onchain as proof of run
          </p>
        </div>
      )}

      {/* ━━━ SUBMITTING STATE ━━━ */}
      {stage === "submitting" && (
        <GlassCard glow className="flex flex-col items-center p-10 text-center">
          <div className="relative">
            <ProgressRing
              value={75}
              max={100}
              size={130}
              strokeWidth={5}
              icon={<Zap className="size-7 text-primary" />}
              label="Verifying"
              sublabel="on Monad..."
            />
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }}>
              <div className="absolute left-1/2 top-0 size-2 -translate-x-1/2 rounded-full bg-primary neon-glow-sm" />
            </div>
          </div>
          <h2 className="mt-6 text-lg font-semibold">Submitting to Monad</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Hashing activity data and minting your NFT badge...
          </p>
          <div className="mt-4 space-y-2 w-full max-w-xs">
            {["Hashing GPS data", "Verifying distance", "Minting NFT badge", "Recording onchain"].map(
              (step, i) => (
                <div
                  key={step}
                  className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2 text-xs"
                >
                  <div
                    className="size-2 rounded-full bg-primary animate-pulse"
                    style={{ animationDelay: `${i * 400}ms` }}
                  />
                  <span className="text-muted-foreground">{step}</span>
                </div>
              )
            )}
          </div>
        </GlassCard>
      )}

      {/* ━━━ SUCCESS STATE ━━━ */}
      {stage === "success" && (
        <div className="space-y-4">
          <GlassCard strong glow className="flex flex-col items-center p-8 text-center relative overflow-hidden">
            {/* Decorative particles */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute size-1 rounded-full bg-primary animate-float"
                  style={{
                    left: `${10 + i * 12}%`,
                    top: `${20 + (i % 3) * 25}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${3 + i * 0.5}s`,
                    opacity: 0.4,
                  }}
                />
              ))}
            </div>

            <div className="relative">
              <div className="flex size-24 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500/30 to-primary/30 animate-pulse-glow">
                <Check className="size-12 text-emerald-400" />
              </div>
            </div>

            <h2 className="mt-5 text-xl font-bold text-gradient">
              Run Verified!
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your 5.02 km run in Çanakkale is now onchain
            </p>

            <div className="mt-5 w-full rounded-xl bg-white/[0.04] p-4">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                Transaction
              </p>
              <p className="font-mono text-xs text-primary break-all">
                0x7a3f...9c2e4b8d
              </p>
            </div>
          </GlassCard>

          {/* Earned NFT */}
          <Link href="/mint">
            <GlassCard glow className="p-5 text-center transition-all hover:scale-[1.02] hover:border-primary/30">
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-violet-600/30 animate-float">
                <MapPin className="size-8 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">Çanakkale Runner — Tier I</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                City NFT Badge unlocked! Tap to view.
              </p>
              <Badge className="mt-2 border-0 bg-amber-500/20 text-amber-300 text-[10px]">
                <Award className="mr-1 size-3" />
                New Badge Minted
              </Badge>
            </GlassCard>
          </Link>

          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-2">
            <GlassCard className="p-3 text-center">
              <p className="text-lg font-bold text-gradient-monad">5.02</p>
              <p className="text-[9px] uppercase text-muted-foreground">KM</p>
            </GlassCard>
            <GlassCard className="p-3 text-center">
              <p className="text-lg font-bold text-gradient-monad">25:18</p>
              <p className="text-[9px] uppercase text-muted-foreground">Time</p>
            </GlassCard>
            <GlassCard className="p-3 text-center">
              <p className="text-lg font-bold text-gradient-monad">318</p>
              <p className="text-[9px] uppercase text-muted-foreground">Cal</p>
            </GlassCard>
          </div>

          {/* Actions */}
          <NeonButton href="/mint" size="lg" className="w-full justify-center gap-2">
            <Sparkles className="size-4" />
            View NFT Badge
          </NeonButton>
          <div className="grid grid-cols-2 gap-2">
            <NeonButton href="/dashboard" className="justify-center gap-1.5">
              <ChevronRight className="size-4" />
              Dashboard
            </NeonButton>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-white/10"
            >
              <Upload className="size-4 text-primary" />
              New Run
            </button>
          </div>
        </div>
      )}
    </MobileContainer>
  );
}
