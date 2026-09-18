# Verdiles — marketing site

Marketing site for **Verdiles**, the multi-tenant ecommerce platform by **Designquik**. Agencies and brands launch tenant
storefronts on Verdiles: catalog, themes, apps, settings, and custom-domain go-live from a single multi-tenant admin.

Production domain: **verdiles.com**

Stack: Vite + React + TypeScript + Tailwind CSS v4 + Motion. Self-hosted fonts (Inter + Bodoni Moda), no runtime CDN calls.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build locally
npm run lint     # oxlint
```

Node 20+ is recommended (the site is developed against Node 22).

## Environment variables

Copy `.env.example` to `.env.local` and point the CTAs at the Verdiles admin app:

```bash
cp .env.example .env.local
```

| Variable       | Purpose                                                                         | Default (when unset)     |
| -------------- | ------------------------------------------------------------------------------- | ------------------------ |
| `VITE_APP_URL` | Base URL of the Verdiles admin. `Login` → `$VITE_APP_URL/login`, primary CTAs → `$VITE_APP_URL/signup`. | `https://app.verdiles.com` |

Vite only exposes variables prefixed with `VITE_`, and they are inlined at build time — rebuild after changing them.

## Brand rules

The Verdiles wordmark is a **locked asset**. The official artwork lives in `brand/verdiles-logo-official.png`
(emerald→cyan gradient `VERDILES` wordmark on black). Everything shipped in the UI is derived from that file:

| File                              | Where it is used                       |
| --------------------------------- | -------------------------------------- |
| `src/assets/verdiles-wordmark.png`| Nav, mobile menu, CTA band, footer     |
| `src/assets/verdiles-mark.png`    | The `V` mark inside the admin mock     |
| `public/favicon.ico` / `favicon-192.png` / `favicon-512.png` / `apple-touch-icon.png` | Favicons and installed-app icons |
| `public/og-image.png`             | Open Graph / Twitter card (1200×630)   |

Do not re-typeset the wordmark, recolour it, or substitute another logo. If the wordmark is ever updated, replace
`brand/verdiles-logo-official.png` and regenerate the derived files from it.

Palette (tokens in `src/index.css`):

| Token                    | Value     | Use                                  |
| ------------------------ | --------- | ------------------------------------ |
| `--color-ink-950`        | `#04050a` | Page background (deep charcoal/black)|
| `--color-brand-emerald`  | `#00f57c` | Gradient start                       |
| `--color-brand-teal`     | `#00e3bb` | Gradient midpoint, accents           |
| `--color-brand-cyan`     | `#00c2fe` | Gradient end                         |
| `--color-brand-gold`     | `#e8c77a` | Sparing accents only                 |

White type carries the hierarchy; the gradient is reserved for the wordmark, headline accents, and primary CTAs.

## Structure

```
src/
  App.tsx                 page composition
  index.css               Tailwind v4 theme tokens, base styles, custom utilities
  lib/site.ts             all marketing copy, nav, features, tenants, pricing, links
  lib/hooks.ts            count-up + rotation hooks (both reduced-motion aware)
  components/
    Nav.tsx               sticky nav, mega-menu, mobile sheet
    Hero.tsx              headline, CTAs, cinematic backdrop
    AdminMock.tsx         multi-tenant admin UI mock (pure HTML/CSS/SVG)
    TrustStrip.tsx        segment marquee + stat strip
    Features.tsx          tenant launch, catalog, themes, apps, domains, admin
    Solutions.tsx         agencies, multi-brand groups, franchise/regions
    HowItWorks.tsx        four-step launch path
    Showcase.tsx          switchable tenant storefront mocks
    Pricing.tsx           placeholder tiers
    CtaBand.tsx           closing CTA band
    Footer.tsx            sitemap, socials, legal
    ui/                   Button, Icon, Logo, Reveal, Section primitives
```

Editing copy: change `src/lib/site.ts`. Section anchors (`#product`, `#solutions`, `#how-it-works`, `#showcase`,
`#pricing`) are referenced from the nav and footer, so keep the `id`s in sync if sections are renamed.

## Deploy and point verdiles.com at it

The build output is a fully static `dist/` folder — any static host works.

```bash
npm ci
VITE_APP_URL=https://e-commerce-47038.web.app npm run build
firebase deploy --only hosting:marketing
```

SPA note: this is a single page with hash anchors, so no rewrite rules are required. If routes are added later,
`firebase.json` already rewrites unknown paths to `/index.html`.

**[DEPLOYMENT.md](DEPLOYMENT.md) is the runbook** — it covers the Firebase Hosting setup, the exact DNS steps to put
marketing on `verdiles.com` while the admin app keeps `e-commerce-47038.web.app` and gains `app.verdiles.com`, and the
GitHub Pages preview path.

`BASE_PATH` sets the Vite base for subpath hosting (GitHub Pages project sites). It defaults to `/`, which is what
Firebase Hosting and a custom domain need.

## Accessibility and motion

Motion is decorative: every animation respects `prefers-reduced-motion` (Motion's `useReducedMotion`, plus a global CSS
fallback), the page carries a skip link, focus styles are visible, and the layout is responsive from 360px up.

---

© Verdiles, a Designquik platform.
