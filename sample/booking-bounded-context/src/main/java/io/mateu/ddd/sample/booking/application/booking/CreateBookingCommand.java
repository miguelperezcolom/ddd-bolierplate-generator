package io.mateu.ddd.sample.booking.application.booking;

import lombok.Builder;

@Builder
public record CreateBookingCommand(
        String serviceDescription,
        double salePrice,
        String currencyIsoCode
) {
}
