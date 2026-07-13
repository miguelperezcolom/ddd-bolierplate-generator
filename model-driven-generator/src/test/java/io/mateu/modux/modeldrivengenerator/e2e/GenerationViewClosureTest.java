package io.mateu.modux.modeldrivengenerator.e2e;

import io.mateu.modux.modeldrivengenerator.application.usecases.model.view.ResolveViewClosureUseCase;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Verifies that a view expands to its dependency closure: a view whose only member is the
 * CrearEstancia use case pulls in the elements that use case forward-references (its aggregate,
 * gateway, event and input model), transitively. Fast (load + reflection), runs in the normal suite.
 */
@SpringBootTest
class GenerationViewClosureTest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("src/test/resources/examples/hotel-checkin-store.yaml").getAbsolutePath());
    }

    private static final String VIEW = """

            views:
            - id: "view-crear-estancia-e2e"
              name: "Crear estancia"
              kind: "CURATED"
              memberIds:
              - "uc-crearEstancia"
            - id: "view-broken-e2e"
              name: "Broken"
              kind: "CURATED"
              memberIds:
              - "does-not-exist-e2e"
            """;

    @Autowired
    ResolveViewClosureUseCase resolveViewClosureUseCase;

    @Autowired
    CommonFileRepository repository;

    @Test
    void view_expands_to_its_dependency_closure() throws Exception {
        var store = Files.readString(Path.of("src", "test", "resources", "examples", "hotel-checkin-store.yaml"));
        var file = Files.createTempFile("modux-view", ".yaml");
        Files.writeString(file, store + VIEW);
        repository.loadFrom(file.toAbsolutePath().toString());

        var closure = resolveViewClosureUseCase.resolve("view-crear-estancia-e2e");
        var ids = closure.closureIds();

        // the member itself plus what it forward-references (use case → aggregate, gateway, event, model)
        assertTrue(ids.contains("uc-crearEstancia"), "closure must contain the member; got " + ids);
        assertTrue(ids.contains("estancia"), "closure must contain the saved aggregate; got " + ids);
        assertTrue(ids.contains("gw-reservas"), "closure must contain the called gateway; got " + ids);
        assertTrue(ids.contains("ev-estanciaCreada"), "closure must contain the published event; got " + ids);
        assertTrue(ids.contains("payload-reservaCreada"), "closure must contain the input model; got " + ids);
        // the closure must be larger than the single member (it actually expanded)
        assertTrue(ids.size() > 1, "closure did not expand beyond the member");
    }

    @Test
    void missing_members_are_reported() throws Exception {
        var store = Files.readString(Path.of("src", "test", "resources", "examples", "hotel-checkin-store.yaml"));
        var file = Files.createTempFile("modux-view-broken", ".yaml");
        Files.writeString(file, store + VIEW);
        repository.loadFrom(file.toAbsolutePath().toString());

        var closure = resolveViewClosureUseCase.resolve("view-broken-e2e");

        assertTrue(closure.missingMembers().contains("does-not-exist-e2e"),
                "a member pointing at a missing element should be reported; got " + closure.missingMembers());
    }
}
