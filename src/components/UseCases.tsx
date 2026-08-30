import { useState } from 'react'
import { Eyebrow, Reveal, Section } from './ui/primitives'
import { WorkflowCanvas } from './canvas/WorkflowCanvas'
import { useCaseWorkflows } from '../data/workflows'

const TABS = [
  {
    key: 'banking',
    label: 'Banking',
    blurb: 'Onboard and review customers with an auditable, human-approved path.',
  },
  {
    key: 'hr',
    label: 'HR',
    blurb: 'Provision accounts and notify people the moment a hire is confirmed.',
  },
  {
    key: 'support',
    label: 'Customer Support',
    blurb: 'Classify, search knowledge, and escalate — without losing the thread.',
  },
  {
    key: 'engineering',
    label: 'Software Engineering',
    blurb: 'Turn an issue into code, tests, review, and a gated deploy.',
  },
] as const

export function UseCases() {
  const [active, setActive] = useState<(typeof TABS)[number]['key']>('banking')
  const graph = useCaseWorkflows[active]

  return (
    <Section id="usecases">
      <Reveal>
        <Eyebrow>Use cases</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-display text-section text-balance text-ink">
          One canvas, every department.
        </h2>
      </Reveal>

      {/* tabs */}
      <Reveal delay={0.04} className="mt-9">
        <div className="flex flex-wrap gap-2 border-b border-line">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={[
                'relative -mb-px border-b-2 px-4 py-3 text-[14px] transition-colors',
                active === t.key
                  ? 'border-accent text-ink'
                  : 'border-transparent text-muted hover:text-ink',
              ].join(' ')}
              aria-pressed={active === t.key}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.04} className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <h3 className="font-display text-2xl text-ink">
            {TABS.find((t) => t.key === active)?.label}
          </h3>
          <p className="mt-3 max-w-prose text-[16px] leading-relaxed text-muted">
            {TABS.find((t) => t.key === active)?.blurb}
          </p>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            See the flow →
          </p>
        </div>
        <WorkflowCanvas graph={graph} compact hideInspector className="h-[340px] sm:h-[400px]" />
      </Reveal>
    </Section>
  )
}
