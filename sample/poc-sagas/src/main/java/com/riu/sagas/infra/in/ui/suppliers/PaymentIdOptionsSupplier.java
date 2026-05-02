package com.riu.sagas.infra.in.ui.suppliers;

import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Option;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import io.mateu.uidl.interfaces.LookupOptionsSupplier;
import io.mateu.uidl.interfaces.HttpRequest;
import com.riu.sagas.application.query.PaymentQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentIdOptionsSupplier implements LookupOptionsSupplier {

  final PaymentQueryService queryService;

  @Override
  public ListingData<Option> search(
      String fieldName, String searchText, Pageable pageable, HttpRequest httpRequest) {
    var found = queryService.findAll(searchText, null, pageable);
    return new ListingData<>(
        new Page<>(
            searchText,
            found.page().pageSize(),
            found.page().pageNumber(),
            found.page().totalElements(),
            found.page().content().stream()
                .map(row -> new Option(row.id(), queryService.getLabel(row.id())))
                .toList()));
  }
}
