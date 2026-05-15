package io.mateu.mdd.specdrivengenerator.domain.aggregates.domainevent;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventModelId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventName;
import lombok.Getter;

@Getter
public class DomainEvent {

    private DomainEventId id;
    private DomainEventName name;
    private DomainEventModelId modelId;

    public static DomainEvent of(DomainEventId id, DomainEventName name, DomainEventModelId modelId) {
        var domainEvent = new DomainEvent();
        domainEvent.id = id;
        domainEvent.name = name;
        domainEvent.modelId = modelId;
        return domainEvent;
    }

    public static DomainEvent load(String id, String name, String modelId) {
        var domainEvent = new DomainEvent();
        domainEvent.id = new DomainEventId(id);
        domainEvent.name = new DomainEventName(name);
        domainEvent.modelId = modelId != null ? new DomainEventModelId(modelId) : null;
        return domainEvent;
    }

    public void update(DomainEventName name, DomainEventModelId modelId) {
        this.name = name;
        this.modelId = modelId;
    }
}
