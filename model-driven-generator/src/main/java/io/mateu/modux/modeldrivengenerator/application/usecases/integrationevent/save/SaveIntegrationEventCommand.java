package io.mateu.modux.modeldrivengenerator.application.usecases.integrationevent.save;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent.vo.IntegrationEventCompressionType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent.vo.IntegrationEventSerializationFormat;

public record SaveIntegrationEventCommand(
        String id,
        String name,
        String moduleId,
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
) {
}
