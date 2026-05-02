package com.riu.sagas.application.usecases.payment.delete;

import com.riu.sagas.application.out.PaymentRepository;
import com.riu.sagas.domain.aggregates.payment.vo.PaymentId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DeletePaymentUseCase {

  final PaymentRepository repository;

  @Transactional
  public void handle(DeletePaymentCommand command) {
    repository.deleteAllById(
        command.ids().stream().map(Long::valueOf).map(PaymentId::new).toList());
  }
}
