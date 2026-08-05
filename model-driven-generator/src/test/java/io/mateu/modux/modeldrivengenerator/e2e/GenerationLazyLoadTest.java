package io.mateu.modux.modeldrivengenerator.e2e;

import io.mateu.modux.modeldrivengenerator.application.usecases.model.view.LoadViewScopeUseCase;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Verifies partial (lazy) loading: from a granular store, loading a view brings only its closure into
 * memory — not the whole model — and the partial catalog is read-only. This is how a single bounded
 * context of a huge model is opened without loading everything.
 */
@SpringBootTest
class GenerationLazyLoadTest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("src/test/resources/examples/hotel-checkin-store.yaml").getAbsolutePath());
    }

    private static final String VIEW = """

            views:
            - id: "view-frontoffice-lazy"
              name: "FrontOffice"
              kind: "COMPUTED"
              seedId: "mod-frontoffice"
            """;

    @Autowired
    LoadViewScopeUseCase loadViewScopeUseCase;

    @Autowired
    CommonFileRepository repository;

    @Test
    void loading_a_view_loads_only_its_closure() throws Exception {
        // build a granular store that contains a computed view
        var store = Files.readString(Path.of("src", "test", "resources", "examples", "hotel-checkin-store.yaml"));
        var monolithic = Files.createTempFile("modux-lazy-src", ".yaml");
        Files.writeString(monolithic, store + VIEW);
        repository.loadFrom(monolithic.toAbsolutePath().toString());
        var fullCount = repository.allElements().size();

        var granular = Files.createTempDirectory("modux-lazy-granular");
        repository.splitTo(granular);
        repository.loadFrom(granular.toAbsolutePath().toString()); // granular store is now active

        // partially load only the FrontOffice view's closure
        var load = loadViewScopeUseCase.load("view-frontoffice-lazy");
        var ids = repository.allElements().stream()
                .map(e -> ((io.mateu.modux.modeldrivengenerator.domain.shared.Identifiable) e).id())
                .toList();

        // only a slice is in memory, far smaller than the whole model
        assertTrue(ids.size() < fullCount,
                "partial load did not shrink the catalog (" + ids.size() + " vs full " + fullCount + ")");
        assertTrue(load.loadedElements() > 1, "the closure did not load anything beyond the seed");
        // it contains the bounded context
        assertTrue(ids.contains("mod-frontoffice"), "seed boundedContext not loaded; got " + ids);
        assertTrue(ids.contains("estancia"), "the boundedContext's aggregate was not loaded; got " + ids);
        assertTrue(ids.contains("uc-crearEstancia"), "the boundedContext's use case was not loaded; got " + ids);
        // a different bounded context is NOT loaded
        assertFalse(ids.contains("reserva"), "a different context (reserva) leaked into the partial load; got " + ids);

        // the partial catalog is read-only — saving would risk clobbering the rest of the model on disk
        assertThrows(IllegalStateException.class,
                () -> repository.save(repository.findById("estancia",
                        io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity.class).orElseThrow()),
                "a scoped (partial) catalog must reject persistence");
    }
}
