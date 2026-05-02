package com.riu.sagas.infra.in.ui.pages.payment;

import io.mateu.core.infra.declarative.CrudOrchestrator;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.data.NoFilters;
import io.mateu.uidl.interfaces.CrudAdapter;
import com.riu.sagas.application.query.dto.PaymentRow;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Scope("prototype")
@Title("Payments")
public class PaymentCrudOrchestrator
    extends CrudOrchestrator<
        PaymentViewModel, PaymentViewModel, PaymentViewModel, NoFilters, PaymentRow, String> {

  final PaymentCrudAdapter adapter;

  @Override
  public CrudAdapter<
          PaymentViewModel, PaymentViewModel, PaymentViewModel, NoFilters, PaymentRow, String>
      adapter() {
    return adapter;
  }

  @Override
  public String toId(String s) {
    return s;
  }
}
