# Themalikkara — Parish festival website

Static home page for **Themalikkara** (Our Lady of Dolours Church, Kaippattoor), built with **Vite**, **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

Inspired by the [parish website](https://oldchurchkaippattoor.wixsite.com/home). A **collection dashboard** section is included as a teaser for future backend integration.

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Replace placeholder content

| What | Where |
|------|--------|
| All copy, stats, nav | `src/data/siteContent.ts` |
| Hero & festival images | Add JPG/PNG under `public/images/` and update paths in `siteContent.ts` (SVG placeholders included) |
| Themalikkara logo | `public/images/themalikkara-logo.png` (also used as favicon; path in `site.brand`) |
| Vicar photo | `public/images/vicar-placeholder.svg` |
| Other three kara names | `site.themalikkara.karas` in `siteContent.ts` |

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

- `src/pages/HomePage.tsx` — page composition
- `src/components/home/` — sections (hero, units, festivals, etc.)
- `src/components/layout/` — header & footer
- `src/components/ui/` — reusable UI primitives

## Next steps (suggested)

- Add React Router and `/dashboard` route
- Connect dashboard to API (contributions, units, targets)
- Optional: admin panel for updating festival totals
