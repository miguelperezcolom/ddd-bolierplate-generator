package com.riu.sagas.application.usecases.booking.delete;

import com.riu.sagas.application.out.BookingRepository;
import com.riu.sagas.domain.aggregates.booking.vo.BookingId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DeleteBookingUseCase {

  final BookingRepository repository;

  @Transactional
  public void handle(DeleteBookingCommand command) {
    repository.deleteAllById(
        command.ids().stream().map(Long::valueOf).map(BookingId::new).toList());
  }
}
