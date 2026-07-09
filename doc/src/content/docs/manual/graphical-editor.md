---
title: Graphical Editor
description: Edit the model on a live canvas — context map, aggregates, flows, processes, workflows and an EventStorming view, with every change saved to the spec
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
| **Workflows** | Each [workflow](/manual/workflows/) as a dependency DAG: trigger source →(event)→ workflow → steps laid out by dependency depth → completion event | Steps badge their target use case; drag a handle from step A onto step B to declare "B waits for A" |
| **EventStorming** | The whole causal narrative, derived from the model in classic sticky-note notation: actor → **command** (blue) → **aggregate** (yellow) → **event** (orange) → **policy** (lilac: subscription, flow, process, workflow or projection) → **read model** (green), external systems in pink, AI agents with their tools | A read-only *lens* — you edit from the other views or the forms. Events referenced by name but not declared in the catalog render dashed («EVENTO (sin declarar)»): a built-in gap detector. Auto-layout orders the narrative |

Boxes carry an ArchiMate-inspired glyph for their kind: component (contexts, external
systems), diamond (aggregates), class (entities), arrow (flows), chevron (processes),
person / gear (human / automated steps), double circle (events), return arrow
(compensations).

## Editing gestures

- **Drag** a box to move it (persisted per view). **Drag a process step across its
  siblings** to reorder the process — order and position undo together.
- **Click** selects; **double click opens the element's own editor** (steps open their
  owning process).
- **Strategic relations are 100% computed**: a context→context edge exists exactly
  where a concrete dependency does (use case calls, query calls, flows, aggregate
  references) — nothing is hand-drawn between contexts anymore. Unannotated pairs
  render dashed with a `?`; **double click** picks the DDD pattern (persisted as a
  type annotation in the project's contextMap), and Supr clears the annotation
  while the derived edge remains. The tooltip lists the concrete dependencies the
  relation derives from; annotations whose dependency disappears stop being painted.
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
- **AI agents consume through MCP**: create an **AI agent** from the toolbar (robot
  glyph, outside every context) and drag it onto a use case — the consumption is
  recorded on the agent and the use case flips `exposedAsMcp: true` (the bounded
  context will expose it as an MCP tool). Removing the arrow clears the exposure
  when no other agent consumes it. An **Agente IA externo** (dashed) is someone
  else's agent: it enters through an **MCP gateway** instead (lint warns otherwise).
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
- **Policies**: the context-map toolbar (detail level) also creates a **Policy** — a
  use case that expresses reaction/automation logic rather than a business case (see
  [Use Cases](/manual/use-cases/)). Policies keep every use-case gesture but wear the
  lilac chip on the map and the lilac POLICY sticky in the EventStorming view.
- **Projections drawn on the canvas**: drag from an **aggregate** onto a read model
  (or onto another context, where a stub read model is born) to declare a **state
  projection** — the aggregate's whole state materializes there, even cross-context
  (teal dashed arrow). The same gesture works from an **external system's operation**
  or from an **external table** — the classic *polling* integrations. See
  [Projections & Read Models](/manual/projections/#alternative-sources).
- **External tables**: external systems can declare the **tables/datasets** they own
  (amber chips inside the external container) — the pollable surface of a legacy
  system.
- **External MCP servers**: an external system can also publish an **MCP server**
  (lilac robot chip, created from the toolbar with its owner system) — a whole tool
  surface agents consume directly (drag agent → chip) or through a gateway.
- **Published APIs are first-class**: an **API** (usually born from
  [importing a contract](/manual/importers/) with no target) is a top-level container
  with its operations as indigo chips. **Drag an operation onto the use case or
  policy that implements it** (fine wiring), or onto a **bounded context** (coarse) —
  the indigo dashed wire is the published surface mapped onto the domain. Supr on a
  wire unwires (the operation stays published, flagged by `api-operation-unwired`);
  APIs and operations are also creatable from the toolbar, renamable and deletable.
- **The agent's whole tool surface is drawn**: drag an agent onto a use case (MCP),
  a **query service** (read tool), an **API operation**, an **external operation**,
  an **external MCP server**, an **MCP gateway** or **another agent** (delegation) —
  each arrow is one entry in the [connection matrix](/manual/ai-agents/#the-connection-matrix).
  Drag a **domain or application event onto an agent** and the event *triggers* it
  (a **reactive agent**, amber dashed arrow); drag an **actor onto an agent** and
  the person talks to it (a chat/supervision UI derives). Deleting an agent unlinks
  it everywhere, and one undo restores the agent *with* every link.
- **MCP gateways**: created from the toolbar (plug glyph, outside every context) —
  our component that aggregates external MCP servers and exposes APIs, single
  operations, use cases and RAGs as one MCP endpoint. Drag the gateway's handle onto
  whatever it exposes (violet dashed arrows); external agents consume the gateway,
  not the internals. See [AI Agents, MCP Gateways & RAGs](/manual/ai-agents/).
- **RAGs**: created from the toolbar (lens glyph, outside every context); drag an
  agent onto a RAG (the knowledge it grounds on), drag a RAG onto a **read model**
  to declare it indexes it, and use the **＋ Fuente** toolbar (with the RAG selected)
  to add external content sources — a repo, a web site, an FTP server — drawn as
  small satellites.
- **Workflow editing**: create workflows from their tab (trigger aggregate + event);
  with the workflow or a step selected the toolbar adds steps (name, target use
  case, the event the workflow *emits* to start it and the one it *awaits*); drag a
  handle from one step onto another to add a dependency — Supr on the dependency
  arrow removes it, and undo/redo restore steps *with* their dependants' links.
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

With a view active, the canvas scopes to the view's members — contexts, external
systems, aggregates, flows, processes, workflows, **and the strategic/AI pieces too**
(actors, AI agents, MCP gateways, RAGs, APIs), so a curated slice does not drag every
agent along. Three ways to maintain the membership, none of which ever deletes the
element from the project:

- **«☰ Árbol»** opens the **catalog tree**: every element of the project grouped by
  kind (aggregates nested under their context), with a **membership checkbox** —
  check to include it in the view, uncheck to take it out. Greyed rows ride in
  implicitly because their container is a member. Membership changes are undoable.
- **«Añadir a la vista…»** searches the same catalog by name and adds one element.
- **Supr on a member asks**: *delete the element from the model, or only take it out
  of this view?* — removing from the view never touches the element itself.

## System and solutions

The **Modelo:** bar above the canvas shows the model being edited — the **system**
(the as-is, badge AS-IS) or a **solution** (a to-be proposal, badge TO-BE) — see
[System & Solutions](/manual/solutions/). **Switching lives in the app header**: the
«Modelo» application context, next to «Repositorio» and «Proyecto», works from every
page. The bar keeps what is editor-specific: «＋ Nueva solución…» branches from the
system, and on a solution the lifecycle actions (Proponer, Actualizar del sistema,
Mergear, Descartar) plus the live **semantic diff** against the system: a dashed
**green ring** marks elements that only exist in the solution, a dashed **amber
ring** the modified ones, and the `＋n ～n −n` badge summarizes the change set
(removed elements are listed in its tooltip).

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
