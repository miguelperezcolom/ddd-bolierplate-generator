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

The **Modelo:** bar above the [graphical editor](/manual/graphical-editor/) drives
everything:

- **Sistema (as-is)** — the `main` branch, badge AS-IS.
- **＋ Nueva solución…** — branches from the system and registers a self-describing
  `Solution` element *in the branch's own store*: name, objective, status
  (`EXPLORING → PROPOSED → APPROVED → MERGED | DISCARDED`) and the
  [decisions](/reference/patterns/#decisions-adrs-and-traceability) it rests on. The
  list of solutions is derived from the branches — no duplicate registry.
- **Switching** checks the branch out and reloads the catalog; pending work is
  auto-committed (`wip: <branch>`) before every switch, so nothing is ever lost.
- **⏏ Descartar** archives the solution as a tag (`archive/solution-x`) and deletes
  the branch — history stays reachable, the branch list stays clean.

The store repo is initialised lazily on first use, with the current model as the
system's baseline. **Point `modux.model-file` at a directory outside your code
repository** — the store deserves its own repo (nesting it inside another git repo
creates a gitlink).

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
- the **`＋n ～n −n` badge** summarizes the change set (deleted elements, no longer on
  the canvas, are listed in its tooltip).

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
