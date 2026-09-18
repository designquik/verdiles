import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

import { loginUrl, navGroups, signupUrl, site } from '../lib/site'
import { ArrowIcon, ButtonLink } from './ui/Button'
import { Icon } from './ui/Icon'
import { Wordmark } from './ui/Logo'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <div className="relative z-50 hidden border-b border-white/5 bg-black/60 backdrop-blur-sm lg:block">
        <div className="shell flex h-9 items-center justify-between text-[0.72rem] tracking-wide text-white/50">
          <p className="flex items-center gap-2">
            <span className="size-1 rotate-45 bg-brand-gold/80" />
            <span className="text-white/65">Verdiles is a {site.parent} platform.</span>
            <span>Early partner program is open for agencies.</span>
          </p>
          <a href={`mailto:${site.contactEmail}`} className="group flex items-center gap-1.5 transition hover:text-white">
            {site.contactEmail}
            <ArrowIcon className="size-3" />
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled ? 'border-b border-white/8 bg-ink-950/80 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <nav className="shell flex h-17 items-center justify-between gap-6" aria-label="Main">
          <a href="#top" className="group flex items-center gap-3" aria-label="Verdiles home">
            <Wordmark className="h-[1.15rem] transition-all duration-500 group-hover:brightness-125 sm:h-[1.3rem]" />
            <span className="hidden text-[0.62rem] leading-tight tracking-[0.22em] text-white/35 uppercase xl:block">
              by
              <br />
              {site.parent}
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navGroups.map((group) => (
              <div key={group.label} onMouseEnter={() => setOpenMenu(group.menu ? group.label : null)}>
                <a
                  href={group.href}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
                    openMenu === group.label ? 'bg-white/6 text-white' : 'text-white/65 hover:text-white'
                  }`}
                >
                  {group.label}
                  {group.label === 'Pricing' && (
                    <span className="rounded-full border border-brand-gold/30 bg-brand-gold/10 px-1.5 py-px text-[0.6rem] font-semibold tracking-wide text-brand-gold/90 uppercase">
                      Soon
                    </span>
                  )}
                  {group.menu && <Icon name="chevron" className="size-3 opacity-50" />}
                </a>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={loginUrl}
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-white/70 transition hover:text-white sm:block"
            >
              Login
            </a>
            <ButtonLink href={signupUrl} size="sm" className="max-[400px]:hidden">
              Start building
              <ArrowIcon />
            </ButtonLink>
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] lg:hidden"
            >
              <span className="relative block h-2.5 w-4">
                <span
                  className={`absolute inset-x-0 top-0 h-px bg-white transition-transform duration-300 ${
                    mobileOpen ? 'translate-y-[5px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute inset-x-0 bottom-0 h-px bg-white transition-transform duration-300 ${
                    mobileOpen ? '-translate-y-[5px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {openMenu && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="absolute inset-x-0 top-full hidden lg:block"
            >
              <div className="shell pt-2 pb-6">
                <div className="surface mx-auto max-w-4xl overflow-hidden p-2">
                  <div className="grid gap-1 sm:grid-cols-2">
                    {navGroups
                      .find((group) => group.label === openMenu)
                      ?.menu?.map((item) => (
                        <a
                          key={item.title}
                          href={item.href}
                          onClick={() => setOpenMenu(null)}
                          className="group rounded-2xl p-4 transition hover:bg-white/[0.04]"
                        >
                          <p className="flex items-center gap-2 text-sm font-semibold text-white">
                            {item.title}
                            <ArrowIcon className="opacity-0 transition group-hover:opacity-60" />
                          </p>
                          <p className="mt-1 text-[0.82rem] leading-relaxed text-white/50">{item.description}</p>
                        </a>
                      ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-ink-950/97 backdrop-blur-xl lg:hidden"
          >
            <div className="shell flex h-17 items-center justify-between">
              <Wordmark className="h-[1.15rem]" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex size-10 items-center justify-center rounded-full border border-white/10 text-white/70"
              >
                <span className="text-lg leading-none">&times;</span>
              </button>
            </div>
            <div className="shell flex-1 overflow-y-auto pt-6 pb-10">
              {navGroups.map((group, index) => (
                <motion.div
                  key={group.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * index, duration: 0.4 }}
                  className="border-b border-white/8 py-5"
                >
                  <a
                    href={group.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display flex items-center gap-3 text-3xl tracking-tight text-white"
                  >
                    {group.label}
                    {group.label === 'Pricing' && (
                      <span className="rounded-full border border-brand-gold/30 bg-brand-gold/10 px-2 py-0.5 font-sans text-[0.6rem] font-semibold tracking-wide text-brand-gold/90 uppercase">
                        Soon
                      </span>
                    )}
                  </a>
                  {group.menu && (
                    <div className="mt-3 grid gap-1.5">
                      {group.menu.map((item) => (
                        <a
                          key={item.title}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-sm text-white/55"
                        >
                          {item.title}
                        </a>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <div className="mt-8 flex flex-col gap-3">
                <ButtonLink href={signupUrl} size="lg">
                  Start building
                  <ArrowIcon />
                </ButtonLink>
                <ButtonLink href={loginUrl} variant="ghost" size="lg">
                  Login to the admin
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
