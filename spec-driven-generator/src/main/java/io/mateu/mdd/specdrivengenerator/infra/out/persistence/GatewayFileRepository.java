package io.mateu.mdd.specdrivengenerator.infra.out.persistence;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.GatewayRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.Gateway;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayOperation;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.GatewayEntity;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.GatewayOperationEntity;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GatewayFileRepository implements GatewayRepository {

    final CommonFileRepository repository;

    @Override
    public Optional<Gateway> findById(GatewayId id) {
        return repository.findById(id.id(), GatewayEntity.class)
                .map(entity -> Gateway.load(entity.id(), entity.name(),
                        entity.operations() == null ? List.of() :
                                entity.operations().stream()
                                        .map(o -> new GatewayOperation(o.id(), o.name(), o.inputModelId(), o.outputModelId()))
                                        .toList()));
    }

    @Override
    public Gateway save(Gateway entity) {
        var operationEntities = entity.getOperations() == null ? List.<GatewayOperationEntity>of() :
                entity.getOperations().stream()
                        .map(o -> new GatewayOperationEntity(o.id(), o.name(), o.inputModelId(), o.outputModelId()))
                        .toList();
        repository.save(new GatewayEntity(
                entity.getId().id(),
                entity.getName().name(),
                operationEntities));
        return entity;
    }

    @Override
    public void deleteAllById(List<GatewayId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(GatewayId::id).toList());
    }
}
