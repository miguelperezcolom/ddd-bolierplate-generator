---
title: Installation
description: How to install and run Modux — local standalone, Docker, or Kubernetes with Helm
---

Modux runs in two worlds with the same binary:

- **Local, against your disk** — the home (`~/.modux`) catalogs LOCAL/GIT repositories.
- **Server, against a database** — a DATABASE repository (PostgreSQL); the catalog
  seeds itself on first boot.

## Requirements

- Java 21 or later and Maven 3.8+ (to build the jar — the runtime image is jar-only)
- Docker, only for the container variants

## Local standalone (the comfortable way)

```bash
git clone https://github.com/miguelperezcolom/modux.git
cd modux
./install.sh            # builds the jar and drops a `modux` launcher in ~/.local/bin
modux                   # → http://localhost:8192
```

`MODUX_PORT` and `MODUX_HOME` vary the port and the home directory. The variant
`./install.sh --docker` builds the runtime image instead, and the launcher runs the
container with `~/.modux` mounted as home.

For development straight from the sources:

```bash
cd model-driven-generator
mvn spring-boot:run     # same app, same port 8192
```

## Docker image

The jar is built on the host (the paired mateu artifacts live in your `~/.m2`):

```bash
mvn -f model-driven-generator/pom.xml package -DskipTests
docker build -t modux:dev .

# against the filesystem:
docker run -p 8192:8192 -v ~/.modux:/data/modux-home modux:dev

# against a database:
docker run -p 8192:8192 \
  -e MODUX_BOOTSTRAP_DB='jdbc:postgresql://host:5432/modux' \
  -e MODUX_DB_USER=modux -e MODUX_DB_PASSWORD=… modux:dev
```

## Kubernetes (Helm): Modux + PostgreSQL together

The chart lives at [`deploy/chart/modux`](https://github.com/miguelperezcolom/modux/tree/main/deploy/chart/modux):

```bash
cd deploy/chart/modux
helm dependency update
helm install modux . --namespace modux --create-namespace
```

For an external database: `--set postgresql.enabled=false
--set externalDatabase.jdbcUrl=jdbc:postgresql://…`. The image must be visible to the
cluster (push it to your registry and `--set image.repository=…`; on a local k3s,
`docker save modux:dev | sudo k3s ctr images import -` also works). The first boot
against a database seeds the repositories catalog (`MODUX_BOOTSTRAP_DB`, with
`MODUX_DB_USER` / `MODUX_DB_PASSWORD`).

## Project structure

```
modux/
├── model-driven-generator/   # Main generator application (Spring Boot + Mateu UI)
├── editor/                   # The graphical editor (Lit web component)
├── deploy/chart/modux/       # Helm chart (Modux + Bitnami PostgreSQL)
├── plugin/                   # Maven plugin (experimental)
├── sample/                   # Example models and generated applications
└── doc/                      # This documentation site
```

## Next steps

Follow the [Quick Start](/getting-started/quick-start/) to generate your first project.
