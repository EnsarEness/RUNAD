"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Award,
  Check,
  ChevronRight,
  ExternalLink,
  Flame,
  Globe,
  MapPin,
  Route,
  Share2,
  Shield,
  Sparkles,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import { MobileContainer } from "@/components/layout/mobile-container";
import { GlassCard } from "@/components/runad/glass-card";
import { NeonButton } from "@/components/runad/neon-button";
import { Badge } from "@/components/ui/badge";

/* ─── MOCK NFT DATA ─── */

const NFT = {
  city: "Çanakkale",
  title: "Çanakkale Runner",
  tier: "I",
  rarity: "Rare",
  distance: "5.02 km",
  date: "May 16, 2026",
  tokenId: "#4,207",
  txHash: "0x7a3f8b2c...9e4d1f6a",
  contract: "0xRUNAD...MON4D",
  chain: "Monad Testnet",
  description:
    "Awarded for completing a verified run in Çanakkale. This NFT is permanent onchain proof of your active lifestyle.",
  attributes: [
    { trait: "City", value: "Çanakkale" },
    { trait: "Distance", value: "5.02 km" },
    { trait: "Tier", value: "I" },
    { trait: "Rarity", value: "Rare" },
    { trait: "Pace", value: "5:02/km" },
    { trait: "Elevation", value: "42m" },
  ],
  stats: {
    totalRunners: "2,847",
    cityHolders: "12",
    floorPrice: "0.08 MON",
  },
};

type Phase = "reveal" | "minted";

/* ─── PAGE ─── */

export default function MintPage() {
  const [phase, setPhase] = useState<Phase>("reveal");
  const [showCard, setShowCard] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setShowParticles(true), 200);
    const t2 = setTimeout(() => setShowCard(true), 600);
    const t3 = setTimeout(() => setShowDetails(true), 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltX(y * -15);
    setTiltY(x * 15);
  }

  function handlePointerLeave() {
    setTiltX(0);
    setTiltY(0);
  }

  return (
    <MobileContainer withNav className="relative space-y-5 pt-4 pb-6">
      {/* ─── Ambient particles ─── */}
      {showParticles && (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background:
                  i % 3 === 0
                    ? "#836ef9"
                    : i % 3 === 1
                      ? "#a78bfa"
                      : "#c4b5fd",
                opacity: 0.3 + Math.random() * 0.4,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
          {/* Central glow burst */}
          <div className="absolute left-1/2 top-1/3 size-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px] animate-pulse" />
        </div>
      )}

      {/* ─── Header ─── */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/20">
            <Check className="size-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-semibold">NFT Minted!</p>
            <p className="text-[10px] text-muted-foreground">Monad Testnet</p>
          </div>
        </div>
        <Badge className="border-0 bg-amber-500/20 text-amber-300 text-[10px] gap-1">
          <Sparkles className="size-3" />
          {NFT.rarity}
        </Badge>
      </div>

      {/* ━━━ NFT CARD (Holographic) ━━━ */}
      <div
        className={`relative z-10 transition-all duration-1000 ${
          showCard
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-12 opacity-0 scale-90"
        }`}
      >
        <div
          className="group relative mx-auto max-w-[320px] cursor-pointer"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          style={{
            perspective: "1000px",
          }}
        >
          <div
            className="relative overflow-hidden rounded-3xl transition-transform duration-200 ease-out"
            style={{
              transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Card background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1025] via-[#0d0a14] to-[#150d20]" />

            {/* Holographic overlay */}
            <div
              className="absolute inset-0 opacity-30 mix-blend-overlay"
              style={{
                background: `linear-gradient(
                  ${135 + tiltY * 3}deg,
                  transparent 20%,
                  rgba(131, 110, 249, 0.4) 35%,
                  rgba(167, 139, 250, 0.3) 45%,
                  rgba(196, 181, 253, 0.2) 50%,
                  rgba(131, 110, 249, 0.4) 65%,
                  transparent 80%
                )`,
              }}
            />

            {/* Shimmer sweep */}
            <div
              className="absolute inset-0 animate-shimmer opacity-20"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
              }}
            />

            {/* Border glow */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/[0.12]" />
            <div
              className="absolute inset-0 rounded-3xl animate-pulse-glow"
              style={{ opacity: 0.6 }}
            />

            {/* Card content */}
            <div className="relative p-6">
              {/* Top bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="size-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-primary">
                    Runad
                  </span>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {NFT.tokenId}
                </span>
              </div>

              {/* NFT Visual */}
              <div className="mt-6 flex flex-col items-center">
                {/* Orbiting ring */}
                <div className="relative flex size-36 items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-primary/20" />
                  <div className="absolute inset-3 rounded-full border border-primary/10" />
                  <div className="absolute inset-6 rounded-full border border-white/[0.06]" />

                  {/* Orbiting dot */}
                  <div className="absolute inset-0 animate-orbit" style={{ animationDuration: "8s" }}>
                    <div className="size-2 rounded-full bg-primary neon-glow-sm" />
                  </div>

                  {/* Center badge */}
                  <div className="relative flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 via-violet-600/20 to-primary/30 animate-float-slow neon-glow">
                    <MapPin className="size-10 text-primary drop-shadow-[0_0_12px_rgba(131,110,249,0.8)]" />
                  </div>

                  {/* Corner stars */}
                  <Star
                    className="absolute -right-1 top-4 size-3 text-amber-400 animate-pulse"
                    fill="currentColor"
                  />
                  <Star
                    className="absolute -left-1 bottom-6 size-2.5 text-primary animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                    fill="currentColor"
                  />
                </div>
              </div>

              {/* Title */}
              <div className="mt-6 text-center">
                <h2 className="text-2xl font-bold tracking-tight text-gradient">
                  {NFT.city}
                </h2>
                <p className="mt-1 text-sm font-medium text-monad-light">
                  {NFT.title}
                </p>
              </div>

              {/* Attributes row */}
              <div className="mt-5 grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-white/[0.06] p-2.5 text-center">
                  <Route className="mx-auto size-3.5 text-primary" />
                  <p className="mt-1 text-xs font-semibold">{NFT.distance}</p>
                  <p className="text-[8px] text-muted-foreground">DISTANCE</p>
                </div>
                <div className="rounded-xl bg-white/[0.06] p-2.5 text-center">
                  <Shield className="mx-auto size-3.5 text-primary" />
                  <p className="mt-1 text-xs font-semibold">Tier {NFT.tier}</p>
                  <p className="text-[8px] text-muted-foreground">LEVEL</p>
                </div>
                <div className="rounded-xl bg-white/[0.06] p-2.5 text-center">
                  <Sparkles className="mx-auto size-3.5 text-amber-400" />
                  <p className="mt-1 text-xs font-semibold">{NFT.rarity}</p>
                  <p className="text-[8px] text-muted-foreground">RARITY</p>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-3">
                <div className="flex items-center gap-1.5">
                  <Globe className="size-3 text-primary" />
                  <span className="text-[9px] text-muted-foreground">{NFT.chain}</span>
                </div>
                <span className="text-[9px] text-muted-foreground">{NFT.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ━━━ DETAILS (fade in) ━━━ */}
      <div
        className={`relative z-10 space-y-4 transition-all duration-700 ${
          showDetails
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        {/* Description */}
        <GlassCard className="p-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {NFT.description}
          </p>
        </GlassCard>

        {/* Metadata Attributes */}
        <GlassCard className="p-4">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Award className="size-4 text-primary" />
            Attributes
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {NFT.attributes.map((attr) => (
              <div
                key={attr.trait}
                className="rounded-xl bg-white/[0.04] p-2.5 text-center transition-colors hover:bg-white/[0.08]"
              >
                <p className="text-[8px] uppercase tracking-wider text-primary">
                  {attr.trait}
                </p>
                <p className="mt-0.5 text-xs font-semibold">{attr.value}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Collection Stats */}
        <GlassCard className="p-4">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Trophy className="size-4 text-primary" />
            Collection Stats
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Total Runners", value: NFT.stats.totalRunners, icon: Flame },
              { label: "City Holders", value: NFT.stats.cityHolders, icon: MapPin },
              { label: "Floor Price", value: NFT.stats.floorPrice, icon: Zap },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/[0.04] p-3 text-center">
                <stat.icon className="mx-auto size-4 text-primary" />
                <p className="mt-1.5 text-sm font-bold text-gradient-monad">
                  {stat.value}
                </p>
                <p className="text-[8px] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Transaction Details */}
        <GlassCard className="p-4">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Shield className="size-4 text-primary" />
            Onchain Record
          </h3>
          <div className="space-y-2.5">
            {[
              { label: "Transaction", value: NFT.txHash },
              { label: "Contract", value: NFT.contract },
              { label: "Token ID", value: NFT.tokenId },
              { label: "Network", value: NFT.chain },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2"
              >
                <span className="text-[10px] text-muted-foreground">{row.label}</span>
                <span className="font-mono text-[10px] text-foreground">{row.value}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-white/5 py-2.5 text-xs font-medium text-primary transition-colors hover:bg-white/10"
          >
            <ExternalLink className="size-3" />
            View on Monad Explorer
          </button>
        </GlassCard>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <NeonButton href="/dashboard" className="justify-center gap-1.5">
            Dashboard
            <ChevronRight className="size-4" />
          </NeonButton>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-white/10"
          >
            <Share2 className="size-4 text-primary" />
            Share
          </button>
        </div>

        <p className="text-center text-[10px] text-muted-foreground">
          Proof of Active Lifestyle · Runad Protocol
        </p>
      </div>
    </MobileContainer>
  );
}
