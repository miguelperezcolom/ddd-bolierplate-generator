package io.mateu.ddd.sample.booking.domain.aggregates.currency;

import io.mateu.ddd.domain.AbstractAggregateRoot;
import lombok.Builder;
import lombok.With;

@Builder@With
public class Currency extends AbstractAggregateRoot {

    CurrencyIsoCode isoCode;

    CurrencyName name;

    CurrencyDecimals decimals;

}
