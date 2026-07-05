---
title: Search
description: Full-text search over the whole specification — find any element by id, name or content and open it in place
---

The **Search** page runs a full-text search over the whole specification: an element matches when the query appears in its **id**, its **name**, or **any line of its YAML** — descriptions, field names, invariants, operation preconditions, step intents. Select a hit and the element's own view opens in the detail pane, exactly like selecting a node in the [Workspace](/manual/workspace/).

## What you see

Each hit shows two columns:

- **Element** — the type and name (`Aggregate: Estancia`, `Query Service: ConsultasRecepcion`).
- **Match** — the YAML line(s) the query matched, so you see *why* it matched before opening it.

Hits are ranked **id > name > content**: elements whose id matches come first, then name matches, then elements that only match somewhere in their content. With an empty query the page lists the whole model.

## The same search the agents use

The page and the MCP [`search_elements`](/manual/mcp-authoring/) tool run the **same query service**, so a human browsing the UI and an AI agent authoring over MCP always see the same results. If you are wondering what an agent will find when it orients itself in your model, type the same query here.

## Matching rules

- Case-insensitive substring matching, over the element's YAML exactly as stored.
- Snippets show up to 3 matching lines per element, each truncated to 160 characters.
- The search is read-only: results open each element's view; editing happens in the element's own editor (from the Workspace or its concept page).
