---
title: Maven Plugin Reference
description: Configuration reference for the modux-maven-plugin
---

The `modux-maven-plugin` lets you trigger Modux code generation from any Maven build — without running the Modux UI. It shares the same generation logic as the UI-driven generator, so any templates added to `model-driven-generator` take effect automatically without any plugin changes.

## Coordinates

```xml
<groupId>io.mateu.modux</groupId>
<artifactId>modux-maven-plugin</artifactId>
<version>0.0.1-SNAPSHOT</version>
```

## Goal: `generate`

**Default phase:** `generate-sources`

Reads the spec file, loads the project identified by `projectId`, and generates all code into `outputPath`.

### Parameters

| Parameter | Property | Default | Required | Description |
|---|---|---|---|---|
| `projectId` | `modux.projectId` | — | **Yes** | ID of the project to generate, as defined in the spec store |
| `specFile` | `modux.specFile` | `${project.basedir}/.dev/data/model-driven-store.yaml` | No | Absolute path to the YAML spec file |
| `outputPath` | `modux.outputPath` | `${project.basedir}/generated` | No | Directory where generated code is written |
| `packageName` | `modux.packageName` | `com.example` | No | Root Java package for generated classes |
| `sourceOnly` | `modux.sourceOnly` | `false` | No | When `true`, skips the DevOps/IaC artifacts (Dockerfile, Kubernetes manifests, docker-compose, CI workflow, Terraform); generates the Maven project and Java sources only |

### Minimal configuration

```xml
<plugin>
    <groupId>io.mateu.modux</groupId>
    <artifactId>modux-maven-plugin</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <configuration>
        <projectId>my-project-id</projectId>
    </configuration>
    <executions>
        <execution>
            <goals><goal>generate</goal></goals>
        </execution>
    </executions>
</plugin>
```

### Full configuration example

```xml
<plugin>
    <groupId>io.mateu.modux</groupId>
    <artifactId>modux-maven-plugin</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <configuration>
        <projectId>acme-platform</projectId>
        <specFile>${project.basedir}/.dev/data/model-driven-store.yaml</specFile>
        <outputPath>${project.basedir}/generated</outputPath>
        <packageName>com.acme.platform</packageName>
        <sourceOnly>false</sourceOnly>
    </configuration>
    <executions>
        <execution>
            <goals><goal>generate</goal></goals>
        </execution>
    </executions>
</plugin>
```

## Goal: `ai-complete`

**Default phase:** none (run explicitly)

Reads the spec, calls the Claude AI API for each bounded context, and writes `AI-PROPOSALS.md` files with ready-to-paste Java implementations for the parts the generator cannot derive automatically.

### Parameters

| Parameter | Property | Default | Required | Description |
|---|---|---|---|---|
| `projectId` | `modux.projectId` | — | **Yes** | ID of the project in the spec store |
| `specFile` | `modux.specFile` | `${project.basedir}/.dev/data/model-driven-store.yaml` | No | Path to the YAML spec file |
| `outputPath` | `modux.outputPath` | `${project.basedir}/generated` | No | Root directory; proposals go to `{outputPath}/proposals/` |
| `packageName` | `modux.packageName` | `com.example` | No | Root Java package (used in generated prompts) |
| `apiKey` | `modux.apiKey` | — | No* | Anthropic API key. Falls back to `ANTHROPIC_API_KEY` env var |
| `model` | `modux.model` | `claude-haiku-4-5-20251001` | No | Claude model to use for completions |

*Required via `modux.apiKey` or `ANTHROPIC_API_KEY` environment variable.

### Usage

```bash
# API key from environment (recommended)
export ANTHROPIC_API_KEY=sk-ant-...
mvn modux:ai-complete -Dmodux.projectId=my-project-id

# Override model for complex domains
mvn modux:ai-complete \
  -Dmodux.projectId=my-project-id \
  -Dmodux.model=claude-sonnet-4-6
```

### What it proposes

- `checkInvariants()` body — derived from `InvariantConditionEntity.expression` and `errorMessage`
- `check{Op}Preconditions()` body — derived from `OperationEntity.preconditions` text
- Cucumber step bodies — derived from `BddScenarioEntity.steps` and aggregate field context

See [AI-Assisted Code Completion](/manual/ai-completion/) for the full guide.

## Goal: `import-openapi`

**Default phase:** none (run explicitly)

Reads an OpenAPI 3.x YAML or JSON file and upserts `GatewayEntity` + `GatewayOperationEntity` entries into the spec store.

### Parameters

| Parameter | Property | Default | Required | Description |
|---|---|---|---|---|
| `filePath` | `modux.filePath` | — | **Yes** | Path to the OpenAPI YAML or JSON file |
| `specFile` | `modux.specFile` | `${project.basedir}/.dev/data/model-driven-store.yaml` | No | Path to the YAML spec store |
| `serviceId` | `modux.serviceId` | — | No | Service ID to link the imported gateway to |

### Usage

```bash
mvn modux:import-openapi \
  -Dmodux.filePath=apis/payments.yaml \
  -Dmodux.serviceId=my-service-id
```

See [Importing Existing Specs](/manual/importers/) for the full guide.

## Goal: `import-asyncapi`

**Default phase:** none (run explicitly)

Reads an AsyncAPI 2.x YAML file and upserts `DomainEventEntity` (publish channels) and `SubscriptionEntity` (subscribe channels) into the spec store.

### Parameters

| Parameter | Property | Default | Required | Description |
|---|---|---|---|---|
| `filePath` | `modux.filePath` | — | **Yes** | Path to the AsyncAPI YAML file |
| `specFile` | `modux.specFile` | `${project.basedir}/.dev/data/model-driven-store.yaml` | No | Path to the YAML spec store |
| `boundedContextId` | `modux.boundedContextId` | — | No | Bounded context ID that owns these events/subscriptions |

### Usage

```bash
mvn modux:import-asyncapi \
  -Dmodux.filePath=events/orders-events.yaml \
  -Dmodux.boundedContextId=my-context-id
```

See [Importing Existing Specs](/manual/importers/) for the full guide.

## Running from the command line

```bash
# Use defaults from pom.xml configuration
mvn modux:generate

# Override any parameter on the fly
mvn modux:generate \
  -Dmodux.projectId=acme-platform \
  -Dmodux.outputPath=/tmp/generated \
  -Dmodux.packageName=com.acme
```

## How it works

The plugin boots a minimal Spring `AnnotationConfigApplicationContext` containing only two beans:

- `CommonFileRepository` — reads and deserialises the YAML spec file
- `GenerateCodeUseCase` — renders all Freemarker templates and writes the output files

No Spring Boot auto-configuration or embedded server is started. The plugin then calls `GenerateCodeUseCase.handle()` and shuts the context down.

Because all generation logic lives in `model-driven-generator`, **adding new templates or domain concepts never requires changes to the plugin itself**.

## Building the plugin locally

The plugin is part of the Modux monorepo. After cloning:

```bash
# Install model-driven-generator thin JAR to local Maven repo
cd model-driven-generator
mvn install -DskipTests

# Build and install the plugin
cd ../plugin
mvn install
```
