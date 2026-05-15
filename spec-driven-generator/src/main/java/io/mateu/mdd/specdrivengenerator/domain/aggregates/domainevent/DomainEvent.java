package io.mateu.mdd.specdrivengenerator.domain.aggregates.domainevent;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventName;
import lombok.Getter;

@Getter
public class DomainEvent {

    private DomainEventId id;
    private DomainEventName name;

    public static DomainEvent of(DomainEventId id, DomainEventName name) {
        var domainEvent = new DomainEvent();
        domainEvent.id = id;
        domainEvent.name = name;
        return domainEvent;
    }

    public static DomainEvent load(String id, String name) {
        var domainEvent = new DomainEvent();
        domainEvent.id = new DomainEventId(id);
        domainEvent.name = new DomainEventName(name);
        return domainEvent;
    }

    public void update(DomainEventName name) {
        this.name = name;
    }
}
