import type { WorkflowGraph } from '../lib/types'

/**
 * MOCK WORKFLOW DATA — kept separate from UI so a real workflow engine can
 * later replace these objects with live workflow JSON. The canvas reads only
 * `nodes`, `edges`, `width`, `height`, `name`.
 *
 * Hero / flagship demo: a banking risk-review flow.
 */
export const heroWorkflow: WorkflowGraph = {
  id: 'wf-banking-risk',
  name: 'workflow · banking-risk-review',
  width: 1180,
  height: 620,
  nodes: [
    { id: 't', kind: 'trigger', title: 'Customer Request', meta: 'webhook', x: 40, y: 250, status: 'done' },
    { id: 'a', kind: 'agent', title: 'Triage Agent', meta: 'frontier-llm', x: 300, y: 250, status: 'done' },
    { id: 's', kind: 'tool', title: 'Web Search', meta: 'search.v2', x: 560, y: 90, status: 'done' },
    { id: 'm', kind: 'mcp', title: 'MCP · CRM', meta: 'crm.connect', x: 560, y: 250, status: 'done' },
    { id: 'd', kind: 'decision', title: 'Risk Check', meta: 'score > 0.6', x: 820, y: 250, status: 'running' },
    { id: 'h', kind: 'approval', title: 'Human Approval', meta: 'risk-team', x: 820, y: 440, status: 'pending' },
    { id: 'x', kind: 'execute', title: 'Banking API', meta: 'auto-execute', x: 1080, y: 250, status: 'idle' },
    { id: 'o', kind: 'output', title: 'Confirmation', meta: 'sms + record', x: 1080, y: 440, status: 'idle' },
  ],
  edges: [
    { id: 'e1', from: 't', to: 'a', channel: 'default' },
    { id: 'e2', from: 'a', to: 's', channel: 'tool' },
    { id: 'e3', from: 'a', to: 'm', channel: 'tool' },
    { id: 'e4', from: 's', to: 'd', channel: 'tool' },
    { id: 'e5', from: 'm', to: 'd', channel: 'tool' },
    { id: 'e6', from: 'd', to: 'x', channel: 'default' },
    { id: 'e7', from: 'd', to: 'h', channel: 'approval' },
    { id: 'e8', from: 'h', to: 'o', channel: 'approval' },
    { id: 'e9', from: 'x', to: 'o', channel: 'default' },
  ],
}

/** Anatomy demo: every primitive, one of each. */
export const anatomyWorkflow: WorkflowGraph = {
  id: 'wf-anatomy',
  name: 'workflow · anatomy',
  width: 1180,
  height: 560,
  nodes: [
    { id: 't', kind: 'trigger', title: 'Trigger', meta: 'schedule', x: 30, y: 230 },
    { id: 'a', kind: 'agent', title: 'AI Agent', meta: 'reasoning', x: 290, y: 230 },
    { id: 'tl', kind: 'tool', title: 'Tool', meta: 'function', x: 550, y: 70 },
    { id: 'mc', kind: 'mcp', title: 'MCP Server', meta: 'bridge', x: 550, y: 230 },
    { id: 'dt', kind: 'data', title: 'Data', meta: 'warehouse', x: 550, y: 390 },
    { id: 'd', kind: 'decision', title: 'Logic', meta: 'branch', x: 810, y: 230 },
    { id: 'h', kind: 'approval', title: 'Human', meta: 'gate', x: 1070, y: 390 },
    { id: 'o', kind: 'output', title: 'Output', meta: 'deliver', x: 1070, y: 230 },
  ],
  edges: [
    { id: 'e1', from: 't', to: 'a' },
    { id: 'e2', from: 'a', to: 'tl', channel: 'tool' },
    { id: 'e3', from: 'a', to: 'mc', channel: 'tool' },
    { id: 'e4', from: 'a', to: 'dt' },
    { id: 'e5', from: 'tl', to: 'd', channel: 'tool' },
    { id: 'e6', from: 'mc', to: 'd', channel: 'tool' },
    { id: 'e7', from: 'dt', to: 'd' },
    { id: 'e8', from: 'd', to: 'o' },
    { id: 'e9', from: 'd', to: 'h', channel: 'approval' },
  ],
}

/**
 * Per-industry use-case graphs. Each uses the canonical node vocabulary.
 * Kept compact so they can be dropped into smaller canvases.
 */
export const useCaseWorkflows: Record<string, WorkflowGraph> = {
  banking: {
    id: 'wf-banking',
    name: 'use-case · banking',
    width: 980,
    height: 360,
    nodes: [
      { id: 't', kind: 'trigger', title: 'Customer Request', meta: 'webhook', x: 20, y: 130 },
      { id: 'a', kind: 'agent', title: 'Agent', meta: 'frontier-llm', x: 250, y: 130 },
      { id: 'au', kind: 'tool', title: 'Authentication', meta: 'oauth', x: 480, y: 40 },
      { id: 'r', kind: 'decision', title: 'Risk Check', meta: 'score', x: 480, y: 220 },
      { id: 'h', kind: 'approval', title: 'Human Approval', meta: 'risk-team', x: 730, y: 220 },
      { id: 'api', kind: 'mcp', title: 'Banking API', meta: 'mcp', x: 730, y: 40 },
    ],
    edges: [
      { id: 'e1', from: 't', to: 'a', channel: 'default' },
      { id: 'e2', from: 'a', to: 'au', channel: 'tool' },
      { id: 'e3', from: 'au', to: 'r', channel: 'tool' },
      { id: 'e4', from: 'r', to: 'h', channel: 'approval' },
      { id: 'e5', from: 'r', to: 'api', channel: 'default' },
    ],
  },
  hr: {
    id: 'wf-hr',
    name: 'use-case · hr',
    width: 980,
    height: 360,
    nodes: [
      { id: 't', kind: 'trigger', title: 'New Employee', meta: 'event', x: 20, y: 130 },
      { id: 'a', kind: 'agent', title: 'Agent', meta: 'frontier-llm', x: 250, y: 130 },
      { id: 's', kind: 'mcp', title: 'HR System', meta: 'mcp', x: 480, y: 40 },
      { id: 'p', kind: 'tool', title: 'Account Provisioning', meta: 'function', x: 480, y: 220 },
      { id: 'ap', kind: 'approval', title: 'Approval', meta: 'manager', x: 730, y: 220 },
      { id: 'n', kind: 'output', title: 'Notification', meta: 'email', x: 730, y: 40 },
    ],
    edges: [
      { id: 'e1', from: 't', to: 'a', channel: 'default' },
      { id: 'e2', from: 'a', to: 's', channel: 'tool' },
      { id: 'e3', from: 'a', to: 'p', channel: 'tool' },
      { id: 'e4', from: 'p', to: 'ap', channel: 'approval' },
      { id: 'e5', from: 's', to: 'n', channel: 'tool' },
    ],
  },
  support: {
    id: 'wf-support',
    name: 'use-case · support',
    width: 980,
    height: 300,
    nodes: [
      { id: 't', kind: 'trigger', title: 'Customer Message', meta: 'inbox', x: 20, y: 110 },
      { id: 'c', kind: 'agent', title: 'Classification', meta: 'frontier-llm', x: 250, y: 110 },
      { id: 'k', kind: 'tool', title: 'Knowledge Search', meta: 'search.v2', x: 480, y: 110 },
      { id: 'a', kind: 'agent', title: 'Agent', meta: 'respond', x: 710, y: 30 },
      { id: 'e', kind: 'decision', title: 'Escalation', meta: 'branch', x: 710, y: 190 },
    ],
    edges: [
      { id: 'e1', from: 't', to: 'c', channel: 'default' },
      { id: 'e2', from: 'c', to: 'k', channel: 'tool' },
      { id: 'e3', from: 'k', to: 'a', channel: 'tool' },
      { id: 'e4', from: 'a', to: 'e', channel: 'approval' },
    ],
  },
  engineering: {
    id: 'wf-eng',
    name: 'use-case · engineering',
    width: 1080,
    height: 300,
    nodes: [
      { id: 't', kind: 'trigger', title: 'Issue', meta: 'github', x: 20, y: 110 },
      { id: 'a', kind: 'agent', title: 'Agent', meta: 'frontier-llm', x: 240, y: 110 },
      { id: 'r', kind: 'mcp', title: 'Repository', meta: 'mcp', x: 460, y: 30 },
      { id: 'c', kind: 'tool', title: 'Code', meta: 'diff', x: 460, y: 190 },
      { id: 'ts', kind: 'tool', title: 'Tests', meta: 'ci', x: 690, y: 190 },
      { id: 'rv', kind: 'approval', title: 'Review', meta: 'maintainer', x: 690, y: 30 },
      { id: 'd', kind: 'execute', title: 'Deploy', meta: 'auto', x: 920, y: 110 },
    ],
    edges: [
      { id: 'e1', from: 't', to: 'a', channel: 'default' },
      { id: 'e2', from: 'a', to: 'r', channel: 'tool' },
      { id: 'e3', from: 'a', to: 'c', channel: 'tool' },
      { id: 'e4', from: 'c', to: 'ts', channel: 'tool' },
      { id: 'e5', from: 'r', to: 'rv', channel: 'tool' },
      { id: 'e6', from: 'ts', to: 'rv', channel: 'tool' },
      { id: 'e7', from: 'rv', to: 'd', channel: 'default' },
    ],
  },
}

/** A vision-only multi-agent graph for the Future Vision section. */
export const visionWorkflow: WorkflowGraph = {
  id: 'wf-vision',
  name: 'vision · multi-agent-os',
  width: 1000,
  height: 460,
  nodes: [
    { id: 't', kind: 'trigger', title: 'Objective', meta: 'goals', x: 30, y: 180 },
    { id: 'o', kind: 'agent', title: 'Orchestrator', meta: 'planner', x: 270, y: 180, vision: true },
    { id: 'a1', kind: 'agent', title: 'Research Agent', meta: 'sub', x: 540, y: 30, vision: true },
    { id: 'a2', kind: 'agent', title: 'Code Agent', meta: 'sub', x: 540, y: 180, vision: true },
    { id: 'a3', kind: 'agent', title: 'Ops Agent', meta: 'sub', x: 540, y: 330, vision: true },
    { id: 'm', kind: 'mcp', title: 'MCP Mesh', meta: 'bridges', x: 810, y: 180, vision: true },
  ],
  edges: [
    { id: 'e1', from: 't', to: 'o' },
    { id: 'e2', from: 'o', to: 'a1', channel: 'tool' },
    { id: 'e3', from: 'o', to: 'a2', channel: 'tool' },
    { id: 'e4', from: 'o', to: 'a3', channel: 'tool' },
    { id: 'e5', from: 'a1', to: 'm', channel: 'tool' },
    { id: 'e6', from: 'a2', to: 'm', channel: 'tool' },
    { id: 'e7', from: 'a3', to: 'm', channel: 'tool' },
  ],
}
