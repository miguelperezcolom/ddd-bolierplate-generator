package io.mateu.mdd.specdrivengenerator.infra.out.persistence;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.GatewayRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.Gateway;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayId;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.GatewayEntity;
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
                .map(entity -> Gateway.load(entity.id(), entity.name()));
    }

    @Override
    public Gateway save(Gateway entity) {
        repository.save(new GatewayEntity(
                entity.getId().id(),
                entity.getName().name()));
        return entity;
    }

    @Override
    public void deleteAllById(List<GatewayId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(GatewayId::id).toList());
    }
}
