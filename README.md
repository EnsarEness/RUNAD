# RUNAD

**Proof of Active Lifestyle** — Social running protocol built on Monad.

RUNAD is a mobile-first Web3 fitness application where users track runs, earn city-based NFT badges, join monthly distance challenges, and build verifiable onchain reputation. Not move-to-earn — proof-of-effort.

> Strava meets Web3 social reputation.

## Features

- **Run Tracking** — Upload GPX/FIT files or connect from Strava, Apple Health, Garmin
- **City NFT Badges** — Mint location-based NFT achievements after verified runs
- **Monthly Challenges** — Join USDC reward pools, compete on distance leaderboards
- **Social Crews** — Create or join local running groups, organize meetups
- **Onchain Reputation** — Permanent, verifiable proof of an active lifestyle
- **Nearby Runners** — Discover runners around you filtered by pace level

## Screenshots

| Landing | Dashboard | Run Upload |
|---------|-----------|------------|
| Futuristic hero with floating NFT badges | Challenge ring, animated stats, weekly overview | 5-stage flow with GPS route visualization |

| Leaderboard | Community | NFT Mint |
|-------------|-----------|----------|
| USDC pool, countdown, podium, rankings | Clubs, events, nearby runners, city groups | Holographic 3D card with tilt effect |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui (Base Nova) |
| Icons | Lucide React |
| Fonts | Geist (body) + Outfit (headings) |
| Blockchain | Monad Testnet (planned) |
| Backend | Supabase (planned) |
| Wallet | wagmi (planned) |

## Design System

- **Background:** Pure black (`#000000`)
- **Primary:** Monad Purple (`#836EF9`) with light (`#A78BFA`) and muted (`#6D5CE8`) variants
- **Style:** Glassmorphism cards, neon glow effects, gradient text
- **Animations:** Float, pulse-glow, shimmer, orbit, page transitions, scroll reveal
- **Typography:** Geist Sans for body, Outfit for headings
- **Layout:** Mobile-first (max-w-lg), bottom navigation bar

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Landing page (marketing)
│   ├── layout.tsx                # Root layout + fonts + dark theme
│   ├── globals.css               # Design tokens + animations
│   └── (app)/
│       ├── layout.tsx            # App shell (gradient bg + bottom nav)
│       ├── loading.tsx           # Loading spinner
│       ├── dashboard/page.tsx    # Home dashboard
│       ├── run/page.tsx          # Run upload (5-stage flow)
│       ├── leaderboard/page.tsx  # Monthly challenge rankings
│       ├── community/page.tsx    # Social features
│       ├── mint/page.tsx         # NFT reward screen
│       └── profile/page.tsx      # User profile + NFT gallery
├── components/
│   ├── runad/                    # Core design components
│   │   ├── glass-card.tsx        # Glassmorphism card
│   │   ├── neon-button.tsx       # Primary/outline CTA
│   │   ├── logo.tsx              # Brand wordmark
│   │   ├── page-header.tsx       # Page title component
│   │   ├── stat-pill.tsx         # Compact stat display
│   │   └── gradient-bg.tsx       # Animated background
│   ├── layout/                   # Structural components
│   │   ├── bottom-nav.tsx        # Fixed bottom navigation
│   │   ├── mobile-container.tsx  # Centered content wrapper
│   │   └── page-wrapper.tsx      # Page transition wrapper
│   ├── dashboard/                # Dashboard-specific
│   │   ├── progress-ring.tsx     # SVG circular progress
│   │   ├── animated-stat.tsx     # Animated stat card
│   │   └── quick-action.tsx      # Action link card
│   ├── landing/                  # Landing page components
│   │   ├── scroll-reveal.tsx     # Intersection observer animation
│   │   ├── section-heading.tsx   # Section title block
│   │   ├── floating-badge.tsx    # Decorative floating badge
│   │   └── animated-counter.tsx  # Count-up animation
│   └── ui/                       # shadcn/ui primitives
└── lib/
    ├── constants.ts              # App name, nav items
    └── utils.ts                  # cn() helper
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Marketing landing with hero, features, NFT showcase, challenges, community, footer |
| `/dashboard` | Challenge progress, animated stats, weekly rings, city badges, recent runs |
| `/run` | Upload flow: idle → uploading → analyzing → ready (GPS map + splits) → success |
| `/leaderboard` | 4,820 USDC pool, live countdown, podium top 3, full rankings with progress bars |
| `/community` | Nearby runners, running clubs, events with RSVP, city communities |
| `/mint` | Holographic NFT card with 3D tilt, shimmer effect, attributes, onchain record |
| `/profile` | NFT gallery, monthly bar chart, achievement timeline, wallet & settings |

## Roadmap

- [ ] Wallet connection (wagmi + Monad)
- [ ] Supabase auth & database
- [ ] Real GPS/GPX file parsing
- [ ] Smart contract deployment (NFT minting)
- [ ] Onchain reputation scoring
- [ ] Real-time leaderboard from chain data
- [ ] Strava/Garmin API integration
- [ ] Push notifications
- [ ] PWA support

## Hackathon

This is an MVP built for a hackathon. The UI is demo-ready with mock data. Backend integrations (wallet, Supabase, Monad contracts) are planned for post-hackathon development.

**Built on Monad.**

## License

MIT
