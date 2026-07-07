package io.mateu.modux.modeldrivengenerator.infra.out.git;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AllData;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage.GranularYamlStorageFormat;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage.MonolithicYamlStorageFormat;
import io.mateu.uidl.interfaces.Identifiable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * The semantic diff of a solution against the system (F2 of
 * docs/design/system-and-solutions.md): the CURRENT in-memory model (the to-be, including
 * uncommitted work) compared, element by element and by id, against the committed main
 * branch (the as-is), read through a throwaway git worktree so the solution never leaves
 * its own branch.
 */
@Service
@RequiredArgsConstructor
public class SolutionDiffService {

    /** Layout geometry and the solution's own registry are meta, not model changes. */
    private static final Set<String> EXCLUDED = Set.of("diagrams", "solutions");

    final SolutionGitService git;
    final CommonFileRepository repository;
    final GranularYamlStorageFormat granularFormat;
    final MonolithicYamlStorageFormat monolithicFormat;

    public record ElementChange(String type, String id, String name, String kind,
                                List<String> decisionIds) {}

    public record SolutionDiff(String branch, boolean system, List<ElementChange> changes) {
        public long added() { return count("ADDED"); }
        public long modified() { return count("MODIFIED"); }
        public long removed() { return count("REMOVED"); }
        private long count(String kind) {
            return changes.stream().filter(c -> c.kind().equals(kind)).count();
        }
    }

    /** Empty diff on the system itself (or when the store has no repo yet). */
    public SolutionDiff diffAgainstSystem() {
        var branch = git.isRepo() ? git.currentBranch() : SolutionGitService.SYSTEM_BRANCH;
        if (SolutionGitService.SYSTEM_BRANCH.equals(branch)) {
            return new SolutionDiff(branch, true, List.of());
        }
        var base = loadSystemModel();
        var current = repository.snapshot();
        var changes = new ArrayList<ElementChange>();
        for (var component : AllData.class.getRecordComponents()) {
            if (EXCLUDED.contains(component.getName())) continue;
            var baseById = elementsById(base, component.getName());
            var currentById = elementsById(current, component.getName());
            for (var entry : currentById.entrySet()) {
                var before = baseById.get(entry.getKey());
                if (before == null) {
                    changes.add(change(component.getName(), entry.getValue(), "ADDED"));
                } else if (!before.equals(entry.getValue())) {
                    changes.add(change(component.getName(), entry.getValue(), "MODIFIED"));
                }
            }
            for (var entry : baseById.entrySet()) {
                if (!currentById.containsKey(entry.getKey())) {
                    changes.add(change(component.getName(), entry.getValue(), "REMOVED"));
                }
            }
        }
        return new SolutionDiff(branch, false, List.copyOf(changes));
    }

    @lombok.SneakyThrows
    private AllData loadSystemModel() {
        var worktree = git.addSystemWorktree();
        try {
            var relative = git.repoDir().relativize(repository.storePath());
            var systemStore = worktree.resolve(relative);
            return Files.isDirectory(systemStore)
                    ? granularFormat.load(systemStore)
                    : monolithicFormat.load(systemStore);
        } finally {
            git.removeWorktree(worktree);
        }
    }

    private static Map<String, Object> elementsById(AllData data, String componentName) {
        try {
            var component = AllData.class.getRecordComponents();
            for (var c : component) {
                if (!c.getName().equals(componentName)) continue;
                var list = (List<?>) c.getAccessor().invoke(data);
                var byId = new LinkedHashMap<String, Object>();
                for (var element : list == null ? List.of() : list) {
                    if (element instanceof Identifiable identifiable) {
                        byId.put(identifiable.id(), element);
                    }
                }
                return byId;
            }
            return Map.of();
        } catch (ReflectiveOperationException e) {
            throw new IllegalStateException("Could not read AllData." + componentName, e);
        }
    }

    private static ElementChange change(String type, Object element, String kind) {
        return new ElementChange(type,
                element instanceof Identifiable identifiable ? identifiable.id() : "?",
                stringProperty(element, "name"), kind, listProperty(element));
    }

    private static String stringProperty(Object element, String property) {
        try {
            var value = element.getClass().getMethod(property).invoke(element);
            return value != null ? value.toString() : null;
        } catch (ReflectiveOperationException e) {
            return null;
        }
    }

    @SuppressWarnings("unchecked")
    private static List<String> listProperty(Object element) {
        try {
            var value = element.getClass().getMethod("decisionIds").invoke(element);
            return value instanceof List<?> list ? (List<String>) list : List.of();
        } catch (ReflectiveOperationException e) {
            return List.of();
        }
    }
}
