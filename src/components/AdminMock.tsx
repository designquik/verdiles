import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

import { useCountUp, useRotation } from '../lib/hooks'
import { tenants } from '../lib/site'
import { Icon, type IconName } from './ui/Icon'
import { Mark } from './ui/Logo'

const sidebarItems: { label: string; icon: IconName; active?: boolean }[] = [
  { label: 'Overview', icon: 'overview', active: true },
  { label: 'Catalog', icon: 'catalog' },
  { label: 'Orders', icon: 'orders' },
  { label: 'Themes', icon: 'themes' },
  { label: 'Apps', icon: 'apps' },
  { label: 'Domains', icon: 'domains' },
  { label: 'Settings', icon: 'settings' },
]

const orders = [
  { id: '#VD-4821', customer: 'M. Halvorsen', tenant: 'Atelier Nord', total: '$690.00', status: 'Paid' },
  { id: '#VD-4820', customer: 'L. Okafor', tenant: 'Verde Botanica', total: '$154.00', status: 'Fulfilled' },
  { id: '#VD-4819', customer: 'R. Castellanos', tenant: 'Northbound Supply', total: '$285.00', status: 'Paid' },
  { id: '#VD-4818', customer: 'S. Lindqvist', tenant: 'Atelier Nord', total: '$1,240.00', status: 'Review' },
]

const statusTone: Record<string, string> = {
  Paid: 'border-brand-teal/25 bg-brand-teal/10 text-brand-teal',
  Fulfilled: 'border-brand-cyan/25 bg-brand-cyan/10 text-brand-cyan',
  Review: 'border-brand-gold/25 bg-brand-gold/10 text-brand-gold',
}

const chartLine =
  'M0,86 C22,74 34,88 52,70 C70,52 84,66 104,48 C124,30 138,46 158,34 C178,22 192,30 214,16 C232,6 244,14 260,8'

function Kpi({
  label,
  prefix = '',
  suffix = '',
  value,
  decimals = 0,
  delta,
  spark,
}: {
  label: string
  prefix?: string
  suffix?: string
  value: number
  decimals?: number
  delta: string
  spark: string
}) {
  const { ref, display } = useCountUp(value, { decimals })
  const formatted = decimals === 0 ? Number(display).toLocaleString('en-US') : display

  return (
    <div className="rounded-xl border border-white/7 bg-white/[0.025] p-3 transition duration-500 hover:border-white/15 hover:bg-white/[0.045]">
      <p className="text-[0.62rem] tracking-[0.16em] text-white/40 uppercase">{label}</p>
      <p className="mt-1.5 flex items-baseline gap-1 font-semibold text-white">
        <span className="text-[0.95rem] sm:text-lg">
          {prefix}
          <span ref={ref}>{formatted}</span>
          {suffix}
        </span>
      </p>
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="text-[0.62rem] font-medium text-brand-mint">{delta}</span>
        <svg viewBox="0 0 64 20" className="h-4 w-14 shrink-0" fill="none" aria-hidden="true">
          <path d={spark} stroke="url(#sparkGradient)" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}

export function AdminMock() {
  const reduced = useReducedMotion()
  const [index] = useRotation(tenants.length, 4600)
  const tenant = tenants[index]

  return (
    <div className="relative">
      <svg className="absolute size-0" aria-hidden="true">
        <defs>
          <linearGradient id="sparkGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-brand-emerald)" />
            <stop offset="100%" stopColor="var(--color-brand-cyan)" />
          </linearGradient>
          <linearGradient id="areaStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-brand-emerald)" />
            <stop offset="55%" stopColor="var(--color-brand-teal)" />
            <stop offset="100%" stopColor="var(--color-brand-cyan)" />
          </linearGradient>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-brand-teal)" stopOpacity="0.32" />
            <stop offset="100%" stopColor="var(--color-brand-teal)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="surface overflow-hidden rounded-[1.4rem] p-1.5 shadow-lift sm:rounded-[1.75rem] sm:p-2">
        <div className="overflow-hidden rounded-[1.05rem] border border-white/6 bg-ink-900/90 sm:rounded-[1.35rem]">
          {/* app chrome */}
          <div className="flex items-center gap-3 border-b border-white/6 bg-white/[0.02] px-3 py-2.5 sm:px-4">
            <div className="flex gap-1.5">
              <span className="size-2 rounded-full bg-white/15" />
              <span className="size-2 rounded-full bg-white/15" />
              <span className="size-2 rounded-full bg-white/15" />
            </div>
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-white/7 bg-black/40 px-3 py-1">
              <span className="size-1.5 rounded-full bg-brand-emerald shadow-[0_0_8px_rgba(0,245,124,0.9)]" />
              <span className="truncate text-[0.68rem] text-white/45">
                app.verdiles.com/<span className="text-white/75">{tenant.id}</span>/overview
              </span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <Icon name="search" className="size-3.5 text-white/30" />
              <Icon name="bell" className="size-3.5 text-white/30" />
              <span className="size-5 rounded-full bg-[linear-gradient(135deg,var(--color-brand-emerald),var(--color-brand-cyan))]" />
            </div>
          </div>

          <div className="flex">
            {/* sidebar */}
            <aside className="hidden w-[11.5rem] shrink-0 flex-col gap-3 border-r border-white/6 bg-black/25 p-3 md:flex">
              <div className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/[0.03] px-2 py-2">
                <Mark className="size-5" />
                <div className="min-w-0 flex-1">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={tenant.id}
                      initial={{ opacity: 0, y: reduced ? 0 : 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: reduced ? 0 : -6 }}
                      transition={{ duration: 0.3 }}
                      className="truncate text-[0.7rem] font-semibold text-white"
                    >
                      {tenant.name}
                    </motion.p>
                  </AnimatePresence>
                  <p className="text-[0.58rem] text-white/35">{tenants.length + 3} tenants</p>
                </div>
                <Icon name="chevron" className="size-3 text-white/30" />
              </div>

              <nav className="flex flex-col gap-0.5">
                {sidebarItems.map((item) => (
                  <span
                    key={item.label}
                    className={`flex items-center gap-2 rounded-lg px-2 py-[0.42rem] text-[0.72rem] transition ${
                      item.active
                        ? 'bg-[linear-gradient(90deg,rgba(0,245,124,0.14),rgba(0,194,254,0.06))] font-medium text-white'
                        : 'text-white/45 hover:bg-white/4 hover:text-white/75'
                    }`}
                  >
                    <Icon name={item.icon} className="size-3.5" />
                    {item.label}
                  </span>
                ))}
              </nav>

              <div className="mt-auto rounded-lg border border-white/7 bg-white/[0.02] p-2">
                <p className="text-[0.58rem] tracking-[0.14em] text-white/35 uppercase">Plan</p>
                <p className="mt-0.5 text-[0.72rem] font-semibold text-white">Agency</p>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/8">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '72%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: 'easeOut' }}
                    className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-brand-emerald),var(--color-brand-cyan))]"
                  />
                </div>
              </div>
            </aside>

            {/* main panel */}
            <div className="min-w-0 flex-1 p-3 sm:p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-white sm:text-base">Overview</h3>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={tenant.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-0.5 flex items-center gap-1.5 text-[0.68rem] text-white/45"
                    >
                      <span className="relative flex size-1.5 items-center justify-center">
                        <span className="absolute size-1.5 rounded-full bg-brand-emerald/70 animate-pulse-ring" />
                        <span className="size-1.5 rounded-full bg-brand-emerald" />
                      </span>
                      Live on {tenant.domain}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <div className="flex items-center gap-2">
                  <div className="hidden rounded-full border border-white/8 bg-white/[0.03] p-0.5 sm:flex">
                    {['7d', '30d', '90d'].map((range, i) => (
                      <span
                        key={range}
                        className={`rounded-full px-2 py-1 text-[0.62rem] ${
                          i === 1 ? 'bg-white/10 font-medium text-white' : 'text-white/40'
                        }`}
                      >
                        {range}
                      </span>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-[linear-gradient(96deg,var(--color-brand-emerald),var(--color-brand-cyan))] px-2.5 py-1.5 text-[0.62rem] font-semibold text-ink-950">
                    <Icon name="plus" className="size-3" />
                    New tenant
                  </span>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
                <Kpi
                  label="Revenue"
                  prefix="$"
                  value={128420}
                  delta="+18.4%"
                  spark="M1,16 C10,13 16,15 24,10 C32,5 38,9 46,6 C54,3 58,5 63,2"
                />
                <Kpi label="Orders" value={1284} delta="+9.1%" spark="M1,15 C9,14 15,10 23,12 C31,14 37,6 45,7 C53,8 58,4 63,3" />
                <Kpi
                  label="Conversion"
                  value={3.42}
                  decimals={2}
                  suffix="%"
                  delta="+0.42 pt"
                  spark="M1,17 C10,15 14,12 22,13 C30,14 36,8 44,9 C52,10 57,5 63,4"
                />
              </div>

              <div className="mt-2.5 grid gap-2.5 sm:mt-3 sm:gap-3 lg:grid-cols-[1.55fr_1fr]">
                <div className="rounded-xl border border-white/7 bg-white/[0.025] p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[0.7rem] font-medium text-white/80">Portfolio revenue</p>
                    <p className="text-[0.6rem] text-white/35">All tenants · 30 days</p>
                  </div>
                  <svg viewBox="0 0 260 100" className="mt-2 h-24 w-full sm:h-28" fill="none" aria-hidden="true">
                    {[24, 48, 72].map((y) => (
                      <line key={y} x1="0" y1={y} x2="260" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    ))}
                    <motion.path
                      d={`${chartLine} L260,100 L0,100 Z`}
                      fill="url(#areaFill)"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.5 }}
                    />
                    <motion.path
                      d={chartLine}
                      stroke="url(#areaStroke)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: reduced ? 1 : 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.8, ease: 'easeInOut' }}
                    />
                    <circle cx="260" cy="8" r="3" fill="var(--color-brand-cyan)" />
                    <circle cx="260" cy="8" r="7" fill="var(--color-brand-cyan)" opacity="0.18" />
                  </svg>
                  <div className="mt-1 flex justify-between text-[0.55rem] text-white/25">
                    {['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'].map((week) => (
                      <span key={week}>{week}</span>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-white/7 bg-white/[0.025] p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[0.7rem] font-medium text-white/80">Domain go-live</p>
                    <span className="rounded-full border border-brand-teal/25 bg-brand-teal/10 px-1.5 py-px text-[0.55rem] font-semibold tracking-wide text-brand-teal uppercase">
                      Ready
                    </span>
                  </div>
                  <ul className="mt-2.5 space-y-2">
                    {[
                      { label: 'Domain added', detail: tenant.domain, done: true },
                      { label: 'DNS verified', detail: 'CNAME + A records', done: true },
                      { label: 'TLS issued', detail: 'auto-renewing', done: true },
                      { label: 'Cut over to live', detail: 'one click', done: false },
                    ].map((row) => (
                      <li key={row.label} className="flex items-start gap-2">
                        <span
                          className={`mt-px flex size-3.5 shrink-0 items-center justify-center rounded-full border ${
                            row.done
                              ? 'border-brand-teal/40 bg-brand-teal/15 text-brand-teal'
                              : 'border-white/15 bg-white/5 text-white/30'
                          }`}
                        >
                          <Icon name="check" className="size-2" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[0.68rem] leading-tight text-white/80">{row.label}</span>
                          <span className="block truncate text-[0.58rem] text-white/35">{row.detail}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-2.5 overflow-hidden rounded-xl border border-white/7 bg-white/[0.025] sm:mt-3">
                <div className="flex items-center justify-between border-b border-white/6 px-3 py-2">
                  <p className="text-[0.7rem] font-medium text-white/80">Recent orders</p>
                  <p className="text-[0.6rem] text-white/35">across all tenants</p>
                </div>
                <div className="divide-y divide-white/4">
                  {orders.map((order) => (
                    <div key={order.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-3 py-2 sm:grid-cols-[4.5rem_1fr_7rem_auto]">
                      <span className="font-mono text-[0.6rem] text-white/35">{order.id}</span>
                      <span className="min-w-0">
                        <span className="block truncate text-[0.68rem] text-white/80">{order.customer}</span>
                        <span className="block truncate text-[0.58rem] text-white/35">{order.tenant}</span>
                      </span>
                      <span className="hidden text-[0.66rem] text-white/60 sm:block">{order.total}</span>
                      <span
                        className={`rounded-full border px-1.5 py-px text-[0.55rem] font-semibold tracking-wide uppercase ${statusTone[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* floating notifications */}
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-6 -left-3 hidden w-60 sm:block lg:-left-12"
      >
        <div className="surface animate-float rounded-2xl p-3.5">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-full bg-brand-teal/15 text-brand-teal">
              <Icon name="domains" className="size-3.5" />
            </span>
            <p className="text-[0.72rem] font-semibold text-white">Custom domain live</p>
          </div>
          <p className="mt-1.5 text-[0.68rem] leading-relaxed text-white/50">
            TLS issued for <span className="text-white/80">ateliernord.com</span> — storefront cut over in 38 seconds.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -top-9 -right-4 hidden w-56 md:block lg:-right-14"
      >
        <div className="surface animate-float rounded-2xl p-3.5 [animation-delay:-4s]">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
              <Icon name="themes" className="size-3.5" />
            </span>
            <p className="text-[0.72rem] font-semibold text-white">Theme published</p>
          </div>
          <p className="mt-1.5 text-[0.68rem] leading-relaxed text-white/50">
            <span className="text-white/80">Monolith v4</span> rolled out to 3 tenants with zero downtime.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
