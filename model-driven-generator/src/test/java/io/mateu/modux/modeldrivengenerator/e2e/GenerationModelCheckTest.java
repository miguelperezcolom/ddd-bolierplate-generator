package io.mateu.modux.modeldrivengenerator.e2e;

import io.mateu.modux.modeldrivengenerator.application.usecases.model.check.CheckModelUseCase;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Verifies the referential-integrity check: the example store is clean, and an injected dangling
 * reference is detected. Fast (load + reflection only), runs in the normal suite.
 */
@SpringBootTest
class GenerationModelCheckTest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("../.dev/data/model-driven-store.yaml").getAbsolutePath());
    }

    @Autowired
    CheckModelUseCase checkModelUseCase;

    @Autowired
    CommonFileRepository repository;

    @Test
    void example_store_is_referentially_clean() throws Exception {
        var store = Files.readString(Path.of("..", ".dev", "data", "model-driven-store.yaml"));
        loadStore(store, "modux-check-clean");

        var violations = checkModelUseCase.check();

        assertEquals(0, violations.size(),
                "the example store has dangling references:\n"
                        + violations.stream().map(Object::toString).reduce("", (a, b) -> a + "\n  - " + b));
    }

    @Test
    void dangling_reference_is_detected() throws Exception {
        var store = Files.readString(Path.of("..", ".dev", "data", "model-driven-store.yaml"));
        // point an aggregate at a model id that does not exist
        var broken = store.replace(
                "- id: \"reserva\"\n  name: \"Reserva\"\n  modelId: \"reserva\"\n",
                "- id: \"reserva\"\n  name: \"Reserva\"\n  modelId: \"does-not-exist-e2e\"\n");
        assertTrue(!broken.equals(store), "mutation anchor did not match");
        loadStore(broken, "modux-check-broken");

        var violations = checkModelUseCase.check();

        assertTrue(violations.stream().anyMatch(v -> "does-not-exist-e2e".equals(v.missingId())),
                "the dangling modelId reference was not detected; violations=" + violations);
    }

    private void loadStore(String content, String prefix) throws Exception {
        var file = Files.createTempFile(prefix, ".yaml");
        Files.writeString(file, content);
        repository.loadFrom(file.toAbsolutePath().toString());
    }
}
