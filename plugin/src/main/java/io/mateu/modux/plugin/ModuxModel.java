package io.mateu.modux.plugin;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AllData;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage.GranularYamlStorageFormat;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage.MonolithicYamlStorageFormat;

import java.lang.reflect.RecordComponent;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;

/**
 * Locates and reads the model a build generates from.
 *
 * <p>A repository is a project: the model lives in one directory (<code>modux/</code> by
 * convention) and holds exactly one project element, so nothing here has to ask which project
 * is "current". See {@code docs/design/ide-plugin.md}.
 */
final class ModuxModel {

    /** Where a project keeps its model, relative to the module the build runs in. */
    static final String DEFAULT_PATH = "modux";

    private final Path root;
    private final AllData data;

    private ModuxModel(Path root, AllData data) {
        this.root = root;
        this.data = data;
    }

    /** Read the model at {@code path}, granular or monolithic. */
    static ModuxModel read(Path path) throws Exception {
        if (!Files.exists(path)) {
            throw new IllegalStateException(
                    "No hay modelo en " + path.toAbsolutePath()
                            + ". Un repositorio es un proyecto: el modelo va en " + DEFAULT_PATH + "/.");
        }
        var granular = new GranularYamlStorageFormat();
        var data = granular.handles(path)
                ? granular.load(path)
                : new MonolithicYamlStorageFormat().load(path);
        return new ModuxModel(path, data);
    }

    Path root() {
        return root;
    }

    AllData data() {
        return data;
    }

    /**
     * The project this repository holds. Fails loudly when there is none, and when there is
     * more than one — that is a store that predates one-project-per-repository and needs
     * splitting, not a case to guess at.
     */
    Object project() {
        var projects = listOf("projects");
        if (projects.isEmpty()) {
            throw new IllegalStateException("El modelo en " + root + " no tiene proyecto");
        }
        if (projects.size() > 1) {
            throw new IllegalStateException(
                    "El modelo en " + root + " tiene " + projects.size() + " proyectos. "
                            + "Un repositorio es un proyecto: sepáralos en repositorios distintos.");
        }
        return projects.get(0);
    }

    /** Read a property off the project element by accessor name. */
    Optional<String> projectString(String property) {
        try {
            var value = project().getClass().getMethod(property).invoke(project());
            return value == null || value.toString().isBlank()
                    ? Optional.empty()
                    : Optional.of(value.toString());
        } catch (ReflectiveOperationException e) {
            return Optional.empty();
        }
    }

    /** One of {@code AllData}'s lists, by record component name. */
    @SuppressWarnings("unchecked")
    List<Object> listOf(String component) {
        for (RecordComponent rc : AllData.class.getRecordComponents()) {
            if (!rc.getName().equals(component)) continue;
            try {
                var value = rc.getAccessor().invoke(data);
                return value == null ? List.of() : (List<Object>) value;
            } catch (ReflectiveOperationException e) {
                return List.of();
            }
        }
        return List.of();
    }

    /** Every element in the model, paired with the type bucket it came from. */
    List<Element> elements() {
        return java.util.Arrays.stream(AllData.class.getRecordComponents())
                .flatMap(rc -> listOf(rc.getName()).stream().map(e -> new Element(rc.getName(), e)))
                .toList();
    }

    record Element(String type, Object value) {}
}
