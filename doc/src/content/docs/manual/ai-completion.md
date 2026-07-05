---
title: AI-Assisted Code Completion
description: Use Claude AI to generate proposals for the custom code that Modux cannot derive from the spec alone
---

The Modux generator produces complete structural skeletons, but some logic genuinely cannot be inferred from a spec: invariant conditions, operation preconditions, and BDD step bodies all require domain knowledge that lives outside the model. The `ai-complete` command closes that gap by calling Claude AI with context from your spec and generating ready-to-paste proposals.

This is the **second** place Modux uses AI, and it stays strictly inside the boundary described in [Spec-Driven Development](/getting-started/spec-driven-development/): the AI never emits the locked, regenerated production code — it only proposes implementations for the human-owned [two-zone hooks](/manual/generating-code/#generated-code-vs-your-code-two-zones), which you review and paste into code you control.

## The two-step workflow

```
mvn modux:generate       # step 1 — structural skeleton
mvn modux:ai-complete    # step 2 — AI proposals for custom logic
```

The proposals are written to `{outputPath}/proposals/{module}/AI-PROPOSALS.md` — a Markdown file with fenced Java blocks and file/method pointers. You review, adjust if needed, and paste into the generated code.

## What gets proposed

### Invariant implementations

The generator produces:

```java
private void checkInvariants() {
    // TODO invariant: Price must be positive
    // TODO invariant: End date must be after start date
}
```

`ai-complete` reads the invariant conditions from the spec (`expression`, `errorMessage`) and proposes:

```java
// AI-PROPOSALS.md — Booking → checkInvariants()
if (price == null || price.compareTo(BigDecimal.ZERO) <= 0) {
    throw new IllegalArgumentException("Price must be greater than zero");
}
if (endDate != null && startDate != null && !endDate.isAfter(startDate)) {
    throw new IllegalArgumentException("End date must be after start date");
}
```

### Operation preconditions

For each aggregate operation whose `preconditions` field is filled in the spec:

```java
// Generated skeleton
private void checkConfirmPreconditions() {
    // TODO precondition: Booking must be in PENDING status
}
```

The AI proposes a guard based on the precondition description and the aggregate's fields.

### Custom use-case steps (from natural-language intent)

A `Custom` step is a two-zone hook, and its **spec is natural language**: fill the step's `intent` field with what the step must do. The intent travels into the generated scaffold as javadoc:

```java
/** Intent (from the model): Busca tickets abiertos sin actividad en 48h, sube su prioridad un nivel y notifica al agente asignado */
@Override
public void escalateStaleTickets() {
    // TODO: implement "escalateStaleTickets" — intended behaviour: …
    // Tip: `mvn modux:ai-complete` proposes an implementation from that intent (AI-PROPOSALS.md).
}
```

`ai-complete` reads the intent plus the use case's input/output model fields and proposes the method body for `Default{Name}Steps` — a file the **developer owns**: review the proposal, commit it, or rewrite it; it is scaffolded once and never overwritten. This is the intended division of labor: the model states *what* in natural language, the AI drafts *how*, the developer has the last word.

The `custom-step-intent` lint finding reminds you when a Custom step has no intent.

### Cucumber step definition bodies

BDD steps are generated with empty bodies:

```java
@Given("a Booking exists with id {string}")
public void bookingExistsWith(String id) {
    // TODO: insert a test Booking with the given id
}
```

`ai-complete` reads the scenario text and the aggregate's fields and proposes a complete implementation using the repository and use cases.

## Running the command

```bash
# API key from environment variable (recommended)
export ANTHROPIC_API_KEY=sk-ant-...
mvn modux:ai-complete -Dmodux.projectId=my-project-id

# Or pass it directly (not recommended for CI)
mvn modux:ai-complete \
  -Dmodux.projectId=my-project-id \
  -Dmodux.apiKey=sk-ant-...
```

### Choosing the model

The default model is `claude-haiku-4-5-20251001` — fast and cost-effective for code generation tasks. Switch to a more capable model for complex domain logic:

```bash
mvn modux:ai-complete \
  -Dmodux.projectId=my-project-id \
  -Dmodux.model=claude-sonnet-4-6
```

| Model | Best for |
|---|---|
| `claude-haiku-4-5-20251001` | Standard CRUD logic, simple invariants (default) |
| `claude-sonnet-4-6` | Complex business rules, intricate BDD scenarios |
| `claude-opus-4-7` | Highly nuanced domain logic, rich natural language descriptions |

## Giving the AI domain context

Each module in the spec has a `llmSystemPrompt` field. Any text you put there is appended to every prompt sent for that module's aggregates and scenarios. Use it to describe your domain:

```yaml
modules:
  - id: "mod-1"
    name: "bookings"
    llmSystemPrompt: |
      This is a hotel booking system. 
      Bookings can be PENDING, CONFIRMED, or CANCELLED.
      A booking cannot be confirmed if the room is already occupied.
      Prices are always in EUR and include taxes.
    aggregateIds:
      - "agg-1"
```

With this context, the AI generates more accurate invariant checks, meaningful test data, and realistic BDD step bodies.

## Output format

Each `AI-PROPOSALS.md` is structured as:

```markdown
# AI Code Proposals — bookings module

> Generated by `mvn modux:ai-complete`. Review every proposal before committing.

## Booking — `checkInvariants()`

```java
if (price == null || price.compareTo(BigDecimal.ZERO) <= 0) {
    throw new IllegalArgumentException("Price must be greater than zero");
}
```

*File: `domain/aggregates/booking/Booking.java` → `checkInvariants()`*

## BDD Step implementations

### Scenario: Create a new Booking

```
STEP: a Booking exists with id "test-id"
CODE:
var booking = new Booking();
booking.setId(new BookingId("test-id"));
repository.save(booking);
END
```
```

Each block includes a pointer to the exact file and method where the code belongs.

## In CI/CD

In a CI/CD pipeline, run `ai-complete` after `generate` and commit the proposals file alongside the generated code so the team can review the AI suggestions as part of the PR:

```yaml
# GitHub Actions example
- name: Generate code
  run: mvn modux:generate

- name: Generate AI proposals
  env:
    ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
  run: mvn modux:ai-complete -Dmodux.projectId=${{ vars.PROJECT_ID }}

- name: Commit proposals
  run: |
    git add generated/proposals/
    git commit -m "chore: AI proposals for spec $(git rev-parse --short HEAD)" || true
```

Add `ANTHROPIC_API_KEY` as a repository secret in your CI/CD settings.

## Gradual migration to model-driven logic

As your spec matures, some proposals become unnecessary because the information is already in the spec:

- **Invariant expressions** — when `InvariantConditionEntity.expression` contains valid Java, the generator will use it directly without calling the AI
- **Enum operations** — field-setting operations (`type: SET`) are already generated without TODOs

The `ai-complete` command is designed to complement the generator, not replace it. Over time, the spec captures more intent and fewer proposals are needed.
