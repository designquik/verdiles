# Deploying the Verdiles marketing site

Target end state (Shopify-style split):

| Host                 | Serves                     | Firebase Hosting site                  |
| -------------------- | -------------------------- | -------------------------------------- |
| `verdiles.com`       | Marketing site (this repo) | `verdiles-marketing` (new)             |
| `www.verdiles.com`   | Redirect → `verdiles.com`  | `verdiles-marketing` (new)             |
| `app.verdiles.com`   | Admin app                  | `e-commerce-47038` (existing, default) |
| `e-commerce-47038.web.app` | Admin app            | `e-commerce-47038` (existing, default) |

The admin Hosting site is never deleted or redeployed by anything in this repo.

## Where things stand today

Verified against live DNS and HTTP:

- `verdiles.com` → `A 199.36.158.100` (Firebase Hosting) and currently serves the **admin app** (`<title>admin-app</title>`).
- `www.verdiles.com` → `CNAME verdiles.com`, but the Firebase certificate does not cover `www`, so **HTTPS on `www` fails today**
  (`SSL: no alternative certificate subject name matches target host name`). Fixing `www` is part of this cutover.
- `app.verdiles.com` → does not resolve yet (NXDOMAIN).
- Admin is already independently reachable at `https://e-commerce-47038.web.app` and `https://e-commerce-47038.firebaseapp.com`.

Because the apex already points at Firebase Hosting, moving marketing onto `verdiles.com` is a **site-to-site move inside the
same Firebase project** — the registrar A record does not need to change.

## Build

`VITE_APP_URL` is inlined at build time and is where both `Login` and the primary CTAs point. The admin app gates on auth
at its root and toggles between sign in and create account there, so no `/login` or `/signup` path is appended.

```bash
npm ci
VITE_APP_URL=https://e-commerce-47038.web.app npm run build
```

Switch `VITE_APP_URL` to `https://app.verdiles.com` once that subdomain is live (step 2 below), then rebuild and redeploy.

`BASE_PATH` (optional) sets the Vite base for subpath hosting; it defaults to `/`, which is what Firebase Hosting needs.

## Deploy to Firebase Hosting (recommended)

A dedicated Hosting site keeps marketing and admin isolated inside project `e-commerce-47038`. `firebase.json` declares
only the `marketing` target, so `firebase deploy` cannot touch the admin site.

One-time setup:

```bash
npm i -g firebase-tools
firebase login
firebase use e-commerce-47038
firebase hosting:sites:create verdiles-marketing
firebase target:apply hosting marketing verdiles-marketing   # already recorded in .firebaserc
```

Every deploy:

```bash
npm ci
VITE_APP_URL=https://e-commerce-47038.web.app npm run build
firebase deploy --only hosting:marketing
```

That publishes to **https://verdiles-marketing.web.app** — a live URL to review before any DNS change.

## DNS and domain cutover

Do these in order. Step 1 gives admin a permanent home *before* the apex moves, so there is no window where admin is
only reachable at a `.web.app` URL.

### 1. Give admin `app.verdiles.com`

Firebase console → Hosting → site **`e-commerce-47038`** (the admin site) → **Add custom domain** → `app.verdiles.com`.

Add the record Firebase displays at the DNS provider for `verdiles.com`:

| Type | Name  | Value                             |
| ---- | ----- | --------------------------------- |
| `A`  | `app` | the IP Firebase shows (today `199.36.158.100`) |

Use the exact values from the console rather than copying the IP above — Firebase sometimes issues two A records.
Wait for the certificate to go green, then confirm `https://app.verdiles.com` loads the admin app. Admin stays reachable
at `https://e-commerce-47038.web.app` throughout.

### 2. Move `verdiles.com` to the marketing site

Still in the Firebase console, same project:

1. Hosting → site **`e-commerce-47038`** → custom domains → **remove** `verdiles.com`.
2. Hosting → site **`verdiles-marketing`** → **Add custom domain** → `verdiles.com`.
3. Firebase may ask for a one-time `TXT` verification record at the apex — add it, verify, then delete it if Firebase says you can.
4. Keep the existing apex `A 199.36.158.100` record unless the console asks for something different.

The apex A record already points at Firebase, so in most cases nothing changes at the registrar and the switch is
just the domain↔site mapping. Expect a few minutes for the certificate to reissue for the new site.

### 3. Fix `www.verdiles.com`

`www` is currently a `CNAME` to the apex with no matching certificate, which is why HTTPS fails on it today.

Hosting → site **`verdiles-marketing`** → **Add custom domain** → `www.verdiles.com` → choose **redirect to `verdiles.com`**.
Replace the existing `www` `CNAME` with whatever record Firebase specifies. Once the certificate issues,
`https://www.verdiles.com` should 301 to `https://verdiles.com`.

### 4. Repoint the CTAs

With `app.verdiles.com` live, rebuild so Login and the CTAs use the branded host:

```bash
VITE_APP_URL=https://app.verdiles.com npm run build
firebase deploy --only hosting:marketing
```

### Post-cutover checks

- `https://verdiles.com` and `https://www.verdiles.com` serve the marketing site (`<title>Verdiles — …</title>`).
- `https://app.verdiles.com` and `https://e-commerce-47038.web.app` both still serve the admin app.
- The nav `Login` link resolves to the admin login.
- `https://verdiles.com/og-image.png` returns the social card — `index.html` hardcodes absolute `https://verdiles.com` URLs
  for the OG/Twitter tags, so they only resolve correctly once the apex serves marketing.

## Temporary preview on GitHub Pages

`.github/workflows/deploy-pages.yml` builds and publishes this repo to GitHub Pages. It is a **preview path only** —
it does not touch `verdiles.com`, which stays on Firebase throughout.

Pages has to be switched on once by a repo admin (the GitHub Actions token is not allowed to create the Pages site):

**Settings → Pages → Build and deployment → Source: GitHub Actions**

Then re-run the *Deploy marketing site* workflow. The site publishes to `https://designquik.github.io/verdiles/`
(the workflow reads the base path from `actions/configure-pages`, so assets resolve under the `/verdiles/` subpath).

A `gh-pages` branch also exists with a prebuilt copy of the site, so choosing **Source: Deploy from a branch →
`gh-pages` / `(root)`** publishes immediately with no workflow run. Once the Firebase deploy is live, the preview can be
turned off and the `gh-pages` branch deleted.

## Alternative: Vercel

Vercel auto-detects Vite, so no `vercel.json` is needed. Import the repo, set `VITE_APP_URL` in the project's build
environment, and add `verdiles.com` as a domain. This path does require repointing the apex A record away from Firebase,
which is why Firebase Hosting is the recommended option here.
