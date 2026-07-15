package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import java.lang.reflect.RecordComponent;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Project membership over the store's records, by convention: every root element
 * carries a {@code projectId} component. Reflection is cached per class; classes
 * without the component (nested value records, {@link ProjectEntity}…) are simply
 * outside the scoping game — visible everywhere, never stamped.
 */
public final class ProjectScope {

    private record Accessor(java.lang.reflect.Method projectId, java.lang.reflect.Constructor<?> canonical,
                            RecordComponent[] components, int projectIdIndex) {}

    private static final Map<Class<?>, java.util.Optional<Accessor>> CACHE = new ConcurrentHashMap<>();

    private ProjectScope() {
    }

    private static java.util.Optional<Accessor> accessor(Class<?> type) {
        return CACHE.computeIfAbsent(type, t -> {
            if (!t.isRecord()) return java.util.Optional.empty();
            var components = t.getRecordComponents();
            for (var i = 0; i < components.length; i++) {
                if ("projectId".equals(components[i].getName()) && components[i].getType() == String.class) {
                    try {
                        var types = new Class<?>[components.length];
                        for (var j = 0; j < components.length; j++) types[j] = components[j].getType();
                        return java.util.Optional.of(new Accessor(
                                components[i].getAccessor(), t.getDeclaredConstructor(types), components, i));
                    } catch (NoSuchMethodException e) {
                        return java.util.Optional.empty();
                    }
                }
            }
            return java.util.Optional.empty();
        });
    }

    /** Does the element belong to the project? No component or no stamp yet = visible everywhere. */
    public static boolean inProject(Object element, String projectId) {
        if (element == null || projectId == null || projectId.isBlank()) return true;
        return accessor(element.getClass())
                .map(a -> {
                    try {
                        var own = (String) a.projectId().invoke(element);
                        return own == null || own.isBlank() || own.equals(projectId);
                    } catch (ReflectiveOperationException e) {
                        return true;
                    }
                })
                .orElse(true);
    }

    /**
     * The element with {@code projectId} stamped, when it has the component, it is still
     * unstamped and a project is selected; otherwise the SAME instance (identity signals
     * "nothing to do" to callers).
     */
    @SuppressWarnings("unchecked")
    public static <T> T stamped(T element, String projectId) {
        if (element == null || projectId == null || projectId.isBlank()) return element;
        return (T) accessor(element.getClass())
                .map(a -> {
                    try {
                        var own = (String) a.projectId().invoke(element);
                        if (own != null && !own.isBlank()) return element;
                        var values = new Object[a.components().length];
                        for (var i = 0; i < values.length; i++) {
                            values[i] = i == a.projectIdIndex()
                                    ? projectId : a.components()[i].getAccessor().invoke(element);
                        }
                        return a.canonical().newInstance(values);
                    } catch (ReflectiveOperationException e) {
                        return element;
                    }
                })
                .orElse(element);
    }
}
