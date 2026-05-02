package com.riu.sagas.infra.out.persistence;

import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import com.riu.sagas.application.query.PaymentQueryService;
import com.riu.sagas.application.query.dto.PaymentDto;
import com.riu.sagas.application.query.dto.PaymentRow;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentDBQueryService implements PaymentQueryService {

  final PaymentEntityRepository repository;

  @Override
  public String getLabel(String id) {
    return repository
        .findById(Long.valueOf(id))
        .map(e -> String.valueOf(e.getValue()))
        .orElse("Unknown");
  }

  @Override
  public Optional<PaymentDto> getById(String id) {
    return repository.findById(Long.valueOf(id)).map(this::toDto);
  }

  private PaymentDto toDto(PaymentEntity entity) {
    return new PaymentDto(entity.getId().toString(), entity.getValue());
  }

  private PaymentRow toRow(PaymentEntity entity) {
    return new PaymentRow(entity.getId().toString());
  }

  @Override
  public ListingData<PaymentRow> findAll(String searchText, Object filters, Pageable pageable) {
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

  private boolean matchesSearch(PaymentEntity entity, String searchText) {
    var lower = searchText.toLowerCase();
    return entity.getId().toString().contains(lower);
  }
}
