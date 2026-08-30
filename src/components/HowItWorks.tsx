import { useTranslation } from 'react-i18next'
import { Eyebrow, Reveal, Section } from './ui/primitives'

const STEPS = [
  {
    n: '01',
    t: 'Design',
    d: 'Lay out the workflow on the canvas. Drag nodes for agents, tools, data, logic, and approval gates.',
  },
  {
    n: '02',
    t: 'Connect',
    d: 'Wire nodes together to define control flow. Each connection is a real, inspectable step — not prose.',
  },
  {
    n: '03',
    t: 'Run',
    d: 'Execute the workflow. Agents reason and call tools; humans are prompted only at the gates you set.',
  },
  {
    n: '04',
    t: 'Observe',
    d: 'Watch each run: where it branched, what it decided, who approved, and what it produced. Then improve it.',
  },
]

export function HowItWorks() {
  const { t } = useTranslation()
  return (
    <Section id="how">
      <Reveal>
        <Eyebrow>{t('howItWorks.eyebrow')}</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-display text-section text-balance text-ink">
          {t('howItWorks.title')}
        </h2>
      </Reveal>

      <Reveal delay={0.04} className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <div key={s.n} className="group flex flex-col bg-canvas p-7 transition-colors hover:bg-[#101113]">
            <span className="font-mono text-[12px] tracking-[0.18em] text-accent">{s.n}</span>
            <h3 className="mt-5 font-display text-2xl text-ink">{s.t}</h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{s.d}</p>
          </div>
        ))}
      </Reveal>
    </Section>
  )
}
