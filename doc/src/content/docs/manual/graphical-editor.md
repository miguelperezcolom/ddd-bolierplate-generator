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
| **UI** | The user interface, Mateu-shaped: apps (UiAdapter) as containers holding their **menu tree**, pages floating beside them, and each page's MVVM wiring — its viewmodel (a Model playing that role), the use cases behind its buttons and the query service feeding its listing; actors point at the apps they use | Palette creates apps — plain, **Orquestador** (keeps state and shows nothing of its own, only child pages) and **Maestro-detalle** (a header plus tabs, all of them pages: the first page dropped on it becomes the **header** — a «cabecera» edge, Supr unsets it — and the next ones its tabs) — plus pages, **CRUD** and **Wizard** shortcuts (pages born with that type) and menu entries (pages dropped **on an app** hang from its menu in the same gesture). **Data models** are first-class: every catalog model shows as a chip (the palette creates fresh ones), and wiring one to a page sets its **viewmodel**, to an app its **estado** — the state an orchestrator keeps and shares with its child pages; Supr on the chip deletes the model unlinking everyone (undo re-wires them). Selected nodes also offer **typed handles** (coloured drag points on the top edge): the green one on an app draws its **home** — a page or **another app** — (only plain apps have one: the master-detail is header+tabs and the orchestrator only shows child pages), the blue one on a master-detail (re)draws its **header**, a **CRUD** page offers two more — orange **detalle** (what opens a row) and teal **nuevo** (the new-record form), both reaching a page or an app of any archetype — and a **Vista-editor** app (an orchestrator pairing a read-only detail view with an edit view) offers **vista** and **edición** towards its two pages. A wizard's STEPS are the first-class thing: the palette drops bare steps on the wizard («Paso de wizard»), a page dropped on the wizard body becomes a new mapped step, and each step row **maps to its page by wiring** (drag the row's handle to a page, or drop a page on the row — remapping included; unmapped rows show ⌁). Rows list in numbered order — and the page designer's mockup shows the same steps on its wizard bar, **draggable to reorder them from there too**: **drag one between the drop slots to reorder** (undo puts it back), Supr on a row or on a «paso N» edge removes the step, and deleting a page unmaps its steps instead of losing them; the master-detail's tabs stay menu entries, reorderable the same way; drop a use case on a page for a toolbar button, a query service for the listing, an actor on an app to grant it; Supr on any of those edges undoes the wiring. **Menu entries move by dragging the row itself**: while it flies, **drop slots light up between the options of every app** — release on a slot to land exactly there, on another row's middle to nest under it (the target becomes a grouper), or on an app's end slot for its root — including **another app's** (the subtree travels whole, and undo puts it back in its slot). The connect handle offers the same moves |
| **Mapeados** | Every data model as a node and every **model mapping** as a labeled edge (source → target; field rules stay in its form). The view also derives the **mapping debt**: a page button calling a use case whose request model differs from the page's viewmodel draws an amber dashed «falta mapear» edge — **wire the two models** and the mapping is born (named Source2Target) and the debt disappears; Supr on a mapping edge deletes it (undoable) | Mappings are a constant of the model: screen→use case, event→command, ETL transforms — this is where they all become visible |
| **Page designer** *(inside the UI view)* | Double-click a page: a live **mockup inferred the Mateu way** — fields come from the viewmodel Model, their look from each field's config, the page shows its four zones — **header**, **toolbar** (top buttons), **content** and the **bottom bar** (closing actions, its own «+ botón») — plus a listing stub on CRUD pages. Nothing is drawn by hand: click a field to edit its **declaration** (stereotype, width, label) and the preview re-infers itself; drag fields to reorder (persisted as the fieldConfigs order); «Ficha» opens the page's full form | The designer is WYSIWYG over the MVVM: what you edit is the spec, never pixels. **UI-first composition**: the palette offers Mateu's full layout vocabulary (vertical, horizontal, form, split, tabs, accordion, card, grid, board, dashboard, master-detail, foldout, carousel, app) plus components (form, listing, button, field, text, metric, menu bar) — drop a layout on a frame, drop components inside (a tabLayout comes seeded with two tabs; **click a header to show and select that tab**, double click to configure it, **drag headers to reorder them**, and drops on the body land in the tab being shown — the palette also offers **Pestaña** to add tabs by dropping them on the tabLayout), **click selects** a node (Supr deletes it, subtree included — one undo restores it whole), **double click edits its declaration**, and **dragging the node moves it**: the top half of a component slots it before, the bottom half after (a blue bar opens the gap), a layout's body drops it inside — palette drops honor the same slots, a node never lands in its own subtree, and **dragging works across frames** (the node moves to the other page). **Ctrl+C / Ctrl+V** copies the selected subtree and pastes it under the current selection, on any frame. Catalog drops wire declarations: a **use case on a button** is its action (on the frame, a new toolbar button), a **model on a form or the frame** is the viewmodel (pages also offer a violet **viewmodel handle** on the UI view — draw it to a model; the designer shows the chip with a ✕ to unset, no dropdown), a **query operation on a listing or the frame** is what it lists. Empty content = the page stays fully inferred |
| **Explorador** *(beta)* | The model as a **living radial tree**: the system at the center, its first ring (bounded contexts, external systems, apps, actors, agents, workflows, IdPs) around it, and everything else folded inside — collapsed nodes badge how much they hold. **Click a node and it explodes**: its children are born at its center and pushed into place by a spring simulation (springs + repulsion, no tweens), and a low-amplitude per-node noise keeps the whole tree gently breathing so it never feels static (honoring `prefers-reduced-motion`). **Hover grows the node** and shows a card with its contents; **double click opens the element's CRUD** — the intended entry point when working graphics-first. Dragging a node pulls its subtree elastically; background pans, wheel zooms, «Ajustar» refits | Read-only lens: positions belong to the physics, not to the persisted layout — but the exploded state and camera survive navigating into a CRUD and back |
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
- **Creation lives in the palette (☰, leftmost on the toolbar)** on the context map
  and the Workflows view — also toggled with **P**. The panel has two **vertical
  tabs on its right edge**: **Nuevos** (every creatable type — drag a new element
  onto the canvas, or onto its container for child kinds: an aggregate into its
  context, an operation onto its API, a step onto its workflow or use case) and
  **Catálogo** (every EXISTING element of the model, grouped by kind: drop one on
  empty canvas to place it, or on a node to connect them — the same gesture
  vocabulary as the handles). The specialized views without a palette keep their
  toolbar creation: aggregates (with owner
  module, plus a stub state model), flows (archetype, trigger aggregate, event,
  target) and processes; with a process or step selected you can append/insert
  steps (AUTOMATED or HUMAN with role and deadline) and edit the selected step's
  role, deadline and compensation.
- **Notifications & documents**: the palette (Dominio) drops a **Notificación** (pink — an event wired to it fires it, wiring it to an actor adds that role as recipient, the edge wearing the channel) or a **Documento/Informe** (slate — wire a query service/operation to feed a report, or drop a model from the Catálogo for a document template) on their owner context. See [Notifications](/manual/notifications/) and [Documents](/manual/documents/).
- **Identity providers**: the palette (Estratégico) creates an **IdP** (key glyph, amber; federated ones — published by an external system — draw dashed with a «publica» edge). Wire a bounded context to it («valida tokens de»), an ETL flow («identidad de servicio») or, on the UI view, an app («autentica con»); Supr un-trusts, deleting the IdP clears every edge. See [Identity & Security](/manual/identity/).
- **ETL integrators**: the palette (Orquestación) creates a **Flujo ETL** dropped **on the bounded context that owns it** (the consumer-side ACL, or the publisher of an outbound integration) — a teal chip nested in its context, whose data lines roll up to the context at the coarse level. Its steps are drawn by direction: wire an element **INTO the flow** and it becomes a source (a legacy table or an API = *pull*, an event = *consumer*); wire the flow **OUT to an element** and it becomes a write (an API operation, a table = *bd*, an event). Transform steps drop from the palette («Transformación ETL» — mapping or intent in its form), hidden edges roll up to the host system/context, and Supr on a data line removes the step behind it (undoable).
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
  and plain **use cases** are created from the palette like the other children.
- **External systems have a surface too**: give them **use cases** from the palette
  (the external node becomes a container) and drag from one of our use cases onto
  them to record a `CallExternalUseCase` step (slate dashed arrow — the seed of a
  derived gateway/API). Drag from the external system onto one of OUR use cases and
  the call comes in through an **INBOUND ACL** in the target module (violet arrow).
- **AI agents consume through MCP**: create an **AI agent** from the palette (robot
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
- **Policies**: the palette (at the map's detail level) also creates a **Policy** — a
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
  (lilac robot chip, dropped from the palette onto its owner system) — a whole tool
  surface agents consume directly (drag agent → chip) or through a gateway.
- **Published APIs are first-class**: an **API** (usually born from
  [importing a contract](/manual/importers/) with no target) is a top-level container
  with its operations as indigo chips. **Drag an operation onto the use case or
  policy that implements it** (fine wiring), or onto a **bounded context** (coarse) —
  the indigo dashed wire is the published surface mapped onto the domain. Supr on a
  wire unwires (the operation stays published, flagged by `api-operation-unwired`);
  APIs and operations are also creatable from the palette (an API is dropped onto
  the system or context that owns it), renamable and deletable.
- **The agent's whole tool surface is drawn**: drag an agent onto a use case (MCP),
  a **query service** (read tool), an **API operation**, an **external operation**,
  an **external MCP server**, an **MCP gateway** or **another agent** (delegation) —
  each arrow is one entry in the [connection matrix](/manual/ai-agents/#the-connection-matrix).
  Drag a **domain or application event onto an agent** and the event *triggers* it
  (a **reactive agent**, amber dashed arrow); drag an **actor onto an agent** and
  the person talks to it (a chat/supervision UI derives). Deleting an agent unlinks
  it everywhere, and one undo restores the agent *with* every link.
- **MCP gateways**: created from the palette (plug glyph, outside every context) —
  our component that aggregates external MCP servers and exposes APIs, single
  operations, use cases and RAGs as one MCP endpoint. Drag the gateway's handle onto
  whatever it exposes (violet dashed arrows); external agents consume the gateway,
  not the internals. See [AI Agents, MCP Gateways & RAGs](/manual/ai-agents/).
- **RAGs**: created from the palette (lens glyph, outside every context); drag an
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
- **⛶ (or F) takes the diagram fullscreen** — the whole editor, toolbar and palette
  included, via the browser's Fullscreen API; **Esc** (or F again) comes back.
- **⬦ 3D (or V) tilts the diagram** — the Firefox-Tilt view of the model: the same
  scene rendered as stacked plates where **containment depth becomes height** (a
  bounded context is the base plate, its aggregates, use cases and events float one
  storey above, an API's operations one more). Edges fly **at their nodes' heights**
  — a line between storeys climbs in 3D — with a faint shadow on the floor as the
  depth cue. And it is **interactive**: click selects (same selection as the canvas),
  **double click opens the element's editor**, **dragging a plate moves it** (the
  pointer delta is unprojected onto the floor plane; persisted and undoable), and
  **Supr deletes** with the usual integrity guards. The **connect gesture works in 3D
  too**: the selected plate offers the same blue handles as the canvas — drag one onto
  another plate (a screen-space rubber line follows) and the shell applies the same
  gesture vocabulary; while tracing, the plate under the pointer **reacts**: it grows,
  lifts a storey and rings green (the 2D canvas nodes grow on hover during tracing as
  well). The **palette works in 3D too**: open it with ☰/P and drag a new type or a
  catalog element onto the floor — the drop point is unprojected onto the ground
  plane exactly, and dropping onto a plate connects, same as in 2D. Dragging the
  background orbits,
  shift+drag pans, wheel zooms, double click on the background resets the camera.
  Press V again to come back to the 2D canvas. Pure CSS 3D, works on any view and
  detail level.

## Keyboard shortcuts

Press **?** anywhere on the canvas for the cheatsheet. The highlights: **P** palette ·
**F** fullscreen · **0** fit · **+/−** zoom · **1/2/3** context-map levels (contexts /
aggregates & use cases / APIs & operations) · **4/5/6/7** the specialized views
(aggregates · flows · processes · workflows) · **E/D** EventStorming / back to the
diagram · **V** the 3D tilt view · **T** the view's catalog tree · plus the editing keys (Supr, F2, Ctrl+Z /
Ctrl+Y, space+drag, shift for multi-selection). Shortcuts never fire while typing in
a field.

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
