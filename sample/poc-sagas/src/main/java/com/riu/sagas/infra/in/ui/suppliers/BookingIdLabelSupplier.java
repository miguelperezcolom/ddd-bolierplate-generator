package com.riu.sagas.infra.in.ui.suppliers;

import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.LabelSupplier;
import com.riu.sagas.application.query.BookingQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookingIdLabelSupplier implements LabelSupplier {

  final BookingQueryService queryService;

  @Override
  public String label(String fieldName, Object id, HttpRequest httpRequest) {
    return queryService.getLabel((String) id);
  }
}
