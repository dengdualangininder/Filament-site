import { Reveal, Section } from './ui/primitives'

export function NewParadigm() {
  const before = ['Human', 'Prompt', 'AI', 'Copy result', 'Human']
  const after = [
    { t: 'Trigger', c: '#7BD88F' },
    { t: 'Agent', c: '#E8FF52' },
    { t: 'Tools', c: '#7EE0D6' },
    { t: 'Decision', c: '#F0B23E' },
    { t: 'Approval', c: '#F0B23E' },
    { t: 'Execution', c: '#7BD88F' },
  ]

  return (
    <Section id="paradigm" className="bg-[#0B0C0E]">
      <Reveal>
        <p className="font-display text-statement text-balance text-ink">
          FROM <span className="text-faint">PROMPTS</span> TO <span className="text-accent">SYSTEMS</span>
        </p>
        <p className="mt-6 max-w-prose text-[17px] leading-relaxed text-muted">
          The shift isn&apos;t bigger prompts. It&apos;s replacing the loop with a structure:
          a workflow that runs the same way every time, with people in control of the gates
          that matter.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line lg:grid-cols-2">
        {/* before */}
        <div className="bg-canvas p-7 sm:p-9">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Before · the loop</p>
          <div className="mt-6 flex flex-col gap-2.5">
            {before.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-faint">0{i + 1}</span>
                <span className="rounded-sm border border-line bg-panel px-4 py-2.5 text-[15px] text-muted">
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* after */}
        <div className="bg-canvas p-7 sm:p-9">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">After · the system</p>
          <div className="mt-6 flex flex-col gap-2.5">
            {after.map((s, i) => (
              <div key={s.t} className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-faint">0{i + 1}</span>
                <span className="flex items-center gap-3 rounded-sm border border-line bg-panel px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.c }} />
                  <span className="text-[15px] text-ink">{s.t}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
