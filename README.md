# Modux

**Modux** is a model-driven code generation framework for Domain-Driven Design (DDD) systems. Define your domain model using YAML files and let Modux generate the full Java boilerplate — aggregates, use cases, repositories, UI, and database migrations — so you can focus on business logic.

**Documentation:** [modux.mateu.io](https://modux.mateu.io)

---

## What it does

You write a YAML specification describing your domain (aggregates, entities, value objects, events, operations…) and Modux generates a production-ready Spring Boot application with:

- Domain layer: aggregate roots, entities, value objects, domain events
- Application layer: use cases (create/update/delete), query services, DTOs
- Infrastructure layer: JPA entities, Spring Data repositories, DB implementations
- UI layer: auto-generated CRUD pages (Vaadin / Mateu UIDL)
- Database migrations: DDL files, foreign key scripts

The generated code follows **Hexagonal Architecture** (ports & adapters) with clear separation between domain, application, and infrastructure.

---

## Architecture patterns supported

- **DDD** — Aggregates, entities, value objects, domain events, invariants
- **CQRS** — Separate command handlers and query services
- **Event Sourcing** — Optional per aggregate, with snapshot support
- **Saga Pattern** — Choreography/orchestration with compensations and retries
- **Projections & Read Models** — Event-driven denormalized views
- **Outbox Pattern** — Transactional outboxing for reliable messaging
- **RBAC** — Role-based access control definitions
- **Gateway** — External service call definitions with circuit breakers and rate limiting
- **Scheduled Triggers** — Cron-based task definitions

---

## Tech stack

| Layer | Technology |
|---|---|
| Language | Java 21 |
| Build | Maven |
| Framework | Spring Boot 4.x |
| Messaging | Apache Kafka (Spring Cloud Stream) |
| Persistence | Spring Data JPA / Hibernate (PostgreSQL, H2) |
| UI | Vaadin + Mateu UIDL |
| Templates | Freemarker |
| Code formatting | Google Java Format |
| Database migrations | Flyway / Liquibase (configurable) |

---

## Project modules

| Module | Description |
|---|---|
| `model-driven-generator` | Main Spring Boot application with UI for defining specs and generating code |
| `plugin` | Maven plugin skeleton (experimental) |
| `sample/poc-sagas` | Example application demonstrating sagas and Kafka integration |
| `io` | Shared UIDL field type definitions |

---

## Domain model overview

A **Project** contains one or more **Services** (microservices), each with one or more **Modules** (bounded contexts). Each module contains:

- **Aggregates** — DDD aggregate roots with fields, operations, invariants, and events
- **Entities** — Domain entities belonging to an aggregate
- **Value Objects** — Immutable typed wrappers (e.g. `BookingId`, `Email`)
- **Domain Events** — Events emitted by aggregates
- **Use Cases** — Application services
- **Sagas** — Multi-step workflows with compensation logic
- **Projections** — Read models built from domain events
- **Gateways** — External service definitions
- **Subscriptions** — Message handlers with filtering and retry policies
- **Scheduled Triggers** — Cron-based tasks
- **Roles** — RBAC role definitions
- **Context Map Relations** — Relationships between bounded contexts (Shared Kernel, ACL, Open Host Service, etc.)

---

## Generated code structure

```
src/main/java/{package}
├── domain/
│   └── aggregates/{aggregate}/
│       ├── {Aggregate}.java          # Aggregate root
│       ├── vo/
│       │   ├── {Aggregate}Id.java
│       │   └── {Field}.java          # Typed value objects
│       └── events/
├── application/
│   ├── usecases/                     # Create / Update / Delete use cases
│   ├── query/                        # Query services and DTOs
│   └── out/                          # Repository interfaces
└── infra/
    ├── in/ui/                        # CRUD pages and adapters
    └── out/persistence/              # JPA entities, Spring Data repos
src/main/resources/
└── application.yaml
pom.xml
```

---

## Getting started

### 1. Run the generator

```bash
cd model-driven-generator
mvn spring-boot:run
```

Open `http://localhost:8080` in your browser.

### 2. Define your domain

Use the UI to create:

1. **Project** — name, package, output path
2. **Services** — one per microservice
3. **Modules** — bounded contexts within each service
4. **Aggregates** — domain objects with fields, operations, and events

### 3. Generate code

Click **Generate Code**. The project is written to the configured output directory, ready to build and run.

### 4. Add your business logic

The generated code is designed to be extended:

- Implement generated interfaces in separate Maven modules
- Fill in abstract methods
- Provide Spring beans for custom logic
- The generator can be run again without overwriting your custom code (configurable per file)

---

## Roadmap

- Maven plugin for CI/CD integration
- Multi-framework support: Micronaut, Jakarta CDI
- Infrastructure-as-code templates: Terraform, Kubernetes, Docker Compose
- CI/CD pipeline templates (GitHub Actions)
- Code quality templates: Jacoco, Spotbugs, Checkstyle, SonarQube
- Project template repositories (one-click bootstrap)
- YAML schema with IDE autocomplete support

---

## References

- [YAML Schema for IDE autocomplete](https://developers.redhat.com/blog/2020/11/25/how-to-configure-yaml-schema-to-make-editing-files-easier)
- [Maven Plugin development](https://www.baeldung.com/maven-plugin)
