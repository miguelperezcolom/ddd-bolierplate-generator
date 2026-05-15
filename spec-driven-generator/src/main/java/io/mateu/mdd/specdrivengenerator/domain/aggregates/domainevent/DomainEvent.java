package io.mateu.mdd.specdrivengenerator.domain.aggregates.domainevent;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventIntegrationModelId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventModelId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventPublishAsIntegrationEvent;
import lombok.Getter;

@Getter
public class DomainEvent {

    private DomainEventId id;
    private DomainEventName name;
    private DomainEventModelId modelId;
    private DomainEventPublishAsIntegrationEvent publishAsIntegrationEvent;
    private DomainEventIntegrationModelId integrationModelId;
    private String topicName;
    private Integer partitions;
    private Long retentionMs;

    public static DomainEvent of(DomainEventId id, DomainEventName name, DomainEventModelId modelId,
                                 DomainEventPublishAsIntegrationEvent publishAsIntegrationEvent,
                                 DomainEventIntegrationModelId integrationModelId,
                                 String topicName, Integer partitions, Long retentionMs) {
        var domainEvent = new DomainEvent();
        domainEvent.id = id;
        domainEvent.name = name;
        domainEvent.modelId = modelId;
        domainEvent.publishAsIntegrationEvent = publishAsIntegrationEvent;
        domainEvent.integrationModelId = integrationModelId;
        domainEvent.topicName = topicName;
        domainEvent.partitions = partitions;
        domainEvent.retentionMs = retentionMs;
        return domainEvent;
    }

    public static DomainEvent load(String id, String name, String modelId,
                                   boolean publishAsIntegrationEvent, String integrationModelId,
                                   String topicName, Integer partitions, Long retentionMs) {
        var domainEvent = new DomainEvent();
        domainEvent.id = new DomainEventId(id);
        domainEvent.name = new DomainEventName(name);
        domainEvent.modelId = modelId != null ? new DomainEventModelId(modelId) : null;
        domainEvent.publishAsIntegrationEvent = new DomainEventPublishAsIntegrationEvent(publishAsIntegrationEvent);
        domainEvent.integrationModelId = integrationModelId != null ? new DomainEventIntegrationModelId(integrationModelId) : null;
        domainEvent.topicName = topicName;
        domainEvent.partitions = partitions;
        domainEvent.retentionMs = retentionMs;
        return domainEvent;
    }

    public void update(DomainEventName name, DomainEventModelId modelId,
                       DomainEventPublishAsIntegrationEvent publishAsIntegrationEvent,
                       DomainEventIntegrationModelId integrationModelId,
                       String topicName, Integer partitions, Long retentionMs) {
        this.name = name;
        this.modelId = modelId;
        this.publishAsIntegrationEvent = publishAsIntegrationEvent;
        this.integrationModelId = integrationModelId;
        this.topicName = topicName;
        this.partitions = partitions;
        this.retentionMs = retentionMs;
    }
}
