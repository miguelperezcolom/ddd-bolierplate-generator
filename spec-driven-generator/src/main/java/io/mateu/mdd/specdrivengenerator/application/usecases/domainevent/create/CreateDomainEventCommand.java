package io.mateu.mdd.specdrivengenerator.application.usecases.domainevent.create;

public record CreateDomainEventCommand(String id, String name, String modelId,
                                       boolean publishAsIntegrationEvent, String integrationModelId,
                                       String topicName, Integer partitions, Long retentionMs,
                                       String serializationFormat, String compressionType,
                                       boolean deadLetterQueueEnabled, String deadLetterQueueName,
                                       Integer maxDeliveryAttempts, String schemaVersion,
                                       String routingKeyField) {
}
