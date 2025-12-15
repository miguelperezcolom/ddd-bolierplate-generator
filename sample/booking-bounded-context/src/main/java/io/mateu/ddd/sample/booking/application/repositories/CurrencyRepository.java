package io.mateu.ddd.sample.booking.application.repositories;

import io.mateu.ddd.sample.booking.domain.aggregates.currency.Currency;
import io.mateu.ddd.sample.booking.domain.aggregates.currency.CurrencyIsoCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Mono;

import java.util.List;

public interface CurrencyRepository {

    Mono<Currency> findById(CurrencyIsoCode id);

    Mono<Currency> save(Currency currency);

    Mono<Page<Currency>> findAll(String searchText, Pageable pageable);

    Mono<Void> deleteAllById(List<CurrencyIsoCode> ids);

}
