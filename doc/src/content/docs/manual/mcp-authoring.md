---
title: MCP Authoring Server
description: Let an AI agent build and validate the Modux spec conversationally through the Model Context Protocol
---

Modux positions AI as the natural-language-to-model translator: you describe the system, the agent writes the spec, Modux generates the code deterministically. The **MCP authoring server** turns that stance into tooling — any MCP client (Claude Code, IDE assistants, custom agents) can create, inspect and validate model elements directly against the store, with the linter closing the feedback loop in the same conversation.


## The in-app chat operates the model

The shell is annotated `@AI(sse = "/mateu/agent/stream", mcp = "/mcp")`: the chat forwards
the app's MCP endpoint with every message, so its agent can call these tools on the very
model you are looking at (edits refresh the open UIs at once — same process, same catalog).
On a **remote** deployment the user runs the local companion (`agent-cli-companion`), which
bridges to their authenticated CLI — no api key — and reaches back to the app's `/mcp` with
the user's own token, gated by an origin allowlist. Ask the chat to *«enséñame el mapa de
contextos»* and `render_context_map` lands in the bubble.

## Two transports, one server

The MCP server speaks stdio (`--modux.mcp`, for agents that spawn a process — Claude Code,
gemini-cli) **and streamable HTTP at `POST /mcp` on the running app** — same tools, same
in-memory catalog the open UIs are looking at. The HTTP transport is what the in-app chat's
pseudo-agent uses (`mateu.agent.cli.mcp-config` points the CLI at it), so asking the chat to
touch the model edits exactly what you see — and `render_context_map` pastes straight into
the conversation.

## System & solutions over MCP

The AI can drive the [solutions workflow](/manual/solutions/) too: `workspace_status`
(branch, solutions, diff summary), `create_solution` / `switch_solution`,
`solution_diff` (the semantic element-by-element diff), `set_solution_status`
(APPROVED enforces the gate) and `merge_solution` / `update_solution_from_system`
(conflicts come back listed; resolve them per element with the `resolutions` map).
Same contract as the editor's bar — and it works on git AND database repositories.

## Starting the server

```bash
java -jar model-driven-generator.jar --modux.mcp --modux.model-file=/path/to/model-driven-store.yaml
```

In MCP mode the generator does not start the web UI: it speaks JSON-RPC over stdin/stdout until the client disconnects. `--modux.model-file` is optional and defaults to `.dev/data/model-driven-store.yaml`.

### Claude Code

```bash
claude mcp add modux -- java -jar model-driven-generator.jar --modux.mcp --modux.model-file=/path/to/model-driven-store.yaml
```

### Generic client configuration

```json
{
  "mcpServers": {
    "modux": {
      "command": "java",
      "args": ["-jar", "model-driven-generator.jar", "--modux.mcp",
               "--modux.model-file=/path/to/model-driven-store.yaml"]
    }
  }
}
```

## The tools

| Tool | What it does |
|---|---|
| `bootstrap_project` | Step 1 in one call: project + service + bounded contexts (each with its main module), wired into the service's `moduleIds`, from the user's description |
| `list_element_types` | Every element type in the model (aggregates, useCases, flows…) with counts |
| `list_elements` | The elements of one type (id and name) |
| `search_elements` | Full-text search: matches id, name or any line of the element's YAML (descriptions, fields, invariants…), returning the matching lines |
| `get_element` | Read one element as YAML, exactly as stored |
| `get_element_schema` | The JSON schema of one element type — the contract for `upsert_element` |
| `upsert_element` | Create or update an element and persist; returns the dangling references it introduces |
| `delete_element` | Delete an element and persist; returns the references that become dangling |
| `check_model` | Referential-integrity check over the whole model |
| `lint_model` | The full linter: integrity plus the architectural rule catalog, filterable by severity |
| `render_context_map` | The context map **rendered as a self-contained SVG** (no arguments) — bounded contexts tinted by subdomain, external systems dashed, strategic relations solid, flows dashed and coloured by their live coherence. A read-only projection for the agent to *show* the user: save it to a file, embed it in the chat |
| `list_recipes` / `apply_recipe` | [Starter recipes](/manual/recipes/): emit intent-layer elements instead of structure |
| `generate_code` | Generate a project's code, like `--modux.generate` |
| `propose_implementations` | Run [AI completion](/manual/ai-completion/) over the two-zone hooks (needs `ANTHROPIC_API_KEY` in the server's env) |

The tools are generic over the element-type catalog, so new element types in the metamodel are exposed automatically.

## The authoring loop

The design intent is a tight loop the agent can run without leaving the conversation, following [the authoring path](/getting-started/authoring-path/):

1. `bootstrap_project` — from the user's natural-language description, one call creates the topology (project + service + bounded contexts, each born with its main module and wired into the service's `moduleIds`); on an existing model, orient first with `list_element_types` / `search_elements`.
2. `get_element_schema` — learn the exact shape before writing a new element type (`upsert_element` rejects unknown fields with a *did-you-mean* suggestion).
3. `upsert_element` / `apply_recipe` — write; upserts return the dangling references introduced, and recipes emit intent-layer elements instead of structure.
4. `lint_model` — after a batch of edits, run the full rule catalog (lifecycle coherence, idempotency, DLQ, PII, tenancy…); the findings are the next-step to-do list.
5. `generate_code` — once the model is clean — and optionally `propose_implementations`, so the AI drafts the two-zone hook bodies (from their natural-language intents) for the developer to review.

Because `upsert_element` rejects unknown fields and points back at `get_element_schema`, typos and hallucinated fields fail fast instead of landing silently in the store.

At any point in the loop, `render_context_map` gives the agent something to *show*
rather than tell: the current context map as one self-contained SVG, always drawn
from the live model.

## Journeys over MCP

[Journeys](/manual/graphical-editor/#journeys-trayectos) are ordinary catalog
elements, so the generic tools cover them: `get_element_schema` for type
`journeys`, then `upsert_element`. A journey is `id`, `name`, `description` and a
list of `legs`; each leg is a hop `sourceId` → `targetId` over existing elements
(bounded contexts, services, aggregates, use cases, query services, APIs,
workflows, AI agents, external systems) plus `afterLegIds` naming the legs it
continues — together the legs form a **DAG**, so one journey can bifurcate and
converge. Three lint rules keep them honest: `journey-leg-endpoints` (ERROR — both
endpoints must reference existing elements), `journey-dag` (ERROR — every
`afterLegIds` entry must be a leg of the same journey and the legs must form no
cycle) and `journey-leg-without-dependency` (INFO — a leg should ride on a declared
dependency edge underneath, not invent a second topology).

## The live store

The store is shared, not owned: every modux process — the web UI's backend and the
MCP server alike — **watches the store on disk**. When *another* process writes it
(the MCP server an agent spawned, a `git pull` on the checkout, a hand edit in the
IDE), the catalog reloads — healing included — and every open UI refreshes through
the existing SSE channel. It works in both directions: the MCP server picks up the
UI's changes the same way, so agent and human can edit the same model at the same
time without restarting anything. A process recognises its **own writes** and the
artifacts it generates (the JSON schema, the editor layout) and ignores them;
between simultaneous writers the **last write wins** — each write persists the
whole store.

## Notes

- Every write persists the store immediately, in the same format it was loaded from (monolithic or granular).
- The store file stays the source of truth: you can keep editing it in the IDE ([with schema support](/getting-started/yaml-editing/)) alongside agent sessions — [the live store](#the-live-store) picks external edits up as they land, no restart needed.
- The linter is the same one behind the **Model health** page and `--modux.lint` in CI, so agent, UI and pipeline all enforce identical rules.
