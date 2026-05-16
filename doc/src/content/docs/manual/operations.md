---
title: Operations
description: Commands and queries on aggregates
---

**Operations** define the commands and queries that can be performed on an aggregate. They are the primary way to express the behaviour of your domain.

## Types of operations

| Type | Description |
|---|---|
| `CREATE` | Creates a new instance of the aggregate |
| `UPDATE` | Modifies an existing instance |
| `DELETE` | Removes an instance |
| `CUSTOM` | A custom command with domain-specific logic |
| `QUERY` | A read-only operation that returns data |

## Creating an operation

1. Open an aggregate and go to **Operations**
2. Click **New**
3. Configure and save

## Configuration

### Basic

| Field | Description |
|---|---|
| **Name** | Operation name (camelCase, e.g. `confirmBooking`) |
| **Type** | `CREATE`, `UPDATE`, `DELETE`, `CUSTOM`, or `QUERY` |
| **Description** | Human-readable description of what this operation does |

### Input model

Define the fields that the caller must provide:

| Property | Description |
|---|---|
| **Fields** | Input fields with name, type, and constraints |
| **Validations** | Cross-field validation rules |

### Output model

For `QUERY` operations, define what the operation returns:

| Property | Description |
|---|---|
| **Fields** | Output fields |
| **Pagination** | Enable paginated results (page number, page size, total count) |

### Preconditions

Business rules that must hold before the operation can execute. Expressed as boolean conditions referencing the aggregate's current state. If a precondition fails, the operation throws a domain exception.

Example: a `confirmBooking` operation might require `status == PENDING`.

### Side effects

What happens after the operation executes:

| Setting | Description |
|---|---|
| **Field sets** | Which aggregate fields are updated and how |
| **Events emitted** | Domain events fired as a result of this operation |

### Non-functional

| Setting | Description |
|---|---|
| **Idempotency key** | Field used to detect duplicate requests |
| **Rate limiting** | Max calls per time window |
| **Transaction** | Transaction propagation and isolation level |

## What gets generated

For a `CUSTOM` operation named `confirmBooking` on a `Booking` aggregate:

- `ConfirmBookingCommand.java` — command DTO with input fields
- `ConfirmBookingUseCase.java` — use case interface (port)
- `ConfirmBookingUseCaseImpl.java` — default implementation stub

For `QUERY` operations:

- `{OperationName}Query.java` — query parameters DTO
- `{OperationName}Result.java` — result DTO
- Query method on `{Aggregate}QueryService`

## Example

```
Operation: confirmBooking
Type: CUSTOM
Preconditions:
  - status == PENDING
Side effects:
  - set status = CONFIRMED
  - emit BookingConfirmed event
```

This generates a use case that validates the precondition, updates the aggregate, and publishes the event — all in a single transactional boundary.
