# TileVault - Tiles Gallery

A modern tile gallery web application built with Next.js, showcasing premium ceramic, marble, porcelain, and artisan tiles.

**Live URL:** [https://tilevault.vercel.app](https://tilevault.vercel.app) *(update after deployment)*

## Purpose

TileVault is a single-page application that allows users to browse, search, and view detailed information about premium tiles. Users can register, log in (including Google OAuth), and manage their profile. Private routes like tile details and profile pages require authentication.

## Key Features

- **Home Page** — Hero banner, scrolling marquee, and featured tiles carousel (SwiperJS)
- **All Tiles Gallery** — Searchable grid of all tiles with real-time filtering
- **Tile Details** — High-resolution preview with creator info, tags, pricing, and specs
- **Authentication** — Email/password login & registration with Google OAuth (BetterAuth + MongoDB)
- **My Profile** — View and update name & profile image
- **Route Protection** — Middleware guards private routes (`/tile/[id]`, `/my-profile`)
- **Responsive Design** — Fully responsive on mobile, tablet, and desktop
- **Loading States** — Spinners shown during data fetching
- **404 Page** — Custom not-found page
- **API Proxy** — Login and registration proxied through Next.js API routes
- **Environment Variables** — Secure configuration for MongoDB, auth secrets, and OAuth keys

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS 4 + DaisyUI 5 | Styling & UI components |
| BetterAuth | Authentication |
| MongoDB | Database (via BetterAuth adapter) |
| JSON Server | Local tile data API |
| SwiperJS | Featured tiles carousel |
| React Hot Toast | Toast notifications |
| Concurrently | Run Next.js + JSON server together |

## NPM Packages Used

- `next`, `react`, `react-dom` — Core framework
- `better-auth` — Authentication with MongoDB adapter
- `mongodb` — Database driver
- `daisyui` — UI component library
- `swiper` — Carousel/slider for featured tiles
- `react-hot-toast` — Toast error/success messages
- `json-server` — REST API for tile data (local dev)
- `concurrently` — Run multiple dev servers

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Google OAuth credentials (optional, for social login)

### Installation

```bash
git clone <your-repo-url>
cd project-8
npm install
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:

```
MONGODB_URI=mongodb+srv://...
MONGODB_DB_NAME=tiles-gallery
BETTER_AUTH_SECRET=your-secret-min-32-chars
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Run Locally

```bash
npm run dev
```

This starts:
- Next.js on `http://localhost:3000`
- JSON Server on `http://localhost:3001`

### Build for Production

```bash
npm run build
npm start
```

## Route Permissions

| Route | Access |
|---|---|
| `/` | Public |
| `/all-tiles` | Public |
| `/login` | Public |
| `/register` | Public |
| `/tile/[id]` | Private (login required) |
| `/my-profile` | Private (login required) |
| `/my-profile/update` | Private (login required) |

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── api/              # API routes (auth, tiles, proxy)
│   ├── all-tiles/        # Gallery page
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   ├── my-profile/       # Profile & update pages
│   └── tile/[id]/        # Tile details page
├── components/           # Reusable UI components
├── lib/                  # Auth, API, types, MongoDB
└── middleware.ts          # Route protection
db/
└── tiles.json            # Tile data for JSON server
```

## Deployment

Deploy to Vercel:

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

The app uses Next.js App Router which handles client-side route reloading natively — no additional SPA configuration needed.

## License

MIT
