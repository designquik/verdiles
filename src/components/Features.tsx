import { motion } from 'motion/react'
import type { ReactNode } from 'react'

import { features, tenants } from '../lib/site'
import { Icon, type IconName } from './ui/Icon'
import { Reveal } from './ui/Reveal'
import { GlowOrb, SectionHeading } from './ui/Section'

const icons: Record<string, IconName> = {
  'tenant-launch': 'tenant-launch',
  catalog: 'catalog',
  themes: 'themes',
  apps: 'apps',
  domains: 'domains',
  admin: 'admin',
}

const colSpan: Record<number, string> = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
}

function ProvisionVisual() {
  const rows = [
    { label: 'Store record', state: 'done' },
    { label: 'Theme · Monolith', state: 'done' },
    { label: 'Catalog seed · 248 SKUs', state: 'done' },
    { label: 'Preview URL', state: 'active' },
  ]

  return (
    <div className="rounded-2xl border border-white/7 bg-black/35 p-4">
      <div className="flex items-center justify-between">
        <p className="text-[0.68rem] tracking-[0.18em] text-white/35 uppercase">New tenant</p>
        <span className="rounded-full border border-brand-teal/25 bg-brand-teal/10 px-2 py-0.5 text-[0.6rem] font-semibold text-brand-teal">
          Provisioning
        </span>
      </div>
      <div className="mt-3 rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2">
        <p className="text-[0.58rem] tracking-[0.16em] text-white/30 uppercase">Storefront name</p>
        <p className="mt-0.5 text-sm text-white">
          Atelier Nord
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
            className="ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-brand-teal"
          />
        </p>
      </div>
      <ul className="mt-3 space-y-1.5">
        {rows.map((row, index) => (
          <li key={row.label} className="flex items-center gap-2 text-[0.72rem]">
            <span
              className={`flex size-4 items-center justify-center rounded-full border ${
                row.state === 'done'
                  ? 'border-brand-teal/40 bg-brand-teal/15 text-brand-teal'
                  : 'border-white/15 bg-white/5 text-white/40'
              }`}
            >
              {row.state === 'done' ? (
                <Icon name="check" className="size-2.5" />
              ) : (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                  className="size-2 rounded-full border border-white/25 border-t-brand-cyan"
                />
              )}
            </span>
            <span className={row.state === 'done' ? 'text-white/65' : 'text-white/45'}>{row.label}</span>
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 * index }}
              className="ml-auto h-px max-w-16 bg-gradient-to-r from-transparent to-white/12"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

function TenantGridVisual() {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {tenants.map((tenant, index) => (
        <motion.div
          key={tenant.id}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="rounded-2xl border border-white/7 bg-black/35 p-3.5"
        >
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full" style={{ background: tenant.accent }} />
            <p className="truncate text-[0.78rem] font-semibold text-white">{tenant.name}</p>
          </div>
          <p className="mt-1 truncate text-[0.66rem] text-white/40">{tenant.domain}</p>
          <dl className="mt-3 flex items-baseline gap-1.5">
            <dd className="text-[0.8rem] font-semibold text-white/85">{tenant.stats[0].value}</dd>
            <dt className="truncate text-[0.6rem] tracking-[0.12em] text-white/35 uppercase">{tenant.stats[0].label}</dt>
          </dl>
          <div className="mt-3 flex items-center justify-between border-t border-white/6 pt-2.5">
            <span className="text-[0.6rem] tracking-[0.14em] text-white/30 uppercase">{tenant.themeName}</span>
            <span className="flex items-center gap-1 text-[0.6rem] text-brand-mint">
              <span className="size-1 rounded-full bg-brand-emerald" />
              Live
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

const visuals: Record<string, ReactNode> = {
  'tenant-launch': <ProvisionVisual />,
  admin: <TenantGridVisual />,
}

export function Features() {
  return (
    <section id="product" className="relative scroll-mt-24 py-24 sm:py-32">
      <GlowOrb className="top-1/3 left-[-12rem] size-[34rem]" tone="emerald" />

      <div className="shell relative">
        <SectionHeading
          eyebrow="The platform"
          title={
            <>
              Everything a storefront needs.{' '}
              <span className="font-display text-brand-gradient italic">Multi-tenant by design.</span>
            </>
          }
          copy="Catalog, themes, apps, settings and domains are first-class in Verdiley — scoped to each tenant, operated from one place."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {features.map((feature, index) => {
            const visual = visuals[feature.id]
            const isWide = feature.cols > 1

            return (
              <Reveal
                key={feature.id}
                delay={index * 0.06}
                className={`group surface flex flex-col overflow-hidden p-6 transition duration-500 hover:border-white/16 sm:p-7 ${colSpan[feature.cols]}`}
              >
                <div
                  className={`flex flex-1 flex-col gap-6 ${
                    isWide ? 'md:flex-row md:items-center md:gap-10' : ''
                  }`}
                >
                  <div className={isWide ? 'md:flex-1' : ''}>
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-xl border border-white/8 bg-[linear-gradient(140deg,rgba(0,245,124,0.16),rgba(0,194,254,0.07))] text-brand-teal transition duration-500 group-hover:scale-105">
                        <Icon name={icons[feature.id]} className="size-5" />
                      </span>
                      <span className="text-[0.68rem] font-semibold tracking-[0.2em] text-white/40 uppercase">
                        {feature.eyebrow}
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl leading-snug font-semibold sm:text-[1.45rem]">{feature.title}</h3>
                    <p className="mt-3 text-[0.92rem] leading-relaxed text-white/55">{feature.copy}</p>

                    <ul className="mt-5 space-y-2">
                      {feature.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5 text-[0.85rem] text-white/60">
                          <Icon name="check" className="mt-0.5 size-3.5 shrink-0 text-brand-teal/80" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {visual && (
                    <div className={feature.cols === 3 ? 'md:w-[30rem] lg:w-[40rem]' : isWide ? 'md:w-[22rem] lg:w-[26rem]' : ''}>
                      {visual}
                    </div>
                  )}
                </div>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 -bottom-px h-px opacity-0 transition duration-500 group-hover:opacity-100 hairline"
                />
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
