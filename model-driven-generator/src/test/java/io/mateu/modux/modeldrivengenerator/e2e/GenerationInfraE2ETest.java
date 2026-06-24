package io.mateu.modux.modeldrivengenerator.e2e;

import io.mateu.modux.modeldrivengenerator.application.usecases.project.generatecode.GenerateCodeCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.generatecode.GenerateCodeUseCase;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.testcontainers.DockerClientFactory;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.kafka.KafkaContainer;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assumptions.assumeTrue;

/**
 * Runtime e2e against real infrastructure: spins up Postgres and Kafka with Testcontainers,
 * generates and packages the project, then boots a generated service application against those
 * containers (its default Postgres + Kafka profile) and asserts the Spring context starts — proving
 * the generated event-driven wiring works against real infra, not just H2.
 *
 * <p>Requires Docker; it self-skips when Docker is unavailable. Tagged {@code e2e} and run with
 * {@code mvn test -Pe2e}.
 */
@SpringBootTest
@Tag("e2e")
class GenerationInfraE2ETest {

    static {
        System.setProperty("modux.model-file",
                new File("../.dev/data/model-driven-store.yaml").getAbsolutePath());
    }

    @Autowired
    GenerateCodeUseCase generateCodeUseCase;

    @Test
    void generated_app_starts_against_real_postgres_and_kafka() throws Exception {
        assumeTrue(DockerClientFactory.instance().isDockerAvailable(), "Docker is not available");

        try (var postgres = new PostgreSQLContainer<>("postgres:16-alpine");
             var kafka = new KafkaContainer("apache/kafka:3.8.0")) {
            postgres.start();
            kafka.start();

            // generate + package the project
            var output = Files.createTempDirectory("modux-infra-e2e");
            generateCodeUseCase.handle(new GenerateCodeCommand("hotel-checkin", output.toString(), null, false));

            List<Path> mavenProjects;
            try (Stream<Path> top = Files.list(output)) {
                mavenProjects = top.filter(Files::isDirectory)
                        .filter(p -> Files.exists(p.resolve("pom.xml")))
                        .sorted().toList();
            }
            assertFalse(mavenProjects.isEmpty(), "generation produced no Maven projects");
            for (Path project : mavenProjects) {
                assertEquals(0, mavenPackage(project), "generated project did not package: " + project.getFileName());
            }

            // boot each generated service app against the real containers
            List<Path> appJars;
            try (Stream<Path> walk = Files.walk(output)) {
                appJars = walk
                        .filter(p -> "target".equals(p.getParent().getFileName().toString()))
                        .filter(p -> p.getFileName().toString().matches(".*-app-.*\\.jar"))
                        .toList();
            }
            assertFalse(appJars.isEmpty(), "no runnable service application jar was produced");
            for (Path appJar : appJars) {
                bootAgainstInfra(appJar, postgres, kafka);
            }
        }
    }

    private void bootAgainstInfra(Path appJar, PostgreSQLContainer<?> postgres, KafkaContainer kafka) throws Exception {
        var started = new AtomicBoolean(false);
        var failed = new AtomicBoolean(false);
        var done = new CountDownLatch(1);

        var process = new ProcessBuilder("java", "-jar", appJar.toString(),
                "--server.port=0",
                "--spring.datasource.url=" + postgres.getJdbcUrl(),
                "--spring.datasource.username=" + postgres.getUsername(),
                "--spring.datasource.password=" + postgres.getPassword(),
                "--spring.kafka.bootstrap-servers=" + kafka.getBootstrapServers(),
                "--spring.cloud.stream.kafka.binder.brokers=" + kafka.getBootstrapServers())
                .redirectErrorStream(true)
                .start();

        var reader = new Thread(() -> {
            try (var r = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = r.readLine()) != null) {
                    if (line.contains("Started ") && line.contains("Application")) {
                        started.set(true);
                        done.countDown();
                        return;
                    }
                    if (line.contains("APPLICATION FAILED TO START") || line.contains("Error starting ApplicationContext")) {
                        failed.set(true);
                        done.countDown();
                        return;
                    }
                }
            } catch (Exception ignored) {
                // process output closed
            }
            done.countDown();
        });
        reader.setDaemon(true);
        reader.start();

        boolean signalled = done.await(180, TimeUnit.SECONDS);
        process.destroyForcibly();
        process.waitFor(20, TimeUnit.SECONDS);

        assertTrue(started.get(), "generated app did not start against Postgres + Kafka: " + appJar.getFileName()
                + (failed.get() ? " (context failed to start)" : signalled ? "" : " (timed out)"));
    }

    private int mavenPackage(Path projectDir) throws Exception {
        var mvn = System.getProperty("os.name", "").toLowerCase().contains("win") ? "mvn.cmd" : "mvn";
        var process = new ProcessBuilder(mvn, "-q", "-B", "-DskipTests", "package")
                .directory(projectDir.toFile())
                .redirectErrorStream(true)
                .inheritIO()
                .start();
        return process.waitFor();
    }
}
