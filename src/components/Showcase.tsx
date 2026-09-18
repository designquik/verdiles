import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

import { useRotation } from '../lib/hooks'
import { tenants } from '../lib/site'
import { Reveal } from './ui/Reveal'
import { GlowOrb, SectionHeading } from './ui/Section'

export function Showcase() {
  const [index, setIndex] = useRotation(tenants.length, 6500)
  const tenant = tenants[index]
  const reduced = useReducedMotion()

  return (
    <section id="showcase" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <GlowOrb className="top-10 left-1/2 size-[40rem] -translate-x-1/2" tone="teal" />

      <div className="shell relative">
        <SectionHeading
          eyebrow="Showcase"
          title={
            <>
              Three tenants. One platform.{' '}
              <span className="font-display text-brand-gradient italic">Zero shared compromises.</span>
            </>
          }
          copy="Each storefront gets its own theme, catalog, apps and domain — while your team operates all of them from a single Verdiles admin."
        />

        <Reveal delay={0.1} className="mt-12 flex flex-wrap justify-center gap-2">
          {tenants.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setIndex(itemIndex)}
              aria-pressed={itemIndex === index}
              className={`relative rounded-full border px-4 py-2 text-[0.8rem] font-medium transition duration-300 ${
                itemIndex === index
                  ? 'border-white/20 bg-white/8 text-white'
                  : 'border-white/8 text-white/50 hover:border-white/15 hover:text-white/80'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full" style={{ background: item.accent }} />
                {item.name}
                <span className="hidden text-white/35 sm:inline">· {item.vertical}</span>
              </span>
            </button>
          ))}
        </Reveal>

        <Reveal delay={0.16} className="relative mt-10">
          <div className="surface overflow-hidden rounded-[1.5rem] p-1.5 shadow-lift sm:p-2">
            {/* browser chrome */}
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="flex gap-1.5">
                <span className="size-2 rounded-full bg-white/15" />
                <span className="size-2 rounded-full bg-white/15" />
                <span className="size-2 rounded-full bg-white/15" />
              </div>
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-white/7 bg-black/40 px-3 py-1">
                <svg viewBox="0 0 24 24" className="size-3 shrink-0 text-brand-teal" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="11" width="14" height="9" rx="2" />
                  <path d="M8.5 11V8.5a3.5 3.5 0 017 0V11" />
                </svg>
                <span className="truncate text-[0.7rem] text-white/55">https://{tenant.domain}</span>
              </div>
              <span className="hidden rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[0.62rem] text-white/45 sm:block">
                Theme · {tenant.themeName}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tenant.id}
                initial={{ opacity: 0, scale: reduced ? 1 : 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduced ? 1 : 1.01 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="overflow-hidden rounded-[1.1rem]"
                style={{ background: tenant.surface, color: tenant.ink }}
              >
                {/* storefront header */}
                <div
                  className="flex items-center justify-between px-5 py-4 sm:px-8"
                  style={{ borderBottom: `1px solid ${tenant.accentSoft}` }}
                >
                  <p className="font-display text-base tracking-[0.18em] uppercase sm:text-lg">{tenant.name}</p>
                  <nav className="hidden gap-6 text-[0.72rem] tracking-[0.14em] uppercase opacity-70 sm:flex">
                    <span>Shop</span>
                    <span>Collections</span>
                    <span>Journal</span>
                    <span>Account</span>
                  </nav>
                  <span
                    className="rounded-full px-3 py-1 text-[0.68rem] font-medium"
                    style={{ background: tenant.accentSoft, color: tenant.accent }}
                  >
                    Cart (2)
                  </span>
                </div>

                {/* storefront hero */}
                <div className="grid gap-6 px-5 py-8 sm:px-8 sm:py-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                  <div>
                    <p className="text-[0.68rem] tracking-[0.3em] uppercase" style={{ color: tenant.accent }}>
                      {tenant.vertical}
                    </p>
                    <h3 className="font-display mt-4 text-3xl leading-tight sm:text-[2.6rem]" style={{ color: tenant.ink }}>
                      {tenant.headline}
                    </h3>
                    <p className="mt-4 max-w-md text-[0.92rem] leading-relaxed opacity-65">{tenant.sub}</p>
                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <span
                        className="rounded-full px-5 py-2.5 text-[0.78rem] font-semibold"
                        style={{ background: tenant.accent, color: tenant.surface }}
                      >
                        Shop the edit
                      </span>
                      <span
                        className="rounded-full px-5 py-2.5 text-[0.78rem] font-medium"
                        style={{ border: `1px solid ${tenant.accentSoft}`, color: tenant.ink }}
                      >
                        Lookbook
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {tenant.products.map((product, productIndex) => (
                      <motion.div
                        key={product.name}
                        initial={{ opacity: 0, y: reduced ? 0 : 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 + productIndex * 0.08 }}
                      >
                        <div className="aspect-[3/4] w-full rounded-xl" style={{ background: product.tone }} />
                        <p className="mt-2 truncate text-[0.7rem]" style={{ color: tenant.ink }}>
                          {product.name}
                        </p>
                        <p className="text-[0.68rem] opacity-55">{product.price}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* storefront stat bar */}
                <div
                  className="grid grid-cols-3 divide-x px-5 py-4 sm:px-8"
                  style={{ borderTop: `1px solid ${tenant.accentSoft}`, borderColor: tenant.accentSoft }}
                >
                  {tenant.stats.map((stat) => (
                    <div key={stat.label} className="px-2 text-center first:pl-0 last:pr-0">
                      <p className="text-sm font-semibold sm:text-base" style={{ color: tenant.accent }}>
                        {stat.value}
                      </p>
                      <p className="mt-0.5 text-[0.62rem] tracking-[0.14em] uppercase opacity-50">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.75rem] text-white/40">
            <span>Storefronts are illustrative theme compositions rendered in the browser.</span>
            <span className="hidden sm:inline">·</span>
            <span>
              Same admin. Different brand. <span className="text-white/65">Your domains.</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
