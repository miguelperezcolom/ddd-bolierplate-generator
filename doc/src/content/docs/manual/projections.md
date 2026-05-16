---
title: Projections & Read Models
description: Event-driven read models in Modux
---

## Projections

A **Projection** is a read model built by consuming domain events. When an event arrives, the projection updates its own state to reflect the change. This is the CQRS read side — optimised for queries, not for writes.

### Creating a projection

1. Open a module and go to **Projections**
2. Click **New**
3. Configure and save

### Configuration

| Field | Description |
|---|---|
| **Name** | Projection name (PascalCase) |
| **Events** | List of domain events this projection listens to |
| **Error handling** | What to do when an event cannot be processed: `SKIP`, `RETRY`, `DEAD_LETTER` |
| **Rebuild strategy** | How to rebuild the projection from scratch: `REPLAY`, `SNAPSHOT`, or `FULL_REBUILD` |
| **Max staleness** | Maximum allowed lag behind the event stream |

### What gets generated

For a `BookingStatusProjection`:

- `BookingStatusProjection.java` — event handler class
- Handler methods for each configured event type
- Persistence for the projected view (JPA entity + repository)

### Rebuilding

If the projection logic changes, you can rebuild it by replaying all events from the beginning of time. The rebuild strategy controls how this is done:

| Strategy | Description |
|---|---|
| `REPLAY` | Process all events from offset 0 |
| `SNAPSHOT` | Restore from a snapshot, then replay only newer events |
| `FULL_REBUILD` | Drop and recreate the projected table, then replay |

---

## Read Models

A **Read Model** is a denormalized query view designed for a specific use case. It is similar to a projection but focused on returning data efficiently for a particular query, often joining data from multiple aggregates.

### Creating a read model

1. Open a module and go to **Read Models**
2. Click **New**
3. Configure and save

### Configuration

| Field | Description |
|---|---|
| **Name** | Read model name |
| **Fields** | Fields exposed by this read model |
| **Indexed fields** | Fields with database indexes for fast lookups |
| **Consistency level** | `STRONG` (synchronous) or `EVENTUAL` (asynchronous) |
| **Max staleness** | Maximum allowed lag for eventual consistency |

### When to use a Read Model vs a Projection

| | Projection | Read Model |
|---|---|---|
| Primary driver | Events | Query requirements |
| Update mechanism | Event consumption | Event consumption or direct writes |
| Scope | Tracks state over time | Optimised for a specific query |
| Joins | Single aggregate | Can join multiple aggregates |

## Next steps

- Set up [Domain Events](/manual/domain-events/) to feed your projections
- Configure [Subscriptions](/manual/subscriptions/) to consume external events
