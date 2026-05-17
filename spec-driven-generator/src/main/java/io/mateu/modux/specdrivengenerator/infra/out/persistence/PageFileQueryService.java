package io.mateu.modux.specdrivengenerator.infra.out.persistence;

import io.mateu.modux.specdrivengenerator.application.out.query.PageQueryService;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.PageDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.PageRow;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageType;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.PageEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PageFileQueryService implements PageQueryService {

    final CommonFileRepository repository;

    @Override
    public ListingData<PageRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, PageEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new PageRow(
                                entity.id(),
                                entity.name(),
                                entity.route(),
                                entity.type() != null ? PageType.valueOf(entity.type()) : null))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, PageEntity.class).map(PageEntity::name).orElseThrow();
    }

    @Override
    public Optional<PageDto> getById(String id) {
        return repository.findById(id, PageEntity.class)
                .map(entity -> new PageDto(
                        entity.id(),
                        entity.name(),
                        entity.route(),
                        entity.type() != null ? PageType.valueOf(entity.type()) : null,
                        entity.aggregateId(),
                        entity.modelId()));
    }
}
