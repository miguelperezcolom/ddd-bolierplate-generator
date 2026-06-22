package io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent.vo.IntegrationEventCompressionType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent.vo.IntegrationEventId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent.vo.IntegrationEventName;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent.vo.IntegrationEventSerializationFormat;
import lombok.Getter;

@Getter
public class IntegrationEvent {

    private IntegrationEventId id;
    private IntegrationEventName name;
    private String serviceId;
    private String description;
    private String sourceDomainEventId;
    private String payloadModelId;
    private String topicName;
    private Integer partitions;
    private Long retentionMs;
    private IntegrationEventSerializationFormat serializationFormat;
    private IntegrationEventCompressionType compressionType;
    private boolean deadLetterQueueEnabled;
    private String deadLetterQueueName;
    private Integer maxDeliveryAttempts;
    private String schemaVersion;
    private String routingKeyField;
    private boolean replayable;

    public static IntegrationEvent of(IntegrationEventId id, IntegrationEventName name, String serviceId, String description,
                                      String sourceDomainEventId, String payloadModelId, String topicName,
                                      Integer partitions, Long retentionMs,
                                      IntegrationEventSerializationFormat serializationFormat,
                                      IntegrationEventCompressionType compressionType,
                                      boolean deadLetterQueueEnabled, String deadLetterQueueName, Integer maxDeliveryAttempts,
                                      String schemaVersion, String routingKeyField, boolean replayable) {
        var event = new IntegrationEvent();
        event.id = id;
        event.name = name;
        event.serviceId = serviceId;
        event.description = description;
        event.sourceDomainEventId = sourceDomainEventId;
        event.payloadModelId = payloadModelId;
        event.topicName = topicName;
        event.partitions = partitions;
        event.retentionMs = retentionMs;
        event.serializationFormat = serializationFormat;
        event.compressionType = compressionType;
        event.deadLetterQueueEnabled = deadLetterQueueEnabled;
        event.deadLetterQueueName = deadLetterQueueName;
        event.maxDeliveryAttempts = maxDeliveryAttempts;
        event.schemaVersion = schemaVersion;
        event.routingKeyField = routingKeyField;
        event.replayable = replayable;
        return event;
    }

    public static IntegrationEvent load(String id, String name, String serviceId, String description,
                                        String sourceDomainEventId, String payloadModelId, String topicName,
                                        Integer partitions, Long retentionMs,
                                        IntegrationEventSerializationFormat serializationFormat,
                                        IntegrationEventCompressionType compressionType,
                                        boolean deadLetterQueueEnabled, String deadLetterQueueName, Integer maxDeliveryAttempts,
                                        String schemaVersion, String routingKeyField, boolean replayable) {
        var event = new IntegrationEvent();
        event.id = new IntegrationEventId(id);
        event.name = new IntegrationEventName(name);
        event.serviceId = serviceId;
        event.description = description;
        event.sourceDomainEventId = sourceDomainEventId;
        event.payloadModelId = payloadModelId;
        event.topicName = topicName;
        event.partitions = partitions;
        event.retentionMs = retentionMs;
        event.serializationFormat = serializationFormat;
        event.compressionType = compressionType;
        event.deadLetterQueueEnabled = deadLetterQueueEnabled;
        event.deadLetterQueueName = deadLetterQueueName;
        event.maxDeliveryAttempts = maxDeliveryAttempts;
        event.schemaVersion = schemaVersion;
        event.routingKeyField = routingKeyField;
        event.replayable = replayable;
        return event;
    }

    public void update(IntegrationEventName name, String serviceId, String description,
                       String sourceDomainEventId, String payloadModelId, String topicName,
                       Integer partitions, Long retentionMs,
                       IntegrationEventSerializationFormat serializationFormat,
                       IntegrationEventCompressionType compressionType,
                       boolean deadLetterQueueEnabled, String deadLetterQueueName, Integer maxDeliveryAttempts,
                       String schemaVersion, String routingKeyField, boolean replayable) {
        this.name = name;
        this.serviceId = serviceId;
        this.description = description;
        this.sourceDomainEventId = sourceDomainEventId;
        this.payloadModelId = payloadModelId;
        this.topicName = topicName;
        this.partitions = partitions;
        this.retentionMs = retentionMs;
        this.serializationFormat = serializationFormat;
        this.compressionType = compressionType;
        this.deadLetterQueueEnabled = deadLetterQueueEnabled;
        this.deadLetterQueueName = deadLetterQueueName;
        this.maxDeliveryAttempts = maxDeliveryAttempts;
        this.schemaVersion = schemaVersion;
        this.routingKeyField = routingKeyField;
        this.replayable = replayable;
    }
}
