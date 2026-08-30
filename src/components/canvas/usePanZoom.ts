import { useCallback, useRef, useState } from 'react'

export interface View {
  scale: number
  x: number
  y: number
}

const MIN = 0.35
const MAX = 1.8

export function clampScale(s: number) {
  return Math.min(MAX, Math.max(MIN, s))
}

/**
 * Pan/zoom controller for the workflow canvas.
 * World→screen: screen = world * scale + offset.
 * Works with pointer events (mouse + touch + pinch).
 */
export function usePanZoom(worldW: number, worldH: number) {
  const [view, setView] = useState<View>({ scale: 1, x: 0, y: 0 })
  const [full, setFull] = useState(false)
  const vp = useRef<{ w: number; h: number }>({ w: 0, h: 0 })

  const setViewport = useCallback((w: number, h: number) => {
    vp.current = { w, h }
  }, [])

  /** Fit the whole world into the viewport with padding. */
  const fit = useCallback((w: number, h: number) => {
    const pad = 48
    const s = clampScale(Math.min((w - pad * 2) / worldW, (h - pad * 2) / worldH))
    const x = (w - worldW * s) / 2
    const y = (h - worldH * s) / 2
    setView({ scale: s, x, y })
    setFull(true)
  }, [worldW, worldH])

  const zoomBy = useCallback((factor: number, cx: number, cy: number) => {
    setView((v) => {
      const ns = clampScale(v.scale * factor)
      const k = ns / v.scale
      // keep the point under (cx,cy) stable
      const nx = cx - (cx - v.x) * k
      const ny = cy - (cy - v.y) * k
      return { scale: ns, x: nx, y: ny }
    })
    setFull(false)
  }, [])

  const panBy = useCallback((dx: number, dy: number) => {
    setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }))
    setFull(false)
  }, [])

  /** Center a world point in the viewport. */
  const centerOn = useCallback((wx: number, wy: number) => {
    const { w, h } = vp.current
    setView((v) => ({ ...v, x: w / 2 - wx * v.scale, y: h / 2 - wy * v.scale }))
    setFull(false)
  }, [])

  return { view, setView, setViewportSize: setViewport, full, setFull, fit, zoomBy, panBy, centerOn }
}
