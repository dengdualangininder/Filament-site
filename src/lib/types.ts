export type NodeKind =
  | 'trigger'
  | 'agent'
  | 'tool'
  | 'mcp'
  | 'data'
  | 'decision'
  | 'approval'
  | 'execute'
  | 'output'

export type NodeStatus = 'idle' | 'running' | 'done' | 'pending'

/** A single node in a workflow. Coordinates are in *world* space (px). */
export interface WorkflowNode {
  id: string
  kind: NodeKind
  title: string
  /** Short mono subtitle, e.g. the tool/agent name. */
  meta?: string
  /** Optional second line of mock config shown in the inspector. */
  detail?: string
  x: number
  y: number
  status?: NodeStatus
  /** Marks nodes that are part of the "Vision / coming next" roadmap. */
  vision?: boolean
}

/** A directed connection between two nodes. */
export interface WorkflowEdge {
  id: string
  from: string
  to: string
  /** Animated flowing edge (used for the live demo run). */
  live?: boolean
  /** Edge semantic channel, drives color. */
  channel?: 'default' | 'tool' | 'approval' | 'fail'
}

export interface WorkflowGraph {
  id: string
  name: string
  /** World-space bounds, used to size the canvas + minimap. */
  width: number
  height: number
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
}

/** Fixed node box size — keeps edge anchors deterministic. */
export const NODE_W = 212
export const NODE_H = 96

/** Port anchor points (world coords) for a node. */
export function outputAnchor(n: WorkflowNode) {
  return { x: n.x + NODE_W, y: n.y + NODE_H / 2 }
}
export function inputAnchor(n: WorkflowNode) {
  return { x: n.x, y: n.y + NODE_H / 2 }
}
