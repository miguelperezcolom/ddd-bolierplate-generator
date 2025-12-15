package io.mateu.ddd.sample.booking.application.booking;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CreateBookingUseCaseTest {

    @Autowired
    CreateBookingUseCase createBookingUseCase;

    @Test
    void bookingIsCreated() {

        createBookingUseCase.handle(CreateBookingCommand.builder()
                        .serviceDescription("Hotel Riu Palace La Mola")
                        .salePrice(500.41)
                        .currencyIsoCode("EUR")
                .build()).block();

        // comprobar evento

        // comprobar file y boooking, utilizando el repo

    }

}