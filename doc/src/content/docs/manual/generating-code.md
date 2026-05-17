---
title: Generating Code
description: How to run the Modux code generator — from the UI or from a Maven build
---

Once you have defined your domain model in the Modux UI, you can generate the full Spring Boot project at any time. Generation can be triggered **interactively** from the Modux UI or **automatically** during a Maven build via the Modux Maven plugin.

## From the UI

1. Open your **Project** in the Modux UI
2. Click the **Generate Code** button
3. Modux processes all aggregates, events, and other concepts in your project
4. The generated code is written to the **Output path** you configured on the project

## From a Maven build (Maven plugin)

Add the plugin to any Maven project that should trigger generation:

```xml
<plugin>
    <groupId>io.mateu.modux</groupId>
    <artifactId>modux-maven-plugin</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <configuration>
        <projectId>my-project-id</projectId>
        <specFile>${project.basedir}/.dev/data/spec-driven-store.yaml</specFile>
        <outputPath>${project.basedir}/generated</outputPath>
        <packageName>com.mycompany</packageName>
    </configuration>
    <executions>
        <execution>
            <goals><goal>generate</goal></goals>
        </execution>
    </executions>
</plugin>
```

Run generation explicitly:

```bash
mvn modux:generate -Dmodux.projectId=my-project-id
```

Or let it run automatically during the `generate-sources` phase:

```bash
mvn generate-sources
```

See the [Maven Plugin Reference](/reference/maven-plugin/) for all configuration parameters.

## What happens during generation

For each aggregate, Modux:

1. Processes the aggregate definition and all its fields, operations, events, and invariants
2. Renders each Freemarker template with the aggregate's data model
3. Formats the output using **Google Java Format**
4. Writes each file to the correct location within the output directory

## Generated project structure

```
{output-path}/
├── pom.xml                          # Root Maven POM (multi-module)
└── {service-name}/
    ├── pom.xml
    └── src/
        ├── main/
        │   ├── java/{package}/
        │   │   ├── {Module}Application.java
        │   │   └── {module}/
        │   │       ├── domain/
        │   │       │   └── aggregates/{Aggregate}/
        │   │       │       ├── {Aggregate}.java
        │   │       │       └── vo/
        │   │       ├── application/
        │   │       │   ├── usecases/
        │   │       │   ├── query/
        │   │       │   └── out/
        │   │       └── infra/
        │   │           ├── in/ui/
        │   │           └── out/persistence/
        │   └── resources/
        │       └── application.yaml
        └── test/
            ├── java/{package}/{module}/
            │   ├── domain/aggregates/{Aggregate}/
            │   │   └── {Aggregate}Test.java          # unit test
            │   ├── application/usecases/{aggregate}/
            │   │   ├── create/Create{Aggregate}UseCaseTest.java
            │   │   ├── update/Update{Aggregate}UseCaseTest.java
            │   │   └── delete/Delete{Aggregate}UseCaseTest.java
            │   ├── bdd/
            │   │   ├── CucumberRunner.java
            │   │   └── {Aggregate}Steps.java         # Cucumber step definitions
            │   └── e2e/
            │       ├── BaseE2ETest.java               # Playwright base class
            │       └── {Aggregate}E2ETest.java        # Playwright tests
            └── resources/features/{module}/
                └── {Aggregate}.feature               # Gherkin scenarios
```

## Overwrite behaviour

Modux distinguishes between **generated files** (which are always overwritten) and **custom files** (which are never overwritten). You can configure per-file overwrite behaviour:

| Mode | Description |
|---|---|
| `ALWAYS` | File is regenerated on every run (safe for pure boilerplate) |
| `NEVER` | File is only created once; your customisations are preserved |
| `IF_CHANGED` | File is regenerated only if the spec has changed |

Use `NEVER` for files where you will add business logic. Use `ALWAYS` for pure structural code.

## Building the generated project

After generation:

```bash
cd {output-path}
mvn clean install
```

## Running the generated application

```bash
cd {service-name}
mvn spring-boot:run
```

The application starts at `http://localhost:{port}` with a fully working CRUD UI for all your aggregates.

## Re-generating after changes

You can run the generator at any time after modifying your spec. Files configured as `NEVER` will not be overwritten, so your custom business logic is safe.

Recommended workflow:

1. Define aggregates and operations in Modux
2. Generate code
3. Implement business logic in custom files (use cases, domain services)
4. If the spec changes, re-generate — only the structural files are updated

## E2E tests with Playwright

Every aggregate gets a `BaseE2ETest` (per module) and a concrete `{Aggregate}E2ETest` with canned CRUD scenarios. E2E tests are tagged `e2e` and excluded from the normal build — run them explicitly against a live app:

```bash
# Start the app, then in another terminal:
mvn test -Dgroups=e2e -De2e.base-url=http://localhost:8080

# Open browser for visual debugging
mvn test -Dgroups=e2e -De2e.headed=true
```

See [E2E Tests with Playwright](/manual/e2e-tests/) for the full guide.

## AI-assisted completion

The generator produces skeletons with `// TODO` comments in places where domain logic cannot be derived from the spec alone: invariant bodies, operation preconditions, and BDD step implementations.

Run `mvn modux:ai-complete` after generation to get AI-generated proposals for those gaps:

```bash
export ANTHROPIC_API_KEY=sk-ant-...
mvn modux:generate -Dmodux.projectId=my-project-id
mvn modux:ai-complete -Dmodux.projectId=my-project-id
# → generated/proposals/{module}/AI-PROPOSALS.md
```

See [AI-Assisted Code Completion](/manual/ai-completion/) for the full guide.

## Troubleshooting

**Generated files have compilation errors**

Check that all field types reference valid Java types or other aggregates defined in your spec. Cross-aggregate references must use the other aggregate's ID type.

**Output directory is empty**

Ensure the output path exists and that the Modux process has write permissions to it.

**Fields are missing in the generated code**

Verify the field types are supported. Use `String`, `Integer`, `Long`, `Boolean`, `LocalDate`, `LocalDateTime`, `BigDecimal`, `Enum`, or `ValueObject`.
