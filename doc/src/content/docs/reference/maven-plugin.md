---
title: Maven Plugin Reference
description: Configuration reference for the modux-maven-plugin
---

The `modux-maven-plugin` lets you trigger Modux code generation from any Maven build — without running the Modux UI. It shares the same generation logic as the UI-driven generator, so any templates added to `spec-driven-generator` take effect automatically without any plugin changes.

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
| `specFile` | `modux.specFile` | `${project.basedir}/.dev/data/spec-driven-store.yaml` | No | Absolute path to the YAML spec file |
| `outputPath` | `modux.outputPath` | `${project.basedir}/generated` | No | Directory where generated code is written |
| `packageName` | `modux.packageName` | `com.example` | No | Root Java package for generated classes |
| `sourceOnly` | `modux.sourceOnly` | `false` | No | When `true`, skips POMs and DevOps artifacts; generates Java sources only |

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
        <specFile>${project.basedir}/.dev/data/spec-driven-store.yaml</specFile>
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

Because all generation logic lives in `spec-driven-generator`, **adding new templates or domain concepts never requires changes to the plugin itself**.

## Building the plugin locally

The plugin is part of the Modux monorepo. After cloning:

```bash
# Install spec-driven-generator thin JAR to local Maven repo
cd spec-driven-generator
mvn install -DskipTests

# Build and install the plugin
cd ../plugin
mvn install
```
