---
title: Importing Existing Specs
description: Bootstrap your Modux spec store from OpenAPI and AsyncAPI files
---

Instead of defining every gateway, event and subscription by hand, Modux can read existing API contracts and populate the spec store automatically. Two importers are available:

| Importer | Source | Creates |
|---|---|---|
| OpenAPI | OpenAPI 3.x YAML / JSON | Gateways + operations |
| AsyncAPI | AsyncAPI 2.x YAML | Domain events + subscriptions |

Both importers use **upsert** semantics: if an entity with the same name or topic already exists it is updated in place; otherwise a new entity is created. You can re-import as the external spec evolves and Modux will keep the store in sync.

## OpenAPI → Gateways

An OpenAPI file describes an external HTTP API your system depends on. Modux maps it to a `Gateway` with one `GatewayOperation` per HTTP method + path combination.

### From the UI

1. Open the Modux UI and navigate to **Import OpenAPI spec**
2. Fill in:
   - **Service ID** — the service that owns this gateway (optional; links the gateway to the service)
   - **File path** — absolute path to the `.yaml` or `.json` OpenAPI file on disk
3. Click **Import OpenAPI**

### From the command line

```bash
mvn modux:import-openapi \
  -Dmodux.filePath=/path/to/openapi.yaml \
  -Dmodux.serviceId=my-service-id
```

`serviceId` is optional. When provided, the gateway is automatically added to the service's `gatewayIds` list.

### What gets created

Given this OpenAPI fragment:

```yaml
info:
  title: Payment API
servers:
  - url: https://api.payments.example.com
paths:
  /payments:
    post:
      operationId: createPayment
  /payments/{id}:
    get:
      operationId: getPayment
    delete:
      operationId: deletePayment
```

Modux creates:

- One `Gateway` named **Payment API** with `baseUrl = https://api.payments.example.com`
- Three `GatewayOperation` entries: `createPayment`, `getPayment`, `deletePayment`

The `inputModelId` and `outputModelId` fields are left blank — fill them in the UI or YAML once you have the corresponding models defined.

### Auth detection

The gateway is created with `authType = None`. After import, open the gateway in the UI and set the auth type (Basic, ApiKey, BearerToken, OAuth2ClientCredentials) and credentials to match the real API.

### Re-importing

Running the importer again with the same file updates the gateway's operations list. The gateway ID, auth settings, and rate-limit configuration are preserved — only the base URL and operations list are refreshed.

---

## AsyncAPI → Domain Events and Subscriptions

An AsyncAPI file describes the event-driven interface of a service: which events it publishes and which it consumes. Modux maps:

- `publish` channels → **DomainEventEntity** (this service sends the event)
- `subscribe` channels → **SubscriptionEntity** (this service consumes the event)

### From the UI

1. Navigate to **Import AsyncAPI spec**
2. Fill in:
   - **Module ID** — the module that owns these events/subscriptions
   - **File path** — absolute path to the AsyncAPI YAML file
3. Click **Import AsyncAPI**

### From the command line

```bash
mvn modux:import-asyncapi \
  -Dmodux.filePath=/path/to/asyncapi.yaml \
  -Dmodux.moduleId=my-module-id
```

### What gets created

Given this AsyncAPI fragment:

```yaml
asyncapi: "2.6.0"
info:
  title: Order Service
channels:
  order.created:
    publish:
      operationId: publishOrderCreated
      message:
        name: OrderCreated
  order.shipped:
    subscribe:
      operationId: onOrderShipped
      message:
        name: OrderShipped
```

Modux creates:

- One `DomainEvent` named **OrderCreated** with `topicName = order.created`
- One `Subscription` named **onOrderShipped** with `topicName = order.shipped`

The `modelId` and `inputModelId` fields are left blank — fill them in once the corresponding models are defined.

### Re-importing

Running the importer again matches existing entities by `topicName`. If a matching entity is found it is updated (name refreshed); otherwise a new one is created.

---

## Typical bootstrap workflow

1. Collect the OpenAPI / AsyncAPI files from the teams or services you integrate with
2. Run the importers to seed the spec store
3. Open the UI to fill in the missing model references
4. Run `mvn modux:generate` to generate the full project

```bash
# Import external REST APIs as gateways
mvn modux:import-openapi -Dmodux.filePath=apis/payments.yaml -Dmodux.serviceId=orders-svc
mvn modux:import-openapi -Dmodux.filePath=apis/inventory.yaml -Dmodux.serviceId=orders-svc

# Import the async event contracts
mvn modux:import-asyncapi -Dmodux.filePath=events/orders-events.yaml -Dmodux.moduleId=orders-mod

# Generate the full project
mvn modux:generate -Dmodux.projectId=acme-platform
```
