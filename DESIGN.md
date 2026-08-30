---
version: alpha
name: Filament
description: A premium, technical, editorial design system for a visual AI workflow platform. Build AI systems like node-based programming — cinematic, AI-native, never template-slop.
colors:
  primary: "#0E0F11"
  secondary: "#9AA0A6"
  tertiary: "#E8FF52"
  neutral: "#181A1D"
typography:
  h1:
    fontFamily: "Space Grotesk"
    fontSize: "clamp(3.2rem, 9vw, 9rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  h2:
    fontFamily: "Space Grotesk"
    fontSize: "clamp(2rem, 4.5vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.025em"
  body-md:
    fontFamily: Inter
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  label-xs:
    fontFamily: "JetBrains Mono"
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.22em"
rounded:
  sm: 3px
  md: 4px
  lg: 6px
spacing:
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  section: 120px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "#0E0F11"
    rounded: "{rounded.sm}"
    padding: "14px 22px"
  button-primary-hover:
    backgroundColor: "#F2FF8A"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.primary-negative-ink}"
    rounded: "{rounded.sm}"
    padding: "13px 20px"
---

# Filament — Design System

## Overview

Filament is the public-facing site for a **visual AI workflow platform**: a node-based
environment where people design, connect, and govern AI agents, tools, MCP servers,
data, logic, and human-approval gates into runnable enterprise systems.

The design posture is **premium, technical, editorial, AI-native, cinematic, professional**.
The product is not a chatbot and the site must never look like one. We borrow the visual
grammar of professional creative/engineering tools (node editors, terminal UIs, technical
schematics) and editorial print — not consumer SaaS landing pages.

Design principles, in priority order:

1. **Composition first, decoration never.** Commit to a surface and a layout rhythm before
   touching color or type. No section defaults to a three-equal-card grid.
2. **Typography is the primary interface.** Hierarchy, weight, and space carry meaning before
   any box, border, or color does.
3. **One signal color.** `#E8FF52` is the only high-emphasis accent. Neutrals do the rest.
4. **Low radii, hard edges.** This is engineering software, not a friendly consumer app.
   Radii stay at 2–8px. No soft blobs.
5. **Restraint in motion.** Animation earns its place: it shows state, continuity, and flow.
   Honors `prefers-reduced-motion`.

## Colors

- **Primary `#0E0F11`** — page base, a near-black with a cool cast (not pure black, not blue-violet).
- **Neutral `#181A1D`** — raised surface, panels, node bodies.
- **Secondary `#9AA0A6`** — muted body text.
- **Tertiary `#E8FF52`** — "Signal" — the *only* high-emphasis accent. Used for CTAs, active
  node, live edges, key highlights. A green-yellow that reads as "system online," not candy.
- **Signal `#7EE0D6`** — secondary cyan-teal for the second semantic channel (e.g., tools/MCP).
- **Warn `#F0B23E`** — amber, reserved for pending / human-approval states.
- **Danger `#E5564B`** — red, reserved for failure edges and destructive affordances.
- **OK `#7BD88F`** — green, reserved for success/auto-execute states.
- **Line `#26282C`** / **LineSoft `#1E2024`** — hairline borders that define structure without
  dropshadows everywhere.
- **Ink `#ECECE6`** / **Faint `#6B7077`** — primary and tertiary text.

> We explicitly avoid: violet/indigo tech gradients, glassmorphism as a default, AI-brain
> imagery, floating blobs, 3D spheres, and emoji decoration.

## Typography

- **Display — Space Grotesk** (500/600/700). Used for H1/H2, the hero, section statements,
  numbers. Slightly mechanical, distinctive, holds large scale with tight tracking.
- **Body — Inter** (400/500/600). Long-form copy, UI labels, descriptions. Neutral and fast.
- **Mono — JetBrains Mono** (400/500). Eyebrow labels, node type tags, code-ish metadata,
  coordinates, status. Mono is *accent only* — never body.
- Type leads hierarchy. Eyebrows are mono, uppercase, tracked `0.22em`, in `faint`/`muted`.
- No `Inter`-as-default-without-thought: the display face is chosen to read "engineering tool,"
  the mono face signals "technical schematic."

## Layout

- **Max content width `1240px`**, generous side gutters on desktop.
- **Section vertical rhythm `120px`** (fluid down on mobile) — large editorial breathing room.
- **12-column mental grid**, but sections break the grid deliberately (full-bleed canvas,
  asymmetric two-column, offset statements).
- **Eyebrow + statement + supporting copy + artifact** is the recurring section skeleton;
  the *artifact* changes form per section so rhythm stays alive.
- Responsive floors: **375 / 390 / 768 / 1024 / 1440+**. Mobile is a re-composed layout, not a
  scaled-down desktop. The workflow canvas becomes a scrollable/zoomable strip with simplified
  node cards rather than a cramped full graph.

## Elevation & Depth

- Depth comes from **hairline borders + a single soft drop shadow**, not from layered blurs.
- `node` shadow: subtle top inner highlight + far, low-opacity cast.
- `panel` shadow: deeper, used for floating surfaces (inspector, sticky nav).
- Glow (`glow`) is reserved for the *active/selected* node and live edges only — never ambient.
- Grid background (32px) sits at ~3.5% white; it implies "canvas," not decoration.

## Shapes

- Radii are deliberately small: **sm 3px, default 4px, md 6px, lg 8px**. No pill shapes, no
  large rounded cards.
- Nodes are **rectangular with a 4px radius**, an optional left status rail (2px), and a thin
  border. The selected node gets a 1px signal border + soft glow.
- Buttons are rectangular (3px), high contrast for primary, hairline-bordered for ghost.

## Components

- **button-primary** — solid Signal fill, near-black text, the single strongest action on any
  view. Hover lifts to a brighter Signal (`#F2FF8A`) — no color shift to another hue.
- **button-ghost** — transparent, hairline border, ink text. Secondary actions.
- **WorkflowNode** — the core product primitive. Header (type tag mono + title), optional meta
  row, status dot. Connector ports left/right. States: idle, hover, selected, running, done.
- **WorkflowEdge** — bezier path between ports; idle is a faint line, "live" is animated with a
  dashed signal flow (respects reduced-motion → static).
- **NodeInspector** — right-rail panel showing the selected node's config (mock). Uses mono
  labels and a schematic key/value list.

## Do's and Don'ts

**Do**
- Lead with type and space; add borders/nodes to structure, not to fill.
- Use Signal (`#E8FF52`) sparingly and only for "live / primary / you-are-here."
- Keep the canvas real (React components) and the data separate (mock JSON).
- Mark not-yet-built features as **Vision** / **Coming Next** — never fake completion.
- Honor `prefers-reduced-motion`; keep animations purposeful and short.

**Don't**
- Don't use purple/indigo gradients, glassmorphism, AI-brain art, blobs, or spheres.
- Don't fall back to the three-equal-icon-card grid for every section.
- Don't scatter emoji as decoration.
- Don't make mobile "desktop but smaller" — recompose the canvas and hierarchy.
- Don't claim features that don't exist yet without a Vision label.
