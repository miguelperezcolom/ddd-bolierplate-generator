package io.mateu.modux.specdrivengenerator.infra.out.persistence;

import io.mateu.modux.specdrivengenerator.application.out.repositories.PageRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.Page;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageId;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.PageEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PageFileRepository implements PageRepository {

    final CommonFileRepository repository;

    @Override
    public Optional<Page> findById(PageId id) {
        return repository.findById(id.id(), PageEntity.class)
                .map(entity -> Page.load(
                        entity.id(),
                        entity.name(),
                        entity.route(),
                        entity.type(),
                        entity.aggregateId(),
                        entity.modelId(),
                        entity.componentIds(),
                        entity.listingDataSourceType(),
                        entity.listingQueryServiceId(),
                        entity.listingGatewayId()));
    }

    @Override
    public Page save(Page entity) {
        repository.save(new PageEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getRoute(),
                entity.getType() != null ? entity.getType().name() : null,
                entity.getAggregateId(),
                entity.getModelId(),
                entity.getComponentIds(),
                entity.getListingDataSourceType() != null ? entity.getListingDataSourceType().name() : null,
                entity.getListingQueryServiceId(),
                entity.getListingGatewayId()));
        return entity;
    }

    @Override
    public void deleteAllById(List<PageId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(PageId::id).toList());
    }
}
