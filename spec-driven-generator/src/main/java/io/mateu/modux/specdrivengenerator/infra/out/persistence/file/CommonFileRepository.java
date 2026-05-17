package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

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

    public <T> Optional<T> findById(String id, Class<T> type) {
        return Optional.ofNullable((T) store.get(id));
    }
    public void save(Identifiable o) {
        store.put(o.id(), o);
        persist();
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

    public void deleteAllById(List<String> list) {
        list.forEach(store::remove);
        persist();
    }

    @SneakyThrows
    @PostConstruct
    public void init() {
        var specFile = System.getProperty("modux.spec-file", ".dev/data/spec-driven-store.yaml");
        Path yamlPath = Path.of(specFile);
        Path jsonPath = Path.of(".dev/data/spec-driven-store.json");
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
        data.projects().forEach(p -> store.put(p.id(), p));
        data.services().forEach(p -> store.put(p.id(), p));
        data.modules().forEach(p -> store.put(p.id(), p));
        data.aggregates().forEach(p -> store.put(p.id(), p));
        data.entities().forEach(p -> store.put(p.id(), p));
        data.valueObjects().forEach(p -> store.put(p.id(), p));
        data.invariants().forEach(p -> store.put(p.id(), p));
        data.domainEvents().forEach(p -> store.put(p.id(), p));
        data.useCases().forEach(p -> store.put(p.id(), p));
        data.models().forEach(p -> store.put(p.id(), p));
        data.gateways().forEach(p -> store.put(p.id(), p));
        data.modelMappings().forEach(p -> store.put(p.id(), p));
        data.sagas().forEach(p -> store.put(p.id(), p));
        data.projections().forEach(p -> store.put(p.id(), p));
        data.subscriptions().forEach(p -> store.put(p.id(), p));
        data.scheduledTriggers().forEach(p -> store.put(p.id(), p));
        data.businessRules().forEach(p -> store.put(p.id(), p));
        data.readModels().forEach(p -> store.put(p.id(), p));
        data.roles().forEach(p -> store.put(p.id(), p));
        data.pages().forEach(p -> store.put(p.id(), p));
        data.uiAdapters().forEach(p -> store.put(p.id(), p));
        data.uiShells().forEach(p -> store.put(p.id(), p));
        data.components().forEach(p -> store.put(p.id(), p));
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
        List<ReadModelEntity> readModels = store.values().stream().filter(v -> v instanceof ReadModelEntity).map(v -> (ReadModelEntity) v).toList();
        List<RoleEntity> roles = store.values().stream().filter(v -> v instanceof RoleEntity).map(v -> (RoleEntity) v).toList();
        List<PageEntity> pages = store.values().stream().filter(v -> v instanceof PageEntity).map(v -> (PageEntity) v).toList();
        List<UiAdapterEntity> uiAdapters = store.values().stream().filter(v -> v instanceof UiAdapterEntity).map(v -> (UiAdapterEntity) v).toList();
        List<UiShellEntity> uiShells = store.values().stream().filter(v -> v instanceof UiShellEntity).map(v -> (UiShellEntity) v).toList();
        List<ComponentEntity> components = store.values().stream().filter(v -> v instanceof ComponentEntity).map(v -> (ComponentEntity) v).toList();
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
                readModels,
                roles,
                pages,
                uiAdapters,
                uiShells,
                components
        );
        YAMLMapper yamlMapper = new YAMLMapper();
        yamlMapper.writeValue(Path.of(".dev/data/spec-driven-store.yaml").toFile(), data);
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
        Path schemaPath = Path.of(".dev/data/spec-driven-store-schema.json");
        Files.createDirectories(schemaPath.getParent());
        Files.writeString(schemaPath, schemaJson);
        log.info("JSON schema written to {}", schemaPath.toAbsolutePath());
    }

}
