package com.riu.sagas.infra.in.ui.pages.payment;

import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.NoFilters;
import io.mateu.uidl.data.Pageable;
import io.mateu.uidl.interfaces.CrudAdapter;
import io.mateu.uidl.interfaces.HttpRequest;
import com.riu.sagas.application.query.PaymentQueryService;
import com.riu.sagas.application.query.dto.PaymentRow;
import com.riu.sagas.application.usecases.payment.delete.DeletePaymentCommand;
import com.riu.sagas.application.usecases.payment.delete.DeletePaymentUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Scope("prototype")
@RequiredArgsConstructor
public class PaymentCrudAdapter
    implements CrudAdapter<
        PaymentViewModel, PaymentViewModel, PaymentViewModel, NoFilters, PaymentRow, String> {

  final PaymentViewModel viewModel;
  final DeletePaymentUseCase deletePaymentUseCase;
  final PaymentQueryService queryService;

  @Override
  public ListingData<PaymentRow> search(
      String searchText, NoFilters filters, Pageable pageable, HttpRequest httpRequest) {
    return queryService.findAll(searchText, filters, pageable);
  }

  @Override
  public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
    deletePaymentUseCase.handle(new DeletePaymentCommand(selectedIds));
  }

  @Override
  public PaymentViewModel getView(String id, HttpRequest httpRequest) {
    return viewModel.load(queryService.getById(id).orElseThrow());
  }

  @Override
  public PaymentViewModel getEditor(String id, HttpRequest httpRequest) {
    return viewModel.load(queryService.getById(id).orElseThrow());
  }

  @Override
  public PaymentViewModel getCreationForm(HttpRequest httpRequest) {
    return viewModel;
  }
}
