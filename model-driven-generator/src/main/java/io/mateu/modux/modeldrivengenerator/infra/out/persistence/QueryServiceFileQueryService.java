package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.query.QueryServiceQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.QueryOperationDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.QueryServiceDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.QueryServiceRow;

import java.util.List;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.QueryServiceEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QueryServiceFileQueryService implements QueryServiceQueryService {

    final ModelStore repository;

    @Override
    public ListingData<QueryServiceRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, QueryServiceEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new QueryServiceRow(entity.id(), entity.name()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, QueryServiceEntity.class).map(QueryServiceEntity::name).orElse(null);
    }

    @Override
    public Optional<QueryServiceDto> getById(String id) {
        return repository.findById(id, QueryServiceEntity.class)
                .map(entity -> new QueryServiceDto(entity.id(), entity.name(), entity.boundedContextId(), entity.description(),
                        entity.operations() == null ? List.of() :
                                entity.operations().stream()
                                        .map(o -> new QueryOperationDto(o.id(), o.name(), o.description(),
                                                o.inputModelId(), o.outputModelId(), o.cardinality()))
                                        .toList()));
    }
}
