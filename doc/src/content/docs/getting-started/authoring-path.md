---
title: The Authoring Path
description: The natural order for modeling an information system in Modux — and when to escalate to richer elements
---

There is a natural order for defining an information system, and Modux is built around it. It is not just a sequence — it is a **ladder of commitment**: each step adds semantics only when the system actually needs them. The linter knows this path and turns "what's next?" into findings; the MCP server teaches it to AI agents; the starter recipes jump you straight to step 3.

## 1. Topology — project, modules, services

Create the **project**, carve the domain into **modules** (bounded contexts), and put every module inside a **service**. This is a deployment decision, not a domain decision — one service with many modules is a perfectly good start (you can split later; the module boundary is what matters).

> Lint: `module-not-in-service` warns about modules that would never be generated or deployed.

## 2. Models first — then escalate only when needed

The foundation of an information system is **data with shape**: create the **models** (fields, validations, PII classification). Then, on top of each model, escalate deliberately:

| You need… | Add… | Don't add it when… |
|---|---|---|
| Rules that must always hold, a lifecycle, optimistic locking, event sourcing | an **aggregate** over the model | it's just data being stored and listed — CRUD doesn't need an aggregate |
| A read side: lists, dashboards, lookups | a **query service** or a **read model** | — |
| To record that something happened | a **domain event** | nothing reacts to it and nobody audits it |
| A thing the system *does* (a command with meaning) | a **use case** | the generated CRUD already covers it |

**The aggregate is the justified exception, not the default.** Most modules are models + pages + query services. You pay the transactional-consistency complexity only when an invariant appears — that is what the `aggregate-invariants` finding is really asking: *if there is no invariant, why is this an aggregate?*

> Lint: `module-read-path` (state nobody can read) and `module-write-path` (aggregates nobody writes to) point at the missing half.

**When the read side genuinely lives elsewhere** — a CQRS read side in another module, or an external system fed by CDC — say so on the module instead of leaving the linter guessing:

```yaml
- id: "mod-reservas"
  readSideModuleId: "mod-dispo"          # or readSideExternalSystemId
  readSideVia: "CDC (rumbo → dispo)"     # prose; feeds the generated HLA
```

The declaration satisfies `module-read-path`, is checked by referential integrity, and the generated HLA documents the delegation ("Lectura delegada en dispo vía CDC").

## 3. Relations between modules — declared as intent

Modules relate in exactly three ways, and all three are **flow archetypes** — you declare the intent and the structure is derived:

| Relation | Flow archetype | What gets derived |
|---|---|---|
| *"Module B keeps a view of what happens in A"* | `MATERIALIZES` | projection + subscription + read model |
| *"An event in A makes B act"* | `TRIGGERS` | subscription + use-case invocation |
| *"A synchronous call from A to B"* | consumption API | gRPC exposure + typed client |
| *"An event must reach an external system"* | `NOTIFIES` | subscription + gateway call |
| *"A multi-step conversation with compensation"* | `ORCHESTRATES` / process | saga + worklist + deadlines |

Prefer a [starter recipe](/manual/recipes/) over hand-building: `materialized-read-model`, `human-approval-process` and `external-notification` each emit one intent element and let the linter list what is still open.

> Lint: `flow-context-relation` and the cross-context rules check that these relations match the declared context map.

## 4. Operations — pipelines over the model

Finally, the fine grain: the operations inside use cases and aggregates. Every one of them has the same shape — **gather data, transform it, then write it somewhere or return it**. Modux gives each stage an element:

- *gather* — input models, query services, gateway calls
- *transform* — **model mappings** (declarative field-level rules) or two-zone hooks for logic that deserves code
- *write / return* — aggregate operations (guarded by invariants), repositories, output models, emitted events

If an operation doesn't fit "gather → transform → write/return", that is usually a sign it is two operations.

> Lint: `use-case-pipeline` (steps that only gather/transform, no output model) and `operation-pipeline` (operations that neither set state, emit events nor return) flag pipelines with no observable effect.

## The path as a loop

In practice you don't walk the path once — you walk it per feature, and the linter is the guide at every step:

```
topology → models → (aggregate? read side?) → relations as intent → operations
   ↑                                                                    │
   └-------------------- lint_model / Model health ←--------------------┘
```

The same rules run in the UI (**Model health**), in CI (`--modux.lint`), while editing (`--modux.lint --modux.watch`) and in agent sessions (MCP `lint_model`) — so wherever you author, the path pushes back the same way.
