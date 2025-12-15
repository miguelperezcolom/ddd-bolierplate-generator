package io.mateu.ddd.sample.booking.domain.aggregates.shared.valueobjects;

import java.math.BigDecimal;

public record Amount(BigDecimal value, String currencyIsoCode) {
}
