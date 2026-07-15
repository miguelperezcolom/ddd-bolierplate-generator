---
title: Deploying
description: One click from the model to a running Kubernetes deployment — images, manifests, DNS
---

Next to the **Generar** button on the header sits **🚀 Desplegar**: it takes the CURRENT
project from model to cluster in one action. Both buttons appear only when the whole
app context (repository · project · model) is resolved.

## What the pipeline does

1. **Regenerates** the project to its output path — you always deploy what the model says.
2. **Packages each service locally** (`mvn package`). The build runs on your machine, not
   inside Docker, so it resolves dependencies from your local `~/.m2` (including
   locally-installed frameworks that no public repository serves).
3. **Builds a runtime image** per service — a slim `eclipse-temurin` JRE layer with the
   packaged jar — and **pushes** it to the configured registry.
4. **Applies the generated Kubernetes manifests** (`Deployment`, `Service`, and an
   `Ingress` per declared URL) with `kubectl`, against the environment's kubeconfig
   context. The namespace is created on first deploy.

The action returns immediately; the pipeline runs in the background and streams every
command and its output to `<outputPath>/.modux/deploy.log`, ending with a
`Despliegue COMPLETADO` or `Despliegue FALLIDO: <reason>` line.

## Prerequisites

- **docker** logged in to your registry (`docker login`).
- **kubectl** with a working context for the target cluster (e.g. the one the
  [Cloudfleet](https://cloudfleet.ai) CLI installs for a managed cluster).

## Configuration

### Image registry

Resolution order — the first non-empty wins, and a missing registry fails **before**
the pipeline starts:

1. `dockerImageRegistry` on the **service**.
2. `dockerRegistry` on the **project** (its ficha) — e.g. `docker.io/<user>`.
3. The `-Dmodux.docker.registry=docker.io/<user>` system property (or the
   `MODUX_DOCKER_REGISTRY` environment variable) on the Modux instance.

The image name is the service's `dockerImageName`, defaulting to the service name
slug; everything is tagged `latest`.

### Target cluster

The project's **environment** (Project ficha → Environments) decides where the
manifests land:

| Field | Meaning | Default when empty |
|-------|---------|--------------------|
| `kubernetesContext` | kubeconfig context to use | your current `kubectl` context |
| `kubernetesNamespace` | namespace for the project's workloads (created on first deploy) | the kubeconfig context's default namespace |

With no environment declared at all, the deploy uses those defaults — which means
**the first click already targets your current kubectl context**. Declare the
environment explicitly if that makes you nervous.

### Projects without services

A project with contexts but no declared service deploys through the same
[synthesized default service](/manual/generating-code/) generation uses: one service,
named after the project, deploying every context of the project.

## Terraform: the infrastructure around the cluster

With `terraformProvider: Hetzner` on the project, the generated `terraform/main.tf`
is no longer a skeleton:

- the **hcloud** provider, token via `var.hcloud_token`, ready for the Hetzner
  resources around your cluster (volumes, load balancers, extra nodes);
- when the distribution map declares **URLs**, the **cloudflare** provider plus one
  `cloudflare_record` per URL host, pointing at `var.ingress_ip` — your DNS follows
  the model.

Modux does not run `terraform apply` yet; the files are generated for you to review
and apply. The cluster itself is expected to exist already (e.g. Cloudfleet-managed):
Modux deploys ONTO it, it does not provision it.

## Troubleshooting

- **`Sin registry de imágenes para «…»`** — configure the registry at any of the three
  levels above; the message lists them.
- **Pod `Pending` with `disk-pressure`** — the pipeline worked; the NODE is out of
  disk. Kubernetes untaints it a few minutes after you free space past its eviction
  threshold (10% by default).
- **The generated `.java` files come out unformatted** — the JVM running Modux lacks
  the `--add-exports jdk.compiler/...` options google-java-format needs. Modux warns
  once with the exact list; `mvn spring-boot:run` already includes them, IDE run
  configurations usually don't.
