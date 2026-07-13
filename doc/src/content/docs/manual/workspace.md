---
title: Workspace
description: Browse and edit the whole model as a tree — create, edit and delete any element from one place
---

The **Workspace** page shows the whole model as a navigable tree and is the fastest way to author it from the UI: select any node to open that element's own editor in the detail pane, create new elements anchored to their owner, or delete elements without leaving the tree.

## The tree

```
Project
└── Service
    ├── Gateways
    └── Bounded Context
        ├── Aggregates          ├── Sagas
        ├── Entities            ├── Projections
        ├── Value Objects       ├── Read Models
        ├── Domain Events       ├── Subscriptions
        ├── Use Cases           ├── Query Services
        ├── Flows               ├── Integration Events
        ├── Processes           └── Scheduled Triggers
Decisions (global)
```

- Elements attached to the bounded context through its reference lists (aggregates, use cases, sagas…) appear under their group.
- Intent-layer and reverse-referenced elements are resolved automatically: **flows** by `targetBoundedContextId`, **processes** by `ownerBoundedContextId`, **query services** and **integration events** by `boundedContextId`, **gateways** by `serviceId`.
- **Decisions** (ADRs) are global, so they hang from the root.
- The search box filters the tree by label, keeping matching branches expanded.
- Operations and invariants are edited inline within their aggregate — they are not tree nodes.

## Creating elements

**New** opens a single creation form for every kind: pick the **kind**, give it an **id** and a **name**, and select the **owner** (bounded context, service or project, depending on the kind). A skeleton element is created, attached to its owner (so it appears in the tree immediately), and you fill in the details through its own editor.

The form rejects ids that already exist anywhere in the model — see the uniqueness rule below.

## Deleting elements

Deleting a node removes the element and **detaches its id from every `*Ids` reference list** in the model, so the tree never points at ghosts. Single-value references (`modelId`, `targetUseCaseId`…) are deliberately left in place — the linter reports them as dangling so you decide what they should point at now.

## Ids are globally unique

The workspace routes on plain, unprefixed ids, so **an id must identify exactly one element across the whole model**. This is enforced three times over:

1. The creation form rejects duplicates.
2. The `duplicate-id` lint rule flags hand-edited duplicates as ERROR (`--modux.lint` gates them in CI).
3. The JSON schema requires `id` and constrains its shape (no spaces; kebab-case recommended).

One blessed exception: an element and its backing data model (`ModelEntity`) conventionally share the same id (e.g. aggregate `reserva` ↔ model `reserva`).
