package io.mateu.modux.modeldrivengenerator.application.usecases.workspace;

import io.mateu.modux.modeldrivengenerator.application.usecases.model.lint.ModelLintService;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * The workspace create/delete cycle: skeleton creation with owner attachment, global id
 * uniqueness, and deletion that detaches the id from every reference list.
 */
@SpringBootTest
class WorkspaceElementLifecycleTest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("../.dev/data/model-driven-store.yaml").getAbsolutePath());
    }

    @Autowired
    CreateWorkspaceElementUseCase createUseCase;

    @Autowired
    DeleteWorkspaceElementsUseCase deleteUseCase;

    @Autowired
    CommonFileRepository repository;

    @Autowired
    ModelLintService modelLintService;

    String moduleId;

    @BeforeEach
    void loadTempStore() throws Exception {
        var store = Files.readString(Path.of("..", ".dev", "data", "model-driven-store.yaml"));
        var file = Files.createTempFile("workspace-test-store", ".yaml");
        Files.writeString(file, store);
        repository.loadFrom(file.toAbsolutePath().toString());
        moduleId = repository.findAllOfType(ModuleEntity.class).get(0).id();
    }

    @Test
    void create_attaches_to_the_module_and_delete_detaches() {
        createUseCase.handle(new CreateWorkspaceElementCommand(
                "aggregates", "ws-test-agg", "Ws Test", Map.of(), "modules", moduleId, "aggregateIds"));

        assertTrue(repository.findById("ws-test-agg", AggregateEntity.class).isPresent());
        assertTrue(module().aggregateIds().contains("ws-test-agg"), "should attach to the module");

        deleteUseCase.handle(List.of("ws-test-agg"));

        assertTrue(repository.findById("ws-test-agg", AggregateEntity.class).isEmpty());
        assertFalse(module().aggregateIds().contains("ws-test-agg"), "should detach from the module");
    }

    @Test
    void create_via_own_reference_field() {
        createUseCase.handle(new CreateWorkspaceElementCommand(
                "flows", "ws-test-flow", "Ws Flow", Map.of("targetModuleId", moduleId), null, null, null));

        var flow = repository.findById("ws-test-flow", FlowEntity.class).orElseThrow();
        assertEquals(moduleId, flow.targetModuleId());

        deleteUseCase.handle(List.of("ws-test-flow"));
        assertTrue(repository.findById("ws-test-flow", FlowEntity.class).isEmpty());
    }

    @Test
    void duplicate_ids_are_rejected_across_types() {
        var existingAggregateId = repository.findAllOfType(AggregateEntity.class).get(0).id();

        var rejected = assertThrows(IllegalArgumentException.class, () -> createUseCase.handle(
                new CreateWorkspaceElementCommand("decisions", existingAggregateId, "Dup")));

        assertTrue(rejected.getMessage().contains("already exists"), rejected.getMessage());
    }

    @Test
    void lint_flags_duplicate_ids_as_errors() {
        var existingAggregateId = repository.findAllOfType(AggregateEntity.class).get(0).id();
        // bypass the use-case guard by saving directly, as a hand-edit of the YAML would
        repository.save(new io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DecisionEntity(
                existingAggregateId, "Dup", "d", "r", null, null));

        var duplicates = modelLintService.lint().stream()
                .filter(f -> "duplicate-id".equals(f.ruleId()))
                .toList();

        assertTrue(duplicates.stream().anyMatch(f -> existingAggregateId.equals(f.elementId())),
                "duplicate id should be flagged: " + duplicates);
    }

    private ModuleEntity module() {
        return repository.findById(moduleId, ModuleEntity.class).orElseThrow();
    }
}
