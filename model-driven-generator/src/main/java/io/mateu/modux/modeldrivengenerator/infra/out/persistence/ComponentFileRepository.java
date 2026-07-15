package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.ComponentRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.component.Component;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.component.vo.ComponentId;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ComponentEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ComponentFileRepository implements ComponentRepository {

    final ModelStore repository;

    @Override
    public Optional<Component> findById(ComponentId id) {
        return repository.findById(id.id(), ComponentEntity.class)
                .map(entity -> Component.load(
                        entity.id(),
                        entity.name(),
                        entity.dataSourceType(),
                        entity.gatewayId(),
                        entity.presentationType(),
                        entity.queryServiceId()));
    }

    @Override
    public Component save(Component entity) {
        repository.save(new ComponentEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getDataSourceType() != null ? entity.getDataSourceType().name() : null,
                entity.getGatewayId(),
                entity.getPresentationType() != null ? entity.getPresentationType().name() : null,
                entity.getQueryServiceId(), null));
        return entity;
    }

    @Override
    public void deleteAllById(List<ComponentId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(ComponentId::id).toList(), ComponentEntity.class);
    }
}
