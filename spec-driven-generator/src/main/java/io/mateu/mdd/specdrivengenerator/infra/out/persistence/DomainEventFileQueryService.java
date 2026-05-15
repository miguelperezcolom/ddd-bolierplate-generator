package io.mateu.mdd.specdrivengenerator.infra.out.persistence;

import io.mateu.mdd.specdrivengenerator.application.out.query.DomainEventQueryService;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.DomainEventDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.DomainEventRow;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.DomainEventEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DomainEventFileQueryService implements DomainEventQueryService {

    final CommonFileRepository repository;

    @Override
    public ListingData<DomainEventRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, DomainEventEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new DomainEventRow(entity.id(), entity.name()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, DomainEventEntity.class).map(DomainEventEntity::name).orElseThrow();
    }

    @Override
    public Optional<DomainEventDto> getById(String id) {
        return repository.findById(id, DomainEventEntity.class)
                .map(entity -> new DomainEventDto(entity.id(), entity.name(), entity.modelId(),
                        entity.publishAsIntegrationEvent(), entity.integrationModelId(),
                        entity.topicName(), entity.partitions(), entity.retentionMs()));
    }
}
