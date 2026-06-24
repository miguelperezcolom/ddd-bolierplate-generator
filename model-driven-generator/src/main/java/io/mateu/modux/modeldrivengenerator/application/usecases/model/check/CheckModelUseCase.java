package io.mateu.modux.modeldrivengenerator.application.usecases.model.check;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.uidl.interfaces.Identifiable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Referential-integrity check over the whole catalog: every {@code *Id} / {@code *Ids} reference must
 * point at an element id that actually exists (top-level or nested). Dangling references are easy to
 * introduce and the single-file store hides them; this surfaces them. It is also the validation a
 * future granular store and the views feature reuse (see {@code docs/design/catalog-and-views.md}).
 */
@Service
@RequiredArgsConstructor
public class CheckModelUseCase {

    private final CommonFileRepository repository;

    /** {@code *Id}-suffixed fields that are NOT element references (free text / external ids). */
    private static final Set<String> NON_REFERENCE_ID_FIELDS = Set.of(
            "idempotencyKeyField"
    );

    private static final String MODEL_PACKAGE = "io.mateu.modux";

    public record Violation(String elementType, String elementId, String field, String missingId) {
        @Override
        public String toString() {
            return elementType + " '" + elementId + "' → field '" + field
                    + "' references missing id '" + missingId + "'";
        }
    }

    /** Returns every dangling reference found in the loaded model (empty when the model is clean). */
    public List<Violation> check() {
        var elements = repository.allElements();

        // 1. collect every id in the catalog, including ids nested inside records (operations, steps…)
        var ids = new HashSet<String>();
        for (var element : elements) {
            collectIds(element, ids);
        }

        // 2. walk every reference and flag the ones that resolve to nothing
        var violations = new ArrayList<Violation>();
        for (var element : elements) {
            if (element instanceof Identifiable identifiable) {
                collectViolations(element, element.getClass().getSimpleName(),
                        identifiable.id(), "", ids, violations);
            }
        }
        return violations;
    }

    private void collectIds(Object node, Set<String> ids) {
        if (node == null) return;
        for (var component : node.getClass().getRecordComponents()) {
            Object value = read(node, component.getName());
            if (value == null) continue;
            if ("id".equals(component.getName()) && value instanceof String s && !s.isBlank()) {
                ids.add(s);
            } else if (value instanceof List<?> list) {
                for (var item : list) {
                    if (isModelRecord(item)) collectIds(item, ids);
                }
            } else if (isModelRecord(value)) {
                collectIds(value, ids);
            }
        }
    }

    private void collectViolations(Object node, String rootType, String rootId, String path,
                                   Set<String> ids, List<Violation> out) {
        if (node == null) return;
        for (var component : node.getClass().getRecordComponents()) {
            var name = component.getName();
            Object value = read(node, name);
            if (value == null) continue;
            var fieldPath = path.isEmpty() ? name : path + "." + name;

            if (value instanceof String s) {
                if (isReferenceField(name) && !s.isBlank() && !ids.contains(s)) {
                    out.add(new Violation(rootType, rootId, fieldPath, s));
                }
            } else if (value instanceof List<?> list) {
                if (name.endsWith("Ids")) {
                    for (var item : list) {
                        if (item instanceof String s && !s.isBlank() && !ids.contains(s)) {
                            out.add(new Violation(rootType, rootId, fieldPath, s));
                        }
                    }
                } else {
                    for (var item : list) {
                        if (isModelRecord(item)) collectViolations(item, rootType, rootId, fieldPath, ids, out);
                    }
                }
            } else if (isModelRecord(value)) {
                collectViolations(value, rootType, rootId, fieldPath, ids, out);
            }
        }
    }

    private boolean isReferenceField(String name) {
        return name.endsWith("Id") && !"id".equals(name) && !NON_REFERENCE_ID_FIELDS.contains(name);
    }

    private boolean isModelRecord(Object o) {
        return o != null && o.getClass().isRecord()
                && o.getClass().getPackageName().startsWith(MODEL_PACKAGE);
    }

    private Object read(Object node, String component) {
        try {
            return node.getClass().getMethod(component).invoke(node);
        } catch (ReflectiveOperationException e) {
            return null;
        }
    }
}
