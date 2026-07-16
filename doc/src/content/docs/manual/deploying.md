---
title: Deploying
description: One click from the model to a running Kubernetes deployment — images, manifests, DNS
---

Next to the **Generar** button on the header sits the **🚀 Desplegar** menu — the whole
delivery pipeline under one button: **Desplegar en Kubernetes**, **Aplicar Terraform**
and **Probar** (the latter only when the project declares a URL). The header actions
appear only when the whole app context (repository · project · model) is resolved.

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
4. A **local registry** answering at `localhost:5000` (`docker run -d -p 5000:5000
   registry:2`) — the zero-config default for the local loop: push and pull never
   leave the machine, no credentials, no pull secret. k3s needs it allowed as an
   insecure registry in `/etc/rancher/k3s/registries.yaml`. Useless for a REMOTE
   cluster (it cannot see your localhost): declare a real registry when you target
   one.

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

## Identity: the model's IdP becomes OIDC login

Declare an **IdP** element (Estratégico palette) with its **issuer** URI — e.g. a
[Cloud-IAM](https://cloud-iam.com) managed Keycloak realm,
`https://<cluster>.cloud-iam.com/auth/realms/<realm>` — and connect it to the **App**.
Generation then wires the whole chain:

- the app gains `spring-boot-starter-oauth2-client` and a **`secure` Spring profile**:
  OIDC login against the issuer, and Keycloak realm roles (`realm_access.roles`) mapped
  to the generated `ROLE_*` authorities;
- **without the `secure` profile the app boots OPEN** — local runs and CI never depend
  on the IdP being reachable;
- the Kubernetes manifests activate `secure` and read the client credentials from the
  **`modux-idp-credentials`** secret — required: without it the pod stops at
  `CreateContainerConfigError` instead of crash-looping on an unresolvable placeholder:

```bash
kubectl create secret generic modux-idp-credentials \
  --from-literal=client-id=<client> --from-literal=client-secret=<secret>
```

Create the client in your realm (confidential, redirect URI
`https://<your-url>/login/oauth2/code/*`) and the login page is Keycloak's.

## Terraform: the infrastructure around the cluster

With `terraformProvider: Hetzner` on the project, the generated `terraform/main.tf`
is no longer a skeleton:

- the **hcloud** provider, token via `var.hcloud_token`, ready for the Hetzner
  resources around your cluster (volumes, load balancers, extra nodes);
- when the distribution map declares **URLs**, the **cloudflare** provider plus one
  `cloudflare_record` per URL host, pointing at `var.ingress_ip` — your DNS follows
  the model.

**Aplicar Terraform** (in the Desplegar menu) runs `terraform init` + `terraform apply
-auto-approve` on the generated `terraform/` folder, streaming progress to the same
dialog the deploy uses; the full output lands in `<outputPath>/.modux/terraform.log`.
Prerequisites and conventions:

- **terraform** (or its drop-in **OpenTofu**, `tofu`) installed on the machine running
  Modux — missing binary fails with a clear message.
- **Variables** travel the terraform way: keep a `terraform.tfvars` next to the
  generated `main.tf` (git-ignore it: it holds tokens), or export `TF_VAR_*` in Modux's
  environment. Everything runs with `-input=false`, so a missing variable fails loudly
  instead of hanging on an invisible prompt.

The cluster itself is expected to exist already (e.g. Cloudfleet-managed): Modux
deploys ONTO it and reconciles the infrastructure AROUND it (DNS records, volumes…),
it does not provision the cluster.

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
