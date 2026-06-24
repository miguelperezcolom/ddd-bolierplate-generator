package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLMapper;
import com.github.victools.jsonschema.generator.Option;
import com.github.victools.jsonschema.generator.OptionPreset;
import com.github.victools.jsonschema.generator.SchemaGenerator;
import com.github.victools.jsonschema.generator.SchemaGeneratorConfigBuilder;
import com.github.victools.jsonschema.generator.SchemaVersion;
import com.github.victools.jsonschema.module.jackson.JacksonModule;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import io.mateu.uidl.interfaces.Identifiable;
import jakarta.annotation.PostConstruct;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static io.mateu.core.infra.JsonSerializer.pojoFromJson;
import static io.mateu.core.infra.JsonSerializer.toJson;

@Service
@Slf4j
public class CommonFileRepository {

    private final Map<String, Object> store = new HashMap<>();

    /** Directory that holds the resolved model store; generated schema is written next to it. */
    private Path dataDir = Path.of(".dev/data");

    /** The resolved model store path; persist writes back here (consistent with where it was read). */
    private Path storePath = Path.of(".dev/data/model-driven-store.yaml");

    private final io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage.MonolithicYamlStorageFormat monolithicFormat;
    private final io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage.GranularYamlStorageFormat granularFormat;
    /** The format the model was loaded with; persist writes back in the same format. */
    private io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage.ModelStorageFormat activeFormat;

    /** True after a scoped (partial) load: only a slice of a granular model is in memory, so it is read-only. */
    private boolean scoped;

    public CommonFileRepository(
            io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage.MonolithicYamlStorageFormat monolithicFormat,
            io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage.GranularYamlStorageFormat granularFormat) {
        this.monolithicFormat = monolithicFormat;
        this.granularFormat = granularFormat;
        this.activeFormat = monolithicFormat;
    }

    private String storeKey(String id, Class<?> type) {
        return type.getSimpleName() + ":" + id;
    }

    public <T> Optional<T> findById(String id, Class<T> type) {
        return Optional.ofNullable((T) store.get(storeKey(id, type)));
    }
    public void save(Identifiable o) {
        store.put(storeKey(o.id(), o.getClass()), o);
        persist();
    }

    /** Puts an entity into the in-memory store without persisting to disk (transient/derived data). */
    public void putTransient(Identifiable o) {
        store.put(storeKey(o.id(), o.getClass()), o);
    }

    public <T> ListingData<T> findAll(String searchText, Object filters, Pageable pageable, Class<T> entityClass) {
        var data = (List<T>) store.values().stream().filter(v -> v.getClass().equals(entityClass)).toList();
        return new ListingData<T>(new Page<T>(searchText, pageable.size(), pageable.page(), data.size(),
                data.stream().skip(pageable.page() * pageable.size()).limit(pageable.size()).toList()));
    }

    public <T> List<T> findAllOfType(Class<T> type) {
        return (List<T>) store.values().stream()
                .filter(v -> v.getClass().equals(type))
                .toList();
    }

    /** Every catalog element currently loaded (all types), for whole-model passes like integrity checks. */
    public java.util.Collection<Object> allElements() {
        return new java.util.ArrayList<>(store.values());
    }

    public <T> void deleteAllById(List<String> list, Class<T> type) {
        list.forEach(id -> store.remove(storeKey(id, type)));
        persist();
    }

    private String overrideModelFile;

    /** Loads the model from a specific store file (replacing whatever is loaded), then re-initialises. */
    public void loadFrom(String modelFilePath) {
        this.overrideModelFile = modelFilePath;
        init();
    }

    @SneakyThrows
    @PostConstruct
    public void init() {
        var specFile = overrideModelFile != null ? overrideModelFile
                : System.getProperty("modux.model-file", ".dev/data/model-driven-store.yaml");
        scoped = false;
        storePath = Path.of(specFile).toAbsolutePath().normalize();
        activeFormat = granularFormat.handles(storePath) ? granularFormat : monolithicFormat;
        dataDir = activeFormat.dataDir(storePath);
        log.info("spec store ({}) in {}", activeFormat.getClass().getSimpleName(), storePath);

        AllData data = activeFormat.load(storePath);
        generateSchema();
        loadIntoStore(data);
    }

    /** Flatten an {@link AllData} into the in-memory catalog, keyed by (id, type), via reflection. */
    private void loadIntoStore(AllData data) {
        store.clear();
        for (var component : AllData.class.getRecordComponents()) {
            try {
                var list = (List<?>) component.getAccessor().invoke(data);
                if (list == null) continue;
                for (var element : list) {
                    if (element instanceof Identifiable identifiable) {
                        store.put(storeKey(identifiable.id(), element.getClass()), element);
                    }
                }
            } catch (ReflectiveOperationException e) {
                throw new IllegalStateException("Could not read AllData component " + component.getName(), e);
            }
        }
    }

    /** Rebuild an {@link AllData} from the in-memory catalog (inverse of {@link #loadIntoStore}). */
    private AllData buildAllData() {
        var components = AllData.class.getRecordComponents();
        var args = new Object[components.length];
        for (var i = 0; i < components.length; i++) {
            var elementType = (Class<?>) ((java.lang.reflect.ParameterizedType) components[i].getGenericType())
                    .getActualTypeArguments()[0];
            args[i] = store.values().stream().filter(v -> v.getClass().equals(elementType)).toList();
        }
        try {
            var constructor = AllData.class.getDeclaredConstructors()[0];
            constructor.setAccessible(true);
            return (AllData) constructor.newInstance(args);
        } catch (ReflectiveOperationException e) {
            throw new IllegalStateException("Could not build AllData from the catalog", e);
        }
    }

    /** Write the loaded model out as a granular file tree (one file per element). */
    @SneakyThrows
    public void splitTo(Path dir) {
        granularFormat.save(dir.toAbsolutePath().normalize(), buildAllData());
        log.info("model split into granular store at {}", dir.toAbsolutePath().normalize());
    }

    /** Write the loaded model out as a single monolithic YAML file. */
    @SneakyThrows
    public void mergeTo(Path file) {
        monolithicFormat.save(file.toAbsolutePath().normalize(), buildAllData());
        log.info("model merged into monolithic store at {}", file.toAbsolutePath().normalize());
    }

    @SneakyThrows
    private void persist() {
        if (scoped) {
            throw new IllegalStateException("The model is partially loaded (a view scope) and is read-only. "
                    + "Load the full model before saving.");
        }
        activeFormat.save(storePath, buildAllData());
    }

    /** Begin a partial (scoped) load on a granular store: clears the catalog and marks it read-only. */
    public void beginScopedLoad() {
        if (!(activeFormat instanceof io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage.GranularYamlStorageFormat)) {
            throw new IllegalStateException("Partial loading needs a granular store. Run --modux.split first, "
                    + "and point modux.model-file at the model directory.");
        }
        store.clear();
        scoped = true;
    }

    /** Load all elements of one type (e.g. "views") into the catalog; returns them. */
    @SneakyThrows
    public java.util.List<Object> loadTypeIntoStore(String componentName) {
        var elements = granularFormat.loadType(storePath, componentName);
        for (var element : elements) {
            if (element instanceof Identifiable identifiable) {
                store.put(storeKey(identifiable.id(), element.getClass()), element);
            }
        }
        return elements;
    }

    /** Load a single element by id into the catalog (lazy); returns it, or null if not a stored element. */
    @SneakyThrows
    public Object loadElementIntoStore(String id) {
        var element = granularFormat.loadElement(storePath, id);
        if (element instanceof Identifiable identifiable) {
            store.put(storeKey(identifiable.id(), element.getClass()), element);
        }
        return element;
    }

    @SneakyThrows
    private void generateSchema() {
        SchemaGeneratorConfigBuilder configBuilder = new SchemaGeneratorConfigBuilder(
                SchemaVersion.DRAFT_2020_12, OptionPreset.PLAIN_JSON)
                .with(new JacksonModule())
                .with(Option.FORBIDDEN_ADDITIONAL_PROPERTIES_BY_DEFAULT)
                .with(Option.DEFINITIONS_FOR_ALL_OBJECTS);
        SchemaGenerator generator = new SchemaGenerator(configBuilder.build());
        JsonNode schema = generator.generateSchema(AllData.class);
        String schemaJson = new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(schema);
        Path schemaPath = dataDir.resolve("model-driven-store-schema.json");
        Files.createDirectories(schemaPath.getParent());
        Files.writeString(schemaPath, schemaJson);
        log.info("JSON schema written to {}", schemaPath.toAbsolutePath());
    }

}
