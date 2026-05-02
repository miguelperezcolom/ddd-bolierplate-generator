package com.riu.sagas.infra.out.persistence;

import com.riu.sagas.application.out.BookingRepository;
import com.riu.sagas.domain.aggregates.booking.Booking;
import com.riu.sagas.domain.aggregates.booking.vo.BookingId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingDBRepository implements BookingRepository {

  final BookingEntityRepository repository;

  @Override
  public Optional<Booking> findById(BookingId id) {
    return repository.findById(id.value()).map(this::toDomain);
  }

  private Booking toDomain(BookingEntity entity) {
    return new Booking(
        new BookingId(entity.getId()),
        entity.getLocator(),
        entity.getLeadName(),
        entity.getComments());
  }

  private BookingEntity toEntity(Booking domain) {
    return new BookingEntity(
        domain.getId() != null ? domain.getId().value() : null,
        domain.getLocator(),
        domain.getLeadName(),
        domain.getComments());
  }

  @Override
  public BookingId save(Booking domain) {
    return new BookingId(repository.save(toEntity(domain)).getId());
  }

  @Override
  public void deleteAllById(List<BookingId> selectedIds) {
    repository.deleteAllById(selectedIds.stream().map(BookingId::value).toList());
  }
}
