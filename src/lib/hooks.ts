import { useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

/** Counts a number up once the element scrolls into view. */
export function useCountUp(target: number, { duration = 1600, decimals = 0 } = {}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView || reduced) return

    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduced, target, duration])

  return { ref, display: (reduced ? target : value).toFixed(decimals) }
}

/** Steps through a list on an interval, pausing entirely for reduced-motion users. */
export function useRotation(length: number, intervalMs = 4200) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduced || length < 2) return
    const id = window.setInterval(() => setIndex((current) => (current + 1) % length), intervalMs)
    return () => window.clearInterval(id)
  }, [length, intervalMs, reduced])

  return [index, setIndex] as const
}
