package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import org.springframework.stereotype.Service;

import java.lang.reflect.ParameterizedType;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * The catalog of element types, derived from {@link AllData}: maps the public type name (the record
 * component name, e.g. {@code aggregates}) to the entity class (e.g. {@link AggregateEntity}). This
 * is the single place where "what element types exist" is answered for generic surfaces (MCP tools,
 * schema generation, workspace tree).
 */
@Service
public class ElementTypeRegistry {

    private final Map<String, Class<?>> typesByName = new LinkedHashMap<>();
    private final Map<Class<?>, String> namesByType = new LinkedHashMap<>();

    public ElementTypeRegistry() {
        for (var component : AllData.class.getRecordComponents()) {
            var elementType = (Class<?>) ((ParameterizedType) component.getGenericType())
                    .getActualTypeArguments()[0];
            typesByName.put(component.getName(), elementType);
            namesByType.put(elementType, component.getName());
        }
    }

    /** Every element type: public name (e.g. "aggregates") → entity class, in {@link AllData} order. */
    public Map<String, Class<?>> all() {
        return Collections.unmodifiableMap(typesByName);
    }

    public Class<?> classFor(String typeName) {
        var type = typesByName.get(typeName);
        if (type == null) {
            throw new IllegalArgumentException("Unknown element type '" + typeName + "'. Valid types: "
                    + String.join(", ", typesByName.keySet()));
        }
        return type;
    }

    /** The public type name for an entity class, or the class simple name if it is not top-level. */
    public String nameFor(Class<?> entityClass) {
        return namesByType.getOrDefault(entityClass, entityClass.getSimpleName());
    }
}
