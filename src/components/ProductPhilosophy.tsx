import { Eyebrow, Reveal, Section } from './ui/primitives'

export function ProductPhilosophy() {
  return (
    <Section id="philosophy">
      <Reveal>
        <Eyebrow>Product philosophy</Eyebrow>
      </Reveal>

      {/* Massive statement — the core split of responsibility */}
      <Reveal delay={0.04}>
        <h2 className="mt-6 font-display text-[clamp(2.4rem,7vw,6.5rem)] leading-[0.96] tracking-[-0.03em] text-balance">
          <span className="text-ink">Human designs</span>{' '}
          <span className="text-faint">the system.</span>
          <br />
          <span className="text-accent">AI executes</span>{' '}
          <span className="text-faint">the system.</span>
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-px overflow-hidden border border-line bg-line lg:grid-cols-2">
        {/* human */}
        <div className="bg-canvas p-8">
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink">Human owns</p>
          <ul className="mt-6 space-y-3">
            {['Workflow design', 'Permissions', 'Tool access', 'Business rules', 'Approval gates'].map((x) => (
              <li key={x} className="flex items-center gap-3 text-[16px] text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                {x}
              </li>
            ))}
          </ul>
        </div>
        {/* ai */}
        <div className="bg-canvas p-8">
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-accent">AI executes</p>
          <ul className="mt-6 space-y-3">
            {['Reasoning', 'Tool selection', 'Execution', 'Transformation', 'Generation'].map((x) => (
              <li key={x} className="flex items-center gap-3 text-[16px] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
