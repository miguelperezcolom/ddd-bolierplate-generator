package io.mateu.modux.modeldrivengenerator.application.usecases.project.deploy;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.generatecode.GenerateCodeCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.generatecode.GenerateCodeUseCase;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEnvironmentConfigEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ServiceEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Deploys the CURRENT state of a project to its Kubernetes environment: regenerate,
 * package each service locally (the local ~/.m2 holds the mateu jars docker could not
 * resolve), build a runtime image, push it, and kubectl-apply the generated manifests
 * against the environment's kubeconfig context. Runs in the background; progress goes
 * to {@code <outputPath>/.modux/deploy.log}.
 *
 * <p>First target: an existing Cloudfleet-managed cluster (Hetzner nodes) reachable
 * through a kubeconfig context, images on Docker Hub. Terraform enters later, for the
 * infrastructure AROUND the cluster (DNS on Cloudflare, volumes, load balancers).
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class DeployProjectUseCase {

    private final GenerateCodeUseCase generateCodeUseCase;
    private final ModelStore repository;

    /**
     * Launches the deployment and returns a {@link io.mateu.uidl.data.LongTask} flux:
     * a modal progress dialog opens with the action, each pipeline step updates its
     * text and bar, and on completion the declared URL opens in a new tab
     * ({@code UICommand.navigateTo}). A failure aborts the closing segment, so the
     * dialog keeps the failing step and the URL never opens on a broken deploy.
     * The full command output stays in {@code <outputPath>/.modux/deploy.log}.
     */
    public reactor.core.publisher.Flux<?> handle(DeployProjectCommand command) {
        var project = repository.findById(command.projectId(), ProjectEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Proyecto desconocido: " + command.projectId()));
        var services = generateCodeUseCase.effectiveServices(project);
        if (services.isEmpty()) {
            throw new IllegalStateException(
                    "El proyecto no tiene nada que desplegar: ni servicios declarados ni contextos que sintetizar");
        }
        // Registry resolved UP FRONT so misconfiguration fails in the caller's face,
        // not minutes later inside the background log.
        for (var service : services) {
            registryFor(service, project);
        }
        var environment = environmentFor(project, command.environment());
        var outputPath = expandTilde(project.outputPath());
        var logFile = Path.of(outputPath, ".modux", "deploy.log");
        var url = firstDeclaredUrl(services);

        var task = io.mateu.uidl.data.LongTask
                .create("Desplegando «" + project.name() + "»")
                .withProgressBar()
                .done("Despliegue completado",
                        url != null ? "Abriendo " + url + "…" : "Manifiestos aplicados en el cluster")
                .closeAfter(4);
        if (url != null) {
            task.withCommand(io.mateu.uidl.data.UICommand.navigateTo(url));
        }
        return task.run(progress -> deployFlux(project, services, environment, outputPath, logFile, progress));
    }

    /** The first URL the services declare — where the finished deploy opens. */
    private String firstDeclaredUrl(List<ServiceEntity> services) {
        return services.stream()
                .flatMap(sv -> sv.urlIds().stream())
                .map(id -> repository.findById(id,
                        io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UrlEntity.class).orElse(null))
                .filter(java.util.Objects::nonNull)
                .map(u -> u.url() != null && !u.url().isBlank() ? u.url().trim() : u.name().trim())
                .filter(raw -> !raw.isBlank())
                .map(raw -> raw.matches("^[a-z][a-z0-9+.-]*://.*") ? raw : "http://" + raw)
                .findFirst()
                .orElse(null);
    }

    private reactor.core.publisher.Flux<Object> deployFlux(
            ProjectEntity project, List<ServiceEntity> services,
            ProjectEnvironmentConfigEntity environment, String outputPath, Path logFile,
            io.mateu.uidl.data.ProgressReporter progress) {
        var sink = reactor.core.publisher.Sinks.many().unicast().<Object>onBackpressureBuffer();
        var thread = new Thread(() -> run(project, services, environment, outputPath, logFile, sink, progress),
                "modux-deploy-" + project.name());
        thread.setDaemon(true);
        thread.start();
        return sink.asFlux();
    }

    private void run(ProjectEntity project, List<ServiceEntity> services,
                     ProjectEnvironmentConfigEntity environment, String outputPath, Path logFile,
                     reactor.core.publisher.Sinks.Many<Object> sink,
                     io.mateu.uidl.data.ProgressReporter progress) {
        // dialog fractions: regenerate + 4 steps per service
        var totalSteps = 1 + services.size() * 4;
        var stepCount = new java.util.concurrent.atomic.AtomicInteger();
        try {
            Files.createDirectories(logFile.getParent());
            Files.writeString(logFile, "── Despliegue de «" + project.name() + "» — " + LocalDateTime.now() + "\n");
            milestone(sink, progress, logFile, stepCount.incrementAndGet(), totalSteps,
                    "Regenerando el proyecto…");
            generateCodeUseCase.handle(new GenerateCodeCommand(project.id(), null, null, false));

            // Without an explicit namespace the deploy RESPECTS the kubeconfig context's
            // default one (kubectl without -n) instead of inventing a per-project namespace.
            var context = environment.kubernetesContext() != null && !environment.kubernetesContext().isBlank()
                    ? environment.kubernetesContext() : null;
            var namespace = environment.kubernetesNamespace() != null && !environment.kubernetesNamespace().isBlank()
                    ? environment.kubernetesNamespace() : null;
            append(logFile, "Contexto kubectl: " + (context != null ? context : "(el actual)")
                    + " · namespace: " + (namespace != null ? namespace : "(el del contexto)"));

            for (var service : services) {
                var serviceSlug = slug(service.name());
                var serviceDir = Path.of(outputPath, serviceSlug);
                var image = registryFor(service, project) + "/" + imageNameFor(service) + ":latest";

                append(logFile, "── " + service.name() + " → " + image);
                milestone(sink, progress, logFile, stepCount.incrementAndGet(), totalSteps,
                        "«" + service.name() + "»: compilando y empaquetando…");
                exec(logFile, serviceDir, "mvn", "-B", "-q", "package", "-DskipTests");

                // A runtime-only image: the build already happened locally with ~/.m2
                // (the generated multi-stage Dockerfile stays for CI environments that
                // can resolve every dependency remotely).
                var dockerfile = serviceDir.resolve(".modux-deploy.Dockerfile");
                Files.writeString(dockerfile, """
                        FROM eclipse-temurin:%s-jre
                        WORKDIR /app
                        RUN groupadd --system app && useradd --system --gid app app
                        COPY %s-app/target/*.jar /app/app.jar
                        USER app
                        EXPOSE %d
                        ENV JAVA_OPTS=""
                        ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]
                        """.formatted(service.javaVersion() != null ? service.javaVersion() : "21",
                        serviceSlug, service.port() != null ? service.port() : 8080));
                milestone(sink, progress, logFile, stepCount.incrementAndGet(), totalSteps,
                        "«" + service.name() + "»: construyendo la imagen…");
                exec(logFile, serviceDir, "docker", "build", "-f", dockerfile.toString(),
                        "-t", image, serviceDir.toString());
                milestone(sink, progress, logFile, stepCount.incrementAndGet(), totalSteps,
                        "«" + service.name() + "»: subiendo " + image + "…");
                exec(logFile, serviceDir, "docker", "push", image);

                milestone(sink, progress, logFile, stepCount.incrementAndGet(), totalSteps,
                        "«" + service.name() + "»: aplicando manifiestos en "
                                + (context != null ? context : "el contexto actual") + " · "
                                + (namespace != null ? namespace : "su namespace por defecto") + "…");
                var kubectlBase = context != null
                        ? new String[]{"kubectl", "--context", context}
                        : new String[]{"kubectl"};
                execKubectl(logFile, serviceDir, kubectlBase, namespace, serviceDir.resolve("k8s").toString());
            }
            append(logFile, "── Despliegue COMPLETADO — " + LocalDateTime.now());
            sink.tryEmitComplete();
        } catch (Exception e) {
            try {
                append(logFile, "── Despliegue FALLIDO: " + e.getMessage());
            } catch (RuntimeException ignored) {
                // the log itself failed; the outer log below still records it
            }
            // The step shows the failure in the dialog; erroring the flux ABORTS the
            // LongTask closing segment: no «done», and the URL never opens.
            sink.tryEmitNext(progress.step(
                    "FALLIDO: " + e.getMessage() + " — detalle en " + logFile,
                    "Despliegue fallido"));
            sink.tryEmitError(new IllegalStateException(
                    "Despliegue de «" + project.name() + "» fallido: " + e.getMessage()));
            log.error("despliegue de {} fallido", project.name(), e);
        }
    }

    /** A progress line: to the log AND to the dialog (text + bar fraction). */
    private void milestone(reactor.core.publisher.Sinks.Many<Object> sink,
                           io.mateu.uidl.data.ProgressReporter progress, Path logFile,
                           int step, int totalSteps, String text) {
        append(logFile, text);
        sink.tryEmitNext(progress.step(text, step / (double) totalSteps));
    }

    private void execKubectl(Path logFile, Path workDir, String[] kubectlBase,
                             String namespace, String manifestsDir) {
        // An EXPLICIT namespace is created on first deploy; a null one means the
        // kubeconfig context's default — never created, never passed with -n.
        if (namespace != null) {
            var ensureNs = new java.util.ArrayList<>(List.of(kubectlBase));
            ensureNs.addAll(List.of("create", "namespace", namespace,
                    "--dry-run=client", "-o", "yaml"));
            var apply = new java.util.ArrayList<>(List.of(kubectlBase));
            apply.addAll(List.of("apply", "-f", "-"));
            execPiped(logFile, workDir, ensureNs, apply);
        }

        // Private registries: the local docker login becomes the pod's pull secret
        // (the generated manifests reference modux-regcred; absent = public pull).
        var dockerConfig = Path.of(System.getProperty("user.home"), ".docker", "config.json");
        if (Files.exists(dockerConfig)) {
            var ensureSecret = new java.util.ArrayList<>(List.of(kubectlBase));
            ensureSecret.addAll(namespaced(namespace, List.of("create", "secret", "generic", "modux-regcred",
                    "--from-file=.dockerconfigjson=" + dockerConfig,
                    "--type=kubernetes.io/dockerconfigjson",
                    "--dry-run=client", "-o", "yaml")));
            var applySecret = new java.util.ArrayList<>(List.of(kubectlBase));
            applySecret.addAll(namespaced(namespace, List.of("apply", "-f", "-")));
            execPiped(logFile, workDir, ensureSecret, applySecret);
        }

        var applyManifests = new java.util.ArrayList<>(List.of(kubectlBase));
        applyManifests.addAll(namespaced(namespace, List.of("apply", "-f", manifestsDir)));
        exec(logFile, workDir, applyManifests.toArray(String[]::new));
    }

    /** The kubectl arguments, prefixed with -n only when a namespace was declared. */
    private static List<String> namespaced(String namespace, List<String> args) {
        if (namespace == null) return args;
        var out = new java.util.ArrayList<String>(List.of("-n", namespace));
        out.addAll(args);
        return out;
    }

    // ─── process plumbing ────────────────────────────────────────────────────

    private void exec(Path logFile, Path workDir, String... command) {
        append(logFile, "$ " + String.join(" ", command));
        try {
            var process = new ProcessBuilder(command)
                    .directory(workDir.toFile())
                    .redirectErrorStream(true)
                    .start();
            process.getInputStream().transferTo(new java.io.OutputStream() {
                private final StringBuilder line = new StringBuilder();
                @Override public void write(int b) {
                    if (b == '\n') {
                        append(logFile, "  " + line);
                        line.setLength(0);
                    } else {
                        line.append((char) b);
                    }
                }
            });
            if (!process.waitFor(30, java.util.concurrent.TimeUnit.MINUTES) || process.exitValue() != 0) {
                throw new IllegalStateException("Falló: " + String.join(" ", command));
            }
        } catch (IOException | InterruptedException e) {
            if (e instanceof InterruptedException) Thread.currentThread().interrupt();
            throw new IllegalStateException("Falló: " + String.join(" ", command), e);
        }
    }

    private void execPiped(Path logFile, Path workDir, List<String> producer, List<String> consumer) {
        append(logFile, "$ " + String.join(" ", producer) + " | " + String.join(" ", consumer));
        try {
            var pipeline = ProcessBuilder.startPipeline(List.of(
                    new ProcessBuilder(producer).directory(workDir.toFile()),
                    new ProcessBuilder(consumer).directory(workDir.toFile()).redirectErrorStream(true)));
            var last = pipeline.get(pipeline.size() - 1);
            var output = new String(last.getInputStream().readAllBytes());
            if (!output.isBlank()) append(logFile, "  " + output.trim());
            if (!last.waitFor(2, java.util.concurrent.TimeUnit.MINUTES) || last.exitValue() != 0) {
                throw new IllegalStateException("Falló: " + String.join(" ", consumer));
            }
        } catch (IOException | InterruptedException e) {
            if (e instanceof InterruptedException) Thread.currentThread().interrupt();
            throw new IllegalStateException("Falló el pipeline kubectl", e);
        }
    }

    // ─── resolution helpers ──────────────────────────────────────────────────

    /**
     * The image registry/user prefix: the service's own, or the instance-wide default
     * ({@code -Dmodux.docker.registry=docker.io/<user>}). Failing loudly here beats a
     * broken push minutes into the pipeline.
     */
    private String registryFor(ServiceEntity service, ProjectEntity project) {
        if (service.dockerImageRegistry() != null && !service.dockerImageRegistry().isBlank()) {
            return trimSlash(service.dockerImageRegistry());
        }
        if (project.dockerRegistry() != null && !project.dockerRegistry().isBlank()) {
            return trimSlash(project.dockerRegistry());
        }
        var fallback = System.getProperty("modux.docker.registry", System.getenv("MODUX_DOCKER_REGISTRY"));
        if (fallback != null && !fallback.isBlank()) {
            return trimSlash(fallback);
        }
        throw new IllegalStateException(
                "Sin registry de imágenes para «" + service.name() + "»: configura el registry en la ficha"
                        + " del proyecto (dockerRegistry, p. ej. docker.io/<usuario>), en el servicio, o"
                        + " arranca modux con -Dmodux.docker.registry=docker.io/<usuario>");
    }

    private String imageNameFor(ServiceEntity service) {
        return service.dockerImageName() != null && !service.dockerImageName().isBlank()
                ? service.dockerImageName() : slug(service.name());
    }

    private ProjectEnvironmentConfigEntity environmentFor(ProjectEntity project, String name) {
        var environments = project.environments() == null
                ? List.<ProjectEnvironmentConfigEntity>of() : project.environments();
        return environments.stream()
                .filter(e -> name == null || name.isBlank() || name.equalsIgnoreCase(e.environment()))
                .findFirst()
                .orElseGet(() -> ProjectEnvironmentConfigEntity.builder().environment("default").build());
    }

    private static String slug(String name) {
        return name.toLowerCase().replaceAll("[^a-z0-9]", "-").replaceAll("-+", "-");
    }

    private static String trimSlash(String s) {
        return s.endsWith("/") ? s.substring(0, s.length() - 1) : s;
    }

    private static String expandTilde(String path) {
        var trimmed = path == null ? "" : path.trim();
        if (trimmed.equals("~") || trimmed.startsWith("~/")) {
            return System.getProperty("user.home") + trimmed.substring(1);
        }
        return trimmed;
    }

    private static synchronized void append(Path logFile, CharSequence line) {
        try {
            Files.writeString(logFile, line + "\n", StandardOpenOption.CREATE, StandardOpenOption.APPEND);
        } catch (IOException e) {
            throw new java.io.UncheckedIOException(e);
        }
    }
}
