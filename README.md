# Khaled Mahmoud Helaly — Portfolio (client/)

React + Vite + TypeScript portfolio website.

## Getting started

```bash
cd client
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + production build |
| `npm run typecheck` | Type-check only (no emit) |
| `npm run lint` | Run oxlint |
| `npm run preview` | Preview production build |

## Before going live — things to supply

1. **Portrait** — `client/public/images/profile/khaled.webp` (see `public/images/profile/README.md`)
2. **CV PDF** — `client/public/cv/<name>.pdf`, then set `resumeUrl` in `src/data/profile.ts`
3. **OG image** — `client/public/og-image.png` (1200×630 px)
4. **Domain** — set `VITE_SITE_URL` (copy `.env.example` to `.env.local`)

Full checklist: `docs/content-checklist.md` · SEO guide: `docs/seo.md`

## Architecture

See `docs/architecture.md` for the file tree, data-flow rules, and how to add a section.

## Batch status

See `docs/roadmap.md`.