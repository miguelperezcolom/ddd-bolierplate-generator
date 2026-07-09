package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.QueryServiceRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.queryservice.QueryService;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.queryservice.vo.QueryOperation;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.queryservice.vo.QueryServiceId;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.QueryOperationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.QueryServiceEntity;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QueryServiceFileRepository implements QueryServiceRepository {

    final ModelStore repository;

    @Override
    public Optional<QueryService> findById(QueryServiceId id) {
        return repository.findById(id.id(), QueryServiceEntity.class)
                .map(entity -> QueryService.load(entity.id(), entity.name(), entity.moduleId(), entity.description(),
                        entity.operations() == null ? List.of() :
                                entity.operations().stream()
                                        .map(o -> new QueryOperation(o.id(), o.name(), o.description(),
                                                o.inputModelId(), o.outputModelId(), o.cardinality()))
                                        .toList()));
    }

    @Override
    public QueryService save(QueryService entity) {
        var operationEntities = entity.getOperations() == null ? List.<QueryOperationEntity>of() :
                entity.getOperations().stream()
                        .map(o -> new QueryOperationEntity(o.id(), o.name(), o.description(),
                                o.inputModelId(), o.outputModelId(), o.cardinality()))
                        .toList();
        // exposedAsGrpc is not modeled in the domain QueryService yet — carry it over so a UI
        // save never wipes what was authored in the YAML store or set by the deriver.
        var existing = repository.findById(entity.getId().id(), QueryServiceEntity.class).orElse(null);
        repository.save(new QueryServiceEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getModuleId(),
                entity.getDescription(),
                operationEntities,
                existing != null && existing.exposedAsGrpc()));
        return entity;
    }

    @Override
    public void deleteAllById(List<QueryServiceId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(QueryServiceId::id).toList(), QueryServiceEntity.class);
    }
}
