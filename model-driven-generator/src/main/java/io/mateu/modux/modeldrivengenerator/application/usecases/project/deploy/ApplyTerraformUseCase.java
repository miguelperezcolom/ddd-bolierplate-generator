package io.mateu.modux.modeldrivengenerator.application.usecases.project.deploy;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DeploymentEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * The header's «Aplicar Terraform»: reconciles the generated {@code terraform/} folder
 * against the project's infrastructure provider — init + apply, streamed to the same
 * LongTask dialog the deploy uses, with the full output in
 * {@code <outputPath>/.modux/terraform.log}.
 *
 * <p>Variables travel the terraform way: a {@code terraform.tfvars} the developer keeps
 * next to {@code main.tf} (git-ignored), or {@code TF_VAR_*} in Modux's environment.
 * {@code -input=false} everywhere: a missing variable fails loudly in the dialog instead
 * of hanging on an invisible prompt.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ApplyTerraformUseCase {

    private final ModelStore repository;

    public reactor.core.publisher.Flux<?> handle(String projectId) {
        var project = repository.findById(projectId, ProjectEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Proyecto desconocido: " + projectId));
        var deployment = repository.findById(DeploymentEntity.idFor(project.id()), DeploymentEntity.class)
                .orElseGet(() -> DeploymentEntity.emptyFor(project.id()));
        if (deployment.terraformProvider() == null) {
            throw new IllegalStateException(
                    "El proyecto no declara proveedor de infraestructura: elige terraformProvider en su ficha");
        }
        var outputPath = expandTilde(project.outputPath());
        var terraformDir = Path.of(outputPath, "terraform");
        if (!Files.exists(terraformDir.resolve("main.tf"))) {
            throw new IllegalStateException(
                    "No hay terraform/main.tf bajo " + outputPath + ": genera el proyecto primero");
        }
        var binary = terraformBinary();
        var logFile = Path.of(outputPath, ".modux", "terraform.log");

        var task = io.mateu.uidl.data.LongTask
                .create("Aplicando Terraform de «" + project.name() + "»")
                .withProgressBar()
                .done("Terraform aplicado", "Infraestructura reconciliada con el modelo")
                .closeAfter(4);
        return task.run(progress -> terraformFlux(binary, terraformDir, logFile, progress));
    }

    private reactor.core.publisher.Flux<Object> terraformFlux(
            String binary, Path terraformDir, Path logFile, io.mateu.uidl.data.ProgressReporter progress) {
        var sink = reactor.core.publisher.Sinks.many().unicast().<Object>onBackpressureBuffer();
        Thread.ofVirtual().start(() -> run(binary, terraformDir, logFile, sink, progress));
        return sink.asFlux();
    }

    private void run(String binary, Path terraformDir, Path logFile,
                     reactor.core.publisher.Sinks.Many<Object> sink,
                     io.mateu.uidl.data.ProgressReporter progress) {
        try {
            Files.createDirectories(logFile.getParent());
            append(logFile, "── terraform apply " + java.time.LocalDateTime.now() + " ──");

            milestone(sink, progress, logFile, 0.15, "Inicializando providers (" + binary + " init)…");
            exec(logFile, terraformDir, binary, "init", "-input=false", "-no-color");

            milestone(sink, progress, logFile, 0.5, "Aplicando el plan (" + binary + " apply)…");
            exec(logFile, terraformDir, binary, "apply", "-input=false", "-auto-approve", "-no-color");

            milestone(sink, progress, logFile, 1.0, "Infraestructura reconciliada");
            append(logFile, "Terraform COMPLETADO");
            sink.tryEmitComplete();
        } catch (Exception e) {
            log.warn("terraform falló", e);
            append(logFile, "Terraform FALLIDO: " + e.getMessage());
            sink.tryEmitNext(progress.step("FALLIDO: " + e.getMessage() + " — detalle en " + logFile, "Terraform fallido"));
            sink.tryEmitError(e);
        }
    }

    /** terraform, or its drop-in OpenTofu — whichever this machine has. */
    private static String terraformBinary() {
        for (var candidate : List.of("terraform", "tofu")) {
            try {
                var probe = new ProcessBuilder(candidate, "version")
                        .redirectErrorStream(true).start();
                probe.getInputStream().readAllBytes();
                if (probe.waitFor() == 0) return candidate;
            } catch (IOException e) {
                // not this one
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new IllegalStateException("Interrumpido buscando el binario de terraform", e);
            }
        }
        throw new IllegalStateException(
                "Ni terraform ni tofu están instalados en la máquina que ejecuta Modux");
    }

    private void milestone(reactor.core.publisher.Sinks.Many<Object> sink,
                           io.mateu.uidl.data.ProgressReporter progress, Path logFile,
                           double fraction, String text) {
        append(logFile, text);
        sink.tryEmitNext(progress.step(text, fraction));
    }

    private void exec(Path logFile, Path workDir, String... command) {
        append(logFile, "$ " + String.join(" ", command));
        try {
            var process = new ProcessBuilder(command)
                    .directory(workDir.toFile())
                    .redirectErrorStream(true)
                    .start();
            var lines = new java.io.OutputStream() {
                private final StringBuilder line = new StringBuilder();
                @Override public void write(int b) {
                    if (b == '\n') {
                        append(logFile, "  " + line);
                        line.setLength(0);
                    } else {
                        line.append((char) b);
                    }
                }
                @Override public void close() {
                    // terraform's last line (often the error summary) may not end in '\n'
                    if (!line.isEmpty()) write('\n');
                }
            };
            process.getInputStream().transferTo(lines);
            lines.close();
            if (!process.waitFor(30, java.util.concurrent.TimeUnit.MINUTES)) {
                process.destroyForcibly();
                throw new IllegalStateException("Falló (timeout): " + String.join(" ", command));
            }
            if (process.exitValue() != 0) {
                throw new IllegalStateException("Falló: " + String.join(" ", command));
            }
        } catch (IOException | InterruptedException e) {
            if (e instanceof InterruptedException) Thread.currentThread().interrupt();
            throw new IllegalStateException("Falló: " + String.join(" ", command) + " — " + e.getMessage(), e);
        }
    }

    private static void append(Path logFile, String line) {
        try {
            Files.createDirectories(logFile.getParent());
            Files.writeString(logFile, line + System.lineSeparator(),
                    StandardOpenOption.CREATE, StandardOpenOption.APPEND);
        } catch (IOException e) {
            log.debug("no se pudo escribir el log de terraform", e);
        }
    }

    private static String expandTilde(String path) {
        var trimmed = path == null ? "" : path.trim();
        if (trimmed.equals("~") || trimmed.startsWith("~/")) {
            return System.getProperty("user.home") + trimmed.substring(1);
        }
        return trimmed;
    }
}
