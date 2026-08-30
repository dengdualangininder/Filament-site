import { Eyebrow, Reveal, Section } from './ui/primitives'

const STEPS = ['Prompt', 'Chat', 'Copy', 'Paste', 'Repeat']

export function Problem() {
  return (
    <Section id="problem">
      <Reveal>
        <Eyebrow>The problem</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-display text-section text-balance text-ink">
          Most teams still run AI like a vending machine.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        {/* The loop */}
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-faint">
            Today&apos;s default workflow
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <span className="rounded-sm border border-line bg-panel px-4 py-3 font-display text-lg text-ink">
                  {s}
                </span>
                {i < STEPS.length - 1 && (
                  <span className="text-faint" aria-hidden>
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-prose text-[16px] leading-relaxed text-muted">
            It works for one-off questions. But it doesn&apos;t scale to an organization.
            Knowledge lives in chat histories, nothing is reproducible, approvals are
            informal, and the same prompt is typed again and again. The AI is doing the
            work — but no one owns the <span className="text-ink">system</span>.
          </p>
        </Reveal>

        {/* The cost */}
        <Reveal delay={0.06}>
          <dl className="divide-y divide-line border-y border-line">
            {[
              ['Repetition', 'The same prompt re-typed for every case.'],
              ['No audit trail', 'Decisions vanish into chat threads.'],
              ['Informal approval', 'Sensitive actions signed off by accident.'],
              ['Brittle handoffs', 'A human must copy results between tools.'],
            ].map(([t, d]) => (
              <div key={t} className="flex items-baseline justify-between gap-6 py-4">
                <dt className="text-[15px] text-ink">{t}</dt>
                <dd className="max-w-[55%] text-right text-sm text-muted">{d}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}
