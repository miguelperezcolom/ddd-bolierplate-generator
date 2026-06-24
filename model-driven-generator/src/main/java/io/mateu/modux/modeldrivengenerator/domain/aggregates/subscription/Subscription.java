package io.mateu.modux.modeldrivengenerator.domain.aggregates.subscription;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.subscription.vo.*;
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
    private ScalingStrategy scalingStrategy;
    private String filterExpression;
    private Integer batchSize;
    private Long batchTimeout;
    private String offsetResetStrategy;
    private Long consumerTimeout;
    private boolean idempotencyEnabled;
    private String idempotencyKeyField;

    public static Subscription of(SubscriptionId id, SubscriptionName name,
                                  String eventName, String sourceService, String inputModelId,
                                  String topicName, String consumerGroup,
                                  Integer retryCount, String deadLetterTopic,
                                  List<SubscriptionAction> actions,
                                  ScalingStrategy scalingStrategy,
                                  String filterExpression,
                                  Integer batchSize, Long batchTimeout, String offsetResetStrategy,
                                  Long consumerTimeout,
                                  boolean idempotencyEnabled, String idempotencyKeyField) {
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
        subscription.scalingStrategy = scalingStrategy;
        subscription.filterExpression = filterExpression;
        subscription.batchSize = batchSize;
        subscription.batchTimeout = batchTimeout;
        subscription.offsetResetStrategy = offsetResetStrategy;
        subscription.consumerTimeout = consumerTimeout;
        subscription.idempotencyEnabled = idempotencyEnabled;
        subscription.idempotencyKeyField = idempotencyKeyField;
        return subscription;
    }

    public static Subscription load(String id, String name,
                                    String eventName, String sourceService, String inputModelId,
                                    String topicName, String consumerGroup,
                                    Integer retryCount, String deadLetterTopic,
                                    List<SubscriptionAction> actions,
                                    String scalingStrategy,
                                    String filterExpression,
                                    Integer batchSize, Long batchTimeout, String offsetResetStrategy,
                                    Long consumerTimeout,
                                    boolean idempotencyEnabled, String idempotencyKeyField) {
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
        subscription.scalingStrategy = scalingStrategy != null ? ScalingStrategy.valueOf(scalingStrategy) : null;
        subscription.filterExpression = filterExpression;
        subscription.batchSize = batchSize;
        subscription.batchTimeout = batchTimeout;
        subscription.offsetResetStrategy = offsetResetStrategy;
        subscription.consumerTimeout = consumerTimeout;
        subscription.idempotencyEnabled = idempotencyEnabled;
        subscription.idempotencyKeyField = idempotencyKeyField;
        return subscription;
    }

    public void update(SubscriptionName name,
                       String eventName, String sourceService, String inputModelId,
                       String topicName, String consumerGroup,
                       Integer retryCount, String deadLetterTopic,
                       List<SubscriptionAction> actions,
                       ScalingStrategy scalingStrategy,
                       String filterExpression,
                       Integer batchSize, Long batchTimeout, String offsetResetStrategy,
                       Long consumerTimeout,
                       boolean idempotencyEnabled, String idempotencyKeyField) {
        this.name = name;
        this.eventName = eventName;
        this.sourceService = sourceService;
        this.inputModelId = inputModelId;
        this.topicName = topicName;
        this.consumerGroup = consumerGroup;
        this.retryCount = retryCount;
        this.deadLetterTopic = deadLetterTopic;
        this.actions = actions != null ? actions : List.of();
        this.scalingStrategy = scalingStrategy;
        this.filterExpression = filterExpression;
        this.batchSize = batchSize;
        this.batchTimeout = batchTimeout;
        this.offsetResetStrategy = offsetResetStrategy;
        this.consumerTimeout = consumerTimeout;
        this.idempotencyEnabled = idempotencyEnabled;
        this.idempotencyKeyField = idempotencyKeyField;
    }
}
