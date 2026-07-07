---
title: Workflows
description: Cross-context orchestrators — event-driven dependency graphs that live outside every bounded context
---

A **Workflow** is an orchestrator that lives **outside every bounded context** — unlike
a [Process](/reference/patterns/#business-processes), which is owned by a module. It is
started by an event and advances a **dependency graph** of steps; each step starts a
task (a use case, for now) inside some bounded context. The workflow never calls
anything directly: **all workflow ↔ context communication travels as events**.

```
trigger event ──▶ Workflow ──emits──▶ step A ──▶ (awaits completion event)
                     │                                    │
                     └──emits──▶ step B ◀── depends on ───┘
                                   │
                                   ▼
                          onCompletionEventName
```

## Process or Workflow?

| | Process | Workflow |
|---|---|---|
| Owner | A bounded context (`ownerModuleId`) | Nobody — it sits between contexts |
| Shape | Ordered chain of steps | Dependency **DAG** — steps run when their dependencies complete |
| Steps | AUTOMATED or HUMAN (role, deadline, escalation, compensation) | Event-mediated tasks: the workflow *emits* an event to start the step and *awaits* another to consider it done |
| Coupling | May call use cases directly | Only events in, events out |

Use a Process for a business procedure that clearly belongs to one context (with human
tasks, SLAs, compensations). Use a Workflow when the orchestration itself is neutral
ground coordinating several contexts.

## Configuration

| Field | Description |
|---|---|
| **Name** | Workflow name |
| **Trigger** | The event that starts it, and its source: an aggregate, a domain service, or a use case (application event) |
| **Steps** | Each with: name, `emittedEventName` (the event the workflow publishes to start the step), `targetUseCaseId` (the task), `completionEventName` (what marks it done) and `dependsOnStepIds` |
| **On completion** | Event published when every step completes |

Steps' dependencies must form a **DAG** — the `workflow-dag` lint rule reports cycles
(steps on a cycle can never start). Other rules check the trigger (`workflow-trigger`),
each step's target (`workflow-step-target`) and that dependencies point at sibling
steps (`workflow-depends-scope`).

## In the graphical editor

The **Workflows** tab draws each workflow as its dependency DAG: trigger source
→(event, dashed)→ workflow → steps laid out by dependency depth → completion event
(green). Steps badge their target use case. Create workflows and steps from the
toolbar; **drag a handle from step A onto step B** to declare *B waits for A*; Supr
deletes steps or dependency arrows; everything is undoable — removing a step restores
its dependants' links on undo. Double click opens the owning workflow's form.

Workflows also join the [EventStorming view](/manual/graphical-editor/#views) as lilac
policies: trigger event → workflow → the commands it launches, with its emitted events.
