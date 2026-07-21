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
        String projectId,
        /** Free-text description — shown on hover in the editor, edited in the ficha. */
        String description
) implements Identifiable {

    /** Backward-compatible constructor (pre-description callers). */
    public DomainEventEntity(String id, String name, String modelId, boolean publishAsIntegrationEvent,
            String integrationModelId, String topicName, Integer partitions, Long retentionMs,
            String serializationFormat, String compressionType, boolean deadLetterQueueEnabled,
            String deadLetterQueueName, Integer maxDeliveryAttempts, String schemaVersion,
            String routingKeyField, boolean replayable, String projectId) {
        this(id, name, modelId, publishAsIntegrationEvent, integrationModelId, topicName, partitions,
                retentionMs, serializationFormat, compressionType, deadLetterQueueEnabled,
                deadLetterQueueName, maxDeliveryAttempts, schemaVersion, routingKeyField, replayable,
                projectId, null);
    }
}
