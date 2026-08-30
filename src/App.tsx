import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { ProductCanvas } from './components/ProductCanvas'
import { Problem } from './components/Problem'
import { NewParadigm } from './components/NewParadigm'
import { WorkflowAnatomy } from './components/WorkflowAnatomy'
import { UseCases } from './components/UseCases'
import { HowItWorks } from './components/HowItWorks'
import { AiMcpArchitecture } from './components/AiMcpArchitecture'
import { ProductPhilosophy } from './components/ProductPhilosophy'
import { FutureVision } from './components/FutureVision'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-canvas">
      <a
        href="#canvas"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-accent focus:px-3 focus:py-2 focus:text-canvas"
      >
        Skip to content
      </a>
      <Navigation />
      <main>
        <Hero />
        <ProductCanvas />
        <Problem />
        <NewParadigm />
        <WorkflowAnatomy />
        <UseCases />
        <HowItWorks />
        <AiMcpArchitecture />
        <ProductPhilosophy />
        <FutureVision />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
