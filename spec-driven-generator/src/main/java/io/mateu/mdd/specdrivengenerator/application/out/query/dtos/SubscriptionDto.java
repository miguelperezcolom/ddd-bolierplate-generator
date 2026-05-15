package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

import java.util.List;

public record SubscriptionDto(
        String id,
        String name,
        String eventName,
        String sourceService,
        String inputModelId,
        String topicName,
        String consumerGroup,
        Integer retryCount,
        String deadLetterTopic,
        List<SubscriptionActionDto> actions
) {
}
