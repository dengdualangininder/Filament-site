import { Eyebrow, Reveal, Section } from './ui/primitives'
import { WorkflowCanvas } from './canvas/WorkflowCanvas'
import { anatomyWorkflow } from '../data/workflows'

const PRIMITIVES: Array<{ k: 'trigger' | 'agent' | 'tool' | 'data' | 'decision' | 'mcp' | 'approval' | 'output'; label: string; desc: string }> = [
  { k: 'trigger', label: 'Trigger', desc: 'Starts the flow — event, schedule, or webhook.' },
  { k: 'agent', label: 'AI Agent', desc: 'Reasons, selects tools, and transforms data.' },
  { k: 'tool', label: 'Tools', desc: 'Callable capabilities the agent can invoke.' },
  { k: 'data', label: 'Data', desc: 'Structured input, datasets, and state.' },
  { k: 'decision', label: 'Logic', desc: 'Branches the flow on a condition.' },
  { k: 'mcp', label: 'MCP', desc: 'Bridges external systems via the protocol.' },
  { k: 'approval', label: 'Human', desc: 'A person reviews and signs off.' },
  { k: 'output', label: 'Output', desc: 'Delivers the result to its destination.' },
]

export function WorkflowAnatomy() {
  return (
    <Section id="anatomy">
      <Reveal>
        <Eyebrow>Workflow anatomy</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-display text-section text-balance text-ink">
          Eight primitives. Infinite systems.
        </h2>
        <p className="mt-5 max-w-prose text-[17px] leading-relaxed text-muted">
          Every workflow is composed from the same set of building blocks. Combine them and
          you get anything from a single lookup to a multi-step enterprise process.
        </p>
      </Reveal>

      {/* live arrangement of the primitives */}
      <Reveal delay={0.05} className="mt-10">
        <WorkflowCanvas graph={anatomyWorkflow} className="h-[420px] sm:h-[480px]" />
      </Reveal>

      {/* legend — real node chips, not icon cards */}
      <Reveal delay={0.05} className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {PRIMITIVES.map((p) => (
          <div key={p.k} className="flex items-start gap-3 rounded-sm border border-line bg-panel/50 p-4">
            <span className="mt-0.5">
              {/* small glyph chip */}
              <span className="flex h-7 w-7 items-center justify-center rounded-sm border border-line bg-canvas">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: {
                      trigger: '#7BD88F',
                      agent: '#E8FF52',
                      tool: '#7EE0D6',
                      data: '#9AA0A6',
                      decision: '#F0B23E',
                      mcp: '#A7E8E0',
                      approval: '#F0B23E',
                      output: '#ECECE6',
                    }[p.k],
                  }}
                />
              </span>
            </span>
            <div>
              <p className="text-[14px] font-medium text-ink">{p.label}</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-muted">{p.desc}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </Section>
  )
}
