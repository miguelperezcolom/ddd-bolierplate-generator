package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Files;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Authoring from scratch must survive every flavour of "nothing there yet": a missing file, a
 * blank file (touch / editor-created) and a bare YAML document marker — and the repository must
 * remember it started from scratch so validation gates can refuse phantom models.
 */
@SpringBootTest
class EmptyStoreLoadTest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("../sample/hla-booking/model-driven-store.yaml").getAbsolutePath());
    }

    @Autowired
    CommonFileRepository repository;

    @Test
    void missing_blank_and_bare_document_stores_all_start_empty() throws Exception {
        var dir = Files.createTempDirectory("empty-store");

        repository.loadFrom(dir.resolve("missing.yaml").toString());
        assertTrue(repository.allElements().isEmpty(), "missing file starts empty");
        assertTrue(repository.startedFromScratch(), "gates need to know no store existed");

        var blank = dir.resolve("blank.yaml");
        Files.writeString(blank, "");
        repository.loadFrom(blank.toString());
        assertTrue(repository.allElements().isEmpty(), "0-byte file starts empty");
        assertFalse(repository.startedFromScratch(), "the file exists — just blank");

        var bare = dir.resolve("bare.yaml");
        Files.writeString(bare, "---\n");
        repository.loadFrom(bare.toString());
        assertTrue(repository.allElements().isEmpty(), "a bare '---' document starts empty");
    }
}
