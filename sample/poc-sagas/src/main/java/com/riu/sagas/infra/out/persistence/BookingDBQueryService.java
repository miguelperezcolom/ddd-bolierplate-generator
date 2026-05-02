package com.riu.sagas.infra.out.persistence;

import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import com.riu.sagas.application.query.BookingQueryService;
import com.riu.sagas.application.query.dto.BookingDto;
import com.riu.sagas.application.query.dto.BookingRow;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingDBQueryService implements BookingQueryService {

  final BookingEntityRepository repository;

  @Override
  public String getLabel(String id) {
    return repository.findById(Long.valueOf(id)).map(e -> e.getLocator()).orElse("Unknown");
  }

  @Override
  public Optional<BookingDto> getById(String id) {
    return repository.findById(Long.valueOf(id)).map(this::toDto);
  }

  private BookingDto toDto(BookingEntity entity) {
    return new BookingDto(
        entity.getId().toString(), entity.getLocator(), entity.getLeadName(), entity.getComments());
  }

  private BookingRow toRow(BookingEntity entity) {
    return new BookingRow(entity.getId().toString());
  }

  @Override
  public ListingData<BookingRow> findAll(String searchText, Object filters, Pageable pageable) {
    var allEntities = repository.findAll();
    var filtered =
        allEntities.stream()
            .filter(e -> searchText == null || searchText.isBlank() || matchesSearch(e, searchText))
            .toList();
    var total = filtered.size();
    var paged =
        filtered.stream()
            .skip((long) pageable.page() * pageable.size())
            .limit(pageable.size())
            .map(this::toRow)
            .toList();
    return new ListingData<>(
        new Page<>(searchText, pageable.size(), pageable.page(), total, paged));
  }

  private boolean matchesSearch(BookingEntity entity, String searchText) {
    var lower = searchText.toLowerCase();
    return entity.getLocator() != null && entity.getLocator().toLowerCase().contains(lower);
  }
}
