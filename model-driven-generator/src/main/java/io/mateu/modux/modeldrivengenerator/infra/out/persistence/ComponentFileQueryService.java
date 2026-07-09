package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.query.ComponentQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ComponentDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ComponentRow;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.component.vo.ComponentDataSourceType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.component.vo.ComponentPresentationType;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ComponentEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ComponentFileQueryService implements ComponentQueryService {

    final ModelStore repository;

    @Override
    public ListingData<ComponentRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, ComponentEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new ComponentRow(
                                entity.id(),
                                entity.name(),
                                entity.presentationType()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, ComponentEntity.class).map(ComponentEntity::name).orElseThrow();
    }

    @Override
    public Optional<ComponentDto> getById(String id) {
        return repository.findById(id, ComponentEntity.class)
                .map(entity -> new ComponentDto(
                        entity.id(),
                        entity.name(),
                        entity.dataSourceType() != null ? ComponentDataSourceType.valueOf(entity.dataSourceType()) : null,
                        entity.gatewayId(),
                        entity.presentationType() != null ? ComponentPresentationType.valueOf(entity.presentationType()) : null,
                        entity.queryServiceId()));
    }
}
