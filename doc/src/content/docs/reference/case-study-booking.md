---
title: "Case Study: a CRS, End to End"
description: A real hotel reservation system generated from a 2,777-line model — what you write, what you get, and what the exercise taught the generator
---

The most demanding test a generator can face is a real system taken all the way to *running*.
This case study did exactly that: a **CRS** (central reservation system) for a hotel chain,
strangler-fig style over a legacy PMS — six bounded contexts, an async purchase workflow with
compensation against the legacy, CDC feeding a CQRS read side, a waiting queue with manual
management, and a functional spec with five end-to-end flows that had to pass against the
deployed system.

The same spec had already been implemented by hand three times (a modular monolith with
vanilla, React and Mateu UIs), so the case had something rare: a **behavior oracle** to verify
against, and a baseline to compare with.

## The shape of the work

```
model (YAML) ──▶ mvn modux:generate ──▶ 6 microservices ──▶ fill the *-custom intents ──▶ docker compose up
     ▲                                                              │
     └────────────── every gap found goes back into the model ◀─────┘
```

1. **The model** (`model-driven-store.yaml`, 2,777 lines) formalizes the spec: 7 decisions
   (ADRs), 6 services/bounded contexts with their context map, 12 aggregates (with lifecycles
   and invariants), 13 domain events — the cross-context ones flagged
   `publishAsIntegrationEvent` with their topics —, 26 use cases with typed steps and
   `intent` texts, 8 Kafka subscriptions, 3 gateways, roles and 2 processes.
2. **Generation** via the Maven plugin emits the six services (generated / custom / app
   modules), each with hexagonal domain code, Kafka consumers *and* publishers with their
   bindings, REST borders, Mateu UI (operation pages with inline-editable collections, CRUDs
   with row actions), an MCP server per service, security with login, the idempotency inbox,
   Flyway migrations, and the deployment (docker-compose with Postgres and Kafka, Dockerfiles,
   k8s, Terraform).
3. **The custom modules** received the business logic the model cannot express — written from
   the `intent` of each generated hook (the role `modux:ai-complete` automates). 26 classes,
   1,576 lines: the sale steps, the recording workflow with compensation, the purchase
   signature, the legacy simulator, folios.
4. **Verification**: the five spec flows passed against the containerized system — sale
   confirmed synchronously in ~0.7s (the gateway polls the purchase confirmation), no-quota
   sale queued and relaunched from the listing, cascade cancellation restoring quota in the
   legacy, CDC forcing a confirmed booking to on-request, payments on folios.

## What you write vs what you get

| You write | Lines |
|---|---|
| The model (YAML) | **2,777** |
| Implemented business hooks (26 custom classes) | **1,576** |

| You get, generated | Lines |
|---|---|
| Java for the 6 microservices (domain, use cases, Kafka, REST, Mateu UI, MCP, security, inbox) | **15,670** |
| Tests (unit + BDD + e2e per service) | **4,999** |
| Flyway migrations | **196** |
| docker-compose, Dockerfiles, k8s, Terraform | **543** |

Roughly **4,400 written lines — only 1,576 of them code — for ~21,400 generated**, plus the
whole deployment story. The counterweight is honest too: the coupling is to the *generator's
metamodel*. What it cannot express must either go into a custom hook — behind generated
interfaces (`*Steps`, `*Operation`, `*Invariants`) that regeneration never touches — or become
a metamodel feature.

## What the case drove into Modux

That last point is the real yield. Everything the CRS needed and the metamodel lacked became a
generator feature, shipped with tests, that every future model gets for free:

- Domain events flagged `publishAsIntegrationEvent` generate the payload record, the publisher
  port **and its Kafka implementation**, plus the consumer bindings
  (`spring.cloud.function.definition`) — producers and consumers actually wired.
- Use cases gained **results** (`outputModelId` → a generated `Result`) and custom steps now
  receive the command.
- `exposedAsUi` generates the operation page — including **inline-editable grids** for
  `array + modelId` fields — and `exposedAsMcp` generates the per-service **MCP server**.
- Model roles generate real **login** (form + HTTP Basic) instead of a permit-all scaffold.
- `rowActionForAggregateId` turns a use case into a **selection action on a CRUD listing**
  (the CRS waiting queue is exactly that).
- Idempotent subscriptions get a generated **inbox** (message-hash dedup), and aggregate
  domain events (`AggregateRoot.send`) surface as Spring events on save.
- Deployment fixes discovered only by running it all: Postgres init scripts, runtime-only
  Docker images, dual-listener Kafka, per-environment gateway base URLs.

The first app pays for the metamodel's gaps; the second one inherits them solved.

## Token economics: measured, not estimated

The whole case was built by an AI agent, and the same spec was **also implemented directly**
by the same agent in the same repository (a modular monolith with a handwritten UI). That
gives something unusual: the token bill of both paths, read straight from the session logs.
Method: output tokens per API call, each message attributed by the files and topics it touched
— so the tokens spent **improving the generator itself** (a one-time framework investment)
are separated from the tokens spent **building the app** (model, hooks, verification), which
is the fair per-app figure.

| Path | Agent output tokens | Delivered artifact | Output tokens per delivered line |
|---|---|---|---|
| Direct: the agent writes the system (monolith + one UI, MCP, simulator, tests) — *measured* | ~192k | ~7,400 lines | **~26** |
| Modux, app work only: authoring + enriching the model, implementing the hooks, verifying the flows against the deployed system — *measured* | ~275k | ~26,400 lines (6 microservices, tests, migrations, infra) | **~10** |
| Direct, **same artifact**: the six-microservice system written by the agent, at its measured rate — *extrapolated* (~26 tokens/line × 26,400 lines; likely optimistic, distributed systems iterate worse than monoliths) | **~680k** | ~26,400 lines | ~26 |
| Modux, *next* app of this size: model + hooks, no metamodel gaps to discover — *estimated* | ~53k emitted (~100k with iteration) | ~26,400 lines | **~4** |

The apples-to-apples headline lives in rows three and four: **the same distributed system,
~680k tokens written directly vs ~100k through the model — about 7×.**

Excluded from the app row, and measured separately: **~180k** tokens went into evolving the
generator (the 15 features listed above, plus its docs) — paid once, inherited by every model
after this one.

Read it carefully:

- **App for app, each delivered line cost 2.5× fewer tokens** than direct agent work — and
  bought a distributed system (Kafka, Postgres, k8s) instead of a monolith.
- **The marginal app is ~6–7× cheaper per line**: the agent authors ~4,400 lines of intent
  (model + hooks) and deterministic, tested templates emit the other ~21,400 at zero token
  cost, with no review-and-fix loops over boilerplate.
- **Evolution is where the gap keeps widening.** Adding a field, an event or a use case is a
  few YAML lines; regeneration rewrites thousands of lines across services — migrations
  included — for zero tokens. And every future agent session reasons over the 2,777-line
  model instead of re-reading a 26,000-line codebase: the model is the cheapest possible
  context, the system described as intent rather than plumbing.
