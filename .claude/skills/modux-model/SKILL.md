---
name: modux-model
description: Author a modux domain model by editing its YAML files directly — the metamodel in brief, the JSON schema, the referential rules the schema cannot express, and the validate/generate loop. Use when creating or changing a model in a repo's modux/ directory (aggregates, bounded contexts, use cases, relations, workflows), or when `mvn modux:validate` fails.
---

# Authoring a modux model

A modux model is **a directory of YAML files in the repository**, one file per element,
versioned next to the code it generates. You edit it with Read/Edit/Write like any other
source. There is no server to call and no tool surface in front of the files.

```
mi-proyecto/
├── modux/                          ← the model
│   ├── index.yaml                  ← marker + counts per type. Its presence is what makes
│   │                                 this directory a modux project.
│   ├── model-driven-store-schema.json
│   ├── project.yaml
│   ├── boundedContexts/{id}.yaml
│   ├── aggregates/{id}.yaml
│   └── …                           ← one directory per element type
└── src/main/java/                  ← generated + hand-written
```

**One repository is one project.** There is no "current project" to select.

## Start here: the schema is the metamodel

`modux/model-driven-store-schema.json` defines every element type and every field — what
can be said at all. **Read it before inventing a field**; a field that is not in the schema
does not exist, and the generator will ignore it silently.

Regenerate it after upgrading modux:

```bash
mvn modux:schema
```

## The shape of the metamodel

Three layers that are easy to conflate:

| Concept | What it owns |
|---|---|
| **Bounded context** | **Meaning.** The domain language: aggregates, use cases, domain events. |
| **Module** | **Packaging.** How a context's elements are distributed into buildable units. |
| **Service** | **Deployment.** A service deploys modules; it is what becomes a runnable app. |

A bounded context is born with a **main module** (`{contextId}-main`), and a service deploys
that module. If you add a context by hand, add its main module too, and add the module's id to
a service's `moduleIds` — otherwise the context exists but nothing deploys it.

## The rules the schema cannot express

The schema guards shape. These are the ones that break a model while still validating:

1. **Every id reference must resolve.** Any field ending in `Id` or `Ids` must name an element
   that exists in the model. This is the single most common breakage from a hand edit.
2. **Back-references are two-way.** An aggregate declares nothing about its context; the
   *context* lists it in `aggregateIds`. Adding `aggregates/agg-x.yaml` without adding `agg-x`
   to its context's `aggregateIds` produces an orphan the editor will not draw.
   The same holds for `useCaseIds`, `valueObjectIds` and `services.moduleIds`.
3. **An aggregate needs its state model.** Aggregates carry `modelId` pointing at a `models/`
   element. The convention is `model-{aggregate id without the `agg-` prefix}`.
4. **Deletion has preconditions.** A bounded context with aggregates, or an aggregate with
   entities, cannot be deleted until those go first.
5. **A module is deployed by exactly one service.** Do not list the same module id under two
   services.
6. **Invariants are nested, and polymorphic.** They live inside their owner's `invariants`
   list, and the owner may be an aggregate, a value object *or* an entity — not in a
   top-level directory.
7. **Sagas and workflows have an execution ceiling per step.** A cycle without a bound is
   rejected: the build refuses workflows that can loop forever.

## The loop

Always, after editing:

```bash
mvn modux:validate     # referential integrity — catches rules 1 and 2 above
mvn modux:generate     # generates into the project's declared outputPath
mvn -q test            # the generated code has to build
```

`modux:validate` reports every dangling reference with the element and field that carries it.
Fix the model, not the generated code.

## Do not edit generated code

Generation has two zones (see `docs/design/two-zone-codegen.md`):

- **Generated zone** — overwritten on every run. Never edit it; the change is lost on the next
  `modux:generate`.
- **Custom zone** (`{service}-custom`) — scaffolded once, never overwritten. Business logic
  goes here, implementing the hooks the generated zone declares.

If you want different generated code, change the model or the template — not the output.

## Conventions that keep diffs small

- **File names come from ids**, sanitized (`[^A-Za-z0-9._-]` → `_`). Two ids differing only by
  a special character collide in one file.
- **The store never writes empty values**: no nulls, no empty strings, no empty lists, and
  `false` booleans are omitted. Do not add `aggregateIds: []` — leave the field out.
- **Element order inside a type is not meaningful.** Files load alphabetically. Order *within*
  an element (a use case's steps) is meaningful and preserved.
- Ids are conventionally prefixed by type: `bc-`, `agg-`, `ent-`, `vo-`, `uc-`, `model-`.

## Worked examples

`sample/patterns/` in the modux repository holds hand-authored didactic models, one per
pattern — BFF, ACL, CQRS, event-driven, saga, event sourcing, human process. Read the one that
matches the shape you are building before writing from scratch.
`sample/hla-booking/` is a full realistic model.

## When the editor is the better tool

Geometry (`diagrams/`) is written by the graphical editor in the IntelliJ plugin. You can edit
it by hand, but positions you invent will look arbitrary — prefer leaving the diagram alone and
letting auto-layout place new elements.
