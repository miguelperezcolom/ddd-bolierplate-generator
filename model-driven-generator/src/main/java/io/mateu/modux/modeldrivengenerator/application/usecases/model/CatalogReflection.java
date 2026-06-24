package io.mateu.modux.modeldrivengenerator.application.usecases.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Reflection helpers over catalog elements (records): collect the ids they declare and the references
 * they make. Shared by the integrity check and the view-closure computation so both walk the model
 * the same way. A reference is any {@code *Id} field (single) or {@code *Ids} list, including those
 * nested inside records (use-case steps, aggregate operations, business-rule conditions…).
 */
public final class CatalogReflection {

    private CatalogReflection() {
    }

    /** A reference found in an element: its field path (for diagnostics) and the referenced id. */
    public record Reference(String path, String id) {
    }

    /** {@code *Id}-suffixed fields that are NOT element references (free text / external ids). */
    private static final Set<String> NON_REFERENCE_ID_FIELDS = Set.of(
            "idempotencyKeyField"
    );

    private static final String MODEL_PACKAGE = "io.mateu.modux";

    /** Every id declared by the element, including ids nested inside its records. */
    public static Set<String> ids(Object node) {
        var ids = new HashSet<String>();
        collectIds(node, ids);
        return ids;
    }

    /** Every reference the element makes (single {@code *Id} and {@code *Ids} lists), recursively. */
    public static List<Reference> references(Object node) {
        var references = new ArrayList<Reference>();
        collectReferences(node, "", references);
        return references;
    }

    public static boolean isReferenceField(String name) {
        return name.endsWith("Id") && !"id".equals(name) && !NON_REFERENCE_ID_FIELDS.contains(name);
    }

    private static void collectIds(Object node, Set<String> ids) {
        if (node == null) return;
        for (var component : node.getClass().getRecordComponents()) {
            var value = read(node, component.getName());
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

    private static void collectReferences(Object node, String path, List<Reference> out) {
        if (node == null) return;
        for (var component : node.getClass().getRecordComponents()) {
            var name = component.getName();
            var value = read(node, name);
            if (value == null) continue;
            var fieldPath = path.isEmpty() ? name : path + "." + name;

            if (value instanceof String s) {
                if (isReferenceField(name) && !s.isBlank()) {
                    out.add(new Reference(fieldPath, s));
                }
            } else if (value instanceof List<?> list) {
                if (name.endsWith("Ids")) {
                    for (var item : list) {
                        if (item instanceof String s && !s.isBlank()) {
                            out.add(new Reference(fieldPath, s));
                        }
                    }
                } else {
                    for (var item : list) {
                        if (isModelRecord(item)) collectReferences(item, fieldPath, out);
                    }
                }
            } else if (isModelRecord(value)) {
                collectReferences(value, fieldPath, out);
            }
        }
    }

    private static boolean isModelRecord(Object o) {
        return o != null && o.getClass().isRecord()
                && o.getClass().getPackageName().startsWith(MODEL_PACKAGE);
    }

    private static Object read(Object node, String component) {
        try {
            return node.getClass().getMethod(component).invoke(node);
        } catch (ReflectiveOperationException e) {
            return null;
        }
    }
}
