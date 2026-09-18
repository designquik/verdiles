import { CtaBand } from './components/CtaBand'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Nav } from './components/Nav'
import { Pricing } from './components/Pricing'
import { Showcase } from './components/Showcase'
import { Solutions } from './components/Solutions'
import { TrustStrip } from './components/TrustStrip'

export default function App() {
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
        <Pricing />
        <CtaBand />
      </main>
      <Footer />
    </div>
  )
}
