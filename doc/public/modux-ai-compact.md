# Modux for AI agents — compact authoring reference

You are writing a `model-driven-store.yaml` for Modux. This file is the system: a generator
emits the full architecture from it (hexagonal Spring Boot services, Kafka, Postgres+Flyway,
Mateu UI, MCP, security, docker/k8s/terraform). Your job is to express INTENT in the model and
leave genuine business logic to the custom hooks. This page front-loads what a first-time
author otherwise discovers through failed generations.

## The loop

```bash
# from model-driven-generator/ — validate refs, lint, then generate via the maven plugin
mvn spring-boot:run -Dspring-boot.run.arguments="--modux.check --modux.model-file=/path/model-driven-store.yaml --server.port=0"
mvn spring-boot:run -Dspring-boot.run.arguments="--modux.lint  --modux.model-file=/path/model-driven-store.yaml --server.port=0"
# from the model's folder (pom with io.mateu.modux:modux-maven-plugin): projectId = your project id
mvn modux:generate
```

Regeneration owns the generated zone (it even deletes files the model no longer produces).
Never edit generated code; the `*-custom` module is scaffolded once and never overwritten.

## Mental map (what refers to what)

```
projects ─ serviceIds ─▶ services ─ moduleIds ─▶ modules ─ boundedContextId ─▶ boundedContexts
boundedContexts: aggregateIds, domainEventIds, useCaseIds, subscriptionIds, domainPolicies, acls
aggregates ─ modelId ─▶ models (fields)          useCases ─ inputModelId/outputModelId ─▶ models
services ─ gatewayIds ─▶ gateways (outbound REST) ─ operations ─ input/outputModelId ─▶ models
```

Every element lives in a top-level list and is referenced BY ID. `--modux.check` catches
dangling refs; run it before generating.

## Idioms that carry the architecture

- **Cross-context events**: flag the domain event `publishAsIntegrationEvent: true` +
  `topicName`. That alone generates the payload record, the publisher port AND its Kafka
  implementation, plus consumer bindings. If the aggregate's model lacks the aggregate id
  (models don't include their own id), point `integrationModelId` at a dedicated payload model
  that carries it (e.g. `reservaDeVentaId`).
- **Consuming a topic**: a `subscriptions` entry in the consumer context — `topicName`,
  `consumerGroup`, `inputModelId` (the payload model; fields map to the target command by
  name), `actions: [{type: CallUseCase, useCaseId: ...}]`, `idempotencyEnabled: true` (gets a
  generated inbox with message-hash dedup).
- **Sync service-to-service**: the CALLER service declares the gateway (`gateways`, listed in
  its `gatewayIds`); the CALLEE exposes the use case with `exposedAsRest: true`. Path
  convention: `/v1/<usecasenamelowercase>`. Set `baseUrl` to the local run URL
  (`http://localhost:<port>`); docker-compose rewrites it per environment automatically.
  Give each service a distinct `port`.
- **Use case shape**: `inputModelId` → the Command; `outputModelId` → a generated Result
  (returned by handle/REST/page/MCP). Steps of type `Custom` carry an `intent` — that text is
  the contract for the developer/AI hook (`{Name}Steps`) scaffolded in `*-custom`.
- **Exposure matrix**: `exposedAsUi` → a Mateu page (fields = command, primary button runs
  it); `exposedAsRest` → controller; `exposedAsMcp` (+`mcpDescription`) → a tool in the
  service's generated MCP server at `/mcp`; `exposedAsAsync` → a bound Kafka consumer taking
  the Command as JSON. Pure-read use cases usually need NO page: the CRUDs already list data.
- **Row actions**: `rowActionForAggregateId: agg-x` on a use case whose command is just the id
  → a selection toolbar action on that aggregate's CRUD (e.g. relaunch queued purchases).
- **Humanize everything**: `title` on aggregates/use cases; `label` (+ `priority`, 1 = most
  important, and `identifier: true` for the row title) on model fields. They drive titles,
  menus, columns and the master-detail rail.
- **Structured input**: a model field with `basicType: false, type: array, modelId: model-x`
  becomes an inline-editable grid on the page; in Commands/REST/gateways it travels as a JSON
  **string** (custom hooks parse it).
- **Roles**: `roles` with `allowedUseCaseIds` generate real login (form + Basic; scaffold user
  = role name lowercase). `/v1/**` stays machine-to-machine.

## Pitfalls (each of these cost a failed generation once)

- `OperationEntity.sets` is parsed as JSON (`[{"field":...,"value":...}]`) — free text breaks
  generation. If unsure, express the operation's meaning in `intent` only.
- `QueryCardinality` accepts `Single | List | Page` (the schema does not restrict it; other
  values fail at deserialization).
- Aggregate model fields with `basicType: false` + `modelId` are NOT emitted as VOs for the
  aggregate — model collections as `type: array` (JSON string column) and keep the referenced
  model for UI grids and documentation.
- No aggregate inheritance: model each specialization as its own aggregate and repeat the
  shared fields.
- Models never contain their own `id` field; commands for id-only use cases get a single
  `String id`.
- YAML ids are kebab-case strings; every reference must resolve (`--modux.check`).

## Custom hooks: the developer/AI contract

Generated interfaces, implemented once in `*-custom` (never overwritten): `{UseCase}Steps`
(business steps; receive the Command, the last one returns the Result), `{Aggregate}Invariants`
(check), `{Op}{Aggregate}Operation` (state transitions — steps may pass lambdas instead).
Repositories offer `findById/findAll/save/deleteAllById`; `save` publishes the aggregate's
domain events (`AggregateRoot.send`) as Spring events. Write hooks FROM the step's `intent`;
`mvn modux:ai-complete` drafts them for you.

## Steal, don't invent

Copy the closest example and evolve it — `sample/hla-booking/model-driven-store.yaml`
(enterprise write side, ADRs, strangler fig, saga) and the examples under
`model-driven-generator/src/test/resources/examples/`. See also the booking case study in the
docs: a full CRS whose model exercises most of this page.
