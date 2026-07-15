package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

public record DomainEventEntity(
        String id,
        String name,
        String modelId,
        boolean publishAsIntegrationEvent,
        String integrationModelId,
        String topicName,
        Integer partitions,
        Long retentionMs,
        String serializationFormat,
        String compressionType,
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
