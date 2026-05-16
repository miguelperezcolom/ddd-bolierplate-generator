package io.mateu.mdd.specdrivengenerator.application.usecases.subscription.save;

import io.mateu.mdd.specdrivengenerator.application.usecases.subscription.SubscriptionActionData;

import java.util.List;

public record SaveSubscriptionCommand(
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
        String scalingStrategy
) {
}
