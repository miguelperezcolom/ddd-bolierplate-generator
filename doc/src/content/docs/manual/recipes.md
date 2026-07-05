---
title: Starter Recipes
description: Parameterized templates that emit intent-layer elements — start from a 5-line intent, not from six structural pieces
---

Modux's intent layer (flows, processes) already lets you declare *what* you want and have the structure derived. **Starter recipes** take the next step: for the most common architectural moves, a recipe asks only for the parameters and emits the intent element for you. The expanders derive the structure at generation time, and the linter walks you through whatever the recipe deliberately left open (roles, use cases…).

## The built-in recipes

### `materialized-read-model` — Read model kept by a projection

An event in a source context materializes a denormalized read model in a target context.

| Parameter | | |
|---|---|---|
| `id` | required | Id of the new flow (kebab-case) |
| `name` | required | Display name |
| `triggerAggregateId` | required | Source aggregate emitting the event |
| `triggerEvent` | required | Domain event name (e.g. `ReservaCreada`) |
| `targetModuleId` | required | Module that owns the read model |
| `readModelName` | required | Name of the materialized read model |
| `materializedFields` | optional | Comma-separated fields to materialize |

Emits one `MATERIALIZES` flow; the projection, subscription and read model are derived.

### `human-approval-process` — Process with a human approval step

A long-running process started by a domain event: a human approves (with deadline, default `PT48H`, and optional escalation), then an automated step applies the outcome.

| Parameter | | |
|---|---|---|
| `id`, `name` | required | Process identity |
| `triggerAggregateId`, `triggerEvent` | required | What starts the process |
| `ownerModuleId` | required | Module that owns the process |
| `approverRoleId` | optional | Role that approves — linted if missing |
| `deadline` | optional | ISO-8601 duration (default `PT48H`) |
| `escalationRoleId` | optional | Role escalated to on deadline |
| `applyUseCaseId` | optional | Use case applying the approved outcome |

Emits one Process; saga, worklist and deadline watchers are derived.

### `external-notification` — Notify an external system on an event

| Parameter | | |
|---|---|---|
| `id`, `name` | required | Flow identity |
| `triggerAggregateId`, `triggerEvent` | required | Source of the notification |
| `targetModuleId` | required | Module that owns the outbound adapter |

Emits one `NOTIFIES` flow; the subscription and the outbound call are derived.

## Applying a recipe

Recipes are exposed through the [MCP authoring server](/manual/mcp-authoring/):

```
list_recipes                          → the catalog above, with parameter docs
apply_recipe(recipe, params)          → creates the element(s), returns their ids
```

A typical agent exchange: *"cada vez que se cree una reserva quiero una lista de llegadas del día"* → the agent calls `apply_recipe("materialized-read-model", {...})`, then `lint_model` to see what is still open.

The linter is part of the recipe by design: a `human-approval-process` without `approverRoleId` generates a `process-human-role` finding pointing exactly at what to fill in — the recipe gets you a valid skeleton in one move, the linter turns the remaining blanks into a to-do list.
