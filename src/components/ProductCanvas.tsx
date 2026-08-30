import { WorkflowCanvas } from './canvas/WorkflowCanvas'
import { heroWorkflow } from '../data/workflows'
import { Eyebrow, Reveal, Section } from './ui/primitives'

export function ProductCanvas() {
  return (
    <Section id="canvas">
      <Reveal>
        <Eyebrow>The canvas</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-display text-section text-balance text-ink">
          One surface to design, connect, and run.
        </h2>
        <p className="mt-5 max-w-prose text-[17px] leading-relaxed text-muted">
          Every workflow is a graph. Agents, tools, MCP servers, data, logic, and human
          approval gates are nodes; the connections are your control flow. Build it once,
          then run it, observe it, and approve the steps that matter.
        </p>
      </Reveal>

      <Reveal delay={0.05} className="mt-10">
        <WorkflowCanvas graph={heroWorkflow} className="h-[480px] sm:h-[560px] lg:h-[600px]" />
      </Reveal>

      <Reveal delay={0.05} className="mt-6 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
        {[
          ['Inspect', 'Click a node to see its mock configuration.'],
          ['Run', 'Replay the flow to watch it execute step by step.'],
          ['Pan & zoom', 'Scroll, pinch, or drag to move through the graph.'],
          ['Minimap', 'Track your position in large workflows at a glance.'],
        ].map(([t, d]) => (
          <div key={t} className="bg-canvas p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{t}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
          </div>
        ))}
      </Reveal>
    </Section>
  )
}
