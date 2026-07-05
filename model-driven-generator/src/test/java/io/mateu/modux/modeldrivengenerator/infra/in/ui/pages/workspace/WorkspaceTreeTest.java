package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workspace;

import io.mateu.modux.modeldrivengenerator.application.usecases.workspace.CreateWorkspaceElementCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.workspace.CreateWorkspaceElementUseCase;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.uidl.data.NoFilters;
import io.mateu.uidl.data.Pageable;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertTrue;

/** The tree must surface every element kind, including intent-layer elements added via reverse lookup. */
@SpringBootTest
class WorkspaceTreeTest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("../.dev/data/model-driven-store.yaml").getAbsolutePath());
    }

    @Autowired
    WorkspaceCrudAdapter adapter;

    @Autowired
    CreateWorkspaceElementUseCase createUseCase;

    @Autowired
    CommonFileRepository repository;

    @BeforeEach
    void loadTempStore() throws Exception {
        var store = Files.readString(Path.of("..", ".dev", "data", "model-driven-store.yaml"));
        var file = Files.createTempFile("workspace-tree-store", ".yaml");
        Files.writeString(file, store);
        repository.loadFrom(file.toAbsolutePath().toString());
    }

    @Test
    void tree_shows_elements_created_from_the_workspace() {
        var moduleId = repository.findAllOfType(ModuleEntity.class).get(0).id();
        createUseCase.handle(new CreateWorkspaceElementCommand(
                "useCases", "tree-test-uc", "Tree Test UC", Map.of(), "modules", moduleId, "useCaseIds"));
        createUseCase.handle(new CreateWorkspaceElementCommand(
                "flows", "tree-test-flow", "Tree Test Flow", Map.of("targetModuleId", moduleId), null, null, null));
        createUseCase.handle(new CreateWorkspaceElementCommand("decisions", "tree-test-dec", "Tree Test Decision"));

        var labels = allLabels();

        assertTrue(labels.stream().anyMatch(l -> l.startsWith("Use Cases")), labels.toString());
        assertTrue(labels.contains("Tree Test UC"), "attached use case should be a tree leaf");
        assertTrue(labels.stream().anyMatch(l -> l.startsWith("Flows")), "reverse-lookup group missing");
        assertTrue(labels.contains("Tree Test Flow"), "flow anchored via targetModuleId should be a leaf");
        assertTrue(labels.stream().anyMatch(l -> l.startsWith("Decisions")), "global decisions group missing");
        assertTrue(labels.contains("Tree Test Decision"));
    }

    @Test
    void search_filters_the_tree_by_label() {
        var moduleId = repository.findAllOfType(ModuleEntity.class).get(0).id();
        createUseCase.handle(new CreateWorkspaceElementCommand(
                "useCases", "tree-search-uc", "Findable Needle", Map.of(), "modules", moduleId, "useCaseIds"));

        var rows = adapter.search("findable needle", new NoFilters(),
                new Pageable(0, 1000, List.of()), null).page().content();

        var labels = new ArrayList<String>();
        collect(rows, labels);
        assertTrue(labels.contains("Findable Needle"), labels.toString());
    }

    private List<String> allLabels() {
        var rows = adapter.search(null, new NoFilters(), new Pageable(0, 1000, List.of()), null)
                .page().content();
        var labels = new ArrayList<String>();
        collect(rows, labels);
        return labels;
    }

    private void collect(List<WorkspaceRow> rows, List<String> labels) {
        if (rows == null) {
            return;
        }
        for (var row : rows) {
            labels.add(row.label());
            collect(row.children(), labels);
        }
    }
}
