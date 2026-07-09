package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.query.UiShellQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.UiShellDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.UiShellRow;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiShellEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UiShellFileQueryService implements UiShellQueryService {

    final ModelStore repository;

    @Override
    public ListingData<UiShellRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, UiShellEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new UiShellRow(entity.id(), entity.name(), entity.title()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, UiShellEntity.class).map(UiShellEntity::name).orElseThrow();
    }

    @Override
    public Optional<UiShellDto> getById(String id) {
        return repository.findById(id, UiShellEntity.class)
                .map(entity -> new UiShellDto(
                        entity.id(),
                        entity.name(),
                        entity.title(),
                        entity.appVariant(),
                        entity.serviceIds(),
                        entity.url(),
                        entity.deploymentType(),
                        entity.cdnProvider(),
                        entity.cdnSiteId(),
                        entity.bucketProvider(),
                        entity.bucketName(),
                        entity.bucketRegion(),
                        entity.deploymentServiceId(),
                        entity.designSystem()));
    }
}
