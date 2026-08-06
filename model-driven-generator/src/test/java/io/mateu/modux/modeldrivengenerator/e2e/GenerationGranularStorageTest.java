package io.mateu.modux.modeldrivengenerator.e2e;

import io.mateu.modux.modeldrivengenerator.application.usecases.model.check.CheckModelUseCase;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Verifies the granular storage format: splitting the monolithic store into a one-file-per-element
 * tree and reloading it round-trips every element, stays referentially clean, and merging back yields
 * the same model. Fast (load + serialize only), runs in the normal suite.
 */
@SpringBootTest
class GenerationGranularStorageTest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("src/test/resources/examples/hotel-checkin-store.yaml").getAbsolutePath());
    }

    @Autowired
    CommonFileRepository repository;

    @Autowired
    CheckModelUseCase checkModelUseCase;

    @Test
    void monolithic_splits_to_granular_and_round_trips() throws Exception {
        // 1. load the monolithic example store
        repository.loadFrom(new java.io.File("src/test/resources/examples/hotel-checkin-store.yaml").getAbsolutePath());
        var originalCount = repository.allElements().size();
        assertTrue(originalCount > 100, "the example store should have many elements, was " + originalCount);

        // 2. split into a granular tree
        var granularDir = Files.createTempDirectory("modux-granular");
        repository.splitTo(granularDir);
        assertFalse(Files.exists(granularDir.resolve("index.yaml")),
                "the directories are the index now — no manifest file (§12.3)");
        assertTrue(Files.exists(granularDir.resolve("aggregates").resolve("reserva.yaml")),
                "expected one file per element (aggregates/reserva.yaml)");

        // 3. reload from the granular tree (auto-detected by directory) → same elements, still clean
        repository.loadFrom(granularDir.toAbsolutePath().toString());
        assertEquals(originalCount, repository.allElements().size(),
                "granular round-trip lost or duplicated elements");
        assertEquals(0, checkModelUseCase.check().size(),
                "granular round-trip introduced dangling references");

        // 4. merge back to a single file → same element count again
        var mergedFile = Files.createTempFile("modux-merged", ".yaml");
        repository.mergeTo(mergedFile);
        repository.loadFrom(mergedFile.toAbsolutePath().toString());
        assertEquals(originalCount, repository.allElements().size(),
                "merge back to monolithic lost or duplicated elements");
    }
}
