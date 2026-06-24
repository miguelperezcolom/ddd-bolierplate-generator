---
title: Introduction
description: What is Modux and why use it
---

## What is Modux?

Modux is a **model-driven code generation framework** for building **enterprise information systems** in Java, using Domain-Driven Design (DDD). It targets the long-lived, business-critical systems made of several bounded contexts that must hold invariants, run business processes, and integrate with each other — not just forms over tables. Instead of writing the same structural boilerplate over and over, you describe your domain in a simple YAML specification and let Modux generate the code for you.

For *why* Modux ships the patterns it does — derived from what an enterprise system actually requires — see [Enterprise Information Systems](/getting-started/enterprise-systems/). For *where AI fits* — and why Modux uses it to author the model but not to generate production code — see [Spec-Driven Development](/getting-started/spec-driven-development/).

The generated code follows **Hexagonal Architecture** (also known as Ports & Adapters), with a clear separation between:

- **Domain layer** — aggregate roots, entities, value objects, domain events
- **Application layer** — use cases, query services, DTOs
- **Infrastructure layer** — outbound adapters (JPA persistence, messaging, external gateways) and inbound adapters (auto-generated UI pages, REST controllers)

## Why Modux?

Building a proper DDD application from scratch involves a lot of repetitive work: creating aggregate roots, wiring up repositories, writing use cases, setting up JPA entities, building CRUD interfaces... Modux automates all of that so you can focus on what actually matters: your business logic.

### What you write

A YAML file describing your domain:

```yaml
aggregate: Booking
fields:
  - name: reference
    type: String
  - name: customer
    type: String
  - name: startDate
    type: LocalDate
  - name: endDate
    type: LocalDate
  - name: status
    type: Enum
    values: [PENDING, CONFIRMED, CANCELLED]
```

### What Modux generates

- `Booking.java` — aggregate root with identity, fields, and business methods
- `BookingId.java`, `BookingName.java` — strongly-typed value objects
- `CreateBookingUseCase.java`, `UpdateBookingUseCase.java`, `DeleteBookingUseCase.java`
- `BookingRepository.java` — port interface
- `BookingEntity.java` — JPA entity
- `BookingEntityRepository.java` — Spring Data repository
- `BookingDBRepository.java` — repository implementation
- `BookingCrudAdapter.java` — UI adapter
- Plus DTOs, query services, and more

## What patterns does Modux support?

Modux implements the patterns an enterprise information system requires — DDD aggregates and invariants, CQRS, hexagonal ports & adapters, the outbox pattern, sagas, projections, gateways, RBAC, scheduled triggers and more. Rather than list them flat, the [Enterprise Information Systems](/getting-started/enterprise-systems/) page derives each pattern from the requirement it answers and links to its building block.

## Tech stack

Generated applications use:

- **Java 21** + **Spring Boot 4**
- **Spring Data JPA** + **Hibernate** (PostgreSQL / H2)
- **Spring Cloud Stream** + **Apache Kafka**
- **Flyway** or **Liquibase** for migrations
- **Vaadin / Mateu UIDL** for UI

## Next steps

- [Install Modux](/getting-started/installation/) and run the generator
- Follow the [Quick Start](/getting-started/quick-start/) to generate your first project
- Read the [User Manual](/manual/overview/) for full documentation
