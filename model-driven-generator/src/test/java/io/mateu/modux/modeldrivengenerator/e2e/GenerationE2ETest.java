package io.mateu.modux.modeldrivengenerator.e2e;

import io.mateu.modux.modeldrivengenerator.application.usecases.project.generatecode.GenerateCodeCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.generatecode.GenerateCodeUseCase;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

/**
 * End-to-end test of the generator: it generates a real project from the model store and then
 * compiles every generated Maven project with Maven, asserting they build. Slow and requiring a
 * Maven toolchain, so it is tagged {@code e2e} and excluded from the normal build. Run with:
 *
 * <pre>mvn test -Pe2e</pre>
 */
@SpringBootTest
@Tag("e2e")
class GenerationE2ETest {

    static {
        System.setProperty("modux.model-file",
                new File("../.dev/data/model-driven-store.yaml").getAbsolutePath());
    }

    @Autowired
    GenerateCodeUseCase generateCodeUseCase;

    @Test
    void generates_and_compiles_the_hotel_project() throws Exception {
        var output = Files.createTempDirectory("modux-e2e");
        generateCodeUseCase.handle(new GenerateCodeCommand("hotel-checkin", output.toString(), null, false));

        List<Path> mavenProjects;
        try (Stream<Path> top = Files.list(output)) {
            mavenProjects = top
                    .filter(Files::isDirectory)
                    .filter(p -> Files.exists(p.resolve("pom.xml")))
                    .sorted()
                    .toList();
        }

        assertFalse(mavenProjects.isEmpty(), "generation produced no Maven projects under " + output);

        for (Path project : mavenProjects) {
            int exit = compile(project);
            assertEquals(0, exit, "generated project did not compile: " + project.getFileName());
        }
    }

    private int compile(Path projectDir) throws Exception {
        var mvn = System.getProperty("os.name", "").toLowerCase().contains("win") ? "mvn.cmd" : "mvn";
        var process = new ProcessBuilder(mvn, "-q", "-B", "-DskipTests", "compile")
                .directory(projectDir.toFile())
                .redirectErrorStream(true)
                .inheritIO()
                .start();
        return process.waitFor();
    }
}
