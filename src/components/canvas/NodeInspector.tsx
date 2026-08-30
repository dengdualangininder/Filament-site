import { motion } from 'framer-motion'
import type { WorkflowNode } from '../../lib/types'
import { KIND_META, NodeGlyph } from './nodeVisuals'

export function NodeInspector({ node, onClose }: { node: WorkflowNode | null; onClose: () => void }) {
  if (!node) {
    return (
      <aside className="hidden w-[260px] shrink-0 border-l border-line bg-panel/60 p-5 lg:block">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Inspector</p>
        <p className="mt-4 text-sm text-muted">
          Select a node on the canvas to inspect its configuration.
        </p>
        <div className="mt-6 space-y-2 border-t border-line pt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">Node kinds</p>
          {(Object.keys(KIND_META) as Array<keyof typeof KIND_META>).map((k) => (
            <div key={k} className="flex items-center gap-2 text-sm text-muted">
              <NodeGlyph kind={k} />
              <span className="font-mono text-[11px]">{KIND_META[k].tag}</span>
            </div>
          ))}
        </div>
      </aside>
    )
  }

  const meta = KIND_META[node.kind]

  return (
    <motion.aside
      key={node.id}
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-full shrink-0 flex-col border-t border-line bg-panel/80 p-5 lg:w-[260px] lg:border-l lg:border-t-0"
      aria-label="Node inspector"
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">Inspector</span>
        <button
          onClick={onClose}
          className="text-faint transition-colors hover:text-ink"
          aria-label="Close inspector"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M3 3l8 8M11 3l-8 8" />
          </svg>
        </button>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <NodeGlyph kind={node.kind} />
        <span className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: meta.color }}>
          {meta.tag}
        </span>
      </div>

      <h3 className="mt-2 text-lg font-semibold leading-tight text-ink">{node.title}</h3>
      <p className="mt-2 text-[13px] leading-relaxed text-muted">{meta.blurb}</p>

      {node.detail && (
        <p className="mt-3 rounded-sm border border-line bg-canvas/50 p-2.5 font-mono text-[11px] leading-relaxed text-faint">
          {node.detail}
        </p>
      )}

      <div className="mt-5 border-t border-line pt-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">Configuration</p>
        <dl className="mt-3 space-y-2">
          {meta.config.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-3 text-[12px]">
              <dt className="font-mono text-faint">{k}</dt>
              <dd className="truncate font-mono text-ink/90">{v}</dd>
            </div>
          ))}
          {node.meta && (
            <div className="flex items-center justify-between gap-3 text-[12px]">
              <dt className="font-mono text-faint">name</dt>
              <dd className="truncate font-mono text-ink/90">{node.meta}</dd>
            </div>
          )}
        </dl>
      </div>

      <div className="mt-auto pt-5">
        <div className="flex items-center gap-2 text-[11px] text-faint">
          <span
            className={[
              'h-2 w-2 rounded-full',
              (node.status ?? 'idle') === 'running' ? 'animate-pulse-node bg-accent' : 'bg-faint',
            ].join(' ')}
          />
          {(node.status ?? 'idle').toUpperCase()} · mock node
        </div>
      </div>
    </motion.aside>
  )
}
