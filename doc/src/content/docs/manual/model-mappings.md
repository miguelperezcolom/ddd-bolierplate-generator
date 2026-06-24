---
title: Model Mappings
description: Defining transformations between models in Modux
---

A **Model Mapping** defines how to transform data from one model to another. It is used in use case steps of type `ApplyModelMapping` to convert an input model into a different output model — for example, translating an external DTO into a domain command, or a domain aggregate into a response DTO.

## Creating a model mapping

1. Open **Behaviour → Model Mappings**
2. Click **New**
3. Select the source and target models and add field rules

## Configuration

### Basic fields

| Field | Description |
|---|---|
| **Name** | Mapping name (e.g. `BookingRequestToCreateBookingCommand`) |
| **Source model** | The model to transform from |
| **Target model** | The model to transform into |
| **Has custom part** | Whether part of the mapping requires hand-written logic (generates a `{Mapping}CustomMapping` two-zone hook you implement in the `{service}-custom` module) |

### Rules

Each rule maps one field from the source model to one field in the target model:

| Field | Description |
|---|---|
| **Source field** | Field name in the source model |
| **Target field** | Field name in the target model |
| **Expressions** | One or more conditional expressions (see below) |

When no expressions are defined for a rule, Modux generates a direct assignment (`target.field = source.field`).

### Expressions

Expressions allow conditional or computed mappings within a rule:

| Field | Description |
|---|---|
| **Input expression** | Condition on the source value (e.g. `source.status == 'ACTIVE'`). Leave empty to always apply. |
| **Output expression** | Value expression written to the target field (e.g. `source.firstName + ' ' + source.lastName`) |

Multiple expressions on the same rule are evaluated in order; the first whose input expression matches wins.

## What gets generated

A model mapping is generated when it is referenced by a use-case or saga `ApplyModelMapping` step. For each one Modux generates:

- `application/mappers/dto/{SourceModel}.java` and `{TargetModel}.java` — self-contained record DTOs derived from the model fields, so the mapper compiles regardless of how those models are represented elsewhere
- `application/mappers/{Name}Mapper.java` — a `@Component` with one `map(Source source)` method that builds the target from the declarative field rules
- If **Has custom part** is enabled, a [two-zone hook](/manual/generating-code/#generated-code-vs-your-code-two-zones): a generated `{Name}CustomMapping` interface (`apply(source, mapped)`) that the mapper calls after the declarative rules, plus a write-once `Default{Name}CustomMapping` in the `{service}-custom` module for you to fill in

## Usage in use cases

Reference a model mapping from a use case step:

1. Add a step of type **ApplyModelMapping**
2. Select the mapping in the **Model mapping** field

The generated use case will instantiate the mapper and invoke it inline as part of the step sequence.
