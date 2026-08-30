import { Eyebrow, Reveal, Section } from './ui/primitives'

/** Systems an AI agent can reach through Tools + MCP. */
const SYSTEMS = [
  'CRM',
  'Database',
  'Files',
  'APIs',
  'Internal Tools',
  'Web',
  'Code',
  'Slack',
  'Email',
  'Warehouse',
]

export function AiMcpArchitecture() {
  return (
    <Section id="architecture" className="bg-[#0B0C0E]">
      <Reveal>
        <Eyebrow>AI &amp; MCP architecture</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-display text-section text-balance text-ink">
          Agents reach your stack through Tools and MCP.
        </h2>
        <p className="mt-5 max-w-prose text-[17px] leading-relaxed text-muted">
          An agent never touches your systems directly. It calls <span className="text-ink">Tools</span>,
          and tools talk to the world through the{' '}
          <span className="text-ink">Model Context Protocol</span> — a standard bridge to the
          software your business already runs on.
        </p>
      </Reveal>

      {/* architecture diagram: agent core <-> tools <-> systems */}
      <Reveal delay={0.05} className="mt-12 grid gap-px overflow-hidden border border-line bg-line lg:grid-cols-3">
        {/* agent */}
        <div className="bg-canvas p-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">AI Agent</p>
          <div className="mt-5 rounded-sm border border-accent/40 bg-panel p-5 shadow-glow">
            <p className="text-[15px] font-medium text-ink">Reasoning core</p>
            <ul className="mt-3 space-y-1.5 font-mono text-[12px] text-muted">
              <li>· plans steps</li>
              <li>· selects tools</li>
              <li>· transforms data</li>
              <li>· generates output</li>
            </ul>
          </div>
        </div>

        {/* bridge */}
        <div className="relative bg-canvas p-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">Tools &amp; MCP</p>
          <div className="mt-5 space-y-3">
            <div className="rounded-sm border border-line bg-panel p-4">
              <p className="text-[14px] text-ink">Tool · search</p>
              <p className="mt-1 font-mono text-[11px] text-faint">mcp.call(&quot;crm.search&quot;)</p>
            </div>
            <div className="rounded-sm border border-line bg-panel p-4">
              <p className="text-[14px] text-ink">Tool · write</p>
              <p className="mt-1 font-mono text-[11px] text-faint">mcp.call(&quot;db.upsert&quot;)</p>
            </div>
            <div className="rounded-sm border border-line bg-panel p-4">
              <p className="text-[14px] text-ink">Tool · run</p>
              <p className="mt-1 font-mono text-[11px] text-faint">mcp.call(&quot;code.exec&quot;)</p>
            </div>
          </div>
          <p className="absolute inset-x-0 bottom-5 hidden text-center font-mono text-[10px] text-faint lg:block">
            standardized bridge
          </p>
        </div>

        {/* systems */}
        <div className="bg-canvas p-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Your systems</p>
          <div className="mt-5 grid grid-cols-2 gap-2">
            {SYSTEMS.map((s) => (
              <div
                key={s}
                className="rounded-sm border border-line bg-panel px-3 py-2.5 text-center text-[13px] text-muted"
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
