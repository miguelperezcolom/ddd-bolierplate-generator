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
  aggregates, domain events, flows, processes and steps. Integrity guards reject
  deleting a module with aggregates or an aggregate with entities (server-checked
  too, shown as a toast).
- **F2** renames inline (modules, aggregates, entities, domain events, process steps).
- **Toolbar creation** per view: contexts (with subdomain), **external systems** and
  **actors** (roles, drawn with the person glyph outside every context), aggregates
  (with owner module, plus a stub state model), flows (archetype, trigger aggregate,
  event, target) and processes; with a process or step selected you can append/insert
  steps (AUTOMATED or HUMAN with role and deadline) and edit the selected step's
  role, deadline and compensation. At the context map's detail level the toolbar
  also creates, inside a bounded context: **domain events** (amber event glyph),
  **application events** (yellow), **read models** (born from an aggregate: they
  live in its module and start with its state model) and **domain services**
  (gear glyph).
- **Emissions**: only aggregates and domain services emit DOMAIN events (their
  operations declare `emits`); use cases publish APPLICATION events (a
  `PublishApplicationEvent` step). Amber dashed arrows connect each emitter to its
  event, and they are drawn on the canvas: select the emitter and drag from a blue
  handle onto the event. Supr on the arrow removes the emission again.
- **Use case invocations**: drag from a use case onto another (in the same or another
  bounded context) to add a `CallUseCase` step to the caller — drawn as a cyan dashed
  arrow; Supr on the arrow removes the step. Cross-context calls are the seed for a
  gateway/API at generation time. Dragging onto a **query service** instead adds a
  `CallQueryService` step (teal dashed arrow), also across contexts. Query services
  and plain **use cases** are created from the toolbar like the other children.
- **External systems have a surface too**: give them **use cases** from the toolbar
  (the external node becomes a container) and drag from one of our use cases onto
  them to record a `CallExternalUseCase` step (slate dashed arrow — the seed of a
  derived gateway/API). Drag from the external system onto one of OUR use cases and
  the call comes in through an **INBOUND ACL** in the target module (violet arrow).
- **Events trigger use cases**: dragging a domain or application event onto a use
  case creates a **TRIGGERS flow** (subscription + CallUseCase + mapping derive at
  generation time); the arrow anchors on the event and the use case at the detail
  level.
- **Actors use things**: drag from an actor onto a **use case** or a **query
  service** to allow it (`Role.allowedUseCaseIds` / `allowedQueryServiceIds`, indigo
  arrow) — the seed of a derived UI. Drag onto an **aggregate** and the editor
  creates stub **CRUD use cases** (`Crear/Actualizar/Eliminar<Aggregate>`, with steps
  anchored to the aggregate and `exposedAsUi`) and allows the actor on all three;
  one undo reverts the whole thing.
- **Materializations drawn on the canvas**: at the detail level read models render as
  children too, and dragging a domain OR application event onto another context (or
  one of its read models) creates a **MATERIALIZES flow** — the projection/read
  model/subscription triple stays derived at generation time, per the flows intent
  layer. The trigger (aggregate, domain service, or the publishing use case for
  application events) is taken from the event's emission (the editor asks you to
  declare it first if missing), and the read model name defaults to `<Event>View`
  unless you dropped on an existing read model. At the detail level flow arrows anchor on the
  concrete pieces: the trigger event on the source side and the read model on the
  target side.
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
