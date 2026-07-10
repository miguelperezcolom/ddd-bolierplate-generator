---
title: Documents & Reports
description: Generated documents (template + model) and query-fed reports
---

A **Document** element declares a generated artifact:

| Kind | What it is | Fed by |
|---|---|---|
| `DOCUMENT` | A template filled with data (a booking confirmation PDF) | a **data model** (`modelId`) |
| `REPORT` | A dataset listing (the daily arrivals) | a **query operation** (`queryServiceId` + `queryOperationId`) |

The template location (or its intent, in prose) travels with the element; the
rendering engine and output format are generation-time decisions.

## On the context map

Palette: **Documento/Informe** (Dominio group, slate), dropped on the bounded
context that owns it. Wire it by drawing:

- **query service (or one of its operations) → document**: the report's dataset
  («alimenta»; Supr unpoints);
- drop a **model from the Catálogo** on the document: the template's data.

Deleting the chip removes it; undo rebuilds it with its sources.
