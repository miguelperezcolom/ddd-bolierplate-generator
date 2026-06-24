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
) implements Identifiable {
}
