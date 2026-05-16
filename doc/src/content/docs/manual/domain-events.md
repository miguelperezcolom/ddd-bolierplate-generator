---
title: Domain Events
description: Events emitted by aggregates in Modux
---

**Domain Events** represent something that happened in the domain. They are facts — immutable records of a state change that already occurred. Other parts of the system (projections, sagas, subscriptions) react to these events.

## Creating a domain event

1. Open a module and go to **Domain Events** (or define events directly on an aggregate's operations)
2. Click **New**
3. Configure and save

## Configuration

| Field | Description |
|---|---|
| **Name** | Event name in past tense (e.g. `BookingConfirmed`, `PaymentFailed`) |
| **Aggregate** | The aggregate that emits this event |
| **Fields** | Data captured in the event payload |
| **Version** | Event schema version (used for evolution) |

### Fields

Event fields capture the relevant state at the time the event occurred. Common fields include:

- The aggregate ID
- Key attributes that changed
- Timestamp (usually added automatically)
- Actor or user who triggered the change

## What gets generated

For a `BookingConfirmed` event:

```java
public record BookingConfirmed(
    BookingId bookingId,
    String reference,
    String customer,
    Instant occurredOn
) {}
```

Events are plain Java records — immutable and serialisable.

## How events flow

```
Aggregate operation
    → domain event emitted
        → published to Kafka topic
            → consumed by Projections, Sagas, Subscriptions
```

If the **Outbox Pattern** is enabled on the service, events are written to an outbox table in the same transaction as the aggregate state change, and then published to Kafka by a background process. This guarantees at-least-once delivery without distributed transactions.

## Event versioning

When you change an event's structure, increment the **version** field. Modux will generate separate classes for each version, allowing consumers to handle old and new event formats during migration.

## Next steps

- Use events to trigger [Sagas](/manual/sagas/)
- Build [Projections](/manual/projections/) that listen to events
- Configure [Subscriptions](/manual/subscriptions/) to react to events in other services
