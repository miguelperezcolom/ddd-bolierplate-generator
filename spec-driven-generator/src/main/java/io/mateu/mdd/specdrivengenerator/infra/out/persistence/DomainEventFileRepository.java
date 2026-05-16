package io.mateu.mdd.specdrivengenerator.infra.out.persistence;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.DomainEventRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.domainevent.DomainEvent;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventId;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.DomainEventEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DomainEventFileRepository implements DomainEventRepository {

    final CommonFileRepository repository;

    @Override
    public Optional<DomainEvent> findById(DomainEventId id) {
        return repository.findById(id.id(), DomainEventEntity.class)
                .map(entity -> DomainEvent.load(entity.id(), entity.name(), entity.modelId(),
                        entity.publishAsIntegrationEvent(), entity.integrationModelId(),
                        entity.topicName(), entity.partitions(), entity.retentionMs(),
                        entity.serializationFormat(), entity.compressionType(),
                        entity.deadLetterQueueEnabled(), entity.deadLetterQueueName(),
                        entity.maxDeliveryAttempts(), entity.schemaVersion(), entity.routingKeyField(),
                        entity.replayable()));
    }

    @Override
    public DomainEvent save(DomainEvent entity) {
        repository.save(new DomainEventEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getModelId() != null ? entity.getModelId().id() : null,
                entity.getPublishAsIntegrationEvent().value(),
                entity.getIntegrationModelId() != null ? entity.getIntegrationModelId().id() : null,
                entity.getTopicName(), entity.getPartitions(), entity.getRetentionMs(),
                entity.getSerializationFormat() != null ? entity.getSerializationFormat().name() : null,
                entity.getCompressionType() != null ? entity.getCompressionType().name() : null,
                entity.isDeadLetterQueueEnabled(), entity.getDeadLetterQueueName(),
                entity.getMaxDeliveryAttempts(), entity.getSchemaVersion(), entity.getRoutingKeyField(),
                entity.isReplayable()));
        return entity;
    }

    @Override
    public void deleteAllById(List<DomainEventId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(DomainEventId::id).toList());
    }
}
