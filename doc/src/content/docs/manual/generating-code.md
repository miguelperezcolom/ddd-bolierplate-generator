---
title: Generating Code
description: How to run the Modux code generator
---

Once you have defined your domain model in the Modux UI, you can generate the full Spring Boot project at any time.

## Running the generator

1. Open your **Project** in the Modux UI
2. Click the **Generate Code** button
3. Modux processes all aggregates, events, and other concepts in your project
4. The generated code is written to the **Output path** you configured on the project

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

## Troubleshooting

**Generated files have compilation errors**

Check that all field types reference valid Java types or other aggregates defined in your spec. Cross-aggregate references must use the other aggregate's ID type.

**Output directory is empty**

Ensure the output path exists and that the Modux process has write permissions to it.

**Fields are missing in the generated code**

Verify the field types are supported. Use `String`, `Integer`, `Long`, `Boolean`, `LocalDate`, `LocalDateTime`, `BigDecimal`, `Enum`, or `ValueObject`.
