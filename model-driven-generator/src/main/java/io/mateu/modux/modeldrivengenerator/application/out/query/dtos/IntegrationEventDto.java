package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent.vo.IntegrationEventCompressionType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent.vo.IntegrationEventSerializationFormat;

public record IntegrationEventDto(
        String id,
        String name,
        String serviceId,
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
