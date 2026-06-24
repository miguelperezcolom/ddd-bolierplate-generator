package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AllData;
import io.mateu.uidl.interfaces.Identifiable;
import org.springframework.stereotype.Component;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.RecordComponent;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

/**
 * Granular format: the model as a directory tree, one file per element, grouped by type:
 *
 * <pre>
 *   model/
 *   ├── index.yaml              # format version + element counts
 *   ├── aggregates/{id}.yaml
 *   ├── usecases/{id}.yaml
 *   └── …                       # one subdirectory per AllData list
 * </pre>
 *
 * Driven by reflection over {@link AllData}'s record components, so new element types are handled
 * automatically. This is the storage that makes huge models diff/merge cleanly.
 */
@Component
public class GranularYamlStorageFormat implements ModelStorageFormat {

    private static final String INDEX = "index.yaml";

    @Override
    public boolean handles(Path path) {
        return Files.isDirectory(path);
    }

    @Override
    @SuppressWarnings("unchecked")
    public AllData load(Path path) throws Exception {
        var reader = ModelYaml.reader();
        var components = AllData.class.getRecordComponents();
        var args = new Object[components.length];

        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            var elementType = (Class<?>) ((ParameterizedType) component.getGenericType())
                    .getActualTypeArguments()[0];
            var dir = path.resolve(component.getName());
            var elements = new ArrayList<Object>();
            if (Files.isDirectory(dir)) {
                try (Stream<Path> files = Files.list(dir)) {
                    var sorted = files.filter(p -> p.getFileName().toString().endsWith(".yaml"))
                            .sorted()
                            .toList();
                    for (var file : sorted) {
                        elements.add(reader.readValue(file.toFile(), elementType));
                    }
                }
            }
            args[i] = elements;
        }

        var constructor = AllData.class.getDeclaredConstructors()[0];
        constructor.setAccessible(true);
        return (AllData) constructor.newInstance(args);
    }

    /** Load just the elements of one AllData list (one type) — for partial/lazy loading. */
    public List<Object> loadType(Path root, String componentName) throws Exception {
        var reader = ModelYaml.reader();
        var elements = new ArrayList<Object>();
        for (var component : AllData.class.getRecordComponents()) {
            if (!component.getName().equals(componentName)) continue;
            var elementType = (Class<?>) ((ParameterizedType) component.getGenericType())
                    .getActualTypeArguments()[0];
            var dir = root.resolve(componentName);
            if (Files.isDirectory(dir)) {
                try (Stream<Path> files = Files.list(dir)) {
                    for (var file : files.filter(p -> p.getFileName().toString().endsWith(".yaml")).sorted().toList()) {
                        elements.add(reader.readValue(file.toFile(), elementType));
                    }
                }
            }
        }
        return elements;
    }

    /** Locate and load a single top-level element by id (scans type dirs); null if not a stored element. */
    public Object loadElement(Path root, String id) throws Exception {
        var reader = ModelYaml.reader();
        var fileName = sanitize(id) + ".yaml";
        for (var component : AllData.class.getRecordComponents()) {
            var file = root.resolve(component.getName()).resolve(fileName);
            if (Files.exists(file)) {
                var elementType = (Class<?>) ((ParameterizedType) component.getGenericType())
                        .getActualTypeArguments()[0];
                return reader.readValue(file.toFile(), elementType);
            }
        }
        return null;
    }

    @Override
    public void save(Path path, AllData data) throws Exception {
        var writer = ModelYaml.writer();
        Files.createDirectories(path);
        var counts = new LinkedHashMap<String, Integer>();

        for (RecordComponent component : AllData.class.getRecordComponents()) {
            var list = (List<?>) component.getAccessor().invoke(data);
            var dir = path.resolve(component.getName());

            // rewrite the directory from scratch so removed elements don't linger as orphan files
            if (Files.isDirectory(dir)) {
                try (Stream<Path> existing = Files.list(dir)) {
                    for (var p : existing.filter(p -> p.getFileName().toString().endsWith(".yaml")).toList()) {
                        Files.delete(p);
                    }
                }
            }
            if (list == null || list.isEmpty()) {
                counts.put(component.getName(), 0);
                continue;
            }
            Files.createDirectories(dir);
            for (var element : list) {
                var id = element instanceof Identifiable identifiable ? identifiable.id() : null;
                var fileName = (id != null && !id.isBlank() ? sanitize(id) : "element") + ".yaml";
                Files.writeString(dir.resolve(fileName), writer.writeValueAsString(element));
            }
            counts.put(component.getName(), list.size());
        }

        // index: format identity + per-type counts (also how load detects a granular root)
        Map<String, Object> index = new LinkedHashMap<>();
        index.put("formatVersion", 1);
        index.put("counts", counts);
        Files.writeString(path.resolve(INDEX), writer.writeValueAsString(index));
    }

    @Override
    public Path dataDir(Path path) {
        return path.toAbsolutePath().normalize();
    }

    private String sanitize(String id) {
        return id.replaceAll("[^A-Za-z0-9._-]", "_");
    }
}
