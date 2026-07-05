---
title: MCP Authoring Server
description: Let an AI agent build and validate the Modux spec conversationally through the Model Context Protocol
---

Modux positions AI as the natural-language-to-model translator: you describe the system, the agent writes the spec, Modux generates the code deterministically. The **MCP authoring server** turns that stance into tooling — any MCP client (Claude Code, IDE assistants, custom agents) can create, inspect and validate model elements directly against the store, with the linter closing the feedback loop in the same conversation.

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
| `list_element_types` | Every element type in the model (aggregates, useCases, flows…) with counts |
| `list_elements` | The elements of one type (id and name) |
| `search_elements` | Find elements of any type by id/name substring |
| `get_element` | Read one element as YAML, exactly as stored |
| `get_element_schema` | The JSON schema of one element type — the contract for `upsert_element` |
| `upsert_element` | Create or update an element and persist; returns the dangling references it introduces |
| `delete_element` | Delete an element and persist; returns the references that become dangling |
| `check_model` | Referential-integrity check over the whole model |
| `lint_model` | The full linter: integrity plus the architectural rule catalog, filterable by severity |
| `generate_code` | Generate a project's code, like `--modux.generate` |

The tools are generic over the element-type catalog, so new element types in the metamodel are exposed automatically.

## The authoring loop

The design intent is a tight loop the agent can run without leaving the conversation:

1. `list_element_types` / `search_elements` — orient in the existing model.
2. `get_element_schema` — learn the exact shape before writing a new element type.
3. `upsert_element` — write; the response includes any dangling references introduced, so the agent fixes them immediately.
4. `lint_model` — after a batch of edits, run the full rule catalog (lifecycle coherence, idempotency, DLQ, PII, tenancy…).
5. `generate_code` — once the model is clean.

Because `upsert_element` rejects unknown fields and points back at `get_element_schema`, typos and hallucinated fields fail fast instead of landing silently in the store.

## Notes

- Every write persists the store immediately, in the same format it was loaded from (monolithic or granular).
- The store file stays the source of truth: you can keep editing it in the IDE ([with schema support](/getting-started/yaml-editing/)) alongside agent sessions — the server reads the model at startup, so restart it after external edits.
- The linter is the same one behind the **Model health** page and `--modux.lint` in CI, so agent, UI and pipeline all enforce identical rules.
