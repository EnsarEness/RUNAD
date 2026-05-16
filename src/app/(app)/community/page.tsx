import Link from "next/link";
import { MapPin, Users, Calendar, Plus, ChevronRight } from "lucide-react";
import { MobileContainer } from "@/components/layout/mobile-container";
import { GlassCard } from "@/components/runad/glass-card";
import { PageHeader } from "@/components/runad/page-header";
import { NeonButton } from "@/components/runad/neon-button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const crews = [
  {
    name: "Istanbul Sunrise Runners",
    members: 248,
    next: "Sat 6:30 AM · Maçka Park",
    distance: "0.8 km away",
  },
  {
    name: "Kadıköy Night Pace",
    members: 92,
    next: "Fri 8:00 PM · Moda Coast",
    distance: "2.1 km away",
  },
  {
    name: "Monad Marathon Club",
    members: 1204,
    next: "Sun 7:00 AM · Bosphorus Bridge",
    distance: "4.5 km away",
  },
];

const meetups = [
  { title: "5K Social Run", date: "May 18", spots: 12 },
  { title: "Tempo Tuesday", date: "May 20", spots: 8 },
];

export default function CommunityPage() {
  return (
    <MobileContainer withNav className="space-y-6 pt-6 pb-6">
      <PageHeader
        title="Community"
        subtitle="Crews, meetups & nearby runners"
        action={
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary neon-glow-sm"
            aria-label="Create group"
          >
            <Plus className="size-5" />
          </button>
        }
      />

      <GlassCard glow className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/20">
            <MapPin className="size-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-semibold">24 runners near you</p>
            <p className="text-sm text-muted-foreground">Istanbul · Active now</p>
          </div>
        </div>
        <NeonButton href="/community" className="mt-4 w-full justify-center text-sm">
          Explore map
        </NeonButton>
      </GlassCard>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Your Crews</h2>
          <Link href="#" className="text-xs text-primary">
            See all
          </Link>
        </div>
        <div className="space-y-2">
          {crews.map((crew) => (
            <GlassCard key={crew.name} className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{crew.name}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="size-3" />
                    {crew.members} members · {crew.distance}
                  </p>
                </div>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </div>
              <div className="mt-3 flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                <div className="flex items-center gap-2 text-xs">
                  <Calendar className="size-3.5 text-primary" />
                  <span>{crew.next}</span>
                </div>
                <Badge className="border-0 bg-primary/20 text-[10px] text-primary">
                  RSVP
                </Badge>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold">Upcoming Meetups</h2>
        <div className="space-y-2">
          {meetups.map((m) => (
            <GlassCard
              key={m.title}
              className="flex items-center justify-between p-4"
            >
              <div>
                <p className="font-medium">{m.title}</p>
                <p className="text-xs text-muted-foreground">{m.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <Avatar key={i} className="size-6 border-2 border-black">
                      <AvatarFallback className="bg-primary/30 text-[8px]">
                        R{i}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {m.spots} spots
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </MobileContainer>
  );
}
