package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.query.EntityQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.EntityDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.EntityRow;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.EntityEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EntityFileQueryService implements EntityQueryService {

    final ModelStore repository;

    @Override
    public ListingData<EntityRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, EntityEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new EntityRow(entity.id(), entity.name()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, EntityEntity.class).map(EntityEntity::name).orElse(null);
    }

    @Override
    public Optional<EntityDto> getById(String id) {
        return repository.findById(id, EntityEntity.class)
                .map(entity -> new EntityDto(entity.id(), entity.name(),
                        entity.modelId(), entity.parentAggregateId(), entity.isCollection()));
    }
}
