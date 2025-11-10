package io.mateu.ddd.domain;

import java.util.List;

public interface AggregateRoot {

    void push(DomainEvent domainEvent);

    List<DomainEvent> flush();

}
