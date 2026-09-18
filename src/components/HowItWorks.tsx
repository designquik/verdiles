import { motion } from 'motion/react'

import { steps } from '../lib/site'
import { Reveal } from './ui/Reveal'
import { GlowOrb, SectionHeading } from './ui/Section'

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <GlowOrb className="right-[-14rem] bottom-0 size-[36rem]" tone="cyan" />

      <div className="shell relative">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              Kickoff to live storefront in <span className="font-display text-brand-gradient italic">four moves</span>
            </>
          }
          copy="The same workflow every time, whether it is the first tenant or the fortieth."
        />

        <div className="relative mt-16">
          <div aria-hidden="true" className="absolute top-[4.56rem] right-0 left-0 hidden lg:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="h-px origin-left bg-[linear-gradient(90deg,transparent,rgba(0,245,124,0.5),rgba(0,194,254,0.5),transparent)]"
            />
          </div>

          <ol className="grid gap-8 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, index) => (
              <Reveal as="li" key={step.step} delay={index * 0.1} className="relative flex h-full flex-col">
                <div className="flex items-center gap-4 lg:block">
                  <span className="font-display text-brand-gradient relative z-10 text-4xl leading-none lg:text-5xl">
                    {step.step}
                  </span>
                  <span
                    aria-hidden="true"
                    className="relative z-10 block size-2.5 shrink-0 rotate-45 bg-[linear-gradient(135deg,var(--color-brand-emerald),var(--color-brand-cyan))] shadow-[0_0_0_4px_var(--color-ink-950),0_0_16px_rgba(0,227,187,0.75)] lg:mt-5"
                  />
                </div>

                <h3 className="mt-6 text-lg font-semibold sm:text-xl">{step.title}</h3>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-white/55">{step.copy}</p>
                <p className="mt-4 inline-flex items-center gap-2 self-start rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[0.68rem] tracking-wide text-white/50 lg:mt-auto lg:pt-1">
                  {step.meta}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
