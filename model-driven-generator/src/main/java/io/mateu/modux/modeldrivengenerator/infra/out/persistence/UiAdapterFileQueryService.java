package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.query.UiAdapterQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.UiAdapterDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.UiAdapterRow;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.UiMenuItemDto;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiAdapterEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UiAdapterFileQueryService implements UiAdapterQueryService {

    final ModelStore repository;

    @Override
    public ListingData<UiAdapterRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, UiAdapterEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new UiAdapterRow(entity.id(), entity.name(), entity.serviceId()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, UiAdapterEntity.class).map(UiAdapterEntity::name).orElseThrow();
    }

    @Override
    public Optional<UiAdapterDto> getById(String id) {
        return repository.findById(id, UiAdapterEntity.class)
                .map(entity -> new UiAdapterDto(
                        entity.id(),
                        entity.name(),
                        entity.serviceId(),
                        entity.title(),
                        entity.path(),
                        entity.appVariant(),
                        entity.menuItems() == null ? List.of() :
                                entity.menuItems().stream()
                                        .map(m -> new UiMenuItemDto(m.label(), m.icon(), m.description(), m.route()))
                                        .toList()));
    }
}
