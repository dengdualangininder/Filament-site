import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { WorkflowGraph, WorkflowNode } from '../../lib/types'
import { usePanZoom } from './usePanZoom'
import { WorkflowNode as NodeView } from './WorkflowNode'
import { WorkflowEdge } from './WorkflowEdge'
import { NodeInspector } from './NodeInspector'
import { Minimap } from './Minimap'
import { KIND_META } from './nodeVisuals'

type RunState = 'idle' | 'running' | 'done'

export function WorkflowCanvas({
  graph,
  className = '',
  /** When true, the inspector is hidden (used in compact contexts). */
  hideInspector = false,
  /** Auto-run the demo once on mount (used in the hero). */
  autoRun = false,
  /** Compact mode for small viewports: hides node meta, tighter controls. */
  compact = false,
}: {
  graph: WorkflowGraph
  className?: string
  hideInspector?: boolean
  autoRun?: boolean
  compact?: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const { view, setView, setViewportSize: setViewport, fit, zoomBy, centerOn } = usePanZoom(graph.width, graph.height)

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hoverId, setHoverId] = useState<string | null>(null)
  const [run, setRun] = useState<RunState>('idle')
  const [liveEdges, setLiveEdges] = useState<Set<string>>(new Set())
  const [reduced, setReduced] = useState(false)

  // measure
  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect()
      setSize({ w: r.width, h: r.height })
      setViewport(r.width, r.height)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [setViewport])

  // reduced motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const fn = () => setReduced(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  // fit on first size
  const fitted = useRef(false)
  useEffect(() => {
    if (size.w && size.h && !fitted.current) {
      fit(size.w, size.h)
      fitted.current = true
    }
  }, [size, fit])

  // pan / pinch via pointer events
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map())
  const panStart = useRef<{ x: number; y: number; vx: number; vy: number } | null>(null)
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null)

  const onPointerDown = (e: React.PointerEvent) => {
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.current.size === 1) {
      panStart.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y }
    } else if (pointers.current.size === 2) {
      const pts = [...pointers.current.values()]
      pinchStart.current = {
        dist: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y),
        scale: view.scale,
      }
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (pointers.current.size === 2 && pinchStart.current) {
      const pts = [...pointers.current.values()]
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y)
      const rect = containerRef.current!.getBoundingClientRect()
      const cx = (pts[0].x + pts[1].x) / 2 - rect.left
      const cy = (pts[0].y + pts[1].y) / 2 - rect.top
      const factor = dist / pinchStart.current.dist
      zoomBy(factor, cx, cy)
      pinchStart.current.dist = dist
      return
    }

    if (panStart.current && pointers.current.size === 1) {
      const dx = e.clientX - panStart.current.x
      const dy = e.clientY - panStart.current.y
      setViewportDirect(panStart.current.vx + dx, panStart.current.vy + dy)
    }
  }

  const setViewportDirect = useCallback(
    (x: number, y: number) => {
      setView((v) => ({ ...v, x, y }))
    },
    [setView],
  )

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId)
    if (pointers.current.size < 2) pinchStart.current = null
    if (pointers.current.size === 0) panStart.current = null
  }

  // wheel zoom (native, non-passive)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handler = (e: WheelEvent) => {
      e.preventDefault()
      const rect = el.getBoundingClientRect()
      const cx = e.clientX - rect.left
      const cy = e.clientY - rect.top
      const factor = Math.exp(-e.deltaY * 0.0014)
      zoomBy(factor, cx, cy)
    }
    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  }, [zoomBy])

  // run demo: light nodes + edges sequentially
  const runDemo = useCallback(() => {
    setRun('running')
    const order = graph.nodes.map((n) => n.id)
    const edges = graph.edges.map((e) => e.id)
    if (reduced) {
      setLiveEdges(new Set(edges))
      setRun('done')
      return
    }
    setLiveEdges(new Set())
    let i = 0
    const stepNode = () => {
      if (i >= order.length) {
        setRun('done')
        return
      }
      const id = order[i]
      setSelectedId(id)
      // light edges leaving this node
      setLiveEdges((prev) => {
        const next = new Set(prev)
        graph.edges.forEach((e) => {
          if (e.from === id) next.add(e.id)
        })
        return next
      })
      i++
      window.setTimeout(stepNode, 620)
    }
    stepNode()
  }, [graph, reduced])

  useEffect(() => {
    if (autoRun) {
      const t = window.setTimeout(runDemo, 700)
      return () => window.clearTimeout(t)
    }
  }, [autoRun, runDemo])

  const selectedNode = graph.nodes.find((n) => n.id === selectedId) ?? null

  return (
    <div className={`flex h-full w-full flex-col overflow-hidden rounded-md border border-line bg-[#0B0C0E] ${className}`}>
      {/* toolbar */}
      <div className="flex items-center justify-between gap-3 border-b border-line bg-panel/70 px-3 py-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="h-2 w-2 rounded-full bg-[#E5564B]" />
          <span className="h-2 w-2 rounded-full bg-[#F0B23E]" />
          <span className="h-2 w-2 rounded-full bg-[#7BD88F]" />
          <span className="ml-2 truncate font-mono text-[11px] text-faint">{graph.name}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={runDemo}
            disabled={run === 'running'}
            className="inline-flex items-center gap-1.5 rounded-sm border border-line bg-canvas px-2.5 py-1 font-mono text-[11px] text-ink transition-colors hover:border-ink/50 disabled:opacity-50"
          >
            <svg width="9" height="9" viewBox="0 0 10 10" className="fill-accent">
              <path d="M2 1l7 4-7 4z" />
            </svg>
            {run === 'done' ? 'REPLAY' : 'RUN'}
          </button>
          <div className="hidden items-center gap-1 sm:flex">
            <ControlBtn label="Zoom out" onClick={() => zoomBy(0.85, size.w / 2, size.h / 2)}>−</ControlBtn>
            <ControlBtn label="Zoom in" onClick={() => zoomBy(1.18, size.w / 2, size.h / 2)}>+</ControlBtn>
            <ControlBtn label="Fit" onClick={() => fit(size.w, size.h)}>⤢</ControlBtn>
          </div>
        </div>
      </div>

      {/* canvas body */}
      <div className="relative flex min-h-0 flex-1">
        <div
          ref={containerRef}
          className="canvas-grid relative min-h-0 flex-1 touch-none overflow-hidden"
          style={{ cursor: panStart.current ? 'grabbing' : 'grab' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {/* world */}
          <div
            className="absolute left-0 top-0 origin-top-left"
            style={{
              transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
              width: graph.width,
              height: graph.height,
            }}
          >
            {/* edges */}
            <svg
              className="absolute left-0 top-0 overflow-visible"
              width={graph.width}
              height={graph.height}
              style={{ pointerEvents: 'none' }}
            >
              {graph.edges.map((e) => (
                <WorkflowEdge
                  key={e.id}
                  edge={{ ...e, live: liveEdges.has(e.id) }}
                  nodes={graph.nodes}
                />
              ))}
            </svg>

            {/* nodes */}
            {graph.nodes.map((n: WorkflowNode) => (
              <div
                key={n.id}
                onPointerEnter={() => setHoverId(n.id)}
                onPointerLeave={() => setHoverId((h) => (h === n.id ? null : h))}
                className="nodrag"
              >
                <NodeView
                  node={n}
                  selected={selectedId === n.id}
                  onSelect={(id) => {
                    setSelectedId(id)
                    if (hoverId) setHoverId(null)
                  }}
                />
              </div>
            ))}
          </div>

          {/* minimap (desktop) */}
          {!compact && size.w > 560 && (
            <div className="absolute bottom-3 right-3 z-10">
              <Minimap graph={graph} view={view} onSeek={centerOn} />
            </div>
          )}

          {/* hint */}
          <div className="pointer-events-none absolute bottom-3 left-3 z-10 hidden font-mono text-[10px] text-faint sm:block">
            scroll / pinch to zoom · drag to pan · click a node
          </div>
        </div>

        {/* inspector */}
        {!hideInspector && (
          <NodeInspector node={selectedNode} onClose={() => setSelectedId(null)} />
        )}
      </div>
    </div>
  )
}

function ControlBtn({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode
  onClick: () => void
  label: string
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex h-7 w-7 items-center justify-center rounded-sm border border-line bg-canvas font-mono text-sm text-ink transition-colors hover:border-ink/50"
    >
      {children}
    </button>
  )
}

// re-export for convenience
export { KIND_META }
