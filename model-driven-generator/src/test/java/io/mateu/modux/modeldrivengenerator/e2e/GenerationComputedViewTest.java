package io.mateu.modux.modeldrivengenerator.e2e;

import io.mateu.modux.modeldrivengenerator.application.usecases.model.view.ResolveViewClosureUseCase;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Verifies computed views: a view that only names a seed (here a module) resolves to that seed's whole
 * dependency closure — the bounded context — without listing members by hand. Recalculates itself as
 * the model changes. Fast (load + reflection), runs in the normal suite.
 */
@SpringBootTest
class GenerationComputedViewTest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("../.dev/data/model-driven-store.yaml").getAbsolutePath());
    }

    private static final String VIEW = """

            views:
            - id: "view-frontoffice-bc"
              name: "FrontOffice bounded context"
              kind: "COMPUTED"
              seedId: "mod-frontoffice"
            """;

    @Autowired
    ResolveViewClosureUseCase resolveViewClosureUseCase;

    @Autowired
    CommonFileRepository repository;

    @Test
    void computed_view_resolves_its_seed_bounded_context() throws Exception {
        var store = Files.readString(Path.of("..", ".dev", "data", "model-driven-store.yaml"));
        var file = Files.createTempFile("modux-computed-view", ".yaml");
        Files.writeString(file, store + VIEW);
        repository.loadFrom(file.toAbsolutePath().toString());

        var closure = resolveViewClosureUseCase.resolve("view-frontoffice-bc");
        var ids = closure.closureIds();

        // the seed module and everything it owns are in the closure — no members were listed by hand
        assertTrue(ids.contains("mod-frontoffice"), "closure must contain the seed module; got " + ids);
        assertTrue(ids.contains("estancia"), "closure must contain the module's aggregate; got " + ids);
        assertTrue(ids.contains("uc-crearEstancia"), "closure must contain the module's use case; got " + ids);
        assertTrue(ids.contains("uc-realizarCheckin"), "closure must contain the module's use case; got " + ids);
        // a different bounded context's aggregate (reserva, in mod-reservas) is NOT pulled in
        assertFalse(ids.contains("reserva"),
                "closure leaked into another bounded context (reserva); got " + ids);
    }
}
