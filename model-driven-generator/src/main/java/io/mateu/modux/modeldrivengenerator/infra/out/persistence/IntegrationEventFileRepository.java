package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.IntegrationEventRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent.IntegrationEvent;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent.vo.IntegrationEventId;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.IntegrationEventEntity;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class IntegrationEventFileRepository implements IntegrationEventRepository {

    final CommonFileRepository repository;

    @Override
    public Optional<IntegrationEvent> findById(IntegrationEventId id) {
        return repository.findById(id.id(), IntegrationEventEntity.class)
                .map(entity -> IntegrationEvent.load(entity.id(), entity.name(), entity.serviceId(), entity.description(),
                        entity.sourceDomainEventId(), entity.payloadModelId(), entity.topicName(),
                        entity.partitions(), entity.retentionMs(),
                        entity.serializationFormat(), entity.compressionType(),
                        entity.deadLetterQueueEnabled(), entity.deadLetterQueueName(), entity.maxDeliveryAttempts(),
                        entity.schemaVersion(), entity.routingKeyField(), entity.replayable()));
    }

    @Override
    public IntegrationEvent save(IntegrationEvent entity) {
        repository.save(new IntegrationEventEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getServiceId(),
                entity.getDescription(),
                entity.getSourceDomainEventId(),
                entity.getPayloadModelId(),
                entity.getTopicName(),
                entity.getPartitions(),
                entity.getRetentionMs(),
                entity.getSerializationFormat(),
                entity.getCompressionType(),
                entity.isDeadLetterQueueEnabled(),
                entity.getDeadLetterQueueName(),
                entity.getMaxDeliveryAttempts(),
                entity.getSchemaVersion(),
                entity.getRoutingKeyField(),
                entity.isReplayable()));
        return entity;
    }

    @Override
    public void deleteAllById(List<IntegrationEventId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(IntegrationEventId::id).toList(), IntegrationEventEntity.class);
    }
}
