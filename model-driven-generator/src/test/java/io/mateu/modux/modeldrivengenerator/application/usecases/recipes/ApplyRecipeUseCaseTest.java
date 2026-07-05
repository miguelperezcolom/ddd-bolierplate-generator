package io.mateu.modux.modeldrivengenerator.application.usecases.recipes;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowArchetype;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo.ProcessStepType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

/** Starter recipes must emit valid intent-layer elements and guard their inputs. */
@SpringBootTest
class ApplyRecipeUseCaseTest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("../.dev/data/model-driven-store.yaml").getAbsolutePath());
    }

    @Autowired
    ApplyRecipeUseCase useCase;

    @Autowired
    CommonFileRepository repository;

    String moduleId;

    @BeforeEach
    void loadTempStore() throws Exception {
        var store = Files.readString(Path.of("..", ".dev", "data", "model-driven-store.yaml"));
        var file = Files.createTempFile("recipes-test-store", ".yaml");
        Files.writeString(file, store);
        repository.loadFrom(file.toAbsolutePath().toString());
        moduleId = repository.findAllOfType(ModuleEntity.class).get(0).id();
    }

    @Test
    void materialized_read_model_emits_a_materializes_flow() {
        var created = useCase.handle("materialized-read-model", Map.of(
                "id", "recipe-test-rm",
                "name", "Llegadas de hoy",
                "triggerAggregateId", "reserva",
                "triggerEvent", "ReservaCreada",
                "targetModuleId", moduleId,
                "readModelName", "LlegadaHoy",
                "materializedFields", "fecha, huesped"));

        assertEquals(java.util.List.of("recipe-test-rm"), created);
        var flow = repository.findById("recipe-test-rm", FlowEntity.class).orElseThrow();
        assertEquals(FlowArchetype.MATERIALIZES, flow.archetype());
        assertEquals(java.util.List.of("fecha", "huesped"), flow.materializedFields());
    }

    @Test
    void human_approval_process_emits_human_plus_automated_steps() {
        useCase.handle("human-approval-process", Map.of(
                "id", "recipe-test-approval",
                "name", "Aprobar tarifa",
                "triggerAggregateId", "reserva",
                "triggerEvent", "TarifaPropuesta",
                "ownerModuleId", moduleId));

        var process = repository.findById("recipe-test-approval", ProcessEntity.class).orElseThrow();
        assertEquals(2, process.steps().size());
        assertEquals(ProcessStepType.HUMAN, process.steps().get(0).type());
        assertEquals("PT48H", process.steps().get(0).deadline());
        assertEquals(ProcessStepType.AUTOMATED, process.steps().get(1).type());
    }

    @Test
    void missing_required_params_and_duplicate_ids_are_rejected() {
        var missing = assertThrows(IllegalArgumentException.class,
                () -> useCase.handle("external-notification", Map.of("id", "x")));
        assertTrue(missing.getMessage().contains("missing required parameter"), missing.getMessage());

        var existingId = repository.findAllOfType(ModuleEntity.class).get(0).id();
        var duplicate = assertThrows(IllegalArgumentException.class,
                () -> useCase.handle("external-notification", Map.of(
                        "id", existingId, "name", "n", "triggerAggregateId", "a",
                        "triggerEvent", "E", "targetModuleId", moduleId)));
        assertTrue(duplicate.getMessage().contains("already exists"), duplicate.getMessage());

        var unknown = assertThrows(IllegalArgumentException.class,
                () -> useCase.handle("does-not-exist", Map.of()));
        assertTrue(unknown.getMessage().contains("Unknown recipe"), unknown.getMessage());
    }
}
