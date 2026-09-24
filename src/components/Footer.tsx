import { footerColumns, loginUrl, signupUrl, site } from '../lib/site'
import { ArrowIcon } from './ui/Button'
import { Wordmark } from './ui/Logo'

const socials = [
  { label: 'LinkedIn', href: '#', path: 'M6 9v10M6 5.5v.01M11 19v-5.5a2.5 2.5 0 015 0V19' },
  { label: 'X', href: '#', path: 'M5 5l14 14M19 5L5 19' },
  { label: 'GitHub', href: '#', path: 'M9 19c-4 1.2-4-2.2-5.5-2.8M15 21v-3.6c0-1 .1-1.4-.5-2 2.3-.3 4.5-1.2 4.5-5a4 4 0 00-1.1-2.8 3.7 3.7 0 00-.1-2.8s-1.2-.4-3.8 1.4a9.3 9.3 0 00-5 0C6.4 3.6 5.2 4 5.2 4a3.7 3.7 0 00-.1 2.8A4 4 0 004 9.6c0 3.8 2.2 4.7 4.5 5-.6.6-.6 1.2-.5 2V21' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/8 bg-black/60 pt-16 pb-10">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <a href="#top" aria-label="Verdiley home" className="inline-block">
              <Wordmark className="h-5" />
            </a>
            <p className="mt-5 max-w-sm text-[0.88rem] leading-relaxed text-white/50">
              {site.name} is the multi-tenant ecommerce platform by {site.parent}. Launch tenant storefronts, operate them from one
              admin, and take custom domains live when the brand is ready.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={signupUrl}
                className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-[0.8rem] font-medium text-white/80 transition hover:border-white/25 hover:text-white"
              >
                Start building
                <ArrowIcon />
              </a>
              <a href={loginUrl} className="text-[0.8rem] text-white/55 transition hover:text-white">
                Login
              </a>
            </div>

            <div className="mt-7 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:border-white/25 hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="text-[0.68rem] font-semibold tracking-[0.2em] text-white/40 uppercase">{column.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-[0.85rem] text-white/60 transition hover:text-white">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="hairline mt-14" />

        <div className="mt-6 flex flex-col-reverse items-center justify-between gap-4 text-[0.75rem] text-white/40 sm:flex-row">
          <p>
            © {year} {site.name}, a {site.parent} platform. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-brand-emerald shadow-[0_0_8px_rgba(0,245,124,0.8)]" />
              All systems operational
            </span>
            <a href="#" className="transition hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition hover:text-white">
              Terms
            </a>
            <a href={`mailto:${site.contactEmail}`} className="transition hover:text-white">
              {site.domain}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
