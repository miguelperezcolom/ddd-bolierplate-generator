---
title: AI Agents & RAGs
description: Agents as first-class consumers — tools (use cases and external operations) plus knowledge (RAGs)
---

An **AI agent** is a first-class element of the model, at the same level as the
bounded contexts: an *automated consumer* of the system. Its definition has two
halves:

- **Tools** — what it can *do*: internal **use cases** (consumed through MCP) and
  **external-system operations**.
- **Knowledge** — what it *grounds on*: **RAGs** (retrieval-augmented-generation
  knowledge bases).

```
                       ┌── tools ──────▶ use case (exposedAsMcp)
  AI agent ────────────┤
                       ├── tools ──────▶ external operation
                       │
                       └── knowledge ──▶ RAG ◀── read models, repos, webs, FTP…
```

## Agents

Create an agent from the context-map toolbar (robot glyph, drawn outside every
context, like actors). Then drag its handle:

- **onto a use case** — the consumption is recorded (`allowedUseCaseIds`) and the use
  case flips `exposedAsMcp: true`: its bounded context will expose it as an MCP tool.
  Removing the arrow clears the exposure when no other agent consumes it.
- **onto an external system's operation** (`allowedExternalUseCaseIds`) — the other
  half of the tool surface. How the call is bridged (gateway, outbound ACL) is a
  generation-time decision, declared now.
- **onto a RAG** (`ragIds`) — the agent queries it for grounding before acting.

The `agent-without-tools` lint rule flags an agent that consumes no use case and no
external operation: it cannot act on the system.

## RAGs

A **RAG** is a knowledge base an agent retrieves from. It declares *what it indexes*;
the pipeline (embeddings, chunking, refresh) is a later decision:

| Source | Declared as | Gesture |
|---|---|---|
| **Read models** | `sourceReadModelIds` — the domain projecting itself into an index | Drag the RAG onto a read model |
| **External content** | `contentSources` — typed URIs: `REPO`, `WEB` or `FTP` | Select the RAG and use the **＋ Fuente** toolbar (type + URI) |

Content sources hang from the RAG as small dashed satellites on the context map; Supr
removes one. Because read models are kept fresh by [projections](/manual/projections/),
a RAG fed from read models knows exactly which events should refresh its index.

The `rag-orphan` lint rule flags a knowledge base no agent queries.

## In the EventStorming view

Agents with tools or knowledge join the narrative: agent → the commands it consumes
(MCP), agent → external systems (labelled with the operation), and agent → RAG ← the
read models feeding it.
