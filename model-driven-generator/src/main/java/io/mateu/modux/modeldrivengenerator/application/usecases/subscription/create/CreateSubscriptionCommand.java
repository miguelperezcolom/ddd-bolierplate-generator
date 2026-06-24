package io.mateu.modux.modeldrivengenerator.application.usecases.subscription.create;

import io.mateu.modux.modeldrivengenerator.application.usecases.subscription.SubscriptionActionData;

import java.util.List;

public record CreateSubscriptionCommand(
        String id,
        String name,
        String eventName,
        String sourceService,
        String inputModelId,
        String topicName,
        String consumerGroup,
        Integer retryCount,
        String deadLetterTopic,
        List<SubscriptionActionData> actions,
        String scalingStrategy,
        String filterExpression,
        Integer batchSize,
        Long batchTimeout,
        String offsetResetStrategy,
        Long consumerTimeout,
        boolean idempotencyEnabled,
        String idempotencyKeyField
) {
}
