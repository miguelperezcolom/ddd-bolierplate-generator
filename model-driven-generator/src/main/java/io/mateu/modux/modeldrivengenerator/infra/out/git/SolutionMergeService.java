package io.mateu.modux.modeldrivengenerator.infra.out.git;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import io.mateu.modux.modeldrivengenerator.application.usecases.model.lint.LintSeverity;
import io.mateu.modux.modeldrivengenerator.application.usecases.model.lint.ModelLintService;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.decision.vo.DecisionStatus;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AllData;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DecisionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SolutionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage.GranularYamlStorageFormat;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage.MonolithicYamlStorageFormat;
import io.mateu.uidl.interfaces.Identifiable;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

/**
 * F3 of docs/design/system-and-solutions.md: the approval gate and the SEMANTIC merge.
 * Merging is never textual — the three models involved (merge base, system, solution)
 * are compared element by element and by id; a conflict is one element changed on both
 * sides, resolved by picking a side. The same machinery updates a living solution from
 * an advanced system (the semantic take on the rebase).
 */
@Service
@RequiredArgsConstructor
public class SolutionMergeService {

    /** Geometry merges naively (the solution's wins) and the registry is per-branch meta. */
    private static final Set<String> META = Set.of("diagrams", "solutions");

    private static final ObjectMapper YAML = new ObjectMapper(new YAMLFactory());

    final SolutionGitService git;
    final CommonFileRepository repository;
    final GranularYamlStorageFormat granularFormat;
    final MonolithicYamlStorageFormat monolithicFormat;
    final ModelLintService lintService;

    // ---- approval gate -----------------------------------------------------

    public record Gate(boolean ok, List<String> blockers) {}

    /** Approval requires a green lint (no ERRORs) and no open (PROPOSED) decisions. */
    public Gate approvalGate() {
        var blockers = new ArrayList<String>();
        lintService.lint().stream()
                .filter(f -> f.severity() == LintSeverity.ERROR)
                .forEach(f -> blockers.add("lint " + f.ruleId() + ": " + f.elementName()));
        repository.findAllOfType(DecisionEntity.class).stream()
                .filter(d -> d.status() == DecisionStatus.PROPOSED)
                .forEach(d -> blockers.add("decisión abierta: " + d.name()));
        return new Gate(blockers.isEmpty(), List.copyOf(blockers));
    }

    /** Status transition of the CURRENT branch's solution; APPROVED enforces the gate. */
    public SolutionEntity setStatus(String status) {
        var solution = currentSolution();
        if ("APPROVED".equals(status)) {
            var gate = approvalGate();
            if (!gate.ok()) {
                throw new IllegalStateException(
                        "No se puede aprobar: " + String.join(" · ", gate.blockers()));
            }
        }
        var updated = new SolutionEntity(solution.id(), solution.name(), solution.description(),
                status, solution.decisionIds());
        repository.save(updated);
        return updated;
    }

    // ---- the semantic three-way merge --------------------------------------

    /** One element changed on both sides — the reviewer picks a side. */
    public record ElementConflict(String key, String type, String id, String name,
                                  String system, String solution) {}

    public record MergeCheck(String branch, List<ElementConflict> conflicts) {}

    /** Dry run: the conflicts a merge (either direction) would need resolved. */
    public MergeCheck check() {
        var sides = loadSides();
        return new MergeCheck(git.currentBranch(),
                threeWay(sides, Map.of(), null).conflicts);
    }

    /**
     * Merges the CURRENT solution into the system: semantic merge, committed on main as
     * a true merge commit (both parents), the solution archived (tag) and its branch
     * deleted. `resolutions` maps conflict keys to "system" | "solution".
     */
    public void mergeIntoSystem(Map<String, String> resolutions) {
        var solution = currentSolution();
        if (!"APPROVED".equals(solution.status())) {
            throw new IllegalStateException(
                    "Solo se mergea una solución APPROVED (estado actual: " + solution.status() + ")");
        }
        var branch = git.currentBranch();
        var sides = loadSides();
        var merged = threeWay(sides, resolutions, "solución " + solution.name());
        // A real merge commit: take main's tree with -s ours, then write the semantic
        // result over it — git keeps both parents, modux decides the content.
        git.commitAllPublic("wip: " + branch);
        git.raw("checkout", SolutionGitService.SYSTEM_BRANCH);
        git.raw("merge", "--no-ff", "--no-commit", "-s", "ours", branch);
        repository.loadFrom(repository.storePath().toString());
        repository.replaceWith(withoutSolutions(merged.result));
        git.commitMerge("solución " + solution.name() + ": mergeada al sistema");
        git.raw("tag", "-f", "archive/" + branch.replace('/', '-'), branch);
        git.raw("branch", "-D", branch);
        repository.loadFrom(repository.storePath().toString());
    }

    /** Brings the system's advances INTO the living solution (the semantic rebase). */
    public void updateFromSystem(Map<String, String> resolutions) {
        var solution = currentSolution();
        var branch = git.currentBranch();
        var sides = loadSides();
        var merged = threeWay(sides, resolutions, "solución " + solution.name());
        git.commitAllPublic("wip: " + branch);
        git.raw("merge", "--no-ff", "--no-commit", "-s", "ours",
                SolutionGitService.SYSTEM_BRANCH);
        repository.replaceWith(merged.result);
        git.commitMerge("solución " + solution.name() + ": actualizada desde el sistema");
        repository.loadFrom(repository.storePath().toString());
    }

    // ---- internals ----------------------------------------------------------

    private SolutionEntity currentSolution() {
        if (!git.currentBranch().startsWith(SolutionGitService.SOLUTION_PREFIX)) {
            throw new IllegalStateException("El sistema no se aprueba ni se mergea consigo mismo");
        }
        return repository.findAllOfType(SolutionEntity.class).stream().findFirst()
                .orElseThrow(() -> new IllegalStateException(
                        "La rama no registra su SolutionEntity"));
    }

    private record Sides(AllData base, AllData system, AllData solution) {}

    @SneakyThrows
    private Sides loadSides() {
        var branch = git.currentBranch();
        var baseSha = git.raw("merge-base", SolutionGitService.SYSTEM_BRANCH, branch).trim();
        var base = loadAt(baseSha);
        var system = loadAt(SolutionGitService.SYSTEM_BRANCH);
        return new Sides(base, system, repository.snapshot());
    }

    @SneakyThrows
    private AllData loadAt(String ref) {
        var worktree = git.addWorktree(ref);
        try {
            var store = worktree.resolve(git.repoDir().relativize(repository.storePath()));
            return Files.isDirectory(store)
                    ? granularFormat.load(store)
                    : monolithicFormat.load(store);
        } finally {
            git.removeWorktree(worktree);
        }
    }

    private record MergeOutcome(AllData result, List<ElementConflict> conflicts) {}

    /**
     * Element-by-element three-way merge. Unresolved conflicts are reported; when a
     * `mergeLabel` is given (a real merge) any unresolved conflict aborts with the list.
     */
    @SneakyThrows
    private MergeOutcome threeWay(Sides sides, Map<String, String> resolutions, String mergeLabel) {
        var components = AllData.class.getRecordComponents();
        var args = new Object[components.length];
        var conflicts = new ArrayList<ElementConflict>();
        for (var i = 0; i < components.length; i++) {
            var name = components[i].getName();
            if (META.contains(name)) {
                // geometry follows the solution; the registry is handled by the callers
                args[i] = components[i].getAccessor().invoke(sides.solution);
                continue;
            }
            var base = byId(sides.base, name);
            var system = byId(sides.system, name);
            var solution = byId(sides.solution, name);
            var ids = new LinkedHashSet<String>();
            ids.addAll(system.keySet());
            ids.addAll(solution.keySet());
            ids.addAll(base.keySet());
            var merged = new ArrayList<>();
            for (var id : ids) {
                var b = base.get(id);
                var s = system.get(id);
                var t = solution.get(id);
                if (Objects.equals(s, t)) {
                    if (s != null) merged.add(s);
                } else if (Objects.equals(b, s)) {
                    if (t != null) merged.add(t); // only the solution touched it
                } else if (Objects.equals(b, t)) {
                    if (s != null) merged.add(s); // only the system touched it
                } else {
                    var key = name + ":" + id;
                    var pick = resolutions.get(key);
                    if ("system".equals(pick)) {
                        if (s != null) merged.add(s);
                    } else if ("solution".equals(pick)) {
                        if (t != null) merged.add(t);
                    } else {
                        conflicts.add(new ElementConflict(key, name, id,
                                stringProperty(t != null ? t : s),
                                toYaml(s), toYaml(t)));
                    }
                }
            }
            args[i] = List.copyOf(merged);
        }
        if (mergeLabel != null && !conflicts.isEmpty()) {
            throw new IllegalStateException("Conflictos sin resolver ("
                    + conflicts.size() + "): "
                    + conflicts.stream().map(ElementConflict::key).limit(8)
                            .reduce((a, b) -> a + ", " + b).orElse(""));
        }
        var constructor = AllData.class.getDeclaredConstructors()[0];
        constructor.setAccessible(true);
        return new MergeOutcome((AllData) constructor.newInstance(args), conflicts);
    }

    @SneakyThrows
    private static AllData withoutSolutions(AllData data) {
        var components = AllData.class.getRecordComponents();
        var args = new Object[components.length];
        for (var i = 0; i < components.length; i++) {
            args[i] = "solutions".equals(components[i].getName())
                    ? List.of()
                    : components[i].getAccessor().invoke(data);
        }
        var constructor = AllData.class.getDeclaredConstructors()[0];
        constructor.setAccessible(true);
        return (AllData) constructor.newInstance(args);
    }

    @SneakyThrows
    private static Map<String, Object> byId(AllData data, String componentName) {
        for (var component : AllData.class.getRecordComponents()) {
            if (!component.getName().equals(componentName)) continue;
            var list = (List<?>) component.getAccessor().invoke(data);
            var byId = new LinkedHashMap<String, Object>();
            for (var element : list == null ? List.of() : list) {
                if (element instanceof Identifiable identifiable) {
                    byId.put(identifiable.id(), element);
                }
            }
            return byId;
        }
        return Map.of();
    }

    private static String stringProperty(Object element) {
        try {
            var value = element.getClass().getMethod("name").invoke(element);
            return value != null ? value.toString() : null;
        } catch (ReflectiveOperationException e) {
            return null;
        }
    }

    @SneakyThrows
    private static String toYaml(Object element) {
        return element == null ? null : YAML.writeValueAsString(element);
    }
}
