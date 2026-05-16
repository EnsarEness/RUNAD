import {
  Award,
  Settings,
  Share2,
  Wallet,
  MapPin,
  Shield,
} from "lucide-react";
import { MobileContainer } from "@/components/layout/mobile-container";
import { GlassCard } from "@/components/runad/glass-card";
import { StatPill } from "@/components/runad/stat-pill";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const badges = [
  { city: "Istanbul", tier: "II", rarity: "Rare" },
  { city: "Kadıköy", tier: "I", rarity: "Common" },
  { city: "Beşiktaş", tier: "I", rarity: "Common" },
  { city: "???", tier: "—", rarity: "Locked" },
];

const menuItems = [
  { icon: Wallet, label: "Connected Wallet", value: "0x7a3f...9c2e" },
  { icon: Shield, label: "Onchain Reputation", value: "4,200 pts" },
  { icon: Share2, label: "Share Profile", value: "" },
  { icon: Settings, label: "Settings", value: "" },
];

export default function ProfilePage() {
  return (
    <MobileContainer withNav className="space-y-6 pt-6 pb-6">
      <GlassCard glow className="p-6 text-center">
        <Avatar className="mx-auto size-20 ring-4 ring-primary/30">
          <AvatarFallback className="bg-primary/20 text-2xl font-bold text-primary">
            RN
          </AvatarFallback>
        </Avatar>
        <h1 className="mt-4 text-xl font-bold">runner_nad</h1>
        <p className="text-sm text-muted-foreground">Istanbul · Member since 2026</p>
        <div className="mt-3 flex justify-center gap-2">
          <Badge className="border-0 bg-primary/20 text-primary">
            <Award className="mr-1 size-3" />
            Pro Runner
          </Badge>
          <Badge variant="outline" className="border-white/10">
            Monad
          </Badge>
        </div>
      </GlassCard>

      <div className="grid grid-cols-3 gap-2">
        <StatPill label="Total km" value="412" />
        <StatPill label="Badges" value="3" />
        <StatPill label="Crews" value="2" />
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold">NFT City Badges</h2>
        <div className="grid grid-cols-2 gap-2">
          {badges.map((b) => (
            <GlassCard
              key={b.city}
              className={`p-4 ${b.rarity === "Locked" ? "opacity-50" : ""}`}
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/15">
                <MapPin className="size-4 text-primary" />
              </div>
              <p className="mt-2 font-medium">{b.city}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Tier {b.tier}</span>
                <Badge
                  className={`border-0 text-[9px] ${
                    b.rarity === "Rare"
                      ? "bg-amber-500/20 text-amber-300"
                      : b.rarity === "Locked"
                        ? "bg-white/5 text-muted-foreground"
                        : "bg-primary/20 text-primary"
                  }`}
                >
                  {b.rarity}
                </Badge>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <GlassCard className="divide-y divide-white/[0.06] overflow-hidden">
        {menuItems.map((item, i) => (
          <button
            key={item.label}
            type="button"
            className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-white/[0.04]"
          >
            <item.icon className="size-4 text-primary" />
            <span className="flex-1 text-sm font-medium">{item.label}</span>
            {item.value && (
              <span className="text-xs text-muted-foreground">{item.value}</span>
            )}
            {i < menuItems.length - 1 && item.value === "" && (
              <span className="text-muted-foreground">›</span>
            )}
          </button>
        ))}
      </GlassCard>

      <Separator className="bg-white/10" />

      <p className="text-center text-xs text-muted-foreground">
        Runad v0.1 · Proof of Active Lifestyle
      </p>
    </MobileContainer>
  );
}
