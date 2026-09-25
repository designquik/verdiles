import { useState, type FormEvent } from 'react'

import { loginUrl, offerCopy, signupUrl, site, startFreeUrl } from '../lib/site'
import { Mark, Wordmark } from './ui/Logo'

/**
 * Shopify-inspired Start for free layout: dark full-page backdrop + centered white card.
 * Promo path is copy-only until admin trial billing is wired — Continue routes to existing signup.
 */
export function StartForFreePage() {
  const [email, setEmail] = useState('')

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = email.trim()
    const url = new URL(signupUrl)
    if (trimmed) url.searchParams.set('email', trimmed)
    url.searchParams.set('intent', 'start-free')
    window.location.assign(url.toString())
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-ink-950 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_-10%,rgba(0,227,187,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(50%_40%_at_80%_80%,rgba(0,194,254,0.12),transparent_60%)]" />
        <div className="grain opacity-40" />
      </div>

      <header className="shell flex h-16 items-center justify-between sm:h-20">
        <a href="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
          <Wordmark className="h-5 sm:h-[1.35rem]" />
        </a>
        <a href={loginUrl} className="text-sm font-medium text-white/60 transition hover:text-white">
          Log in
        </a>
      </header>

      <main className="shell flex flex-1 flex-col items-center justify-center px-4 pb-16 pt-6 sm:pb-24">
        <div className="mx-auto w-full max-w-md text-center">
          <div className="mb-8 flex justify-center">
            <Mark className="size-12 sm:size-14" />
          </div>
          <h1 className="text-[1.85rem] leading-tight font-semibold tracking-tight sm:text-[2.15rem]">
            {offerCopy.headline}
          </h1>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-white/60 sm:text-base">{offerCopy.subhead}</p>
        </div>

        <div className="mt-5 w-full max-w-md rounded-2xl bg-white p-6 text-left text-ink-950 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.85)] sm:mt-6 sm:p-8">
          <h2 className="text-lg font-semibold tracking-tight">Start for free</h2>
          <p className="mt-1 text-sm text-ink-950/55">{offerCopy.cardHint}</p>

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <label className="block">
              <span className="mb-1.5 block text-[0.72rem] font-semibold tracking-[0.08em] text-ink-950/55 uppercase">
                Email
              </span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
                className="h-12 w-full rounded-xl border border-ink-950/12 bg-white px-4 text-[0.95rem] text-ink-950 outline-none transition placeholder:text-ink-950/35 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/25"
              />
            </label>

            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center rounded-xl bg-ink-950 text-sm font-semibold text-white transition hover:bg-ink-850"
            >
              Continue
            </button>
          </form>

          <p className="mt-4 text-[0.72rem] leading-relaxed text-ink-950/45">
            By continuing you agree to create a {site.name} account.
          </p>
        </div>

        <p className="mt-8 text-center text-[0.78rem] text-white/40">
          Already have an account?{' '}
          <a href={loginUrl} className="font-medium text-white/70 underline-offset-2 hover:text-white hover:underline">
            Log in
          </a>
          {' · '}
          <a href="/" className="font-medium text-white/70 underline-offset-2 hover:text-white hover:underline">
            Back to {site.domain}
          </a>
        </p>
        <p className="mt-3 text-center text-[0.68rem] tracking-wide text-white/25">
          Path: {startFreeUrl} · promo messaging on marketing only until trial billing is enabled
        </p>
      </main>
    </div>
  )
}
