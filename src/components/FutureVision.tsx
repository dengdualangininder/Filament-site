import { useTranslation } from 'react-i18next'
import { Eyebrow, Reveal, Section } from './ui/primitives'
import { WorkflowCanvas } from './canvas/WorkflowCanvas'
import { visionWorkflow } from '../data/workflows'

const VISIONS = [
  {
    t: 'Visual Workflows',
    d: 'Compose any process as a graph — already the foundation of this site.',
    now: true,
  },
  {
    t: 'AI Agents',
    d: 'Autonomous agents that plan and act within the bounds you set.',
    now: true,
  },
  {
    t: 'Multi-Agent Systems',
    d: 'Orchestrate teams of specialized agents that hand off to each other.',
    now: false,
  },
  {
    t: 'Enterprise Automation',
    d: 'Connect to the systems of record across your whole organization.',
    now: false,
  },
  {
    t: 'AI Operating System',
    d: 'A shared runtime where workflows are the unit of work — for every team.',
    now: false,
  },
]

export function FutureVision() {
  const { t } = useTranslation()
  return (
    <Section id="vision" className="bg-[#0B0C0E]">
      <Reveal>
        <Eyebrow>{t('vision.eyebrow')}</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-display text-section text-balance text-ink">
          {t('vision.title')}
        </h2>
        <p className="mt-5 max-w-prose text-[17px] leading-relaxed text-muted">
          {t('vision.subtitle')}
        </p>
      </Reveal>

      <Reveal delay={0.05} className="mt-10">
        <WorkflowCanvas graph={visionWorkflow} className="h-[380px] sm:h-[440px]" />
      </Reveal>

      <Reveal delay={0.05} className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {VISIONS.map((v) => (
          <div key={v.t} className="flex flex-col bg-canvas p-7">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-xl text-ink">{v.t}</h3>
              {v.now ? (
                <span className="rounded-sm border border-ok/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ok">
                  Now
                </span>
              ) : (
                <span className="rounded-sm border border-warn/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-warn">
                  Vision
                </span>
              )}
            </div>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{v.d}</p>
          </div>
        ))}
      </Reveal>

      <p className="mt-6 font-mono text-[11px] text-faint">
        {t('vision.disclaimer')}
      </p>
    </Section>
  )
}
