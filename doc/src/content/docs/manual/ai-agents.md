---
title: AI Agents, MCP Gateways & RAGs
description: The whole AI layer — internal and external agents, their tools, MCP gateways, knowledge bases and reactive triggers
---

An **AI agent** is a first-class element of the model, at the same level as the
bounded contexts: an *automated consumer* of the system. Agents come in two kinds:

- **Internal agents** — ours. They act through tools, ground on knowledge, delegate
  to other agents, and can be *triggered by events*.
- **External agents** (`external: true`) — someone else's (a partner's copilot, a
  customer-facing assistant). They never touch internal elements directly: they enter
  through an **MCP gateway**, which curates and protects the surface they see.

```
  actor (person) ─────────▶ AI agent            event ──────▶ AI agent (reactive)
                               │
        ┌── tools ────────────┼──────────────────────────────────────┐
        ▼                     ▼                                      ▼
   use case (MCP)   query service · API operation        external operation · MCP server
                              │
                              ├── delegates ──▶ another agent
                              └── knowledge ──▶ RAG ◀── read models, repos, webs, FTP…

  external AI agent ───▶ MCP gateway ───▶ MCP servers · APIs · operations · use cases · RAGs
```

## The connection matrix

| From | To | Declared as | Meaning |
|---|---|---|---|
| Actor | AI agent | `RoleEntity.aiAgentIds` | The person talks to the agent — a chat/supervision UI derives from it |
| Domain/application event | AI agent | `reactsToEventIds` | **Reactive agent**: the event triggers a run of it |
| AI agent | Use case | `allowedUseCaseIds` (flips `exposedAsMcp`) | Action tool, consumed through MCP |
| AI agent | Query service | `allowedQueryServiceIds` | Read tool |
| AI agent | API operation | `allowedApiOperationIds` | A published operation as a tool |
| AI agent | External operation | `allowedExternalUseCaseIds` | Partner functionality as a tool |
| AI agent | External MCP server | `allowedMcpServerIds` | A whole external tool surface |
| AI agent | MCP gateway | `mcpGatewayIds` | One curated tool surface |
| AI agent | AI agent | `delegateAgentIds` | Delegation (agent-to-agent) |
| AI agent | RAG | `ragIds` | Knowledge: grounding before acting |
| MCP gateway | MCP server / API / operation / use case / RAG | `mcpServerIds` / `apiIds` / `apiOperationIds` / `useCaseIds` / `ragIds` | What the gateway aggregates and exposes |
| RAG | Read model | `sourceReadModelIds` | The domain projecting itself into an index |
| RAG | External content | `contentSources` (REPO/WEB/FTP + URI) | Content the RAG crawls |

## Agents

Create an agent from the context-map toolbar — **Agente de IA** (internal) or
**Agente IA externo** (external, drawn dashed). Then drag its handle onto any tool,
another agent (delegation) or a RAG; every arrow above is a gesture, and Supr on the
arrow removes the link.

Lint keeps the layer honest:

- `agent-without-tools` (INFO) — an agent with no tool at all cannot act.
- `external-agent-direct-tools` (WARNING) — an external agent wired to internal
  elements directly; it should consume through an MCP gateway.
- `agent-delegation-cycle` (WARNING) — a delegation loop: the agent ends up
  delegating to itself.

## MCP gateways

An **MCP gateway** is *our platform component* that aggregates tool surfaces and
re-exposes them as one MCP endpoint:

- **aggregates** external MCP servers (published by external systems);
- **exposes** published APIs (whole, or single operations), use cases, and RAGs
  (retrieval as a tool).

It is the front door for external agents — and a convenient single surface for
internal ones. Create it from the toolbar (plug glyph) and drag its handle onto
whatever it should expose. `mcp-gateway-empty` (INFO) flags a gateway that exposes
nothing. How it is deployed and authenticated is a generation-time decision.

## Reactive agents

Dragging a **domain or application event onto an agent** declares that the event
triggers a run of it (`reactsToEventIds`): the agent stops being a purely passive
tool-holder and becomes an event consumer — triage an incident when `PagoRechazado`
arrives, draft an answer when `ReclamacionCreada` lands. The run's identity and
guardrails are a later decision; the model declares the reaction.

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
A RAG exposed through an MCP gateway serves retrieval to external agents too.

The `rag-orphan` lint rule flags a knowledge base no agent queries.

## In the EventStorming view

Agents with tools or knowledge join the narrative: agent → the commands it consumes
(MCP), agent → external systems (labelled with the operation or the MCP server), and
agent → RAG ← the read models feeding it.
