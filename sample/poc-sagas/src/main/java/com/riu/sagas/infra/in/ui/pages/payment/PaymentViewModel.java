package com.riu.sagas.infra.in.ui.pages.payment;

import io.mateu.uidl.annotations.HiddenInCreate;
import io.mateu.uidl.annotations.ReadOnly;
import io.mateu.uidl.interfaces.CrudCreationForm;
import io.mateu.uidl.interfaces.CrudEditorForm;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.Identifiable;
import com.riu.sagas.application.query.dto.PaymentDto;
import com.riu.sagas.application.usecases.payment.create.CreatePaymentCommand;
import com.riu.sagas.application.usecases.payment.create.CreatePaymentUseCase;
import com.riu.sagas.application.usecases.payment.update.UpdatePaymentCommand;
import com.riu.sagas.application.usecases.payment.update.UpdatePaymentUseCase;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@Scope("prototype")
@RequiredArgsConstructor
public class PaymentViewModel
    implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

  @HiddenInCreate @ReadOnly String id;

  BigDecimal value;

  final CreatePaymentUseCase createPaymentUseCase;
  final UpdatePaymentUseCase updatePaymentUseCase;

  @Override
  public String create(HttpRequest httpRequest) {
    return createPaymentUseCase.handle(new CreatePaymentCommand(value));
  }

  @Override
  public void save(HttpRequest httpRequest) {
    updatePaymentUseCase.handle(new UpdatePaymentCommand(id, value));
  }

  @Override
  public String id() {
    return id;
  }

  public PaymentViewModel load(PaymentDto dto) {
    id = dto.id();
    value = dto.value();
    return this;
  }

  @Override
  public String toString() {
    return id != null ? String.valueOf(value) : "New Payment";
  }
}
