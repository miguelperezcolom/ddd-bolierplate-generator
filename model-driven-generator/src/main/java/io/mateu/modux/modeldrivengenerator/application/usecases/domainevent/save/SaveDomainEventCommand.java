package io.mateu.modux.modeldrivengenerator.application.usecases.domainevent.save;

public record SaveDomainEventCommand(String id, String name, String modelId,
                                     boolean publishAsIntegrationEvent, String integrationModelId,
                                     String topicName, Integer partitions, Long retentionMs,
                                     String serializationFormat, String compressionType,
                                     boolean deadLetterQueueEnabled, String deadLetterQueueName,
                                     Integer maxDeliveryAttempts, String schemaVersion,
                                     String routingKeyField,
                                     boolean replayable) {
}
