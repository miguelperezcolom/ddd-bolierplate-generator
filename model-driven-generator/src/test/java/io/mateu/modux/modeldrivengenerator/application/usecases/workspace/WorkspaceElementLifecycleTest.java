package io.mateu.modux.modeldrivengenerator.application.usecases.workspace;

import io.mateu.modux.modeldrivengenerator.application.usecases.model.lint.ModelLintService;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BoundedContextEntity;
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
                new java.io.File("src/test/resources/examples/hotel-checkin-store.yaml").getAbsolutePath());
    }

    @Autowired
    CreateWorkspaceElementUseCase createUseCase;

    @Autowired
    DeleteWorkspaceElementsUseCase deleteUseCase;

    @Autowired
    CommonFileRepository repository;

    @Autowired
    ModelLintService modelLintService;

    String boundedContextId;

    @BeforeEach
    void loadTempStore() throws Exception {
        var store = Files.readString(Path.of("src", "test", "resources", "examples", "hotel-checkin-store.yaml"));
        var file = Files.createTempFile("workspace-test-store", ".yaml");
        Files.writeString(file, store);
        repository.loadFrom(file.toAbsolutePath().toString());
        boundedContextId = repository.findAllOfType(BoundedContextEntity.class).get(0).id();
    }

    @Test
    void create_attaches_to_the_boundedContext_and_delete_detaches() {
        createUseCase.handle(new CreateWorkspaceElementCommand(
                "aggregates", "ws-test-agg", "Ws Test", Map.of(), "boundedContexts", boundedContextId, "aggregateIds"));

        assertTrue(repository.findById("ws-test-agg", AggregateEntity.class).isPresent());
        assertTrue(boundedContext().aggregateIds().contains("ws-test-agg"), "should attach to the boundedContext");

        deleteUseCase.handle(List.of("ws-test-agg"));

        assertTrue(repository.findById("ws-test-agg", AggregateEntity.class).isEmpty());
        assertFalse(boundedContext().aggregateIds().contains("ws-test-agg"), "should detach from the boundedContext");
    }

    @Test
    void create_via_own_reference_field() {
        createUseCase.handle(new CreateWorkspaceElementCommand(
                "flows", "ws-test-flow", "Ws Flow", Map.of("targetBoundedContextId", boundedContextId), null, null, null));

        var flow = repository.findById("ws-test-flow", FlowEntity.class).orElseThrow();
        assertEquals(boundedContextId, flow.targetBoundedContextId());

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
    void deleting_one_half_of_the_blessed_pair_keeps_references_to_the_survivor() {
        // the hotel store pairs aggregates with their backing models (same id)
        var aggregate = repository.findAllOfType(AggregateEntity.class).stream()
                .filter(a -> a.id().equals(a.modelId()))
                .findFirst().orElseThrow();
        var boundedContextOwning = repository.findAllOfType(BoundedContextEntity.class).stream()
                .filter(m -> m.aggregateIds() != null && m.aggregateIds().contains(aggregate.id()))
                .findFirst().orElseThrow();

        deleteUseCase.handle(List.of(aggregate.id()));

        assertTrue(repository.findById(aggregate.id(), AggregateEntity.class).isEmpty(), "aggregate deleted");
        assertTrue(repository.findById(aggregate.id(),
                        io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelEntity.class)
                .isPresent(), "the backing model must survive");
        var boundedContext = repository.findById(boundedContextOwning.id(), BoundedContextEntity.class).orElseThrow();
        assertTrue(boundedContext.aggregateIds().contains(aggregate.id()),
                "references still resolve (to the surviving model) — they must not be pruned");
    }

    @Test
    void lint_exempts_only_the_verified_backing_pair() {
        var aggregate = repository.findAllOfType(AggregateEntity.class).stream()
                .filter(a -> a.id().equals(a.modelId()))
                .findFirst().orElseThrow();
        // a flow sharing an id with an UNRELATED model is not the blessed pair
        var unrelatedModelId = repository.findAllOfType(
                        io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelEntity.class).stream()
                .map(m -> m.id())
                .filter(id -> repository.findById(id, AggregateEntity.class).isEmpty())
                .filter(id -> repository.findById(id,
                        io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.EntityEntity.class).isEmpty())
                .findFirst().orElseThrow();
        repository.save(new io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity(
                unrelatedModelId, "Impostor", null, null, null, null, null, null,
                List.of(), null, List.of(), List.of()));

        var duplicates = modelLintService.lint().stream()
                .filter(f -> "duplicate-id".equals(f.ruleId()))
                .toList();

        assertTrue(duplicates.stream().anyMatch(f -> unrelatedModelId.equals(f.elementId())),
                "a flow squatting an unrelated model's id must be flagged: " + duplicates);
        assertFalse(duplicates.stream().anyMatch(f -> aggregate.id().equals(f.elementId())),
                "an aggregate sharing the id of ITS backing model stays blessed: " + duplicates);
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

    private BoundedContextEntity boundedContext() {
        return repository.findById(boundedContextId, BoundedContextEntity.class).orElseThrow();
    }
}
