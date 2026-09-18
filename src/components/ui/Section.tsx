import type { ReactNode } from 'react'

import { Reveal } from './Reveal'

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-[0.7rem] font-semibold tracking-[0.28em] text-brand-teal/90 uppercase ${className}`}
    >
      <span className="size-1.5 rotate-45 bg-[linear-gradient(135deg,var(--color-brand-emerald),var(--color-brand-cyan))]" />
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = 'center',
  className = '',
}: {
  eyebrow: string
  title: ReactNode
  copy?: ReactNode
  align?: 'center' | 'left'
  className?: string
}) {
  const isCenter = align === 'center'

  return (
    <Reveal className={`${isCenter ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 text-4xl leading-[1.05] font-semibold sm:text-5xl md:text-[3.35rem]">{title}</h2>
      {copy && <p className="mt-5 text-base leading-relaxed text-white/60 md:text-lg">{copy}</p>}
    </Reveal>
  )
}

export function GlowOrb({ className = '', tone = 'teal' }: { className?: string; tone?: 'emerald' | 'teal' | 'cyan' }) {
  const tones = {
    emerald: 'rgba(0,245,124,0.16)',
    teal: 'rgba(0,227,187,0.16)',
    cyan: 'rgba(0,194,254,0.16)',
  } as const

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-[120px] ${className}`}
      style={{ background: `radial-gradient(circle at center, ${tones[tone]}, transparent 70%)` }}
    />
  )
}
