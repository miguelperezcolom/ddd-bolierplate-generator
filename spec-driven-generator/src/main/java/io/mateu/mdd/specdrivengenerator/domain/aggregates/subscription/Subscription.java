package io.mateu.mdd.specdrivengenerator.domain.aggregates.subscription;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.subscription.vo.*;
import lombok.Getter;

import java.util.List;

@Getter
public class Subscription {

    private SubscriptionId id;
    private SubscriptionName name;
    private String eventName;
    private String sourceService;
    private String inputModelId;
    private String topicName;
    private String consumerGroup;
    private Integer retryCount;
    private String deadLetterTopic;
    private List<SubscriptionAction> actions;

    public static Subscription of(SubscriptionId id, SubscriptionName name,
                                  String eventName, String sourceService, String inputModelId,
                                  String topicName, String consumerGroup,
                                  Integer retryCount, String deadLetterTopic,
                                  List<SubscriptionAction> actions) {
        var subscription = new Subscription();
        subscription.id = id;
        subscription.name = name;
        subscription.eventName = eventName;
        subscription.sourceService = sourceService;
        subscription.inputModelId = inputModelId;
        subscription.topicName = topicName;
        subscription.consumerGroup = consumerGroup;
        subscription.retryCount = retryCount;
        subscription.deadLetterTopic = deadLetterTopic;
        subscription.actions = actions != null ? actions : List.of();
        return subscription;
    }

    public static Subscription load(String id, String name,
                                    String eventName, String sourceService, String inputModelId,
                                    String topicName, String consumerGroup,
                                    Integer retryCount, String deadLetterTopic,
                                    List<SubscriptionAction> actions) {
        var subscription = new Subscription();
        subscription.id = new SubscriptionId(id);
        subscription.name = new SubscriptionName(name);
        subscription.eventName = eventName;
        subscription.sourceService = sourceService;
        subscription.inputModelId = inputModelId;
        subscription.topicName = topicName;
        subscription.consumerGroup = consumerGroup;
        subscription.retryCount = retryCount;
        subscription.deadLetterTopic = deadLetterTopic;
        subscription.actions = actions != null ? actions : List.of();
        return subscription;
    }

    public void update(SubscriptionName name,
                       String eventName, String sourceService, String inputModelId,
                       String topicName, String consumerGroup,
                       Integer retryCount, String deadLetterTopic,
                       List<SubscriptionAction> actions) {
        this.name = name;
        this.eventName = eventName;
        this.sourceService = sourceService;
        this.inputModelId = inputModelId;
        this.topicName = topicName;
        this.consumerGroup = consumerGroup;
        this.retryCount = retryCount;
        this.deadLetterTopic = deadLetterTopic;
        this.actions = actions != null ? actions : List.of();
    }
}
