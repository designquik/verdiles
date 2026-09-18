import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'quiet'

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition duration-300 ease-out whitespace-nowrap'

const variants: Record<Variant, string> = {
  primary:
    'bg-[linear-gradient(96deg,var(--color-brand-emerald),var(--color-brand-teal)_55%,var(--color-brand-cyan))] text-ink-950 shadow-[0_18px_50px_-22px_rgba(0,227,187,0.75)] hover:shadow-[0_26px_70px_-22px_rgba(0,227,187,0.95)] hover:-translate-y-0.5',
  ghost:
    'border border-white/12 bg-white/[0.03] text-white/90 backdrop-blur-md hover:border-white/25 hover:bg-white/[0.07] hover:-translate-y-0.5',
  quiet: 'text-white/70 hover:text-white',
}

const sizes = {
  md: 'h-11 px-5',
  lg: 'h-13 px-7 text-[0.95rem]',
  sm: 'h-9 px-4 text-[0.8rem]',
} as const

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
  size?: keyof typeof sizes
  children: ReactNode
}

export function ButtonLink({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonLinkProps) {
  return (
    <a className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {variant === 'primary' && (
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-y-0 -left-full w-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)] transition-transform duration-700 ease-out group-hover:translate-x-[320%]" />
        </span>
      )}
      <span className="relative flex items-center gap-2">{children}</span>
    </a>
  )
}

export function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}
