---
title: Graphical Editor
description: Edit the model on a live canvas — context map, aggregates, flows and processes, with every change saved to the spec
---

The **Graphical editor** page is a fully editable canvas over the model. It is not a
drawing tool with a save button: every gesture emits a command that mutates the spec
through the same use cases as the forms, and everything that changes the model is
undoable. Diagram geometry (positions, sizes, edge bends, the context-map detail
level) lives in the spec's own `diagrams` section — a separate structure that only
*references* elements by id, so coordinates never leak into the authored elements
themselves. Models saved before this section existed kept the geometry in a
`modux-editor-layout.json` file next to the store; it is still read as a fallback and
migrates into `diagrams` on the first change made in the editor.

## Views

| Tab | Shows | Extra semantics |
|---|---|---|
| **Context map** | Bounded contexts and external systems; strategic relations (solid, DDD abbreviations) and flows (dashed) | Flow colour = live coherence: green OK, amber missing relation, orange reversed |
| **Agregados** | Aggregates coloured by their module's subdomain, entities as satellites, cross-aggregate references | |
| **Flows** | Each flow as a pipeline: trigger aggregate → flow (coloured by archetype) → target | |
| **Procesos** | Each process as a chain of steps — HUMAN steps amber with role and deadline, compensations hanging in red, completion event in green | |

Boxes carry an ArchiMate-inspired glyph for their kind: component (contexts, external
systems), diamond (aggregates), class (entities), arrow (flows), chevron (processes),
person / gear (human / automated steps), double circle (events), return arrow
(compensations).

## Editing gestures

- **Drag** a box to move it (persisted per view). **Drag a process step across its
  siblings** to reorder the process — order and position undo together.
- **Click** selects; **double click opens the element's own editor** (steps open their
  owning process).
- **Blue handles** on a selected context: drag onto another context to create a
  relation of the type picked in the toolbar.
- **Supr/Backspace** deletes the selection — relations, empty contexts, empty
  aggregates, flows, processes and steps. Integrity guards reject deleting a module
  with aggregates or an aggregate with entities (server-checked too, shown as a toast).
- **F2** renames inline (modules, aggregates, entities, process steps).
- **Toolbar creation** per view: contexts (with subdomain), aggregates (with owner
  module, plus a stub state model), flows (archetype, trigger aggregate, event,
  target) and processes; with a process or step selected you can append/insert steps
  (AUTOMATED or HUMAN with role and deadline) and edit the selected step's role,
  deadline and compensation.
- **Ctrl+Z / Ctrl+Shift+Z** undo and redo — model commands and node moves share one
  history, with composite entries where one gesture caused both.

## Lines

With an edge selected, **dragging it splits the line** into an adjustable bend point;
bend points drag freely and **double click removes them**. Where lines cross, the one
drawn later **hops over with a small bridge arc**, so dense maps stay readable.

## Layout & navigation

- **✨ Auto-layout** repositions the current view with ELK (organic for maps, layered
  left-to-right for flows and processes) — one undo step brings everything back.
- **⌖ Ajustar** fits the diagram to the window; the **minimap** (bottom-right) shows
  the whole scene and recenters on click or drag; **mouse wheel** zooms; **hold
  space** to pan from anywhere.

## Selections and views

**Shift+click** accumulates a multi-selection; **shift+drag** on the background draws
a rubber band. With elements selected, **⊞ Vista** creates a **CURATED view** (see
[Views & Large Models](/manual/views-and-large-models/)) whose members are the
selected catalog elements. The **Vista:** selector scopes the canvas to one view's
members — relations and flows appear when both endpoints are in, entities follow
their aggregates.

## Live updates

The server pushes a fingerprint of the store over SSE; when the model changes from
anywhere else — the form editors, the [MCP server](/manual/mcp-authoring/), another
browser — the canvas reloads within a couple of seconds and shows an info toast. The
local undo history is discarded on external changes, since its inverses no longer
describe the model.

## Under the hood

The editor is a standalone Lit web component (`editor/` in the repo) embedded through
a Mateu `Element` with the `import` attribute; it talks to `/modux/editor` (model
projection in, commands and layout out). The canvas engine is semantics-free — each
tab is a pure *model → scene* adapter, so new diagram kinds are small additions.
