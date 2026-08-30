import { useTranslation } from 'react-i18next'
import { Eyebrow, Reveal, Section } from './ui/primitives'

export function ProductPhilosophy() {
  const { t } = useTranslation()
  return (
    <Section id="philosophy">
      <Reveal>
        <Eyebrow>{t('philosophy.eyebrow')}</Eyebrow>
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
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink">{t('philosophy.humanOwns')}</p>
          <ul className="mt-6 space-y-3">
            {[t('philosophy.human1'), t('philosophy.human2'), t('philosophy.human3'), t('philosophy.human4'), t('philosophy.human5')].map((x) => (
              <li key={x} className="flex items-center gap-3 text-[16px] text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                {x}
              </li>
            ))}
          </ul>
        </div>
        {/* ai */}
        <div className="bg-canvas p-8">
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-accent">{t('philosophy.aiExecutes')}</p>
          <ul className="mt-6 space-y-3">
            {[t('philosophy.ai1'), t('philosophy.ai2'), t('philosophy.ai3'), t('philosophy.ai4'), t('philosophy.ai5')].map((x) => (
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
