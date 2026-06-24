---
title: Enterprise Information Systems
description: What kind of system Modux is for, and the patterns such a system requires
---

Modux is not a generic CRUD scaffolder. It is built for one specific class of software: **enterprise information systems** — the long-lived, business-critical systems that run an organization's operations.

Understanding that target is the key to understanding *why* Modux ships the building blocks it does. Each pattern below exists because an enterprise information system **requires** it, not because it is fashionable.

Modux's scope is the **entire** system: every layer from the domain core to operability, every bounded context, and every integration between them. The goal is that an enterprise information system can be defined — and fully covered — with Modux alone, rather than assembled by hand from a dozen unrelated tools.

## What makes a system "enterprise"?

An enterprise information system has a recognizable shape:

- It is **composed of several bounded contexts** that evolve and deploy independently, yet must stay consistent with each other.
- It holds **long-lived data** that must remain valid forever — business **invariants** can never be silently violated.
- It runs **business processes**, not just record edits: actions with consequences, some spanning multiple contexts and lasting seconds, days or weeks.
- It is **integrated** — contexts exchange data both synchronously (ask now) and asynchronously (react later), and it talks to external systems.
- It must be **operable**: observable, secured, and resilient to partial failure, because downtime and data loss have real business cost.

A framework that only generates forms over tables ignores most of this. Modux treats these properties as first-class.

## What such a system must be able to do

Distilled to capabilities, an enterprise information system must:

1. **Store and retrieve data** reliably.
2. **Maintain invariants** — never persist an invalid state.
3. **Execute actions** (use cases) that carry business intent.
4. Make those actions **idempotent** — the same action applied twice must not double its effect.
5. Allow an action to have **side effects** — emitting events that trigger further actions.
6. **Compose multiple bounded contexts** and integrate them without coupling their internal models.
7. **Import** another context's data (materialized read models) **or consume** it live (synchronous queries) — whichever the use case needs.
8. Be reachable through **multiple front doors** — UI, REST/gRPC API, and MCP for LLM agents — over the same application core.
9. Be **operable** — observable, cacheable, secured, resilient.

## The pattern each requirement demands

This is the heart of it: every capability above maps to an established pattern, and every pattern maps to a Modux building block.

| Requirement | Pattern it demands | Modux building block |
|---|---|---|
| Store & retrieve, enforce a consistency boundary | **Aggregate** + Repository | [Aggregates](/manual/aggregates/), [Entities & Value Objects](/manual/entities-and-value-objects/) |
| Never persist an invalid state | **Invariants** | [Aggregates](/manual/aggregates/), [Business Rules](/manual/business-rules/) |
| Execute business intent in one transaction | **Use Case** (transaction boundary) | [Use Cases](/manual/use-cases/) |
| Apply an action exactly once in effect | **Idempotency** (keys + inbox) | [Use Cases](/manual/use-cases/), [Subscriptions](/manual/subscriptions/#idempotency) |
| React to what happened, with side effects | **Domain Events** | [Domain Events](/manual/domain-events/) |
| Never lose an event on the way out | **Outbox** + relay | [Outbox Pattern](/reference/patterns/#outbox-pattern) |
| Read efficiently without loading the write model | **CQRS** (query services) | [CQRS](/reference/patterns/#cqrs-command-query-responsibility-segregation) |
| Send an event across a context boundary | **Integration Event** (versioned contract) | [Subscriptions](/manual/subscriptions/), [Sagas](/manual/sagas/) |
| Coordinate a long-running process with rollback | **Saga** (compensation) | [Sagas](/manual/sagas/) |
| Materialize another context's data locally | **Projection → Read Model** | [Projections & Read Models](/manual/projections/) |
| Call another context synchronously, safely | **Gateway** (anti-corruption layer) | [Gateways](/manual/gateways/) |
| Run actions on a schedule | **Scheduled Trigger** (cron) | [Scheduled Triggers](/manual/scheduled-triggers/) |
| Restrict who can do what | **RBAC** | [Roles & Security](/manual/roles/) |
| Expose the core to UI, API and agents alike | **Hexagonal ports & adapters** | [Use Cases](/manual/use-cases/) exposure flags |

A few patterns are **opt-in** rather than always-on: **Event Sourcing** is enabled per aggregate (state-stored is the default), and the **Outbox Pattern** is configured per service.

See [End-to-End Flows](/reference/flows/) for how these blocks cooperate at runtime, and [Architecture Patterns](/reference/patterns/) for each pattern in depth.

## Operability is part of the system, too

A system that runs an organization's operations is only complete if it can be **operated**. Operability is therefore part of what an enterprise information system *is*, and part of what Modux covers — not a separate concern bolted on afterwards:

- **Security** — who is allowed to do what, enforced at every entry point.
- **Resilience** — degrading gracefully under partial failure: timeouts, retries, dead-lettering, circuit breaking.
- **Caching** — serving hot data fast, locally and across the cluster.
- **Observability** — logs, metrics and tracing that explain what the running system is doing.
- **Monitoring & alerting** — health and service-level signals that tell operators when to act.

These belong to the same model-driven definition as the domain itself: the aim is that an enterprise information system is described end to end — domain *and* operations — in one place, so nothing essential lives outside the model.

## Next steps

- [Quick Start](/getting-started/quick-start/) — generate your first project
- [End-to-End Flows](/reference/flows/) — see the patterns working together
- [User Manual](/manual/overview/) — every building block in detail
