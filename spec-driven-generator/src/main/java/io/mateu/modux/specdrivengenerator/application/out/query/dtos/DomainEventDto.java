package io.mateu.modux.specdrivengenerator.application.out.query.dtos;

public record DomainEventDto(String id, String name, String modelId,
                             boolean publishAsIntegrationEvent, String integrationModelId,
                             String topicName, Integer partitions, Long retentionMs,
                             String serializationFormat, String compressionType,
                             boolean deadLetterQueueEnabled, String deadLetterQueueName,
                             Integer maxDeliveryAttempts, String schemaVersion,
                             String routingKeyField,
                             boolean replayable) {
}
