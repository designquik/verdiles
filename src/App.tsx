import { useEffect, useState } from 'react'

import { CtaBand } from './components/CtaBand'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Nav } from './components/Nav'
import { Showcase } from './components/Showcase'
import { Solutions } from './components/Solutions'
import { StartForFreePage } from './components/StartForFree'
import { TrustStrip } from './components/TrustStrip'

const START_FREE_PATHS = new Set(['/start', '/pricing', '/start-for-free'])

function currentPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/'
}

function MarketingHome() {
  return (
    <div className="relative min-h-screen bg-ink-950">
      <a
        href="#product"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <Features />
        <Solutions />
        <HowItWorks />
        <Showcase />
        {/* Plan cards / comparison hidden while Start for free is the public path */}
        <CtaBand />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  const [path, setPath] = useState(currentPath)

  useEffect(() => {
    const onNav = () => setPath(currentPath())
    window.addEventListener('popstate', onNav)
    return () => window.removeEventListener('popstate', onNav)
  }, [])

  if (START_FREE_PATHS.has(path)) {
    return <StartForFreePage />
  }

  return <MarketingHome />
}
