"use client";

import { useState } from "react";
import {
  Upload,
  MapPin,
  Clock,
  Route,
  ImagePlus,
  CheckCircle2,
} from "lucide-react";
import { MobileContainer } from "@/components/layout/mobile-container";
import { GlassCard } from "@/components/runad/glass-card";
import { PageHeader } from "@/components/runad/page-header";
import { NeonButton } from "@/components/runad/neon-button";
import { Badge } from "@/components/ui/badge";

export default function RunUploadPage() {
  const [uploaded, setUploaded] = useState(false);

  return (
    <MobileContainer withNav className="space-y-6 pt-6 pb-6">
      <PageHeader
        title="Upload Run"
        subtitle="Verify your activity and mint city badges"
      />

      <GlassCard glow className="flex flex-col items-center p-8 text-center">
        <div className="flex size-20 items-center justify-center rounded-2xl border border-dashed border-primary/40 bg-primary/10 neon-glow-sm">
          {uploaded ? (
            <CheckCircle2 className="size-10 text-primary" />
          ) : (
            <ImagePlus className="size-10 text-primary" />
          )}
        </div>
        <h2 className="mt-4 text-lg font-semibold">
          {uploaded ? "Run ready to verify" : "Drop your run file"}
        </h2>
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
          GPX, FIT, or screenshot from Strava / Apple Health
        </p>
        {!uploaded && (
          <button
            type="button"
            onClick={() => setUploaded(true)}
            className="mt-6 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/10"
          >
            <Upload className="size-4 text-primary" />
            Select file
          </button>
        )}
      </GlassCard>

      {uploaded && (
        <div className="space-y-3">
          <GlassCard className="p-4">
            <div className="flex items-center gap-3">
              <Route className="size-5 text-primary" />
              <div className="flex-1">
                <p className="font-medium">Morning Run — Istanbul</p>
                <p className="text-xs text-muted-foreground">
                  May 16, 2026 · 07:42 AM
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { icon: Route, label: "Distance", value: "8.24 km" },
                { icon: Clock, label: "Duration", value: "42:18" },
                { icon: MapPin, label: "City", value: "Istanbul" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-white/5 p-3 text-center"
                >
                  <stat.icon className="mx-auto size-4 text-primary" />
                  <p className="mt-1 text-[10px] uppercase text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-sm font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-medium">Eligible NFT Badge</p>
              <p className="text-xs text-muted-foreground">
                Istanbul Runner — Tier II
              </p>
            </div>
            <Badge className="border-0 bg-primary/20 text-primary">Mint</Badge>
          </GlassCard>

          <NeonButton
            className="w-full justify-center"
            onClick={() => setUploaded(false)}
          >
            Submit & Verify on Monad
          </NeonButton>
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground">
        Runs are hashed onchain for proof of activity
      </p>
    </MobileContainer>
  );
}
