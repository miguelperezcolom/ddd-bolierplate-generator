package io.mateu.mdd.specdrivengenerator.infra.out.persistence;

import io.mateu.mdd.specdrivengenerator.application.out.query.ReadModelQueryService;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ReadModelDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ReadModelRow;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.ReadModelEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReadModelFileQueryService implements ReadModelQueryService {

    final CommonFileRepository repository;

    @Override
    public ListingData<ReadModelRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, ReadModelEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new ReadModelRow(entity.id(), entity.name()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, ReadModelEntity.class).map(ReadModelEntity::name).orElseThrow();
    }

    @Override
    public Optional<ReadModelDto> getById(String id) {
        return repository.findById(id, ReadModelEntity.class)
                .map(entity -> new ReadModelDto(
                        entity.id(),
                        entity.name(),
                        entity.modelId(),
                        entity.storageType(),
                        entity.filterFields() != null ? entity.filterFields() : List.of(),
                        entity.sortFields() != null ? entity.sortFields() : List.of(),
                        entity.cacheable(),
                        entity.cacheTtlSeconds(),
                        entity.consistencyLevel(),
                        entity.maxStalenessMs(),
                        entity.indexFields() != null ? entity.indexFields() : List.of()));
    }
}
