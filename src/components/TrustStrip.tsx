import { trustSegments, trustStats } from '../lib/site'
import { Reveal } from './ui/Reveal'

export function TrustStrip() {
  const loop = [...trustSegments, ...trustSegments]

  return (
    <section aria-label="Verdiles at a glance" className="relative border-y border-white/6 bg-black/40 py-10">
      <div className="shell">
        <Reveal>
          <p className="text-center text-[0.68rem] font-semibold tracking-[0.3em] text-white/35 uppercase">
            Purpose-built for commerce teams in
          </p>
        </Reveal>

        <div
          className="relative mt-6 overflow-hidden"
          style={{ maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)' }}
        >
          <div className="flex w-max animate-marquee items-center gap-12 pr-12">
            {loop.map((segment, index) => (
              <span key={`${segment}-${index}`} className="flex items-center gap-12">
                <span className="font-display text-lg whitespace-nowrap text-white/45 sm:text-xl">{segment}</span>
                <span className="size-1 rotate-45 bg-brand-teal/50" />
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/7 bg-white/6 sm:grid-cols-4">
          {trustStats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08} className="bg-ink-950/85 px-5 py-6 text-center">
              <p className="text-brand-gradient text-2xl font-semibold sm:text-3xl">{stat.value}</p>
              <p className="mt-1.5 text-[0.75rem] text-white/45">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
