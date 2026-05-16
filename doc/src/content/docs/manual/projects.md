---
title: Projects
description: Creating and configuring a Modux project
---

A **Project** is the top-level container for your entire system. It holds global configuration that applies to all generated services and modules.

## Creating a project

1. Click **Organization → Projects** in the sidebar
2. Click **New**
3. Fill in the required fields and save

## Configuration

### Basic

| Field | Description |
|---|---|
| **Name** | Display name for the project |
| **Package** | Base Java package (e.g. `com.example.booking`) |
| **Output path** | Filesystem path where generated code will be written |
| **Git repository** | Optional remote repository URL |
| **Version** | Project version (e.g. `0.1.0-SNAPSHOT`) |

### Environments

You can define multiple environments (e.g. `local`, `dev`, `prod`). Each environment can override:

- Database connection settings
- Kafka broker addresses
- External service URLs
- Secrets and credentials

### Infrastructure

| Setting | Description |
|---|---|
| **Kubernetes** | Enable Kubernetes manifest generation |
| **Terraform** | Enable Terraform configuration generation |
| **CI/CD** | Enable GitHub Actions pipeline generation |
| **Cache** | Configure distributed cache settings |
| **Logging** | Log aggregation configuration |
| **Tracing** | Distributed tracing provider (Jaeger, Zipkin, etc.) |
| **IAM** | External identity provider (e.g. Keycloak) |

### Context Map

The context map defines how bounded contexts in your project relate to each other. Supported relationship types:

| Type | Description |
|---|---|
| `SHARED_KERNEL` | Two contexts share a common model |
| `PUBLISHED_LANGUAGE` | One context publishes a well-defined API |
| `OPEN_HOST_SERVICE` | A service exposed to multiple consumers |
| `ANTI_CORRUPTION_LAYER` | Translation layer between two models |
| `CONFORMIST` | Downstream conforms to upstream model |
| `CUSTOMER_SUPPLIER` | Upstream/downstream with negotiated interface |
| `SEPARATE_WAYS` | Contexts evolve independently |

## What gets generated

At the project level, Modux generates:

- Root `pom.xml` with multi-module structure
- Per-environment `application.yaml` files
- CI/CD pipeline files (if enabled)
- Kubernetes and Terraform stubs (if enabled)
- Main application entrypoint

## Next steps

Add one or more [Services](/manual/services/) to your project.
