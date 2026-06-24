package io.mateu.modux.modeldrivengenerator.e2e;

import io.mateu.modux.modeldrivengenerator.application.usecases.project.generatecode.GenerateCodeCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.generatecode.GenerateCodeUseCase;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Verifies incremental schema migrations: generating once produces the immutable Flyway baseline,
 * and regenerating after a model change produces a new {@code V{n}} migration with just the delta —
 * without touching the baseline. Generation-only (no compile/boot), so it runs in the normal suite.
 */
@SpringBootTest
class GenerationSchemaDiffTest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("../.dev/data/model-driven-store.yaml").getAbsolutePath());
    }

    @Autowired
    GenerateCodeUseCase generateCodeUseCase;

    @Autowired
    CommonFileRepository repository;

    @Test
    void model_change_produces_an_incremental_migration_leaving_the_baseline_untouched() throws Exception {
        var baseStore = Files.readString(Path.of("..", ".dev", "data", "model-driven-store.yaml"));
        var output = Files.createTempDirectory("modux-diff");

        // generation 1 → baseline only (sourceOnly: skip DevOps, we only inspect the SQL)
        loadStore(baseStore, "modux-diff-store1");
        generateCodeUseCase.handle(new GenerateCodeCommand("hotel-checkin", output.toString(), null, true));
        var baseline = findMigration(output, "V1__baseline.sql");
        assertTrue(baseline != null, "baseline migration was not generated on the first run");
        assertTrue(findMigration(output, "V2__model_changes.sql") == null,
                "an incremental migration was generated before any model change");
        var baselineBefore = Files.readString(baseline);

        // change the model: add a field to the Reserva model (→ a new column on reserva_entity)
        var changedStore = baseStore.replace(
                "- id: \"reserva\"\n  name: \"Reserva\"\n  fields:\n  - name: \"agencia\"\n",
                "- id: \"reserva\"\n  name: \"Reserva\"\n  fields:\n"
                        + "  - name: \"campoNuevoE2E\"\n    basicType: true\n  - name: \"agencia\"\n");
        assertNotEquals(baseStore, changedStore, "the model-mutation anchor did not match the store");

        // generation 2 into the SAME output dir → incremental migration
        loadStore(changedStore, "modux-diff-store2");
        generateCodeUseCase.handle(new GenerateCodeCommand("hotel-checkin", output.toString(), null, true));

        var incremental = findMigration(output, "V2__model_changes.sql");
        assertTrue(incremental != null, "no incremental migration V2 was generated after the model change");
        var sql = Files.readString(incremental);
        assertTrue(sql.contains("ALTER TABLE reserva_entity ADD COLUMN") && sql.contains("col_campo_nuevo"),
                "V2 did not add the new column to reserva_entity:\n" + sql);

        // the baseline must remain byte-for-byte unchanged (applied migrations are immutable)
        assertFalse(sql.contains("CREATE TABLE IF NOT EXISTS reserva_entity"),
                "the incremental migration recreated an existing table instead of altering it");
        org.junit.jupiter.api.Assertions.assertEquals(baselineBefore, Files.readString(baseline),
                "the immutable baseline migration was modified on regeneration");
    }

    private void loadStore(String content, String prefix) throws Exception {
        var file = Files.createTempFile(prefix, ".yaml");
        Files.writeString(file, content);
        repository.loadFrom(file.toAbsolutePath().toString());
    }

    private Path findMigration(Path output, String fileName) throws Exception {
        try (var stream = Files.walk(output)) {
            return stream.filter(p -> p.getFileName().toString().equals(fileName))
                    .filter(p -> p.toString().contains("db/migration"))
                    .filter(p -> !p.toString().contains("target"))
                    .findFirst().orElse(null);
        }
    }
}
