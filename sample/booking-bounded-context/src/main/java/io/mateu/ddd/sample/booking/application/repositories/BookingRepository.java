package io.mateu.ddd.sample.booking.application.repositories;

import io.mateu.ddd.sample.booking.domain.aggregates.booking.Booking;
import io.mateu.ddd.sample.booking.domain.aggregates.booking.valueobjects.BookingId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Mono;

import java.util.List;

public interface BookingRepository {

    Mono<Booking> findById(BookingId id);

    Mono<Booking> save(Booking user);

    Mono<Page<Booking>> findAll(String searchText, Pageable pageable);

    Mono<Void> deleteAllById(List<BookingId> ids);

}
