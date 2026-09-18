import { pricingTiers, signupUrl, site } from '../lib/site'
import { ArrowIcon, ButtonLink } from './ui/Button'
import { Icon } from './ui/Icon'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/Section'

export function Pricing() {
  return (
    <section id="pricing" className="relative scroll-mt-24 border-y border-white/6 bg-black/35 py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Plans are being finalised.{' '}
              <span className="font-display text-brand-gradient italic">Founding partners get founding rates.</span>
            </>
          }
          copy="Verdiles pricing lands with the public launch. Until then, tell us how many tenants you run and we will scope it with you directly."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <Reveal
              key={tier.name}
              delay={index * 0.08}
              className={`surface relative flex flex-col p-7 transition duration-500 hover:-translate-y-1 ${
                tier.featured ? 'border-brand-teal/30 lg:-mt-3 lg:mb-3' : ''
              }`}
            >
              {tier.featured && (
                <>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[1.25rem] bg-[radial-gradient(80%_50%_at_50%_0%,rgba(0,227,187,0.14),transparent_70%)]"
                  />
                  <span className="absolute -top-3 left-7 rounded-full bg-[linear-gradient(96deg,var(--color-brand-emerald),var(--color-brand-cyan))] px-3 py-1 text-[0.62rem] font-bold tracking-[0.14em] text-ink-950 uppercase">
                    Most requested
                  </span>
                </>
              )}

              <div className="relative">
                <h3 className="text-lg font-semibold">{tier.name}</h3>
                <p className="mt-2 min-h-10 text-[0.85rem] leading-relaxed text-white/50">{tier.blurb}</p>

                <p className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-3xl text-white">{tier.price}</span>
                  <span className="rounded-full border border-brand-gold/25 bg-brand-gold/10 px-2 py-0.5 text-[0.58rem] font-semibold tracking-[0.14em] text-brand-gold uppercase">
                    Placeholder
                  </span>
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-white/7 pt-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[0.85rem] text-white/60">
                      <Icon name="check" className="mt-0.5 size-3.5 shrink-0 text-brand-teal/80" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mt-8 pt-2">
                <ButtonLink
                  href={tier.featured ? signupUrl : `mailto:${site.contactEmail}?subject=Verdiles%20${tier.name}%20plan`}
                  variant={tier.featured ? 'primary' : 'ghost'}
                  className="w-full"
                >
                  {tier.featured ? 'Start building' : 'Talk to us'}
                  <ArrowIcon />
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.24} className="mt-8 text-center text-[0.8rem] text-white/40">
          Every plan includes the multi-tenant admin, theme library, app installs and custom domains with automatic TLS.
        </Reveal>
      </div>
    </section>
  )
}
