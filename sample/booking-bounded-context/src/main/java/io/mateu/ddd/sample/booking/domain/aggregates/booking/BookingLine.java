package io.mateu.ddd.sample.booking.domain.aggregates.booking;

import io.mateu.ddd.sample.booking.domain.aggregates.shared.valueobjects.Amount;

public record BookingLine(BookingLineDescription description, Amount value) {
}
