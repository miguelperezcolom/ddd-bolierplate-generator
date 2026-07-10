---
title: ETL Flows (Integrators)
description: Data pipelines between systems — sources, transforms and writes, owned by a bounded context
---

An **ETL flow** (integrator) moves data between systems as an ordered pipeline of
steps. It is **owned by a bounded context** — the consumer-side ACL, or the publisher
of an outbound integration: that context generates and operates the pipeline (there
is no such thing as an unowned integration).

## Steps

Three phases, six concrete kinds:

| Phase | Kind | References |
|---|---|---|
| **Source** | `SOURCE_PULL` | a legacy table (`externalTableId`) or an API/operation (`apiId`, `operationId`) polled for data |
| | `SOURCE_CONSUMER` | a domain/application event (`eventId`) the pipeline reacts to |
| **Transform** | `TRANSFORM` | a declarative [model mapping](/manual/model-mappings/) (`modelMappingId`), or custom logic stated as `intent` (the [ai-complete](/manual/ai-completion/) spec) |
| **Write** | `WRITE_API` | calls an API operation |
| | `WRITE_DB` | writes a legacy table |
| | `WRITE_EVENT` | publishes an event |

## On the context map

The flow is a teal chip nested in its owner context (palette: **Flujo ETL
(integrador)**, dropped on a bounded context). Its steps are drawn **by direction** —
the gesture is the meaning:

- wire an element **INTO the flow** → a source: a table or API draws «pull», an
  event draws «consume»;
- wire the flow **OUT to an element** → a write: «api», «bd» or «evento»;
- drop **Transformación ETL** from the palette on the flow → a transform step
  (mapping/intent in its form).

Hidden chips roll up (a table inside a folded system points at the system; the flow
at the coarse level points at its context). Supr on a data line removes the step
behind it; Supr on the flow removes the pipeline — both undoable, the undo rebuilding
the whole pipeline.

## Identity

A pipeline is a **non-human subject**: wire the flow to an
[identity provider](/manual/identity/) and it runs as a service identity of that IdP
(«identidad de servicio» edge).
