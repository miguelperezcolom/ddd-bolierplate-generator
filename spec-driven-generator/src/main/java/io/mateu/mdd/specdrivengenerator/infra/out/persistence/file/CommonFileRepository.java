package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

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

    public void deleteAllById(List<String> list) {
        list.forEach(store::remove);
        persist();
    }

    @SneakyThrows
    @PostConstruct
    public void init() {
        log.info("spec store in {}", Path.of(".dev/data/spec-driven-store.json").toAbsolutePath());
        String json = Files.readString(Path.of(".dev/data/spec-driven-store.json"));
        AllData data = pojoFromJson(json, AllData.class);
        store.clear();
        data.projects().forEach(p -> store.put(p.id(), p));
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
                modelMappings
        );
        Files.writeString(Path.of(".dev/data/spec-driven-store.json"), toJson(data));
    }

}
