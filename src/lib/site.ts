/**
 * Single source of truth for marketing copy and outbound links.
 * VITE_APP_URL is the Verdiley admin base (platform lock: app.verdiley.com).
 * Login always lands on /login; signup can share that URL or the admin root.
 */
const rawAppUrl = import.meta.env.VITE_APP_URL?.trim()

export const site = {
  name: 'Verdiley',
  parent: 'Designquik',
  domain: 'verdiley.com',
  appUrl: rawAppUrl && rawAppUrl.length > 0 ? rawAppUrl : 'https://app.verdiley.com',
  contactEmail: 'hello@designquik.com',
  tagline: 'Multi-tenant ecommerce platform',
} as const

/**
 * Platform admin is app.verdiley.com. Login CTA is explicit /login.
 * Signup shares the login URL (admin toggles create-account on that screen).
 */
export const adminUrl = site.appUrl.replace(/\/$/, '')
export const loginUrl = `${adminUrl}/login`
export const signupUrl = loginUrl

/** Public Start for free path (marketing SPA). */
export const startFreeUrl = '/start'

/**
 * Intro offer shown on public marketing (copy-only until admin trial billing is wired).
 * Path: 3 days free → $1/month for 3 months → pricing TBD after.
 */
export const offerCopy = {
  headline: 'Start for free',
  subhead: '3 days free, then $1/month for 3 months.',
  cardHint: 'Enter your email to continue. No plan picker — just get started.',
  steps: [
    '3 days free',
    'Then $1/month for 3 months',
    'After that: pricing TBD (confirmed in product or by contact)',
  ],
} as const

export type NavGroup = {
  label: string
  href: string
  menu?: { title: string; description: string; href: string }[]
}

export const navGroups: NavGroup[] = [
  {
    label: 'Product',
    href: '#product',
    menu: [
      {
        title: 'Tenant launch',
        description: 'Stand up a storefront with catalog, pages and settings in minutes.',
        href: '#product',
      },
      {
        title: 'Catalog',
        description: 'Products, variants, media and inventory that scale per tenant.',
        href: '#product',
      },
      { title: 'Themes', description: 'A design system per brand, published instantly.', href: '#product' },
      { title: 'Apps', description: 'Extend a storefront without forking the platform.', href: '#product' },
      { title: 'Custom domains', description: 'DNS walkthrough, automatic TLS, staged go-live.', href: '#product' },
      { title: 'Multi-tenant admin', description: 'Every storefront in one console, with roles.', href: '#product' },
    ],
  },
  {
    label: 'Solutions',
    href: '#solutions',
    menu: [
      { title: 'For agencies', description: 'Launch and operate client storefronts at margin.', href: '#solutions' },
      { title: 'For multi-brand groups', description: 'One platform, many brands, shared ops.', href: '#solutions' },
      { title: 'For franchise & regions', description: 'Regional catalogs and pricing per tenant.', href: '#solutions' },
      { title: 'Showcase', description: 'See the themes teams are shipping today.', href: '#showcase' },
    ],
  },
  { label: 'Start for free', href: startFreeUrl },
]

export const trustSegments = [
  'Fashion & apparel',
  'Beauty & skincare',
  'Outdoor & gear',
  'Home & interiors',
  'Food & beverage',
  'Electronics',
]

export const trustStats = [
  { value: 'Unlimited', label: 'tenants per workspace' },
  { value: '4 min', label: 'median tenant setup' },
  { value: '99.9%', label: 'uptime target' },
  { value: 'Auto TLS', label: 'on every custom domain' },
]

export type Feature = {
  id: string
  eyebrow: string
  title: string
  copy: string
  bullets: string[]
  cols: 1 | 2 | 3
}

export const features: Feature[] = [
  {
    id: 'tenant-launch',
    eyebrow: 'Tenant launch',
    title: 'A new storefront, live before the kickoff call ends',
    copy: 'Create a tenant, pick a starting theme, seed the catalog and hand over a working store on a preview URL the same day.',
    bullets: ['Guided setup with sensible defaults', 'Isolated data and settings per tenant', 'Clone a proven tenant as a template'],
    cols: 2,
  },
  {
    id: 'catalog',
    eyebrow: 'Catalog',
    title: 'Catalog built for real merchandising',
    copy: 'Products, variants, media, collections and inventory that hold up when a client ships 12,000 SKUs instead of twelve.',
    bullets: ['Variant matrix and bulk CSV import', 'Collections, tags and metafields', 'Per-tenant pricing and currency'],
    cols: 1,
  },
  {
    id: 'themes',
    eyebrow: 'Themes',
    title: 'Design that ships without a rebuild',
    copy: 'Start from the theme library, override brand tokens, arrange sections, then publish or roll back in one click.',
    bullets: ['Brand tokens for type, colour, radius', 'Section-level layout editing', 'Draft, preview, publish, revert'],
    cols: 1,
  },
  {
    id: 'apps',
    eyebrow: 'Apps',
    title: 'Extend one tenant, not the whole platform',
    copy: 'Install reviews, subscriptions, loyalty, analytics or your own internal tooling per storefront with scoped permissions.',
    bullets: ['Per-tenant install and config', 'Scoped API keys and webhooks', 'Bring your own private app'],
    cols: 1,
  },
  {
    id: 'domains',
    eyebrow: 'Custom domains',
    title: 'Go live on their domain, not a subdomain',
    copy: 'Verdiley walks the client through DNS, verifies records, issues certificates and flips the storefront live on your signal.',
    bullets: ['Copy-paste DNS instructions', 'Automatic TLS and renewals', 'Staged preview before cutover'],
    cols: 1,
  },
  {
    id: 'admin',
    eyebrow: 'Multi-tenant admin',
    title: 'One console for every storefront you run',
    copy: 'Switch tenants without logging out, give clients scoped access to their own store, and read performance across the whole portfolio.',
    bullets: ['Instant tenant switcher', 'Role-based access for staff and clients', 'Cross-tenant reporting and audit log'],
    cols: 3,
  },
]

export const steps = [
  {
    step: '01',
    title: 'Create the tenant',
    copy: 'Name the storefront, choose a region and currency, and Verdiley provisions an isolated store with its own settings and preview URL.',
    meta: 'Provisioned in seconds',
  },
  {
    step: '02',
    title: 'Load the catalog',
    copy: 'Import products in bulk or build them by hand, then organise collections, media and inventory the way the brand merchandises.',
    meta: 'CSV, API or manual',
  },
  {
    step: '03',
    title: 'Style it, extend it',
    copy: 'Apply a theme, tune the brand tokens, arrange sections and install only the apps that storefront actually needs.',
    meta: 'Themes + apps per tenant',
  },
  {
    step: '04',
    title: 'Point the domain, go live',
    copy: 'Add the custom domain, verify DNS, let TLS issue automatically, and cut over from preview to live when the client says go.',
    meta: 'Automatic TLS',
  },
]

export type Tenant = {
  id: string
  name: string
  domain: string
  vertical: string
  themeName: string
  accent: string
  accentSoft: string
  surface: string
  ink: string
  headline: string
  sub: string
  products: { name: string; price: string; tone: string }[]
  stats: { label: string; value: string }[]
}

export const tenants: Tenant[] = [
  {
    id: 'atelier',
    name: 'Atelier Nord',
    domain: 'ateliernord.com',
    vertical: 'Fashion & apparel',
    themeName: 'Monolith',
    accent: '#e8e4dc',
    accentSoft: 'rgba(232, 228, 220, 0.14)',
    surface: '#111113',
    ink: '#f6f5f2',
    headline: 'The winter tailoring edit',
    sub: 'Structured wool, quiet hardware, made in limited runs.',
    products: [
      { name: 'Oslo Wool Coat', price: '$690', tone: 'linear-gradient(150deg,#3a3a3d,#191a1c)' },
      { name: 'Bergen Knit', price: '$240', tone: 'linear-gradient(150deg,#6d6a61,#2a2926)' },
      { name: 'Fjord Trouser', price: '$310', tone: 'linear-gradient(150deg,#4c4f55,#1d1f22)' },
    ],
    stats: [
      { label: 'Conversion', value: '3.4%' },
      { label: 'AOV', value: '$418' },
      { label: 'Markets', value: '11' },
    ],
  },
  {
    id: 'botanica',
    name: 'Verde Botanica',
    domain: 'verdebotanica.co',
    vertical: 'Beauty & skincare',
    themeName: 'Bloom',
    accent: '#8ef0b2',
    accentSoft: 'rgba(142, 240, 178, 0.16)',
    surface: '#0c1410',
    ink: '#f2fbf5',
    headline: 'Skin, seasonally formulated',
    sub: 'Cold-pressed botanicals in refillable glass. Subscribe and save.',
    products: [
      { name: 'Moss Serum', price: '$64', tone: 'linear-gradient(150deg,#2f7f5b,#0f2a20)' },
      { name: 'Fern Cleanser', price: '$38', tone: 'linear-gradient(150deg,#4aa77b,#123227)' },
      { name: 'Dew Refill Set', price: '$92', tone: 'linear-gradient(150deg,#7fd3a6,#1c4432)' },
    ],
    stats: [
      { label: 'Subscribers', value: '12.8k' },
      { label: 'Repeat rate', value: '47%' },
      { label: 'Apps live', value: '6' },
    ],
  },
  {
    id: 'northbound',
    name: 'Northbound Supply',
    domain: 'northboundsupply.com',
    vertical: 'Outdoor & gear',
    themeName: 'Ridge',
    accent: '#f0b45c',
    accentSoft: 'rgba(240, 180, 92, 0.16)',
    surface: '#100e0c',
    ink: '#fbf5ec',
    headline: 'Built for the long crossing',
    sub: 'Field-tested packs, shells and hardware. Ships in 24 hours.',
    products: [
      { name: 'Traverse 45L', price: '$285', tone: 'linear-gradient(150deg,#7b5a2e,#221a12)' },
      { name: 'Storm Shell', price: '$420', tone: 'linear-gradient(150deg,#52646b,#191f22)' },
      { name: 'Summit Flask', price: '$56', tone: 'linear-gradient(150deg,#a5743a,#2a1d11)' },
    ],
    stats: [
      { label: 'Sessions', value: '1.2M' },
      { label: 'Ship time', value: '24h' },
      { label: 'Regions', value: '4' },
    ],
  },
]

export const solutions = [
  {
    title: 'Agencies & studios',
    copy: 'Turn every client build into recurring platform revenue instead of another bespoke codebase you have to maintain.',
    points: ['Reusable tenant templates', 'Client-scoped logins', 'Portfolio-wide reporting'],
  },
  {
    title: 'Multi-brand groups',
    copy: 'Run each label as its own tenant with its own catalog and theme, while operations, roles and reporting stay shared.',
    points: ['Brand isolation by default', 'Shared staff and permissions', 'Consistent governance'],
  },
  {
    title: 'Franchise & regions',
    copy: 'Give every region a storefront on its own domain with local pricing, currency and inventory — from one admin.',
    points: ['Per-tenant pricing', 'Regional catalogs', 'Domain per market'],
  },
]

export const pricingTiers = [
  {
    name: 'Entrepreneur',
    blurb: 'For founders launching their first Verdiley store.',
    price: '$20',
    priceSuffix: '/mo',
    features: ['1 store', 'Theme library', 'Custom domains + TLS', 'Email support'],
    featured: true,
    ctaLabel: 'Choose Entrepreneur',
  },
  {
    name: 'Business',
    blurb: 'For growing brands running more catalog and volume.',
    price: '$149',
    priceSuffix: '/mo',
    features: ['Multiple stores', 'Tenant templates', 'Priority support', 'Advanced catalog tools'],
    featured: false,
    ctaLabel: 'Choose Business',
  },
  {
    name: 'Enterprise',
    blurb: 'For multi-brand groups with governance requirements.',
    price: '$299',
    priceSuffix: '/mo',
    features: ['Unlimited tenants', 'SSO and audit options', 'Custom apps and integrations', 'Named solutions engineer'],
    featured: false,
    ctaLabel: 'Choose Enterprise',
  },
]

/** Public pricing CTAs land on the live admin pricing page (Stripe checkout). */
export const pricingUrl = `${adminUrl}/pricing`

export const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Tenant launch', href: '#product' },
      { label: 'Catalog', href: '#product' },
      { label: 'Themes', href: '#product' },
      { label: 'Apps', href: '#product' },
      { label: 'Custom domains', href: '#product' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Agencies & studios', href: '#solutions' },
      { label: 'Multi-brand groups', href: '#solutions' },
      { label: 'Franchise & regions', href: '#solutions' },
      { label: 'Showcase', href: '#showcase' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Designquik', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: `mailto:${site.contactEmail}` },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Start for free', href: startFreeUrl },
      { label: 'Documentation', href: '#' },
      { label: 'Status', href: '#' },
    ],
  },
]
