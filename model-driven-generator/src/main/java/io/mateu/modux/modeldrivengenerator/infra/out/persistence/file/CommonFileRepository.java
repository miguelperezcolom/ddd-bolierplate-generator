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

    /** The resolved model store file; persist writes back here (consistent with where it was read). */
    private Path storePath = Path.of(".dev/data/model-driven-store.yaml");

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
        Path yamlPath = Path.of(specFile);
        Path jsonPath = Path.of(".dev/data/model-driven-store.json");
        storePath = yamlPath.toAbsolutePath().normalize();
        var parent = storePath.getParent();
        if (parent != null) {
            dataDir = parent;
        }
        AllData data;
        if (Files.exists(yamlPath)) {
            log.info("spec store in {}", yamlPath.toAbsolutePath());
            YAMLMapper yamlMapper = new YAMLMapper();
            data = yamlMapper.readValue(yamlPath.toFile(), AllData.class);
        } else {
            log.info("spec store in {}", jsonPath.toAbsolutePath());
            String json = Files.readString(jsonPath);
            data = pojoFromJson(json, AllData.class);
        }
        generateSchema();
        store.clear();
        data.projects().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.services().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.modules().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.aggregates().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.entities().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.valueObjects().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.invariants().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.domainEvents().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.useCases().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.models().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.gateways().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.modelMappings().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.sagas().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.projections().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.subscriptions().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.scheduledTriggers().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.businessRules().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.roles().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.pages().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.uiAdapters().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.uiShells().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.components().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.bddScenarios().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.enums().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.queryServices().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.integrationEvents().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.readModels().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
        data.flows().forEach(p -> store.put(storeKey(p.id(), p.getClass()), p));
    }

    @SneakyThrows
    private void persist() {
        List<ProjectEntity> projects = store.values().stream().filter(v -> v instanceof ProjectEntity).map(v -> (ProjectEntity) v).toList();
        List<ServiceEntity> services = store.values().stream().filter(v -> v instanceof ServiceEntity).map(v -> (ServiceEntity) v).toList();
        List<ModuleEntity> modules = store.values().stream().filter(v -> v instanceof ModuleEntity).map(v -> (ModuleEntity) v).toList();
        List<AggregateEntity> aggregates = store.values().stream().filter(v -> v instanceof AggregateEntity).map(v -> (AggregateEntity) v).toList();
        List<EntityEntity> entities = store.values().stream().filter(v -> v instanceof EntityEntity).map(v -> (EntityEntity) v).toList();
        List<ValueObjectEntity> valueObjects = store.values().stream().filter(v -> v instanceof ValueObjectEntity).map(v -> (ValueObjectEntity) v).toList();
        List<InvariantEntity> ivariants = store.values().stream().filter(v -> v instanceof InvariantEntity).map(v -> (InvariantEntity) v).toList();
        List<DomainEventEntity> domainEvents = store.values().stream().filter(v -> v instanceof DomainEventEntity).map(v -> (DomainEventEntity) v).toList();
        List<UseCaseEntity> useCases = store.values().stream().filter(v -> v instanceof UseCaseEntity).map(v -> (UseCaseEntity) v).toList();
        List<ModelEntity> models = store.values().stream().filter(v -> v instanceof ModelEntity).map(v -> (ModelEntity) v).toList();
        List<GatewayEntity> gateways = store.values().stream().filter(v -> v instanceof GatewayEntity).map(v -> (GatewayEntity) v).toList();
        List<ModelMappingEntity> modelMappings = store.values().stream().filter(v -> v instanceof ModelMappingEntity).map(v -> (ModelMappingEntity) v).toList();
        List<SagaEntity> sagas = store.values().stream().filter(v -> v instanceof SagaEntity).map(v -> (SagaEntity) v).toList();
        List<ProjectionEntity> projections = store.values().stream().filter(v -> v instanceof ProjectionEntity).map(v -> (ProjectionEntity) v).toList();
        List<SubscriptionEntity> subscriptions = store.values().stream().filter(v -> v instanceof SubscriptionEntity).map(v -> (SubscriptionEntity) v).toList();
        List<ScheduledTriggerEntity> scheduledTriggers = store.values().stream().filter(v -> v instanceof ScheduledTriggerEntity).map(v -> (ScheduledTriggerEntity) v).toList();
        List<BusinessRuleEntity> businessRules = store.values().stream().filter(v -> v instanceof BusinessRuleEntity).map(v -> (BusinessRuleEntity) v).toList();
        List<RoleEntity> roles = store.values().stream().filter(v -> v instanceof RoleEntity).map(v -> (RoleEntity) v).toList();
        List<PageEntity> pages = store.values().stream().filter(v -> v instanceof PageEntity).map(v -> (PageEntity) v).toList();
        List<UiAdapterEntity> uiAdapters = store.values().stream().filter(v -> v instanceof UiAdapterEntity).map(v -> (UiAdapterEntity) v).toList();
        List<UiShellEntity> uiShells = store.values().stream().filter(v -> v instanceof UiShellEntity).map(v -> (UiShellEntity) v).toList();
        List<ComponentEntity> components = store.values().stream().filter(v -> v instanceof ComponentEntity).map(v -> (ComponentEntity) v).toList();
        List<BddScenarioEntity> bddScenarios = store.values().stream().filter(v -> v instanceof BddScenarioEntity).map(v -> (BddScenarioEntity) v).toList();
        List<EnumEntity> enums = store.values().stream().filter(v -> v instanceof EnumEntity).map(v -> (EnumEntity) v).toList();
        List<QueryServiceEntity> queryServices = store.values().stream().filter(v -> v instanceof QueryServiceEntity).map(v -> (QueryServiceEntity) v).toList();
        List<IntegrationEventEntity> integrationEvents = store.values().stream().filter(v -> v instanceof IntegrationEventEntity).map(v -> (IntegrationEventEntity) v).toList();
        List<ReadModelEntity> readModels = store.values().stream().filter(v -> v instanceof ReadModelEntity).map(v -> (ReadModelEntity) v).toList();
        List<FlowEntity> flows = store.values().stream().filter(v -> v instanceof FlowEntity).map(v -> (FlowEntity) v).toList();
        AllData data = new AllData(
                projects,
                services,
                modules,
                aggregates,
                entities,
                valueObjects,
                ivariants,
                domainEvents,
                useCases,
                models,
                gateways,
                modelMappings,
                sagas,
                projections,
                subscriptions,
                scheduledTriggers,
                businessRules,
                roles,
                pages,
                uiAdapters,
                uiShells,
                components,
                bddScenarios,
                enums,
                queryServices,
                integrationEvents,
                readModels,
                flows
        );
        YAMLMapper yamlMapper = new YAMLMapper();
        yamlMapper.setSerializationInclusion(JsonInclude.Include.NON_EMPTY);
        yamlMapper.configOverride(boolean.class).setInclude(
                JsonInclude.Value.construct(JsonInclude.Include.NON_DEFAULT, JsonInclude.Include.NON_DEFAULT));
        yamlMapper.configOverride(Boolean.class).setInclude(
                JsonInclude.Value.construct(JsonInclude.Include.NON_DEFAULT, JsonInclude.Include.NON_DEFAULT));
        String yamlContent = "# yaml-language-server: $schema=./model-driven-store-schema.json\n"
                + yamlMapper.writeValueAsString(data);
        Files.writeString(storePath, yamlContent);
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
