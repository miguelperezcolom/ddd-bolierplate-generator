---
title: Sagas (fusionadas en Workflows)
description: Sagas were fused into workflows — compensation now travels on the workflow step
---

**Sagas are no longer a separate concept**: they were fused into
[Workflows](/manual/workflows/), together with Processes. What made a saga a saga —
the compensation chain — now travels **on the workflow step**: each step may declare
a `compensationUseCaseId`, the use case that *undoes* it when the workflow
compensates.

| Before (Saga) | Now (Workflow) |
|---|---|
| Saga step with compensation action | Workflow step with `compensationUseCaseId` |
| Central orchestrator | The workflow itself (events in, events out) |
| Choreography | Plain [subscriptions](/manual/subscriptions/) between contexts — no orchestrator needed |
| `USER_TASK` step bound to a form | Human step: `roleId` + `deadline` + `formPageId` |

The runtime story is unchanged: the generator emits
[EventConductor](https://eventconductor.mateu.io/) workflow definitions — see
[Workflows → Runtime](/manual/workflows/#runtime).

## Migrating an old store

Stores that still hold `sagas` (or `processes`) migrate with one click — the
**⇪ Migrar** button appears on the Workflows view whenever there is something to
migrate — or through the commands:

```
migrate-sagas-to-workflows
migrate-processes-to-workflows
```

Ids are preserved, so every reference survives: a saga becomes a workflow with the
same id, its steps become a dependency chain, and each compensation action lands on
its step's `compensationUseCaseId`.
