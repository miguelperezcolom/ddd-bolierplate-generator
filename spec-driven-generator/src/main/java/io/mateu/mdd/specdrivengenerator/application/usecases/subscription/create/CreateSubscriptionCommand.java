package io.mateu.mdd.specdrivengenerator.application.usecases.subscription.create;

import io.mateu.mdd.specdrivengenerator.application.usecases.subscription.SubscriptionActionData;

import java.util.List;

public record CreateSubscriptionCommand(
        String id,
        String name,
        String eventName,
        String sourceService,
        String inputModelId,
        String topicName,
        String consumerGroup,
        List<SubscriptionActionData> actions
) {
}
