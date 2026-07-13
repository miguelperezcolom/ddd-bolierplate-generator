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
 * containers (its default Postgres + Kafka profile). It asserts both that the Spring context starts
 * and that the generated subscription consumers register a consumer group on Kafka — proving the
 * event-driven consumption path is wired end to end against real infra, not just H2.
 *
 * <p>Requires Docker; it self-skips when Docker is unavailable. Tagged {@code e2e} and run with
 * {@code mvn test -Pe2e}.
 */
@SpringBootTest
@Tag("e2e")
class GenerationInfraE2ETest {

    static {
        System.setProperty("modux.model-file",
                new File("../sample/hla-booking/model-driven-store.yaml").getAbsolutePath());
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
                bootAndVerifyEventConsumers(appJar, postgres, kafka);
            }
        }
    }

    /**
     * Boots the app against the real containers, waits until the Spring context is up, then asserts
     * the generated subscription consumers actually registered with Kafka (a consumer group appears)
     * — proving the event-driven consumption path is wired end to end against real infrastructure.
     */
    private void bootAndVerifyEventConsumers(Path appJar, PostgreSQLContainer<?> postgres, KafkaContainer kafka) throws Exception {
        var started = new AtomicBoolean(false);
        var failed = new AtomicBoolean(false);
        var started_latch = new CountDownLatch(1);

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
                        started_latch.countDown();
                    } else if (line.contains("APPLICATION FAILED TO START") || line.contains("Error starting ApplicationContext")) {
                        failed.set(true);
                        started_latch.countDown();
                    }
                }
            } catch (Exception ignored) {
                // process output closed
            }
            started_latch.countDown();
        });
        reader.setDaemon(true);
        reader.start();

        try {
            boolean signalled = started_latch.await(180, TimeUnit.SECONDS);
            assertTrue(started.get(), "generated app did not start against Postgres + Kafka: " + appJar.getFileName()
                    + (failed.get() ? " (context failed to start)" : signalled ? "" : " (timed out)"));

            // event-driven path: the generated subscription consumers register a consumer group on Kafka
            assertTrue(waitForConsumerGroups(kafka.getBootstrapServers(), 60),
                    "generated app started but registered no Kafka consumer group: " + appJar.getFileName());
        } finally {
            process.destroyForcibly();
            process.waitFor(20, TimeUnit.SECONDS);
        }
    }

    /** Polls Kafka until the app has registered at least one consumer group, or the timeout elapses. */
    private boolean waitForConsumerGroups(String bootstrapServers, int timeoutSeconds) throws Exception {
        var props = new java.util.Properties();
        props.put(org.apache.kafka.clients.admin.AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        try (var admin = org.apache.kafka.clients.admin.AdminClient.create(props)) {
            for (int i = 0; i < timeoutSeconds; i++) {
                var groups = admin.listConsumerGroups().all().get(10, TimeUnit.SECONDS);
                if (!groups.isEmpty()) {
                    return true;
                }
                Thread.sleep(1000);
            }
        }
        return false;
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
