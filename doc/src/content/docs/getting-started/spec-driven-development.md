---
title: Spec-Driven Development
description: Where Modux fits in spec-driven development — AI for the fuzzy translation, deterministic generation for the production code
---

"Spec-driven development" (SDD) means the **specification is the source of truth**, and the code is derived from it rather than hand-written and then documented after the fact. Modux is a spec-driven tool. But *how* you get from a spec to running code matters a great deal, and Modux takes a deliberate stance on it.

## Two readings of "spec-driven"

The term has come to cover two very different workflows:

| | **AI writes the production code** | **The model generates the production code** |
|---|---|---|
| The spec is… | natural-language requirements (+ skills, guardrails, eval suites) | a structured model with a fixed schema |
| Code comes from… | an LLM, each run | a deterministic generator |
| Same input → | possibly different output | byte-for-byte the same output |
| Review surface | the generated code, every time | the model (small) + the generator (once) |
| Cost per change | re-prompt, re-generate, re-review the whole output | edit the model, re-generate |

Both are "spec-driven". Modux is firmly in the **second** column for anything that ends up in production.

## Modux's position

> Use AI for what it is uniquely good at — turning ambiguous natural language into a precise structure — and use deterministic generation for what *it* is uniquely good at: producing correct, identical, reviewable code every time.

Concretely, the pipeline is:

<svg viewBox="0 0 880 200" role="img" aria-label="Pipeline: natural-language specs, translated by AI into the Modux model, which the Modux generator deterministically turns into production code." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:880px;margin:1rem auto;display:block;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;">
  <defs>
    <marker id="sdd-arrow-ai" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="var(--sl-color-text)" fill-opacity="0.55"/>
    </marker>
    <marker id="sdd-arrow-modux" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="var(--sl-color-text-accent)"/>
    </marker>
  </defs>

  <!-- Box A: natural-language specs -->
  <rect x="10" y="78" width="190" height="74" rx="10" fill="var(--sl-color-gray-6)" stroke="var(--sl-color-gray-4)" stroke-width="1.5"/>
  <text x="105" y="108" text-anchor="middle" font-size="14" font-weight="600" fill="var(--sl-color-text)">Natural-language</text>
  <text x="105" y="126" text-anchor="middle" font-size="14" font-weight="600" fill="var(--sl-color-text)">specs</text>
  <text x="105" y="144" text-anchor="middle" font-size="11" fill="var(--sl-color-text)" fill-opacity="0.7">ambiguous, human</text>

  <!-- Arrow 1: AI (dashed = non-deterministic) -->
  <line x1="208" y1="115" x2="312" y2="115" stroke="var(--sl-color-text)" stroke-opacity="0.55" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#sdd-arrow-ai)"/>
  <text x="260" y="100" text-anchor="middle" font-size="13" font-weight="700" fill="var(--sl-color-text)">AI</text>
  <text x="260" y="138" text-anchor="middle" font-size="11" fill="var(--sl-color-text)" fill-opacity="0.7">non-deterministic</text>

  <!-- Box B: Modux model (the source of truth, accent-stroked) -->
  <rect x="320" y="74" width="240" height="82" rx="10" fill="var(--sl-color-gray-6)" stroke="var(--sl-color-text-accent)" stroke-width="2.5"/>
  <text x="440" y="100" text-anchor="middle" font-size="11" font-weight="700" fill="var(--sl-color-text-accent)" letter-spacing="0.5">THE SOURCE OF TRUTH</text>
  <text x="440" y="123" text-anchor="middle" font-size="15" font-weight="600" fill="var(--sl-color-text)">Modux model</text>
  <text x="440" y="142" text-anchor="middle" font-size="11" fill="var(--sl-color-text)" fill-opacity="0.7">schema-validated YAML</text>

  <!-- Arrow 2: Modux (solid accent = deterministic) -->
  <line x1="568" y1="115" x2="672" y2="115" stroke="var(--sl-color-text-accent)" stroke-width="2.5" marker-end="url(#sdd-arrow-modux)"/>
  <text x="620" y="100" text-anchor="middle" font-size="13" font-weight="700" fill="var(--sl-color-text-accent)">Modux</text>
  <text x="620" y="138" text-anchor="middle" font-size="11" fill="var(--sl-color-text-accent)" fill-opacity="0.85">deterministic</text>

  <!-- Box C: production code -->
  <rect x="680" y="78" width="190" height="74" rx="10" fill="var(--sl-color-gray-6)" stroke="var(--sl-color-gray-4)" stroke-width="1.5"/>
  <text x="775" y="113" text-anchor="middle" font-size="14" font-weight="600" fill="var(--sl-color-text)">Production code</text>
  <text x="775" y="133" text-anchor="middle" font-size="11" fill="var(--sl-color-text)" fill-opacity="0.7">hexagonal Java monorepo</text>
</svg>

<p style="text-align:center;font-size:0.85em;opacity:0.75;margin-top:-0.25rem;">AI handles the fuzzy translation; Modux deterministically compiles the model into code.</p>

- **AI does the translation.** Going from "a booking can't be confirmed unless it's paid and the room is available" to the right aggregate, operation, precondition and event is exactly the kind of fuzzy, context-heavy mapping LLMs excel at. The output is a **Modux model** — small, structured, human-readable, schema-validated, diffable in version control.
- **Modux does the generation.** From that model, the [generator](/manual/generating-code/) deterministically produces the hexagonal Java monorepo: aggregates, use cases, persistence, messaging, UI, DevOps. Same model in, same code out — no surprises, no drift between runs.

This is why Modux does **not** ask an LLM to emit the production structural code, even with skills and guardrails in place.

## Why not let AI generate the production code directly

The concerns that motivate this split:

- **Non-determinism.** An LLM may produce different code for the same requirement on different runs. For long-lived, business-critical systems, "it regenerated slightly differently" is a liability, not a feature.
- **Control.** When the model is the artifact you own and review, the surface you have to understand is small and stable. When the *code* is regenerated by an LLM, you are reviewing a moving target on every change.
- **Cost.** Re-prompting a model to regenerate thousands of lines of boilerplate on every change is a waste of tokens and time when a template engine does it instantly and for free.
- **Reproducibility.** Audits, compliance, and debugging all rely on "this code came from this spec, deterministically." A generator gives you that; an LLM does not.

The model is small enough to own and reason about; the generated code is large but disposable and reproducible. That asymmetry is the whole point.

## Where AI still helps — inside the boundary

Keeping AI out of production code generation does **not** mean keeping AI out of the workflow. It means putting it where its strengths pay off and its weaknesses don't bite:

- **Specs → model.** The main use: drafting and refining the Modux model from natural-language requirements. You review the model, not a pile of generated code.
- **Filling the gaps you can't model.** Some logic genuinely can't be derived from the model — invariant bodies, custom steps, business-rule conditions. Modux leaves these as [two-zone hooks](/manual/generating-code/#generated-code-vs-your-code-two-zones) in a module *you* own. The optional [`ai-complete`](/manual/ai-completion/) step can **propose** implementations for those hooks, which you review and paste in. The AI never touches the locked generated zone, and its suggestions land in code you control and version normally.

In both cases the AI's output is small, reviewable, and lands somewhere you own — never the regenerated structural code.

## The takeaway

Modux treats the **model as the spec** and the generator as a deterministic compiler from model to code. AI is the front-end that helps you author that model, and an optional assistant for the human-owned gaps — each tool used for what it is actually good at. You keep determinism, reviewability, and control where they matter most: in the code that goes to production.

## Next steps

- [Introduction](/getting-started/introduction/) — what Modux generates
- [Generating Code](/manual/generating-code/) — the deterministic generator and the two-zone model
- [AI-Assisted Completion](/manual/ai-completion/) — proposing implementations for the gaps you own
