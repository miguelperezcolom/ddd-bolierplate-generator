---
title: Business Rules
description: Defining declarative business rules for a rules engine in Modux
---

A **Business Rule** defines a declarative rule in `when → then` form for evaluation by a rules engine (Drools, Easy Rules, RuleBook, etc.). Rules are evaluated against a fact model and fire their actions when all conditions hold.

## Creating a business rule

1. Open **Behaviour → Business Rules**
2. Click **New**
3. Select the fact model, set priority and group, then add conditions and actions

## Configuration

### Basic fields

| Field | Description |
|---|---|
| **Name** | Rule name (e.g. `ApplyEarlyBirdDiscount`) |
| **Description** | What this rule does |
| **Model** | The fact model the rule is evaluated against |
| **Priority** | Salience / execution order (higher fires first) |
| **Enabled** | Whether the rule is active |
| **Rule group** | Agenda group for grouping and controlling which rules fire together |

### Conditions (when)

Each condition is a boolean expression that must be true for the rule to fire. All conditions are ANDed together.

| Field | Description |
|---|---|
| **Expression** | Boolean expression evaluated against the fact (e.g. `booking.daysInAdvance > 30`) |
| **Description** | Human-readable explanation of what the condition checks |

### Actions (then)

Actions are executed in order when all conditions pass.

| Field | Description |
|---|---|
| **Type** | What the action does (see below) |
| **Description** | Human-readable explanation of the action |

#### Action types

| Type | Description | Extra fields |
|---|---|---|
| **SET_FIELD_VALUE** | Write a computed value to a field on the fact | **Field id** — target field name; **Expression** — value expression (e.g. `booking.basePrice * 0.8`) |
| **CALL_USE_CASE** | Invoke a use case as a side effect | **Use case** — the use case to invoke |
| **PUBLISH_EVENT** | Publish a domain event | **Domain event** — the event to publish |
| **CUSTOM** | Hand-written action (planned: a custom hook you implement) | — |

## What gets generated

:::caution[Not yet implemented]
Business rules can be **defined** in the model today (conditions, actions, fact bindings) and are stored in your spec, but Modux does **not yet emit code** for them — there are no rules-engine artifacts in a generated project yet. The shape below is the intended target.
:::

The planned output, per business rule:

- A rule definition file in the format expected by the configured rules engine (e.g. a `.drl` file for Drools, a `Rule` bean for Easy Rules)
- For `CUSTOM` actions: a hook in the `{service}-custom` module (matching the [two-zone model](/manual/generating-code/#generated-code-vs-your-code-two-zones)), left for you to implement
- A Spring `@Configuration` class that registers all rules into the rules engine session/registry

## Usage in the domain

Business rules are evaluated explicitly — they do not fire automatically. You trigger evaluation from a use case step (`Custom` step) or from an aggregate operation, passing the fact model to the rules engine session.
