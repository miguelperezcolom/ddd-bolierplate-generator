package io.mateu.ddd.sample.booking.domain.events;

import io.mateu.ddd.domain.DomainEvent;
import io.mateu.ddd.sample.booking.domain.aggregates.booking.valueobjects.BookingId;
import io.mateu.ddd.sample.booking.domain.aggregates.file.valueobjects.FileId;

public record FileCreated(FileId fileId) implements DomainEvent {
}
