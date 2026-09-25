import markSrc from '../../assets/verdiles-mark.png'

/**
 * Verdiley wordmark as live text (SVG) — emerald→cyan gradient.
 * Spell locked: V-E-R-D-I-L-E-Y. Replaces the old VERDILES PNG (trailing S removed).
 */
export function Wordmark({ className = 'h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 148 28"
      className={`w-auto select-none ${className}`}
      role="img"
      aria-label="Verdiley"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="verdileyWordmarkGrad" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#00f57c" />
          <stop offset="26%" stopColor="#2be98a" />
          <stop offset="58%" stopColor="#00e3bb" />
          <stop offset="100%" stopColor="#00c2fe" />
        </linearGradient>
      </defs>
      <text
        x="0"
        y="22"
        fill="url(#verdileyWordmarkGrad)"
        style={{
          fontFamily: '"Bodoni Moda", Didot, "Times New Roman", serif',
          fontSize: 26,
          fontWeight: 500,
          letterSpacing: '0.02em',
        }}
      >
        Verdiley
      </text>
    </svg>
  )
}

export function Mark({ className = 'size-6' }: { className?: string }) {
  return (
    <img
      src={markSrc}
      alt=""
      aria-hidden="true"
      width={128}
      height={128}
      className={`select-none ${className}`}
      draggable={false}
    />
  )
}
