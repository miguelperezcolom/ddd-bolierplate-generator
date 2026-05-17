---
title: UI Shells
description: Configuring frontend deployment targets in Modux
---

A **UI Shell** represents a deployable frontend application. It bundles one or more services' UI adapters into a single shell and declares where and how that shell is deployed.

## Creating a UI shell

1. Open the **Interfaces → UI Shells** section
2. Click **New**
3. Configure the services to include, the public URL, and the deployment target

## Configuration

### Basic fields

| Field | Description |
|---|---|
| **Name** | Shell name (PascalCase, e.g. `AdminShell`) |
| **Title** | Application title shown in the browser tab |
| **App variant** | Default navigation variant for the shell (overridden per adapter) |
| **Services** | Services whose UI adapters are bundled into this shell |
| **URL** | Public URL where the shell will be served (e.g. `https://app.example.com`) |

### Deployment type

| Type | Description |
|---|---|
| **CDN** | Deploy to a CDN provider (e.g. Netlify, Cloudflare Pages) |
| **BUCKET** | Deploy to an object storage bucket (e.g. AWS S3, GCS) |
| **MICROSERVICE** | Deploy as a Spring Boot microservice |

### CDN deployment

| Field | Description |
|---|---|
| **CDN provider** | Provider name (e.g. `netlify`, `cloudflare`) |
| **CDN site id** | Site identifier in the CDN provider |

### Bucket deployment

| Field | Description |
|---|---|
| **Bucket provider** | Cloud provider (e.g. `aws`, `gcp`, `azure`) |
| **Bucket name** | Name of the storage bucket |
| **Bucket region** | Cloud region where the bucket lives |

### Microservice deployment

| Field | Description |
|---|---|
| **Deployment service** | The service that will host and serve the frontend assets |

## What gets generated

Depending on the deployment type, Modux generates:

- **CDN / Bucket** — build and deploy scripts configured for the chosen provider, with the public URL baked in
- **Microservice** — a Spring Boot application that serves the frontend as static assets, wired to the selected service

All deployment types include environment-specific configuration for the public URL.
