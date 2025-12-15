package io.mateu.ddd.sample.booking.application.booking;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class CreateBookingUseCase {

    public Mono<Void> handle(CreateBookingCommand command) {
        return Mono.empty();
    }

}
