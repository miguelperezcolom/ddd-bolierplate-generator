---
title: User Manual Overview
description: Overview of the Modux domain model and how to use the generator
---

## The Modux domain model

Modux organises your system as a hierarchy of concepts:

```
Project
└── Service (microservice)
    └── Module (bounded context)
        ├── Aggregate
        │   ├── Entity
        │   ├── Value Object
        │   ├── Operation
        │   └── Domain Event
        ├── Saga
        ├── Projection / Read Model
        ├── Subscription
        ├── Scheduled Trigger
        ├── Role
        └── Infrastructure adapters
            ├── Outbound: Gateway
            └── Inbound (UI): Page, Component, UI Adapter, UI Shell
```

In hexagonal architecture the UI is an **inbound (driving) adapter** — it sits in the infrastructure layer alongside outbound adapters like Gateways. Pages, Components, UI Adapters and UI Shells are simply the inbound side of that same adapter layer.

Each level has its own configuration and generates its own code artefacts.

## Navigating the UI

The Modux UI is organised into six sections, accessible from the left sidebar:

| Section | Contents |
|---|---|
| **Organization** | Projects, Services |
| **Domain Model** | Modules, Aggregates, Entities, Value Objects |
| **Behaviour** | Operations, Use Cases |
| **Async** | Domain Events, Sagas, Projections, Subscriptions, Scheduled Triggers |
| **Interfaces** | Gateways (outbound), Read Models, Pages, Components, UI Adapters, UI Shells (inbound) |
| **Security** | Roles |

## Typical workflow

1. Create a **Project** with your package name and output path
2. Add one or more **Services** (one per microservice)
3. Add **Modules** (bounded contexts) to each service
4. Define **Aggregates** with their fields, operations, and events
5. Add **Sagas**, **Projections**, and **Gateways** as needed
6. Click **Generate Code** to produce the full Spring Boot project
7. Implement the generated interfaces with your custom business logic
8. Re-run generation at any time — custom code files are not overwritten

## Pages in this manual

- [Projects](/manual/projects/) — top-level project settings
- [Services](/manual/services/) — microservice configuration
- [Modules](/manual/modules/) — bounded context settings
- [Aggregates](/manual/aggregates/) — the core DDD building block
- [Entities & Value Objects](/manual/entities-and-value-objects/) — domain building blocks
- [Operations](/manual/operations/) — commands and queries
- [Domain Events](/manual/domain-events/) — events emitted by aggregates
- [Sagas](/manual/sagas/) — multi-step workflows with compensation
- [Projections & Read Models](/manual/projections/) — event-driven read models
- [Gateways](/manual/gateways/) — external service calls
- [Subscriptions](/manual/subscriptions/) — message handlers
- [Scheduled Triggers](/manual/scheduled-triggers/) — cron tasks
- [Roles & Security](/manual/roles/) — RBAC definitions
- [Pages](/manual/pages/) — UI screens (CRUD, form, dashboard, wizard)
- [Components](/manual/components/) — visual data blocks for dashboards
- [UI Adapters](/manual/ui-adapters/) — navigation structure per service
- [UI Shells](/manual/ui-shells/) — frontend deployment targets
- [Generating Code](/manual/generating-code/) — how to run the generator
