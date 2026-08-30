import { memo } from 'react'
import type { WorkflowNode as WNode, NodeStatus } from '../../lib/types'
import { NODE_W, NODE_H } from '../../lib/types'
import { KIND_META, NodeGlyph } from './nodeVisuals'

const STATUS_DOT: Record<NodeStatus, string> = {
  idle: '#6B7077',
  running: '#E8FF52',
  done: '#7BD88F',
  pending: '#F0B23E',
}

export const WorkflowNode = memo(function WorkflowNode({
  node,
  selected,
  onSelect,
}: {
  node: WNode
  selected: boolean
  onSelect?: (id: string) => void
}) {
  const meta = KIND_META[node.kind]
  const status = node.status ?? 'idle'

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${meta.tag} node: ${node.title}`}
      onClick={() => onSelect?.(node.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect?.(node.id)
        }
      }}
      className={[
        'group absolute select-none rounded-sm border bg-panel transition-[box-shadow,border-color,transform] duration-150',
        'cursor-pointer',
        selected
          ? 'border-accent shadow-glow'
          : 'border-line hover:border-ink/40',
      ].join(' ')}
      style={{
        left: node.x,
        top: node.y,
        width: NODE_W,
        height: NODE_H,
        transform: selected ? 'translateY(-1px)' : undefined,
      }}
    >
      {/* status rail (left, 2px) */}
      <span
        className="absolute left-0 top-0 h-full w-[3px] rounded-l-sm"
        style={{ background: meta.color, opacity: selected ? 1 : 0.8 }}
      />

      <div className="flex h-full flex-col justify-between py-2.5 pl-4 pr-3">
        <div className="flex items-center justify-between gap-2">
          <span
            className="font-mono text-[10px] font-medium uppercase tracking-[0.18em]"
            style={{ color: meta.color }}
          >
            {meta.tag}
          </span>
          <span
            className={[
              'h-2 w-2 rounded-full',
              status === 'running' ? 'animate-pulse-node' : '',
            ].join(' ')}
            style={{ background: STATUS_DOT[status] }}
            aria-hidden
          />
        </div>

        <div className="flex items-center gap-2">
          <NodeGlyph kind={node.kind} className="shrink-0" />
          <span className="truncate text-[13.5px] font-medium leading-tight text-ink">
            {node.title}
          </span>
        </div>

        {node.meta && (
          <div className="truncate font-mono text-[11px] text-faint">{node.meta}</div>
        )}
      </div>

      {/* input port */}
      <span className="absolute -left-[5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-line bg-canvas" />
      {/* output port */}
      <span className="absolute -right-[5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-line bg-canvas" />
    </div>
  )
})
