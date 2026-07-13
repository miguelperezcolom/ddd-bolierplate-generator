---
title: Examples Catalog
description: The worked example models that ship with Modux, and what each one teaches
---

Every example is a complete, generatable model store. They double as the generator's own regression suite, so they are always up to date with the metamodel. Copy the one closest to your problem and evolve it — or point your AI agent at it as a reference of idiomatic modux.

| Example | Where | What it teaches |
|---|---|---|
| **Hotel** (default store) | `.dev/data/model-driven-store.yaml` | The reference domain: 11 bounded contexts across front office, housekeeping, billing — aggregates, projections, subscriptions, UI pages, RBAC. The store the UI opens by default. |
| **HLA booking** | `sample/hla-booking/model-driven-store.yaml` | An enterprise write-side modeled from a real high-level architecture: first-class **decisions (ADRs)** with traceability, external systems, strangler-fig legacy integration, orchestrated saga, outbox, BFF. Includes the generated HLA document. |
| **Hotel check-in** | `sample/hotel-checkin/` | A generated application wired end to end (docker-compose, shell + service) — what the output actually looks like running. |
| **E-commerce** | `model-driven-generator/src/test/resources/examples/ecommerce-store.yaml` | Order fulfillment: **saga with compensation** orchestrating external services through **gateways**, business rules, invariants, integration events, money fields. |
| **Support / helpdesk** | `model-driven-generator/src/test/resources/examples/support-store.yaml` | The read side hardened: projections with several handlers, paginated **query services**, read models, subscriptions **with actions**, scheduled triggers. |
| **Ledger** | `model-driven-generator/src/test/resources/examples/ledger-store.yaml` | An **event-sourced** aggregate: event store generation, appender, snapshots, Flyway event-log table. |

## How to open one

```bash
java -jar model-driven-generator.jar -Dmodux.model-file=sample/hla-booking/model-driven-store.yaml
```

or headless:

```bash
java -jar model-driven-generator.jar --modux.lint --modux.model-file=<store>   # validate
java -jar model-driven-generator.jar --modux.generate=<projectId> --modux.model-file=<store>
```

## Which one to start from

- Building a **transactional core** (reservations, orders, accounts)? Start from **HLA booking** — it shows decisions-first modeling and legacy coexistence.
- Building **screens over data** with some workflow? Start from the **hotel** store.
- Read-heavy dashboards/queries? **Support**.
- Money movements with audit trail? **Ledger** (event sourcing).
- Talking to third parties with failure handling? **E-commerce** (sagas + gateways).
