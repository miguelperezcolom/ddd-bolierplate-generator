---
title: Architecture Patterns
description: DDD and integration patterns supported by Modux
---

This page describes the architecture patterns Modux supports and how they map to generated code.

## Domain-Driven Design (DDD)

### Aggregate

The aggregate is the central DDD building block. Modux enforces:

- A single **aggregate root** per aggregate (the only entry point for changes)
- All entities and value objects accessed only through their root
- One **repository per aggregate** — no cross-aggregate queries on the write side
- Domain logic encapsulated inside the aggregate class, not in services

### Value Objects

Value objects replace primitive types in the domain model. Modux generates a record class for each value object:

```java
public record BookingId(UUID value) {}
public record Email(String value) {
    public Email { Objects.requireNonNull(value); }
}
```

This eliminates primitive obsession and makes method signatures self-documenting.

### Domain Events

Events are immutable records emitted by aggregates when state changes. They are:

- Named in past tense (`BookingConfirmed`, not `ConfirmBooking`)
- Published to Kafka after the transaction commits
- Consumed by projections and sagas in the same module; consumed across bounded contexts via subscriptions (when promoted to integration events)

---

## CQRS (Command Query Responsibility Segregation)

Modux enforces a soft CQRS split:

| Side | Components | Database access |
|---|---|---|
| **Write** | Use cases, aggregate root, repository | Through the domain model |
| **Read** | Query services, DTOs, rows | Direct SQL / JPA queries |

The write and read sides share the same database by default, but can be separated if needed.

---

## Event Sourcing

When enabled on an aggregate:

- State is stored as a sequence of domain events, not as current state
- The aggregate is rebuilt by replaying events
- Snapshots are taken every N events to speed up rebuilding

```
CommandHandler
  → Load aggregate (replay events)
  → Apply command
  → Emit new event
  → Persist event
  → Publish to Kafka
```

Configure per aggregate:

```yaml
persistenceType: EVENT_SOURCED
snapshotFrequency: 50
```

---

## Saga Pattern

Sagas coordinate long-running business processes across multiple aggregates or services.

### Choreography

Each service reacts to events and emits new ones. No central coordinator.

```
BookingRequested →
  InventoryService: ReserveInventory →
    InventoryReserved →
      PaymentService: ChargePayment →
        PaymentCharged →
          BookingService: ConfirmBooking
```

### Orchestration

A central saga component sends commands and waits for results.

```
BookingConfirmationSaga:
  1. send ReserveInventory → wait for InventoryReserved
  2. send ChargePayment → wait for PaymentCharged
  3. send ConfirmBooking → done
  
  On failure at step N: execute compensations N, N-1, ... 1
```

---

## Outbox Pattern

Ensures domain events are reliably published to Kafka without distributed transactions.

```
Transaction:
  1. Update aggregate in DB
  2. Write event to outbox table (same DB, same transaction)
  
Background process:
  3. Read from outbox table
  4. Publish to Kafka
  5. Delete from outbox table
```

Enable per service:

```yaml
outboxPattern: true
```

---

## Anti-Corruption Layer (ACL)

Protects your domain model from external system models. When consuming events or calling APIs from external systems, the ACL translates between their model and yours.

```
External event → ACL → Domain event
Domain command → ACL → External API call
```

Configured per module. Modux generates a translation layer with a `ModelMapping` for each ACL.

---

## Context Map relationships

Defines how bounded contexts relate to each other:

| Relationship | Description |
|---|---|
| `SHARED_KERNEL` | Two contexts share a subset of the domain model |
| `CUSTOMER_SUPPLIER` | Upstream publishes, downstream conforms (with negotiation) |
| `CONFORMIST` | Downstream conforms to upstream with no negotiation |
| `OPEN_HOST_SERVICE` | Upstream publishes a formal protocol for multiple consumers |
| `PUBLISHED_LANGUAGE` | A well-defined exchange language (e.g. event schema) |
| `ANTI_CORRUPTION_LAYER` | Translation layer between two different models |
| `SEPARATE_WAYS` | No integration — contexts evolve independently |

---

## Resilience patterns

### Circuit Breaker

Applied on gateway calls. If the downstream service fails repeatedly, the circuit opens and calls fail fast without waiting for a timeout.

### Retry with backoff

Configurable on subscriptions, gateway calls, and saga steps. Supports fixed and exponential backoff.

### Idempotency

Operations and subscriptions support idempotency keys. Duplicate requests are detected and ignored.

### Rate Limiting

Applied on use cases and gateway calls to protect downstream services from overload.
