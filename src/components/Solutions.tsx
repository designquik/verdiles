import { signupUrl, solutions } from '../lib/site'
import { ArrowIcon, ButtonLink } from './ui/Button'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/Section'

export function Solutions() {
  return (
    <section id="solutions" className="relative scroll-mt-24 border-y border-white/6 bg-black/35 py-24 sm:py-32">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Solutions"
            title={
              <>
                Built for the teams running <span className="font-display text-brand-gradient italic">more than one</span> store
              </>
            }
            copy="Verdiley assumes a portfolio. Isolation, roles and reporting are designed around running many storefronts at once."
          />
          <Reveal delay={0.15}>
            <ButtonLink href={signupUrl} variant="ghost">
              Explore the admin
              <ArrowIcon />
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {solutions.map((solution, index) => (
            <Reveal
              key={solution.title}
              delay={index * 0.08}
              className="group surface flex flex-col p-6 transition duration-500 hover:-translate-y-1 hover:border-white/16 sm:p-7"
            >
              <h3 className="text-lg font-semibold sm:text-xl">{solution.title}</h3>
              <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-white/55">{solution.copy}</p>
              <ul className="mt-6 space-y-2 border-t border-white/7 pt-5">
                {solution.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-[0.85rem] text-white/60">
                    <span aria-hidden="true" className="size-1.5 shrink-0 rotate-45 bg-brand-gold/75" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
