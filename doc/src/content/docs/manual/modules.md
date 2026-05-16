---
title: Modules
description: Bounded contexts in Modux
---

A **Module** is a bounded context within a service. It groups related aggregates, events, and other domain concepts that belong to the same business domain area.

## Creating a module

1. Open a service and go to **Modules**
2. Click **New**
3. Give it a name (e.g. `bookings`, `payments`, `inventory`)
4. Save

## Configuration

| Field | Description |
|---|---|
| **Name** | Module name — used as a Java sub-package |
| **BFF** | Enable Backend-for-Frontend integration for this module |
| **ACL** | Enable Anti-Corruption Layer for external system integration |
| **Integration handlers** | Define how this module integrates with external bounded contexts |

## What goes inside a module

A module can contain:

- [Aggregates](/manual/aggregates/) — DDD aggregate roots
- [Domain Events](/manual/domain-events/) — events emitted by aggregates
- [Sagas](/manual/sagas/) — multi-step workflows
- [Projections](/manual/projections/) — event-driven read models
- [Read Models](/manual/projections/#read-models) — denormalized query views
- [Gateways](/manual/gateways/) — external service calls
- [Subscriptions](/manual/subscriptions/) — message handlers
- [Scheduled Triggers](/manual/scheduled-triggers/) — cron tasks
- [Roles](/manual/roles/) — RBAC definitions

## Generated code structure

Each module maps to a Java package:

```
com.example.booking.
├── bookings/          ← module package
│   ├── domain/
│   ├── application/
│   └── infra/
```

## Next steps

Add [Aggregates](/manual/aggregates/) to your module.
