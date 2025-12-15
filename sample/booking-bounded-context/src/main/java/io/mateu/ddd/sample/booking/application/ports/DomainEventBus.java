package io.mateu.ddd.sample.booking.application.ports;

import io.mateu.ddd.domain.DomainEvent;

import java.util.List;

public interface DomainEventBus {

    void sendAll(List<DomainEvent> events);

}
