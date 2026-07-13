---
title: End-to-End Flows
description: How the building blocks fit together in the flows of an enterprise system
---

The [manual](/manual/overview/) documents each building block in isolation. This page does the opposite: it walks the **flows of a real enterprise system** end to end and shows which blocks cooperate at each step, and how consistency and reliability are preserved along the way.

A Modux system is composed of several **bounded contexts**. Within a context everything is in-process; across contexts everything goes through events or explicit synchronous contracts. Every flow below respects that boundary.

---

## 1. A user reads/writes an aggregate from the UI

The classic CRUD path. The generated CRUD page drives the aggregate through its repository — searches and reads go through the read side, while create/update/delete go through use cases that enforce invariants.

```
UI page (CRUD)
  → read:  Query Service → DTO            (bypasses the aggregate)
  → write: Create/Update/Delete UseCase
             → Aggregate (invariants)
             → Repository
```

Blocks: [Pages](/manual/pages/) · [Aggregates](/manual/aggregates/) · [Use Cases](/manual/use-cases/)

---

## 2. A user invokes a use case from the UI

Beyond CRUD, any [Use Case](/manual/use-cases/) exposed as UI is callable from a toolbar button or wizard action. The same use case can also be exposed as REST, gRPC, MCP or async — the inbound adapter changes, the use case does not.

```
UI page / REST / gRPC / MCP / async
  → UseCase (one transaction)
      → steps: ReadAggregate · CallAggregateOperation · SaveAggregate ·
               CallGateway · PublishDomainEvent · CallUseCase · ApplyModelMapping
```

The **transaction boundary is the use case** (`LOCAL`, `DISTRIBUTED` or `SAGA`). A use case mutates a single aggregate transactionally; touching another aggregate is a *separate* transaction reached via an event (flow 3).

Blocks: [Use Cases](/manual/use-cases/) · [Operations](/manual/operations/) · [Gateways](/manual/gateways/)

---

## 3. An operation emits an event that drives another use case (same context)

When an aggregate operation emits a [Domain Event](/manual/domain-events/), the event is written to the **outbox in the same transaction** as the state change. A relay then dispatches it in-process to a consumer that calls another use case — possibly on a different aggregate.

```
UseCase A  ──tx──┐
  Aggregate A    │ emit DomainEvent  ──►  Outbox (same tx)
  save           │
                 ▼
            Relay (in-context)
                 ▼
        in-process consumer  ──►  UseCase B  ──►  Aggregate B   (new tx)
```

This is **eventual consistency by design**: A and B commit in separate transactions. The outbox guarantees the event is never lost even if the relay or broker is momentarily down.

Blocks: [Domain Events](/manual/domain-events/) · [Outbox Pattern](/reference/patterns/#outbox-pattern)

---

## 4. An event must reach another bounded context (integration event)

A domain event is internal and refactorable. To cross a context boundary it is promoted to an **integration event** — a versioned public contract.

```
Context A:
  DomainEvent ─► Outbox ─► relay ─► in-process consumer
                                        ▼
                                   UseCase  ─► writes IntegrationEvent
                                                  to the integration outbox (same tx)
                                        ▼
                                   integration relay ─► Message Broker (Kafka)

Context B:
  Subscription ◄─ topic ◄─ Kafka
      ▼
   action: CallUseCase / StartSaga / UpdateProjection
```

The integration event carries an explicit `schemaVersion` and is `replayable`; the consumer-side [Subscription](/manual/subscriptions/) deduplicates redeliveries via its **inbox guard** (Kafka is at-least-once).

Blocks: [Subscriptions](/manual/subscriptions/) · [Sagas](/manual/sagas/) · [Outbox Pattern](/reference/patterns/#outbox-pattern)

---

## 5. Reading data without going through the aggregate

The read side is independent of the write side ([soft CQRS](/reference/architecture/#cqrs-split)). A **Query Service** reads from persistence directly and returns flat DTOs, never loading an aggregate.

```
UI / REST / gRPC / MCP
  → Query Service  ─►  direct SQL / JPA  ─►  DTO / Row
```

Blocks: [Use Cases](/manual/use-cases/) (query services live alongside them) · [CQRS](/reference/patterns/#cqrs-command-query-responsibility-segregation)

---

## 6. Consuming another context synchronously (API + Gateway)

When context B needs data or behaviour from context A **right now** (not via events), A exposes a synchronous contract and B reaches it through a [Gateway](/manual/gateways/) — its anti-corruption layer to the outside world.

```
Context A: UseCase / Query Service  ─►  exposed as REST or gRPC
                                             ▲
Context B: UseCase step "CallGateway" ──────┘   (circuit breaker, retry, rate limit)
```

The Gateway protects B's domain model from A's wire format and absorbs failures with a circuit breaker.

Blocks: [Gateways](/manual/gateways/) · [Anti-Corruption Layer](/reference/patterns/#anti-corruption-layer-acl)

---

## 7. Exposing use cases and queries to LLM agents (MCP)

Any use case, query service or gateway can be exposed as an **MCP tool**, letting an LLM agent invoke domain behaviour through the exact same application layer — with the same RBAC roles and scopes as every other inbound adapter.

```
LLM agent ─► MCP tool ─► UseCase / Query Service / Gateway
                              (allowedRoles / allowedScopes enforced)
```

Blocks: [Use Cases](/manual/use-cases/) (exposure flags) · [Roles & Security](/manual/roles/)

---

## 8. Materializing another context's data locally (Projections)

The alternative to flow 6: instead of calling A synchronously, B **materializes** the data it needs from A's integration events into its own read model. Reads then stay local and resilient to A being down.

```
Kafka ─► Subscription (action: UpdateProjection)
             ▼
        Projection (event handler)
             ▼
        ReadModel (table / document in context B)
```

Read models can be rebuilt (`FROM_SCRATCH`, `FROM_SNAPSHOT`, `INCREMENTAL`) by replaying the event stream.

Blocks: [Projections & Read Models](/manual/projections/) · [Subscriptions](/manual/subscriptions/)

---

## Consistency & reliability across every flow

These guarantees are not per-flow add-ons; they are wired into the generated code wherever the relevant block appears:

| Concern | Where it lives | Guarantee |
|---|---|---|
| **Transactionality** | Use case transaction boundary | One aggregate per transaction; cross-aggregate work is eventual |
| **No lost events** | Outbox (domain) + integration outbox | Event persisted in the same transaction as the state change |
| **At-least-once delivery** | Kafka + relays | Messages may be redelivered |
| **At-most-once *effect*** | Use case idempotency key · Subscription inbox guard | Redeliveries deduplicated before side effects |
| **Schema evolution** | Integration event `schemaVersion` | Public contracts version independently of internal events |
| **Failure isolation** | Gateway circuit breaker · subscription/saga retry + DLQ | Downstream failures don't cascade |

Choosing between the two cross-context strategies:

- **Need fresh data on demand?** → synchronous [Gateway](/manual/gateways/) (flow 6).
- **Can tolerate eventual consistency for local, resilient reads?** → [Projection](/manual/projections/) to a read model (flow 8).

See [Architecture Patterns](/reference/patterns/) for the patterns behind these flows and [Architecture](/reference/architecture/) for the layer/package structure.
