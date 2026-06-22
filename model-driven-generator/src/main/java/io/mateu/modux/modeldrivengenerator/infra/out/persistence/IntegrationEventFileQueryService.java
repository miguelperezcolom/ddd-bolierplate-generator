package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.query.IntegrationEventQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.IntegrationEventDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.IntegrationEventRow;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.IntegrationEventEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class IntegrationEventFileQueryService implements IntegrationEventQueryService {

    final CommonFileRepository repository;

    @Override
    public ListingData<IntegrationEventRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, IntegrationEventEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new IntegrationEventRow(entity.id(), entity.name()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, IntegrationEventEntity.class).map(IntegrationEventEntity::name).orElseThrow();
    }

    @Override
    public Optional<IntegrationEventDto> getById(String id) {
        return repository.findById(id, IntegrationEventEntity.class)
                .map(entity -> new IntegrationEventDto(entity.id(), entity.name(), entity.serviceId(), entity.description(),
                        entity.sourceDomainEventId(), entity.payloadModelId(), entity.topicName(),
                        entity.partitions(), entity.retentionMs(),
                        entity.serializationFormat(), entity.compressionType(),
                        entity.deadLetterQueueEnabled(), entity.deadLetterQueueName(), entity.maxDeliveryAttempts(),
                        entity.schemaVersion(), entity.routingKeyField(), entity.replayable()));
    }
}
