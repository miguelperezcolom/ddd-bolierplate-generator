package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent.vo.IntegrationEventCompressionType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent.vo.IntegrationEventSerializationFormat;
import io.mateu.modux.modeldrivengenerator.domain.shared.Identifiable;

public record IntegrationEventEntity(
        String id,
        String name,
        String boundedContextId,
        String description,
        String sourceDomainEventId,
        String payloadModelId,
        String topicName,
        Integer partitions,
        Long retentionMs,
        IntegrationEventSerializationFormat serializationFormat,
        IntegrationEventCompressionType compressionType,
        boolean deadLetterQueueEnabled,
        String deadLetterQueueName,
        Integer maxDeliveryAttempts,
        String schemaVersion,
        String routingKeyField,
        boolean replayable
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {
}
