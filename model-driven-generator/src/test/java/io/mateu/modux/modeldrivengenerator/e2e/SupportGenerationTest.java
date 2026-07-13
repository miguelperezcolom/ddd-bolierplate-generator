package io.mateu.modux.modeldrivengenerator.e2e;

import io.mateu.modux.modeldrivengenerator.application.usecases.model.check.CheckModelUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.generatecode.GenerateCodeCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.generatecode.GenerateCodeUseCase;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * A second example domain (helpdesk ticketing) run through the whole pipeline — referential check →
 * generate → package → boot — to harden the generator against shapes the hotel store doesn't have
 * (a saga with compensation across two services, a payment gateway, an enum, money fields).
 */
@SpringBootTest
@Tag("e2e")
class SupportGenerationTest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("../sample/hla-booking/model-driven-store.yaml").getAbsolutePath());
    }

    @Autowired
    GenerateCodeUseCase generateCodeUseCase;

    @Autowired
    CheckModelUseCase checkModelUseCase;

    @Autowired
    CommonFileRepository repository;

    @Test
    void generates_packages_and_boots_the_support_project() throws Exception {
        repository.loadFrom(Path.of("src", "test", "resources", "examples", "support-store.yaml")
                .toAbsolutePath().toString());

        // dogfood the integrity check: the hand-authored store must be referentially clean
        var violations = checkModelUseCase.check();
        assertEquals(0, violations.size(), "the support store has dangling references:\n  "
                + violations.stream().map(Object::toString).reduce("", (a, b) -> a + "\n  " + b));

        var output = Files.createTempDirectory("modux-support");
        generateCodeUseCase.handle(new GenerateCodeCommand("support", output.toString(), null, false));

        // package every generated service
        List<Path> projects;
        try (Stream<Path> top = Files.list(output)) {
            projects = top.filter(Files::isDirectory)
                    .filter(p -> Files.exists(p.resolve("pom.xml")))
                    .toList();
        }
        assertTrue(!projects.isEmpty(), "no generated Maven project was produced");
        for (Path project : projects) {
            assertEquals(0, maven(project, "package"), "generated project did not package: " + project.getFileName());
        }

        // boot each service app jar with the local profile (H2)
        var appJars = findFiles(output, ".jar").stream()
                .filter(p -> "target".equals(p.getParent().getFileName().toString()))
                .filter(p -> p.getFileName().toString().matches(".*-app-.*\\.jar"))
                .toList();
        assertTrue(!appJars.isEmpty(), "no runnable service application jar was produced");
        for (Path appJar : appJars) {
            smokeBoot(appJar);
        }
    }

    private void smokeBoot(Path appJar) throws Exception {
        var started = new AtomicBoolean(false);
        var done = new CountDownLatch(1);
        var process = new ProcessBuilder("java", "-jar", appJar.toString(),
                "--spring.profiles.active=local", "--server.port=0")
                .redirectErrorStream(true).start();
        var reader = new Thread(() -> {
            try (var r = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = r.readLine()) != null) {
                    if (line.contains("Started ") && line.contains(" in ")) {
                        started.set(true);
                        done.countDown();
                        break;
                    }
                    if (line.contains("APPLICATION FAILED TO START") || line.contains("BeanCreationException")) {
                        done.countDown();
                        break;
                    }
                }
            } catch (Exception ignored) {
            }
        });
        reader.start();
        var ok = done.await(90, TimeUnit.SECONDS);
        process.destroy();
        process.waitFor(10, TimeUnit.SECONDS);
        process.destroyForcibly();
        assertTrue(ok && started.get(), "service did not boot: " + appJar.getFileName());
    }

    private int maven(Path project, String goal) throws Exception {
        var mvnw = project.resolve("mvnw");
        var cmd = Files.exists(mvnw) ? mvnw.toString() : "mvn";
        var process = new ProcessBuilder(cmd, "-q", "-DskipTests", goal)
                .directory(project.toFile()).redirectErrorStream(true).inheritIO().start();
        return process.waitFor();
    }

    private List<Path> findFiles(Path root, String suffix) throws Exception {
        try (Stream<Path> walk = Files.walk(root)) {
            return walk.filter(p -> p.getFileName().toString().endsWith(suffix)).toList();
        }
    }
}
