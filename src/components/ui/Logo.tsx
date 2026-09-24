import markSrc from '../../assets/verdiles-mark.png'
import wordmarkSrc from '../../assets/verdiles-wordmark.png'

/**
 * The Verdiley wordmark is a locked brand asset: the emerald-to-cyan
 * gradient lettering is rendered from the official artwork, never re-typeset.
 */
export function Wordmark({ className = 'h-5' }: { className?: string }) {
  return (
    <img
      src={wordmarkSrc}
      alt="Verdiley"
      width={640}
      height={103}
      className={`w-auto select-none ${className}`}
      draggable={false}
    />
  )
}

export function Mark({ className = 'size-6' }: { className?: string }) {
  return (
    <img src={markSrc} alt="" aria-hidden="true" width={128} height={128} className={`select-none ${className}`} draggable={false} />
  )
}
