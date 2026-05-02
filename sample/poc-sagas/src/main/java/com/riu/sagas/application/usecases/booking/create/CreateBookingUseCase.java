package com.riu.sagas.application.usecases.booking.create;

import com.riu.sagas.application.out.BookingRepository;
import com.riu.sagas.domain.aggregates.booking.Booking;
import com.riu.sagas.domain.aggregates.booking.vo.BookingId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CreateBookingUseCase {

  final BookingRepository repository;

  @Transactional
  public String handle(CreateBookingCommand command) {
    return repository
        .save(Booking.of(command.locator(), command.leadName(), command.comments()))
        .value()
        .toString();
  }
}
