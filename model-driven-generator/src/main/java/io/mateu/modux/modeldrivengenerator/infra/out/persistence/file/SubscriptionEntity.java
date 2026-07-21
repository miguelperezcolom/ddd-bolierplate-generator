package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record SubscriptionEntity(
        String id,
        String name,
        String eventName,
        String sourceService,
        String inputModelId,
        String topicName,
        String consumerGroup,
        Integer retryCount,
        String deadLetterTopic,
        List<SubscriptionActionEntity> actions,
        String scalingStrategy,
        String filterExpression,
        Integer batchSize,
        Long batchTimeout,
        String offsetResetStrategy,
        Long consumerTimeout,
        boolean idempotencyEnabled,
        String idempotencyKeyField
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId,
        /** Free-text description — shown on hover in the editor, edited in the ficha. */
        String description
) implements Identifiable {

    /** Backward-compatible constructor (pre-description callers). */
    public SubscriptionEntity(String id, String name, String eventName, String sourceService,
            String inputModelId, String topicName, String consumerGroup, Integer retryCount,
            String deadLetterTopic, List<SubscriptionActionEntity> actions, String scalingStrategy,
            String filterExpression, Integer batchSize, Long batchTimeout, String offsetResetStrategy,
            Long consumerTimeout, boolean idempotencyEnabled, String idempotencyKeyField,
            String projectId) {
        this(id, name, eventName, sourceService, inputModelId, topicName, consumerGroup, retryCount,
                deadLetterTopic, actions, scalingStrategy, filterExpression, batchSize, batchTimeout,
                offsetResetStrategy, consumerTimeout, idempotencyEnabled, idempotencyKeyField,
                projectId, null);
    }
}
