---
title: Modules
description: Bounded contexts in Modux
---

A **Module** is a bounded context within a service. It groups related aggregates, events, and other domain concepts that belong to the same business subdomain.

## Creating a module

1. Open a service and go to **Domain Model → Modules**
2. Click **New**
3. Give it a name and save

## Configuration

### Basic fields

| Field | Description |
|---|---|
| **Name** | Module name — used as a Java sub-package |
| **Git repository** | Optional separate repository for this module (monorepo vs. multi-repo) |
| **Table name prefix** | Prefix applied to all JPA table names in this module (e.g. `bkg_`) |
| **Auto table name prefix** | Derive the prefix automatically from the module name |
| **Version** | Module version, independent of the service version |
| **LLM system prompt** | System prompt injected when using LLM-assisted generation for this module |

### Contents

A module groups references to all the domain artefacts that belong to it:

| Tab | What it contains |
|---|---|
| **Aggregates** | DDD aggregate roots |
| **Entities** | Shared entities not owned by a single aggregate |
| **Value Objects** | Shared value objects |
| **Use Cases** | Application-layer use cases |
| **Domain Events** | Events emitted by aggregates in this module |
| **Projections** | Event-driven projections |
| **Read Models** | Denormalized query views |
| **Subscriptions** | Message handlers |
| **Sagas** | Multi-step workflows with compensation |
| **Scheduled Triggers** | Cron-based tasks |

### BFF (Backend-for-Frontend)

Each BFF entry exposes a tailored API surface for a specific client type:

| Field | Description |
|---|---|
| **Name** | BFF name |
| **Client type** | Target client (e.g. `WEB`, `MOBILE`, `PARTNER`) |
| **Description** | Purpose of this BFF |
| **Base path** | URL prefix for this BFF's endpoints |
| **Auth required** | Whether requests must be authenticated |
| **Exposed use cases** | Use cases published through this BFF |
| **Exposed read models** | Read models published through this BFF |

### ACL (Anti-Corruption Layer)

Each ACL entry describes a translation boundary with an external system:

| Field | Description |
|---|---|
| **Name** | ACL name |
| **External system** | Name of the external system or bounded context |
| **Description** | What this ACL translates |
| **Direction** | `INBOUND` (external → this module) or `OUTBOUND` (this module → external) |
| **Gateway** | Gateway used for outbound communication |
| **Translated domain events** | Events whose meaning is translated across the boundary |
| **Translated use cases** | Use cases whose input/output is translated |

### Domain Policies

A domain policy links a triggering event to a use case — the module's way of expressing reactive business rules:

| Field | Description |
|---|---|
| **Name** | Policy name |
| **Triggering event** | Domain event that fires this policy |
| **Use case** | Use case invoked when the event is received |
| **Description** | Business rationale for the policy |

### Invariants

Module-level invariants express business rules that span multiple aggregates within the bounded context — rules that cannot be enforced by a single aggregate alone.

| Field | Description |
|---|---|
| **Name** | Invariant name |
| **Conditions** | One or more conditions that must all hold |

Each condition has:

| Field | Description |
|---|---|
| **Expression** | Boolean expression evaluated to check the rule |
| **Custom** | Whether this is a hand-coded condition (not expression-based) |
| **Description** | What the condition checks |
| **Error message** | Message shown when the condition is violated |

### BDD Tests

Executable acceptance scenarios for this module, written in Gherkin:

| Field | Description |
|---|---|
| **Feature** | Feature file name or group |
| **Name** | Scenario name |
| **Tags** | Gherkin tags (e.g. `@smoke`, `@regression`) |
| **Steps** | Given / When / Then steps |

## Generated code structure

Each module maps to a Java sub-package:

```
com.example.myservice.
└── bookings/              ← module package
    ├── domain/
    │   ├── aggregates/
    │   └── events/
    ├── application/
    │   ├── usecases/
    │   └── query/
    └── infra/
        ├── in/
        └── out/
```

## Next steps

Add [Aggregates](/manual/aggregates/) to your module.
