# Filament — Visual AI Workflow Platform (Stage 1)

Static, deployable marketing site for **Filament**, a visual platform for designing,
connecting, and running enterprise AI systems (agents, tools, MCP, data, logic, human
approval) as node-based workflows.

> **Stage 1 scope:** this is a *concept / showcase* site. It is fully static — there is
> **no workflow engine, backend, database, auth, payments, or live AI**. The interactive
> node canvas is a high-fidelity **mock** built from real React components. The mock
> workflow data (`src/data/workflows.ts`) is separated from the UI and can later be
> swapped for real workflow JSON.

## Stack
- React 18 + TypeScript
- Vite (build → static `dist/`, relative asset paths for GitHub Pages)
- Tailwind CSS (design tokens defined in `tailwind.config.js`, mirrored in `DESIGN.md`)
- Framer Motion (scroll reveals) + custom canvas pan/zoom (pointer events)

## Design system
See **`DESIGN.md`** — the normative spec (typography, color, spacing, grid, borders,
radii, shadows, buttons, nodes, motion, responsive). Tailwind tokens are kept in sync
with it. The aesthetic is deliberately **premium / technical / editorial / AI-native**:
- One signal accent (`#E8FF52`), no purple/violet gradients.
- Low radii (2–8px), hairline borders, subtle depth — not glassmorphism or blobs.
- Type-led hierarchy: Space Grotesk (display) + Inter (body) + JetBrains Mono (labels).

## Run locally
```bash
npm install
npm run dev        # dev server
npm run build      # → dist/ (static, GH-Pages ready)
npm run preview    # serve the build locally
```

## Deploy to GitHub Pages
1. Push to `main`.
2. The workflow in `.github/workflows/deploy.yml` builds and publishes `dist/` to
   GitHub Pages automatically.
3. In repo **Settings → Pages**, set the source to the `github-pages` environment.
4. `vite.config.ts` uses `base: './'` so asset paths work on a project subpath
   (`username.github.io/repo/`) as well as a custom domain.

## Project structure
```
src/
  components/
    canvas/            # reusable, future-proof canvas system
      WorkflowCanvas   # pan/zoom, run-demo, minimap, reduced-motion aware
      WorkflowNode     # real node UI (ports, status, kind)
      WorkflowEdge     # bezier edges, animated "live" flow
      NodeInspector    # right-rail config panel
      Minimap
      nodeVisuals      # per-kind color/glyph/blurb/config
      usePanZoom       # pointer-based pan/zoom + pinch
    Hero, ProductCanvas, Problem, NewParadigm, WorkflowAnatomy,
    UseCases, HowItWorks, AiMcpArchitecture, ProductPhilosophy,
    FutureVision, FinalCTA, Navigation, Footer, ui/primitives
  data/workflows.ts   # MOCK workflow graphs (UI-separated, swappable)
  lib/types.ts        # WorkflowGraph / WorkflowNode / WorkflowEdge
  App.tsx, main.tsx, index.css
DESIGN.md             # design system spec
```

## Reusing the canvas later
`WorkflowCanvas`, `WorkflowNode`, `WorkflowEdge`, `NodeInspector` are generic and read
only from `WorkflowGraph` data. When the real editor exists, pass real workflow JSON
instead of `src/data/workflows.ts` — the components don't change.
