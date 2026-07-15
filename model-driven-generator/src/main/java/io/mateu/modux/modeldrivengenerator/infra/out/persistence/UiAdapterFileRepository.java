package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.UiAdapterRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.uiadapter.UiAdapter;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.uiadapter.UiMenuItem;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.uiadapter.vo.UiAdapterId;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiAdapterEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiMenuItemEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UiAdapterFileRepository implements UiAdapterRepository {

    final ModelStore repository;

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
                                entity.menuItems().stream().map(UiAdapterFileRepository::toDomain).toList()));
    }

    private static UiMenuItem toDomain(UiMenuItemEntity m) {
        return new UiMenuItem(m.label(), m.icon(), m.description(), m.route(), m.pageId(),
                m.children() == null ? List.of() :
                        m.children().stream().map(UiAdapterFileRepository::toDomain).toList());
    }

    private static UiMenuItemEntity toEntity(UiMenuItem m, UiMenuItemEntity stored) {
        // children == null means the caller (the flat Mateu form) did not edit the tree:
        // keep whatever the store already has for this entry, so a save never prunes it.
        var children = m.children() != null
                ? m.children().stream().map(c -> UiAdapterFileRepository.toEntity(c, null)).toList()
                : stored != null && stored.children() != null ? stored.children() : List.<UiMenuItemEntity>of();
        return new UiMenuItemEntity(m.label(), m.icon(), m.description(), m.route(), m.pageId(),
                children, stored != null ? stored.id() : null,
                stored != null ? stored.uiAdapterId() : null,
                stored != null ? stored.useCaseId() : null,
                stored != null ? stored.aggregateId() : null,
                stored != null ? stored.queryServiceId() : null,
                stored != null ? stored.queryOperationId() : null);
    }

    @Override
    public UiAdapter save(UiAdapter entity) {
        var stored = repository.findById(entity.getId().id(), UiAdapterEntity.class)
                .map(UiAdapterEntity::menuItems).orElse(List.of());
        var menuItemEntities = entity.getMenuItems() == null ? List.<UiMenuItemEntity>of() :
                entity.getMenuItems().stream()
                        .map(m -> toEntity(m, stored == null ? null :
                                stored.stream().filter(e -> java.util.Objects.equals(e.label(), m.label()))
                                        .findFirst().orElse(null)))
                        .toList();
        // The domain UiAdapter does not model everything (appType, home/header pages,
        // viewmodel…) — start from the stored entity so a domain save never wipes
        // what the editor authored.
        var storedEntity = repository.findById(entity.getId().id(), UiAdapterEntity.class).orElse(null);
        var builder = storedEntity != null ? storedEntity.toBuilder() : UiAdapterEntity.builder();
        repository.save(builder
                .id(entity.getId().id())
                .name(entity.getName().name())
                .serviceId(entity.getServiceId())
                .title(entity.getTitle())
                .path(entity.getPath())
                .appVariant(entity.getAppVariant())
                .menuItems(menuItemEntities)
                .build());
        return entity;
    }

    @Override
    public void deleteAllById(List<UiAdapterId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(UiAdapterId::id).toList(), UiAdapterEntity.class);
    }
}
