package io.mateu.modux.modeldrivengenerator.e2e;

import io.mateu.modux.modeldrivengenerator.application.usecases.project.generatecode.GenerateCodeCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.generatecode.GenerateCodeUseCase;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Verifies view-scoped generation: generating a view emits the closure's domain code (and the project
 * skeleton, so it stays buildable) but not the domain code of out-of-scope elements. Generation-only
 * (no compile/boot), runs in the normal suite.
 */
@SpringBootTest
class GenerationViewScopeTest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("src/test/resources/examples/hotel-checkin-store.yaml").getAbsolutePath());
    }

    private static final String VIEW = """

            views:
            - id: "view-crear-estancia-scope"
              name: "Crear estancia"
              kind: "CURATED"
              memberIds:
              - "uc-crearEstancia"
            """;

    @Autowired
    GenerateCodeUseCase generateCodeUseCase;

    @Autowired
    CommonFileRepository repository;

    @Test
    void generating_a_view_emits_only_its_closure() throws Exception {
        var store = Files.readString(Path.of("src", "test", "resources", "examples", "hotel-checkin-store.yaml"));
        var file = Files.createTempFile("modux-view-scope", ".yaml");
        Files.writeString(file, store + VIEW);
        repository.loadFrom(file.toAbsolutePath().toString());

        var output = Files.createTempDirectory("modux-view-gen");
        generateCodeUseCase.handle(new GenerateCodeCommand(
                "hotel-checkin", output.toString(), null, true, "view-crear-estancia-scope"));

        // in the closure → generated
        assertTrue(anyFile(output, "EstanciaEntity.java"), "the closure's aggregate (estancia) was not generated");
        assertTrue(anyFile(output, "CrearEstanciaUseCase.java"), "the view member use case was not generated");
        // out of the closure → not generated
        assertFalse(anyFile(output, "HotelEntity.java"),
                "an out-of-scope aggregate (hotel) was generated despite the view scope");
        assertFalse(anyFile(output, "HabitacionEntity.java"),
                "an out-of-scope aggregate (habitacion) was generated despite the view scope");
        // the project skeleton is still produced (so the slice is buildable)
        assertTrue(anyFile(output, "pom.xml"), "the project skeleton (pom.xml) was not generated");
    }

    private boolean anyFile(Path root, String fileName) throws Exception {
        try (var stream = Files.walk(root)) {
            return stream.anyMatch(p -> p.getFileName().toString().equals(fileName)
                    && !p.toString().contains("target"));
        }
    }
}
