package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.UiAdapterRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.uiadapter.UiAdapter;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.uiadapter.UiMenuItem;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.uiadapter.vo.UiAdapterId;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiAdapterEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiMenuItemEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UiAdapterFileRepository implements UiAdapterRepository {

    final CommonFileRepository repository;

    @Override
    public Optional<UiAdapter> findById(UiAdapterId id) {
        return repository.findById(id.id(), UiAdapterEntity.class)
                .map(entity -> UiAdapter.load(
                        entity.id(),
                        entity.name(),
                        entity.serviceId(),
                        entity.title(),
                        entity.path(),
                        entity.appVariant(),
                        entity.menuItems() == null ? List.of() :
                                entity.menuItems().stream()
                                        .map(m -> new UiMenuItem(m.label(), m.icon(), m.description(), m.route()))
                                        .toList()));
    }

    @Override
    public UiAdapter save(UiAdapter entity) {
        var menuItemEntities = entity.getMenuItems() == null ? List.<UiMenuItemEntity>of() :
                entity.getMenuItems().stream()
                        .map(m -> new UiMenuItemEntity(m.label(), m.icon(), m.description(), m.route()))
                        .toList();
        repository.save(new UiAdapterEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getServiceId(),
                entity.getTitle(),
                entity.getPath(),
                entity.getAppVariant(),
                menuItemEntities));
        return entity;
    }

    @Override
    public void deleteAllById(List<UiAdapterId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(UiAdapterId::id).toList(), UiAdapterEntity.class);
    }
}
