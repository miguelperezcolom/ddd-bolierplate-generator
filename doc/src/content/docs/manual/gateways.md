---
title: Gateways
description: External service integrations in Modux
---

A **Gateway** defines how your service calls an external system — another microservice, a third-party API, or any HTTP/gRPC endpoint. Gateways are the outbound ports for external communication.

## Creating a gateway

1. Open a module and go to **Gateways**
2. Click **New**
3. Configure and save

## Configuration

### Basic

| Field | Description |
|---|---|
| **Name** | Gateway name (PascalCase, e.g. `PaymentGateway`) |
| **Protocol** | `REST` or `gRPC` |
| **Base URL** | Base URL of the external service (can use environment variables) |

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
| **Auth type** | `NONE`, `BASIC`, `BEARER`, `API_KEY`, or `OAUTH2` |
| **Credentials** | How credentials are provided (environment variable, secrets manager) |

### Operations

Each gateway exposes one or more operations:

| Field | Description |
|---|---|
| **Name** | Operation name (e.g. `chargeCard`) |
| **Method** | HTTP method: `GET`, `POST`, `PUT`, `DELETE`, `PATCH` |
| **Path** | URL path relative to base URL |
| **Input** | Request body / parameters definition |
| **Output** | Response body definition |
| **Timeout** | Per-operation timeout override |

## What gets generated

For a `PaymentGateway` with a `chargeCard` operation:

- `PaymentGateway.java` — gateway interface (port)
- `PaymentGatewayImpl.java` — HTTP client implementation
- `ChargeCardRequest.java` — request DTO
- `ChargeCardResponse.java` — response DTO
- Circuit breaker and retry configuration

## Anti-Corruption Layer

When calling a third-party API whose model differs from your domain model, use an **ACL (Anti-Corruption Layer)** in conjunction with the gateway. The ACL translates between the external model and your domain model, protecting your domain from external changes.

Enable ACL on a module's integration settings and Modux will generate a translation layer alongside the gateway.

## Next steps

- Use [Sagas](/manual/sagas/) to coordinate calls across multiple gateways
- Configure [Model Mappings](/reference/patterns/) for ACL translation rules
