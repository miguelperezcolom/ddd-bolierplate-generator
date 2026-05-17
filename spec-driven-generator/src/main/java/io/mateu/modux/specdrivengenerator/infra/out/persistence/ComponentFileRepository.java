package io.mateu.modux.specdrivengenerator.infra.out.persistence;

import io.mateu.modux.specdrivengenerator.application.out.repositories.ComponentRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.component.Component;
import io.mateu.modux.specdrivengenerator.domain.aggregates.component.vo.ComponentId;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.ComponentEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ComponentFileRepository implements ComponentRepository {

    final CommonFileRepository repository;

    @Override
    public Optional<Component> findById(ComponentId id) {
        return repository.findById(id.id(), ComponentEntity.class)
                .map(entity -> Component.load(
                        entity.id(),
                        entity.name(),
                        entity.dataSourceType(),
                        entity.queryServiceId(),
                        entity.gatewayId(),
                        entity.presentationType()));
    }

    @Override
    public Component save(Component entity) {
        repository.save(new ComponentEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getDataSourceType() != null ? entity.getDataSourceType().name() : null,
                entity.getQueryServiceId(),
                entity.getGatewayId(),
                entity.getPresentationType() != null ? entity.getPresentationType().name() : null));
        return entity;
    }

    @Override
    public void deleteAllById(List<ComponentId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(ComponentId::id).toList());
    }
}
