import { useMemo } from 'react'
import type { WorkflowGraph, WorkflowNode } from '../../lib/types'
import { NODE_W, NODE_H } from '../../lib/types'

/** Mini overview map. Click to recenter (centerOn receives world coords). */
export function Minimap({
  graph,
  view,
  onSeek,
}: {
  graph: WorkflowGraph
  view: { scale: number; x: number; y: number }
  onSeek: (wx: number, wy: number) => void
}) {
  const W = 180
  const H = 110
  const pad = 10
  const sx = (W - pad * 2) / graph.width
  const sy = (H - pad * 2) / graph.height
  const s = Math.min(sx, sy)

  const vp = useMemo(() => {
    // current viewport rectangle in world coords
    const vw = (typeof window !== 'undefined' ? window.innerWidth : 1200) / view.scale
    const vh = (typeof window !== 'undefined' ? window.innerHeight : 700) / view.scale
    const cx = (-view.x + (typeof window !== 'undefined' ? window.innerWidth : 1200) / 2) / view.scale
    const cy = (-view.y + (typeof window !== 'undefined' ? window.innerHeight : 700) / 2) / view.scale
    return { x: cx - vw / 2, y: cy - vh / 2, w: vw, h: vh }
  }, [view])

  return (
    <div
      className="overflow-hidden rounded-sm border border-line bg-canvas/80"
      style={{ width: W, height: H }}
      aria-hidden
    >
      <svg width={W} height={H} className="block">
        {graph.nodes.map((n: WorkflowNode) => (
          <rect
            key={n.id}
            x={pad + n.x * s}
            y={pad + n.y * s}
            width={NODE_W * s}
            height={NODE_H * s}
            rx={1}
            fill="#3A3D42"
          />
        ))}
        {/* viewport rect */}
        <rect
          x={pad + vp.x * s}
          y={pad + vp.y * s}
          width={vp.w * s}
          height={vp.h * s}
          fill="rgba(232,255,82,0.10)"
          stroke="#E8FF52"
          strokeWidth={0.8}
        />
      </svg>
      <button
        className="absolute inset-0 cursor-crosshair"
        style={{ position: 'absolute' }}
        onClick={(e) => {
          const r = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect()
          const px = (e.clientX - r.left - pad) / s
          const py = (e.clientY - r.top - pad) / s
          onSeek(px, py)
        }}
        aria-label="Jump to area on canvas"
        tabIndex={-1}
      />
    </div>
  )
}
