package io.mateu.ddd.domain;

import java.util.ArrayList;
import java.util.List;

public class AbstractAggregateRoot implements AggregateRoot {

    List<DomainEvent> outbox = new ArrayList<>();

    @Override
    public void push(DomainEvent domainEvent) {
        outbox.add(domainEvent);
    }

    @Override
    public List<DomainEvent> flush() {
        var copy = List.copyOf(outbox);
        outbox.clear();
        return copy;
    }

}
