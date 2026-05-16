---
title: Aggregates
description: Defining DDD aggregate roots in Modux
---

An **Aggregate** is the central DDD building block in Modux. It represents an aggregate root — a cluster of domain objects that are treated as a single unit for the purposes of data changes.

## Creating an aggregate

1. Open a module and go to **Aggregates**
2. Click **New**
3. Configure the aggregate and save

## Configuration

### Identity

| Field | Description |
|---|---|
| **Name** | Aggregate name (PascalCase, e.g. `Booking`) |
| **ID type** | Type of the aggregate identifier: `UUID`, `ULID`, `Long`, `String` |

### Fields

Fields define the data held by the aggregate. Each field has:

| Property | Description |
|---|---|
| **Name** | Field name (camelCase) |
| **Type** | Java type: `String`, `Integer`, `Long`, `Boolean`, `LocalDate`, `LocalDateTime`, `BigDecimal`, `Enum`, `ValueObject`, or another aggregate ID |
| **Required** | Whether the field is mandatory |
| **Constraints** | Validation rules (e.g. min length, max length, regex, range) |

### Persistence

| Field | Description |
|---|---|
| **Persistence type** | `JPA` (default) or `EVENT_SOURCED` |
| **Optimistic locking** | Enable `@Version` field for optimistic concurrency control |
| **Event sourcing** | Store state as a sequence of events instead of current state |
| **Snapshot frequency** | How often to take aggregate snapshots (for event-sourced aggregates) |
| **Schema name** | Custom database schema |
| **Table name** | Custom database table name |

### Operations

See [Operations](/manual/operations/) for details on defining commands and queries on an aggregate.

### Invariants

Invariants are business rules that must always hold for the aggregate. Define them as boolean expressions referencing the aggregate's fields. The generator will include these as guard assertions in the generated aggregate class.

### State machine

If your aggregate has a `status` or similar lifecycle field, you can define a state machine:

- **States** — list of valid states
- **Transitions** — allowed state changes (from → to)
- **Guards** — conditions that must hold for a transition to be allowed

## What gets generated

For each aggregate, Modux generates:

### Domain layer
- `{Aggregate}.java` — aggregate root class
- `vo/{Aggregate}Id.java` — strongly-typed ID value object
- `vo/{Field}.java` — value object for each field of type `ValueObject`
- `events/` — domain event classes

### Application layer
- `usecases/Create{Aggregate}UseCase.java`
- `usecases/Update{Aggregate}UseCase.java`
- `usecases/Delete{Aggregate}UseCase.java`
- `query/{Aggregate}QueryService.java`
- `query/{Aggregate}Dto.java`
- `query/{Aggregate}Row.java`
- `out/{Aggregate}Repository.java` (port interface)

### Infrastructure layer
- `infra/out/persistence/{Aggregate}Entity.java` — JPA entity
- `infra/out/persistence/{Aggregate}EntityRepository.java` — Spring Data repo
- `infra/out/persistence/{Aggregate}DBRepository.java` — port implementation
- `infra/out/persistence/{Aggregate}DBQueryService.java`

### UI layer
- `infra/in/ui/{Aggregate}CrudAdapter.java`
- `infra/in/ui/{Aggregate}CrudOrchestrator.java`
- `infra/in/ui/{Aggregate}ViewModel.java`
- `infra/in/ui/{Aggregate}IdOptionsSupplier.java`
- `infra/in/ui/{Aggregate}IdLabelSupplier.java`

## Example

A `Booking` aggregate with fields `reference`, `customer`, `startDate`, `endDate`, and a `status` enum generates all of the above artefacts, giving you a fully working CRUD application ready to customise.

## Next steps

- Add [Operations](/manual/operations/) for custom commands and queries
- Define [Domain Events](/manual/domain-events/) emitted by this aggregate
- Add [Entities & Value Objects](/manual/entities-and-value-objects/) for richer modelling
