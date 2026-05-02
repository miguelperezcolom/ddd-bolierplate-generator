package com.riu.sagas.application.usecases.booking.update;

import com.riu.sagas.application.out.BookingRepository;
import com.riu.sagas.domain.aggregates.booking.vo.BookingId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UpdateBookingUseCase {

  final BookingRepository repository;

  @Transactional
  public void handle(UpdateBookingCommand command) {
    var entity = repository.findById(new BookingId(Long.valueOf(command.id()))).orElseThrow();
    entity.update(command.locator(), command.leadName(), command.comments());
    repository.save(entity);
  }
}
