import { offerCopy, startFreeUrl, site } from '../lib/site'
import { ArrowIcon, ButtonLink } from './ui/Button'
import { Reveal } from './ui/Reveal'
import { Wordmark } from './ui/Logo'

export function CtaBand() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="shell">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-white/10 px-6 py-16 text-center sm:px-14 sm:py-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(140deg,rgba(0,245,124,0.45),rgba(0,227,187,0.18)_45%,rgba(0,194,254,0.45))]"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink-950/82" />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 h-80 bg-[radial-gradient(45%_100%_at_50%_100%,rgba(0,245,124,0.22),transparent_70%)] blur-2xl"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-28 -z-10 h-64 bg-[radial-gradient(50%_100%_at_50%_100%,rgba(0,194,254,0.35),transparent_70%)] blur-2xl"
          />
          <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
          <div className="grain" />

          <div className="relative">
            <Wordmark className="mx-auto h-6 sm:h-7" />
            <h2 className="mt-8 text-3xl leading-[1.05] font-semibold sm:text-5xl">
              Ready to launch your <span className="font-display text-brand-gradient italic">first tenant?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[0.95rem] leading-relaxed text-white/60 sm:text-lg">
              {offerCopy.subhead} Create a storefront and see how fast a catalog, theme and custom
              domain come together on {site.name}.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href={startFreeUrl} size="lg" className="w-full sm:w-auto">
                Start for free
                <ArrowIcon />
              </ButtonLink>
              <ButtonLink href={`mailto:${site.contactEmail}`} variant="ghost" size="lg" className="w-full sm:w-auto">
                Book a walkthrough
              </ButtonLink>
            </div>

            <p className="mt-7 text-[0.75rem] tracking-[0.18em] text-white/35 uppercase">
              {site.domain} · a {site.parent} platform
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
