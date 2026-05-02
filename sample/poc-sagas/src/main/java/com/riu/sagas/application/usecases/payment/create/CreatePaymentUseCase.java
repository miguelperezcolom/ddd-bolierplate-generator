package com.riu.sagas.application.usecases.payment.create;

import com.riu.sagas.application.out.PaymentRepository;
import com.riu.sagas.domain.aggregates.payment.Payment;
import com.riu.sagas.domain.aggregates.payment.vo.PaymentId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CreatePaymentUseCase {

  final PaymentRepository repository;

  @Transactional
  public String handle(CreatePaymentCommand command) {
    return repository.save(Payment.of(command.value())).value().toString();
  }
}
