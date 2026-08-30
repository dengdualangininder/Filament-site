import type { NodeKind } from '../../lib/types'

export interface KindMeta {
  tag: string
  /** Signal color for this kind's rail, glyph, and ports. */
  color: string
  /** One-line description used in the inspector. */
  blurb: string
  /** Mock config rows shown in the inspector for this kind. */
  config: Array<[string, string]>
}

/** Canonical visual + semantic metadata per node kind. */
export const KIND_META: Record<NodeKind, KindMeta> = {
  trigger: {
    tag: 'TRIGGER',
    color: '#7BD88F',
    blurb: 'Entry point. Starts the workflow on a schedule, event, or webhook.',
    config: [
      ['source', 'webhook / schedule'],
      ['auth', 'signed'],
      ['retries', '3'],
    ],
  },
  agent: {
    tag: 'AI AGENT',
    color: '#E8FF52',
    blurb: 'Reasoning core. Plans steps, selects tools, and transforms data.',
    config: [
      ['model', 'frontier-llm'],
      ['temperature', '0.2'],
      ['tools', 'auto-select'],
      ['memory', 'session'],
    ],
  },
  tool: {
    tag: 'TOOL',
    color: '#7EE0D6',
    blurb: 'A callable capability the agent can invoke (search, parse, compute).',
    config: [
      ['type', 'function'],
      ['timeout', '30s'],
      ['stream', 'false'],
    ],
  },
  mcp: {
    tag: 'MCP SERVER',
    color: '#A7E8E0',
    blurb: 'Model Context Protocol server bridging external systems.',
    config: [
      ['transport', 'stdio / http'],
      ['scope', 'crm, db, files'],
      ['sandbox', 'true'],
    ],
  },
  data: {
    tag: 'DATA',
    color: '#9AA0A6',
    blurb: 'Structured input, dataset, or state passed into the workflow.',
    config: [
      ['format', 'json / parquet'],
      ['source', 'warehouse'],
      ['volume', '~12k rows'],
    ],
  },
  decision: {
    tag: 'DECISION',
    color: '#F0B23E',
    blurb: 'Branching logic. Evaluates a condition and routes the flow.',
    config: [
      ['expr', 'risk.score > 0.6'],
      ['branches', 'approve / review'],
    ],
  },
  approval: {
    tag: 'HUMAN APPROVAL',
    color: '#F0B23E',
    blurb: 'A gate where a person reviews and signs off before continue.',
    config: [
      ['assignee', 'risk-team'],
      ['sla', '4h'],
      ['fallback', 'escalate'],
    ],
  },
  execute: {
    tag: 'AUTO EXECUTE',
    color: '#7BD88F',
    blurb: 'Runs the resolved action against the target system.',
    config: [
      ['mode', 'automated'],
      ['confirm', 'gate passed'],
    ],
  },
  output: {
    tag: 'OUTPUT',
    color: '#ECECE6',
    blurb: 'Delivers the result: record, message, artifact, or event.',
    config: [
      ['target', 'crm / queue'],
      ['format', 'typed'],
    ],
  },
}

/** Small line-art glyph per kind. No emoji, no gradients. */
export function NodeGlyph({ kind, className }: { kind: NodeKind; className?: string }) {
  const c = KIND_META[kind].color
  const common = { width: 14, height: 14, viewBox: '0 0 14 14', fill: 'none', stroke: c, strokeWidth: 1.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, className }
  switch (kind) {
    case 'trigger':
      return (<svg {...common}><path d="M4 3l6 4-6 4z" fill={c} stroke="none" /></svg>)
    case 'agent':
      return (<svg {...common}><path d="M7 2l4 2v4l-4 2-4-2V4z" /></svg>)
    case 'tool':
      return (<svg {...common}><circle cx="7" cy="7" r="2.4" /><path d="M7 1.5v1.6M7 10.9v1.6M1.5 7h1.6M10.9 7h1.6" /></svg>)
    case 'mcp':
      return (<svg {...common}><path d="M7 1.5l5 2.9v5.2L7 12.5 2 9.6V4.4z" /></svg>)
    case 'data':
      return (<svg {...common}><path d="M2 4c0-1.1 2.2-2 5-2s5 .9 5 2-2.2 2-5 2-5-.9-5-2z" /><path d="M2 7c0 1.1 2.2 2 5 2s5-.9 5-2" /><path d="M2 10c0 1.1 2.2 2 5 2s5-.9 5-2" /></svg>)
    case 'decision':
      return (<svg {...common}><path d="M7 1.5l5.2 5.2L7 12.5 1.8 6.7z" /><path d="M5 7h4M7 5v4" /></svg>)
    case 'approval':
      return (<svg {...common}><circle cx="5" cy="9" r="2.2" /><path d="M3.4 9l1.2 1.2L7 8" /><path d="M9.5 5.5l2 2-3.2 3.2" /></svg>)
    case 'execute':
      return (<svg {...common}><path d="M3 2l8 5-8 5z" fill={c} stroke="none" /></svg>)
    case 'output':
      return (<svg {...common}><path d="M2 4h7v6H2z" /><path d="M9 7h3M11.5 5.5L13 7l-1.5 1.5" /></svg>)
    default:
      return null
  }
}
