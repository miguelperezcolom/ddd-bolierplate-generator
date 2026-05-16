---
title: Sagas
description: Multi-step workflows with compensation in Modux
---

A **Saga** coordinates a long-running business process that spans multiple aggregates or services. When a step fails, the saga executes compensation actions to undo previous steps and maintain consistency.

## Choreography vs Orchestration

Modux supports both saga styles:

| Style | How it works |
|---|---|
| **Choreography** | Each service reacts to events and emits new events. No central coordinator. |
| **Orchestration** | A central saga orchestrator sends commands to services and waits for replies. |

## Creating a saga

1. Open a module and go to **Sagas**
2. Click **New**
3. Configure steps and save

## Configuration

### Basic

| Field | Description |
|---|---|
| **Name** | Saga name (PascalCase, e.g. `BookingConfirmationSaga`) |
| **Style** | `CHOREOGRAPHY` or `ORCHESTRATION` |
| **Trigger event** | The domain event that starts this saga |
| **Timeout** | Maximum duration for the entire saga (e.g. `PT1H`) |

### Steps

Each step in a saga has:

| Field | Description |
|---|---|
| **Name** | Step name |
| **Command** | The operation/use case to execute |
| **On success** | Event or transition to the next step |
| **On failure** | Compensation action to execute |
| **Retry policy** | Max retries, backoff strategy |
| **Timeout** | Max duration for this individual step |

### Compensation

Each step can define a compensation action that runs if the step (or a later step) fails:

| Field | Description |
|---|---|
| **Compensation command** | The operation to undo this step's effect |
| **Dead-letter queue** | Queue for unresolvable failures |

### Resilience

| Field | Description |
|---|---|
| **Retry policy** | Max retries and backoff strategy (fixed, exponential) |
| **Dead-letter queue** | Where to send messages when retries are exhausted |
| **Idempotency** | Ensure each step executes exactly once |

## Example: Booking confirmation saga

```
Trigger: BookingRequested

Step 1: ReserveInventory
  → success: InventoryReserved
  → failure: compensation = ReleaseInventory

Step 2: ChargePayment
  → success: PaymentCharged
  → failure: compensation = RefundPayment + ReleaseInventory

Step 3: ConfirmBooking
  → success: BookingConfirmed
  → failure: compensation = RefundPayment + ReleaseInventory
```

If payment fails, the saga automatically releases the inventory reservation and emits a `BookingFailed` event.

## What gets generated

For a `BookingConfirmationSaga`:

- `BookingConfirmationSaga.java` — saga orchestrator/state machine
- State machine transitions and compensation handlers
- Kafka message handlers for each step
- Retry and dead-letter configuration

## Next steps

- Set up [Domain Events](/manual/domain-events/) that trigger sagas
- Configure [Subscriptions](/manual/subscriptions/) for external service integration
