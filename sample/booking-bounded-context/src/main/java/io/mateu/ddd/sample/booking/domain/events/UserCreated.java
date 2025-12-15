package io.mateu.ddd.sample.booking.domain.events;

import io.mateu.ddd.domain.DomainEvent;
import io.mateu.ddd.sample.booking.domain.aggregates.user.valueobjects.UserId;

public record UserCreated(UserId userId) implements DomainEvent {
}
