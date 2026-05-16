---
title: Subscriptions
description: Message handlers for consuming external events
---

A **Subscription** defines how your service consumes messages from a Kafka topic. This is typically used to react to domain events published by other services.

## Creating a subscription

1. Open a module and go to **Subscriptions**
2. Click **New**
3. Configure and save

## Configuration

### Basic

| Field | Description |
|---|---|
| **Name** | Subscription name (PascalCase) |
| **Topic** | Kafka topic to consume from |
| **Consumer group** | Kafka consumer group ID |
| **Message type** | Expected message/event type |

### Filtering

| Field | Description |
|---|---|
| **Filter expression** | Boolean expression to process only matching messages (e.g. `event.type == 'PaymentCharged'`) |

### Batching

| Field | Description |
|---|---|
| **Batch processing** | Enable batch consumption for higher throughput |
| **Batch size** | Max number of messages per batch |
| **Batch timeout** | Max time to wait before processing a partial batch |

### Resilience

| Field | Description |
|---|---|
| **Retry policy** | Max retries and backoff strategy |
| **Dead-letter topic** | Topic where unprocessable messages are sent |
| **Offset reset** | `EARLIEST` (replay from beginning) or `LATEST` (only new messages) |

## What gets generated

For a `PaymentChargedSubscription`:

- `PaymentChargedSubscription.java` — Spring Cloud Stream consumer
- Message handler method with deserialization
- Retry and dead-letter configuration
- Filter logic (if configured)

## Connecting to domain logic

The generated subscription class calls a use case or domain service to handle each message. Wire your custom handler:

```java
@Service
public class PaymentChargedHandler {
    public void handle(PaymentCharged event) {
        // update booking status, trigger saga step, etc.
    }
}
```

## Next steps

- Feed subscription events into [Projections](/manual/projections/)
- Use subscriptions as saga triggers in [Sagas](/manual/sagas/)
