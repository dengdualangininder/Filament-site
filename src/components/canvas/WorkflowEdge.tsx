import { memo } from 'react'
import type { WorkflowEdge as Edge, WorkflowNode } from '../../lib/types'
import { inputAnchor, outputAnchor } from '../../lib/types'

const CHANNEL_COLOR: Record<NonNullable<Edge['channel']>, string> = {
  default: '#ECECE6',
  tool: '#7EE0D6',
  approval: '#F0B23E',
  fail: '#E5564B',
}

function curve(x1: number, y1: number, x2: number, y2: number) {
  const dx = Math.max(40, Math.abs(x2 - x1) * 0.5)
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`
}

export const WorkflowEdge = memo(function WorkflowEdge({
  edge,
  nodes,
}: {
  edge: Edge
  nodes: WorkflowNode[]
}) {
  const from = nodes.find((n) => n.id === edge.from)
  const to = nodes.find((n) => n.id === edge.to)
  if (!from || !to) return null

  const a = outputAnchor(from)
  const b = inputAnchor(to)
  const d = curve(a.x, a.y, b.x, b.y)
  const color = CHANNEL_COLOR[edge.channel ?? 'default']
  const live = edge.live

  return (
    <g>
      {/* base line */}
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeOpacity={live ? 0.95 : 0.38}
        strokeWidth={live ? 2 : 1.4}
      />
      {/* animated flow overlay */}
      {live && (
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeDasharray="4 12"
          className="edge-live animate-dash"
        />
      )}
      {/* target dot */}
      <circle cx={b.x} cy={b.y} r={2.6} fill={color} />
    </g>
  )
})
