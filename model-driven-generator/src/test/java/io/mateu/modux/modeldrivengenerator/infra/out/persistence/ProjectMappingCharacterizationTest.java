package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.ProjectId;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DeploymentEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelJsonSchemaGenerator;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage.GranularYamlStorageFormat;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage.MonolithicYamlStorageFormat;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.nio.file.Path;

import java.lang.reflect.RecordComponent;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * The project's entity ↔ domain mapping, pinned field by field.
 *
 * <p>{@code ProjectFileRepository} maps ~30 fields by position, and a dozen of them are plain
 * strings — swapping {@code emailHost} for {@code secretsEndpoint} compiles, runs, and corrupts
 * a project silently. Nothing covered this before.
 *
 * <p>The test is written reflectively rather than field by field so it keeps holding as the
 * record changes: every string gets its own component name as its value, so a swap shows up as
 * a field reporting somebody else's name.
 */
class ProjectMappingCharacterizationTest {

    /**
     * A repository on its own empty store. The path has to be per-test: the store persists on
     * every save, so a shared one leaks state from one test into the next.
     */
    private static ProjectFileRepository repository(Path dir) {
        var store = new CommonFileRepository(
                new MonolithicYamlStorageFormat(), new GranularYamlStorageFormat(),
                new ModelJsonSchemaGenerator());
        store.loadFrom(dir.resolve("model.yaml").toAbsolutePath().toString());
        return new ProjectFileRepository(store);
    }

    /** A project with every field set to something distinguishable. */
    private static ProjectEntity fullyPopulated() throws Exception {
        var components = ProjectEntity.class.getRecordComponents();
        // the record has backward-compatible constructors too; only the canonical one takes them all
        var constructor = java.util.Arrays.stream(ProjectEntity.class.getDeclaredConstructors())
                .filter(c -> c.getParameterCount() == components.length)
                .findFirst().orElseThrow();
        constructor.setAccessible(true);
        var args = new Object[components.length];
        for (var i = 0; i < components.length; i++) {
            args[i] = sampleFor(components[i]);
        }
        return (ProjectEntity) constructor.newInstance(args);
    }

    /**
     * Strings on the entity that the domain parses into an enum, so they cannot hold an
     * arbitrary marker. Each is stored as text but constrained in value — worth knowing.
     */
    private static final java.util.Map<String, String> CONSTRAINED_STRINGS = java.util.Map.of(
            "cicdProvider", "GITHUB_ACTIONS",
            "dataAccess", "JDBC");

    private static Object sampleFor(RecordComponent component) {
        var type = component.getType();
        if (CONSTRAINED_STRINGS.containsKey(component.getName())) {
            return CONSTRAINED_STRINGS.get(component.getName());
        }
        if (type == String.class) return component.getName();
        if (type.isEnum()) return type.getEnumConstants()[0];
        if (type == List.class) return List.of();
        if (type == Boolean.class || type == boolean.class) return Boolean.TRUE;
        return null;
    }

    /** Component names whose value legitimately does not survive the domain round trip. */
    private static final List<String> NOT_MAPPED = List.of(
            // legacy, emptied on load by design — see LegacyProjectElementsMigrationTest
            "contextMap", "externalSystems");

    @Test
    void every_scalar_field_survives_the_round_trip_through_the_domain(@TempDir Path dir) throws Exception {
        var repository = repository(dir);
        var original = fullyPopulated();
        repository.repository.save(original);

        var domain = repository.findById(new ProjectId(original.id())).orElseThrow();
        repository.save(domain);
        var round = repository.repository.findById(original.id(), ProjectEntity.class).orElseThrow();

        var lost = new ArrayList<String>();
        for (var component : ProjectEntity.class.getRecordComponents()) {
            if (NOT_MAPPED.contains(component.getName())) continue;
            var before = component.getAccessor().invoke(original);
            var after = component.getAccessor().invoke(round);
            if (before instanceof String && !before.equals(after)) {
                lost.add(component.getName() + ": '" + before + "' → '" + after + "'");
            }
        }

        assertTrue(lost.isEmpty(), "fields corrupted or dropped by the mapping: " + lost);
    }

    @Test
    void no_two_string_fields_are_crossed(@TempDir Path dir) throws Exception {
        var repository = repository(dir);
        var original = fullyPopulated();
        repository.repository.save(original);

        var domain = repository.findById(new ProjectId(original.id())).orElseThrow();
        repository.save(domain);
        var round = repository.repository.findById(original.id(), ProjectEntity.class).orElseThrow();

        for (var component : ProjectEntity.class.getRecordComponents()) {
            if (NOT_MAPPED.contains(component.getName()) || component.getType() != String.class) continue;
            if (CONSTRAINED_STRINGS.containsKey(component.getName())) continue;
            var value = component.getAccessor().invoke(round);

            // each string carries its own field name, so anything else means a crossed wire
            assertEquals(component.getName(), value,
                    "field " + component.getName() + " came back holding another field's value");
        }
    }

    /**
     * The deployment settings live in their own element now. A save has to land them THERE, not
     * carry them along on the project by accident — which is what the round-trip test above would
     * happily let through, since {@code save} starts from the stored entity.
     */
    @Test
    void the_deployment_settings_land_on_their_own_element(@TempDir Path dir) throws Exception {
        var repository = repository(dir);
        var original = fullyPopulated();
        repository.repository.save(original);
        System.out.println("DBG stored.database=" + repository.repository.findById(original.id(), ProjectEntity.class).get().database());

        var domain = repository.findById(new ProjectId(original.id())).orElseThrow();
        assertEquals("database", domain.getDatabase(), "the domain must see it before the save can store it");
        repository.save(domain);

        var deployment = repository.repository
                .findById(DeploymentEntity.idFor(original.id()), DeploymentEntity.class).orElseThrow();

        assertEquals("database", deployment.database());
        assertEquals("terraformProviderVersion", deployment.terraformProviderVersion());
        assertEquals("dockerRegistry", deployment.dockerRegistry());
        assertEquals(original.dbMigrationTool(), deployment.dbMigrationTool());
        assertEquals(original.tenancyStrategy(), deployment.tenancyStrategy());
    }

}
