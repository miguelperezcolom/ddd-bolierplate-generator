package io.mateu.ddd.sample.booking.domain.events;

import io.mateu.ddd.domain.DomainEvent;
import io.mateu.ddd.sample.booking.domain.aggregates.booking.valueobjects.BookingId;

public record BookingUpdated(BookingId bookingId) implements DomainEvent {
}
