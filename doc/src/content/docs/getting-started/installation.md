---
title: Installation
description: How to install and run Modux
---

## Requirements

- Java 21 or later
- Maven 3.8 or later
- Node.js (for the UI layer of the generator)

## Clone the repository

```bash
git clone https://github.com/miguelperezcolom/modux.git
cd modux
```

## Build the project

```bash
mvn clean install -DskipTests
```

## Run the generator

```bash
cd spec-driven-generator
mvn spring-boot:run
```

The Modux UI will be available at `http://localhost:8080`.

## Project structure

```
modux/
├── spec-driven-generator/   # Main generator application (Spring Boot + Vaadin UI)
├── plugin/                  # Maven plugin (experimental)
├── sample/poc-sagas/        # Example generated application
├── io/                      # Shared UIDL types
└── doc/                     # This documentation site
```

## Next steps

Follow the [Quick Start](/getting-started/quick-start/) to generate your first project.
