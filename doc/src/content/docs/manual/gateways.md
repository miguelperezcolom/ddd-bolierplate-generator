---
title: Gateways
description: External service integrations in Modux
---

A **Gateway** defines how your service calls an external system — another microservice, a third-party API, or any HTTP/gRPC endpoint. Gateways are the outbound ports for external communication.

## Creating a gateway

1. Open a bounded context and go to **Gateways**
2. Click **New**
3. Configure and save

## Configuration

### Basic

| Field | Description |
|---|---|
| **Name** | Gateway name (PascalCase, e.g. `PaymentGateway`) |
| **Base URL** | Base URL of the external HTTP service (can use environment variables) |

### Resilience

| Field | Description |
|---|---|
| **Timeout** | Total request timeout |
| **Connection timeout** | Time to establish a connection |
| **Read timeout** | Time to wait for a response |
| **Circuit breaker** | Enable circuit breaker pattern (fail fast when the downstream is unhealthy) |
| **Retry policy** | Max retries and backoff strategy |
| **Rate limiting** | Max calls per time window |

### Security

| Field | Description |
|---|---|
| **Auth type** | `None`, `Basic`, `ApiKey`, `BearerToken`, or `OAuth2ClientCredentials` |
| **Credentials** | API key header name, bearer token, basic credentials or OAuth2 token URL & scopes, as required by the auth type |

### Operations

Each gateway exposes one or more operations:

| Field | Description |
|---|---|
| **Name** | Operation name (e.g. `chargeCard`) |
| **Method** | HTTP method: `GET`, `POST`, `PUT`, `DELETE`, `PATCH` |
| **Path** | URL path relative to base URL (may contain `{placeholders}`) |
| **Input model** | Model describing the request body |
| **Output model** | Model describing the response body |
| **Parameters** | Path / query / header / cookie parameters (name, location, type, required) |
| **Timeout** | Per-operation timeout override |

Parameters are editable as a list on each operation. They become typed method arguments on the generated adapter and are bound automatically: path placeholders and query parameters are expanded into the URL, header parameters are set as request headers, and cookie parameters are added to the `Cookie` header.

## What gets generated

For a `PaymentGateway` with a `chargeCard` operation:

- `application/out/PaymentGatewayGateway.java` — the gateway interface (port); each operation is a typed method that returns its response-model DTO
- `infra/out/gateway/PaymentGatewayGatewayImpl.java` — a `RestTemplate`-based adapter that builds the request body from the typed arguments, applies auth and parameter binding, calls the endpoint and returns the deserialized response. It includes an `authHeaders()` helper driven by the gateway's auth type
- `application/out/gateway/dto/*.java` — a typed record per request/response model

The generated method bodies are runnable out of the box for the common case; credentials (API key, token, basic) are exposed as fields to fill in.

## Importing from OpenAPI

The quickest way to create a gateway for a third-party API is to [import its OpenAPI spec](/manual/importers/) — Modux derives the gateway, its operations, typed models, authentication and parameters automatically.

## Anti-Corruption Layer

When you call a third-party API whose model differs from your domain, the gateway adapter is the natural place for an **Anti-Corruption Layer**: keep the gateway's DTOs separate from your domain model and translate between them in the adapter (optionally with [Model Mappings](/manual/model-mappings/)), so external changes don't leak into your domain.

## Next steps

- Use [Sagas](/manual/sagas/) to coordinate calls across multiple gateways
- Import an existing API with the [OpenAPI importer](/manual/importers/)
