---
title: Projections & Read Models
description: The CQRS read side in Modux — two roles, one pattern
---

The **read side** of CQRS in Modux is built from two roles that work together:

- A **ReadModel** — the denormalized table or document the UI reads from.
- A **Projection** — the process that keeps a ReadModel up to date by consuming domain events.

They are **two roles of the same pattern**, not rival concepts. A Projection without a ReadModel has nothing to write to; a ReadModel without a Projection is an empty table.

```
DomainEvent → IntegrationEvent → Projection → ReadModel → QueryService → UI
                                  └── writes ──┘  └── reads ──┘
```

## When to use this pattern

When data needed in one bounded context originated in another, and the destination is **read-only** — no commands, no domain invariants, no behavior.

If the destination needs commands or invariants, it is an **Aggregate**, not a ReadModel. Use **Subscription + UseCase → Aggregate** instead (see [Subscriptions](/manual/subscriptions/)).

| Destination has commands / invariants? | Pattern |
|---|---|
| **Yes** | Subscription + UseCase → Aggregate |
| **No, only read** | Projection → ReadModel |

The decisive question: *does the destination need to react to commands?* If not, it's a ReadModel.

---

## ReadModel

A ReadModel is a denormalized view designed for a specific query or screen. It can join data from multiple aggregates, across bounded contexts.

### Properties

- **No commands.** It exposes no operations or use cases.
- **No invariants.** Truth is whatever the events say.
- **Optimized for read.** Schema follows the query shape, not the domain.
- **Owned by the consuming module.** It lives where it is read, not where the source data originates.

### Creating a ReadModel

1. Open a module and go to **Read Models**
2. Click **New**
3. Configure and save

### Configuration

| Field | Description |
|---|---|
| **Name** | ReadModel name (PascalCase) |
| **Model** | Data model that defines the ReadModel's schema |
| **Consistency** | `Eventual` (asynchronous, via projection) or `Strong` (synchronous with the producing transaction) |
| **Storage type** | `Document`, `Relational`, `KeyValue`, or `InMemory` |

### What gets generated

- A persistence entity for the ReadModel table/document
- A repository for read access
- A **QueryService** wired to expose the data to the UI

---

## Projection

A Projection is the **event handler** that keeps a ReadModel up to date. When a configured event arrives, the projection writes to the target ReadModel.

### Creating a Projection

1. Open a module and go to **Projections**
2. Click **New**
3. Configure and save

### Configuration

| Field | Description |
|---|---|
| **Name** | Projection name (PascalCase) |
| **Target ReadModel** | The ReadModel this projection writes to |
| **Event handlers** | For each domain event handled: handler type (`Create`, `Update`, `Delete`, `Upsert`, `Custom`) and an optional `ModelMapping` to translate the event payload into the ReadModel shape |
| **Error handling strategy** | What to do when an event cannot be processed |
| **Max retries** | Maximum delivery attempts before giving up / dead-lettering |
| **Rebuild strategy** | How to rebuild the ReadModel from scratch (see below) |
| **Snapshot enabled** | Whether snapshots are persisted to speed up rebuilds |
| **Snapshot frequency** | Take a snapshot every N events |

### What gets generated

- `<Name>Projection.java` — event handler class
- Handler methods for each configured event type
- Write logic against the target ReadModel's repository

### Rebuilding

If the projection logic changes, you can rebuild the target ReadModel by replaying past events:

| Strategy | Description |
|---|---|
| `REPLAY` | Process all events from offset 0 |
| `SNAPSHOT` | Restore from a snapshot, then replay only newer events |
| `FULL_REBUILD` | Drop the ReadModel data, then replay from scratch |

---

## Next steps

- Use [Subscriptions](/manual/subscriptions/) when the destination is an aggregate (not a ReadModel)
- Set up [Domain Events](/manual/domain-events/) — projections need events to consume
