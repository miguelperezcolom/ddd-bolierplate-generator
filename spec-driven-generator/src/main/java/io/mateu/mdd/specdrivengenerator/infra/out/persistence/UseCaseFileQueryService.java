package io.mateu.mdd.specdrivengenerator.infra.out.persistence;

import io.mateu.mdd.specdrivengenerator.application.out.query.UseCaseQueryService;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.UseCaseDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.UseCaseRow;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.UseCaseEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UseCaseFileQueryService implements UseCaseQueryService {

    final CommonFileRepository repository;

    @Override
    public ListingData<UseCaseRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, UseCaseEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new UseCaseRow(entity.id(), entity.name()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, UseCaseEntity.class).map(UseCaseEntity::name).orElseThrow();
    }

    @Override
    public Optional<UseCaseDto> getById(String id) {
        return repository.findById(id, UseCaseEntity.class)
                .map(entity -> new UseCaseDto(
                        entity.id(),
                        entity.name(),
                        entity.exposedAsRest(),
                        entity.exposedAsGrpc(),
                        entity.exposedAsMcp(),
                        entity.exposedAsAsync(),
                        entity.exposedAsUi()));
    }
}
