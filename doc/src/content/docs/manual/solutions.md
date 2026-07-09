---
title: System & Solutions
description: The as-is and its to-be proposals — git branches over the store, with a semantic layer on top
---

An architecture practice distinguishes the **system** (the as-is: what is deployed)
from **solutions** (to-be proposals, each tied to a project). Modux makes both live in
the same spec: the store sits in **its own git repo** — `main` is the system, each
solution a `solution/<slug>` branch. When a solution is approved and implemented it
**merges into main** and becomes the new as-is. Full design rationale in
`docs/design/system-and-solutions.md` (in the repo).

Git provides branches, history, blame and merge; modux adds the **semantic layer**:
the solution's identity, the element-by-element diff, and the deliverable.

## Working with solutions

The working model is **application-level context**: the header shows
`Repositorio | Proyecto | Modelo` on every page. The «Modelo» selector is where you
**see** which branch you are on («Sistema (as-is)» or «Solución: X») and where you
**switch** — picking another model checks the branch out server-side before the
request is handled, so the page that reloads already shows the other model. The
selector queries the server when opened, so solutions created a moment ago are
always listed.

The **Modelo:** bar above the [graphical editor](/manual/graphical-editor/) keeps
what is editor-specific:

- the model being edited (read-only — switching lives in the header) and its badge
  (AS-IS / TO-BE with the `＋n ～n −n` diff summary);
- **＋ Nueva solución…** — branches from the system and registers a self-describing
  `Solution` element *in the branch's own store*: name, objective, status
  (`EXPLORING → PROPOSED → APPROVED → MERGED | DISCARDED`) and the
  [decisions](/reference/patterns/#decisions-adrs-and-traceability) it rests on. The
  list of solutions is derived from the branches — no duplicate registry.
- the lifecycle actions of the checked-out solution — see
  [Approval and merge](#approval-and-merge).

Whenever an editor action lands on another branch (creating a solution, discarding
the current one, a merge), the header context is synchronised automatically — both
indicators always tell the same story.

## The solution lifecycle

A solution walks through its statuses; each step is one button on the editor bar:

| Status | Meaning | Next step |
|---|---|---|
| `EXPLORING` | Being designed — the default at birth. | **→ Proponer** |
| `PROPOSED` | Ready for review; its HLA is the review artifact. | **✓ Aprobar** (gated) or back to work |
| `APPROVED` | Green lint, no open decisions — implementable. | **⇧ Mergear al sistema** |
| `MERGED` | Its changes ARE the system now; the branch is archived. | — |
| `DISCARDED` | Abandoned; archived as a tag, reachable forever. | — |

**⟳ Actualizar del sistema** can be used at any point of a living solution to bring
in the system's advances (the semantic take on a rebase).

## Git under the hood

Git is an implementation detail: the UI never speaks of commits, and no git
knowledge is needed. For the curious — and for whoever operates the repo from
outside — this is what each action does in the store's repo:

| Action in modux | Git effect |
|---|---|
| First solution ever (or first switch) | `git init` in the store folder + `checkout -B main` + baseline commit («sistema: línea base»). If the folder already is a git repo **without commits** (you ran `git init` yourself), the current store is committed as the baseline on `main`. |
| ＋ Nueva solución «X» | auto-commit of pending work (`wip: <rama>`), `checkout main`, `checkout -b solution/x`, commit with the solution's registry. |
| Switch model (header selector) | auto-commit of pending work on the branch you leave, `checkout` of the target, in-memory catalog reload. Nothing is ever lost. |
| Every model edit | saved to the working tree immediately (no commit per edit); committed as `wip:` on the next branch change. |
| ⏏ Descartar | tag `archive/solution-x` + `branch -D` — history stays reachable, the branch list stays clean. |
| ⇧ Mergear al sistema | **semantic merge** (element by element, never textual) committed on `main` as a true merge commit (both parents), then the branch is archived like a discard. |
| ⟳ Actualizar del sistema | same semantic machinery in the opposite direction, committed on the solution's branch. |
| Semantic diff / merge base | read-only `git worktree` checkouts at temp paths, removed afterwards. |

Modux **never touches remotes**: no fetch, no pull, no push, no rebase.

## Outside modux: your repo, your rules

The store repo is a perfectly normal git repository — everything modux does not do
is yours to do with plain git, from the store folder:

- **Where it lives** — for a `LOCAL` [repository](/manual/workspace/) the repo is the
  folder itself; for a `GIT` repository it is the clone under
  `~/.modux/checkouts/<id>`. Point local folders **outside** your code repository —
  the store deserves its own repo (nesting it inside another git repo creates a
  gitlink).
- **Sharing and backup** — add a remote and push: `git push -u origin main` and
  `git push origin solution/x`. Pulling colleagues' work is a plain `git pull`
  (switch models or reload afterwards; modux detects external changes and reloads by
  itself while running).
- **Review as PRs** — a solution branch pushed to a forge is reviewable like any
  other branch; the granular format (one YAML per element) makes textual diffs
  readable, and the solution's HLA is the narrative companion.
- **Manual merges and rebases** — legitimate whenever you prefer git's own tooling:
  the granular format merges cleanly when different elements changed, and a textual
  conflict means *the same element changed on both sides* — exactly the granularity
  an architect wants to resolve. Modux's semantic merge is the assisted alternative,
  not a requirement.
- **History and archaeology** — `git log -- aggregates/reserva.yaml` is the history
  of ONE element; discarded solutions live under `archive/*` tags.

## The working method: where does each change go?

The branches only stay meaningful if each one holds what it claims to hold:

- **Everything that exists in reality goes to the system** (`main`). Modelling the
  existing landscape — a context that was never drawn, a legacy external system, an
  API that was already deployed — is *as-is documentation*, not a proposal, even if
  you only discovered the gap while designing something new.
- **A solution branch holds ONLY the proposed changes.** That is what makes its
  [semantic diff](#the-semantic-diff) and the «Qué cambia» section of its HLA
  trustworthy: everything green or amber there *is* the proposal.
- **When the solution is implemented**, walk it through
  [Proponer → Aprobar → Mergear](#approval-and-merge): the merge makes it the new
  as-is.

The corollary — the one habit worth drilling: **if while designing a solution you
need elements that already exist but were never modelled, do NOT add them to the
solution branch.** Switch to **Sistema (as-is)**, add them there, switch back to the
solution and press **⟳ Actualizar del sistema**: the rebase brings them in, and they
correctly show as *unchanged* in the diff instead of polluting the proposal. Adding
them to the solution would present the already-existing world as if it were part of
the to-be — and the HLA would lie.

## The semantic diff

On a solution, the canvas shows *what the proposal changes* live:

- a dashed **green ring** — elements that only exist in the solution;
- a dashed **amber ring** — elements modified with respect to the system;
- the **`＋n ～n −n` badge** summarizes the change set — and **clicking it unfolds
  the full change list** under the bar, grouped into *Añadidos*, *Modificados* and
  *Eliminados*, each row with the element's kind and name. Deleted elements, no
  longer on the canvas, are only visible there.

The diff compares the current model — including uncommitted work — against the
committed system, element by element and **by id**, across every type of the
meta-model. Layout geometry and the solution's own registry are excluded: they are
meta, not model.

## The deliverable: the solution's HLA

The [design document](/reference/patterns/#the-design-document-generated) generated
while a solution is checked out is the **HLA of the to-be**, and it closes with a
**«Qué cambia respecto al sistema»** section: the change summary and an
element-by-element table — kind of change, element, and the **decisions** that justify
it — in strategic → domain → behaviour → integration reading order. The to-be and its
delta, both derived from the spec, impossible to drift.

## Approval and merge

A solution advances through its statuses from the bar:

- **→ Proponer** (`EXPLORING → PROPOSED`) — the to-be is ready for review.
- **✓ Aprobar** (`PROPOSED → APPROVED`) — enforced by the **approval gate**: a green
  lint (no ERRORs) and **no open decisions** (`PROPOSED` ADRs are the design's open
  points). Blockers come back as a toast listing them.
- **⇧ Mergear al sistema** (APPROVED only) — a **semantic merge**, never textual: the
  merge base, the system and the solution are compared element by element and by id.
  Changes on one side apply cleanly; an element changed on **both** sides opens the
  conflict panel — pick *Sistema* or *Solución* per element (each option's YAML in its
  tooltip). The result is committed on `main` as a true merge commit (both parents),
  the solution's registry is stripped (the system carries no solutions), the branch is
  archived as a tag and deleted. The solution is now the as-is.

**⟳ Actualizar del sistema** brings the system's advances into a *living* solution —
the same semantic machinery in the opposite direction (the practical take on the
rebase), with the same per-element conflict panel. Diagram geometry always follows
the solution (naive, by design).

## Roadmap

One phase of the design remains:

- **Transition (F4)**: the merged change set feeds
  [system evolution](/manual/system-evolution/) — migrations, event upcasters and
  projection rebuild plans derive from the same diff.
