# كابتن تورز (Captain Tours) - Frontend

Public marketing landing page for Captain Tours, a Hajj/Umrah/tourism agency based in
Ganzour, Menoufia. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4,
GSAP + ScrollTrigger, Framer Motion, Zustand, React Hook Form + Zod, and shadcn/ui.

The site is Arabic-first and fully RTL, and reads its content (trips, branches,
testimonials, FAQs, hero/contact settings) from the existing `../backend` API. The
contact form posts a lead to that API and opens a prefilled WhatsApp chat as a
guaranteed fallback.

## Getting started

1. Copy the env file and adjust if needed:

   ```bash
   cp .env.example .env.local
   ```

2. Make sure the backend API is running (from the `backend/` folder):

   ```bash
   npm run dev
   # first time only: npm run seed
   ```

3. Install dependencies and start the dev server:

   ```bash
   npm install
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable                        | Purpose                                                        |
| -------------------------------- | ---------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`            | Base URL of the backend API (e.g. `http://localhost:5000/api`) |
| `NEXT_PUBLIC_SITE_URL`           | Public URL of this site, used for SEO/OG/sitemap                |
| `NEXT_PUBLIC_WHATSAPP_FALLBACK`  | WhatsApp number used if `Settings.whatsappNumbers` is empty      |

## Scripts

| Script            | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the dev server (Turbopack)         |
| `npm run build`   | Production build                         |
| `npm run start`   | Serve the production build               |
| `npm run lint`    | Run ESLint                               |
| `npm run format`  | Format the codebase with Prettier        |

## Project structure

```
src/
  app/            # routes, layout, metadata (sitemap, robots, manifest, OG image, icons)
  components/
    layout/       # header, mobile drawer, footer, sticky WhatsApp button
    sections/     # one component per homepage section
    trips/        # TripCard, TripsRow (shared across sections)
    forms/        # LeadForm
    ui/           # shadcn/ui primitives
    common/       # SectionHeading, RevealOnScroll, AnimatedCounter, WhatsApp/Phone CTAs
  lib/            # api client, endpoints, whatsapp helpers, gsap setup, seo helpers
  store/          # Zustand UI store (mobile drawer)
  types/          # shared TypeScript types mirroring the backend models
  schemas/        # zod schemas (lead form)
  content/        # all Arabic copy in one place (nav, category labels, why-us bullets)
```

## Notes

- Deployed builds need the production frontend URL added to `backend/.env`'s
  `CORS_ORIGINS` (comma-separated) or API requests from the browser will be blocked.
- `public/hajj-umrah/` and `public/seed-images/` are copied from `dashboard/public/` so
  that seeded `Settings.hero.images` / `Trip.images` relative paths resolve correctly.
- Git hooks: this repo did not have a `.git` folder set up yet, so the Husky pre-commit
  hook (`.husky/pre-commit`, runs `lint-staged`) is prepared but not wired up. Once you
  run `git init` at the repo root, run `npm run prepare` inside `frontend/` once to
  activate it.
