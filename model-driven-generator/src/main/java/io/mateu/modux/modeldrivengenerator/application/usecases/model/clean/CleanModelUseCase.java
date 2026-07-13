package io.mateu.modux.modeldrivengenerator.application.usecases.model.clean;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.application.usecases.model.CatalogReflection;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ElementTypeRegistry;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.uidl.interfaces.Identifiable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Finds (and optionally deletes) the model's ORPHANS: elements that reference nothing and that
 * nothing references — leftovers of exploration that only add noise to the diagrams and the
 * generated code. Deliberately conservative: a single relation in either direction keeps an
 * element alive, projects are never candidates, and a bounded context and its auto-created main
 * module count as ONE unit (their mutual umbilical link doesn't make either of them "related";
 * they are kept or removed together).
 */
@Service
@RequiredArgsConstructor
public class CleanModelUseCase {

    private final ModelStore repository;
    private final ElementTypeRegistry registry;

    public record Orphan(String type, String id, String name) {
    }

    /**
     * Never cleanup candidates: the project is the root, diagrams are layout (they position
     * elements without *Id references), and solutions are workspace branches, not model content.
     */
    private static final Set<String> STRUCTURAL_TYPES = Set.of("projects", "diagrams", "solutions");

    /** One pass is the fixpoint: orphans make no references, so removing them orphans nobody else. */
    public List<Orphan> findOrphans() {
        var elements = List.copyOf(repository.allElements());

        // Per element: the ids it declares (own + nested) and the refs it makes to OTHERS.
        // A main module's ref to its bounded context is the umbilical, not a relation.
        var declared = new ArrayList<Set<String>>();
        var outgoing = new ArrayList<Set<String>>();
        for (var element : elements) {
            var ids = CatalogReflection.ids(element);
            declared.add(ids);
            var umbilical = element instanceof ModuleEntity module && module.main()
                    ? module.boundedContextId() : null;
            outgoing.add(CatalogReflection.references(element).stream()
                    .map(CatalogReflection.Reference::id)
                    .filter(id -> !ids.contains(id) && !id.equals(umbilical))
                    .collect(Collectors.toSet()));
        }
        var referencedBy = new HashMap<String, Set<Integer>>();
        for (var i = 0; i < elements.size(); i++) {
            for (var ref : outgoing.get(i)) {
                referencedBy.computeIfAbsent(ref, k -> new HashSet<>()).add(i);
            }
        }

        var mainModules = new HashMap<String, Integer>(); // bounded context id → element index
        for (var i = 0; i < elements.size(); i++) {
            if (elements.get(i) instanceof ModuleEntity module && module.main()) {
                mainModules.put(module.boundedContextId(), i);
            }
        }

        var orphans = new ArrayList<Orphan>();
        for (var i = 0; i < elements.size(); i++) {
            var element = elements.get(i);
            if (!(element instanceof Identifiable identifiable)) continue;
            var type = registry.nameFor(element.getClass());
            if (STRUCTURAL_TYPES.contains(type)) continue;
            // Main modules live and die with their bounded context, never on their own.
            if (element instanceof ModuleEntity module && module.main()) continue;
            if (!isolated(i, declared, outgoing, referencedBy)) continue;
            // A bounded context's unit includes its main module: a deployed main module
            // (wired into a service) keeps the pair alive.
            var mainModule = mainModules.get(identifiable.id());
            if (mainModule != null && !isolated(mainModule, declared, outgoing, referencedBy)) continue;
            orphans.add(new Orphan(type, identifiable.id(), nameOf(element, identifiable.id())));
            if (mainModule != null && elements.get(mainModule) instanceof Identifiable main) {
                orphans.add(new Orphan(registry.nameFor(elements.get(mainModule).getClass()),
                        main.id(), nameOf(elements.get(mainModule), main.id())));
            }
        }
        return orphans;
    }

    public String report() {
        var orphans = findOrphans();
        if (orphans.isEmpty()) {
            return "✅ No hay huérfanos: todos los elementos están relacionados con algo.";
        }
        return orphans.size() + " huérfano(s) — no referencian a nadie y nadie los referencia:\n"
                + orphans.stream()
                        .map(o -> "- " + o.type() + " «" + o.name() + "» (" + o.id() + ")")
                        .collect(Collectors.joining("\n"));
    }

    public String deleteOrphans() {
        var orphans = findOrphans();
        if (orphans.isEmpty()) {
            return "✅ Nada que limpiar: no hay huérfanos en el modelo.";
        }
        Map<String, List<Orphan>> byType = orphans.stream()
                .collect(Collectors.groupingBy(Orphan::type, LinkedHashMap::new, Collectors.toList()));
        byType.forEach((type, group) -> repository.deleteAllById(
                group.stream().map(Orphan::id).toList(), registry.classFor(type)));
        return "🧹 Eliminados " + orphans.size() + " huérfano(s):\n"
                + orphans.stream()
                        .map(o -> "- " + o.type() + " «" + o.name() + "» (" + o.id() + ")")
                        .collect(Collectors.joining("\n"));
    }

    /** No relation in either direction (its own declarations aside). */
    private static boolean isolated(int index, List<Set<String>> declared,
                                    List<Set<String>> outgoing, Map<String, Set<Integer>> referencedBy) {
        if (!outgoing.get(index).isEmpty()) return false;
        for (var id : declared.get(index)) {
            for (var referrer : referencedBy.getOrDefault(id, Set.of())) {
                if (referrer != index) return false;
            }
        }
        return true;
    }

    private static String nameOf(Object element, String fallback) {
        try {
            var value = element.getClass().getMethod("name").invoke(element);
            if (value instanceof String name && !name.isBlank()) return name;
        } catch (Exception ignored) {
            // not every element has a name; the id identifies it just as well
        }
        return fallback;
    }
}
