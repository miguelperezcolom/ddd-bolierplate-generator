package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage.GranularYamlStorageFormat;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage.MonolithicYamlStorageFormat;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Strategic relations and external systems moved out of the project element and became top-level
 * types, one file each ({@code docs/design/ide-plugin.md} §4.3).
 *
 * <p>Stores written before that carry them nested. These are the tests that make the move
 * lossless: without the hoist on load, Jackson would drop the unknown fields silently and six
 * relations would vanish from a model that opened without complaint.
 */
class LegacyProjectElementsMigrationTest {

    /** The versioned sample still has both nested — which is what makes it a real fixture. */
    private static final Path SAMPLE = Path.of("..", "sample", "hla-booking", "model-driven-store.yaml");

    private static CommonFileRepository repositoryOn(Path store) {
        var repository = new CommonFileRepository(
                new MonolithicYamlStorageFormat(), new GranularYamlStorageFormat(),
                new ModelJsonSchemaGenerator());
        repository.loadFrom(store.toAbsolutePath().toString());
        return repository;
    }

    @Test
    void the_shipped_sample_still_carries_them_nested() throws Exception {
        var raw = Files.readString(SAMPLE);

        assertTrue(raw.contains("  contextMap:"), "the fixture must exercise the legacy shape");
        assertTrue(raw.contains("  externalSystems:"), "the fixture must exercise the legacy shape");
    }

    @Test
    void a_legacy_store_loads_its_relations_as_top_level_elements() {
        var repository = repositoryOn(SAMPLE);

        var relations = repository.findAllOfType(ContextMapRelationEntity.class);

        assertEquals(6, relations.size());
        assertNotNull(relations.get(0).sourceBoundedContextId());
    }

    @Test
    void a_legacy_store_loads_its_external_systems_as_top_level_elements() {
        var repository = repositoryOn(SAMPLE);

        assertEquals(2, repository.findAllOfType(ExternalSystemEntity.class).size());
    }

    @Test
    void the_project_no_longer_carries_them_once_migrated() {
        var repository = repositoryOn(SAMPLE);

        var project = repository.findAllOfType(ProjectEntity.class).get(0);

        assertTrue(project.contextMap().isEmpty(), "the legacy field must be emptied on load");
        assertTrue(project.externalSystems().isEmpty(), "the legacy field must be emptied on load");
    }

    @Test
    void the_migrated_shape_survives_a_save_and_a_reload(@TempDir Path dir) throws Exception {
        var out = dir.resolve("model");
        var repository = repositoryOn(SAMPLE);
        repository.splitTo(out);

        var reloaded = repositoryOn(out);

        assertEquals(6, reloaded.findAllOfType(ContextMapRelationEntity.class).size());
        assertEquals(2, reloaded.findAllOfType(ExternalSystemEntity.class).size());
        assertTrue(Files.isDirectory(out.resolve("contextMapRelations")),
                "each relation must be its own file, in its own bucket");
    }

    @Test
    void a_store_with_nothing_nested_is_left_alone() throws Exception {
        var repository = repositoryOn(SAMPLE);
        var before = repository.findAllOfType(ContextMapRelationEntity.class).size();

        // loading twice must not duplicate: hoisting is idempotent because it empties the source
        var again = repositoryOn(SAMPLE);

        assertEquals(before, again.findAllOfType(ContextMapRelationEntity.class).size());
    }
}
