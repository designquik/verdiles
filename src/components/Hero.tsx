import { motion, useReducedMotion } from 'motion/react'

import { offerCopy, startFreeUrl, site } from '../lib/site'
import { AdminMock } from './AdminMock'
import { ArrowIcon, ButtonLink } from './ui/Button'
import { Icon } from './ui/Icon'
import { GlowOrb } from './ui/Section'

const proofPoints = ['Isolated data per tenant', 'Themes & apps per storefront', 'Custom domains with auto TLS']

export function Hero() {
  const reduced = useReducedMotion()
  const rise = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 24, filter: 'blur(8px)' },
    animate: reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <section id="top" className="relative overflow-hidden pt-16 pb-24 sm:pt-24 lg:pt-28">
      {/* cinematic backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[46rem] bg-[radial-gradient(120%_60%_at_50%_-10%,rgba(0,227,187,0.16),transparent_60%)]" />
        <GlowOrb className="top-[-12rem] left-[-10rem] size-[38rem]" tone="emerald" />
        <GlowOrb className="top-[6rem] right-[-14rem] size-[42rem]" tone="cyan" />
        <div
          className="absolute inset-0 [mask-image:radial-gradient(90%_55%_at_50%_0%,black,transparent)]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
        <div className="grain" />
      </div>

      <div className="shell">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div {...rise(0.05)} className="flex justify-center">
            <span className="inline-flex max-w-full flex-wrap items-center justify-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-1.5 py-1.5 text-center text-[0.72rem] tracking-wide text-white/65 backdrop-blur-md sm:pr-4">
              <span className="rounded-full bg-[linear-gradient(96deg,var(--color-brand-emerald),var(--color-brand-cyan))] px-2 py-0.5 text-[0.62rem] font-bold tracking-[0.12em] text-ink-950 uppercase">
                {site.tagline}
              </span>
              Built by {site.parent}
            </span>
          </motion.div>

          <motion.h1
            {...rise(0.14)}
            className="mt-7 text-[2.65rem] leading-[0.98] font-semibold sm:text-6xl lg:text-[4.6rem]"
          >
            Launch client storefronts
            <br className="hidden sm:block" /> on one platform you{' '}
            <span className="font-display text-brand-gradient pr-2 italic">control</span>
          </motion.h1>

          <motion.p {...rise(0.24)} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
            Verdiley gives agencies and brands a single admin to spin up tenants, build catalogs, ship themes, install apps and
            take custom domains live — without rebuilding the stack for every launch.
          </motion.p>

          <motion.div {...rise(0.34)} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={startFreeUrl} size="lg" className="w-full sm:w-auto">
              Start for free
              <ArrowIcon />
            </ButtonLink>
            <ButtonLink href="#how-it-works" variant="ghost" size="lg" className="w-full sm:w-auto">
              See how it works
            </ButtonLink>
          </motion.div>

          <motion.p {...rise(0.4)} className="mt-5 text-[0.82rem] text-white/45">
            {offerCopy.subhead} After that, pricing TBD.
          </motion.p>

          <motion.ul {...rise(0.44)} className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
            {proofPoints.map((point) => (
              <li key={point} className="flex items-center gap-2 text-[0.8rem] text-white/50">
                <Icon name="check" className="size-3.5 text-brand-teal" />
                {point}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 60, scale: 0.97 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-16 max-w-5xl sm:mt-20"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-[3rem] bg-[radial-gradient(60%_60%_at_50%_30%,rgba(0,227,187,0.22),transparent_70%)] blur-2xl"
          />
          <AdminMock />
        </motion.div>
      </div>
    </section>
  )
}
