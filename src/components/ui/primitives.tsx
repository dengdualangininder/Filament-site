import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { NodeKind } from '../../lib/types'
import { KIND_META, NodeGlyph } from '../canvas/nodeVisuals'

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>
}

export function Section({
  id,
  children,
  className = '',
}: {
  id?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`relative border-t border-line/70 py-20 sm:py-28 lg:py-[120px] ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  )
}

/** Scroll-reveal wrapper. Respects prefers-reduced-motion. */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className = '',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Static (non-absolute) node visual for legends, anatomy, architecture. */
export function NodeChip({
  kind,
  title,
  meta,
  selected = false,
  className = '',
}: {
  kind: NodeKind
  title: string
  meta?: string
  selected?: boolean
  className?: string
}) {
  const m = KIND_META[kind]
  return (
    <div
      className={[
        'relative flex items-center gap-2.5 rounded-sm border bg-panel py-2.5 pl-3.5 pr-3 transition-colors',
        selected ? 'border-accent shadow-glow' : 'border-line',
        className,
      ].join(' ')}
    >
      <span className="absolute left-0 top-0 h-full w-[3px] rounded-l-sm" style={{ background: m.color }} />
      <NodeGlyph kind={kind} className="shrink-0" />
      <div className="min-w-0">
        <div className="truncate text-[13px] font-medium text-ink">{title}</div>
        {meta && <div className="truncate font-mono text-[10.5px] text-faint">{meta}</div>}
      </div>
    </div>
  )
}
